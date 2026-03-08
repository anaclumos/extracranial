"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

export {
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
} from "./select/items"
export { SelectPopup, SelectPopup as SelectContent } from "./select/popup"
export { SelectTrigger, SelectValue } from "./select/trigger"

export const Select = SelectPrimitive.Root
