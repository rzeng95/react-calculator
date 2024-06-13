import styled from '@emotion/styled';
import { CalculatorButton } from './CalculatorButton';
import {
  Colors,
  Symbol,
  createExpression,
  isNumber,
  isOperator,
  waitAsync,
} from 'src/utils';
import { useCallback, useState } from 'react';
import { Output } from './Output';
import axios from 'axios';
import { Debug } from './Debug';

const Container = styled.div({
  border: '1px solid black',
  borderRadius: '20px',
  padding: '48px',
  backgroundColor: Colors.DARKGREY,
});

const ButtonsGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: '100px 100px 100px 100px',
  rowGap: '24px',
  columnGap: '24px',
  justifyItems: 'center',
});

const BUTTON_ROWS = [
  Symbol.CLEAR, // takes up three column widths (see Button css)
  Symbol.DIVIDE,

  7,
  8,
  9,
  Symbol.MULTIPLY,

  4,
  5,
  6,
  Symbol.MINUS,

  1,
  2,
  3,
  Symbol.ADD,

  0, // takes up two column widths (see Button css)
  Symbol.DECIMAL,
  Symbol.EQUAL,
];

export const Calculator = () => {
  const [leftOperand, setLeftOperand] = useState<string>('');
  const [rightOperand, setRightOperand] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClear = useCallback(() => {
    setInput('');
    setOperator('');
    setLeftOperand('');
    setRightOperand('');
  }, []);

  const submit = useCallback(async () => {
    try {
      setLoading(true);

      await waitAsync(300);

      const { data } = await axios.post(
        'http://api.mathjs.org/v4/',
        {
          expr: createExpression(`${leftOperand} ${operator} ${rightOperand}`),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { result } = data;

      setLeftOperand(result);
      setInput(result);
      setOperator('');
      setRightOperand('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(
        [
          `[${(err as any)?.response?.status}]`,
          (err as any)?.response?.statusText,
          '-',
          (err as any)?.response?.data?.error,
        ].join(' ')
      );
    }
  }, [leftOperand, operator, rightOperand]);

  const handleButtonClick = useCallback(
    async (value: string) => {
      if (value === Symbol.CLEAR) {
        return handleClear();
      }
      if (value === Symbol.EQUAL) {
        return submit();
      }

      if (isOperator(value) && operator && rightOperand) {
        // calculate first
        await submit();

        return setOperator(value);
      } else if (isOperator(value)) {
        return setOperator(value);
      }

      let newInput = input;

      if (operator && !rightOperand) {
        // reset input when switching to rightOperand
        newInput = '';
      }

      if (isNumber(newInput) && isNumber(value)) {
        // concat new number to previous number
        newInput = `${newInput}${value}`;
      } else if (
        newInput.includes(Symbol.DECIMAL) &&
        value === Symbol.DECIMAL
      ) {
        // no-op multiple decimal inputs
        newInput = newInput;
      } else if (isNumber(newInput) && value === Symbol.DECIMAL) {
        // contact decimal to existing number
        newInput = `${newInput}${value}`;
      } else {
        newInput = `${value}`;
      }

      setInput(newInput);

      if (leftOperand && operator) {
        setRightOperand(newInput);
      } else if (!operator) {
        setLeftOperand(newInput);
      }
    },
    [handleClear, input, leftOperand, operator, rightOperand, submit]
  );

  return (
    <Container>
      <Debug
        leftOperand={leftOperand}
        rightOperand={rightOperand}
        operator={operator}
      />

      <Output text={input} />

      <ButtonsGrid>
        {BUTTON_ROWS.map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            loading={loading}
            operatorSelected={value === operator}
            onClick={() => handleButtonClick(value as string)}
          />
        ))}
      </ButtonsGrid>
    </Container>
  );
};
