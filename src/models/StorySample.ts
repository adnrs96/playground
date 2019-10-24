export interface IStorySample {
  logs: IStoryLogs,
  code: string
}

export interface IStoryLogs {
  name: string,
  files: Array<string>,
  services: Array<string>
}
