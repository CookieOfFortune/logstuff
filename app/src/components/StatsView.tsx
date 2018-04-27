import * as React from 'react';
import { Chart } from './Chart';
import { Point } from '@common/Interfaces';

export interface StatPoint {
    x: number;
    median: number;
    std: number;
}

export interface StatsViewProps extends React.Props<StatsView> {
    stats: StatPoint[];
}

export interface StatsViewState {
}

export class StatsView extends React.Component<StatsViewProps, StatsViewState> {

    constructor(props: StatsViewProps) {        
        super(props);
    }

    render() {
        const stats = this.props.stats;
        const midSeries = stats.map(stat => [stat.x, stat.median] as Point);
        const hiSeries = stats.map(stat => [stat.x, stat.median + stat.std] as Point);
        const loSeries = stats.map(stat => [stat.x, stat.median - stat.std] as Point);
        const options: Highcharts.Options = {
            series: [
              {data: midSeries},
              {data: hiSeries},
              {data: loSeries},  
            ],
        }
        return <Chart options={options}/>;
    }
}