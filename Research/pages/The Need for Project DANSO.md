---
lang: 'en'
slug: '/45CAFE'
---

I have benchmarked different ways of translating the document.

### 1. Naive Document Translation

Works pretty well, but sometimes translates the MDX tags. See the `<Intro>` tag at the beginning of the document

But we cannot ignore these `<tag>` lines altogether because sometimes it includes strings, such as `<BlogPost title="What is React?" />`. In this case, we want to translate only the string inside

Translates proper nouns, such as "Server Actions" into "서버 작업" which severely confuses the reader

With some prompting, both can be fixed pretty easily

![[52DEF9.png]]

However, this approach has one critical flaw, that GPT is terrible at transcription.

Take a look at the following examples. It modified a code block, either making a syntax error or unknowingly modifying the code.

![[2AC2B1.png]]
![[37BAD3.png]]

### 2. Remark Parsing and Translating

Severely limits the context of AI translation.

Parsing to the html tag level worsens the translation quality, because sometimes the AI needs to see the sentence as a whole to employ more adequate markdown syntaxes.

For example, a sentence like the following

```
You [need to use](/some-supporting-doc) this because of [this](/some-youtube-video)
```

should be translated to

```
[이것](/some-youtube-video) 때문에 [이렇게 사용하셔야](/some-supporting-doc) 합니다.
```

Meanwhile if you parse it to the html tag level, the AI won't be able to reorder the sentences. Instead, it will translate it as:

```
당신은 [사용이 필요하다](/some-supporting-doc) 이것 때문에 [이것](/some-youtube-video)
```

![[87872D.png]]

### 3. Solution

I need to write an MDX parser. It will shallowly parse the elements, into:

- **Frontmatter**. Only translate strings, such as `title` and `description`.
- **MDX Tags**. Only translate inner strings.
- **Code**. Extract the comments and only translate the comments (or just don't.)
- **Paragraph**. Provide the markdown raw text as a whole.

Then each types of entities will be translated using their corresponding translation logic.

Thus, I have started [[Project DANSO]]
