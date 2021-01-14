import React, { Suspense, useState } from 'react'
import * as qna from '@tensorflow-models/qna'
import Form from './Form.client'
import { wrapPromise } from './wrappromise'
require('@tensorflow/tfjs-node')

const getAnswer = (passage, question) =>
  wrapPromise(
    (async (passage, question) => {
      try {
        const model = await qna.load()
        const answer = await model.findAnswers(question, passage)
        return answer
      } catch (err) {
        console.error(err)
        return []
      }
    })(passage, question)
  )
const Error = () => <div>Waiting...</div>

const Answer = ({ wrappedAnswer }) => {
  const answer = wrappedAnswer.read()
  return (
    <>
      {answer.length ? (
        <table>
          <tr>
            <th>Answer</th>
            <th>Score</th>
          </tr>
          {answer.map(({ text, score }) => (
            <tr key={text}>
              <td>{text}</td>
              <td>{score}</td>
            </tr>
          ))}
        </table>
      ) : (
        <div>We could not answer your question.</div>
      )}
    </>
  )
}

const QNA = ({ passage, question }) => {
  return (
    <div>
      <Form />
      <>
        {passage !== `` ? (
          <Suspense fallback={<Error />}>
            <Answer wrappedAnswer={getAnswer(passage, question)} />
          </Suspense>
        ) : (
          <div></div>
        )}
      </>
    </div>
  )
}

export default function App({ passage, question }) {
  return (
    <Suspense fallback={<Error />}>
      <QNA passage={passage} question={question} />
    </Suspense>
  )
}
