import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  logs: {
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
