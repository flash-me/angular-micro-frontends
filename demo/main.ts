import "zone.js/dist/zone.min";
import * as rxjs from "rxjs";
import * as operators from "rxjs/operators";
import * as core from "@angular/core";
import * as common from "@angular/common";
import * as platformBrowser from "@angular/platform-browser";
import * as elements from "@angular/elements";

declare let window: any;

window.rxjs = rxjs;
window.rxjs.operators = operators;
window.ng = {
	core,
	common,
	platformBrowser,
	elements
}

let shared = document.createElement("script");
shared.src = "mfe/shared/bundles/angular-mfe-shared.umd.js";
document.head.append(shared);

let first = document.createElement("script");
first.src = "mfe/first/bundles/angular-mfe-first.umd.js";
document.head.append(first);

let second = document.createElement("script");
second.src = "mfe/second/bundles/angular-mfe-second.umd.js";
document.head.append(second);