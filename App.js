
import React from 'react';

import ProductFormScreen from './src/components/products/add'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
    }
  }

  render () {
      return (<>
          <ProductFormScreen/>
      </>
      )
  }
}


export default App;
