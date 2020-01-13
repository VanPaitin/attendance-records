import React from 'react';
import styled from 'styled-components';
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";


const StyledPopover = styled(Popover)`
  &#popover-basic {
    top: ${({ position }) => position.top - 20}px;
    left: ${({ position }) => position.left}px;
    width: 166px;
  }
`;

export default ({ recordId, position }) => {
  return (
    <StyledPopover id='popover-basic' position={position} onClick={e => e.stopPropagation()}>
      <Popover.Content>
        <Button variant="outline-primary">Edit</Button>&nbsp; &nbsp; &nbsp;
        <Button variant="outline-danger">Delete</Button>
      </Popover.Content>
    </StyledPopover>
  );
}

