import React from 'react';

/*Page Imports*/
import Home from './pages/Home';
import ViewReports from './pages/ViewReports';
import Profile from './pages/Profile';
import EditItem from './pages/EditItem';
import Register from './pages/Register';
import Login from './pages/Login'
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
        <Route path="/edititem" component={EditItem} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/login" component={Login} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
