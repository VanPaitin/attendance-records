import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '@chenfengyuan/datepicker/dist/datepicker.css';
import '@chenfengyuan/datepicker/dist/datepicker';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap-select/dist/css/bootstrap-select.css';
import 'bootstrap-select';

import ServiceOptions from './ServiceOptions';

const StyledInput = styled(Form.Control)`
  font-weight: bold;
  border-color: #A9A9A9;
  ::placeholder {
    font-weight: 200;
    color: #C8C8C8;
  }
`;

const FieldsetLabel = styled(Form.Label)`
  margin-top: 10px;
`;

export default () => {
  let [day, setDay] = useState(new Date);
  let [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/services').then(({ data }) => {
      setServices(data);
    })
  }, []);

  useEffect(() => {
    $('.datepicker').datepicker({
      autoHide: true,
      pick: e => {
        e.preventDefault();
        setDay(e.date);
        e.target.value = moment(e.date).format('MMMM Do, YYYY.');
      }
    });
  }, []);

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formBasicDate">
          <Form.Label>Date</Form.Label>
          <StyledInput placeholder="Specify date" className="datepicker"/>
          <Form.Text className="text-muted">
            Please select the date of the Church meeting
          </Form.Text>
        </Form.Group>

        <Form.Group as={Col} controlId='formBasicService'>
          <Form.Label>Service</Form.Label>
          <Form.Control
            as='select'
            className='selectpicker show-tick'
            title='Please choose the service'
            data-style="btn-info"
            data-header="Select the service held">
            <ServiceOptions services={services}/>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group  as={Col} controlId="formBasicMen">
          <Form.Label>Male</Form.Label>
          <StyledInput type='number' placeholder="Number of men"/>
          <Form.Text className="text-muted">
            Please enter the number of men
          </Form.Text>
        </Form.Group>
        <Form.Group  as={Col} controlId="formBasicWomen">
          <Form.Label>Female</Form.Label>
          <StyledInput type='number' placeholder="Number of women"/>
          <Form.Text className="text-muted">
            Please enter the number of women
          </Form.Text>
        </Form.Group>
        <Form.Group  as={Col} controlId="formBasicChildren">
          <Form.Label>Children</Form.Label>
          <StyledInput type='number' placeholder="Number of children"/>
          <Form.Text className="text-muted">
            Please enter the number of children
          </Form.Text>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group  as={Col}>
          <fieldset>
            <legend>Online:</legend>
            <Form.Label><FontAwesomeIcon icon={faFacebook} color='#3578E5'/> Facebook</Form.Label>
            <StyledInput type='number' placeholder="Number of facebook viewers"/>
            <FieldsetLabel><FontAwesomeIcon icon={faYoutube} color='red' /> Youtube</FieldsetLabel>
            <StyledInput type='number' placeholder="Number of youtube viewers"/>
          </fieldset>
          <Form.Text className="text-muted">
            Please enter the number of online viewers by platform
          </Form.Text>
        </Form.Group>

        <Form.Group  as={Col}>
          <fieldset>
            <legend>Newcomers:</legend>
            <Form.Label>Male</Form.Label>
            <StyledInput type='number' placeholder="Number of male newcomers"/>
            <FieldsetLabel>Female</FieldsetLabel>
            <StyledInput type='number' placeholder="Number of female newcomers"/>
          </fieldset>
          <Form.Text className="text-muted">
            Enter the number of newcomers
          </Form.Text>
        </Form.Group>

        <Form.Group  as={Col}>
          <fieldset>
            <legend>Decisions:</legend>
            <Form.Label>Male</Form.Label>
            <StyledInput type='number' placeholder="Number of male decisions"/>
            <FieldsetLabel>Female</FieldsetLabel>
            <StyledInput type='number' placeholder="Number of female decisions"/>
          </fieldset>
          <Form.Text className="text-muted">
            Enter the number of decisions
          </Form.Text>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

