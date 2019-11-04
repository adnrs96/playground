export interface IStorySampleTip {
  x: number
  y: number
  name: string
  text: string
}

export interface IService {
  icon: string,
  name: string
}


export interface IArchitectureBlock {
  icon: string;
  health: number;
}

export interface IStorySample {
  name: string
  code: string,
  architecture: IArchitectureBlock[][]
  files: Array<string>
  services: Array<IService>
  description: string
  tips?: Array<IStorySampleTip>
}
