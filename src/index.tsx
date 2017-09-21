import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './routes/App';
import {Index as Login} from './components/Login/Index';
import {Provider} from 'mobx-react';
import store from './stores';
import './index.css';

export class AppRouter extends React.Component<{}, {}> {
    render() {
        return (
            <Provider {...store}>
                <Router>
                    <div>
                        <Route exact={true} path="/" component={App}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Login}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}
ReactDOM.render(
  <AppRouter />,
  document.getElementById('root') as HTMLElement
);
