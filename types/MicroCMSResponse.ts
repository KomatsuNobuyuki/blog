export type MicroCMSResponse<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}