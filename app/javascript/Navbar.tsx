import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default () => (
  <Nav className='justify-content-center' variant='tabs'>
    <Nav.Item>
      <Nav.Link as={NavLink} exact to='/'>
        Adult
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to='/junior_church'>
        Junior Church
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to='/teenage+church'>
        Teens Church
      </Nav.Link>
    </Nav.Item>
  </Nav>
);
