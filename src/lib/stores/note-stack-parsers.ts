"use client"

import { createParser, parseAsInteger } from "nuqs"
import {
  parseStackString as parseStack,
  serializeStackArray as serializeStack,
} from "./stack-utils"

export {
  buildFullStack,
  getFocusIndex,
  parseStackString,
  popFromStack,
  pushToStack,
  serializeStackArray,
} from "./stack-utils"

const parseStackString = parseStack
const serializeStackArray = serializeStack

export const stackParser = createParser({
  parse: parseStackString,
  serialize: serializeStackArray,
}).withDefault([])

export const focusParser = parseAsInteger

export const noteStackParsers = {
  stack: stackParser,
  focus: focusParser,
}
