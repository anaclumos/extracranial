export interface PipelineStepData {
  propose: string
  critique: string
  rank: string
  refine: string
}

export function getPipelineSteps(t: (key: string) => string): string[] {
  return [
    t("steps.propose"),
    t("steps.critique"),
    t("steps.rank"),
    t("steps.refine"),
  ]
}
