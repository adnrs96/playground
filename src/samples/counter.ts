import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  name: 'counter',
  logs: {
    files: [
      'counter'
    ],
    services: [
      'http',
      'redis'
    ]
  },
  code: `redis set key:"count" value:0\nwhen http server listen path:"/counter" as request\n  count = redis increment key:"count" by:1\n  request write content:"This page has been visited {count} times"`,
  description: 'A simple web page hit counter application, showing the power of Storyscript for rapid prototyping using the http and redis services.'
}

export default counter
