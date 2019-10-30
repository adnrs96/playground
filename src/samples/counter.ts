import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  logs: {
    name: 'counter',
    files: [
      'counter'
    ],
    services: [
      'http',
      'redis'
    ]
  },
  code: `redis set key:"count" value:0\nwhen http server listen path:"/counter" as request\n  count = redis increment key:"count" by:1\n  request write content:"This page has been visited {count} times"`
}

export default counter
