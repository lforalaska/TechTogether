"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const speech = require('@google-cloud/speech');
class GoogleProvider {
    transcribe(audioBytes, encoding, sampleRate) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new speech.SpeechClient();
            const audio = {
                content: audioBytes,
            };
            const config = {
                encoding,
                sampleRateHertz: sampleRate,
                languageCode: 'en-US',
            };
            const request = {
                audio,
                config,
            };
            // Detects speech in the audio file, returns the first transcription line
            const [response] = yield client.recognize(request);
            const firstTranscriptionLine = response.results
                .map((result) => result.alternatives[0].transcript)
                .join('\n');
            return firstTranscriptionLine;
        });
    }
}
exports.default = GoogleProvider;
//# sourceMappingURL=google.js.map