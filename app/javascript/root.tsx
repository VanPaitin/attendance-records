import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import JuniorChurch from './juniorChurch';
import TeenageChurchAttendance from './TeenageChurchAttendance';
import AdultChurchAttendance from './adult/AdultChurchAttendance';

export default () => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path='/junior_church' component={JuniorChurch} />

        <Route path='/teenage+church'>
          <TeenageChurchAttendance />
        </Route>

        <Route path='/'>
          <AdultChurchAttendance />
        </Route>
      </Switch>
    </div>
  );
};
