import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  logs: {
    cmd: 'story deploy',
    name: 'counter',
    files: [
      'counter'
    ],
    services: [
      'http',
      'redis'
    ]
  },
  code: 'redis set key: "count" value: 0\nwhen http server listen path: "/count" as req\n  count = (redis get key: "count").result + 1\n  redis set key: "count" value: count\n  req write content: "This page has been loaded {count} times"'
}

export default counter
