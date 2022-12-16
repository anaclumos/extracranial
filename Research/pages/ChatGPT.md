---
lang: 'en'
slug: '/85E9E7'
---

## [ChatGPT: Optimizing Language Models for Dialogue](https://openai.com/blog/chatgpt/)

- We trained this model using Reinforcement Learning from Human Feedback (RLHF), using the same methods as InstructGPT, but with slight differences in the data collection setup
- We trained an initial model using supervised fine-tuning: human AI trainers provided conversations in which they played both sides—the user and an AI assistant. We gave the trainers access to model-written suggestions to help them compose their responses
- To create a reward model for reinforcement learning, we needed to collect comparison data, which consisted of two or more model responses ranked by quality. To collect this data, we took conversations that AI trainers had with the chatbot
- We randomly selected a model-written message, sampled several alternative completions, and had AI trainers rank them. Using these reward models, we can fine-tune the model using [Proximal Policy Optimization](https://openai.com/blog/openai-baselines-ppo/). We performed several iterations of this process
- ChatGPT is fine-tuned from a model in the GPT-3.5 series, which finished training in early 2022. You can learn more about the 3.5 series [here](https://beta.openai.com/docs/model-index-for-researchers). ChatGPT and GPT 3.5 were trained on an Azure AI supercomputing infrastructure

## Examples

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Turned out to be a chat [[UIUX|UI]] that got people to start tinkering with text.</p>&mdash; Nat Friedman (@natfriedman) <a href="https://twitter.com/natfriedman/status/1599206152025231360?ref_src=twsrc%5Etfw">December 4, 2022</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I will be forwarding all future media requests to ChatGPT <a href="https://t.co/ygeBfsB07c">pic.twitter.com/ygeBfsB07c</a></p>&mdash; Dylan Field (@zoink) <a href="https://twitter.com/zoink/status/1598827692803051521?ref_src=twsrc%5Etfw">December 2, 2022</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Introducing SiriGPT<br/><br/>A GPT voice assistant built entirely with Shortcuts<br/><br/>Tap in for setup <a href="https://t.co/orh6Wj1XMd">https://t.co/orh6Wj1XMd</a> <a href="https://t.co/hlkwKoAOmq">pic.twitter.com/hlkwKoAOmq</a></p>&mdash; Joe Kennedy (@joekndy) <a href="https://twitter.com/joekndy/status/1598874918422450176?ref_src=twsrc%5Etfw">December 3, 2022</a></blockquote>

### [Using ChatGPT As a Co-Founder](https://www.atomic14.com/2022/12/05/using-chatgpt-as-a-co-founder.html)

- It’s pretty impressive stuff, some of it is a bit overly verbose and a bit generic, but I could probably drill into the answers and get more detail. It would probably generate most of the code for the backend if I wanted it to:
