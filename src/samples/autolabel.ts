import { IStorySample } from '@/models/StorySample'
import code from './autolabel.story'
import defaultCollaborators from './defaultCollaborators'

const autolabel: IStorySample = {
  name: 'autolabel',
  services: [
    'gmail',
    'machinebox',
    'redis'
  ],
  stories: ['autolabel'],
  code,
  collaborators: defaultCollaborators,
  description:
    'Train a machine learning model to predict and apply labels to a gmail inbox using the gmail, machinebox, and redis services.',
  image: 'autolabel-tweet.png'
}

export default autolabel
