import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { Colors } from 'src/utils';

interface Props {
  leftOperand: string;
  rightOperand: string;
  operator: string;
}

const Container = styled.div({
  borderRadius: '8px',
  backgroundColor: Colors.MEDIUMGREY,
  padding: '18px',
});

const Header = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Toggle = styled.div({
  textAlign: 'center',
  cursor: 'pointer',
  width: '300px',
  height: '30px',
  backgroundColor: Colors.LIGHTGREY,
  color: Colors.DARKGREY,
  fontWeight: '500',
  paddingTop: '8px',
  borderRadius: '8px',
});

const DebugLine = styled.div({
  fontSize: '18px',
  fontWeight: '600',
  color: Colors.WHITE,
  marginTop: '8px',
});

export const Debug = ({ leftOperand, rightOperand, operator }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <Container>
      <Header>
        <Toggle onClick={handleToggle}>Toggle Debug Console</Toggle>
      </Header>

      {show && (
        <>
          <DebugLine>Left Operand: {leftOperand}</DebugLine>
          <DebugLine>Right Operand: {rightOperand}</DebugLine>
          <DebugLine>Operator: {operator}</DebugLine>
        </>
      )}
    </Container>
  );
};
