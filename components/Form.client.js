import React, { useState } from 'react'

const Form = () => {
  const [question, setQuestion] = useState("")
  const [passage, setPassage] = useState("")
  const handleSubmit = () => {
    console.log("Hi! This is still under development:)")
  }
  return <form onSubmit={null}>
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
