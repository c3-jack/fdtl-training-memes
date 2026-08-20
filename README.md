# FDTL Training — C3

The shared working repository for Week 2 of FDTL 100, Agentic Coding for Forward Deployed
Engineers. `main` holds `fdtlMemeMaker`, a small C3 package: a meme type, an author type, and
seed data. It is deliberately imperfect — some of what it does is wrong, and some of what it
should do is missing. Your assignment tells you which parts are yours.

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
fdtlMemeMaker.c3pkg.json          the package itself
src/Meme.c3typ                    caption, category, status, postedAt, a reference to MemeAuthor
src/Meme.js                       frontPageMemes() -- ships with a real bug, see W2-1
src/MemeAuthor.c3typ              displayName, handle
metadata/Role/fdtlMemeMaker.Role.Curator.json   the non-admin role your grants (W2-2, W2-3) target
seed/                             30 memes, 6 authors
```

## Working in this repository

Read `CONTRIBUTING.md` before your first commit. It covers branch naming, what a commit is
expected to contain, and what a pull request into this repository has to show.
