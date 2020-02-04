import { EventEmitter } from 'events'

export enum Actions {
  SWIPE = 'SWIPE',
  SWIPE_LEFT = 'SWIPE_LEFT',
  SWIPE_RIGHT = 'SWIPE_RIGHT',
  SWIPE_UP = 'SWIPE_UP',
  SWIPE_DOWN = 'SWIPE_DOWN',
  PAN_START = 'PAN_START',
  PAN_END = 'PAN_END',
  PAN = 'PAN',
  PINCH_START = 'PINCH_START',
  PINCH_END = 'PINCH_END',
  PINCH = 'PINCH',
  TAP = 'TAP',
  DOUBLE_TAP = 'DOUBLE_TAP',
}

export const emitter = new EventEmitter()
