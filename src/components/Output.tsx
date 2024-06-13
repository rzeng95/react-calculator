import styled from '@emotion/styled';
import { Colors } from 'src/utils';

interface Props {
  text: string;
}

const Container = styled.div({
  marginBottom: '24px',
  maxWidth: '470px',
  textWrap: 'wrap',
});

const Copy = styled.div({
  fontSize: '36px',
  fontWeight: '600',
  color: Colors.WHITE,
});

export const Output = ({ text }: Props) => {
  return (
    <Container>
      <Copy>{text}</Copy>
    </Container>
  );
};
