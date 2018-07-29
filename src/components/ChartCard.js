import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
});

class ChartCard extends React.Component {
    state = {
    };

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card>
                    <CardContent>
                        {this.props.loaded && (<Doughnut data={this.props.data} />)}
                    </CardContent>
                </Card>
            </React.Fragment >
        );
    }
}

ChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartCard);