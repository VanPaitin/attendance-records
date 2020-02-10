import React from 'react';
import { Route, RouteProps, Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import styled from 'styled-components';

import FormModal from './FormModal';
import ActionsPopover from './ActionsPopover';
import AttendancesTable from './AttendancesTable';

const Container = styled.div`
  &.container {
    margin-top: 50px;
    max-width: 1170px;
  }
`;

const FlashContainer = styled.div`
  position: absolute;
  width: 100%;
`;

const StyledAlert = styled(Alert)`
  font-size: 19px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  word-spacing: 10px;
`;

type MaleFemaleType = {
  male: number
  female: number
}

type Record = {
  id: number
  service_id: number
  service_name: string
  day: Date
  male: number
  female: number
  children: number
  online: {
    facebook: number
    youtube: number
  }
  newcomers: MaleFemaleType
  decisions: MaleFemaleType
}

type PopoverPosition = {
  left: number
  top: number
}

enum Variance {
  success = 'success',
  danger = 'danger'
}

interface State {
  records: Record[]
  popoverId: number
  popoverPosition: PopoverPosition
  flashMessage: string
  flashVariance: 'success' | 'danger'
}

class AdultChurchAttendance extends React.Component<RouteProps, State> {
  state = {
    records: [],
    popoverId: null,
    popoverPosition: { left: null, top: null },
    flashMessage: '',
    flashVariance: Variance.success
  };

  fetchRecords = () => {
    axios.get('/attendances', { params: { mode: 'adult' }}).then(({ data }) => {
      this.setState({ records: data });
    });
  };

  componentDidMount() {
    this.fetchRecords();
  }

  showAlert = ({ message, variance }) => {
    this.setState({ flashMessage: message, flashVariance: variance });

    this.clearAlert();
  };

  clearAlert = () => {
    setTimeout(() => this.setState({ flashMessage: '' }), 3000)
  };

  removeRecord = (id) => {
    let confirmation = confirm('Are you sure to delete the record?');

    if (confirmation) {
      let meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
      let token = meta.content;

      axios.delete(`/attendances/${id}?mode=adult`, { data: { authenticity_token: token } })
        .then(() => {
          this.setState({
            popoverId: null,
            records: this.state.records.filter(record => record.id !== id),
            flashMessage: 'Record successfully deleted!',
            flashVariance: 'success'
          });
          this.clearAlert()
        }
      )
    }
  };

  showPopover = (e, id) => {
    e.stopPropagation();
    e.persist();
    this.clearPopoverId();

    if (this.state.popoverId !== id) {
      setTimeout(() => {
        let clientWidth = document.body.clientWidth;
        let minLeftOffset = clientWidth - 200;
        let leftOffset = e.clientX <= minLeftOffset ? e.clientX : minLeftOffset;
        this.setState({ popoverPosition: { left: leftOffset, top: e.clientY }, popoverId: id})
      }, 150)
    }
  };

  clearPopoverId = () => {
    this.setState({ popoverId: null })
  };

  renderFormModal = () => <FormModal fetchRecords={this.fetchRecords} showAlert={this.showAlert} />;

  render() {
    return (
      <>
        <Fade in={!!this.state.flashMessage.length}>
          <FlashContainer>
            <StyledAlert variant={this.state.flashVariance}>
              {this.state.flashMessage}
            </StyledAlert>
          </FlashContainer>
        </Fade>
        <Container className='container'  onClick={this.clearPopoverId}>
          <ActionsPopover
            recordId={this.state.popoverId}
            position={this.state.popoverPosition}
            removeRecord={this.removeRecord}
            clearPopover={this.clearPopoverId}/>

          <h3>Recent Records</h3>

          <AttendancesTable records={this.state.records} showPopover={this.showPopover} />

          <div style={{ textAlign: 'right', marginTop: '50px' }}>
            <Button as={Link} to={`${this.props.match.url}attendance/new`} variant="primary" size="lg">
              New Record
            </Button>
          </div>

          <Route path={`${this.props.match.path}attendance/new`}>
            {this.renderFormModal()}
          </Route>

          <Route path={`${this.props.match.path}attendance/:id/edit`}>
            {this.renderFormModal()}
          </Route>
        </Container>
      </>
    )
  }
}

export default withRouter(AdultChurchAttendance);
