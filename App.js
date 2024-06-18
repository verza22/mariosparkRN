
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Navigation from './src/components/navigation'
import SyncManager from './src/components/syncManager'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
    }
  }

  render () {
      return (<>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation/>
          <SyncManager/>
        </PersistGate>
       </Provider>
      </>
      )
  }
}

export default App;
