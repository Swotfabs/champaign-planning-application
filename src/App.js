import React from 'react';
import './App.css';

class YearSelect extends React.Component {
  constructor (props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('Year changed to ' + event.target.value);
    this.setState({value: event.target.value});
  }

  // handleSubmit will call a function passed in by props
  handleSubmit(event) {
    console.log('A year was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render () {
    let yearsOptions = []
    this.props.years.forEach((year) => {
      const option = (
        <option key={year} value={year}>{year}</option>
        );
      yearsOptions = yearsOptions.concat([option]);
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Select a year: 
          <select name="years" id="years" value={this.state.value} onChange={this.handleChange}>
            {yearsOptions}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
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
  const years = ['2010', '2011', '2012', '2013'];

  return (
    <div className="App">
      <header className="App-header">
        <YearSelect years={years} />
        <RenderData />
      </header>
    </div>
  );
}

export default App;
