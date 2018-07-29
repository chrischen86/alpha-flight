import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';
import ChartCard from './ChartCard';

const styles = theme => ({

});

class DonutChartCard extends React.Component {
    state = {
    };

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <ChartCard title={this.props.title} loaded={this.props.loaded}>
                {this.props.loaded && (
                    <Doughnut data={this.props.data}
                        options={
                            {
                                legend: {
                                    display: true,
                                    position: "right",
                                }
                            }}
                    />
                )}
            </ChartCard>
        );
    }
}

DonutChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DonutChartCard);