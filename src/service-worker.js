/* global workbox */

workbox.setConfig({
  debug: false
})
workbox.core.setCacheNameDetails({ prefix: 'studio' })

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST') {
    event.respondWith(fetch(event.request))
  }
})

workbox.core.skipWaiting()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
