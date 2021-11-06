import './App.css';

// TODO replace with dropdown selector
function Dropdown(props) {
  return (
    <div>
      <p>
        Year will go here.
      </p>
    </div>
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
