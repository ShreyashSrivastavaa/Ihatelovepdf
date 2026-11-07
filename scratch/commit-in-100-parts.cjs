const { execSync } = require('child_process');

function run() {
  const output = execSync('git status -uall --porcelain', { encoding: 'utf8' });
  const lines = output.split(/\r?\n/).filter(Boolean);
  const files = lines.map(l => l.substring(3).trim());

  if (files.length === 0) {
    console.log('No files to commit.');
    return;
  }

  console.log(`Found ${files.length} changed/untracked files. Partitioning into exactly 100 parts...`);

  function getCommitMessage(fileList, part, total) {
    const primary = fileList[0].replace(/\\/g, '/');
    let type = 'chore';
    let desc = primary;

    if (primary.startsWith('src/i18n/')) {
      type = 'i18n';
      desc = `update ${primary.split('/').pop()} localized operation catalog`;
    } else if (primary.startsWith('src/components/pdf-processor/')) {
      type = 'feat(processor)';
      desc = `optimize client-side engine and offline handling in ${primary.split('/').pop()}`;
    } else if (primary.startsWith('src/components/')) {
      type = 'feat(ui)';
      desc = `update ${primary.split('/').pop().replace(/\.tsx?$/, '')} component`;
    } else if (primary.startsWith('src/app/')) {
      type = 'feat(pages)';
      desc = `update route ${primary}`;
    } else if (primary.startsWith('public/fonts/')) {
      type = 'feat(fonts)';
      desc = `add self-hosted signature font asset ${primary.split('/').pop()}`;
    } else if (primary.startsWith('tests/fixtures/')) {
      type = 'test(fixtures)';
      desc = `add test verification fixture ${primary.split('/').pop()}`;
    } else if (primary.startsWith('tests/')) {
      type = 'test';
      desc = `update test suite ${primary.split('/').pop()}`;
    } else if (primary.startsWith('scripts/')) {
      type = 'ci(audit)';
      desc = `update audit and verification script ${primary.split('/').pop()}`;
    } else if (primary.startsWith('scratch/')) {
      type = 'test(audit-logs)';
      desc = `record audit test artifacts for ${primary.split('/').pop().replace(/\.[^.]+$/, '')}`;
    } else if (primary === 'LICENSE') {
      type = 'docs(legal)';
      desc = 'update MIT License copyright for Shreyash Srivastava';
    } else if (primary === 'README.md') {
      type = 'docs';
      desc = 'update documentation, copyright attribution and links';
    } else if (primary === 'package.json') {
      type = 'chore';
      desc = 'update author metadata and dependencies in package.json';
    } else if (primary.includes('llms')) {
      type = 'docs(llms)';
      desc = `sync ${primary} with updated privacy and offline descriptions`;
    } else if (primary.includes('route-map')) {
      type = 'feat(i18n)';
      desc = 'add localized slugs and route mapping';
    } else {
      type = 'chore';
      desc = `update ${primary}`;
    }

    if (fileList.length > 1) {
      desc += ` and ${fileList.length - 1} related file(s)`;
    }

    return `[${part}/${total}] ${type}: ${desc}`;
  }

  const parts = [];
  let idx = 0;
  for (let p = 1; p <= 100; p++) {
    const remainingParts = 100 - p + 1;
    const remainingFiles = files.length - idx;
    const take = Math.ceil(remainingFiles / remainingParts);
    const partFiles = files.slice(idx, idx + take);
    idx += take;
    parts.push(partFiles);
  }

  for (let i = 0; i < parts.length; i++) {
    const partNum = i + 1;
    const partFiles = parts[i];
    const msg = getCommitMessage(partFiles, partNum, 100);

    for (const f of partFiles) {
      execSync(`git add "${f}"`, { stdio: 'inherit' });
    }

    execSync(`git commit -m "${msg.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    console.log(`Committed part ${partNum}/100: ${msg}`);
  }

  console.log('\nAll 100 commits created successfully.');
  console.log('Now pushing to remote origin/main...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('Push completed successfully!');
}

run();

