const shell = require('electron').shell;
const React = require('react');
const Subheader = require('material-ui/Subheader');
const GridList = require('material-ui/GridList').GridList;
const GridTile = require('material-ui/GridList').GridTile;
const baseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').baseTheme;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const fetchRaking = require('../request');

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: []
    };

    this.styles = {
      subTitle: {
        color: '#f5f5f5'
      }
    }
    this._buildList = this._buildList.bind(this);
    this._onLoad = this._onLoad.bind(this);

    this._fetchRanking(props.period, props.genre);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  _fetchRanking(period, genre) {
    fetchRaking(period, genre).then((ranking) => {
      const rankingList = ranking.map((e) => {
        const date = e.pubDate.toString().split(' ');
        const pubDate = `${date[3]}/${convertMonth(date[1])}/${date[2]} ${date[4]} 投稿`;

        const image = e.summary
          .match(/<img(.)*\/>/g)[0]
          .split(' ')
          .find((e) => e.indexOf('src=') !== -1)
          .split('src=')[1];

        return {
          link: e.link,
          image: image.substr(1, image.length - 2),
          title: e.title,
          pubDate: pubDate
        };
      });

      this.setState({ranking: rankingList});
      this._onLoad();
    });
  }

  _buildList(ranking) {
    return ranking.map((e, i) => {
      return (
        <GridTile
          key={e.image}
          title={e.title}
          subtitle={
            <span
              style={this.styles.subTitle}
            >
              <b>
                {e.pubDate}
              </b>
            </span>}
          onClick={() => shell.openExternal(e.link)}
          style={{cursor: 'pointer'}}
        >
          <img src={e.image} />
        </GridTile>
      );
    })
  }

  _onLoad() {
    if (Reflect.has(this.props, 'onLoad')) {
      this.props.onLoad();
    }
  }

  componentWillReceiveProps(p) {
    setTimeout(() => {
      this._fetchRanking(p.period, p.genre);
    }, 1000);
  }

  render() {
    return (
    <GridList
      cellHeight={200}
    >
      {
        this._buildList(this.state.ranking)
      }
    </GridList>
    );
  }
}

Ranking.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

function convertMonth(m) {
  const mNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return `0${mNames.indexOf(m) + 1}`.slice(-2);
}

module.exports = Ranking;
