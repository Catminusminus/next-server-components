import { useState, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useServerResponse } from './Cache.client'
import { LocationContext } from './LocationContext.client'

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
  const response = useServerResponse({name: "Anonymous"})
  const root = response.readRoot()
  return <div>{root}</div>
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  )
}
