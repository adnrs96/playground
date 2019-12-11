export interface IStoryCollaborator {
  name: string;
  avatar?: string;
}

export interface IStorySampleTip {
  x: number;
  y: number;
  element?: string;
  name: string;
  text: string;
}

export interface IStorySampleCommentMetas {
  line?: number | number[];
}

export interface IStorySampleComment {
  author: string;
  comment: string;
  metas?: IStorySampleCommentMetas;
}

export interface IStoryEvent {
  title: string;
  icon: string;
  text: string;
}

export interface IStorySample {
  id: string;
  name: string;
  code: string;
  collaborators: Array<IStoryCollaborator>;
  image?: string;
  services: Array<string>;
  description: string;
  tips?: Array<IStorySampleTip>;
}
