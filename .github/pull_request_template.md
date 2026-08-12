## Ticket

Which one — `W2-1` or `W2-2` — and what was wrong or missing, in the terms someone staffing the
helpdesk would describe it.

## Prediction and failure

What you expected before you first ran the call your ticket describes, and what you actually got.
This has to be here, not just the fixed state — a pull request that never mentions the failure is
sent back.

## Change

What you changed and why this is the smallest change that fixes or builds it.

## Verification

What you did to convince yourself it works, on your own environment, and what you observed.

- [ ] Reproduced the ticket's failure in the static console, predicted first
- [ ] Fixed or built it
- [ ] A test passes, checked against every returned ticket or an independent count — not a
      number I hard-coded
- [ ] (`W2-2` only) The grant is in this same pull request, and I called the method as
      `fdtlHelpdesk.Role.Agent`, not just as an administrator

## Not verified

What you did not check, and anything a reviewer should look at more carefully than the rest.

## Assumptions

Anything you had to decide for yourself because the ticket did not say.
