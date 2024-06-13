import styled from '@emotion/styled';
import { Button } from './Button';
import { Colors, Symbol } from 'src/utils';

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

export const Calculator = () => {
  return (
    <Container>
      <ButtonsGrid>
        <Button value={7} />
        <Button value={8} />
        <Button value={9} />
        <Button value={Symbol.DIVIDE} />

        <Button value={4} />
        <Button value={5} />
        <Button value={6} />
        <Button value={Symbol.MULTIPLY} />

        <Button value={1} />
        <Button value={2} />
        <Button value={3} />
        <Button value={Symbol.ADD} />

        {/* 0 takes up two column widths (see Button css) */}
        <Button value={0} />
        <Button value={Symbol.DECIMAL} />
        <Button value={Symbol.EQUAL} />
      </ButtonsGrid>
    </Container>
  );
};
