import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Attendance from '../Attendance';
import FormModal from './FormModal';

export default () => {
  let [records, setRecords] = useState([]);

  let match = useRouteMatch();

  useEffect(() => {
    axios.get('/attendances', { params: { mode: 'adult' }}).then(({ data }) => {
      setRecords(data);
    })
  }, []);

  return (
    <div>
      <Button as={Link} to={`${match.url}attendance/new`} variant="primary" size="lg">
        New Record/Attendance
      </Button>
      <table>
        <thead>
        <tr>
          <th>Male</th>
          <th>Female</th>
        </tr>
        </thead>
        <tbody>
        {records.map(record => <Attendance record={record}/>)}
        </tbody>
      </table>

      <Route path={`${match.path}attendance/new`}>
        <FormModal/>
      </Route>
    </div>
  )
}
