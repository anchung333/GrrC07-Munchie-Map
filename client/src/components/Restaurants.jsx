import React from 'react';
import Restaurant from './Restaurant';

const Restaurants = (props) => {
  return (
    <div className="container-fluid mx-auto">
      {props.restaurants.map((details, idx) => <Restaurant details={details} key={idx}/>)}
    </div>
  );
};

export default Restaurants;
