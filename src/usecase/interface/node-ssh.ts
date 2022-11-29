export interface NodeSsh {
  connect: () => Promise<void>
  execCommand: (command: string) => Promise<string>
}