import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Attendance from '../Attendance';
import FormModal from './FormModal';

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
        {records.map(record => <Attendance record={record} key={record.id}/>)}
        </tbody>
      </table>

      <Route path={`${match.path}attendance/new`}>
        <FormModal fetchRecords={fetchRecords}/>
      </Route>
    </div>
  )
}
