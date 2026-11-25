# makefun-news-image-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/edisonradit93/makefun-news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/edisonradit93/makefun-news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

Submission for the **make.fun `news-image-20261125`** competition ("World News — 25 November 2026" visual pipeline).

## Overview

`main.ts` executes `pipeline.ts`, which:

1. Reads `entry.png` from `process.env.MAKEFUN_BOT_DIR || import.meta.dirname` (supporting a read-only `/bot` mount).
2. Validates PNG or JPEG magic bytes and computes the payload SHA-256 digest.
3. Measures execution duration and throughput using `process.hrtime.bigint()`.
4. Writes `entry.png` and `manifest.json` exclusively to `process.env.MAKEFUN_OUTPUT_DIR || '/output'`.

## Usage

```bash
MAKEFUN_OUTPUT_DIR=out node main.ts
```
