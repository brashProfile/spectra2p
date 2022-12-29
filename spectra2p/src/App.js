import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import './index.css'; 

// TODO: import MONGODB data from container
function VictoryLineChart({selection}) {

   const [spectraData, setSpectraData] = useState(1)

   useEffect(()=>{
      fetch(`http://localhost:5000/spectra/${selection}`)
        .then((response) => response.json())
        .then((data) => setSpectraData(data))
   }, [selection]);
   console.log(spectraData)
   if(spectraData ===1){
    return
   } else {
    var methods = {
      add: function(a, b) { return a + b; },
      subtract: function(a, b) { return a - b; }
    };
    let waveArr = spectraData.map((e) => e.x)
   // let testArr = spectraData.reduce(methods.add(+1))
   return (<VictoryChart
      theme={VictoryTheme.material}
      domain={{x: [Math.min.apply(Math,waveArr), Math.max.apply(Math,waveArr)]}}
      >
      <VictoryLine
      style={{
        data: { stroke: "#c43a31" },
        parent: { border: "1px solid #ccc"}
      }}
      data={spectraData}
      />
      </VictoryChart>
   )
  }
}

function DyeDropdown() {
    const [mydata, setmydata] = useState(0);
    const [selection, setSelection] = useState(1); 
    //hook will run once when component is created
    useEffect(() => {
      fetch(`http://localhost:5000/item/1`)
        .then((response) => response.json())
        .then((data) => setmydata(data));
    }, []);
    console.log(mydata)
    if(mydata === 0 ){
      return
    } else {
      let nameArr = mydata.map( (n) => {return n.name})
      //TODO: Add listing fucntionality
      //FIX: Data from fetch is incorect
      return (
        <div>
          <VictoryLineChart class="chart" selection={selection} />
          <div class="selector-container">
            <div class="dye-selector">
              <DropdownList id="dd_list" data={nameArr} onSelect={(name)=> setSelection(nameArr.indexOf(name)) } >
              </DropdownList>
            </div>
            <div class="button">
              <button>Add</button>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      )
    }
}


function DyeEntry({itemList}){
  const draw = [
    { id: "1", value: "Abs."},
    { id: "2", value: "Ex."}
  ]
  return (
    <div>
      {itemList.map(item => <h1>hello</h1>)}
    </div>
  )
}

const dropdown = ReactDOM.createRoot(document.getElementById('dropdown'))
dropdown.render(<DyeDropdown />)
