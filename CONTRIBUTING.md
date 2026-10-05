# Contributing

The whole cohort is working against the same `fdtlMemeMaker` package during the same week: the
same bug, plus the same two features. The conventions below exist so that every pull request can
be read without any of them colliding.

Nothing is merged to `main` during the week. Your pull request is
reviewed and graded while it is open.

## Branches

Work on a branch named for your GitHub handle:

```
week2/<your-github-handle>
```

Do not push to `main`, and do not create a second branch for the same work. One person, one
branch, one pull request, all three tickets. If you can't push a branch here, fork the repository
and open the pull request from your fork.

## The bug and the features

`W2-1` (the bug), `W2-2` and `W2-3` (the two features), all mandatory for everyone, are printed
in full in your assignment handout. It is the source of truth for what was asked; nothing here or
in a Teams message overrides it. Do those three, nothing else. If you notice a problem outside
them while you're in there, note it in the pull request's Not verified section and move on; it's
not this week's assignment.

## Before you open a pull request

Reproduce the bug and each feature in the static console first, before you change anything, and
confirm it does the wrong thing or doesn't exist yet. Then fix or build it, write a test, and
verify again. The before-and-after belongs in the pull request, in writing.

For each feature, the role grant goes in the **same** commit as the method. A grant added
afterward, once somebody notices it's missing, is the exact failure these features exist to teach
you to avoid.

## Pull requests

Open one pull request from your branch into `main`, covering the bug and both features. The
template in `.github/pull_request_template.md` is not optional; fill in every section, including
what was broken or missing before your fix.

State what you verified and how, against your own environment, and name the environment.
"Works" is not a verification; a sentence saying what the call returned before, what it returns
now, and which test checks it is.
