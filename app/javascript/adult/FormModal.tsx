import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NewAdultAttendance from './NewAdultAttendance';

export default () => {
  let [modal, setModal] = useState(true);
  let [redirect, setRedirect] = useState(false);

  let toggle = () => setModal(!modal);

  return (
    redirect ? <Redirect to='/'/> : (
      <Modal isOpen={modal} toggle={toggle} onClosed={() => setRedirect(true)} size='lg' centered>
        <ModalHeader toggle={toggle}>New Record</ModalHeader>
        <ModalBody>
          <NewAdultAttendance />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{" "}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  )
}
