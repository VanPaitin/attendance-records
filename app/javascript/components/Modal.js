import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from 'reactstrap';
import styled from 'styled-components';

const StyledLoader = styled(Button)`
  text-align: left;
  opacity: 0.9 !important;
  cursor: not-allowed;
`;

const Errors = styled.ul`
  margin: 0 0 1rem;
  color: red;
  font-style: italics;
`;

const LoadingButton = () => (
  <StyledLoader color='info' size='lg' disabled>
    Loading...
    <Spinner type='grow' size='sm' role='status' aria-hidden='true' />
  </StyledLoader>
);

const FormErrors = errors => {
  return (
    <Errors>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </Errors>
  );
};

const FormModal = props => {
  const { id } = props.match.params;
  const { errors, submitForm, redirect } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onClosed={redirect}
      size='lg'
      centered
    >
      <ModalHeader toggle={toggle}>{id ? 'Edit' : 'New'} Record</ModalHeader>
      <ModalBody>
        <FormErrors errors={errors} />
        {props.children(toggle)}
      </ModalBody>
      <ModalFooter>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button color='primary' onClick={submitForm} size='lg'>
            {id ? 'Update' : 'Create'}
          </Button>
        )}
        <Button color='danger' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormModal;
