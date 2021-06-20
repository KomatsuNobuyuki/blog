/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string
    readonly REQUEST_URL: string
  }
}