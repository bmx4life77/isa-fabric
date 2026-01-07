// tools/isa.ts
#!/usr/bin/env node
import { main } from "../dist/cli/isaCli"; // after build

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
