# Android signing credentials

Never commit signing keys or passwords. `.gitignore` excludes private keystores, local signing configurations, environment files and `.private/` backups.

The old Cordova signing configuration is kept locally in `.private/signing/legacy-build.json`; the original keystore remains locally at `certificates/nbu-release-key.jks` and is ignored. A second private copy is in `.private/signing/legacy-release-key.jks`. These files must not be uploaded or shared. `build.example.json` contains placeholders only.

The new Android project reads `NBU_KEYSTORE`, `NBU_STORE_PASSWORD`, `NBU_KEY_ALIAS` and `NBU_KEY_PASSWORD` from its process environment. The version code must be supplied separately through `NBU_VERSION_CODE` or the Gradle property `nbuVersionCode`. Keep passwords out of shell command text and logs.

The existing keystore matches the **upload certificate** registered in Google Play, not the **app signing certificate** used by Google to sign installed versions. A compromised upload key can be replaced through Google Play's upload-key reset process without changing the app signing key. Do not change the app signing key for this cleanup.

Local history has been rewritten to remove `build.json` and `certificates/nbu-release-key.jks`. The pre-cleanup repository bundle in `.private/signing/repository-before-cleanup.bundle` still contains the old credentials and is a private recovery copy, not a sanitized export. A remote history rewrite does not revoke keys or remove copies in other clones, forks, caches or pull requests. After a remote rewrite, collaborators should clone the cleaned repository again rather than merge the old history back.
