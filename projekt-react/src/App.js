import "./App.css";
import { Tabs } from "../src/components/Tabs/Tabs";
import { IconContext } from "react-icons";

function App() {
  return (
    <IconContext.Provider
      value={{ color: "#b30000", className: "global-class-name"}}
    >
      <div className="App">
        <header className="App-header">
          <Tabs />
        </header>
      </div>
    </IconContext.Provider>
  );
}

export default App;
