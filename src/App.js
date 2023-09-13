import React, {useEffect, useState} from 'react'
import './App.css';

function App() {
  
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);

  return(
    <div>
      {(typeof backendData.title === 'undefined') ? (
        <h1>Loading...</h1>
      ) : (
        <h1>{backendData.title}</h1>
      )}
    </div>
  )
}

export default App;
