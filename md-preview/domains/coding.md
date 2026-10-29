# Coding

> RL environments for coding built on real repositories, with their history, tickets and tests, to train agents on the work engineers actually do.

Source: https://www.patronus.ai/domains/coding  
Publisher: Patronus AI, a behavioral research lab for AI (https://www.patronus.ai/)

Ship a feature in code no one documented

Engineers almost never get a clean bug and failing test. They get a ticket, a codebase they didn’t write and a week of decisions spread across myriad chats and git. We build environments that model this complexity.

## RL environments for coding agents

RL environments for coding give an agent a codebase, a task and a reward for the result. Ours start from real repositories, with their file tree, commit and pull request history, tests, docs and run commands. The task doesn’t say where to look. The agent has to explore the code to decide what to do, the way an engineer does on a new team.

Tasks look like what engineers get assigned. They range from small bug fixes to features that touch the database, the API and the frontend. Experts review every task before it is used.

Passing tests is not the whole job. A patch can pass and still be the wrong change, and a model can learn to game the tests. Context also lives outside the code. In MEMTRACK, the facts an engineer needed were spread across Slack, Linear and Git, and the best model tested answered 60% of questions correctly. In TRAIL, the best model tested scored 11% at finding the step where an agent’s run went wrong.

Coding is also where we study behavior. An agent can close the ticket and still be a poor colleague, for example by claiming a check it never ran. Our alignment work covers that side.

## Published research

- [MEMTRACK](https://www.patronus.ai/research/memtrack): Testing whether agents keep track of facts spread across workplace tools. (October 1, 2025 · arXiv 2510.01353 · NeurIPS 2025 Workshop)
- [TRACE](https://www.patronus.ai/research/trace): 54 kinds of reward exploit in code RL, and how well models catch them. (January 27, 2026 · arXiv 2601.20103 · ICML 2026)
- [TRAIL](https://www.patronus.ai/research/trail): A benchmark for finding the step where an agent went wrong. (May 13, 2025 · arXiv 2505.08638)

## Questions about RL environments for coding

### What are coding RL environments?

Coding RL environments are sandboxes with a codebase, tools, a task and a reward. The agent reads code, runs commands and submits a change, and the reward scores the result. Our RL environments guide covers the general idea.

### How is coding agent training data different from a code dataset?

A code dataset is static text, such as files, diffs or solutions. Coding agent training data captures the work itself, from the files an agent opened to the commands it ran and the change it made. Environments produce that kind of data, and the same environment can serve training and evaluation.

### How do coding RL environments verify rewards?

Tests are the starting point for rewards in coding RL environments. Where a task needs more than tests, we add the checks a reviewer would make, written with engineers who know that kind of codebase. Looking at the process as well as the result also makes reward hacking harder.

### How do you calibrate the difficulty of coding RL tasks?

We set difficulty against the models a team is training and retune tasks as new models arrive. Real tasks stay hard because they are underspecified and spread across tools, not because they are puzzles.

### Does training on coding help in other domains?

There is public evidence that models that improve at coding also improve at computer use and tool use. Transfer to other domains is less clear, so we don’t assume it.

### What makes a good RL environment for coding agents?

A good coding RL environment starts from a real repository, with its file tree, commit and pull request history, tests, docs and run commands. Tasks look like what engineers get assigned, from small bug fixes to features that touch the database, the API and the frontend, and the task doesn’t say where to look. Experts review every task before it is used.

## Guides

[RL Environments](https://www.patronus.ai/guide-to-rl-environments)

[Reinforcement Learning with Verifiable Rewards](https://www.patronus.ai/guide-to-rl-environments/reinforcement-learning-with-verifiable-rewards)

[AI Agent Tools](https://www.patronus.ai/ai-agent-development/ai-agent-tools)

## Training a model for this kind of work? Talk to us

[Contact →](https://www.patronus.ai/contact)
