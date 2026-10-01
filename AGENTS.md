# Deployment

The user requires GitHub Pages for deployment. Publish this project to NPCLABS-19/chop-room, using main /docs as the Pages source. Do not deploy through Sites or another provider. Run `node --check docs/app.js`, push the reviewed source to main, and verify the GitHub Pages build and live URL after changes.

The app is static. Keep HTML, CSS and browser JavaScript in docs/. Do not add a server-dependent feature without accounting for GitHub Pages' static hosting.
