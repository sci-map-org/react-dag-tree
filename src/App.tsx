import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import { Dagre } from "./Dagre";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Dagre />
      </ChakraProvider>
    </div>
  );
}

export default App;
