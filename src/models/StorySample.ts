export interface IStorySampleTip {
  x: number
  y: number
  name: string
  text: string
}

export interface IStorySampleCommentMetas {
  line?: number | number[]
}

export interface IStorySampleComment {
  author: string
  comment: string
  metas?: IStorySampleCommentMetas
}

export interface IStorySample {
  name: string
  code: string,
  image?: string
  stories: Array<string>
  services: Array<string>
  description: string
  tips?: Array<IStorySampleTip>
  comments?: Array<IStorySampleComment>
}
