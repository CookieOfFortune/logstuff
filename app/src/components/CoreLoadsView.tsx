import * as React from 'react';
import { StatsView } from './StatsView';
import { CoreLoad } from '@common/Interfaces';

export interface CoreLoadsViewProps extends React.Props<CoreLoadsView> {
    coreLoads: CoreLoad[],
}

export interface CpuLoadsViewState {
    
}

export class CoreLoadsView extends React.Component<CoreLoadsViewProps, CpuLoadsViewState> {
    timer: number = 0;
    
    constructor(props: CoreLoadsViewProps) {        
        super(props);
    }

    render() {
        const stats = this.props.coreLoads
            .map(coreLoad => ({ 
                x: Date.parse(coreLoad.timestamp),
                median: coreLoad.median,
                std: coreLoad.std,
            }));
        return <StatsView stats={stats}/>
    }
}