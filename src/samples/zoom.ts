import { IStorySample } from '@/models/StorySample'
import code from './zoom.story'
import defaultCollaborators from './defaultCollaborators'

const zoom: IStorySample = {
  name: 'zoom',
  services: [
    'zoom',
    'http',
    'machinebox',
    'mailgun',
  ],
  stories: ['zoom'],
  code,
  collaborators: defaultCollaborators,
  description:
    'Transcribe your zoom meetings and receive emails when they are ready using the zoom, http, deepspeech and mailgun services.',
  tips: [],
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie, it would be nice if we could make DeepSpeech processing asynchronous to speed this up.'
  }, {
    author: 'Inkie',
    comment: "That's a great idea Sharkie, and I think Storyscript might support it soon!"
  }],
  events: [
    {
      title: "zoom",
      icon: "zoom",
      text: `  Zoom:\n    Name: Retrospective\n    Date: 13/11/2019\n    Host: Steve Peak`
    },
    {
      title: "zoom",
      icon: "zoom",
      text: `  Zoom:\n    Name: Iteration Planning\n    Date: 11/11/2019\n    Host: Steve Peak`
    },
    {
      title: "zoom",
      icon: "zoom",
      text: `  Zoom:\n    Name: Standup\n    Date: 11/11/2019\n    Host: Steve Peak`
    },
  ],
}

export default zoom
