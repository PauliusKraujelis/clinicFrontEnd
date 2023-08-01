import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientsPage from './pages/PatientsPage';
import ClinicsPage from './pages/ClinicsPage';
import ProceduresPage from './pages/ProceduresPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ContactsPage from './pages/ContactsPage';


function App() {
  
  return (
    <Router>
    <Switch>
      <Route path='/' exact={true} component={ClinicsPage}/>
      <Route path='/patients' exact={true} component={PatientsPage}/>
      <Route path='/procedures' exact={true} component={ProceduresPage}/>
      <Route path='/appointments' exact={true} component={AppointmentsPage}/>
      <Route path='/contacts' exact={true} component={ContactsPage}/>
    </Switch>
  </Router>
  );
}

export default App;
// need to upgrade Router