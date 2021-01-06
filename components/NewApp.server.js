import React, { Suspense } from 'react'

const Error = () => <div>Waiting...</div>

export default function App({ name }) {
  return (
    <Suspense fallback={<Error />}>
      <div>{"Hello, " + name}</div>
    </Suspense>
  )
}
