# ![Micro Frontends Logo](demo/mfe_logo.png) Angular Micro Frontends

## Pure Angular toolchain without 3rd party

Example repository and boilerplate to build *__real micro frontends__* with angular.

### How this repository differs from the bullsh!t examples in the WWW?

> [Micro Frontends in its essence](https://github.com/angular/angular-cli/issues/20056#issuecomment-781899902) means being able to <br> build, compile, load and use frontends that work **independently**. <br>
It **must be** possible to include micro frontends on runtime without configuration change. <br>
This also means that including a micro frontend **must not** involve recompilation <br>
> 
> Otherwise it is just lazy loading with some overhead. <br>
> But since we all live in a free world, everyone can call all the crap however one wants to. 

Enjoy it. Or not. It's up to you.

## How does all this work?

1. We make use of the great [ng-packagr](https://github.com/ng-packagr/ng-packagr) package which kinda does all the job for us.
2. [Ng-packagr uses rollup under its hood](https://github.com/ng-packagr/ng-packagr/blob/master/src/lib/flatten/rollup.ts). 
   This means by default, every dependency is excluded from the angular application we are building.
3. Ng-packagr outputs the application in FESM & UMD 
   ([also ESM, which is basically used to create the other formats](https://github.com/ng-packagr/ng-packagr/blob/master/src/lib/ng-package/entry-point/write-bundles.transform.ts#L46))
4. We can make use both of UMD (easier, but older) and FESM (comes with small overhead, but newer) to achieve micro frontends approach.

Both approaches will be described below.

### UMD approach

In this approach you need to load the UMD bundles of all the packages (See `demo_umd/index.html`)

For the UMD approach, firstly we make use of the options [umdId](https://github.com/ng-packagr/ng-packagr/blob/master/src/ng-package.schema.json#L87)
and [umdModuleIds](https://github.com/ng-packagr/ng-packagr/blob/master/src/ng-package.schema.json#L65). These options must be used correctly,
in order for the approach to work properly. You can see examples in the package.json's of the micro frontends in this repository.

The second crucial step is to compile your node_modules with `ngcc` (which is done in this repo as a postinstall step).
It is also important to build your micro frontends with ivy. This is required, so a runtime compilation is not necessary anymore.

Basically

```
# Install packages
npm ci
# Build the shared library
npm run shared
# Build the first micro frontend
npm run first
```

After that you have build your first micro frontend and a stateful shared library, which is used by the micro frontends (just to provide an example).
Now you can open `demo_umd/index.html` What you see is that the first micro frontend is loaded.

*Now comes the part where you see what __REAL MICRO FRONTENDS__  are of <br>
and not the bullsh!t you can find all over the WWW.*


```
# Keep your browser with index.html open!
# Build the second micro frontend
npm run second
```

Now type in your browser console
```js
// create a <script> element
const srcEl = document.createElement("script");
// add a source path
srcEl.src = "dist/second/bundles/angular-mfe-second.umd.js"
// attach that <script> element to the DOM
document.head.appendChild(srcEl)
```
This will load the just compiled second micro frontend bundle. <br>
**Time to load an instance of the second micro frontend ON RUNTIME**
```js
document.body.appendChild(document.createElement('mfe-two'))
```

You should see in the console following output
```html
Registering MFE-TWO
shared.mfe.ts:11 Total registered: 2
<mfe-two>Second Angular Micro Frontend</mfe-two>
```

‼️ Without any reload / refresh of your browser page you just added features to your application ‼️


### FESM approach

This approach requires a bit more knowledge in [importmaps](https://github.com/WICG/import-maps) which is still a [draft](https://wicg.github.io/import-maps/). <br>
But we can make use of the great package [es-module-shims](https://github.com/guybedford/es-module-shims). But there are some drawbacks
1. The angular packages by now are not published with ivy code
2. rxjs does not provide FESM formats and somehow bugs with the exports
3. ESM cannot be loaded from the filesystem, therefore we need to start a local webserver (e.g. live-server)

We can workaround this by making use of rollup, which is already implicitly installed because of ng-packagr. <br>
A simple [rollup.config](rollup.config.js) and a simple [entry point](demo/main.js) that exports all the packages is enough.

Just run
```bash
# Create the bundle
npm run bundle
# start the live server
npm run serve
```

And in your browser you will see the same working samples.

Cheers

flash :zap:
