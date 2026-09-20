# Security policy

Use GitHub's private security-advisory workflow to report a suspected vulnerability. Do not open a public issue containing exploit details, credentials, customer data, server addresses, or production logs.

The `main` branch is the supported production line. Security fixes should include a regression test or a reproducible verification step and must pass the repository's `npm run verify` workflow before deployment.

If a secret is committed or exposed at runtime, remove it from use and rotate it at the provider. Deleting it from a later commit is not sufficient.
