import React from 'react'
import './styles/style.css'
import Button from './components/Button'
import { nanoid } from 'nanoid'

const App = () => {
  const data = [
    { id: 'equals', sign: '=', order: 15 },
    { id: 'zero', sign: 0, order: 16 },
    { id: 'one', sign: 1, order: 12 },
    { id: 'two', sign: 2, order: 13 },
    { id: 'three', sign: 3, order: 14 },
    { id: 'four', sign: 4, order: 8 },
    { id: 'five', sign: 5, order: 9 },
    { id: 'six', sign: 6, order: 10 },
    { id: 'seven', sign: 7, order: 4 },
    { id: 'eight', sign: 8, order: 5 },
    { id: 'nine', sign: 9, order: 6 },
    { id: 'add', sign: '+', order: 11 },
    { id: 'subtract', sign: '-', order: 7 },
    { id: 'multiply', sign: '×', order: 3 },
    { id: 'divide', sign: '/', order: 2 },
    { id: 'decimal', sign: '.', order: 17 },
    { id: 'clear', sign: 'C', order: 1 }
  ]

  const buttons = data.map(object => {
    return <Button key={nanoid()} data={object} />
  })

  return (
    <div id='calculator'>
      <div className='formula-screen'>123</div>
      <div className='output-screen' id='display'>
        456
      </div>
      <div className='buttons-container'>{buttons}</div>
    </div>
  )
}

export default App
