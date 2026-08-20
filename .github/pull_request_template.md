## Tickets

`W2-1`, `W2-2`, `W2-3` — all three. What was wrong or missing in each, in the terms someone
curating the meme feed would describe it.

## Before and after

What each broken or missing call did before your fix, and what it does now. This has to be here
for all three — a pull request that never shows the "before" is sent back.

## Change

What you changed for each ticket and why this is the smallest change that fixes or builds it.

## Verification

What you did to convince yourself each of the three works, on your own environment, and what you
observed.

- [ ] All three tickets reproduced broken in the static console before any fix
- [ ] All three fixed or built
- [ ] A test passes for each, checked against every returned meme or an independent count — not
      a number I hard-coded
- [ ] `W2-2` and `W2-3`: the grant is in the same pull request as its method, and I called both
      as `fdtlMemeMaker.Role.Curator`, not just as an administrator

## Not verified

What you did not check, and anything a reviewer should look at more carefully than the rest.

## Assumptions

Anything you had to decide for yourself because the ticket did not say.
