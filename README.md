# ![Micro Frontends Logo](mfe_logo.png) Angular Micro Frontends

### Proof of concept with pure angular toolchain

This repository provides boilerplate code for developing micro frontends with angular without using any 
- additional tools or 
- [custom builder incl. struggles with webpack] or  
- even avoid the need of [hacking the renderer] 🤦🏾

## How to

```
# Install packages
npm ci
# Compile packages with ivy
npm run compile_ngcc
# Build the shared library
npm run shared OR ng run micro:build:shared
# Build the first micro frontend
npm run first OR ng run micro:build:first
# Open index.html
# ???
# Profit
```

## How is this a POC for micro frontends??

```
# Keep your browser with index.html open!
# Build the second micro frontend
npm run second OR ng run micro:build:second
```

Now type in your browser console
```JavaScript
const srcEl = document.createElement("script");
srcEl.src = "dist/second/bundles/angular-mfe-second.umd.js"
document.head.appendChild(srcEl)
```
This will load the just compiled second micro frontend.
We can now attach it to the DOM by entering:

```JavaScript
document.body.appendChild(document.createElement('mfe-two'))
```

You should see in the console following output
```JavaScript
Registering MFE-TWO
shared.mfe.ts:11 Total registered: 2
<mfe-two ng-version=​"9.0.2">​Second Angular Micro Frontend​</mfe-two>​
```

**without any reload / refresh of your browser page you just added features to your application**

## What does all this mean?

Call it however you want:

- Web Components
- Self Contained Angular Applications
- Custom Elements
- Micro Frontends

### To sum it up

With the help of @angular/elements and ng-packagr we are able to
- separate
- develop
- deploy

additional features for our apps completely and isolated from the rest of the domain.

- No recompiling of everything for a small fix
- No full deployment because of a little feature
- EVERYTHING WITH THE DEFAULT ANGULAR TOOLCHAIN

Cheers

flash :zap:

