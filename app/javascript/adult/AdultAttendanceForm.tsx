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

interface Online {
  facebook: number;
  youtube: number;
}

interface MaleFemaleProps {
  male: number;
  female: number;
}

const maleFemalePropsInit = { male: null, female: null };

class Record {
  day: Date = new Date();
  service_id: string;
  extra_info?: { service_title: string } = { service_title: '' };
  male: number;
  female: number;
  children: number;
  online: Online = { facebook: null, youtube: null };
  newcomers: MaleFemaleProps = maleFemalePropsInit;
  decisions: MaleFemaleProps = maleFemalePropsInit;
}

export default ({ recordId }) => {
  let formatDate = date => moment(date).format('MMMM Do, YYYY.');
  let [record, setRecord] = useState<Record>(new Record());
  let [day, setDay] = useState(record.day);
  let [services, setServices] = useState([]);
  let [showServiceTitle, setShowServiceTitle] = useState(false);
  let token = $('meta[name="csrf-token"]').attr("content");

  useEffect(() => {
    axios.get('/services').then(({ data }) => {
      setServices(data);
      $('.selectpicker').selectpicker('refresh');
    })
  }, []);

  useEffect(() => {
    if (recordId) {
      axios.get(`/attendances/${recordId}?mode=adult`).then(({ data }) => {
        setDay(data.day);
        setRecord(data);
        if (data.extra_info) {
          setShowServiceTitle(true);
        }
        let calendarInput = document.querySelector('.datepicker') as HTMLInputElement;
        calendarInput.value = formatDate(data.day);
        $('.selectpicker').selectpicker('val', data.service_id)
      })
    }
  }, []);

  useEffect(() => {
    let $datepicker = $('.datepicker');

    $datepicker.datepicker({
      autoHide: true,
      endDate: new Date(),
      pick: e => {
        e.preventDefault();
        setDay(e.date);
        e.target.value = formatDate(e.date);
      }
    });

    return () => $datepicker.datepicker('destroy');
  }, []);

  let handleServiceChange = e => {
    let id = e.target.value;
    let specialService = services['Special Service'][0];

    setShowServiceTitle(parseInt(id, 10) === specialService.id);
  };

  return (
    <Form id='adultAttendance'>
      <Form.Control as='input' type='hidden' name='authenticity_token' value={token}/>
      <Form.Control as='input' type='hidden' name='[adult][day]' value={day.toString()}/>
      <Form.Row>
        <Form.Group as={Col} controlId="formBasicDate">
          <Form.Label>Date</Form.Label>
          <StyledInput defaultValue={formatDate(day)} className="datepicker" name='dummy'/>
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
            data-style='btn-primary'
            data-header='Select the service held'
            name='[adult]service_id'
            onChange={handleServiceChange}
          >
            <ServiceOptions services={services}/>
          </Form.Control>
        </Form.Group>

        {showServiceTitle && <Form.Group as={Col} controlId='formBasicExtraInfo'>
          <Form.Label>Service Title</Form.Label>
          <StyledInput
            type='text' placeholder='Enter any extra info'
            defaultValue={record.extra_info.service_title}
            name='[adult][extra_info_attributes]service_title'/>
        </Form.Group>}
      </Form.Row>

      <Form.Row>
        <Form.Group  as={Col} controlId="formBasicMen">
          <Form.Label>Male</Form.Label>
          <StyledInput type='number' placeholder="Number of men" name='[adult]male' defaultValue={record.male}/>
          <Form.Text className="text-muted">
            Please enter the number of men
          </Form.Text>
        </Form.Group>
        <Form.Group  as={Col} controlId="formBasicWomen">
          <Form.Label>Female</Form.Label>
          <StyledInput type='number' placeholder="Number of women" name='[adult]female' defaultValue={record.female}/>
          <Form.Text className="text-muted">
            Please enter the number of women
          </Form.Text>
        </Form.Group>
        <Form.Group  as={Col} controlId="formBasicChildren">
          <Form.Label>Children</Form.Label>
          <StyledInput type='number' placeholder="Number of children" name='[adult]children' defaultValue={record.children}/>
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
            <StyledInput
              type='number' placeholder="Number of facebook viewers"
              name='[adult][online]facebook' defaultValue={record.online.facebook}/>
            <FieldsetLabel><FontAwesomeIcon icon={faYoutube} color='red' /> Youtube</FieldsetLabel>
            <StyledInput
              type='number' placeholder="Number of youtube viewers"
              name='[adult][online]youtube' defaultValue={record.online.youtube}/>
          </fieldset>
          <Form.Text className="text-muted">
            Please enter the number of online viewers by platform
          </Form.Text>
        </Form.Group>

        <Form.Group  as={Col}>
          <fieldset>
            <legend>Newcomers:</legend>
            <Form.Label>Male</Form.Label>
            <StyledInput
              type='number' placeholder="Number of male newcomers"
              name='[adult][newcomers]male' defaultValue={record.newcomers.male}/>
            <FieldsetLabel>Female</FieldsetLabel>
            <StyledInput
              type='number' placeholder="Number of female newcomers"
              name='[adult][newcomers]female' defaultValue={record.newcomers.female}/>
          </fieldset>
          <Form.Text className="text-muted">
            Enter the number of newcomers
          </Form.Text>
        </Form.Group>

        <Form.Group  as={Col}>
          <fieldset>
            <legend>Decisions:</legend>
            <Form.Label>Male</Form.Label>
            <StyledInput
              type='number' placeholder="Number of male decisions"
              name='[adult][decisions]male' defaultValue={record.decisions.male}/>
            <FieldsetLabel>Female</FieldsetLabel>
            <StyledInput
              type='number' placeholder="Number of female decisions"
              name='[adult][decisions]female' defaultValue={record.decisions.female}/>
          </fieldset>
          <Form.Text className="text-muted">
            Enter the number of decisions
          </Form.Text>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

