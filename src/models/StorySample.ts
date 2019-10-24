export interface IStorySample {
  logs: IStoryLogs,
  code: string
}

export interface IStoryLogs {
  cmd: string,
  name: string,
  files: Array<string>,
  services: Array<string>
}
