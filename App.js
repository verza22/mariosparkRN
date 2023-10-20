
import React from 'react';

import Navigation from './src/components/navigation'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
    }
  }

  render () {
      return (<>
          <Navigation/>
      </>
      )
  }
}


export default App;
