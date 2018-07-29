import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import DonutChartCard from './DonutChartCard';
import BarChartCard from './BarChartCard';

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
        loaded: false,
        byType: {
            data: [],
            loaded: false,
        },
        byOwner: {
            data: [],
            loaded: false,
        }
    };

    componentDidUpdate() {
        console.log(this.props);
        if (!this.state.loaded && this.props.dataContext != null && this.props.dataContext.loaded) {
            this.loadRiftByType();
            this.loadRiftByOwner();
            this.setState({ loaded: true });
        }
    };

    componentDidMount() {
    }

    loadRiftByType() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: {
                $select: 'type_id',
                $groupBy: 'type_id',
            }
        };
        axios
            .get("http://projectr.ca/slack/Friday/web/DataApi.php/rift", config)
            .then(response => {
                const riftData = response.data.map(c => {
                    return {
                        count: c.COUNT_type_id,
                        type: c.type_id,
                    };
                });

                var dataset = riftData.map(rift => rift.count);
                var labels = riftData.map(rift => {
                    if (this.props.dataContext.riftTypes[rift.type] != null) {
                        return this.props.dataContext.riftTypes[rift.type].name;
                    }
                    return "Unspecified";
                });
                const chartData = {
                    labels: labels,
                    datasets: [{
                        data: dataset,
                        backgroundColor: this.props.chartColours,
                    }],
                };

                this.setState({ byType: { loaded: true, data: chartData } });
                console.log(this.state);
            })
            .catch(error => console.log(error));
    };

    loadRiftByOwner() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: {
                $select: 'owner_id',
                $groupBy: 'owner_id',
            }
        };
        axios
            .get("http://projectr.ca/slack/Friday/web/DataApi.php/rift", config)
            .then(response => {
                const riftData = response.data.map(c => {
                    return {
                        count: c.COUNT_owner_id,
                        owner: c.owner_id,
                    };
                });

                var dataset = riftData.map(rift => rift.count);
                var labels = riftData.map(rift => {
                    if (this.props.dataContext.users[rift.owner] != null) {
                        return this.props.dataContext.users[rift.owner].name;
                    }
                    return "Unspecified";
                });
                const chartData = {
                    labels: labels,
                    datasets: [{
                        data: dataset,
                        backgroundColor: this.props.chartColours,
                    }],
                };

                this.setState({ byOwner: { loaded: true, data: chartData } });
                console.log(this.state);
            })
            .catch(error => console.log(error));
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.root} elevation={5}>
                        <Typography variant="headline" component="h3">
                            {"Rift Statistics"}
                        </Typography>
                        <Typography component="p">
                            Rift history tracked through /rift slack command
                        </Typography>
                    </Paper>
                </Grid >

                <Grid item xs={12} sm={12} md={6}>
                    <DonutChartCard title={"Rifts by Type"} loaded={this.state.byType.loaded} data={this.state.byType.data} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <BarChartCard title={"Rifts by Owner"} loaded={this.state.byOwner.loaded} data={this.state.byOwner.data} />
                </Grid>

            </React.Fragment >
        );
    }
}

RiftGridItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RiftGridItem);