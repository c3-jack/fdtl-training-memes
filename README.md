# FDTL Training — C3

The shared working repository for Week 2 of FDTL 100, Agentic Coding for Forward Deployed
Engineers. `main` holds `fdtlHelpdesk`, a small C3 package: a helpdesk ticket type, an agent
type, and seed data. It is deliberately imperfect — some of what it does is wrong, and some of
what it should do is missing. Your ticket tells you which part is yours.

## Running it

Sync the package to your own single-node environment. Your assignment covers the bootstrap
order — an `ide`-rooted app first, then this package.

```
c3 sync . -s <your-ide-rooted-app-url> --no-tty
```

There is no React frontend this week. Everything is verified in the static console or with a
test, against your own environment.

## Layout

```
fdtlHelpdesk.c3pkg.json           the package itself
src/HelpTicket.c3typ              subject, priority, status, openedAt, a reference to HelpAgent
src/HelpTicket.js                 openHighPriorityTickets() -- ships with a real bug, see W2-1
src/HelpAgent.c3typ               displayName, office
metadata/Role/fdtlHelpdesk.Role.Agent.json   the non-admin role your grant (W2-2) targets
seed/                             30 tickets, 6 agents
```

## Working in this repository

Read `CONTRIBUTING.md` before your first commit. It covers branch naming, what a commit is
expected to contain, and what a pull request into this repository has to show.
