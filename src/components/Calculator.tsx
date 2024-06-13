import styled from '@emotion/styled';
import { Button } from './Button';
import { Colors, Symbol, createExpression, isNumber } from 'src/utils';
import { useCallback, useState } from 'react';
import { Output } from './Output';
import axios, { AxiosError } from 'axios';

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
  7,
  8,
  9,
  Symbol.DIVIDE,

  4,
  5,
  6,
  Symbol.MULTIPLY,

  1,
  2,
  3,
  Symbol.ADD,

  0, // takes up two column widths (see Button css)
  Symbol.DECIMAL,
  Symbol.EQUAL,
];

export const Calculator = () => {
  const [input, setInput] = useState('');

  const submit = useCallback(async () => {
    try {
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
      console.log('oh yay!', data);
    } catch (err) {
      console.log('oh no!', err);
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
    (value: string) => {
      if (value === Symbol.EQUAL) {
        return submit();
      }

      return setInput((prev) => {
        const parts = prev.split(' ');

        const lastPart = parts.pop();

        if (isNumber(lastPart) && isNumber(value)) {
          // concat new number to previous number
          return [...parts, `${lastPart}${value}`].join(' ');
        }

        if (
          lastPart?.split('')?.includes(Symbol.DECIMAL) &&
          value === Symbol.DECIMAL
        ) {
          // no-op multiple decimal inputs
          return [...parts, lastPart].join(' ');
        }

        if (isNumber(lastPart) && value === Symbol.DECIMAL) {
          // concat decimal to previous number
          return [...parts, `${lastPart}${value}`].join(' ');
        }

        return [...parts, lastPart, value].join(' ');
      });
    },
    [submit]
  );

  return (
    <Container>
      <button onClick={() => setInput('')}>clear</button>
      <Output text={input} />
      <ButtonsGrid>
        {BUTTON_ROWS.map((value) => (
          <Button
            key={value}
            value={value}
            onClick={() => handleButtonClick(value as string)}
          />
        ))}
      </ButtonsGrid>
    </Container>
  );
};
