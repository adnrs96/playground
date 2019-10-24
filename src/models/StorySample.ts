export interface IStorySample {
  logs: IStoryLogs
}

export interface IStoryLogs {
  cmd: string,
  name: string,
  files: Array<string>,
  services: Array<string>
}
