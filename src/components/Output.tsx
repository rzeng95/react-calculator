import styled from '@emotion/styled';
import { Colors } from 'src/utils';

interface Props {
  text: string;
  expression: string;
}

const Container = styled.div({
  marginTop: '24px',
  marginBottom: '24px',
  width: '470px',
  textAlign: 'right',
  textWrap: 'wrap',
  minHeight: '80px',
});

const Copy = styled.div({
  fontSize: '36px',
  fontWeight: '700',
  color: Colors.WHITE,
});

const Expression = styled.div({
  height: '20px',
  fontSize: '18px',
  fontWeight: '500',
  color: Colors.LIGHTGREY,
});

export const Output = ({ text, expression }: Props) => {
  return (
    <Container>
      <Expression>{expression}</Expression>
      <Copy>{text}</Copy>
    </Container>
  );
};
