
# ⚡ Contributing to the ISA Fabric CLI

Thank you for considering contributing to the ISA Fabric CLI — the unified command-line interface powering governance evaluation, benchmarking, semantic annotation, and resilience research in the ISA Fabric ecosystem.

This guide explains how to contribute new commands, fix bugs, extend command groups, improve documentation, or add governance/lattice integrations. All contributions must align with the project's constitutional principles (Genesis Governance v4.0) and maintain modularity, determinism, and auditability.

---

## 📋 Before You Start

1. **Read the Constitution**  
   Familiarize yourself with **Genesis Governance v4.0** and the **Governance Benchmarking Lattice v1.0**.  
   CLI changes that affect governance evaluation, lattice scoring, or stress modifiers **must** preserve metric authority (ψ₅ & SE only) and non-regression guarantees.

2. **Check Existing Issues**  
   Browse [open issues](https://github.com/bmx4life77/isa-fabric/issues) — especially those tagged `cli`, `governance`, or `help-wanted`.

3. **Discuss First (Recommended)**  
   For new features, large refactors, or governance-related commands:  
   - Open a discussion in [Discussions](https://github.com/bmx4life77/isa-fabric/discussions)  
   - Or comment on an existing issue

---

## 🛠️ Development Setup

```bash
# Clone & install
git clone https://github.com/bmx4life77/isa-fabric.git
cd isa-fabric
npm install --legacy-peer-deps

# Build & link globally (recommended for development)
npm run build
npm link
```

Verify:
```bash
isa --help
```

You should see the full command tree.

---

## 📂 Project Structure (CLI-Relevant)

```
isa-fabric/
├── src/
│   ├── cli/
│   │   ├── commands/               # ← New command groups live here
│   │   │   ├── governance/
│   │   │   ├── benchmark/
│   │   │   └── ... (one folder per top-level command)
│   │   ├── index.ts                # Registers all commands
│   │   └── isaCli.ts               # Commander.js entry point
│   ├── governance/                 # Core logic (evaluator, simulator, lattice)
│   ├── utils/
│   │   └── natspecParser.ts        # NatSpec++ parsing (used by tags)
│   └── schemas/                    # Zod schemas for envelopes
├── test/                           # Mocha/Chai tests (cli/ & governance/)
└── docs/                           # CLI docs & governance lattice
```

---

## Adding or Improving CLI Features

### 1. Adding a New Top-Level Command Group

Example: Adding `isa resilience report`

1. Create folder:  
   `src/cli/commands/resilience/`

2. Create `index.ts`:
   ```ts
   import { Command } from 'commander';

   export default function register(program: Command) {
     program
       .command('resilience')
       .description('Resilience envelope and drift reporting')
       .command('report')
       .description('Generate resilience report from lattice evaluation')
       .argument('<envelope>', 'Path to governance envelope JSON')
       .option('--format <fmt>', 'pretty | json | markdown', 'pretty')
       .action(async (envelopePath, options) => {
         // Your logic here (call governance/evaluator.ts, etc.)
         console.log(`Generating resilience report for ${envelopePath}...`);
       });
   }
   ```

3. Register in `src/cli/index.ts`:
   ```ts
   import resilience from './commands/resilience';
   resilience(program);
   ```

4. Rebuild & test:
   ```bash
   npm run build
   isa resilience report example.json --help
   ```

### 2. Adding a Subcommand to an Existing Group

Example: Add `isa governance diff <A> <B>`

- Edit `src/cli/commands/governance/index.ts`  
- Add the new `.command('diff')` block  
- Implement diff logic (e.g. compare lattice scores, stress modifiers, envelope fields)

### 3. Improving Governance Evaluation / Lattice Integration

- All governance scoring logic lives in `src/governance/evaluator.ts`  
- Add new lattice axes/vertices there first  
- Then expose via CLI: `isa governance evaluate --axis 11` or `--with-new-lattice`

### 4. Writing Tests

Place tests in `test/cli/` or `test/governance/`.

Example (Mocha/Chai):
```ts
describe('governance evaluate', () => {
  it('scores basic proposal correctly', async () => {
    // Mock envelope, call evaluator, assert scores
  });
});
```

Run:
```bash
npm test
```

---

## 🎯 Contribution Checklist

- [ ] Code aligns with Genesis Governance v4.0 (no metric authority leakage)
- [ ] New commands are hierarchical and consistent (`isa <group> <action>`)
- [ ] Flags follow global pattern (`--file`, `--out`, `--json`, `--verbose`)
- [ ] Documentation updated (README, wiki CLI Reference)
- [ ] Tests added/updated
- [ ] No lint errors (`npm run lint` if configured)
- [ ] Build passes (`npm run build`)
- [ ] Tested locally (`isa <your-command> --help`)

---

## 📤 Submitting Your Contribution

1. Fork & branch: `git checkout -b feature/governance-report-command`
2. Commit clearly: `git commit -m "feat: add governance diff subcommand"`
3. Push & open PR against `main`
4. Fill PR template (title, description, linked issues, screenshots if UI-related)

---

## 💬 Where to Get Help

- Open an issue: [github.com/bmx4life77/isa-fabric/issues](https://github.com/bmx4life77/isa-fabric/issues)
- Start a discussion: [Discussions tab](https://github.com/bmx4life77/isa-fabric/discussions)
- Ask in the wiki: Comment on the CLI Reference page

All contributions are governed by the Apache 2.0 license and must respect the constitutional boundaries of ISA Fabric.

Thank you for helping build a more resilient governance research ecosystem.

— ISA Fabric Initiative & the ISA Fabric contributors



📄 License

Apache 2.0

ISA Fabric © 2026 — All rights reserved.

See LICENSE for full terms.



