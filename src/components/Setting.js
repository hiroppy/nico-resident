const shell = require('electron').shell;
const remote = require('electron').remote.require('../');
const React = require('react');
const baseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').baseTheme;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const FlatButton = require('material-ui/FlatButton').default;
const FontIcon = require('material-ui/FontIcon').default;
const Settings = require('material-ui/svg-icons/action/settings').default;
const Clear = require('material-ui/svg-icons/content/clear').default;
const cyan700 = require('material-ui/styles/colors').cyan700;
const List = require('material-ui/List').List;
const ListItem = require('material-ui/List').ListItem;

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };

    this.styles = {
      setting: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        color: cyan700,
        minWidth: 36
      },
      list: {
        position: 'fixed',
        zIndex: 10000,
        bottom: 30,
        right: 0,
        background: 'rgba(255, 255, 255, .95)',
        width: '50%'
      }
    };

    this._onClick = this._onClick.bind(this);
    this._goToGithub = this._goToGithub.bind(this);
    this._closeApp = this._closeApp.bind(this);
  }

  _onClick() {
    if (this.state.opened) this.setState({opened: false});
    else this.setState({opened: true});
  }

  _goToGithub() {
    shell.openExternal('https://github.com/abouthiroppy/nico-resident');
    this.setState({opened: false});
  }

  _closeApp() {
    remote.quitApp();
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  render() {
    return (
      <div>
        <FlatButton
          icon={
            !this.state.opened ? <Settings /> : <Clear />
          }
          style={this.styles.setting}
          onClick={this._onClick}
        />
        {
          this.state.opened
          ? <List
              style={this.styles.list}
            >
              <ListItem primaryText='ソースコード'
                onClick={this._goToGithub}
              />
              <ListItem primaryText='終了する'
                onClick={this._closeApp}
              />
            </List>
          : null
        }
      </div>
    );
  }
}

Setting.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Setting;
