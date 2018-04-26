import * as React from "react";
import * as ReactDOM from "react-dom";
import { CpuLoads } from "@common/CpuLoads";
import { CpuLoadsView } from "./CpuLoadsView";

class Main extends React.Component<{}, {}> {
    render() {    
        const cpuLoads: CpuLoads = {
            id: "10s",
            timestamp: "1234",
            cpu_loads: {
                medians: [1, 2],
                stds: [3, 4],
            }
        };
        return <CpuLoadsView cpuLoads={cpuLoads}></CpuLoadsView>;
    }
}

ReactDOM.render(<Main/>, document.getElementById("root"));