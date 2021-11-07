import React, { useState, useEffect } from 'react';
import './App.css';

class YearSelect extends React.Component {
  constructor (props) {
    super(props);
    this.state = {value: props.defaultYear};

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
    this.props.onYearSubmit(this.state.value);
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
  // return (
  //   <div>
  //     <p>
  //       Data for {props.year ? props.year : '[year]'} will be fetched.
  //     </p>
  //   </div>
  // );
  let html;
  if (props.yearData === null) {
    html = (
      <div>
        <p> Data is Loading </p>
      </div>
    );
  } else {
    // This is extremely hacky html but I just need to see that the github data is being fetched before I try the US Census Bureau
    html = (
      <div className="App">
        <p>GitHub User Data</p>
        <div className="user-container">
          <h5 className="info-item">{props.yearData.name}</h5>
          <h5 className="info-item">{props.yearData.location}</h5>
          <h5 className="info-item">{props.yearData.blog}</h5>
          <h5 className="info-item">{props.yearData.company}</h5>
        </div>
      </div>
    );
  }
  return html;
}

// Going to have both of the child elements in this, will likely lift up the state to this as well
// Likely going to have api logic in here as well
// Not sure whether this will be via function with Hooks or a class
function App() {
  const apiKey = 'a3fa18be7c991e0837cf1235bf74ccd8a43b750f';
  const years = ['https://api.github.com/users/deekshasharma', 'https://api.github.com/users/swotfabs', 'https://api.github.com/users/angrave'];
  const defaultYear = years[years.length - 1];

  const [currentYear, setCurrentYear] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const onYearSelect = (newYear) => {setCurrentYear(newYear);};

  useEffect(() => {
    console.log('useEffect Called with year: ' + currentYear);
    const getGitHubUserWithFetch = async () => {
      if (currentYear !== null) {
        const response = await fetch(currentYear);
        const jsonData = await response.json();
        setCurrentData(jsonData);
      }
    };
    setCurrentData(null);
    getGitHubUserWithFetch();
  }, [currentYear]);

  return (
    <div className="App">
      <header className="App-header">
        <YearSelect years={years} onYearSubmit={onYearSelect} defaultYear={defaultYear} />
        <RenderData yearData={currentData}/>
      </header>
    </div>
  );
}

export default App;
