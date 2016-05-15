const React = require('react');
const Ranking = require('./Ranking');

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      paddingTop: 100
    };

    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad() {
    console.log('finish')
  }

  render() {
    return (
      <div
        style={this.style}
      >
        <Ranking
          onLoad={this._onLoad}
          genre={this.props.genre}
          period={this.props.period}
        />
      </div>
    );
  }
}

module.exports = Body;
