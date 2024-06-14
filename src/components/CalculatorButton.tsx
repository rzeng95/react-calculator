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
}

const Container = styled.div(({ value }: ContainerProps) => {
  return {
    width: '100%',
    height: '100px',
    borderRadius: value === 0 || value === Symbol.CLEAR ? '30px' : '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isOperator(value) ? Colors.ORANGE : Colors.MEDIUMGREY,
    '&:hover': {
      backgroundColor: isOperator(value)
        ? Colors.ORANGE_HOVER
        : Colors.MEDIUMGREY_HOVER,
    },
    cursor: 'pointer',
    transition: '0.2s',
    gridColumn:
      value === Symbol.CLEAR ? 'span 3' : value === 0 ? 'span 2' : 'span 1',
  };
});

const Value = styled.div({
  fontSize: '36px',
  fontWeight: '600',
  color: Colors.WHITE,
});

export const CalculatorButton = ({ value, onClick, loading }: Props) => {
  return (
    <Container value={value} onClick={!loading ? onClick : () => {}}>
      {loading && value === Symbol.EQUAL ? (
        <ClipLoader color={Colors.WHITE} size={30} loading />
      ) : (
        <Value>{value}</Value>
      )}
    </Container>
  );
};
