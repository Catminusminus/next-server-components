import sendRes from '../../libs/send-res-with-module-map'
import * as qna from '@tensorflow-models/qna'
import '@tensorflow/tfjs-node'


export default async (req, res) => {
  // if `id` is undefined, it points to /react endpoint
  if (req.method !== 'POST') {
    return res.send('Method not allowed.')
  }

  const model = await qna.load()
  const answer = await model.findAnswers(req.body.question, req.body.passage)

  req.answer = answer
  console.log(req)
  sendRes(req, res, null)
}
