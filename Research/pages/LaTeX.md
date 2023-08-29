---
lang: 'en'
slug: '/98D978'
aliases: ['라텍스']
---

In [[computer science]], LaTeX is a software system for document preparation. It is used for high-quality typesetting of technical and scientific documents. LaTeX uses markup tagging conventions to define a document's structure, stylize text throughout a copy, and add citations and cross-references.

## Typewriter

```tex
\texttt{Lorem Ipsum}
```

## TOC

```tex
\tableofcontents
```

## H1

In preamble

```
\title{My Title}
\author{Sunghyun Cho -- sunghyun.cho@usc.edu}
\date{2023-09-07}

\maketitle
```

## H2

```tex
\section{Lorem Ipsum}
```

## H3

```tex
\subsection{Lorem Ipsum}
```

## Table

```tex
\begin{center}
\begin{tabular}{ll}
    Col 1 & Col 2 \\ \hline
    Value 1 & Value 2 \\
    Value 3 & Value 4 \\
\end{tabular}
\end{center}
```

## Verbatim

```tex
\begin{verbatim}
\NewDocumentCommand{Lorem Ipsum}
\end{verbatim}
```

## Big-O

```tex
Big-$\mathcal{O}$
```

## Ordered List

```tex
\begin{enumerate}
\item $f(n) = 2^{2n}$
\item $f(n) = 2^{n+1}$
\item $f(n) = 2^{n}$
\item $f(n) = 2^{\frac{n}{2}}$
\end{enumerate}
```

## Font Size

### Global

In preamble

```tex
\documentclass[12pt]{article}
```

```tex
\documentclass[14pt]{extarticle}
```

## Font Height

In preamble

```tex
\linespread{1.6}
```
