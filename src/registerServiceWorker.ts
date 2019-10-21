/* eslint-disable no-console */

import { register } from 'register-service-worker'
import event from './event'

let updateTimer: NodeJS.Timeout | null = null

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      event.$emit('sw', { status: 'ready' })
    },
    registered () {
      event.$emit('sw', { status: 'registered' })
      updateTimer = setTimeout(() => {
        event.$emit('sw', { status: 'update', latest: true })
      }, 500)
    },
    cached () {
      event.$emit('sw', { status: 'cached' })
      event.$emit('sw', { status: 'update', latest: true })
    },
    updatefound () {
      if (updateTimer != null) {
        clearTimeout(updateTimer)
      }
      event.$emit('sw', { status: 'update', latest: false })
    },
    updated () {
      event.$emit('sw', { status: 'update', latest: true, refresh: true })
    },
    offline () {
      event.$emit('sw', { status: 'offline' })
    },
    error (error) {
      event.$emit('sw', { status: 'error', error })
    }
  })
} else {
  event.$emit('sw', { status: 'ready' })
  setTimeout(() => {
    event.$emit('sw', { status: 'registered' })
    setTimeout(() => {
      event.$emit('sw', { status: 'update', latest: true })
    }, 50)
  }, 10)
}
