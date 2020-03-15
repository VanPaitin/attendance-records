import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

const HeaderCell = styled.th`
  text-align: center;
`;

const Header = styled(HeaderCell)`
  padding-top: 5px;
  padding-bottom: 3px;
  text-align: left;
`;

const SubHeader = styled(HeaderCell)`
  font-style: italic;
`;

const TableHeader = props => {
  const { hasOnlineAttendance, hasNewComers, hasDecisions } = props;

  return (
    <thead>
      <tr>
        <Header rowSpan={2}>Day</Header>
        <Header rowSpan={2}>Service</Header>
        <HeaderCell rowSpan={2}>Male</HeaderCell>
        <HeaderCell rowSpan={2}>Female</HeaderCell>
        {hasOnlineAttendance && <SubHeader colSpan={2}>Online</SubHeader>}
        {hasNewComers && <SubHeader colSpan={2}>Newcomers</SubHeader>}
        {hasDecisions && <SubHeader colSpan={2}>Decisions</SubHeader>}
      </tr>
      <tr>
        {hasOnlineAttendance && (
          <>
            <HeaderCell>
              <FontAwesomeIcon icon={faFacebook} color='#3578E5' /> Facebook
            </HeaderCell>
            <HeaderCell>
              <FontAwesomeIcon icon={faYoutube} color='red' /> Youtube
            </HeaderCell>
          </>
        )}
        {hasNewComers && (
          <>
            <HeaderCell>Male</HeaderCell>
            <HeaderCell>Female</HeaderCell>
          </>
        )}
        {hasDecisions && (
          <>
            <HeaderCell>Male</HeaderCell>
            <HeaderCell>Female</HeaderCell>
          </>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
