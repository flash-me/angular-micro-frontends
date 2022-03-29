# ![Micro Frontends Logo](demo/mfe_logo.png) Angular Micro Frontends

## Pure Angular toolchain without 3rd party

Example repository and boilerplate to build *__real micro frontends__* with angular.

### How this repository differs from the examples in the WWW?

> Micro Frontends in its essence means being able to <br> build, compile, load and use frontends that work **independently**. <br>
It **must be** possible to include micro frontends on runtime without configuration change. <br>
This also means that including a micro frontend **must not** involve recompilation <br>
> 
> Otherwise it is just lazy loading with some overhead. <br>
> But since we all live in a free world, everyone can call all the stuff however one wants to. 

Enjoy it. Or not. It's up to you.

## How does all this work?

1. We make use of the great [ng-packagr](https://github.com/ng-packagr/ng-packagr) package which kinda does all the job for us.
2. [Ng-packagr uses rollup under its hood](https://github.com/ng-packagr/ng-packagr/blob/master/src/lib/flatten/rollup.ts). 
   This means by default, every dependency is excluded from the angular application we are building.
3. Ng-packagr outputs the application in FESM
   ([also ESM, which is basically used to create the other formats](https://github.com/ng-packagr/ng-packagr/blob/master/src/lib/ng-package/entry-point/write-bundles.transform.ts#L46))
4. We could make use of UMD, but it's deprecated, so we stick with ESM.

A curcial step is to "link" the angular packages in fully compilation mode. (which is done in this repo as a postinstall step).
It is also important to build your micro frontends with ivy. This is required, so a runtime compilation is not necessary anymore.

Basically

```
# Install packages
npm ci
# Run the live-server
npm run serve
# Build the shared library
npm run shared
# Build the host micro frontend
npm run host
```

So you just build the host application (sometimes called "shell")

*Now comes the part where you see what these micro frontends are of <br>
and not like the examples you can find all over the WWW.*


```
# Keep your browser with index.html open!
# Build the first micro frontend
npm run first
```

Now type in your browser console
```js
hostMfe.loadMfe("@angular-mfe/first");
```
This will load the just compiled micro frontend bundle. <br>
**and creates an instance of it, on runtime!**

You should see in the console following output
```html
Registering MFE-ONE
Total registered: 1
```

‼️ Without any reload / refresh of your browser page you just added features to your application ‼️

And because people don't realize this small, but excellent possibility, <br>
another round.

1. Let's add again a feature to the **running** app.
2. Just **compile** the second MFE: `npm run second`
3. **Without reloading**, type in the console of the **running** app:
```js
hostMfe.loadMfe("@angular-mfe/second");
```
Which results the following output
```html
Registering MFE-TWO
Total registered: 2
```

Take a break and think about it. 

### Drawbacks

This approach requires a bit more knowledge in [importmaps](https://github.com/WICG/import-maps) which landed in Chrome 89, but <br>
1. The angular packages are published in partially compilation mode. For this approach the fully compilation is required. This is done by using `@babel/cli` together with the `@angular/compiler-cli/linker/babel` plugin
2. rxjs does not provide FESM formats and somehow bugs with the exports, so we make use of skypack (Thank you folks!)
3. ESM cannot be loaded from the filesystem, therefore we need to start a local webserver (e.g. live-server)
4. FESM2020 is not compatible out of the box with zone.js when using `async await`. Therefore FESM2015 bundles are used to avoid issues. Thanks @petebacondarwin for this [crucial information](https://github.com/angular/angular/issues/43716#issuecomment-934628526)  

Cheers

flash :zap:
