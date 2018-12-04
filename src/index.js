import React from "react";
import ReactDOM from "react-dom";
import CustomCellEditTable from "./CustomCellEditTable";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <CustomCellEditTable />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
