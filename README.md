# ISL Training — C3

The shared working repository for Week 2 of ISL Agentic Coding Training for Forward Deployed
Engineers. `main` holds `fdtlMemeMaker`, a small C3 package: meme, author, and template types, and
seed data. It is deliberately imperfect — some of what it does is wrong, and some of what it
should do is missing. Your assignment tells you which parts are yours.

## Running it

Sync the package to your own single-node environment. Your assignment covers the bootstrap
order — an `ide`-rooted app first, then this package.

```
c3 sync . -s <your-ide-rooted-app-url> --no-tty
```

`fdtlMemeMaker/react/` already ships a working `MemeFeedPage` that calls all three methods. You
build no front end and don't touch `react/`. Everything is verified in the static console or with a
test, against your own environment.

## Layout

```
fdtlMemeMaker/fdtlMemeMaker.c3pkg.json          the package itself
fdtlMemeMaker/src/Meme.c3typ                    caption, category, status, postedAt, a reference to MemeAuthor
                                                   and MemeTemplate
fdtlMemeMaker/src/Meme.js                       frontPageMemes() -- ships with a real bug, see W2-1
fdtlMemeMaker/src/MemeAuthor.c3typ              displayName, handle
fdtlMemeMaker/src/MemeTemplate.c3typ            name, imageUrl -- display data only, not a ticket
fdtlMemeMaker/metadata/Role/fdtlMemeMaker.Role.Curator.json   the non-admin role W2-2 and W2-3 grant against
fdtlMemeMaker/seed/                             11 memes, 6 authors, real Imgflip templates
fdtlMemeMaker/react/                            MemeFeedPage, already written; don't touch
```

`template` on `Meme` points at a real Imgflip format (Drake Hotline Bling, Gru's Plan, and so
on) so a meme you inspect in the static console has an actual image behind the caption instead
of just text. `customImageUrl` is the other option, for a meme built from someone's own uploaded
photo instead of a shared template — the two are mutually exclusive in practice but neither is
enforced against the other. `Meme.exportJson`/`Meme.importJson` let a meme be shared as a
portable JSON blob (caption, category, status, postedAt, customImageUrl, and the author/template
denormalized by handle/name rather than by id, so it imports cleanly into a different
environment) and re-created elsewhere with `Meme.importJson(<that blob>)`. None of `template`,
`customImageUrl`, or export/import is part of the bug fix or either feature, and none of them
touches the tickets — don't build against it.

## Working in this repository

Read `CONTRIBUTING.md` before your first commit. It covers branch naming, what a commit is
expected to contain, and what a pull request into this repository has to show.
