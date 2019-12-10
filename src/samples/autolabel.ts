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
  image: 'autolabel-tweet.png',
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie! Storyscript argument names are optional if the variable being provided has the same name as the function argument so I think where we have `email:email` we can use just `:email` for simplicity.'
  }, {
    author: 'Inkie',
    comment: "Thanks! I'll change it soon!"
  }],
  events: [
    {
      title: 'gmail',
      icon: 'gmail',
      text: '  Email:\n    From:    steve@storyscript.io\n    Subject: Hello from Storyscript!\n\n  Classes:\n    - Not Spam\n    - Super Interesting\n    - Relevant To Your Interests'
    },
    {
      title: 'gmail',
      icon: 'gmail',
      text: '  Email:\n    From:    steve@storyscript.io\n    Subject: Interested in learning more?!\n'
    }
  ]
}

export default autolabel
