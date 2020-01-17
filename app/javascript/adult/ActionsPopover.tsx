import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import axios from 'axios';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';


const StyledPopover = styled(Popover)`
  &#popover-basic {
    top: ${({ position }) => position.top - 20}px;
    left: ${({ position }) => position.left}px;
    width: 166px;
  }
`;

export default ({ recordId, position, removeRecord }) => {
  let deleteRecord = () => {
    let confirmation = confirm('Are you sure to delete the record?');

    if (confirmation) {
      let token = $('meta[name="csrf-token"]').attr("content");
      axios.delete(
        `/attendances/${recordId}?mode=adult`,
        { data: { authenticity_token: token } }
      ).then(() => removeRecord(recordId))
    }
  };

  return (
    <StyledPopover id='popover-basic' position={position} onClick={e => e.stopPropagation()}>
      <Popover.Content>
        <Button
          as={Link} to={`/attendance/${recordId}/edit`}
          variant="outline-primary">
          Edit
        </Button>&nbsp; &nbsp; &nbsp;
        <Button variant="outline-danger" onClick={deleteRecord}>Delete</Button>
      </Popover.Content>
    </StyledPopover>
  );
}

