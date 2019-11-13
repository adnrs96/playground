export interface IStoryCollaborator {
  name: string
  avatar?: string
}

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

export interface IEvent {
  title: string
  icon: string
  text: string
}

export interface IStorySample {
  name: string
  code: string
  collaborators: Array<IStoryCollaborator>
  image?: string
  events: Array<IEvent>
  stories: Array<string>
  services: Array<string>
  description: string
  tips?: Array<IStorySampleTip>
  comments?: Array<IStorySampleComment>
}
