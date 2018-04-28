import React, { Component } from 'react';
import { Circle } from "react-google-maps";

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Map, Legend } from "./components";
import { mapData } from "./data/ebc.js";
import './App.css';

const colors = {
  red: '#C70039',
  orange: '#FF5733',
  blue: '#154360'
};

const mapOptions = [
  {
    name: "All Members",
    dataPoints: () =>
      mapData.map(({ center, counts }) => (
        { center, opacity: 0.85, color: colors.blue, size: (counts.reg + counts.occ + counts.rar) * 1500 }
      )),
    legend: [{ color: colors.blue, label: "Member" }]
  },
  {
    name: "By Meeting Frequency",
    dataPoints: () => {
      const dp = [];
      mapData.forEach(({ center, counts }) => dp.push(
        { center, opacity: 0.6, color: colors.blue, size: counts.rar * 1500 }
      ));
      mapData.forEach(({ center, counts }) => dp.push(
        { center, opacity: 0.85, color: colors.orange, size: counts.occ * 1500 }
      ));
      mapData.forEach(({ center, counts }) => dp.push(
        { center, opacity: 1, color: colors.red, size: counts.reg * 1500 }
      ));
      return dp;
    },
    legend: [
      { color: colors.red, label: "Regularly attends" },
      { color: colors.orange, label: "Occasionally attends" },
      { color: colors.blue, label: "Other" }
    ]
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { curMapIdx: 1 };
  }

  render() {

    const { curMapIdx } = this.state;
    const curMapData = mapOptions[curMapIdx];
    console.log(curMapIdx, curMapData); console.log(curMapData.legend);

    return (
      <div className="app">
        <div className="sidebar">
          <img className="logo" src="./images/ebclogo.png" alt="Evergreen Basenji Club" />
          <h1>Member Map</h1>
          View:
          <Select
            id="state-select"
            autoFocus
            options={mapOptions.map(({ name }, idx) => ({ value: idx, label: name }))}
            clearable={false}
            name="selected-state"
            value={this.state.curMapIdx}
            onChange={(value) => { console.log('value', value); this.setState({ curMapIdx: value.value }); }}
            searchable={false}
          />
          <Legend entries={curMapData.legend} />
        </div>

        <div className="body">
          <Map zoom={9}>
            {
              curMapData &&
              curMapData.dataPoints() &&
              curMapData.dataPoints().map(({ center, size, color, opacity }, idx) =>
                <Circle key={`circle-${idx}`} center={center} radius={size} options={{ strokeWeight: 0, fillColor: color, fillOpacity: opacity }} />
              )
            }
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
