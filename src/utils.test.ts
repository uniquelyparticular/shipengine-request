import { removeLeadingSlash } from './utils'

describe('ShipEngine utils', () => {
  it('leading slash is removed', () => {
    const string = '/test'

    expect(removeLeadingSlash(string)).toEqual('test')
  })
})
