import { expect } from 'chai'
import TimeUtils from './time'

import 'mocha'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('TimeUtils', () => {
  describe('getUnixTimestampMS', () => {
    it('should return a number that\'s after epoch', () => {
      const answer: number = TimeUtils.getUnixTimestampMS()
      expect(answer).to.be.greaterThan(0)
    })
  })
})
