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
import ActionsPopover from './ActionsPopover';

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

export default () => {
  let [records, setRecords] = useState([]);
  let [popoverId, setPopoverId] = useState(null);
  let [popoverPosition, setPopoverPosition] = useState({});

  let match = useRouteMatch();

  let fetchRecords = () => {
    axios.get('/attendances', { params: { mode: 'adult' }}).then(({ data }) => {
      setRecords(data);
    });
  };

  let showPopover = (e, id) => {
    e.stopPropagation();
    e.persist();
    if (popoverId == id) {
      setPopoverId(null)
    } else {
      let clientWidth = document.body.clientWidth;
      let maxLeftOffset = clientWidth - 200;
      let leftOffset = e.clientX <= maxLeftOffset ? e.clientX : maxLeftOffset;
      setPopoverPosition({ left: leftOffset, top: e.clientY });
      setPopoverId(id);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className='container'  onClick={() => setPopoverId(null)}>
      {popoverId && <ActionsPopover recordId={popoverId} position={popoverPosition} />}
      <h3>Recent Records</h3>
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

      <div style={{ textAlign: 'right', marginTop: '50px' }}>
        <Button as={Link} to={`${match.url}attendance/new`} variant="primary" size="lg">
          New Record
        </Button>
      </div>

      <Route path={`${match.path}attendance/new`}>
        <FormModal fetchRecords={fetchRecords}/>
      </Route>
    </div>
  )
}
