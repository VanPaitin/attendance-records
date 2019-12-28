import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import JuniorChurchAttendance from './JuniorChurchAttendance';
import TeenageChurchAttendance from './TeenageChurchAttendance';
import AdultChurchAttendance from './adult/AdultChurchAttendance';

export default () => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path='/junior+church'>
          <JuniorChurchAttendance />
        </Route>

        <Route path='/teenage+church'>
          <TeenageChurchAttendance />
        </Route>

        <Route path='/'>
          <AdultChurchAttendance />
        </Route>
      </Switch>
    </div>
  )
}
