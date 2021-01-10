import React, { useState } from 'react'
import { useLocation } from './InputContext.client'

const Form = () => {
  const [question, setQuestion] = useState("")
  const [passage, setPassage] = useState("")
  const [_, setInput] = useLocation()
  const handleSubmit = (e) => {
    e.preventDefault()
    setInput({passage, question})
  }
  return <form onSubmit={handleSubmit}>
    <label>Passage: 
      <input type="text" value={passage} onChange={(e) => setPassage(e.target.value)} />
    </label><br />
    <label>Question:
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
    </label><br />
    <input type="submit" value="Ask!"/>
  </form>
}

export default Form
