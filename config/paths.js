import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPublic: resolveApp('http'),
  appHtml: resolveApp('http/index.html'),
  appPhp: resolveApp('http/index.php'),
  templateHtml: resolveApp('src/template.html'),
  templatePhp: resolveApp('src/template.php'),
  appIndexJs: resolveApp('src/js/main.js'),
  yarnLockFile: resolveApp('yarn.lock'),
  appPackageJson: resolveApp('package.json')
};
