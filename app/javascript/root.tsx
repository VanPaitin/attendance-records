import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TeenageChurchAttendance from './TeenageChurchAttendance';
import JuniorChurchAttendance from './JuniorChurchAttendance';
import AdultChurchAttendance from './AdultChurchAttendance';
import Navbar from './Navbar';

export default () => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route exact path='/'>
          <AdultChurchAttendance />
        </Route>

        <Route path='/junior+church'>
          <JuniorChurchAttendance />
        </Route>

        <Route path='/teenage+church'>
          <TeenageChurchAttendance />
        </Route>
      </Switch>
    </div>
  )
}
