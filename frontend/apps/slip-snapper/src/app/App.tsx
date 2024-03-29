import React from 'react';

/*Page Imports*/
import Home from './pages/Home';
import ViewReports from './pages/ViewReports';
import Profile from './pages/Profile';
import Receipts from './pages/Receipts';
import EditSlip from './pages/EditSlip';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';
import AddEntry from './pages/AddEntry';
import EditReceipt from './pages/EditReceipt';

/*Component Imports*/
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Menu } from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu/>
      <IonRouterOutlet id="main">
      <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/viewreports" component={ViewReports} exact={true} />
        <Route path="/profile" component={Profile} exact={true} />
        <Route path="/receipts" component={Receipts} exact={true} />
        <Route path="/editslip" component={EditSlip} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/forgotpass" component={ForgotPass} exact={true} />
        <Route path="/addentry" component={AddEntry} exact={true} />
        <Route path="/editreceipt" component={EditReceipt} exact={true} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
