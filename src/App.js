import './App.css';

// TODO replace with dropdown selector
function Dropdown(props) {
  return (
    <p>
        Year will go here.
    </p>
  );
}

// TODO replace with Bar Graph
function RenderData(props) {
  return (
    <div>
      <p>
        Data rendering will go here.
      </p>
    </div>
  );
}

// Going to have both of the child elements in this, will likely lift up the state to this as well
// Likely going to have api logic in here as well
// Not sure whether this will be via function with Hooks or a class
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown />
        <RenderData />
      </header>
    </div>
  );
}

export default App;
