
import React from 'react';
import CategoriesScreen from './src/components/categories/list'


class App extends React.Component {

  constructor(){
    super();

    this.state = {
      name: 'John Zurita 3'
    }
  }

  render () {
      return (<>
          <CategoriesScreen/>
      </>
      )
  }
}


export default App;
