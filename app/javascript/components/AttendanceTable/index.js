import React from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const AttendanceTable = props => {
  const { hasOnlineAttendance, hasNewComers, hasDecisions, records } = props;

  return (
    <Table striped bordered hover>
      <TableHeader
        hasOnlineAttendance={hasOnlineAttendance}
        hasNewComers={hasNewComers}
        hasDecisions={hasDecisions}
      />
      <TableBody records={records} />
    </Table>
  );
};

export default AttendanceTable;
