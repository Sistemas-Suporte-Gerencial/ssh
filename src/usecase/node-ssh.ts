export class Ssh {
  constructor (private readonly ssh: any) {
    this.ssh = ssh
  }

  async connect (): Promise<void> {
    await this.ssh.connect({
      host: '54.145.77.201',
      username: 'ubuntu',
      privateKeyPath: './sgedu.pem'
    })
  }

  async execCommand (command: string): Promise<string> {
    await this.connect()
    const { stdout } = await this.ssh.execCommand(command)
    return stdout
  }
}