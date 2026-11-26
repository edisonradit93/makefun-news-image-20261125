import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export interface PipelineResult {
  sourcePath: string;
  outputPath: string;
  format: 'png' | 'jpeg';
  bytes: number;
  sha256: string;
  durationMs: number;
  throughputMBps: number;
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function detectImageFormat(buffer: Buffer): 'png' | 'jpeg' {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(PNG_MAGIC)) {
    return 'png';
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }
  throw new Error('Invalid image header: expected PNG or JPEG magic bytes');
}

export function runPipeline(): PipelineResult {
  const startNs = process.hrtime.bigint();
  const botDir = process.env.MAKEFUN_BOT_DIR || import.meta.dirname;
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

  const sourcePath = path.join(botDir, 'entry.png');
  const outputPath = path.join(outputDir, 'entry.png');

  const payload = fs.readFileSync(sourcePath);
  const format = detectImageFormat(payload);
  const sha256 = crypto.createHash('sha256').update(payload).digest('hex');

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, payload);

  const elapsedNs = process.hrtime.bigint() - startNs;
  const durationMs = Number(elapsedNs) / 1_000_000;
  const elapsedSec = Math.max(Number(elapsedNs) / 1_000_000_000, 1e-9);
  const throughputMBps = Number((payload.length / (1024 * 1024) / elapsedSec).toFixed(2));

  return {
    sourcePath,
    outputPath,
    format,
    bytes: payload.length,
    sha256,
    durationMs: Number(durationMs.toFixed(3)),
    throughputMBps,
  };
}
