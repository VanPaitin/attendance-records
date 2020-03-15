import React from 'react';

const TableBody = ({ records }) => {
  return (
    <tbody>
      {records.map(record => (
        <TableRow record={record} />
      ))}
    </tbody>
  );
};

export default TableBody;
