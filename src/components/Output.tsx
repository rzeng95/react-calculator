import styled from '@emotion/styled';
import { Colors } from 'src/utils';

interface Props {
  text: string;
}

const Container = styled.div({
  marginTop: '24px',
  marginBottom: '24px',
  width: '100%',
  textAlign: 'right',
  textWrap: 'wrap',
  height: '40px',
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
