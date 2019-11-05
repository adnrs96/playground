export interface IStorySampleTip {
  x: number
  y: number
  name: string
  text: string
}

export interface IStorySample {
  name: string
  code: string,
  stories: Array<string>
  services: Array<string>
  description: string
  tips?: Array<IStorySampleTip>
}
