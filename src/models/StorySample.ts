export interface IStorySample {
  name: string,
  logs: IStoryLogs,
  code: string,
  description: string
}

export interface IStoryLogs {
  files: Array<string>,
  services: Array<string>
}
