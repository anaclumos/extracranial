---
lang: 'en'
slug: '/408556'
---

# Project DANSO 🪈: Document Abstract Notation for Semantic Operations

DANSO is a specialized markdown parser designed to enhance the performance of Language Models (LLMs) when processing markdown documents. It addresses the limitations of naive document processing approaches and provides a targeted solution to improve processing quality, coherence, and fidelity to the original content.

## Key Features

- **Shallow Parsing** — DANSO performs a shallow parsing of markdown elements, categorizing them into frontmatter, MDX/HTML tags, code blocks, and paragraphs. This allows LLMs to better understand the structure and context of the document.
- **Targeted Logic** — Each type of parsed entity undergoes corresponding processing logic, ensuring that only the necessary parts are processed while preserving the structure and functionality of the document.
- **Frontmatter Handling** — DANSO identifies and processes only the string values in the frontmatter, such as `title` and `description`, keeping the frontmatter structure intact.
- **MDX/HTML Tag Preservation** — The parser recognizes MDX and HTML tags and processes only the inner strings, preserving the tags and their functionality.
- **Code Block Extraction** — Code blocks are extracted as a whole, along with basic metadata. DANSO can optionally process code comments while keeping the code itself unmodified.
- **Paragraph Context** — The raw text of each paragraph is provided as a whole, allowing LLMs to understand the context and generate more coherent outputs.

## Why DANSO?

Traditional document processing approaches often face challenges when dealing with markdown documents, such as:

- Unintentional processing of MDX tags and modification of code blocks, leading to syntax errors and altered functionality.
- Limited context due to parsing at the HTML tag level, resulting in suboptimal outputs and difficulty in reordering sentences.
- Improper handling of proper nouns, causing confusion and altering the intended meaning.

DANSO addresses these challenges by providing a specialized parsing approach that preserves important elements, maintains context, and applies appropriate processing strategies to different parts of the document. This leads to improved processing quality, coherence, and fidelity to the original content.

## Usage

To use DANSO in your project, follow these steps:

1. Install the DANSO package:
   ```
   npm install danso
   ```
2. Import the DANSO parser in your code:
   ```javascript
   import { parse } from 'danso'
   ```
3. Parse your markdown document using DANSO:
   ```javascript
   const parsed = parse(markdownString)
   ```
4. Process the parsed entities according to your requirements, such as further analysis or transformation.

## Contributing

We welcome contributions to DANSO! If you encounter any issues or have suggestions for improvements, please open an issue on our [GitHub repository](https://github.com/anaclumos/danso). Feel free to submit pull requests with bug fixes, enhancements, or new features.

## License

DANSO is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the software in accordance with the terms of the license.

## Acknowledgements

We would like to thank the contributors and the open-source community for their valuable input and support in developing DANSO.

## Contact

For any questions or inquiries, please contact us at hey@cho.sh

---

Happy parsing and processing with DANSO 🪈!

Inspired & Modified from [wobsoriano/bun-lib-starter: My minimal bun library starter](https://github.com/wobsoriano/bun-lib-starter)
