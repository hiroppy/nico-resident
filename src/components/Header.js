const React = require('react');
const Period = require('./Period');
const Genre = require('./Genre');

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      position: 'fixed',
      zIndex: 1000,
      left: 0,
      top: 0,
      width: '100%'
    };

    this._onChangePeriod = this._onChangePeriod.bind(this);
    this._onChangeGenre = this._onChangeGenre.bind(this);
  }

  _onChangePeriod(v) {
    if (Reflect.has(this.props, 'onChange')) {
      this.props.onChange({period: v});
    }
  }

  _onChangeGenre(v) {
    if (Reflect.has(this.props, 'onChange')) {
      this.props.onChange({genre: v});
    }
  }

  render() {
    return (
      <div
        style={this.style}
      >
        <Period
          onChange={this._onChangePeriod}
        />
        <Genre
          onChange={this._onChangeGenre}
        />
      </div>
    );
  }
}

module.exports = Header;
