import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const BoldCell = styled.td`
  font-weight: bold;
`;

const CenteredCell = styled(BoldCell)`
  text-align: center;
`;

export default ({ record }) => (
  <tr>
    <BoldCell>{moment(record.day).format('dddd, MMM D, YYYY')}</BoldCell>
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
  </tr>
)
