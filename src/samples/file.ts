import { IStorySample } from '@/models/StorySample'
import code from './file.story'
import defaultCollaborators from './defaultCollaborators'

const counter: IStorySample = {
  name: 'file',
  services: [
    'http',
    'file',
    'schedule'
  ],
  stories: ['file'],
  code,
  collaborators: defaultCollaborators,
  description: 'An ephermal file sharing app using the schedule, file and http services.',
  tips: []
}

export default counter
