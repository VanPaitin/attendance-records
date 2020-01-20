import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';


const StyledPopover = styled(Popover)`
  &#popover-basic {
    top: ${({ position }) => position.top - 20}px;
    left: ${({ position }) => position.left}px;
    width: 166px;
  }
`;

export default ({ recordId, position, removeRecord, clearPopover }) => (
  <StyledPopover id='popover-basic' position={position} onClick={e => e.stopPropagation()}>
    <Popover.Content>
      <Button as={Link} to={`/attendance/${recordId}/edit`} variant='outline-primary' onClick={() => clearPopover()}>
        Edit
      </Button>&nbsp; &nbsp; &nbsp;
      <Button variant="outline-danger" onClick={() => removeRecord(recordId)}>Delete</Button>
    </Popover.Content>
  </StyledPopover>
);
