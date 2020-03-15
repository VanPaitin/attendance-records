import React from 'react';
import { FormModal } from '../components';

const withFormModal = props => Component => {
  
  return <FormModal>{() => <Component {...props} />}</FormModal>;
};

export default withFormModal;
