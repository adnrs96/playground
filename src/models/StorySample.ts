export interface IStorySample {
  logs: IStoryLogs
}

export interface IStoryLogs {
  name: string,
  files: Array<string>,
  services: Array<string>
}
