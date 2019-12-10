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
  tips: [],
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie, can you explain what the psql service is?'
  }, {
    author: 'Inkie',
    comment: "Totally Sharkie! psql is referencing Postgres, the database we're using to store customer information."
  }],
  events: [
    {
      title: 'stripe',
      icon: 'stripe',
      text: '  Stripe:\n    Email: steve@storyscript.io\n    Plan:  Gold\n'
    },
    {
      title: 'stripe',
      icon: 'stripe',
      text: '  Stripe:\n    Email: jean@storyscript.io\n    Plan:  Silver\n'
    }
  ]
}

export default stripe
