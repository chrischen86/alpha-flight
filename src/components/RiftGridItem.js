import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';


import ReactLoading from "react-loading";
import { Doughnut } from 'react-chartjs-2';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        textAlign: "left",
    },
    flex: {
        flex: 1,
    },
    primary: {
        color: theme.palette.primary.main,
    },
    menuItemSelected: {
        backgroundColor: "#EEEEEEEE !important",
    },
    primaryText: {
        color: theme.palette.primary.contrastText,
        fontSize: ".5em",
    }
});

class RiftGridItem extends React.Component {
    state = {
        data: [],
        loaded: false,
    };

    componentDidUpdate() {
        console.log(this.props);
        if (!this.state.loaded && this.props.dataContext != null && this.props.dataContext.loaded) {
            this.loadData();
        }
    };

    componentDidMount() {
    }

    loadData() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios
            .get("http://projectr.ca/slack/Friday/web/DataApi.php/rift", config)
            .then(response => {
                const riftData = response.data.map(c => {
                    return {
                        id: c.rift_history_id,
                        owner: c.owner_id,
                        date: c.scheduled_time,
                        type: c.type_id,
                    };
                });
                /*
                var arr = this.initRiftArray(this.props.dataContext.riftTypes);
                riftData.forEach(item => {
                    arr[item.type] = arr[item.type] + 1;
                });
                var labels = this.props.dataContext.riftTypes.map(item => {
                    return item.name;
                });
                */

                var groupValues = riftData.reduce(function (obj, item) {
                    obj[item.type] = obj[item.type] || [];
                    obj[item.type].push(item);
                    return obj;
                }, {});
                var dataset = Object.values(groupValues).map(function (item) {
                    return item.length;
                });


                var labels = Object.keys(groupValues).map(key => {
                    if (this.props.dataContext.riftTypes[key] != null) {
                        return this.props.dataContext.riftTypes[key].name;
                    }
                    return "Unspecified";
                });
                console.log(labels);

                const chartData = {
                    labels: labels,
                    datasets: [{
                        data: dataset,
                        backgroundColor: this.props.chartColours,
                    }],
                };

                const newState = Object.assign({}, this.state, {
                    data: chartData,
                    loaded: true,
                });
                console.log(chartData);
                this.setState(newState);

            })
            .catch(error => console.log(error));
    };

    initRiftArray(riftTypes) {
        var riftArray = [];
        for (var riftType in riftTypes) {
            riftArray.push(0);
        }
        riftArray.push(0);
        return riftArray;
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="headline" component="h3">
                            {"Rift Statistics"}
                        </Typography>
                        <Typography component="p">
                            Paper can be used to build surface or other elements for your application.
                        </Typography>

                        <Grid container xs={12} sm={12}>
                            <Grid item xs={12} sm={6}>
                                {this.state.loaded && (<Doughnut data={this.state.data} />)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.state.loaded && (<Doughnut data={this.state.data} />)}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid >
            </React.Fragment >
        );
    }
}

RiftGridItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RiftGridItem);