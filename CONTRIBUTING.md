# Contributing

Fifty people are working against the same `fdtlMemeMaker` package during the same week, on the
same three tickets. The conventions below exist so that fifty pull requests can be read without
any of them colliding.

`main` is protected by convention and nothing is merged during the week. Your pull request is
reviewed and graded while it is open.

## Branches

Work on a branch named for your GitHub handle:

```
week2/<your-github-handle>
```

Do not push to `main`, and do not create a second branch for the same work. One person, one
branch, one pull request, all three tickets.

## Your tickets

All three tickets — `W2-1`, `W2-2`, `W2-3` — filed as GitHub issues against this repository, are
yours. Build all three and nothing else. If you notice a problem outside these three while
you're in there, note it in your write-up and move on; it's not this week's assignment.

## Before you open a pull request

Reproduce each ticket in the static console first, before you change anything, and confirm it
does the wrong thing. Then fix or build it, write a test, and verify again.

For `W2-2` and `W2-3`, the role grant goes in the **same** commit as the method. A grant added
afterward, once somebody notices it's missing, is the exact failure these tickets exist to teach
you to avoid.

## Pull requests

Open one pull request from your branch into `main`, covering all three tickets. The template in
`.github/pull_request_template.md` is not optional; fill in every section, including what failed
before your fix.

State what you verified and how, against your own environment. "Works" is not a verification;
"`frontPageMemes` returned a bare author id until I added `include: 'this, author.this'`,
confirmed in the static console and by a test that checks every returned meme" is.
