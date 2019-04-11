export interface InitOptions {
  client_secret: string
  fetch?: Fetch
  version?: string
  application?: string
  currency?: string
  host?: string
  headers?: Headers
}

export interface Options {
  fetch?: Fetch
  application?: string
  currency?: string
  host?: string
  version?: string
  headers?: Headers
}

export interface Headers {
  [key: string]: string
}

export interface Fetch {
  (input?: Request | string, init?: RequestInit): Promise<Response>
}
