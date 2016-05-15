const React = require('react');
const Loader = require('./components/Loader');
const Header = require('./components/Header');
const Body = require('./components/Body');
const Setting = require('./components/Setting');

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      period: '毎時',
      genre: 'カテゴリ合算',
      loader: false
    }

    this._onChange = this._onChange.bind(this);
  }

  _onChange(p) {
    if (Reflect.has(p, 'period')) this.setState({period: p.period});
    if (Reflect.has(p, 'genre')) this.setState({genre: p.genre});
    // this.setState({loader: true});
  }

  render() {
    return (
      <div>
        <Header
          onChange={this._onChange}
        />
        <Body
          genre={this.state.genre}
          period={this.state.period}
        />
        <Setting />
      </div>
    );
  }
}

module.exports = Router;
