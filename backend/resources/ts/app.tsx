import React from 'react'
import ReactDom from 'react-dom'

const App = () => {
  const title = 'TypeScript React !!'
  return (
      <h1>{title}</h1>
  )
}
if (document.getElementById('app')){
  ReactDom.render(<App />, document.getElementById('app'));
}