const React = require('react');
const LinearProgress = require('material-ui/LinearProgress').default;
const baseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').baseTheme;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        background: 'rgba(0, 0, 0, .7)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      linearProgress: {
      }
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  componentWillReceiveProps(p) {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  render() {
    return (
      <div
        style={this.styles.container}
      >
        <LinearProgress
          style={this.styles.linearProgress}
          mode='indeterminate'
        />
      </div>
    );
  }
}

Loader.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

Loader.defaultProps = {
  display: false
};

module.exports = Loader;
