export default class Datagram {
  private data: Buffer

  private userID: string

  private timestamp: number

  private sequence: number

  constructor(chunk: Buffer, userID: string, timestamp: number, sequence: number) {
    this.data = chunk;
    this.userID = userID;
    this.timestamp = timestamp;
    this.sequence = sequence;
  }

  get Sequence(): number {
    return this.sequence
  }
}
