import { IStorySample } from '&/StorySample'
import code from './counter.story'
import defaultCollaborators from './defaultCollaborators'

const counter: IStorySample = {
  id: 'counter',
  name: 'Website hit counter',
  services: [
    'redis',
    'http'
  ],
  code,
  collaborators: defaultCollaborators,
  description:
    'A simple web page hit counter application, showing the power of Storyscript for rapid prototyping using HTTP and Redis services.',
  image: 'counter-tweet.png',
  tips: [
    {
      name: 'welcome-to-storyscript',
      element: '#publish-btn',
      text:
        "This is Storyscript, the cloud-native programming language.\n\nLet's take a quick walk through the language features with this example building a simple counter application.",
      x: -20,
      y: 3
    },
    {
      name: 'storyscript-redis',
      element: '#editor',
      text:
        "Storyscript removes the need for you to care about infrastructure. When this story runs, the platform will create, configure and connect a Redis database so you don't have to!\n\nBy integrating with the Open Microservice Specification, a library of services become available on the Storyscript Hub.",
      x: 70,
      y: 0
    },
    {
      name: 'storyscript-oms',
      element: '#editor',
      text:
        'The Open Microservice Specification also allows Storyscript to strongly type interactions with microservices with IDE support.',
      x: 300,
      y: 0
    },
    {
      name: 'storyscript-http',
      element: '#editor',
      text:
        'Services in Storyscript can also be event driven.\n\nHere, an http server listens for events and the inner block is executed when a request is received.',
      x: 105,
      y: 16
    },
    {
      name: 'storyscript-publish',
      element: '#publish-btn',
      text:
        'How about we publish this story, and see what the platform can take care of for you?',
      x: 70,
      y: 3
    }
  ],
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie, I think that the redis increment action defaults to 1 for the by argument, so this may be redundant!'
  }, {
    author: 'Inkie',
    comment: "Thanks! I'll change it soon!"
  }],
  events: [
    {
      title: 'http',
      icon: 'http',
      text: '  Story:\n    count: 1\n\n  Request:\n    Headers:\n      Host: example.com\n      User-Agent: Mozilla'
    },
    {
      title: 'http',
      icon: 'http',
      text: '  Story:\n    count: 2\n\n  Request:\n    Headers:\n      Host: example.com\n      User-Agent: Mozilla'
    },
    {
      title: 'http',
      icon: 'http',
      text: '  Story:\n    count: 3\n\n  Request:\n    Headers:\n      Host: example.com\n      User-Agent: Mozilla'
    },
    {
      title: 'http',
      icon: 'http',
      text: '  Story:\n    count: 4\n\n  Request:\n    Headers:\n      Host: example.com\n      User-Agent: Mozilla'
    },
    {
      title: 'http',
      icon: 'http',
      text: '  Story:\n    count: 5\n\n  Request:\n    Headers:\n      Host: example.com\n      User-Agent: Mozilla'
    }
  ]
}

export default counter
