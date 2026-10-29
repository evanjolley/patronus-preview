# TRAIL

> TRAIL is a benchmark of 148 human-annotated agent traces and an error taxonomy, built to test whether models can find where an agentic workflow went wrong.

Source: https://www.patronus.ai/research/trail  
Publisher: Patronus AI, a behavioral research lab for AI (https://www.patronus.ai/)

TRAIL: Trace Reasoning and Agentic Issue Localization

A benchmark for finding the step where an agent went wrong.

[Darshan Deshpande](https://www.patronus.ai/team/darshan-deshpande), [Varun Prashant Gangal](https://www.patronus.ai/team/varun-prashant-gangal), Hersh Mehta, Jitin Krishnan, [Anand Kannappan](https://www.patronus.ai/team/anand-kannappan), [Rebecca Qian](https://www.patronus.ai/team/rebecca-qian)

Domain · [Coding](https://www.patronus.ai/domains/coding) →

[Read on arXiv →](https://arxiv.org/abs/2505.08638) [PDF →](https://arxiv.org/pdf/2505.08638)

At a glance

- **Traces, annotated by hand**: 148
- **Errors labeled in them**: 841
- **Best score of any model tested**: 11%
- **Sources**: Traces from GAIA and SWE-bench agents

## Key figure

Error categorization F1, location accuracy and joint accuracy on the GAIA split of TRAIL, mean of three runs. The best model localizes and categorizes errors jointly in under a fifth of cases.

## Abstract

The increasing adoption of agentic workflows across diverse domains brings a critical need to scalably and systematically evaluate the complex traces these systems generate. Current evaluation methods depend on manual, domain-specific human analysis of lengthy workflow traces - an approach that does not scale with the growing complexity and volume of agentic outputs. Error analysis in these settings is further complicated by the interplay of external tool outputs and language model reasoning, making it more challenging than traditional software debugging. In this work, we (1) articulate the need for robust and dynamic evaluation methods for agentic workflow traces, (2) introduce a formal taxonomy of error types encountered in agentic systems, and (3) present a set of 148 large human-annotated traces (TRAIL) constructed using this taxonomy and grounded in established agentic benchmarks. To ensure ecological validity, we curate traces from both single and multi-agent systems, focusing on real-world applications such as software engineering and open-world information retrieval. Our evaluations reveal that modern long context LLMs perform poorly at trace debugging, with the best Gemini-2.5-pro model scoring a mere 11% on TRAIL. Our dataset and code are made publicly available to support and accelerate future research in scalable evaluation for agentic workflows.

[Read on arXiv →](https://arxiv.org/abs/2505.08638) [PDF →](https://arxiv.org/pdf/2505.08638)

Cite this

Darshan Deshpande, Varun Prashant Gangal, Hersh Mehta, Jitin Krishnan, Anand Kannappan, Rebecca Qian. TRAIL: Trace Reasoning and Agentic Issue Localization. arXiv:2505.08638, 2025.

```bibtex
@article{deshpande2025trail, title={TRAIL: Trace Reasoning and Agentic Issue Localization}, author={Darshan Deshpande and Varun Prashant Gangal and Hersh Mehta and Jitin Krishnan and Anand Kannappan and Rebecca Qian}, journal={arXiv preprint arXiv:2505.08638}, year={2025} }
```

More research

[All research →](https://www.patronus.ai/research)

- [SpeedrunBench](https://www.patronus.ai/research/speedrunbench): Video game speedrunning as a test of whether agents can beat strategies humans already know. (September 3, 2026 · arXiv 2610.08076)
- [TRACE](https://www.patronus.ai/research/trace): 54 kinds of reward exploit in code RL, and how well models catch them. (January 27, 2026 · arXiv 2601.20103 · ICML 2026)
- [MEMTRACK](https://www.patronus.ai/research/memtrack): Testing whether agents keep track of facts spread across workplace tools. (October 1, 2025 · arXiv 2510.01353 · NeurIPS 2025 Workshop)

From the blog

[All posts →](https://www.patronus.ai/blog)

- [Introducing TRAIL: A Benchmark for Agentic Evaluation](https://www.patronus.ai/blog/introducing-trail-a-benchmark-for-agentic-evaluation) (Jun 5, 2025)
