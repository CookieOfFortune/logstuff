import * as React from "react";
import * as ReactDOM from "react-dom";
import { CpuLoadsView } from "./Components/CpuLoadsView";

class Main extends React.Component<{}, {}> {
    render() {    
        return <CpuLoadsView/>;
    }
}

ReactDOM.render(<Main/>, document.getElementById("root"));