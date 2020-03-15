import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../utils';

const BoldCell = styled.td`
  font-weight: bold;
`;

const CenteredCell = styled(BoldCell)`
  text-align: center;
`;

const PointerRow = styled.tr`
  cursor: pointer;
`;

export default ({ record, showPopover }) => (
  <PointerRow onClick={e => showPopover(e, record.id)}>
    <BoldCell>{formatDate(record.day)}</BoldCell>
    <BoldCell style={{ color: 'blue' }}>{record.service_name}</BoldCell>
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
