export interface IStoryCollaborator {
  name: string
  // Leaving this attribute even if we don't really need it right now. This way this is URL ready
  photo?: string
}

export interface IStorySampleTip {
  x: number
  y: number
  name: string
  text: string
}

export interface IStorySample {
  name: string
  code: string
  collaborators: Array<IStoryCollaborator>
  image?: string
  stories: Array<string>
  services: Array<string>
  description: string
  tips?: Array<IStorySampleTip>
}
