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

## Unordered List

```tex
\begin{itemize}
\item $f(n) = 2^{2n}$
\item $f(n) = 2^{n+1}$
\item $f(n) = 2^{n}$
\item $f(n) = 2^{\frac{n}{2}}$
\end{itemize}
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

## Page Break

```tex
\pagebreak
```

## Bold

```tex
\textbf
```

## Variables and Footers

```tex
%% Preamble %%
\usepackage{fancyhdr}
\renewcommand{\headrulewidth}{0pt} % Remove line
%% Doc %%
\pagestyle{fancy}
\fancyhead{} % clear all header fields
\fancyfoot{} % clear all footer fields
\fancyfoot[LE,LO]{\myname}
\fancyfoot[CE,CO]{\mytitle}
\fancyfoot[RE,RO]{\thepage}
```

## Algorithm

preamble

```tex
\usepackage{algpseudocode}
\usepackage{algorithm}
\algrenewcommand\algorithmicrequire{\textbf{Input:}}
\algrenewcommand\algorithmicensure{\textbf{Output:}}
```

```tex
\begin{algorithm}
  \caption{An algorithm with caption}
  \begin{algorithmic}
	  \Require $n \geq 0$
	  \Ensure $y = x^n$
	  \State $y \gets 1$
	  \State $X \gets x$
	  \State $N \gets n$
	  \While{$N \neq 0$}
	  \If{$N$ is even}
	  \State $X \gets X \times X$
	  \State $N \gets \frac{N}{2}$  \Comment{This is a comment}
	  \ElsIf{$N$ is odd}
	  \State $y \gets y \times X$
	  \State $N \gets N - 1$
	  \EndIf
	  \EndWhile
  \end{algorithmic}
\end{algorithm}
```

```tex
\listofalgorithms
```

## Graph

```tex

\begin{center}
	\begin{tikzpicture}[main/.style = {node distance={15mm}, thick, draw, circle}]
		\node[main] (H) {H};
		\node[main] (A) [above right of=H] {A};
		\node[main] (B) [right of=A] {B};
		\node[main] (C) [right of=B] {C};
		\node[main] (S) [below right of=C] {S};
		\node[main] (D) [below right of=H] {D};
		\node[main] (E) [right of=D] {E};
		\node[main] (F) [right of=E] {F};

		\draw[->] (H) -- node[midway, above, sloped] {5} (A);
		\draw[->] (A) -- node[midway, above] {6} (B);
		\draw[->] (B) -- node[midway, above] {7} (C);
		\draw[->] (C) -- node[midway, above, sloped] {6} (S);

		\draw[->] (D) -- node[midway, above, sloped] {5} (B);
		\draw[->] (B) -- node[midway, above, sloped] {4} (F);

		\draw[->] (H) -- node[midway, above, sloped] {8} (D);
		\draw[->] (D) -- node[midway, above] {4} (E);
		\draw[->] (E) -- node[midway, above] {3} (F);
		\draw[->] (F) -- node[midway, above, sloped] {6} (S);


		\draw[->] (A) -- (B);
		\draw[->] (B) -- (C);
		\draw[->] (C) -- (S);
		\draw[->] (H) -- (D);
		\draw[->] (D) -- (E);
		\draw[->] (E) -- (F);
		\draw[->] (F) -- (S);
		\draw[->] (D) -- (B);
		\draw[->] (B) -- (F);
	\end{tikzpicture}
\end{center}

```

## Sum

$$
\sum_{i=0}^k 2^i
$$

```tex
\sum_{i=0}^k 2^i
```

## Big Parenthesis

```tex

\left( {n \over n} \right)

```

## Arrow

```tex
\rightarrow

\leftarrow
```
