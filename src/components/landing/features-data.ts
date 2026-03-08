export interface FeatureData {
  id: string
  title: string
  description: string
}

export function getFeatures(t: (key: string) => string): FeatureData[] {
  return [
    {
      id: "dialecticalGraph",
      title: t("dialecticalGraph.title"),
      description: t("dialecticalGraph.description"),
    },
    {
      id: "rebuttalFirst",
      title: t("rebuttalFirst.title"),
      description: t("rebuttalFirst.description"),
    },
    {
      id: "multilingual",
      title: t("multilingual.title"),
      description: t("multilingual.description"),
    },
  ]
}
