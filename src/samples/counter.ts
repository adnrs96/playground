import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  logs: '○ → story deploy\n' +
  'Compiling Stories…\n' +
  '✔ Compiled 1 story\n\n' +

  'Deploying app <app name>... ⠹\n' +
  '  ✔ Version 1 of your app has been queued for deployment.\n\n' +

  '  Waiting for deployment to complete…  ⠏\n' +
  '  ✔ Configured 1 story\n' +
  '  - counter.story\n' +
  '  ✔ Deployed 2 services\n' +
  '  - http\n' +
  '  - redis\n' +
  '  ✔ Created ingress route\n' +
  '  ✔ Configured logging\n' +
  '  ✔ Configured health checks\n' +
  '  ✔ Deployment successful!\n'
}

export default counter
