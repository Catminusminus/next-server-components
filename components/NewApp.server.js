import React, { Suspense, useState } from 'react'
import * as qna from '@tensorflow-models/qna'
import Form from './Form.client'
import { wrapPromise } from './wrappromise'

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

const Answer = ({ answer }) => {
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

const QNA = ({ answer }) => {
  return (
    <div>
      <Form />
      <>
        {answer !== `` ? (
          <Suspense fallback={<Error />}>
            <Answer answer={answer} />
          </Suspense>
        ) : (
          <div></div>
        )}
      </>
    </div>
  )
}

export default function App({ answer }) {
  return (
    <Suspense fallback={<Error />}>
      <QNA answer={answer} />
    </Suspense>
  )
}
