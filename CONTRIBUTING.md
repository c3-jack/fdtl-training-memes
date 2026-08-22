# Contributing

Fifty people are working against the same `fdtlMemeMaker` package during the same week: the same
bug, plus the same two features. The conventions below exist so that fifty pull requests can be
read without any of them colliding.

`main` is protected by convention and nothing is merged during the week. Your pull request is
reviewed and graded while it is open.

## Branches

Work on a branch named for your GitHub handle:

```
week2/<your-github-handle>
```

Do not push to `main`, and do not create a second branch for the same work. One person, one
branch, one pull request, the bug plus both features.

## The bug and the features

`W2-1` (the bug) and Features A and B, all mandatory for everyone, are printed in full in your
assignment handout. It is the source of truth for what was asked; nothing here or in a Teams
message overrides it. Build the bug and both features, nothing else. If you notice a problem
outside those three while you're in there, note it in your write-up and move on; it's not this
week's assignment.

## Before you open a pull request

Reproduce the bug and each feature in the static console first, before you change anything, and
confirm it does the wrong thing or doesn't exist yet. Then fix or build it, write a test, and
verify again. The recording only needs the working end state — the before-and-after belongs in
the pull request's verification section, in writing.

For each feature, the role grant goes in the **same** commit as the method. A grant added
afterward, once somebody notices it's missing, is the exact failure these features exist to teach
you to avoid.

## Pull requests

Open one pull request from your branch into `main`, covering the bug and both features. The
template in `.github/pull_request_template.md` is not optional; fill in every section, including
what was broken or missing before your fix.

State what you verified and how, against your own environment. "Works" is not a verification;
"`frontPageMemes` returned a bare author id until I added `include: 'this, author.this'`,
confirmed in the static console and by a test that checks every returned meme" is.
