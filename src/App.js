import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          {/* This is where you would include the page you want to display wrapped in layout */}
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
