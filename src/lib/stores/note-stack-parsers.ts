import {
  parseStackString as parseStack,
  serializeStackArray as serializeStack,
} from "./stack-utils";

const parseStackString = parseStack;
const serializeStackArray = serializeStack;

export interface NoteStackUrlState {
  focus: number | null;
  stack: string[];
}

function parseFocusValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
}

export function parseNoteStackSearch(
  search: Record<string, unknown>
): NoteStackUrlState {
  const stack = parseStackString(
    typeof search.stack === "string" ? search.stack : null
  );

  return {
    stack,
    focus: parseFocusValue(search.focus),
  };
}

export function toNoteStackSearchParams(
  stack: string[],
  focus: number | null
): { stack?: string; focus?: number } {
  const next: { stack?: string; focus?: number } = {};
  const serializedStack = serializeStackArray(stack);

  if (serializedStack) {
    next.stack = serializedStack;
  }

  if (focus !== null) {
    next.focus = focus;
  }

  return next;
}
