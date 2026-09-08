# Rappi

Rappi cart-preparation workflow for the current user.

The plugin uses the user's existing signed-in Rappi customer session in Google
Chrome to search the live catalog, compare current prices and delivery times,
and make a reversible cart change when directly requested. Native schedules can
also invoke the skill in a fresh task to propose a repeat purchase from the user's
private Mac-local Rappi preferences. For medication, the user confirms before the
task transmits the product choice to Rappi; the task then prepares the cart and
stops again before purchase. The schedule owns the cadence, while Rappi itself
remains a one-time immediate order.

Sensitive shopping preferences stay outside Git at
`~/Library/Application Support/PedroAVJ/Rappi/preferences.md`. The plugin does
not use an undocumented consumer API, extract account tokens, enable recurring
delivery, or place an order without final approval.

Cart visibility on another device is provided by Rappi's signed-in account,
not by this plugin. The plugin reads the live cart back and leaves it ready for
the user to review.
