import { expect } from 'chai'
import 'mocha'
import { Stream } from 'stream'
import MusicPlayer from './music'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('MusicPlayer', () => {
  beforeEach(() => {
    this.musicPlayer = new MusicPlayer()
  })

  describe('canHandleMessage', () => {
    it('should return true for play/skip/stop', () => {
      const play = this.musicPlayer.canHandleMessage('!play test')
      const skip = this.musicPlayer.canHandleMessage('!skip')
      const stop = this.musicPlayer.canHandleMessage('!stop')
      expect(play).to.be.true
      expect(skip).to.be.true
      expect(stop).to.be.true
    })

    it('should return false for not-allowed commands', () => {
      const playFail = this.musicPlayer.canHandleMessage('!playtest ')
      const junk = this.musicPlayer.canHandleMessage('!foobar')
      expect(playFail).to.be.false
      expect(junk).to.be.false
    })
  })

  describe('play', () => {
    it('should add to queue if something is playing currently', () => {
      const connection = {
        play: (stream: Stream) => {},
        stopPlaying: () => {},
        playing: () => true,
      }
      this.musicPlayer.play(connection, 'test')
      expect(this.musicPlayer.queue.length).to.equal(1)
      expect(this.musicPlayer.queue[0]).to.equal('test')
    })
  })

  describe('stop', () => {
    it('should call stopPlaying on the underlying voice connection', () => {
      let count = 0
      const connection = {
        play: (stream: Stream) => {},
        stopPlaying: () => {
          count++
        },
        playing: () => true,
      }
      this.musicPlayer.stop(connection)
      expect(count).to.equal(1)
    })
  })

  describe('skip', () => {
    it('should do nothing if the queue is currently empty', () => {
      let count = 0
      const connection = {
        play: (stream: Stream) => {
          count--
        },
        stopPlaying: () => {
          count++
        },
        playing: () => true,
      }
      this.musicPlayer.skip(connection)
      expect(count).to.equal(1)
    })
  })
})
