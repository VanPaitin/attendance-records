import React, { useState, useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import axios from 'axios';
import Attendance from './Attendance';

export default () => {
  let [mode, setMode] = useState('adult');
  let [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('/attendances', { params: { mode }}).then(({ data }) => {
      setRecords(data);
    })
  }, [mode]);

  return (
    <div>
      <ToggleButtonGroup type='radio' name='mode' onChange={value => setMode(value)}>
        <ToggleButton type="radio" name="mode" defaultChecked value="adult">
          Adult
        </ToggleButton>
        <ToggleButton type="radio" name="mode" value="teens">
          Teens Church
        </ToggleButton>
        <ToggleButton type="radio" name="mode" value="junior church">
          Junior Church
        </ToggleButton>
      </ToggleButtonGroup>
      <table>
        <thead><tr><th>Male</th><th>Female</th></tr></thead>
        <tbody>
          {records.map(record => <Attendance record={record} />)}
        </tbody>
      </table>
    </div>
  )
}
