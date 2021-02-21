import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import { Sugiyama } from "./Sugiyama";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Sugiyama />
      </ChakraProvider>
    </div>
  );
}

export default App;
