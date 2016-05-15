const React = require('react');
const Tabs = require('material-ui/tabs').Tabs;
const Tab = require('material-ui/tabs').Tab;
const baseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').baseTheme;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

class Genre extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      tabs: {
        backgroundColor: '#039BE5'
      }
    }

    this._handleChange = this._handleChange.bind(this);
    this._setGenre = this._setGenre.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  _setGenre() {
    const genreList = [
      'カテゴリ合算',
      'エンタメ・音楽',
      '生活・一般・スポ',
      '政治',
      '科学・技術',
      'アニメ・ゲーム・絵',
      'その他'
    ];

    return genreList.map((e, i) => {
      return (
        <Tab
          label={e}
          key={i}
          value={e}
          style={{
            fontSize: 10,
          }}
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
        style={this.styles.tabs}
        onChange={this._handleChange}
      >
        {this._setGenre()}
      </Tabs>
    );
  }
}

Genre.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

module.exports = Genre;
