import React from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faYoutube} from '@fortawesome/free-brands-svg-icons';
import Attendance from './Attendance';

const UnpaddedHeading = styled.th`
  padding-top: 3px !important;
  padding-bottom: 5px !important;
`;

const CenteredHeading = styled(UnpaddedHeading)`
  text-align: center;
`;

const SubHeading = styled(CenteredHeading)`
  font-style: italic;
  font-weight: 500;
`;

export default ({ records, showPopover }) => (
  <Table striped bordered hover style={{ marginTop: '30px' }}>
    <thead>
    <tr>
      <UnpaddedHeading rowSpan={2}>Day</UnpaddedHeading>
      <UnpaddedHeading rowSpan={2}>Service</UnpaddedHeading>
      <CenteredHeading rowSpan={2}>Male</CenteredHeading>
      <CenteredHeading rowSpan={2}>Female</CenteredHeading>
      <CenteredHeading rowSpan={2}>Children</CenteredHeading>
      <SubHeading colSpan={2}>Online</SubHeading>
      <SubHeading colSpan={2}>Newcomers</SubHeading>
      <SubHeading colSpan={2}>Decisions</SubHeading>
    </tr>
    <tr>
      <CenteredHeading><FontAwesomeIcon icon={faFacebook} color='#3578E5'/> Facebook</CenteredHeading>
      <CenteredHeading><FontAwesomeIcon icon={faYoutube} color='red' /> Youtube</CenteredHeading>
      <CenteredHeading>Male</CenteredHeading>
      <CenteredHeading>Female</CenteredHeading>
      <CenteredHeading>Male</CenteredHeading>
      <CenteredHeading>Female</CenteredHeading>
    </tr>
    </thead>
    <tbody>
    {records.map(record => <Attendance record={record} showPopover={showPopover} key={record.id}/>)}
    </tbody>
  </Table>
)
