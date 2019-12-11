import { IStorySample } from '&/StorySample'
import code from './autolabel.story'
import defaultCollaborators from './defaultCollaborators'

const autolabel: IStorySample = {
  id: 'autolabel',
  name: 'Gmail auto-labeling',
  services: [
    'gmail',
    'machinebox',
    'redis'
  ],
  code,
  collaborators: defaultCollaborators,
  description:
    'Train a machine learning model to predict and apply labels to a Gmail inbox using Gmail, Machine Box, and Redis services.',
  image: 'autolabel-tweet.png'
}

export default autolabel
