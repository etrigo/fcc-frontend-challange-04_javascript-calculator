import React, { useState, useEffect } from 'react'
import './styles/style.css'
import { data } from './utilities/data'
import Button from './components/Button'
import { nanoid } from 'nanoid'
import stringMath from 'string-math'

const App = () => {
  // states for input (from user), formula (showed in element with id formula-screen),
  // output (showed in the element with id display)
  const [input, setInput] = useState('')
  const [formula, setFormula] = useState('')
  const [output, setOutput] = useState(0)
  // console.log('input: ' + input)
  // console.log('output: ' + output)
  // console.log(typeof output)

  // useEffect to listen to when input state changes and update the
  // state for formula and output.
  useEffect(() => {
    const data = input.split(/([-+*/])/g)
    data[data.length - 1] === '' && data.pop()

    input === '' ? setFormula('') : setFormula(data.join(''))

    input === ''
      ? setOutput(0)
      : setOutput(() => {
          return /[-+*/]/.test(data[data.length - 1])
            ? data[data.length - 1]
            : Number(data[data.length - 1])
        })
  }, [input])

  // onClick function for calc. buttons that check if should calculate
  // result or keep adding to the formula
  function handleClick (target, data) {
    data.type === 'equals' ? handleResult() : handleInput(target, data)
  }

  // calculating the result when user click the equals sign
  // and seting the output state (element with id. display)
  function handleResult () {
    formula !== '' && setOutput(stringMath(formula))
  }

  // building the string state that later will be calculated
  function handleInput (target, data) {
    setInput(prev => {
      if (data.type === 'clear') {
        return ''
      } else if (/^(number|oporator|decimal)$/.test(data.type)) {
        const splitted = prev.split(/([-+*/])/g).filter(e => e !== '')
        const last = splitted[splitted.length - 1]
        const secondLast = splitted[splitted.length - 2]

        if (
          (last === '0' && data.sign === '0') ||
          (last === '0' && /[1-9]/.test(data.sign))
        ) {
          console.log('level 1')
          return prev.slice(0, prev.length - 1).concat(data.sign)
        } else if (
          !/[-+*/]/.test(secondLast) &&
          /[-+*/]/.test(last) &&
          data.sign === '-'
        ) {
          console.log('level 2')
          return prev.concat(data.sign)
        } else if (
          /[-+*/]/.test(secondLast) &&
          last === '-' &&
          /[-+*/]/.test(data.sign)
        ) {
          console.log('level 3')
          return prev.slice(0, prev.length - 2).concat(data.sign)
        } else if (
          !/[-+*/]/.test(secondLast) &&
          /[-+*/]/.test(last) &&
          /[-+*/]/.test(data.sign)
        ) {
          console.log('level 4')
          return prev.slice(0, prev.length - 1).concat(data.sign)
        } else if (
          !/[0-9]/.test(secondLast) &&
          last === '-' &&
          /[-+*/]/.test(data.sign)
        ) {
          console.log('level 5')
          return prev.slice(0, prev.length - 2).concat(data.sign)
        } else if (
          (!last && data.sign === '.') ||
          (/[-+*/]/.test(last) && data.sign === '.')
        ) {
          console.log('level 6')
          return prev.concat(`0${data.sign}`)
        } else if (/[.]/.test(last) && data.sign === '.') {
          return prev
        }
        console.log('Level 7')
        return prev.concat(data.sign)
      }
    })
  }

  // create button elements for the calculator from the imported data array
  const buttons = data.map(object => {
    return <Button key={nanoid()} data={object} click={handleClick} />
  })

  return (
    <div id='calculator'>
      <div className='formula-screen'>{formula}{}</div>
      <div className='output-screen' id='display'>
        {output}
      </div>
      <div className='buttons-container'>{buttons}</div>
    </div>
  )
}

export default App
