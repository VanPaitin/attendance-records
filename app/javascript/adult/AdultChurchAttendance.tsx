import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import FormModal from './FormModal';
import ActionsPopover from './ActionsPopover';
import AttendancesTable from './AttendancesTable';

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

  let removeRecord = (id) => {
    setPopoverId(null);
    setRecords(records.filter(record => record.id !== id))
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
      {popoverId &&
        <ActionsPopover recordId={popoverId} position={popoverPosition} removeRecord={removeRecord} />}

      <h3>Recent Records</h3>

      <AttendancesTable records={records} showPopover={showPopover} />

      <div style={{ textAlign: 'right', marginTop: '50px' }}>
        <Button as={Link} to={`${match.url}attendance/new`} variant="primary" size="lg">
          New Record
        </Button>
      </div>

      <Route path={`${match.path}attendance/new`}>
        <FormModal fetchRecords={fetchRecords} clearPopover={setPopoverId}/>
      </Route>
      <Route path={`${match.path}attendance/:id/edit`}>
        <FormModal fetchRecords={fetchRecords} clearPopover={setPopoverId}/>
      </Route>
    </div>
  )
}
