import express, { Request, Response } from 'express'
import { NodeSSH } from 'node-ssh'
import { Ssh } from './src/usecase/node-ssh'

const app = express()
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
})

const sshNode = new NodeSSH()

const makeSsh = (): Ssh => {
  return new Ssh(sshNode)
}

app.post('/sessionId', async (req: Request, res: Response) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    const { internalId } = req.body
    const shh = makeSsh()
    const id = await shh.execCommand(`cd /var/bigbluebutton/learning-dashboard/${internalId} && ls`)
    res.status(200).json({ sessionId: id })
  } catch (error) {
    console.log(error)
  }
})

app.listen(3000, () => console.log('Server running at http://localhost:3000'))