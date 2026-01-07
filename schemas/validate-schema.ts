import Ajv from "ajv";
import fs from "fs";

export function validate(schemaPath: string, dataPath: string) {
  const ajv = new Ajv();
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const valid = ajv.validate(schema, data);

  return { valid, errors: ajv.errors };
}
