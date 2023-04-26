import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './components/helloWorld/HelloWorld';

class PhotoWars extends React.Component {
  render() {
    return (
      <div>
        <HelloWorld />
      </div>
    );
  }
}

ReactDOM.render(<PhotoWars />, document.getElementById('photowarsapp'));
