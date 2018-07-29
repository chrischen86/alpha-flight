import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HorizontalBar } from 'react-chartjs-2';
import ChartCard from './ChartCard';

const styles = theme => ({

});

class BarChartCard extends React.Component {
    state = {
    };

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <ChartCard title={this.props.title} loaded={this.props.loaded}>
                {this.props.loaded && (
                    <HorizontalBar data={this.props.data}
                        options={
                            {
                                legend: {
                                    display: false,
                                }
                            }}
                    />
                )}
            </ChartCard>
        );
    }
}

BarChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarChartCard);