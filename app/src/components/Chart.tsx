import * as React from "react";
import { Point } from "@common/Interfaces";

export interface Axes {
    X: (value: number) => number;
    Y: (value: number) => number;
}


export interface ChartProps extends React.Props<Chart> {
    points: Point[];
    axes?: Axes;
}

export interface ChartState {
    axes: Axes;
}

export class Chart extends React.Component<ChartProps, ChartState> {
    context: CanvasRenderingContext2D | null;
    container: HTMLCanvasElement | null;

    defaultAxes: Axes = {
        X: (value: number) => value,
        Y: (value: number) => value,
    }

    constructor(props: ChartProps) {
        super(props);
        this.container = null;
        if(props.axes != null)
        {
            this.setState({axes: props.axes});
        }
        else
        {
            this.setState({axes: this.defaultAxes});
        }
    }

    updateChart()
    {
        if(this.context != null)
        {
            const context = this.context;
            const axes = this.state.axes;
            this.props.points.forEach(point => {
                const x = point[0];
                const y = point[1];
                context.arc(axes.X(x), axes.Y(y), 1, 0, 2 * Math.PI);
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