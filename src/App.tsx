import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Dagre } from "./Dagre";

import { ChakraProvider } from "@chakra-ui/react";
import { Sugiyama } from "./Sugiyama";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Dagre />
        <Sugiyama />
      </ChakraProvider>
    </div>
  );
}

export default App;
