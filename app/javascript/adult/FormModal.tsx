import React from 'react';
import { Redirect, RouteProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import AdultAttendanceForm from './AdultAttendanceForm';

type ModalProps = {
  fetchRecords: () => void
  showAlert: (messageConfig: { message: string; variance: string }) => void
}

interface ModalState {
  modal: boolean
  redirect: boolean
  validated: boolean
  buttonState: string
  buttonText: string
  errors: string[]
}

const StyledLoader = styled(Button)`
  text-align: left;
  opacity: 0.9 !important;
  cursor: not-allowed;
`;

const Errors = styled.ul`
  margin-bottom: 0
  margin-top: 1rem;
  color: red;
  font-style: italic
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
      buttonText: this.id ? 'Update' : 'Create',
      errors: []
    }
  }

  toggle = () => {
    $('.datepicker').datepicker('hide');
    this.setState({ modal: !this.state.modal })
  };

  handleError = ({ response: { data }}) => {
    this.setState({
      errors: data, buttonState: 'primary', buttonText: this.id ? 'Update' : 'Create'
    });
    this.props.showAlert({ message: 'Please review', variance: 'danger' })
  };

  createRecord = formData => {
    axios.post('/attendances?mode=adult', formData)
      .then(this.redirectBack).catch(this.handleError)
  };

  updateRecord = formData => {
    axios.put(`/attendances/${this.id}?mode=adult`, formData)
      .then(this.redirectBack).catch(this.handleError)
  };

  redirectBack = () => {
    this.setState({ buttonState: 'success', buttonText: this.id ? 'Updated!' : 'Created!' });

    this.props.fetchRecords({ showFlash: true });

    setTimeout(() => {
      this.toggle();

      this.props.showAlert({
        message: `Record successfully ${this.id ? 'Updated': 'Created'}!`, variance: 'success'
      });
    }, 800);
  };

  submitForm = () => {
    let form = document.getElementById('adultAttendance') as HTMLFormElement;

    if (form.checkValidity() === true) {
      let formData = new FormData(form);

      this.setState({ buttonText: 'Loading' });

      this.id ? this.updateRecord(formData) : this.createRecord(formData)
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
        <Modal
          isOpen={modal} toggle={this.toggle}
          onClosed={() => this.setState({ redirect: true })}
          size='lg' centered>
          <ModalHeader toggle={this.toggle}>{this.id ? 'Edit' : 'New'} Record</ModalHeader>

          <Errors>
            { this.state.errors.map((error, index) => <li key={index}>{error}</li>)}
          </Errors>

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
