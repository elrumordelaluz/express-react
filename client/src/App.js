import React, { useEffect, useState } from 'react'
import useSocket from 'use-socket.io-client'
import logo from './logo.svg'
import './App.css'

function App() {
  const [response, setResponse] = useState('')

  useEffect(() => {
    fetch('/test')
      .then((res) => res.text())
      // .then((res) => res.json())
      .then(setResponse)
  }, [])

  const [socket] = useSocket(`/`)
  console.log({ socket })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. <br />
          <code>{response}</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
