import { runPipeline } from './pipeline.ts';

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR || import.meta.dirname;
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  console.log(`[news-image-20261125] Starting visual pipeline (botDir=${botDir}, outputDir=${outputDir})`);

  const result = runPipeline();
  console.log(
    `[news-image-20261125] Completed in ${result.durationMs}ms (${result.throughputMBps} MB/s) -> ${result.outputPath}`
  );
  console.log(
    JSON.stringify({
      status: 'ok',
      format: result.format,
      bytes: result.bytes,
      sha256: result.sha256,
      durationMs: result.durationMs,
      throughputMBps: result.throughputMBps,
      outputPath: result.outputPath,
    })
  );
}

main();
