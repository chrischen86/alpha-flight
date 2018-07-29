import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    progress: {
        margin: theme.spacing.unit * 2,
    },
    card: {
        minHeight: 300
    }
});

class ChartCard extends React.Component {
    state = {
    };

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        let children = React.Children.toArray(this.props.children);
        return (
            <React.Fragment>
                <Card raised>
                    <CardHeader title={this.props.title} className={classes.root} titleTypographyProps={{variant:"subheading"}} />
                    <CardContent>
                        {children.length > 0 && (children[0])}
                        {children.length <= 0 && (<CircularProgress className={classes.progress} size={100} />)}
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