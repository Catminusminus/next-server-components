import React, { Suspense, useState } from 'react'
import * as qna from '@tensorflow-models/qna'
import Form from './Form.client'
import { wrapPromise } from './wrappromise'
require('@tensorflow/tfjs-node')

const getAnswer = (passage, question) => wrapPromise(
  (async (passage, question) => {
    const model = await qna.load()
    const answer = await model.findAnswers(question, passage)
    return answer
  })(passage, question) 
)
const Error = () => <div>Waiting...</div>

const Answer = ({ wrappedAnswer }) => {
  const answer = wrappedAnswer.read()
  return <div>{JSON.stringify(answer)}</div>
}

const QNA = ({passage, question}) => {  
  return (<div>
    <Form />
      <>
      {passage !== ``?
      <Suspense fallback={<Error />}>
        <Answer wrappedAnswer={getAnswer(passage, question)}/>
      </Suspense>: <div></div>
      }
      </>
    </div>)
} 

export default function App({ passage, question }) {
  return (
      <Suspense fallback={<Error />}>
        <QNA passage={passage} question={question}/>
      </Suspense>
  )
}
