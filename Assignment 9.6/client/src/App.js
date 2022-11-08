import './App.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState({
    "action": "add",
    "type": "days",
    "value": ""
  });
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      })
  }

  const handleSubmit = () => {
    let newData = {
      ...data,
      "date": value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear()
    }
    console.log('data:', newData)

    fetch("http://localhost:8080", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
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
      <label>Select Date: </label>
      <div className="calender">
      <Calendar onChange={onChange} value={value} />
      </div>
      <button disabled={data.value == "" || data.value < 0 ? true:false} className="btn" onClick={handleSubmit} >Submit</button>
    </div>
  );
}

export default App;
