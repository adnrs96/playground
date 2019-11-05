import { IStorySample } from '@/models/StorySample'
import code from './file.story'

const counter: IStorySample = {
  name: 'file',
  logs: {
    files: [
      'file'
    ],
    services: [
      'http',
      'file',
      'schedule',
    ]
  },
  code,
  description: 'An ephermal file sharing app using the schedule, file and http services.',
  tips: [],
}

export default counter
