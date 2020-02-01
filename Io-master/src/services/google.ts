const speech = require('@google-cloud/speech');

export default class GoogleProvider {
  async transcribe(audioBytes: string, encoding: string, sampleRate: number): Promise<string> {
    const client = new speech.SpeechClient();

    const audio = {
      content: audioBytes,
    }

    const config = {
      encoding,
      sampleRateHertz: sampleRate,
      languageCode: 'en-US',
    }

    const request = {
      audio,
      config,
    }

    // Detects speech in the audio file, returns the first transcription line
    const [response] = await client.recognize(request)
    const firstTranscriptionLine = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n')
    return firstTranscriptionLine
  }
}
