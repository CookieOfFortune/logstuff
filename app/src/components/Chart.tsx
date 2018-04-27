import * as React from "react";
import Highcharts from "highcharts";

export interface ChartProps extends React.Props<Chart> {
    options: Highcharts.Options;
}

export interface ChartState {
}

export class Chart extends React.Component<ChartProps, ChartState> {
    chart: Highcharts.ChartObject | null;
    container: HTMLDivElement | null;

    constructor(props: ChartProps) {
        super(props);
        this.chart = null;
        this.container = null;
    }

    updateChart()
    {
        if(this.chart != null)
        {
            this.chart.update(this.props.options);
        }
    }

    componentDidUpdate()
    {
        this.updateChart();
    }

    componentWillReceiveProps()
    {
        this.updateChart();
    }
    
    componentDidMount() {
        if(this.container != null)
        {
            this.chart = new Highcharts.Chart(this.container, this.props.options);
        }
    }

    componentWillUnmount() {
        if(this.chart != null)
        {
            this.chart.destroy();
        }
    }

    render() {
        return <div ref={container => this.container = container}></div>;
    }
}