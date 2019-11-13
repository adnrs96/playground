import { IStorySample } from '@/models/StorySample'
import code from './stripe.story'
import defaultCollaborators from './defaultCollaborators'

const stripe: IStorySample = {
  name: 'stripe',
  services: [
    'stripe',
    'postgres',
    'mailgun',
  ],
  stories: ['stripe'],
  code,
  collaborators: defaultCollaborators,
  description:
    'Inform customers that their subscriptions have been cancelled upon stripe payment failure, using the stripe, postgres and mailgun services.',
  tips: [],
  comments: []
}

export default stripe
