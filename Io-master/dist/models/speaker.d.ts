import Datagram from './datagram';
export default class Speaker {
    private dataBuffer;
    private lastPacketAt;
    private id;
    constructor(id: string);
    drain(): Datagram[];
    shouldDrain(): boolean;
    addBuffer(data: Datagram): void;
    readonly DataBuffer: Datagram[];
    LastPacketAt: number;
}
