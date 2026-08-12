## Package

What the package does, in the terms a customer looking at the page would describe it. Link your
SNE app URL.

## The two forced failures

For each one: what you predicted before triggering it, what actually happened, and what the fix
was. Both failures have to appear here — a pull request that never mentions a failure is sent
back.

1. **The assignee column.**
2. **The ungranted method.**

## Verification

What you did to convince yourself the fix works, and what you observed on your own environment.
Name the commands you ran and the values you saw in the browser and the static console.

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Playwright check confirms the aggregated counts and the assignee names render
- [ ] The aggregation method was called as both an administrator and a non-administrator role

## Not verified

What you did not check, and anything a reviewer should look at more carefully than the rest.

## Assumptions

Anything you had to decide for yourself because the assignment did not say.
