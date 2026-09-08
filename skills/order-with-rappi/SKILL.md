---
name: order-with-rappi
description: Prepare and review one-time Rappi carts or scheduled repeat-purchase proposals through the live customer website. Use for Rappi product searches, current price and ETA comparisons, medication pack matching, cart preparation, scheduled restock proposals, cart review, and checkout assistance.
---

# Order with Rappi

Use the user's existing signed-in Rappi customer session in Google Chrome. This is
a website workflow, not an official Rappi API integration. Do not call private
or undocumented Rappi endpoints, inspect network traffic for tokens, extract
account identifiers, or deploy account state to another service.

## Ground the request

1. Treat a direct request to prepare or add a clearly identified item as
   authority for that reversible cart change only. Do not treat prior purchases,
   captured messages, or a product already in the cart as broader authority.
2. Read the user's private local preferences at
   `~/Library/Application Support/PedroAVJ/Rappi/preferences.md` when the file
   exists. Treat them as product constraints and scheduled-restock defaults,
   never as authority to check out or place an order. Update this file only
   when the user directly asks to remember, change, or forget a Rappi preference.
   Never copy its contents into Git or unnecessary task output.
3. Read the live cart first and avoid unintended duplicate quantities. For a
   repeat purchase, use recent Rappi order history only to confirm a clear
   repeated SKU; do not persist account history.
4. Resolve the exact product, variant, pack size, quantity, and requested
   delivery timing. For medication, preserve the active ingredient or requested
   brand, strength, formulation, tablet count, and quantity. Never silently
   substitute a medication or infer medical equivalence.
5. Use the account's saved delivery address for current catalog, stock, fees,
   and ETA. Never reveal the address in task output.

## Prepare a scheduled restock

When a native schedule starts a fresh task with only this skill invocation:

1. Stay in that task. Read the local preferences and require exactly one active
   scheduled-restock entry. If none or more than one is active, do not guess or
   alter the cart. The native scheduler firing is the due signal.
2. Inspect the live cart and recent order status before searching. If the exact
   preference is already in the cart, or an active or recent order already
   satisfies this cadence, do not add another quantity; report the existing
   state instead.
3. For medication or another sensitive preference, state the exact product data
   and cart action that would be sent to Rappi and obtain the user's action-time
   confirmation before searching, opening a product URL, or changing the cart.
   Creating the native schedule is not that confirmation.
4. After any required confirmation, prepare only the exact preferred item and
   quantity. A total quantity made
   from multiple smaller sealed packs is allowed only when the preference
   expressly permits it and the brand, strength, formulation, and total unit
   count all match.
5. Choose immediate one-time delivery. The external native schedule owns the
   cadence; never create a scheduled or recurring Rappi commitment.
6. Leave the verified cart in the signed-in account and ask for approval in the
   same scheduled task. Never create another task or place the order unattended.

## Prepare the cart

1. Search the live storefront and compare genuine matches using current item
   price, discounts, fees visible before checkout, stock, pack count, and ETA.
   Compare the total price for the requested unit count, including an expressly
   permitted combination of smaller packs.
2. When the user asks for today, now, normal delivery, or says not to schedule,
   choose immediate delivery. Never choose a scheduled slot, subscription, or
   recurring commitment unless he explicitly requests it.
3. Add only the grounded item and quantity. Do not add related products, accept
   substitutions, change the saved address, or alter payment details.
4. Read the cart back and verify the exact title, strength or variant, pack
   count, quantity, item subtotal, available delivery mode, and ETA. If the live
   site does not expose a fee or final total yet, say so instead of estimating.
5. Leave the cart available in the signed-in account so the user can inspect it on
   another device. Account synchronization is Rappi behavior, not plugin behavior.

## Stop before purchase

Adding the requested item to the cart is the terminal unattended action. Do not
start checkout or place an order without a later direct instruction in the same
the user-owned task. Immediately before a purchase, read back the current final
total, delivery mode and ETA, address label without its contents, payment-method
label without its details, tip, and substitution policy, then obtain the user's
action-time confirmation.

If sign-in, a one-time code, CAPTCHA, prescription, identification, age check,
or payment intervention appears, preserve that exact live screen and request
only the narrow handoff needed. Never bypass the challenge or restart it while
the user is responding.
