import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

type SectionRecord = Record<string, string>;

interface SimpleYaml {
  plugin?: SectionRecord;
  author?: SectionRecord;
}

const pluginYamlPath = path.resolve(__dirname, '../src/main/resources/plugin.yaml');

function parseSimpleYaml(filePath: string): SimpleYaml {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const result: SimpleYaml = {};
  let currentSection: keyof SimpleYaml | undefined;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const isSection = !line.startsWith(' ') && trimmed.endsWith(':');
    if (isSection) {
      const sectionName = trimmed.substring(0, trimmed.length - 1);
      if (sectionName === 'plugin' || sectionName === 'author') {
        currentSection = sectionName;
        result[currentSection] = {};
      } else {
        currentSection = undefined;
      }
      return;
    }

    if (currentSection && trimmed.includes(':')) {
      const [key, ...rest] = trimmed.split(':');
      result[currentSection]![key.trim()] = rest.join(':').trim();
    }
  });

  return result;
}

function resolveDevPort(devAddress?: string) {
  if (!devAddress) return undefined;
  try {
    const url = new URL(devAddress);
    return Number(url.port) || undefined;
  } catch {
    return undefined;
  }
}

const pluginSetting = parseSimpleYaml(pluginYamlPath);
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: devPort ?? 5177,
    host: '0.0.0.0',
    cors: true,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
