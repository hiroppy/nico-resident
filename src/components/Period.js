const React = require('react');
const Tabs = require('material-ui/tabs').Tabs;
const Tab = require('material-ui/tabs').Tab;
const baseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').baseTheme;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

class Period extends React.Component {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
    this._setPeriod = this._setPeriod.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  _setPeriod() {
    const periodList = [
      '毎時',
      '24時間',
      '週間',
      '月間',
      '合計'
    ];

    return periodList.map((e, i) => {
      return (
        <Tab
          label={e}
          key={i}
          value={e}
        />
      );
    });
  }

  _handleChange(v) {
    if (Reflect.has(this.props, 'onChange')) {
      this.props.onChange(v);
    }
  }

  render() {
    return (
      <Tabs
        onChange={this._handleChange}
      >
        {this._setPeriod()}
      </Tabs>
    );
  }
}

Period.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Period;
