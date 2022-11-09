import './App.css';
import React, { useState } from 'react';

function App() {

  const [data, setData] = useState({
    "action": "add",
    "type": "days",
    "value": "",
    "date":""
  });
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      })
  }

  const handleSubmit = () => {
    console.log('data:', data)

    fetch("http://localhost:8080", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("r:", r);
        alert(`After ${data.action}ing ${data.value} ${data.type} the date will be ${r.data}`)
      })
      .catch((e) => {
        console.log("err:", e);
      })
  }
  return (
    <div className="App">
      <label>Select Operation: </label>
      <select onChange={handleChange} name="action">
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
      </select>
      <br />
      <input type="number" name='value' onChange={handleChange} required/>
      <select onChange={handleChange} name="type">
        <option value="days">Days</option>
        <option value="weeks">Weeks</option>
      </select>
      <br />
      <div className="calender">
        <label>Select Date: </label>
        <input type="date" name="date" onChange={handleChange} />
      </div>

      <br/>
      <button disabled={data.value === "" || data.value < 0 ? true:false} className="btn" onClick={handleSubmit} >Submit</button>
    </div>
  );
}

export default App;
