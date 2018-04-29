import * as React from "react";
import { Point } from "@common/Interfaces";

export interface ChartProps extends React.Props<Chart> {
    points: Point[];
}

export interface ChartState {
}

export class Chart extends React.Component<ChartProps, ChartState> {
    context: CanvasRenderingContext2D | null;
    container: HTMLCanvasElement | null;

    constructor(props: ChartProps) {
        super(props);
        this.container = null;
    }

    updateChart()
    {
        if(this.context != null)
        {
            this.props.foreach(point => {
                const x = point[0];
                const y = point[1];
                this.context.arc(axes.X(x), axes.Y(y), 1, 0, 2 * Math.PI);
            });
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
            this.context = this.container.getContext('2d');
        }
    }

    componentWillUnmount() {
    }

    render() {
        return <canvas ref={container => this.container = container}></canvas>;
    }
}