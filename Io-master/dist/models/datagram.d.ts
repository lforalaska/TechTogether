/// <reference types="node" />
export default class Datagram {
    private data;
    private userID;
    private timestamp;
    private sequence;
    constructor(chunk: Buffer, userID: string, timestamp: number, sequence: number);
    readonly Sequence: number;
}
