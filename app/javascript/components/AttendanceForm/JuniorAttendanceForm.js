import React, { useState, useEffect, useLayoutEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import DatePicker from 'react-datepicker';
import Select from '../Select';
import ServicesApi from '../../api/servicesApi';
import AttendanceApi from '../../api/attendanceApi';

const StyledInput = styled(Form.Control)`
  font-weight: bold;
  border-color: #a9a9a9;
  ::placeholder {
    font-weight: 200;
    color: #c8c8c8;
  }
`;

const FieldsetLabel = styled(Form.Label)`
  margin-top: 10px;
`;

export default ({ recordId, validated }) => {
  const [record, setRecord] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [services, setServices] = useState([]);
  let [serviceId, setServiceId] = useState(null);
  let [showServiceTitle, setShowServiceTitle] = useState(false);

  useEffect(() => {
    ServicesApi.getServices().then(({ data }) => {
      setServices(data);
    });
  }, []);

  useEffect(() => {
    if (recordId) {
      AttendanceApi.getAttendanceById(recordId, 'adult').then(({ data }) => {
        setStartDate(data.day);
        setRecord(data);
        if (data.extra_info) {
          setShowServiceTitle(true);
        }
      });
    }
  }, []);

  return (
    <Form noValidate validated={validated} id='adultAttendance'>
      <Form.Control
        as='input'
        type='hidden'
        name='authenticity_token'
        value={token}
      />
      <Form.Control
        as='input'
        type='hidden'
        name='[adult][day]'
        value={day.toString()}
      />
      <Form.Row>
        <Form.Group as={Col} controlId='formBasicDate'>
          <Form.Label>Date</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat='MMMM Do, YYYY'
          />
          <Form.Control.Feedback type='invalid'>
            Please select the date of the Church meeting!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId='formBasicService'>
          <Form.Label>Service</Form.Label>
          <Form.Control
            as='select'
            title='Please choose the service'
            data-style='btn-primary'
            data-header='Select the service held'
            name='[adult]service_id'
            onChange={handleServiceChange}
            className='selectpicker show-tick'
            required
          >
            <ServiceOptions services={services} />
          </Form.Control>
          <Form.Control.Feedback className='valid-service-feedback'>
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback
            type='invalid'
            className='invalid-service-feedback'
          >
            Please select a service type!
          </Form.Control.Feedback>
        </Form.Group>

        {showServiceTitle && (
          <Form.Group as={Col}>
            <Form.Label>Service Title</Form.Label>
            <StyledInput
              type='text'
              placeholder='Enter any extra info'
              id='service-title'
              defaultValue={record.extra_info.service_title}
              name='[adult][extra_info_attributes]service_title'
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please enter the title of the service!
            </Form.Control.Feedback>
          </Form.Group>
        )}
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formBasicMen'>
          <Form.Label>Male</Form.Label>
          <StyledInput
            type='number'
            placeholder='Number of men'
            name='[adult]male'
            defaultValue={record.male}
          />
          <Form.Text className='text-muted'>
            Please enter the number of men
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col} controlId='formBasicWomen'>
          <Form.Label>Female</Form.Label>
          <StyledInput
            type='number'
            placeholder='Number of women'
            name='[adult]female'
            defaultValue={record.female}
          />
          <Form.Text className='text-muted'>
            Please enter the number of women
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col} controlId='formBasicChildren'>
          <Form.Label>Children</Form.Label>
          <StyledInput
            type='number'
            placeholder='Number of children'
            name='[adult]children'
            defaultValue={record.children}
          />
          <Form.Text className='text-muted'>
            Please enter the number of children
          </Form.Text>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <fieldset>
            <legend>Online:</legend>
            <Form.Label>
              <FontAwesomeIcon icon={faFacebook} color='#3578E5' /> Facebook
            </Form.Label>
            <StyledInput
              type='number'
              placeholder='Number of facebook viewers'
              name='[adult][online]facebook'
              defaultValue={record.online.facebook}
            />
            <FieldsetLabel>
              <FontAwesomeIcon icon={faYoutube} color='red' /> Youtube
            </FieldsetLabel>
            <StyledInput
              type='number'
              placeholder='Number of youtube viewers'
              name='[adult][online]youtube'
              defaultValue={record.online.youtube}
            />
          </fieldset>
          <Form.Text className='text-muted'>
            Please enter the number of online viewers by platform
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <fieldset>
            <legend>Newcomers:</legend>
            <Form.Label>Male</Form.Label>
            <StyledInput
              type='number'
              placeholder='Number of male newcomers'
              name='[adult][newcomers]male'
              defaultValue={record.newcomers.male}
            />
            <FieldsetLabel>Female</FieldsetLabel>
            <StyledInput
              type='number'
              placeholder='Number of female newcomers'
              name='[adult][newcomers]female'
              defaultValue={record.newcomers.female}
            />
          </fieldset>
          <Form.Text className='text-muted'>
            Enter the number of newcomers
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <fieldset>
            <legend>Decisions:</legend>
            <Form.Label>Male</Form.Label>
            <StyledInput
              type='number'
              placeholder='Number of male decisions'
              name='[adult][decisions]male'
              defaultValue={record.decisions.male}
            />
            <FieldsetLabel>Female</FieldsetLabel>
            <StyledInput
              type='number'
              placeholder='Number of female decisions'
              name='[adult][decisions]female'
              defaultValue={record.decisions.female}
            />
          </fieldset>
          <Form.Text className='text-muted'>
            Enter the number of decisions
          </Form.Text>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};
