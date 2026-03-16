export interface NoteStackUrlState {
  focus: number | null;
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
  return {
    focus: parseFocusValue(search.focus),
  };
}

export function toNoteStackSearchParams(focus: number | null): {
  focus?: number;
} {
  const next: { focus?: number } = {};

  if (focus !== null) {
    next.focus = focus;
  }

  return next;
}
