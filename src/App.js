import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientsPage from './pages/PatientsPage';
import ClinicsPage from './pages/ClinicsPage';
import ProceduresPage from './pages/ProceduresPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ContactsPage from './pages/ContactsPage';
import PatientEdit from "./pages/PatientEdit";
import AppointmentEdit from "./pages/AppointmentEdit";
import ProceduresEdit from './pages/ProceduresEdit';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Switch>
          <Route path='/' exact={true} component={ClinicsPage}/>
          <Route path='/patients' exact={true} component={PatientsPage}/>
          <Route path='/procedures' exact={true} component={ProceduresPage}/>
          <Route path='/appointments' exact={true} component={AppointmentsPage}/>
          <Route path='/contacts' exact={true} component={ContactsPage}/>
          <Route path='/patients/:id' component={PatientEdit}/>
          <Route path='/appointments/:id' component={AppointmentEdit}/>
          <Route path='/procedures/:id' component={ProceduresEdit}/>
        </Switch>
      </Router>
    </I18nextProvider>
  );
}

export default App;
