import styled from '@emotion/styled';
import { Symbol, Colors, isOperator } from 'src/utils';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  value: number | string;
  onClick: () => void;
  loading: boolean;
}

interface ContainerProps {
  value: number | string;
  isZero: boolean;
  isSymbol: boolean;
}

const Container = styled.div(({ value, isZero, isSymbol }: ContainerProps) => {
  return {
    width: '100%',
    height: '100px',
    borderRadius: isZero || value === Symbol.CLEAR ? '30px' : '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isSymbol ? Colors.ORANGE : Colors.MEDIUMGREY,
    '&:hover': {
      backgroundColor: isSymbol ? Colors.ORANGE_HOVER : Colors.MEDIUMGREY_HOVER,
    },
    cursor: 'pointer',
    transition: '0.2s',
    gridColumn:
      value === Symbol.CLEAR ? 'span 3' : isZero ? 'span 2' : 'span 1',
  };
});

const Value = styled.div({
  fontSize: '36px',
  fontWeight: '600',
  color: Colors.WHITE,
});

export const CalculatorButton = ({ value, onClick, loading }: Props) => {
  return (
    <Container
      value={value}
      isZero={value === 0}
      isSymbol={isOperator(value)}
      onClick={!loading ? onClick : () => {}}
    >
      {loading && value === Symbol.EQUAL ? (
        <ClipLoader color={Colors.ORANGE_HOVER} loading size={30} />
      ) : (
        <Value>{value}</Value>
      )}
    </Container>
  );
};
