import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Attendance from '../Attendance';
import FormModal from './FormModal';

const UnpaddedHeading = styled.th`
  padding-top: 3px !important;
  padding-bottom: 5px !important;
`;

const CenteredHeading = styled(UnpaddedHeading)`
  text-align: center;
`;

export default () => {
  let [records, setRecords] = useState([]);

  let match = useRouteMatch();

  let fetchRecords = () => {
    axios.get('/attendances', { params: { mode: 'adult' }}).then(({ data }) => {
      setRecords(data);
    });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className='container' style={{ marginTop: '50px', maxWidth: '1170px' }}>
      <h3>Recent Records</h3>
      <Table striped bordered hover style={{ marginTop: '30px' }}>
        <thead>
          <tr>
            <UnpaddedHeading rowSpan={2}>Day</UnpaddedHeading>
            <UnpaddedHeading rowSpan={2}>Service</UnpaddedHeading>
            <CenteredHeading rowSpan={2}>Male</CenteredHeading>
            <CenteredHeading rowSpan={2}>Female</CenteredHeading>
            <CenteredHeading rowSpan={2}>Children</CenteredHeading>
            <CenteredHeading colSpan={2}>Online</CenteredHeading>
            <CenteredHeading colSpan={2}>Newcomers</CenteredHeading>
            <CenteredHeading colSpan={2}>Decisions</CenteredHeading>
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
        {records.map(record => <Attendance record={record} key={record.id}/>)}
        </tbody>
      </Table>
      <div style={{ textAlign: 'right', marginTop: '50px' }}>
        <Button as={Link} to={`${match.url}attendance/new`} variant="primary" size="lg">
          New Record/Attendance
        </Button>
      </div>

      <Route path={`${match.path}attendance/new`}>
        <FormModal fetchRecords={fetchRecords}/>
      </Route>
    </div>
  )
}
