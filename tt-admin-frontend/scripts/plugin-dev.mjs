#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function logError(message) {
  console.error(`[plugin:dev] ${message}`);
}

function parsePluginId(pluginYamlPath) {
  if (!fs.existsSync(pluginYamlPath)) return null;
  const content = fs.readFileSync(pluginYamlPath, 'utf8');
  const lines = content.split(/\r?\n/);
  let inPluginSection = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    if (!rawLine.startsWith(' ') && line.endsWith(':')) {
      inPluginSection = line.slice(0, -1) === 'plugin';
      continue;
    }
    if (inPluginSection && line.startsWith('id:')) {
      return line.replace('id:', '').trim();
    }
  }
  return null;
}

function findPluginUiDir(pluginId) {
  const backendRoot = path.resolve(__dirname, '../tt-admin-backend/tt-admin-plugins');
  if (!fs.existsSync(backendRoot)) {
    throw new Error(`未找到插件目录: ${backendRoot}`);
  }

  const candidates = fs.readdirSync(backendRoot).map(name => path.join(backendRoot, name));
  for (const candidate of candidates) {
    const stat = fs.statSync(candidate);
    if (!stat.isDirectory()) continue;
    const yamlPath = path.join(candidate, 'src/main/resources/plugin.yaml');
    const id = parsePluginId(yamlPath);
    if (id === pluginId) {
      const uiDir = path.join(candidate, 'ui');
      if (!fs.existsSync(uiDir)) {
        throw new Error(`插件 ${pluginId} 未找到 ui 目录: ${uiDir}`);
      }
      return uiDir;
    }
  }

  return null;
}

function runDevServer(targetDir) {
  const child = spawn('pnpm', ['run', 'dev'], {
    cwd: targetDir,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  child.on('exit', code => {
    process.exit(code ?? 0);
  });
}

function main() {
  const [, , pluginId] = process.argv;
  if (!pluginId) {
    logError('请提供插件 ID，例如：pnpm plugin:dev tt-plugin-demo');
    process.exit(1);
  }

  try {
    const uiDir = findPluginUiDir(pluginId);
    if (!uiDir) {
      logError(`未找到插件 ${pluginId} 对应的工程，请确认插件已在 tt-admin-plugins 中注册并包含 plugin.yaml`);
      process.exit(1);
    }

    console.info(`[plugin:dev] 启动插件 ${pluginId} 前端服务，路径：${uiDir}`);
    runDevServer(uiDir);
  } catch (error) {
    logError(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
