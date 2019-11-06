import { IStorySample } from '@/models/StorySample'
import code from './gfs.story'

const GoodFirstIssue: IStorySample = {
  name: 'gfs',
  services: [
    'github',
    'twitter'
  ],
  stories: ['good-first-issue'],
  code,
  description: 'A bot using github and twitter services to tweet about issues tagged "good first issue" inside attached repositories.',
  tips: []
}

export default GoodFirstIssue
