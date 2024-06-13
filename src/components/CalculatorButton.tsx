import styled from '@emotion/styled';
import { Symbol, Colors, isOperator } from 'src/utils';

interface Props {
  value: number | string;
  onClick: () => void;
}

interface ContainerProps {
  value: number | string;
  isZero: boolean;
  isSymbol: boolean;
}

const Container = styled.div(({ value, isZero, isSymbol }: ContainerProps) => ({
  width: '100%',
  height: '100px',
  border: '1px solid black',
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
  gridColumn: value === Symbol.CLEAR ? 'span 3' : isZero ? 'span 2' : 'span 1',
}));

const Value = styled.div({
  fontSize: '36px',
  fontWeight: '600',
  color: Colors.WHITE,
});

export const CalculatorButton = ({ value, onClick }: Props) => {
  return (
    <Container
      value={value}
      isZero={value === 0}
      isSymbol={isOperator(value) || value === Symbol.EQUAL}
      onClick={onClick}
    >
      <Value>{value}</Value>
    </Container>
  );
};
