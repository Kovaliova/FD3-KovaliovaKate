import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import store from './store/store';
import MobileCompany from './components/MobileCompany';
import './main.css';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <MobileCompany />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));