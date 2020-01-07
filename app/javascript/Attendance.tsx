import React from 'react';
import moment from 'moment';

export default ({ record }) => (
  <tr>
    <td>{moment(record.day).format('dddd, MMMM Do YYYY')}</td>
    <td>{record.service_name}</td>
    <td>{record.male}</td>
    <td>{record.female}</td>
    <td>{record.children}</td>
    <td>{record.online.facebook}</td>
    <td>{record.online.youtube}</td>
    <td>{record.newcomers.male}</td>
    <td>{record.newcomers.female}</td>
    <td>{record.decisions.male}</td>
    <td>{record.decisions.female}</td>
  </tr>
)
