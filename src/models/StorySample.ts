export interface IStorySampleTip {
  x: number,
  y: number,
  name: string,
  text: string
}

export interface IStorySample {
  logs: IStoryLogs,
  code: string,
  tips?: Array<IStorySampleTip>
}

export interface IStoryLogs {
  name: string,
  files: Array<string>,
  services: Array<string>
}
