import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../utils';

const Cell = styled.td`
  font-weight: bold;
`;

const CenteredCell = styled(Cell)`
  text-align: center;
`;

const BlueText = styled.span`
  color: 'blue';
`;

const PointerRow = styled.tr`
  cursor: pointer;
`;

const TableRow = ({ record, showPopover }) => {
  return (
    <PointerRow onClick={e => showPopover(e, record.id)}>
      <BoldCell>{formatDate(record.day)}</BoldCell>
      <BoldCell>
        <BlueText>{record.service_name}</BlueText>
      </BoldCell>
      <CenteredCell>{record.male}</CenteredCell>
      <CenteredCell>{record.female}</CenteredCell>
      <CenteredCell>{record.children}</CenteredCell>
      <CenteredCell>{record.online.facebook}</CenteredCell>
      <CenteredCell>{record.online.youtube}</CenteredCell>
      <CenteredCell>{record.newcomers.male}</CenteredCell>
      <CenteredCell>{record.newcomers.female}</CenteredCell>
      <CenteredCell>{record.decisions.male}</CenteredCell>
      <CenteredCell>{record.decisions.female}</CenteredCell>
    </PointerRow>
  );
};

export default TableRow;
