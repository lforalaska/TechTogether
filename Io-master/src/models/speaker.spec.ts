import { expect } from 'chai'
import 'mocha'
import Speaker from './speaker'
import Datagram from './datagram'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('Speaker', () => {
  beforeEach(() => {
    this.speaker = new Speaker("test")
  })

  describe('addBuffer', () => {
    it('should add a buffer correctly', () => {
      const datagram = new Datagram(Buffer.from("foobar"), "test", 123, 1)
      this.speaker.addBuffer(datagram)
      expect(this.speaker.DataBuffer.length).to.equal(1)
    })
  })

  describe('shouldDrain', () => {
    it('should mark ready for drain correctly when time has elapsed', () => {
      const datagram = new Datagram(Buffer.from("foobar"), "test", 123, 1)
      this.speaker.addBuffer(datagram)
      expect(this.speaker.shouldDrain()).to.be.false
      this.speaker.LastPacketAt = 0
      expect(this.speaker.shouldDrain()).to.be.true
    })
  })

  describe('drain', () => {
    it('should drain a data buffer correctly', () => {
      const datagram = new Datagram(Buffer.from("foobar"), "test", 123, 1)
      this.speaker.addBuffer(datagram)
      const result = this.speaker.drain()
      expect(result).to.not.be.undefined
      expect(result.length).to.equal(1)
    })
  })
})
