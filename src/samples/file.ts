import { IStorySample } from '@/models/StorySample'
import code from './file.story'
import defaultCollaborators from './defaultCollaborators'

const file: IStorySample = {
  id: 'file',
  name: 'file',
  services: [
    'http',
    'file',
    'schedule'
  ],
  code,
  collaborators: defaultCollaborators,
  description: 'An ephermal file sharing app using the schedule, file and http services.',
  tips: [],
  events: []
}

export default file
