import React from 'react';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      closingHours: '',
    }
  }

  componentDidMount() {
    fetch(`/api/hours/${this.props.details.id}`)
      .then(response => {
        return response.json();
      })
      .then(closing => {
        let hour = closing.substring(0, 2);
        let minutes = closing.substring(2);
        let identifier = 'AM';
        let closingTime = '';
        if (Number(hour) > 6) {
          identifier = 'PM';
          hour = `${Number(hour) - 12}`
        }
        if (Number(hour) < 6) {
          if (hour == '00') {
            hour = '12';
          } else {
            hour = closing[1];
          }
        }
        if (minutes == '00') {
          closingTime = hour + identifier;
        } else {
          closingTime = `${hour}:${minutes} ${identifier}`;
        }
        this.setState({
          isClicked: !this.state.isClicked,
          closingHours: closingTime,
        })
      })
  }

  render() {
    const distanceInMiles = this.props.details.distance * 0.000621371;
    return (
      <div className="m-3 p-3" align="center">
        <h4 className="sign__restaurantTitle" /*onClick={this.clickHoursRequestHandler.bind(this)}*/>{this.props.details.name}</h4>
          <p style={ {"color" : "#c6e2ff"}}>
            {this.props.details.location.display_address[0]} ({distanceInMiles.toFixed(2)}mi) | <a href={this.props.details.url}>Yelp</a>
          </p>
          <p className="mt-xs sign__hours">Open 'til {this.state.closingHours}</p>
      </div>
    );
  }
}

export default Restaurant;