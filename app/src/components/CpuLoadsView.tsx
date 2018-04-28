import * as React from 'react';
import _ from 'lodash';
import { CoreLoadsView } from './CoreLoadsView';
import { CpuLoad, CoreLoad } from '@common/Interfaces';

export interface CpuLoadsViewProps extends React.Props<CpuLoadsView> {
}

export interface CpuLoadsViewState {
    ncores: number;
    cpuLoads: CpuLoad[],
}

export class CpuLoadsView extends React.Component<CpuLoadsViewProps, CpuLoadsViewState> {
    timer: number = 0;
    
    constructor(props: CpuLoadsViewProps) {        
        super(props);
        this.state = {
            ncores: 0,
            cpuLoads: [],
        };
    }

    getCurrentCpuLoads = () => {
        window.fetch('https://api.cookieoffortune.com/status', { mode: 'cors' })
        .then(response => {         
            response.json()
            .then(data => {
                const cpuLoad = data as CpuLoad;
                const ncores = _.max([
                    this.state.ncores, 
                    cpuLoad.cpu_loads.medians.length,
                    cpuLoad.cpu_loads.stds.length,
                ]);
                if(ncores != null)
                {
                    this.setState({ncores: ncores, cpuLoads: [cpuLoad]});
                }
            })
            .catch(err => console.log(err));
        });
    }

    getCpuLoadsSince = () => {
        const last = _(this.state.cpuLoads).last();
        if(last == null)
        {
            return;
        }
        const timestamp = last.timestamp;
        const params = new URLSearchParams();
        params.set('timestamp', timestamp);
        window.fetch('https://api.cookieoffortune.com/status/since?' + params.toString(), { mode: 'cors' })
        .then(response => {
            response.json()
            .then(data => {
                const cpuLoads = this.state.cpuLoads.concat(data as CpuLoad[]);
                this.setState({cpuLoads: _.takeRight(cpuLoads, 60)});
            });
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getCurrentCpuLoads();
        this.timer = window.setInterval(this.getCpuLoadsSince, 10000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    render() {
        const ncores = this.state.ncores;
        const cpuLoads = this.state.cpuLoads;
        const timestamps = cpuLoads.map(loads => loads.timestamp);
        const cores = _.range(ncores).map(core => {
            const medians = cpuLoads.map(loads => loads.cpu_loads.medians[core]);
            const stds = cpuLoads.map(loads => loads.cpu_loads.stds[core]);
            const coreLoads = _.zip(timestamps, medians, stds)
                .reduce((acc, [timestamp, median, std]) => {
                    if(timestamp != undefined && median != undefined && std != undefined)
                    {
                        acc.push({
                            timestamp: timestamp,
                            median: median,
                            std: std,
                        });
                    }
                    return acc;
                }, [] as CoreLoad[]);
            return <CoreLoadsView coreLoads={coreLoads} key={core}/>;
        });
        return <div>
            {cores}
        </div>;
    }
}