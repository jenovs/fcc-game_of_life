import React from 'react';

import Controls from 'Controls';
import Grid from 'Grid';
import Header from 'Header';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <div className='wrapper'>
          <Controls />
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;
