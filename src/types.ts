export interface InitOptions {
  client_secret: string
  version?: string
  application?: string
  currency?: string
  host?: string
  headers?: Headers
}

export interface Options {
  application?: string
  currency?: string
  host?: string
  version?: string
  headers?: Headers
}

export interface Headers {
  [key: string]: string
}
