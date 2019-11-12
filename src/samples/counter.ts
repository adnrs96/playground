import { IStorySample } from '@/models/StorySample'
import code from './counter.story'
import defaultCollaborators from './defaultCollaborators'

const event: Function = (count: number) => {
  return `  Story:\n    count: ${count}\n\n  Request:\n    Headers:\n      Host: example.com\n      User-Agent: Mozilla`
}

const counter: IStorySample = {
  name: 'counter',
  services: [
    'redis',
    'http'
  ],
  stories: ['counter'],
  code,
  collaborators: defaultCollaborators,
  description:
    'A simple web page hit counter application, showing the power of Storyscript for rapid prototyping using the http and redis services.',
  image: 'counter-tweet.png',
  event,
  tips: [
    {
      name: 'welcome-to-storyscript',
      text:
        "This is Storyscript, the cloud-native programming language.\n\nLet's take a quick walk through the language features with this example building a simple counter application.",
      x: 375,
      y: 76
    },
    {
      name: 'storyscript-redis',
      text:
        "Storyscript removes the need for you to care about infrastructure. When this story runs, the platform will create, configure and connect a Redis database so you don't have to!\n\nBy integrating with the Open Microservice Specification, a library of services become available on the Storyscript Hub.",
      x: 90,
      y: 118
    },
    {
      name: 'storyscript-oms',
      text:
        'The Open Microservice Specification also allows Storyscript to strongly type interactions with microservices with IDE support.',
      x: 372,
      y: 118
    },
    {
      name: 'storyscript-http',
      text:
        'Services in Storyscript can also be event driven.\n\nHere, an http server listens for events and the inner block is executed when a request is received.',
      x: 133,
      y: 140
    },
    {
      name: 'storyscript-publish',
      text:
        'How about we publish this story, and see what the platform takes care of for you?',
      x: 304,
      y: 20
    }
  ],
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie, I think that the redis increment action defaults to 1 for the by argument, so this may be redundant!'
  }, {
    author: 'Inkie',
    comment: "Thanks! I'll change it soon!"
  }]
}

export default counter
