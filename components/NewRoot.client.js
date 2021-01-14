import { useState, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useServerResponse } from './Cache.client'
import { InputContext } from './InputContext.client'

export default function Root() {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary FallbackComponent={Error}>
        <Content />
      </ErrorBoundary>
    </Suspense>
  )
}

function Content() {
  const [input, setInput] = useState({
    passage: '',
    question: '',
  })
  const response = useServerResponse(input)
  const root = response.readRoot(response)
  return (
    <InputContext.Provider value={[input, setInput]}>
      {root}
    </InputContext.Provider>
  )
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  )
}
