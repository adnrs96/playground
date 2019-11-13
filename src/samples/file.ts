import { IStorySample } from '@/models/StorySample'
import code from './file.story'
import defaultCollaborators from './defaultCollaborators'

const file: IStorySample = {
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
  tips: [],
  events: []
}

export default counter
