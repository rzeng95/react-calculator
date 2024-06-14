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
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  const submit = useCallback(async () => {
    try {
      setLoading(true);

      await waitAsync(200); // prevent flash of loading content

      const { data } = await axios.post(
        'http://api.mathjs.org/v4/',
        {
          expr: createExpression(input),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { result } = data;

      setInput(result);
      setLoading(false);
      setExpression(input);
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
  }, [input]);

  const handleButtonClick = useCallback(
    async (value: string) => {
      if (value === Symbol.CLEAR) {
        setExpression('');
        return handleClear();
      }

      if (value === Symbol.EQUAL) {
        setExpression('');
        return submit();
      }

      return setInput((prev) => {
        const parts = prev.split(' ');

        // ex: the input "5 x 3 + 1" would be separated into ["5", "x", "3", "+", 1]

        if (parts[0] === '' && isOperator(value)) {
          // no-op if first value is an operator
          return prev;
        }

        if (parts[0] === '' && isNumber(value)) {
          // input is empty - set to value
          return `${value}`; // make this a string, since prev.split(' ') won't work if prev is a number
        }

        const mostRecentPart = parts.pop();

        if (
          mostRecentPart?.includes(Symbol.DECIMAL) &&
          value === Symbol.DECIMAL
        ) {
          // no-op if current number already includes a decimal
          return prev;
        }

        if (isOperator(mostRecentPart) && isOperator(value)) {
          // replace existing latest operator with newest input operator
          setExpression('');
          return [...parts, value].join(' ');
        }

        if (isNumber(mostRecentPart) && isNumber(value)) {
          // concat new number to previous number
          setExpression('');
          return [...parts, `${mostRecentPart}${value}`].join(' ');
        }

        if (isNumber(mostRecentPart) && value === Symbol.DECIMAL) {
          // concat decimal to existing number
          setExpression('');
          return [...parts, `${mostRecentPart}${value}`].join(' ');
        }

        // otherwise, the new value is an operator and should be inserted after the latest part
        setExpression('');
        return [...parts, mostRecentPart, value].join(' ');
      });
    },
    [handleClear, submit]
  );

  return (
    <Container>
      <Output text={input} expression={expression} />

      <ButtonsGrid>
        {BUTTON_ROWS.map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            loading={loading}
            onClick={() => handleButtonClick(value as string)}
          />
        ))}
      </ButtonsGrid>
    </Container>
  );
};
