/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-638345458a836ec58667.js"
  },
  {
    "url": "framework-73dfc43896e80fc89ebf.js"
  },
  {
    "url": "app-0ddf854e6ed823671bb8.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "cf455b94a9449727889a8dd9fae9fe81"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-96dbb8ba0ee82aff4c65.js"
  },
  {
    "url": "polyfill-10b147567a6d986d01e2.js"
  },
  {
    "url": "component---src-pages-404-tsx-92a0cab7e999d3311404.js"
  },
  {
    "url": "5cc436a9c52c4e131645b38a3dd5e1c17c97ba78-f392a7d89ac110809b1a.js"
  },
  {
    "url": "page-data/404/page-data.json",
    "revision": "ec4b264096ec487cb411bc9df44fabbf"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "e466a9fa61d5c0844c6080fc39b32732"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "cace30450d05cb34a4bc4d3c30e1672a"
  },
  {
    "url": "styles.94aeba59b8e32d1a1790.css"
  },
  {
    "url": "component---src-pages-calendiary-tsx-735e8ec9138f6d16f0e9.js"
  },
  {
    "url": "styles-77e32ee8d6888701d03f.js"
  },
  {
    "url": "8313d723-dd83d4595632b898904d.js"
  },
  {
    "url": "542beb4b00276e7a65112291ea6fa4e98558f6f9-951dbcaa3c60992e6117.js"
  },
  {
    "url": "8ec378a2db17dec6bac7a7057b262984230b1240-ba82db46e37d4ccf2832.js"
  },
  {
    "url": "18ca566dec55ef7189e27a9cee0581128f5eeb92-6f6cc7c49f51fcac0984.js"
  },
  {
    "url": "page-data/calendiary/page-data.json",
    "revision": "3ea12a5ec450269ad73cc148d94739ad"
  },
  {
    "url": "component---src-pages-encode-url-tsx-c3a8ff67463bcaa74fa3.js"
  },
  {
    "url": "page-data/encodeURL/page-data.json",
    "revision": "b6bd2beb5dec9fdeaffd1ca6d1bf3bb3"
  },
  {
    "url": "component---src-pages-index-tsx-2ef72df1c30a9937c980.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "072876287d33dc1fefc63e1174d931a0"
  },
  {
    "url": "component---src-pages-json-viewer-tsx-5f2d9a9f58ca195bdc1c.js"
  },
  {
    "url": "page-data/jsonViewer/page-data.json",
    "revision": "00de17e8630adcadfdd9e958849ca3c1"
  },
  {
    "url": "component---src-pages-screensaver-tsx-dba045ac93449e61bfd4.js"
  },
  {
    "url": "bcdce425-88301a90c34067e443f6.js"
  },
  {
    "url": "page-data/screensaver/page-data.json",
    "revision": "d76f967e10ea8ae7522ebf055c89020f"
  },
  {
    "url": "component---src-pages-timer-tsx-5e82c2d96c07c6e9ece9.js"
  },
  {
    "url": "page-data/timer/page-data.json",
    "revision": "fbdd08227b4836a0d29215ba5c62d998"
  },
  {
    "url": "component---src-pages-uuid-tsx-b57f849f904ed427f900.js"
  },
  {
    "url": "page-data/uuid/page-data.json",
    "revision": "67b65e70aa3b2bef5c8efa07aa5d0cfb"
  },
  {
    "url": "component---src-pages-wallpaper-tsx-3ccf65edd4b9abe4723f.js"
  },
  {
    "url": "page-data/wallpaper/page-data.json",
    "revision": "bda317f4827864a8c20c53e14804039b"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "fc72bf82c615c5e41859dc40a92f7153"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-0ddf854e6ed823671bb8.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
