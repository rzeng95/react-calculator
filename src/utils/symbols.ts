export enum Symbol {
  DIVIDE = '÷',
  MULTIPLY = '×',
  ADD = '+',
  MINUS = '-',
  EQUAL = '=',
  DECIMAL = '.',
  CLEAR = 'Clear',
}

const Operators: string[] = [
  Symbol.DIVIDE,
  Symbol.MULTIPLY,
  Symbol.ADD,
  Symbol.MINUS,
  Symbol.EQUAL,
];

export const isOperator = (input: string | number | undefined) => {
  if (!input) {
    return false;
  }

  return Operators.includes(input as string);
};

export const isNumber = (input: string | undefined) => {
  return !isNaN(parseInt(input as string, 10));
};

export const createExpression = (rawInput: string) => {
  // replace operator symbols with actual mathematical operators
  const formattedString = rawInput
    .replaceAll(Symbol.DIVIDE, '/')
    .replaceAll(Symbol.MULTIPLY, '*')
    .replaceAll(Symbol.ADD, '+')
    .replaceAll(Symbol.MINUS, '-');

  return formattedString;
};
