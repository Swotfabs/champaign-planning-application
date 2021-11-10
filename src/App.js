import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts";
import './App.css';

// If we are not in developer mode, do not log things directly to the console
const DEVMODE = (process.env.NODE_ENV === 'development');
const log = DEVMODE ? console.log : (msg) => {};

// A dictionary to have the census codes in one place for readability and to update them if necessary
const censusCodes = {
  total: 'B08006_001E',
  carTruckVan: 'B08006_002E',
  public: 'B08006_008E',
  bicycle: 'B08006_014E',
  walked: 'B08006_015E',
  other: 'B08006_016E',
  fromHome: 'B08006_017E',
}

// This is the selector where the user chooses a year. It is a class because we need to completely bind handleChange and handleSubmit
// to prevent submit's default behavior (attempting to redirect to another page)
class YearSelect extends React.Component {
  constructor (props) {
    super(props);
    this.state = {value: props.defaultYear};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    log('Year changed to ' + event.target.value);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    log('A year was submitted: ' + this.state.value);
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
        case censusCodes.total:
          stats.total = parseInt(props.yearData[1][i], 10);
          break;
        case censusCodes.carTruckVan:
          stats.carTruckVan = parseInt(props.yearData[1][i], 10);
          break;
        case censusCodes.public:
          stats.public = parseInt(props.yearData[1][i], 10);
          break;
        case censusCodes.bicycle:
          stats.bicycle = parseInt(props.yearData[1][i], 10);
          break;
        case censusCodes.walked:
          stats.walked = parseInt(props.yearData[1][i], 10);
          break;
        case censusCodes.other:
          stats.other = parseInt(props.yearData[1][i], 10);
          break;
        case censusCodes.fromHome:
          stats.fromHome = parseInt(props.yearData[1][i], 10);
          break;
        case 'state':
          break;
        case 'county':
          break;
        default:
          log('Error could not identify code ' + props.yearData[0][i])
          break;
      }
    }
    console.log(stats.total);
    html = (
      <Chart
        width={'58em'}
        height={'27em'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Commuting Method', 'Number of Commuters', {role: 'annotation'}],
          ['Car, Truck, or Van', stats.carTruckVan, stats.carTruckVan],
          ['Public Transpoertation', stats.public, stats.public],
          ['Bicycle', stats.bicycle, stats.bicycle],
          ['Walked', stats.walked, stats.walked],
          ['Other Transportation', stats.other, stats.other],
          ['Worked From Home', stats.fromHome, stats.fromHome],
        ]}
        options={{
          title: 'Commuting methods for ' + props.year,
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Total Commuters',
            minValue: 0,
            viewWindow: {
              min:0,
              max: stats.total,
            },
            ticks: [
              {v:0, f:'0%'},
              {v:Math.round(stats.total * .25), f:'25%'},
              {v:Math.round(stats.total * .5), f:'50%'},
              {v:Math.round(stats.total * .75), f:'75%'},
              {v:stats.total, f:'100%'},
            ]
          },
          vAxis: {
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }
  return html;
}

// Going to have both of the child elements in this, will likely lift up the state to this as well
// Likely going to have api logic in here as well
// Not sure whether this will be via function with Hooks or a class
function App() {
  const censusRequestPrelude = 'https://api.census.gov/data/';
  const censusRequestPostlude = '/acs/acs5'
  const censusRequestItems = '?get=' + censusCodes.total + ',' + censusCodes.carTruckVan + ','
                             + censusCodes.public + ',' + censusCodes.bicycle + ',' + censusCodes.walked + ','
                             + censusCodes.other + ',' + censusCodes.fromHome
  const censusRequestLocation = '&for=county:019&in=state:17';
  // const censusRequestApiKey = '&key=a3fa18be7c991e0837cf1235bf74ccd8a43b750f';
  // const censusRequestApiKey = '&key=1265b6a0043eaa3ef66e72e66e38cb8f8776afa8';
  const censusRequestApiKey = '';

  const years = ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
  const defaultYear = years[0];

  const [currentYear, setCurrentYear] = useState(defaultYear);
  const [currentData, setCurrentData] = useState(null);

  const onYearSelect = (newYear) => {setCurrentYear(newYear);};

  useEffect(() => {
    if (currentYear === null) {
      return;
    }
    log('useEffect Called with year: ' + currentYear);
    const getGitHubUserWithFetch = async () => {
      if (currentYear !== null) {
        const request = censusRequestPrelude + currentYear + censusRequestPostlude
                        + censusRequestItems + censusRequestLocation + censusRequestApiKey;

        fetch(request, {mode: 'cors'})
          .then(response => response.json())
          .then((jsonData) => {
            log(jsonData);
            setCurrentData(jsonData);
          })
          .catch(error => log(error));
      }
    };
    setCurrentData(null);
    getGitHubUserWithFetch();
  }, [currentYear, censusRequestItems]);

  return (
    <div className="App">
      <header className="App-header">
        <p> Acessing Census Data for Champaign County </p>
      </header>
      <YearSelect years={years} onYearSubmit={onYearSelect} defaultYear={defaultYear} />
      <RenderData year={currentYear} yearData={currentData}/>
      <p> "This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau." </p>
    </div>
  );
}

export default App;
