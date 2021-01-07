import React, { Suspense } from 'react'
import * as qna from '@tensorflow-models/qna';
import Form from './Form.client'

const wrapPromise = (promise) => {
  let status = 'pending';
  let result;

  const suspender = promise.then(
    (r) => {
      status = 'fulfilled';
      result = r;
    },
    (e) => {
      status = 'rejected';
      result = e;
  });

  const read = () => {
    if(status === 'pending') {
      throw suspender;
    } else if(status === 'rejected') {
      throw result;
    } else {
      return result;
    }
  };

  return { read };
}

const loadModel = () => wrapPromise(qna.load())

const Error = () => <div>Waiting...</div>

const QNA = () => {
  const model = loadModel();
  return <Form />
} 

export default function App({ name }) {
  return (
    <Suspense fallback={<Error />}>
      <QNA />
    </Suspense>
  )
}
