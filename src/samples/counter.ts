import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  logs: {
    cmd: 'story deploy',
    name: 'counter',
    files: [
      'counter'
    ],
    services: [
      'http',
      'redis'
    ]
  }
}

export default counter
