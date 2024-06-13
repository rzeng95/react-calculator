export enum Symbol {
  DIVIDE = '÷',
  MULTIPLY = '×',
  ADD = '+',
  MINUS = '-',
  EQUAL = '=',
  DECIMAL = '.',
}

const Operators: string[] = [
  Symbol.DIVIDE,
  Symbol.MULTIPLY,
  Symbol.ADD,
  Symbol.MINUS,
  Symbol.EQUAL,
];

export const isOperator = (input: string | number) => {
  return Operators.includes(input as string);
};
