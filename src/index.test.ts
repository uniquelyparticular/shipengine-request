import { expect } from 'chai'
import fetch from 'fetch-everywhere'
import { createClient } from './index'


describe('ShipEngine index', () => {
    it('fetch can be overridden', () => {
        const shipEngine = new createClient({
            client_secret: 'XXX',
            fetch: fetch
        })
        expect(shipEngine.fetch).to.be.an.instanceof(Function)
    })

    it('get carriers', () => {
        const shipEngine = new createClient({
            client_secret: 'XXX'
        });

        return shipEngine
            .get('carriers')
            .then(results => {
                expect(results).to.not.be.null
            })
            .catch(error => {
                expect(error).to.deep.equal({ statusCode: 401, body: { message: 'Unauthorized' } })
            })
    })

    it('get carriers with custom fetch', () => {
        const shipEngine = new createClient({
            client_secret: 'XXX',
            fetch: fetch
        });

        return shipEngine
            .get('carriers')
            .then(results => {
                expect(results).to.not.be.null
            })
            .catch(error => {
                expect(error).to.deep.equal({ statusCode: 401, body: { message: 'Unauthorized' } })
            })
    })
})