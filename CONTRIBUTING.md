## Contributing

### Maintainers

@JeanBarriere @matthewhudson @Arinono

---

When contributing to this repository, please first discuss the change you wish to make via issue with the owners of this repository before making a change.

### Commit guidelines

Please respect the `<type>(<scope>): <title>` commit message format. If you are not sure, you can run `yarn commit`. This command will spawn the [commitizen tool](https://github.com/commitizen/cz-cli), helping you keeping a good commit format.

List of `types`:

- feat
- fix
- chore
- refactor
- test
- style
- test
- ...

### Pull Request Process

1. Create a Pull Request against the `dev` branch with your modifications. This PR shall contain a link to the issue you're closing.
2. Once the CI is done, you can check your work with the Netlify preview.
3. If you are pleased with all your changes, you can now request a review from one of the owners.

Be careful, a PR can be merged only if **ALL** the required CI jobs are green. Which means the project is:

- building properly
- is written respecting the linting rules
- passes all the unit tests, and covers 100% of the code base

Since we cannot run the E2E test in CI yet; any maintainer can decide to run the tests suites manually and decide if the PR is ready for review.

You can still run them yourself before commiting using `yarn test:integration-local`.
