import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';

export const Container = styled.div`
  max-width: 1170px;
  margin: 50px auto;
`;

export const FlashContainer = styled.div`
  position: absolute;
  width: 100%;
`;

export const StyledAlert = styled(Alert)`
  font-size: 19px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  word-spacing: 10px;
`;

export const Title = styled.h3`
  margin-bottom: 30px;
`;
