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
  let html;
  if (props.yearData === null) {
    html = (
      <div>
        <p> Data is Loading </p>
      </div>
    );
  } else {
    let stats = {
      total: null,
      carTruckVan: null,
      public: null,
      bicycle: null,
      walked: null,
      other: null,
      fromHome: null
    }

    for (let i = 0; i < props.yearData[0].length; i++) {
      switch (props.yearData[0][i]) {
        case 'B08006_001E':
          stats.total = props.yearData[1][i];
          break;
        case 'B08006_002E':
          stats.carTruckVan = props.yearData[1][i];
          break;
        case 'B08006_008E':
          stats.public = props.yearData[1][i];
          break;
        case 'B08006_014E':
          stats.bicycle = props.yearData[1][i];
          break;
        case 'B08006_015E':
          stats.walked = props.yearData[1][i];
          break;
        case 'B08006_016E':
          stats.other = props.yearData[1][i];
          break;
        case 'B08006_017E':
          stats.fromHome = props.yearData[1][i];
          break;
        default:
          // console.log('Error could not identify code ' + props.yearData[0][i])
          break;
      }
    }
    html = (
      <div>
      {JSON.stringify(stats)}
      </div>
    );
  }
  return html;
}

// Going to have both of the child elements in this, will likely lift up the state to this as well
// Likely going to have api logic in here as well
// Not sure whether this will be via function with Hooks or a class
function App() {
  const censusRequestPrelude = 'https://api.census.gov/data/';
  const censusRequestPostlude = '/acs/acs5?get=B08006_001E,B08006_002E,B08006_008E,B08006_014E,B08006_015E,B08006_016E,B08006_017E&for=county:019&in=state:17';
  // const censusRequestApiKey = '&key=a3fa18be7c991e0837cf1235bf74ccd8a43b750f';
  // const censusRequestApiKey = '&key=1265b6a0043eaa3ef66e72e66e38cb8f8776afa8';
  const censusRequestApiKey = '';

  const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  const defaultYear = years[years.length - 1];

  const [currentYear, setCurrentYear] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const onYearSelect = (newYear) => {setCurrentYear(newYear);};

  useEffect(() => {
    console.log('useEffect Called with year: ' + currentYear);
    const getGitHubUserWithFetch = async () => {
      if (currentYear !== null) {
        const request = censusRequestPrelude + currentYear + censusRequestPostlude + censusRequestApiKey;
        const response = await fetch(request);
        const jsonData = await response.json();
        console.log(jsonData)
        setCurrentData(jsonData);
      }
    };
    setCurrentData(null);
    getGitHubUserWithFetch();
  }, [currentYear]);

  return (
    <div className="App">
      <header className="App-header">
        <p> Acessing Census Data for Champaign County </p>
      </header>
      <YearSelect years={years} onYearSubmit={onYearSelect} defaultYear={defaultYear} />
      <RenderData yearData={currentData}/>
      <p> "This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau." </p>
    </div>
  );
}

export default App;
