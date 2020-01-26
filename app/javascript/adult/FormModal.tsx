import React from 'react';
import { Redirect, RouteProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import AdultAttendanceForm from './AdultAttendanceForm';

type ModalProps = {
  fetchRecords: () => void
}

interface ModalState {
  modal: boolean
  redirect: boolean
  validated: boolean
  buttonState: string
  buttonText: string
}

const StyledLoader = styled(Button)`
  text-align: left;
  opacity: 0.9 !important;
  cursor: not-allowed;
`;

class FormModal extends React.Component<ModalProps & RouteProps, ModalState> {
  readonly id: string;

  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      modal: true,
      redirect: false,
      validated: false,
      buttonState: 'primary',
      buttonText: this.id ? 'Update' : 'Create'
    }
  }

  toggle = () => {
    $('.datepicker').datepicker('hide');
    this.setState({ modal: !this.state.modal })
  };

  createRecord = form => {
    axios.post('/attendances?mode=adult', new FormData(form)).then(this.redirectBack);
  };

  updateRecord = form => {
    axios.put(`/attendances/${this.id}?mode=adult`, new FormData(form)).then(this.redirectBack)
  };

  redirectBack = () => {
    this.setState({ buttonState: 'success', buttonText: this.id ? 'Updated!' : 'Created!' });

    this.props.fetchRecords();

    setTimeout(this.toggle, 800);
  };

  submitForm = () => {
    let form = document.getElementById('adultAttendance') as HTMLFormElement;

    if (form.checkValidity() === true) {
      this.setState({ buttonText: 'Loading' });
      this.id ? this.updateRecord(form) : this.createRecord(form)
    } else {
      this.setState({ validated: true }, () => {
        ['valid', 'invalid'].forEach(state => {
          let selector = document.querySelector(`.was-validated select.form-control:${state}`);

          if (selector) {
            let feedback = document.querySelector(`.${state}-service-feedback`) as HTMLElement;
            feedback.style.display = 'block';
          }
        })
      })
    }
  };

  renderLoadingButton = () => (
    <StyledLoader color='info' size='lg' disabled>
      Loading...
      <Spinner type="grow" size="sm" role="status" aria-hidden="true"/>
    </StyledLoader>
  );

  render() {
    let { modal, buttonState, buttonText, redirect } = this.state;

    return (
      redirect ? <Redirect to='/'/> : (
        <Modal isOpen={modal} toggle={this.toggle} onClosed={() => this.setState({ redirect: true })} size='lg'>
          <ModalHeader toggle={this.toggle}>{this.id ? 'Edit' : 'New'} Record</ModalHeader>

          <ModalBody>
            <AdultAttendanceForm recordId={this.id} validated={this.state.validated}/>
          </ModalBody>

          <ModalFooter>
            {buttonText === 'Loading' ? this.renderLoadingButton() :
              <Button color={buttonState} onClick={this.submitForm} size='lg'>
                {buttonText}
              </Button>}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )
    )
  }
}

export default withRouter(FormModal);
