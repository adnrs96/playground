import { IStorySample } from '&/StorySample'
import code from './zoom.story'
import defaultCollaborators from './defaultCollaborators'

const zoom: IStorySample = {
  id: 'zoom',
  name: 'Zoom audio to text transcript',
  services: [
    'zoom',
    'http',
    'deepspeech',
    'mailgun'
  ],
  code,
  collaborators: defaultCollaborators,
  description:
    'Transcribe your Zoom meetings and receive emails when they are ready using Zoom, HTTP, DeepSpeech and Mailgun services.',
  tips: []
}

export default zoom
