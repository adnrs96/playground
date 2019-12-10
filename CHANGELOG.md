# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/storyscript/studio/compare/v0.4.0...v0.5.0) (2019-12-10)


### Features

* **archi:** remove k8s and story tiles + col displaying ([a5dd103](https://github.com/storyscript/studio/commit/a5dd1037e47f7cc88adc7f4a1724640e53ccac74))
* **Feedback:** add modal to collect user feedback. ([ddd0db2](https://github.com/storyscript/studio/commit/ddd0db231a50d11d48380ff9744b9336e9f524fb))
* **help-drop:** update design ([b569ffd](https://github.com/storyscript/studio/commit/b569ffd1940e4c374c1b702ae846937813e09130))
* **help-dropdown:** add component + adapt tips/intercom/icons ([9aa16d3](https://github.com/storyscript/studio/commit/9aa16d3e6b4a3a7b45d4bee7653ba8648ad705dd))
* **navbar:** add navbar design ([cdbc729](https://github.com/storyscript/studio/commit/cdbc729aaf13cd3b62f2271d1eeb7d3d7ac62e9e))
* **navbar:** move navbar into studio views + put back previous on welcome + improve share button ([b78fa8f](https://github.com/storyscript/studio/commit/b78fa8fc57333797cf4354341cb9ad3961061054))
* **navbar:** put story title in navbar ([723475c](https://github.com/storyscript/studio/commit/723475ceddbfd6b65cc15006be6cda4f3e48c652))
* **NewFromTemplate:** add modal for recording emails of people interested. ([24a3746](https://github.com/storyscript/studio/commit/24a374623d355040426c6ab1c28f3d9bbb43400e))
* **NewFromTemplate:** add modal for recording emails of people interested. ([0839adf](https://github.com/storyscript/studio/commit/0839adf0ba0bc439849d8c43adfa546f9c728107))
* **persistence:** add vuex-persistedstate and Tips persistent store module ([0ac43ef](https://github.com/storyscript/studio/commit/0ac43ef96128d5c8da0c75a3bdda537774699db2))
* **pwa:** add cache strategy for fetch POST methods ([c978c9e](https://github.com/storyscript/studio/commit/c978c9ef17eeb67978e77ebc67595a58f2073196))
* **remove-labels:** remove studio view labels ([060a45f](https://github.com/storyscript/studio/commit/060a45f566d856a728ef5f94c3d1996bcefdda5e))
* **SelectPills:** add new input component using pills. ([a00f942](https://github.com/storyscript/studio/commit/a00f942deb78660714e2c51f3ba6bd22f15997df))
* **share:** add share btn + copy to clipboard ([294e087](https://github.com/storyscript/studio/commit/294e087e79735e38ead5751b434f851d7d9d9d46))
* **story-titles:** update IStorySample + stories and welcome view ([029d25d](https://github.com/storyscript/studio/commit/029d25d22f9645caabdb323bdebe804c51df5ff3))
* **tips:** update intro component to optional relative component base + add editor id + counter repositions ([18cd24d](https://github.com/storyscript/studio/commit/18cd24d7a6944fc8af99cc7938af4b4792435613))
* **tips-persistence:** bring isIntro & skip from Tips store ([e58df3e](https://github.com/storyscript/studio/commit/e58df3e37b61aefd974aca955ddd08e92faf0b66))
* **Toolbar:** add toolbar to studio. ([c4dde8c](https://github.com/storyscript/studio/commit/c4dde8cc95b1dd7a2e2e250bc0cc8af1c94fc912))


### Bug Fixes

* **build:** revert vue test utils update ([1297621](https://github.com/storyscript/studio/commit/1297621ea3e1a120b741b3cd08436994f2a730eb))
* **cache:** try to remove cache from fetch request ([259af5e](https://github.com/storyscript/studio/commit/259af5e765b692963b600d60f838ca08787b71c3))
* **deps:** update dependency core-js to v3.4.7 ([ed4a69f](https://github.com/storyscript/studio/commit/ed4a69f3d81f1dc003e9cbde7c8ac288765af1b4))
* **e2e:** remove fullscreen e2e tests ([687c0be](https://github.com/storyscript/studio/commit/687c0be0b723b9fb614970e1e51ba32c0357fd11))
* **e2e+input:** fix e2e tests + input behavior ([2b4e46c](https://github.com/storyscript/studio/commit/2b4e46c0e0ecf6282031e2081253abcba544a95d))
* **help-drop:** white text on dropdown ([8360331](https://github.com/storyscript/studio/commit/83603311eaec89e97807e5c6604de13552aaf6fb))
* **intro:** remove await from watcher + default element string to body on querySelector ([4fd447d](https://github.com/storyscript/studio/commit/4fd447d40cfb6d2c7aea5be46ca2f9be6330eb45))
* **jest:** remove useless collectCoverage file ([225c81a](https://github.com/storyscript/studio/commit/225c81a73d6f9fa938ee0ced2d69a3c15b384f33))
* **navbar:** fix new from template button style ([b49589a](https://github.com/storyscript/studio/commit/b49589acc057d1156f00066449846d933ee42c0a))
* **routing:** fix issue when redirecting to /welcome ([f4dc15f](https://github.com/storyscript/studio/commit/f4dc15fd8c98b1ba3e03ee58d89aacf8c3dcddc0))
* **share:** disable auto-close modal ([3aba5a4](https://github.com/storyscript/studio/commit/3aba5a4f2cb06d4f352676c3e5d57072cfc3151c))

## [0.4.0](https://github.com/storyscript/studio/compare/v0.3.1...v0.4.0) (2019-11-20)


### Features

* add deepspeech icon and update the zoom example ([6e00415](https://github.com/storyscript/studio/commit/6e0041581c6acc72aee07c57af66d3ee07725d59))
* **events:** remove bubble before diagram goes healthy ([d294b5e](https://github.com/storyscript/studio/commit/d294b5e710f4bc2763feba373cf12b6453ec54fa))


### Bug Fixes

* fix lint issue ([acd74c7](https://github.com/storyscript/studio/commit/acd74c72f9aa07c7221e24f892bbfae52048091f))
* **archi:** fix typo when refactored ([72ec6b7](https://github.com/storyscript/studio/commit/72ec6b73fa20879bc3fdef173e0cec5b22793c0c))
* **events:** fix naming issue ([f409907](https://github.com/storyscript/studio/commit/f4099073948205cb1e59f87c307df231b5bd1f45))
* **events:** fix remaning naming issue ([0d81d9c](https://github.com/storyscript/studio/commit/0d81d9c94a99f34b4914d5b825329c731a8a8ec9))
* **navbar:** fix navbar routing issue ([39669fc](https://github.com/storyscript/studio/commit/39669fcda20bc6b58d628d94c79af37cdfedef00))

### [0.3.1](https://github.com/storyscript/studio/compare/v0.3.0...v0.3.1) (2019-11-14)

## [0.3.0](https://github.com/storyscript/studio/compare/v0.2.0...v0.3.0) (2019-11-13)


### Features

* **samples:** add comments and events for zoom ([8c63123](https://github.com/storyscript/studio/commit/8c631230e5c11ab807287cb33dc47ea71057be26))
* **samples:** add events and comments for stripe ([8ddf5e9](https://github.com/storyscript/studio/commit/8ddf5e9def7cb8cc8f3aa8019e09b5b1ee31fe4f))
* **samples:** add events to autolabel example ([1eef5df](https://github.com/storyscript/studio/commit/1eef5dfcaf53c929e9b5159529564638c5440915))
* **welcome:** match descriptions to landing page ([c8ddc5c](https://github.com/storyscript/studio/commit/c8ddc5cd6d21955e98373f2d03f1b01b7d3ebc38))


### Bug Fixes

* **publish:** fix publish issue ([da472ec](https://github.com/storyscript/studio/commit/da472ec37c7d18c45950c412f789a9c25e07c8ca))
* **unit:** fix unit testing ([4d60777](https://github.com/storyscript/studio/commit/4d607770129dafc25ab1d4eb1ce0a3115bd2cf03))

## [0.2.0](https://github.com/storyscript/studio/compare/v0.1.0...v0.2.0) (2019-11-13)


### Features

* **Architecture:** make services healthy faster ([f65c6c7](https://github.com/storyscript/studio/commit/f65c6c776ba942d6031baedc2876ba5fafbf4eae))
* **editor:** add fullscreen behavior ([d53be8b](https://github.com/storyscript/studio/commit/d53be8b2b8d2619c6fca2cca28c05da3870b93fc))
* **editor:** set sane defaults ([a793974](https://github.com/storyscript/studio/commit/a7939742ebcd67d506ad79ce36b301b57db5c2f2))
* **nav:** add button to see more examples ([7a74886](https://github.com/storyscript/studio/commit/7a748863e107b3144427511b4741957c99bfb222))
* **samples:** add autolabel comments ([bf6075e](https://github.com/storyscript/studio/commit/bf6075e86e6c8271faca901946aee5f52a385a52))
* **samples:** add gmail autolabel sample ([31d4a27](https://github.com/storyscript/studio/commit/31d4a27b9892a59f2c2ee7d6a251f21e7fc56740))
* **samples:** add stripe cancellation sample ([14da4cd](https://github.com/storyscript/studio/commit/14da4cd81913d326eba6f15431c92f7ba40eebea))
* **samples:** add zoom and stripe examples ([df7ce26](https://github.com/storyscript/studio/commit/df7ce26c5e0f9e78a132543539d4abb660bb3c5a))
* **welcome:** remove unattributed images ([09264aa](https://github.com/storyscript/studio/commit/09264aae9364d8339d0ec84dea096430f9333070))


### Bug Fixes

* **deps:** update dependency core-js to v3.4.1 ([6597074](https://github.com/storyscript/studio/commit/659707477f5236b3dbe846d0bfcce5eb2790df74))
* **deps:** update dependency vuex to v3.1.2 ([ea2b823](https://github.com/storyscript/studio/commit/ea2b823a4c07a113d472b80682bbf0cd2a66301d))
* **events:** fix events ([3cad058](https://github.com/storyscript/studio/commit/3cad05859a56f7cac4459574bdd3e5c2bd70b1a3))
* **publish:** fix issue where the publish event are carried over the other examples ([7ddcd8e](https://github.com/storyscript/studio/commit/7ddcd8e9acba2f4a3567e4029c321b34a16b560a))
* **safari:** fix issue on safari ([4119f20](https://github.com/storyscript/studio/commit/4119f207944da13499ef27638c804cb86ba0a1bf))
* fix a lot of small issues ([319a1ad](https://github.com/storyscript/studio/commit/319a1ad1a565f286effd013f96da32bfb0648cf0))
* **safari:** fix safari issue ([2779c09](https://github.com/storyscript/studio/commit/2779c09be009ceb336a1101af0bffb24122a1ae2))
* resolve merge conflicts ([e7b6467](https://github.com/storyscript/studio/commit/e7b646781146875d05164b82157f74e963d478ca))

## [0.1.0](https://github.com/storyscript/studio/compare/v0.0.2...v0.1.0) (2019-11-11)


### Features

* **archi:** add staged state to archi diagram service cards ([028530c](https://github.com/storyscript/studio/commit/028530c5e7990393a2bf84eacceabcbf3539a70f))
* **collaborators:** add inkie friends collaborators in the navbar ([8131844](https://github.com/storyscript/studio/commit/813184432064143e299ba313bd51476c5260ce1e))
* **collaborators:** animated the collaborators on hover ([eca5a46](https://github.com/storyscript/studio/commit/eca5a4651916e7a09b7f431a36561770832b1b0e))
* **comments+tabs:** add tabs and comments components with tests ([1912c69](https://github.com/storyscript/studio/commit/1912c6984707881af476b7defbece804819607c9))
* **comments+tabs:** add tabs and comments components with tests ([592c79c](https://github.com/storyscript/studio/commit/592c79c4da18e6e56ee4cb0e71da2cc16edabe3f))
* **events:** add event bubbles ([1fa93cd](https://github.com/storyscript/studio/commit/1fa93cd081e541f252c9e46d667216c3551b38ea))
* **tips:** move first tip on the right of the demo tag ([7a23049](https://github.com/storyscript/studio/commit/7a23049fc37c9e414f62925175c161250957c67b))
* **welcome:** add image to welcome page card ([b9629d5](https://github.com/storyscript/studio/commit/b9629d52bb083f1e2e27b748f0987aaf1ad0121a))


### Bug Fixes

* **collaborators:** fix issue where the collaborators are not loaded when coming from w-page ([f427f0d](https://github.com/storyscript/studio/commit/f427f0de57273fb9a23c913f54cf7f9526821007))

### 0.0.2 (2019-11-06)


### Features

* **archi:** incrementally displaying services on deploy ([595c7d3](https://github.com/storyscript/playground/commit/595c7d3ab2d6c53f13a152b623d6ad30db6af100))
* **architecture:** add architecture diagram ([3668bf1](https://github.com/storyscript/playground/commit/3668bf146abc442f693aa17fc4bbeab3249bdee0))
* **autocomplete:** fix input prop + add to login form ([9b3c319](https://github.com/storyscript/playground/commit/9b3c319afb582358062ba942c8762fbb202745b9))
* **components:** add button and footer components ([35380b3](https://github.com/storyscript/playground/commit/35380b3395e1912187ad34786b34ea46523d913a))
* **editor:** add monaco editor ([b1e37a2](https://github.com/storyscript/playground/commit/b1e37a26708be67b17080698484176009a7355bf))
* **editor:** put editor auto-resizable and in the playground vue ([ffdbdce](https://github.com/storyscript/playground/commit/ffdbdcebcb0bdb4d7705c2660dc5e07614b2b946))
* **functions:** add submission-created function ([e88224a](https://github.com/storyscript/playground/commit/e88224a2caff30a192259092d64029bc52e578d7))
* **GitHubActions:** allow example stories to optionally be tested for successful compilation ([9a1f18a](https://github.com/storyscript/playground/commit/9a1f18a78a95071d8953e07b7d7a6a20c986514f))
* **intercom:** add intercom plugin + boot in Playground component ([78e03f9](https://github.com/storyscript/playground/commit/78e03f96af75fc94eb06430725376379c0c7bc86))
* **intro:** add intro component and tips array to the counter ([8652136](https://github.com/storyscript/playground/commit/865213685f8a98ce792612386f3072ac1fd87186))
* **login:** add login button + form ([a3f005b](https://github.com/storyscript/playground/commit/a3f005bec0a5e79db3c5bf1bc62e4cfc5a6b5387))
* **login:** make modal disappear after 2s and Thanks button ([1724236](https://github.com/storyscript/playground/commit/17242366cfc9efaf96a6a518fafb5a4668dd59ed))
* **login:** make modal disappear after 2s and Thanks button ([3854a0a](https://github.com/storyscript/playground/commit/3854a0a7a63784e73c2e29f6af3ccb117f86836f))
* **logs:** add logs component + tests ([94170bc](https://github.com/storyscript/playground/commit/94170bc4d158156f7261e81ba1689373b6421d7c))
* **logs:** add step by step logs faker + deploy btn ([37165f2](https://github.com/storyscript/playground/commit/37165f2bb15af53185c178ed97233739c0aed990))
* **new-from-scratch:** add new button in navbar ([a4f521e](https://github.com/storyscript/playground/commit/a4f521e2e3b7e302a248bcc7f676112a6df4d181))
* **playground:** add playground query to skip intro ([6caee02](https://github.com/storyscript/playground/commit/6caee024a0bd441f3ed9c7edc791d4267736a880))
* **samples:** add new ephermal file sharing example ([ae4a3ac](https://github.com/storyscript/playground/commit/ae4a3ac6959eb7af5ad84d1e7a11a8e40e547461))
* **sentry:** add sentry env variable to docker config ([2a35df5](https://github.com/storyscript/playground/commit/2a35df5fcc45e049637e380a7dab9dec7f1eba22))
* **skip-tips+tests:** auto-show first tip + skip button + improve tests ([8c52d6e](https://github.com/storyscript/playground/commit/8c52d6e5f009ae39544e7a720330e01aa9446272))
* **webpack:** allow loading raw files via raw-loader ([3d6a4c7](https://github.com/storyscript/playground/commit/3d6a4c77ff222d5140c7182360680f8a82384847))
* **welcome:** add first version of the welcome page ([c7d5c14](https://github.com/storyscript/playground/commit/c7d5c14d053a00ebe983437863ba9b8c985121b1))


### Bug Fixes

* **archi:** fix purge issue ([5d7d50f](https://github.com/storyscript/playground/commit/5d7d50f0690c9ff32794c332459e2c8fe0c9a126))
* **archi:** fix size issue ([b8f766b](https://github.com/storyscript/playground/commit/b8f766bd417fcec93df4728554d675680abd3f56))
* **ci:** fix typo in config ([7dbdd8f](https://github.com/storyscript/playground/commit/7dbdd8fcda93672bd0e64b44cf531faa0600e3a3))
* **deps:** update dependency core-js to v3.3.3 ([5ac8c5b](https://github.com/storyscript/playground/commit/5ac8c5b21ca80e87cbeea7819c012d0f02a5ad29))
* **deps:** update dependency core-js to v3.3.4 ([bc676de](https://github.com/storyscript/playground/commit/bc676def3d4bda606283a0f3fb361c8fbd2bbbcd))
* **deps:** update dependency core-js to v3.3.5 ([cac09ff](https://github.com/storyscript/playground/commit/cac09ff0f1538d1140c645e829da458f94ffc973))
* **deps:** update dependency core-js to v3.3.6 ([194702b](https://github.com/storyscript/playground/commit/194702b6df723ef6365366eec7cf288b5a67db61))
* **functions:** fix function submission-create ([180a955](https://github.com/storyscript/playground/commit/180a955d0c2349254cc343a2335dbcbc5b48064b))
* **functions:** fix submission-create function ([984619c](https://github.com/storyscript/playground/commit/984619cdf0c84254cbc116b816c696463498268c))
* **functions:** fix typo ([aa48db2](https://github.com/storyscript/playground/commit/aa48db2db38f347688b6ee9d2b10ca3693eb89d0))
* **functions:** removed last occurences of TS ([e7fae59](https://github.com/storyscript/playground/commit/e7fae5997b2e4d96042388b69f75bee68e7a40b7))
* **intro:** larger width, skipIntro actually works and prevent arrow purge ([be56f54](https://github.com/storyscript/playground/commit/be56f54325c9349fc9e0b341ec215c5c04123451))
* **login:** fix dependency issue ([f6c3993](https://github.com/storyscript/playground/commit/f6c3993c8b4b815305a4081acc94c1ed23d394dc))
* **login:** fix login form ([1a39a90](https://github.com/storyscript/playground/commit/1a39a90969510018ed1c7acdae8eb94596626e75))
* **login:** fix login submit method ([2d9edf4](https://github.com/storyscript/playground/commit/2d9edf40b074f6ef78e872f2699b09dc2b996866))
* fix build post merge ([20221e0](https://github.com/storyscript/playground/commit/20221e072fbacf3b54dfc8811d00302413950edc))
* **login:** fix validation error after 1 email sent ([9a61bf9](https://github.com/storyscript/playground/commit/9a61bf91180064db4c2d0bd2745e0753fe9a8bbf))
* **logs:** fix issue where logs displayed services in the files section ([5470219](https://github.com/storyscript/playground/commit/5470219c09357674c5f20f36e6f84e6ccd60f5f0))
* **logs:** fix logs release counter starting value ([9669104](https://github.com/storyscript/playground/commit/9669104f1b673e8bf13e1e608c376437b2abbbb7))
* **logs:** fix merge conflicts ([60c0f6f](https://github.com/storyscript/playground/commit/60c0f6f87325549dafbb4e770ba7032f522fac0b))
* **navbar:** fix merge issue where all the buttons trigger a deploy ([5801c14](https://github.com/storyscript/playground/commit/5801c1431aac535443df6868d1088241284bb764))
* **netlify:** remove force redirection on netlify.toml ([a98d148](https://github.com/storyscript/playground/commit/a98d14813254f3e05e2511172c709a43efa5f310))
* **pwa:** add notification to update pwa -- should fix pwa cache update ([4854679](https://github.com/storyscript/playground/commit/48546798a9797a0a8569435406e71b0a101d3255))
* **samples:** reduce counter indentation back to 2 spaces ([94f56f8](https://github.com/storyscript/playground/commit/94f56f82ed174ff08c548b8c65e1370a2ac1e39a))
* **sentry:** update target bundle file path ([c7e72c2](https://github.com/storyscript/playground/commit/c7e72c2c26182603bc7c47b5477d2de8ab2c974b))
* **tip:** fix tip issue in the navbar ([697df92](https://github.com/storyscript/playground/commit/697df921fea10a6f68da0ef3845f146515c198a9))
* **unit:** use jest-raw-loader to transform raw stories for unit-testing ([36151f8](https://github.com/storyscript/playground/commit/36151f8da92dcb78b55a38b50b63a571df9492ba))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
