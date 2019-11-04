export interface IStorySampleTip {
  x: number,
  y: number,
  name: string,
  text: string
}

export interface IStorySample {
  name: string,
  logs: IStoryLogs,
  code: string,
  description: string,
  tips?: Array<IStorySampleTip>
}

export interface IStoryLogs {
  files: Array<string>,
  services: Array<string>
}
