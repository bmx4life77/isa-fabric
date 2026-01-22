import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

export function validateTelemetry(filePath: string) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Telemetry file not found: ${fullPath}`);
  }

  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  // Load telemetry schema
  const schemaPath = path.resolve(__dirname, '../schemas/telemetry.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error('Telemetry validation errors:', validate.errors);
    throw new Error('Telemetry failed schema validation.');
  }

  return data;
}
