import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NewAdultAttendance from './NewAdultAttendance';

const LoadingText = styled.span`
  :after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;  
    animation: ellipsis steps(4,end) 1s infinite;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }
  
  @keyframes ellipsis {
    to {
      width: 1.25em;    
    }
  }
`;

const StyledLoadingButton = styled(Button)`
  max-height: 48px;
  width: 120px;
  text-align: left;
  opacity: 0.9 !important;
`;

let LoadingButton = () => (
  <StyledLoadingButton color='info' size='lg' disabled>
    <LoadingText>Loading</LoadingText>
  </StyledLoadingButton>
);

export default ({ fetchRecords }) => {
  let [modal, setModal] = useState(true);
  let [redirect, setRedirect] = useState(false);
  let [buttonState, setButtonState] = useState('primary');
  let [buttonText, setButtonText] = useState('Create');

  let toggle = () => {
    $('.datepicker').datepicker('hide');
    setModal(!modal);
  };

  let submitForm = () => {
    let form = document.getElementById('adultAttendance') as HTMLFormElement;

    setButtonText('Loading');

    axios.post('/attendances?mode=adult', new FormData(form))
      .then(() => {
        setButtonState('success');
        setButtonText('Created!');
        fetchRecords();
        setTimeout(toggle, 800);
      });
  };

  return (
    redirect ? <Redirect to='/'/> : (
      <Modal isOpen={modal} toggle={toggle} onClosed={() => setRedirect(true)} size='lg'>
        <ModalHeader toggle={toggle}>New Record</ModalHeader>

        <ModalBody>
          <NewAdultAttendance />
        </ModalBody>

        <ModalFooter>
          {buttonText === 'Loading' ? <LoadingButton /> :
            <Button color={buttonState} onClick={submitForm} size='lg' style={{ width: '100px' }}>
              {buttonText}
            </Button>}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  )
}
