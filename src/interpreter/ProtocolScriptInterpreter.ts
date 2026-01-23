// src/interpreter/ProtocolScriptInterpreter.ts

import { TagProfileValidator, TagSet } from "../shared/validation/TagProfileValidator";
import { FabricAdapter } from "./FabricAdapter";
import type { Contract } from "ethers";

interface MethodEntry {
  name: string;
  signature: string;
  tags?: TagSet;
}

interface ContractEntry {
  methods: Record<string, MethodEntry>;
}

interface TagBankType {
  contracts: Record<string, ContractEntry>;
}

// Load TagBank dynamically from artifacts
import fs from "fs";
import path from "path";


export class ProtocolScriptInterpreter {
  private validator: TagProfileValidator;

  constructor() {
    this.validator = new TagProfileValidator();
  }

  // ---------------------------------------------------------------------
  // HELPER: LOAD THE TAG BANK
  // ---------------------------------------------------------------------
  private loadTagBank(): TagBankType {
    const tagBankPath = path.join(process.cwd(), "artifacts", "tag-bank.json");

    if (!fs.existsSync(tagBankPath)) {
      console.warn("⚠ No tag-bank.json found. Returning empty tag bank.");
      return { contracts: {} };
    }

    const raw = fs.readFileSync(tagBankPath, "utf8");
    return JSON.parse(raw);
  }

  // ---------------------------------------------------------------------
  // GET TAGS FOR A GIVEN CONTRACT + METHOD
  // ---------------------------------------------------------------------
  getTagsForMethod(contract: Contract, method: string): TagSet {
    const tagBank = this.loadTagBank();

    const name = contract?.deploymentTransaction()?.name || contract?.name || "UnknownContract";

    const cEntry = tagBank.contracts[name];
    if (!cEntry) {
      console.warn(`⚠ No tag entry found for contract: ${name}`);
      return this.emptyTagSet();
    }

    const mEntry = cEntry.methods[method];
    if (!mEntry || !mEntry.tags) {
      console.warn(`⚠ No tag entry for ${name}.${method}`);
      return this.emptyTagSet();
    }

    return this.normalizeTagSet(mEntry.tags);
  }

  // ---------------------------------------------------------------------
  // NORMALIZE TAGSET INTO STRUCTURED FORMAT
  // ---------------------------------------------------------------------
  private normalizeTagSet(raw: any): TagSet {
    // Ensure that every category exists.
    return {
      security: raw.security || {},
      concurrency: raw.concurrency || {},
      metrics: raw.metrics || {},
      raw: raw.raw || {}
    };
  }

  // ---------------------------------------------------------------------
  // EXECUTE A METHOD WITH TAG-AWARE LOGIC
  // ---------------------------------------------------------------------
  async executeWithTags(contract: Contract, method: string, args: any[]): Promise<any> {
    const tags = this.getTagsForMethod(contract, method);
    const validation = this.validator.validate(tags);

    console.log(`\n🔍 TAG VALIDATION for ${method}`);
    console.log(JSON.stringify(validation, null, 2));

    if (!validation.ok) {
      console.warn("⚠ Tag validation issues detected:");
      validation.missing.forEach(tag => console.warn(`  - Missing: ${tag}`));
      validation.conflicts.forEach(conflict => console.warn(`  - Conflict: ${conflict}`));
    }

    // Create execution adapter
    const adapter = new FabricAdapter(contract);

    return adapter.execute(method, args, tags);
  }

  // ---------------------------------------------------------------------
  // GENERATE EMPTY TAGSET (NO UNDEFINED RETURNS)
  // ---------------------------------------------------------------------
  private emptyTagSet(): TagSet {
    return {
      security: {},
      concurrency: {},
      metrics: {},
      raw: {}
    };
  }
}

