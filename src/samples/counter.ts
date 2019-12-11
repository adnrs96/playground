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
      element: '#toolbar-ss-logo',
      text:
        "This is Storyscript, the cloud-native programming language.\n\nLet's take a quick walk through the language features with this example building a simple counter application.",
      x: 240,
      y: 5
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
    }
  ]
}

export default counter
