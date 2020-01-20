import React from 'react';
import { Route, RouteProps, Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import FormModal from './FormModal';
import ActionsPopover from './ActionsPopover';
import AttendancesTable from './AttendancesTable';

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

interface State {
  records: Record[]
  popoverId: number
  popoverPosition: PopoverPosition
}

class AdultChurchAttendance extends React.Component<RouteProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      popoverId: null,
      popoverPosition: { left: null, top: null }
    }
  }

  fetchRecords = () => {
    axios.get('/attendances', { params: { mode: 'adult' }}).then(({ data }) => {
      this.setState({ records: data });
    });
  };

  componentDidMount() {
    this.fetchRecords();
  }

  removeRecord = (id) => {
    let confirmation = confirm('Are you sure to delete the record?');

    if (confirmation) {
      let token = $('meta[name="csrf-token"]').attr("content");
      axios.delete(
        `/attendances/${id}?mode=adult`,
        { data: { authenticity_token: token } }
      ).then(() => {
        this.setState({
          popoverId: null,
          records: this.state.records.filter(record => record.id !== id)
        });
      })
    }
  };

  showPopover = (e, id) => {
    e.stopPropagation();
    e.persist();
    if (this.state.popoverId == id) {
      this.clearPopoverId()
    } else {
      let clientWidth = document.body.clientWidth;
      let minLeftOffset = clientWidth - 200;
      let leftOffset = e.clientX <= minLeftOffset ? e.clientX : minLeftOffset;
      this.setState({ popoverPosition: { left: leftOffset, top: e.clientY }, popoverId: id})
    }
  };

  clearPopoverId = () => {
    this.setState({ popoverId: null })
  };

  render() {
    return (
      <div className='container'  onClick={this.clearPopoverId}>
        {this.state.popoverId &&
        <ActionsPopover
          recordId={this.state.popoverId}
          position={this.state.popoverPosition}
          removeRecord={this.removeRecord}
          clearPopover={this.clearPopoverId}/>
        }

        <h3>Recent Records</h3>

        <AttendancesTable records={this.state.records} showPopover={this.showPopover} />

        <div style={{ textAlign: 'right', marginTop: '50px' }}>
          <Button as={Link} to={`${this.props.match.url}attendance/new`} variant="primary" size="lg">
            New Record
          </Button>
        </div>

        <Route path={`${this.props.match.path}attendance/new`}>
          <FormModal fetchRecords={this.fetchRecords}/>
        </Route>

        <Route path={`${this.props.match.path}attendance/:id/edit`}>
          <FormModal fetchRecords={this.fetchRecords}/>
        </Route>
      </div>
    )
  }
}

export default withRouter(AdultChurchAttendance);
