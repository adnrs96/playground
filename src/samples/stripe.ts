import { IStorySample } from '&/StorySample'
import code from './stripe.story'
import defaultCollaborators from './defaultCollaborators'

const stripe: IStorySample = {
  id: 'stripe',
  name: 'Stripe plan ended',
  services: [
    'stripe',
    'postgres',
    'mailgun'
  ],
  code,
  collaborators: defaultCollaborators,
  description:
    'Inform customers that their subscriptions have been cancelled upon payment failure, using Stripe, Postgres and Mailgun services.',
  tips: []
}

export default stripe
