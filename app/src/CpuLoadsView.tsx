import * as React from 'react';
import { CpuLoads } from '@common/CpuLoads';

export interface CpuLoadsViewProps extends React.Props<CpuLoadsView> {
    cpuLoads: CpuLoads,
}

export interface CpuLoadsViewState {
    cpuLoads: CpuLoads,
}

export class CpuLoadsView extends React.Component<CpuLoadsViewProps, CpuLoadsViewState> {
    timer: number = 0;
    
    constructor(props: CpuLoadsViewProps) {        
        super(props);
        this.state = {
            cpuLoads: props.cpuLoads,
        };
    }

    getCpuLoads = () => {
        window.fetch('https://api.cookieoffortune.com/status', { mode: "cors" })
        .then(response => {         
            response.json()
            .then(data => {
                this.setState({cpuLoads: data as CpuLoads});
            })
            .catch(err => console.log(err));
        });
    }

    componentDidMount() {
        this.getCpuLoads();
        this.timer = window.setInterval(this.getCpuLoads, 10000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    render() {
        return <h1>{this.state.cpuLoads.timestamp}</h1>;
    }
}