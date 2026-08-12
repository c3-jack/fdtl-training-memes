# Contributing

Fifty people are working against the same `fdtlHelpdesk` package during the same week, each on a
different ticket. The conventions below exist so that fifty pull requests can be read without
any of them colliding.

`main` is protected by convention and nothing is merged during the week. Your pull request is
reviewed and graded while it is open.

## Branches

Work on a branch named for your GitHub handle:

```
week2/<your-github-handle>
```

Do not push to `main`, and do not create a second branch for the same work. One person, one
branch, one pull request, one ticket.

## Your ticket

You are assigned exactly one of two tickets, filed as GitHub issues against this repository —
either a bug (`W2-1`) or a feature (`W2-2`). Fix or build yours and nothing else. If you notice
the other ticket's problem while you're in there, open an issue describing it and move on; it's
somebody else's assignment this week.

## Before you open a pull request

Reproduce your ticket in the static console first, before you change anything, and predict what
you'll see before you run it. Then fix or build it, write a test, and verify again — predicted
first, on the way out too.

If your ticket is `W2-2`, the role grant goes in the **same** commit as the method. A grant added
afterward, once somebody notices it's missing, is the exact failure this ticket exists to teach
you to avoid.

## Pull requests

Open one pull request from your branch into `main`. The template in
`.github/pull_request_template.md` is not optional; fill in every section, including the
prediction and the failure. A pull request that describes only the finished state, with no
mention that anything failed along the way, will be sent back.

State what you verified and how, against your own environment. "Works" is not a verification;
"`openHighPriorityTickets` returned a bare id until I added `include: 'this, assignee.this'`,
confirmed in the static console and by a test that checks all four returned tickets" is.
