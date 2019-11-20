[![Netlify Status](https://api.netlify.com/api/v1/badges/aeaf8eec-bc04-429f-95be-85fefcefe938/deploy-status)](https://app.netlify.com/sites/studio-storyscript/deploys) [![codecov](https://codecov.io/gh/storyscript/studio/branch/master/graph/badge.svg)](https://codecov.io/gh/storyscript/studio) [![Lighthouse](./.lighthouse-badges/lighthouse.svg)](https://studio.storyscript.io) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Storyscript/studio) [![Contributor Covenant](https://camo.githubusercontent.com/8315e511f8eb4651470540d6951fd05099251fc5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f6e7472696275746f72253230436f76656e616e742d76312e3425323061646f707465642d6666363962342e737667)](https://github.com/storyscript/.github/blob/master/CODE_OF_CONDUCT.md)



<div>
    <p align="center"><img src="https://user-images.githubusercontent.com/2041757/68865115-19c70580-06a7-11ea-955a-1c769960b366.png" width="450"></p>
    <h3 align="center">Code that connects without plumbing.</h3>
    <p align="center">The <b>open source</b> cloud-native studio for<br>creating powerful mini-apps and workflows.</p>
     <p align="center"><img src="https://user-images.githubusercontent.com/2041757/68868902-2ea69780-06ad-11ea-987b-61edf3d3337b.png" width="650"></p>
</div>

<h3 align="center">Learn more at <a href="https://storyscript.io">https://storyscript.io</a></h3>


<hr>
<blockquote align="center">Developer Documentation</blockquote>
<hr>


## Project commands

```bash
# Install dependencies
$> yarn install

# Start a dev server with HMR
$> yarn serve

# Build for production
$> yarn build

# Run unit tests with coverage
$> yarn test:unit

# Run integration tests without browser
$> yarn test:integration-headless

# Run integration tests with browser
$> yarn test:integration

# Commit using commitizen
$> yarn commit

# Bump version and generates CHANGELOG.md
$> yarn release

# Generates badges for lighthouse rating
$> yarn pwa-audit

# Run integration with Percy report
$> yarn percy

# Starts only the studio, made mostly for integrations tests
$> yarn stack:studio
```

## Lighthouse Score

[![Lighthouse](./.lighthouse-badges/lighthouse-logo.svg)](https://github.com/GoogleChrome/lighthouse)

[![Lighthouse Accessibility Badge](./.lighthouse-badges/lighthouse_accessibility.svg)](https://studio.storyscript.io)
[![Lighthouse Best Practices Badge](./.lighthouse-badges/lighthouse_best-practices.svg)](https://studio.storyscript.io)
[![Lighthouse Performance Badge](./.lighthouse-badges/lighthouse_performance.svg)](https://studio.storyscript.io)
[![Lighthouse PWA Badge](./.lighthouse-badges/lighthouse_pwa.svg)](https://studio.storyscript.io)
[![Lighthouse SEO Badge](./.lighthouse-badges/lighthouse_seo.svg)](https://studio.storyscript.io)
