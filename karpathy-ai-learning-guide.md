# Andrej Karpathy AI 系统学习指南 + NotebookLM 专辑设置

> 以 Andrej Karpathy 为核心信息来源，系统性学习 AI / 深度学习 / LLM 的完整资源包

---

## 什么是 NotebookLM？

[NotebookLM](https://notebooklm.google.com) 是 Google 推出的 AI 笔记本工具，支持直接导入 YouTube 视频（读取字幕）、网站、PDF 等，然后让你在里面自由问答、总结、深入探索。

**每个 Notebook 最多支持 50 个来源。**

---

## 第一步：建立你的 Karpathy 专辑 Notebook

### 在 NotebookLM 里新建一个 Notebook

前往 [notebooklm.google.com](https://notebooklm.google.com) → 点击 **"New Notebook"** → 命名为 `Andrej Karpathy AI 学习专辑`

---

## 第二步：按顺序添加以下所有来源

把下面的链接**逐一复制粘贴**到 NotebookLM 的 "Add Source" → "Website" 或 "YouTube"。

---

## 🎬 一、YouTube 视频（可直接添加 URL）

NotebookLM 会自动提取视频字幕作为知识来源。

---

### 📚 主系列：Neural Networks: Zero to Hero（技术深度课）

这是 Karpathy 最核心的教学系列，从零开始构建神经网络，每一步都有代码实现。

| # | 视频标题 | 时长 | YouTube URL |
|---|---------|------|-------------|
| 1 | **The spelled-out intro to neural networks and backpropagation: building micrograd** | 2h25m | `https://www.youtube.com/watch?v=VMj-3S1tku0` |
| 2 | **The spelled-out intro to language modeling: building makemore** | 1h57m | `https://www.youtube.com/watch?v=PaCmpygFfXo` |
| 3 | **Building makemore Part 2: MLP** | 1h15m | `https://www.youtube.com/watch?v=TCH_1BHY58I` |
| 4 | **Building makemore Part 3: Activations & Gradients, BatchNorm** | 1h55m | `https://www.youtube.com/watch?v=P6sfmUTpUmc` |
| 5 | **Building makemore Part 4: Becoming a Backprop Ninja** | 1h55m | `https://www.youtube.com/watch?v=q8SA3rM6ckI` |
| 6 | **Building makemore Part 5: Building a WaveNet** | 56m | `https://www.youtube.com/watch?v=t3YJ5hKiMQ0` |
| 7 | **Let's build GPT: from scratch, in code, spelled out** | 1h56m | `https://www.youtube.com/watch?v=kCc8FmEb1nY` |
| 8 | **Let's build the GPT Tokenizer** | 2h13m | `https://www.youtube.com/watch?v=zduSFxRajkE` |
| 9 | **Let's reproduce GPT-2 (124M)** | 4h00m | `https://www.youtube.com/watch?v=l8pRSuU81PU` |

> 完整播放列表：`https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ`

---

### 🌐 大众向系列：LLM 入门与深度理解

不需要代码基础，适合建立概念性理解。

| # | 视频标题 | 时长 | YouTube URL |
|---|---------|------|-------------|
| 10 | **[1hr Talk] Intro to Large Language Models** | 1h00m | `https://www.youtube.com/watch?v=zjkBMFhNj_g` |
| 11 | **Deep Dive into LLMs like ChatGPT** | 3h31m | `https://www.youtube.com/watch?v=7xTGNNLPyMI` |
| 12 | **How I Use LLMs** | 2h11m | `https://www.youtube.com/watch?v=EWvNQjAaOHw` |

---

## 📝 二、博客文章（添加为 Website URL）

Karpathy 的经典文章，是理解深度学习思想的必读内容。

| # | 文章标题 | URL |
|---|---------|-----|
| 13 | **Hacker's Guide to Neural Networks**（神经网络黑客指南） | `http://karpathy.github.io/neuralnets/` |
| 14 | **The Unreasonable Effectiveness of Recurrent Neural Networks**（RNN 的不合理有效性） | `http://karpathy.github.io/2015/05/21/rnn-effectiveness/` |
| 15 | **Deep Reinforcement Learning: Pong from Pixels**（深度强化学习） | `http://karpathy.github.io/2016/05/31/rl-policy-gradients/` |
| 16 | **Recipe for Training Neural Networks**（训练神经网络的秘诀）⭐ 必读 | `http://karpathy.github.io/2019/04/25/recipe/` |
| 17 | **Software 2.0**（软件 2.0 时代）⭐ 必读 | `https://karpathy.medium.com/software-2-0-a64152b37c35` |
| 18 | **microgpt - 200行Python实现GPT**（2026年新作） | `http://karpathy.github.io/2026/02/12/microgpt/` |
| 19 | **A Survival Guide to a PhD**（博士生存指南，思维方式极有价值） | `http://karpathy.github.io/2016/09/07/phd/` |

---

## 💻 三、GitHub 项目（添加为 Website URL）

GitHub 页面包含 README，NotebookLM 可以读取代码架构和设计思路。

| # | 项目名 | 描述 | URL |
|---|--------|------|-----|
| 20 | **micrograd** | 从零实现自动微分引擎 | `https://github.com/karpathy/micrograd` |
| 21 | **makemore** | 从零实现字符级语言模型 | `https://github.com/karpathy/makemore` |
| 22 | **nanoGPT** | 最简洁的 GPT 训练/推理代码 ⭐ | `https://github.com/karpathy/nanoGPT` |
| 23 | **llm.c** | 用纯 C/CUDA 实现 GPT-2 训练 | `https://github.com/karpathy/llm.c` |
| 24 | **nn-zero-to-hero** | Zero to Hero 课程所有 Jupyter Notebooks | `https://github.com/karpathy/nn-zero-to-hero` |
| 25 | **minGPT** | 早期 GPT 极简实现 | `https://github.com/karpathy/minGPT` |

---

## 📄 四、论文（可下载 PDF 上传到 NotebookLM）

这些是 Karpathy 课程中反复引用的核心论文。

| # | 论文 | 重要性 | arXiv URL |
|---|------|--------|-----------|
| 26 | **Attention Is All You Need** (Transformer 原论文) | ⭐⭐⭐ 必读 | `https://arxiv.org/abs/1706.03762` |
| 27 | **Language Models are Unsupervised Multitask Learners** (GPT-2) | ⭐⭐⭐ | `https://openai.com/research/language-unsupervised` |
| 28 | **ImageNet Classification with Deep CNNs** (AlexNet) | ⭐⭐ 历史意义 | `https://arxiv.org/abs/1404.5997` |
| 29 | **Batch Normalization** | ⭐⭐ | `https://arxiv.org/abs/1502.03167` |
| 30 | **Deep Residual Learning** (ResNet) | ⭐⭐ | `https://arxiv.org/abs/1512.03385` |

> **如何添加论文到 NotebookLM：**
> 1. 访问 arXiv 链接
> 2. 点击 "Download PDF"
> 3. 在 NotebookLM 中选择 "Upload" → 上传 PDF 文件

---

## 🗺️ 推荐学习路径

```
阶段一：概念建立（1-2周）
  ↓
  视频 #10：Intro to Large Language Models (1hr)
  视频 #11：Deep Dive into LLMs like ChatGPT (3.5hr)
  文章 #17：Software 2.0

阶段二：数学基础理解（2-3周）
  ↓
  文章 #13：Hacker's Guide to Neural Networks
  视频 #1：micrograd（反向传播核心）

阶段三：Zero to Hero 系列（6-8周）
  ↓
  视频 #1 → #2 → #3 → #4 → #5 → #6 → #7
  同步阅读：文章 #16 Recipe for Training Neural Networks

阶段四：Transformer 与 GPT 深度（3-4周）
  ↓
  论文 #26：Attention Is All You Need
  视频 #8：GPT Tokenizer
  视频 #9：Reproduce GPT-2 (124M)

阶段五：实践与工具使用（持续进行）
  ↓
  视频 #12：How I Use LLMs
  GitHub 项目：nanoGPT, llm.c 动手跑代码
```

---

## 💡 如何在 NotebookLM 中高效学习

添加完所有来源后，你可以问 NotebookLM 这类问题：

**概念理解类：**
- "解释反向传播算法，结合 Karpathy 在 micrograd 视频里的讲解"
- "什么是 Transformer？Attention 机制是如何工作的？"
- "Batch Normalization 解决了什么问题？"

**对比分析类：**
- "RNN、LSTM 和 Transformer 在语言建模上有什么区别？"
- "micrograd、minGPT、nanoGPT 这三个项目有什么递进关系？"

**实践指导类：**
- "我想从零开始训练一个字符级语言模型，Karpathy 建议从哪里开始？"
- "训练神经网络时常见的 bug 有哪些？（结合 Recipe 文章）"

**深度追问类：**
- "Karpathy 在 GPT-2 复现视频里做了哪些优化技巧？"
- "llm.c 相比 nanoGPT 的核心优势是什么？"

---

## 📌 NotebookLM 添加来源的步骤

1. 打开 [notebooklm.google.com](https://notebooklm.google.com)
2. 新建 Notebook，命名为 `Karpathy AI 学习专辑`
3. 点击左侧 **"+ Add Source"**
4. 对于 YouTube 视频 → 选择 **"YouTube"** → 粘贴视频 URL
5. 对于网站/博客/GitHub → 选择 **"Website"** → 粘贴 URL
6. 对于论文 → 下载 PDF → 选择 **"Upload"** → 上传文件
7. 重复以上步骤，将上面 **30个来源**全部添加进去

> ⚠️ **注意：** NotebookLM 只支持有字幕的 YouTube 视频（Karpathy 的视频都有自动字幕，可正常使用）。GitHub 页面建议添加 README 对应的 raw URL 或直接用主页 URL。

---

## 🔗 快速参考：所有来源 URL 汇总

```
YouTube 视频：
https://www.youtube.com/watch?v=VMj-3S1tku0  (micrograd)
https://www.youtube.com/watch?v=PaCmpygFfXo  (makemore 1)
https://www.youtube.com/watch?v=TCH_1BHY58I  (makemore 2 MLP)
https://www.youtube.com/watch?v=P6sfmUTpUmc  (makemore 3 BatchNorm)
https://www.youtube.com/watch?v=q8SA3rM6ckI  (makemore 4 Backprop Ninja)
https://www.youtube.com/watch?v=t3YJ5hKiMQ0  (makemore 5 WaveNet)
https://www.youtube.com/watch?v=kCc8FmEb1nY  (Let's build GPT)
https://www.youtube.com/watch?v=zduSFxRajkE  (GPT Tokenizer)
https://www.youtube.com/watch?v=l8pRSuU81PU  (Reproduce GPT-2)
https://www.youtube.com/watch?v=zjkBMFhNj_g  (Intro to LLMs)
https://www.youtube.com/watch?v=7xTGNNLPyMI  (Deep Dive LLMs)
https://www.youtube.com/watch?v=EWvNQjAaOHw  (How I Use LLMs)

博客文章：
http://karpathy.github.io/neuralnets/
http://karpathy.github.io/2015/05/21/rnn-effectiveness/
http://karpathy.github.io/2016/05/31/rl-policy-gradients/
http://karpathy.github.io/2019/04/25/recipe/
https://karpathy.medium.com/software-2-0-a64152b37c35
http://karpathy.github.io/2026/02/12/microgpt/
http://karpathy.github.io/2016/09/07/phd/

GitHub 项目：
https://github.com/karpathy/micrograd
https://github.com/karpathy/makemore
https://github.com/karpathy/nanoGPT
https://github.com/karpathy/llm.c
https://github.com/karpathy/nn-zero-to-hero
https://github.com/karpathy/minGPT

论文（下载PDF上传）：
https://arxiv.org/abs/1706.03762  (Attention Is All You Need)
https://arxiv.org/abs/1502.03167  (Batch Normalization)
https://arxiv.org/abs/1512.03385  (ResNet)
```

---

## 📊 来源统计

| 类型 | 数量 | 占 NotebookLM 50源限额 |
|------|------|----------------------|
| YouTube 视频 | 12 | 24% |
| 博客文章 | 7 | 14% |
| GitHub 项目 | 6 | 12% |
| 论文 PDF | 5 | 10% |
| **合计** | **30** | **60%**（还有 20 个名额可扩展） |

---

*Karpathy 官方主页：[karpathy.ai](https://karpathy.ai) | GitHub：[github.com/karpathy](https://github.com/karpathy) | YouTube：[youtube.com/andrejkarpathy](https://www.youtube.com/andrejkarpathy)*
