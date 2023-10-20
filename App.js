
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import Navigation from './src/components/navigation'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
    }
  }

  render () {
      return (<>
      <Provider store={store}>
          <Navigation/>
       </Provider>
      </>
      )
  }
}


export default App;
