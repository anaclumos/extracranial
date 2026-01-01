import katex from 'rehype-katex'
import math from 'remark-math'
import type { Pluggable } from 'unified'

interface LatexConfig {
  math: Pluggable
  katex: Pluggable
}

const latex: LatexConfig = {
  math,
  katex,
}

export default latex
