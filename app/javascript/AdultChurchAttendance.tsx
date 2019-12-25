import React, { useEffect, useState } from 'react';
import Attendance from "./Attendance";
import axios from "axios";

export default () => {
  let [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('/attendances', { params: { mode: 'adult' }}).then(({ data }) => {
      setRecords(data);
    })
  }, []);

  return (
    <table>
      <thead><tr><th>Male</th><th>Female</th></tr></thead>
      <tbody>
      {records.map(record => <Attendance record={record} />)}
      </tbody>
    </table>
  )
}
