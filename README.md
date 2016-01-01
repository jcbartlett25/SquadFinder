# Squadfinder

Squadfinder is the quickest way to find your squad and have fun. Huge thanks to Rémi Santos's [Parse React Sample app](https://github.com/Kemcake/parse-react-sample).

## Setup

### Install npm project dependencies
```
npm install
```

#### Run locally

```
npm run start
```

It will setup a server with live reload on `localhost:3000`. Live reloading is for both javascript and styles.

#### Run linter

```
npm run lint
```

Will output eventually code mistakes

#### Build the code

```
npm run build
```

This code will bundle both `javascript` and `styles` to `dist/` folder, generating an `index.html` which will point to a `bundle.js` and `bundle.css`.

## Future Plans
Here's what's in the pipeline for Squadfinder:
* Public profile pages with photos, bios, and other information
* Squad pages, where you can see who's joined a squad and post updates
* Squadrons, which make it easy to form private squads
* Migrate our backend to MongoDB (or something similar)

## File Directory
This is some background for the site’s code and structure.

### HTML Files
* `feed.html` is the feed page (home page for logged in users)
* `index.html` is the landing page (for users who aren’t logged in)
* `profile.html` is the user profile page
* `about.html` provides information about the app
* `squadron.html` displays a user's private squadrons (coming soon)

### CSS Files
* `feed.css` is for styling the feed page
* `main.css` is for styling the core layout of the pages
  * Place this file second in your stylesheet hierarchy
* `profile.css` is for styling the profile page
* `landing.css` is for styling the landing page
* `toast.css` provides the responsive grid

### JavaScript Files
* `client.js` holds functions that aren’t in the HTML scripts
* `resources.js` holds functions for UI (like parallax scrolling)

## Best Practices
### HTML
* These are some things to put short comments for:
  * Large sections of the page (e.g. header, content, footer)
  * Subsections of the page (e.g. info, title, pictures, etc.)
  * Ambiguous divs (to delineate major content sections)
  * Scripts (their purposes may not be apparent)

### CSS
* List rules for each selector alphabetically
* Group the stylings by sections of the page, starting with the most general elements