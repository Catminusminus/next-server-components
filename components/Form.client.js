import React, { useState, unstable_useTransition } from 'react'
import { createFromReadableStream } from 'react-server-dom-webpack'
import { useLocation } from './InputContext.client'
import { useRefresh } from './Cache.client'

async function sha256(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

async function predict(payload) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/prediction`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (!response.ok) {
      throw new Error(await response.text())
    }
    return response
  } catch (e) {
    console.log(e)
  } finally {
  }
}

const Form = () => {
  const [question, setQuestion] = useState('')
  const [passage, setPassage] = useState('')
  const [startNavigating, isNavigating] = unstable_useTransition()
  const [_, setInput] = useLocation()
  const [loading, setLoading] = useState(false)
  const refresh = useRefresh()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await predict({ passage, question })
    const seededResponse = createFromReadableStream(response.body)
    const cacheKey = JSON.stringify({ passage, question })
    startNavigating(() => {
      refresh(cacheKey, seededResponse)
      setInput({ passage, question})
      setLoading(false)
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Passage:
        <input
          type="text"
          value={passage}
          onChange={e => setPassage(e.target.value)}
        />
      </label>
      <br />
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Ask!" disabled={loading} />
    </form>
  )
}

export default Form
