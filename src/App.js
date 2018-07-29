import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RiftGridItem from './components/RiftGridItem';
import withRoot from './withRoot.js';
import TitleBar from './components/TitleBar';

import axios from 'axios';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 1.5,
  },
});

const chartColours = ['#36a2eb', '#67afed', '#89bcee', '#a7caf0', '#c1d7f1', '#dbe5f2', '#f3f3f3', '#f9edda', '#fce7c0', '#ffe0a7', '#ffda8d', '#ffd472', '#ffce56'];
//['#de425b', '#ec838a', '#f3babc', '#f1f1f1', '#c0d6ef', '#88bbed', '#36a2eb', '#36a2eb', '#88bbed', '#c0d6ef', '#f1f1f1', '#fae5be', '#ffd98c', '#ffce56'];

class App extends React.Component {
  state = {
    dataContext: {
      users: [],
      riftTypes: [],
      loaded: false,
    },
  };

  componentDidMount() {
    this.loadUsers();
  };

  loadUsers() {
    var config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    axios
      .get("http://projectr.ca/slack/Friday/web/DataApi.php/user", config)
      .then(response => {
        const data = response.data.map(c => {
          return {
            id: c.id,
            name: c.name,
            vip: c.vip,
          };
        });
        this.setState({ dataContext: { ...this.state.dataContext, users: data } });
        console.log(this.state);
        this.loadRiftTypes();
      })
      .catch(error => console.log(error));
  };

  loadRiftTypes() {
    var config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    axios
      .get("http://projectr.ca/slack/Friday/web/DataApi.php/riftType", config)
      .then(response => {
        const data = response.data.reduce(function (map, item) {
          map[item.id] = item;
          return map;
        }, {});
        this.setState({ dataContext: { ...this.state.dataContext, riftTypes: data, loaded: true } });
        console.log(this.state);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TitleBar title="Alpha Flight Metrics Dashboard" />
        <div className={classes.content}>
          <Grid container spacing={24}>
            <RiftGridItem chartColours={chartColours} dataContext={this.state.dataContext} />
          </Grid>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));