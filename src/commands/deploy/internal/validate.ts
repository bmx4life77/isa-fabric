import fs from "fs";
import { ZodSchema } from "zod";

export function fileExists(path: string): boolean {
  try {
    return fs.existsSync(path);
  } catch {
    return false;
  }
}

export function loadJson(path: string): any {
  const raw = fs.readFileSync(path, "utf-8");
  return JSON.parse(raw);
}

export function validateSchema<T>(schema: ZodSchema<T>, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) { 
     throw new Error("Schema validation failed: " + JSON.stringify(result.error.issues, null, 2));
   }
   return result.data;
}