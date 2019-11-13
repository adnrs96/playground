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
  image: 'autolabel-tweet.png',
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie! Storyscript argument names are optional if the variable being provided has the same name as the function argument so I think where we have `email:email` we can use just `:email` for simplicity.'
  }, {
    author: 'Inkie',
    comment: "Thanks! I'll change it soon!"
  }]
}

export default autolabel
