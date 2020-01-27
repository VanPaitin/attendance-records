import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Popover from 'react-bootstrap/Popover';


const StyledPopover = styled(Popover)`
  &#popover-basic {
    top: ${({ position }) => position.top - 20}px;
    left: ${({ position }) => position.left}px;
    width: 166px;
  }
`;

export default ({ recordId, position, removeRecord, clearPopover }) => (
  <Fade in={!!recordId} unmountOnExit>
    <StyledPopover id='popover-basic' position={position} onClick={e => e.stopPropagation()}>
      <Popover.Content>
        <Button as={Link} to={`/attendance/${recordId}/edit`} variant='outline-primary' onClick={() => clearPopover()}>
          Edit
        </Button>&nbsp; &nbsp; &nbsp;
        <Button variant="outline-danger" onClick={() => removeRecord(recordId)}>Delete</Button>
      </Popover.Content>
    </StyledPopover>
  </Fade>
);
