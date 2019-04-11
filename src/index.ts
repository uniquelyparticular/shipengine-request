import fetch from 'cross-fetch'

import {
  InitOptions,
  Options,
  Headers,
  Fetch
} from './types'
import { removeLeadingSlash } from './utils'

export class createClient {
  private client_secret: string
  private options?: Options
  private fetch?: Fetch

  constructor(options: InitOptions) {
    const { client_secret, ...others } = options

    this.client_secret = client_secret
    this.fetch = options.fetch ? options.fetch : fetch
    this.options = {
      host: options.host ? options.host : 'api.shipengine.com',
      version: options.version ? options.version : 'v1',
      ...others
    }
  }

  async request(
    method: string,
    path: string,
    data: object = undefined,
    requestHeaders: Headers = {}
  ) {
    const {
      options: {
        application,
        currency,
        host,
        version,
        headers: classHeaders
      }
    } = this

    const uri: string = `https://${host}/${version}/${removeLeadingSlash(path)}`

    const customHeaders = {
      ...classHeaders,
      ...requestHeaders
    }

    const headers: Headers = {
      'api-key': this.client_secret,
      'Content-Type': 'application/json',
      'X-SHIPENGINE-SDK-LANGUAGE': 'JS-REQUEST',
      ...(application && { 'X-SHIPENGINE-APPLICATION': application }),
      ...(currency && { 'X-SHIPENGINE-CURRENCY': currency }),
      ...customHeaders
    }

    const body = customHeaders['Content-Type']
      ? data
      : { body: JSON.stringify({ data }) }

    const response = await this.fetch(uri, {
      method,
      headers,
      ...(data && body)
    })

    if (response.status === 204)
      return response.text()

    if (response.status >= 400)
      throw {
        statusCode: response.status,
        body: {
          message: response.statusText
        }
      }

    const json = await response.json()

    if (!response.ok) {
      throw {
        statusCode: response.status,
        ...json
      }
    }

    return json
  }

  post(path: string, data: object, headers?: Headers) {
    return this.request('POST', path, data, headers)
  }

  get(path: string, headers?: Headers) {
    return this.request('GET', path, undefined, headers)
  }

  put(path: string, data: object, headers?: Headers) {
    return this.request('PUT', path, data, headers)
  }

  patch(path: string, data: object, headers?: Headers) {
    return this.request('PATCH', path, data, headers)
  }

  delete(path: string, data: object, headers?: Headers) {
    return this.request('DELETE', path, data, headers)
  }
}
