import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Title } from '../styles/pageStyles';
import { AttendanceTable, Button } from '../components';
import ServicesApi from '../api/servicesApi';

const BtnContainer = styled.div`
  text-align: right;
  margin-top: 50px;
`;

const JuniorPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    ServicesApi.getServices().then(res => setServices(res));
  }, []);

  return (
    <Container>
      <Title>Records</Title>
      <AttendanceTable
        hasNewComers
        hasDecisions
        hasOnlineAttendance
        records={[]}
      />
      <BtnContainer>
        <Button as={Link} variant='primary' size='lg'>
          New Record
        </Button>
      </BtnContainer>
    </Container>
  );
};

export default JuniorPage;
