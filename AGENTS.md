# Repository guidance

- This repository is the canonical source for the `rappi` plugin.
- Keep the Codex and Claude manifests synchronized.
- Marketplace catalogs reference this repository; do not duplicate runtime behavior into the marketplace repository.
- Operate Rappi only through the signed-in customer website in Google Chrome. Do not reverse engineer private APIs, extract account tokens, or persist credentials, payment details, addresses, prescription details, or order history in Git.
- A direct request may authorize a reversible cart change. Checkout, purchase, recurring delivery, scheduled delivery, substitutions, address changes, and payment changes require their own explicit scope.
- Preserve exact medication ingredient or brand, strength, formulation, pack count, and quantity. Never silently substitute medication.
- Bump the plugin version for released agent-loadable behavior changes and run `npm test` before publishing.
