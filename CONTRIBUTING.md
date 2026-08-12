# Contributing

Fifty people are building an independent C3 package in this repository during the same week. The
conventions below exist so that fifty pull requests can be read without any of them colliding.

`main` is protected and nothing is merged during the week. Your pull request is reviewed and
graded while it is open.

## Branches

Work on a branch named for your GitHub handle:

```
week2/<your-github-handle>
```

Do not push to `main`, and do not create a second branch for the same work. One person, one
branch, one pull request, one package.

## What you push

Your scaffolded C3 package, committed as it comes out of the C3 MCP server and your own edits —
`src/`, `test/`, `seed/`, `react/`, and the package's `.c3pkg.json`. Do not commit `node_modules`,
build output, or the platform's generated `gen/` and `.vs-cache` directories; `.gitignore` already
excludes them.

## Before you open a pull request

Your package has to build and lint, and you have to have verified it against your own SNE — not
just read the code and assumed it works:

```
npm run build
npm run lint
```

Your assignment requires you to hit two specific failures on your own environment, predict each
one before you trigger it, and then fix it. Do that before you open the pull request, not after —
the verification section below is where it gets written down.

## Pull requests

Open one pull request from your branch into `main`. The template in
`.github/pull_request_template.md` is not optional; fill in every section, including both forced
failures. A pull request that describes only the finished state, with no mention that anything
failed along the way, will be sent back.

State what you verified and how, against your own environment. "Works" is not a verification;
"the assignee column showed identifiers until I added `include: 'this, assignee.this'`, confirmed
in the browser and with a Playwright check" is.
