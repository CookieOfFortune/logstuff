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
        return <Chart points={midSeries}/>;
    }
}