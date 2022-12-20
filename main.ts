import express, { Request, Response } from 'express'
import cors from 'cors'
import { NodeSSH } from 'node-ssh'
import { Ssh } from './src/usecase/node-ssh'

const app = express()
app.use(express.json())
app.use(cors())

const sshNode = new NodeSSH()

const makeSsh = (): Ssh => {
  return new Ssh(sshNode)
}

app.post('/sessionId', async (req: Request, res: Response) => {
  try {
    const { internalId } = req.body
    const shh = makeSsh()
    const id = await shh.execCommand(`cd /var/bigbluebutton/learning-dashboard/${internalId} && ls`)
    res.status(200).json({ sessionId: id })
  } catch (error) {
    console.log(error)
  }
})

app.listen(3001, () => console.log('Server running at http://localhost:3001'))