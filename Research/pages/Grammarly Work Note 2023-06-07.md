---

lang: 'en'
slug: '/564602'
---Experiment Metric

```mermaid
graph LR
  subgraph Experiment Metric
    direction LR
    subgraph Metrics
	    metric_definition["Metric Definition"]
	    template["Template"]
    end
    metric_cut_definition["Metric Cut Definition<br/>(Only for GQL-based metrics)"]
    notebook_code["notebook.code"]
    template_yml["Template.yml<br/>(Metadata for template. e.g., cluster settings)"]
    expMetricsUtils["expMetricsUtils<br/>(Notebook with commonly used functions)"]
    calculation_of_metrics["Calculation of Metrics"]
    statistics["Statistics<br/>(p-value, Confidence Intervals)"]
    template---notebook_code
    template---template_yml
    template---expMetricsUtils
    notebook_code---calculation_of_metrics
    notebook_code---statistics
    Metrics---metric_cut_definition
  end
```

Databricks Notebooks are analytical tools that can extract information from the data lake.

To create these notebooks on a mass scale, we use templates. The template will be filled out when a user attaches a metric to an experiment and then saved to Databricks.

Notebooks will have `expMetricUtils` and filled-out parameters.

Templates will have documentation + data pull + aggregation + calculation + writing to delta tables

Functions are either in Python or Scala
