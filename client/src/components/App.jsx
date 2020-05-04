import React from 'react';
import Restaurants from './Restaurants';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalNumOfSpots: 0,
      restaurants: [],
    };
  }
  
  componentDidMount() {
    //do get request to latenight endpoint
    fetch('/api/latenight')
      .then(response => response.json())
      .then((businesses) => {
        console.log('APP.JSX: SUCCESSFULLY RECEIVED DATA FROM API/LATENIGHT');
        // console.log(response.total, response.businesses);
        this.setState({
          totalNumOfSpots: businesses.length,
          restaurants: businesses,
        })
      })
  }

  render() {
    return (
      <Restaurants restaurants={this.state.restaurants} />
    );
  }
}

export default App;