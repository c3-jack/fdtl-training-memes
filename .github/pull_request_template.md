## Bug and features

`W2-1` (the bug) plus Feature A and Feature B, all mandatory. What was wrong or missing in each,
in the terms someone curating the meme feed would describe it.

## Before and after

What each broken or missing call did before your fix, and what it does now. This has to be here
for all three (the bug and both features) — a pull request that never shows the "before" is sent
back. The recording doesn't need to re-demonstrate the broken state; this section is where it's
proven in writing.

## Change

What you changed for the bug and each feature, and why this is the smallest change that fixes or
builds it.

## Verification

What you did to convince yourself the bug fix and both features work, on your own environment,
and what you observed.

- [ ] The bug and both features reproduced broken (or confirmed not to exist yet) in the static
      console before any fix
- [ ] The bug fixed and both features built
- [ ] A test passes for each, checked against every returned meme or an independent count — not
      a number I hard-coded
- [ ] For each feature: the grant is in the same pull request as its method, in the exact
      `allow:Meme::methodName` form already used by the role's other entries

## Not verified

What you did not check, and anything a reviewer should look at more carefully than the rest.

## Assumptions

Anything you had to decide for yourself because the ticket did not say.
