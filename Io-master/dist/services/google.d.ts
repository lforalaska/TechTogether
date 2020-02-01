export default class GoogleProvider {
    transcribe(audioBytes: string, encoding: string, sampleRate: number): Promise<string>;
}
