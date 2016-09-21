import React from 'react';

import Controls from 'Controls';
import Grid from 'Grid';

class App extends React.Component {
  render() {
    return (
      <div>
        Conway's Game of Life
        <div>
          <Controls />
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;
