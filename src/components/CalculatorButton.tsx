import styled from '@emotion/styled';
import { Symbol, Colors, isOperator } from 'src/utils';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  value: number | string;
  onClick: () => void;
  loading: boolean;
  operatorSelected: boolean;
}

interface ContainerProps {
  value: number | string;
  isZero: boolean;
  isSymbol: boolean;
  operatorSelected: boolean;
}

const Container = styled.div(
  ({ value, isZero, isSymbol, operatorSelected }: ContainerProps) => {
    return {
      width: '100%',
      height: '100px',
      borderRadius: isZero || value === Symbol.CLEAR ? '30px' : '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: operatorSelected
        ? Colors.WHITE
        : isSymbol
        ? Colors.ORANGE
        : Colors.MEDIUMGREY,
      '&:hover': {
        backgroundColor: isSymbol
          ? Colors.ORANGE_HOVER
          : Colors.MEDIUMGREY_HOVER,
      },
      cursor: 'pointer',
      transition: '0.2s',
      gridColumn:
        value === Symbol.CLEAR ? 'span 3' : isZero ? 'span 2' : 'span 1',
    };
  }
);

interface ValueProps {
  operatorSelected: boolean;
}

const Value = styled.div(({ operatorSelected }: ValueProps) => ({
  fontSize: '36px',
  fontWeight: '600',
  color: operatorSelected ? Colors.ORANGE : Colors.WHITE,
}));

export const CalculatorButton = ({
  value,
  onClick,
  loading,
  operatorSelected,
}: Props) => {
  const isOrangeButton = isOperator(value) || value === Symbol.EQUAL;
  return (
    <Container
      value={value}
      isZero={value === 0}
      isSymbol={isOrangeButton}
      operatorSelected={operatorSelected}
      onClick={!loading ? onClick : () => {}}
    >
      {loading && isOrangeButton ? (
        <ClipLoader color={Colors.ORANGE_HOVER} loading={true} size={30} />
      ) : (
        <Value operatorSelected={operatorSelected}>{value}</Value>
      )}
    </Container>
  );
};
