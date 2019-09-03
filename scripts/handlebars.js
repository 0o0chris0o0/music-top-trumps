import Handlebars from 'handlebars';
import fs from 'fs-extra';

import clean from './clean';
import createDir from './createDir';

import paths from '../config/paths';

function getPartialFiles() {
  // gets all filenames from 'src/partials'
  return new Promise(resolve => {
    fs.readdir('src/partials', (err, files) => {
      resolve(files);
    });
  });
}

function readPartial(file, cb) {
  // reads each partial and returns the source
  fs.readFile(`src/partials/${file}`, 'utf-8', (error, source) => {
    cb(source);
  });
}

function getPartials(files) {
  return new Promise(resolve => {
    const requests = files.map(filename => {
      return new Promise(resolve2 => {
        readPartial(filename, resolve2);
      });
    });

    Promise.all(requests).then(partials => {
      resolve(partials);
    });
  });
}

async function handlebars() {
  const files = await getPartialFiles();
  const partials = await getPartials(files);

  const partialObj = {};
  partials.forEach((partial, i) => {
    partialObj[files[i].replace('.handlebars', '')] = partial;
  });
  Handlebars.registerPartial(partialObj);

  await clean();
  await createDir();

  const html = new Promise((resolve, reject) => {
    fs.readFile(
      paths[process.env.PHP ? 'templatePhp' : 'templateHtml'],
      'utf-8',
      (error, source) => {
        if (error) {
          reject(error);
        } else {
          const template = Handlebars.compile(source);
          const compiledHtml = template();

          resolve(compiledHtml);
        }
      }
    );
  });

  html
    .then(compiledHtml => {
      fs.writeFile(paths[process.env.PHP ? 'appPhp' : 'appHtml'], compiledHtml, err => {
        if (err) {
          throw err;
        }
      });
    })
    .catch(error => {
      throw error;
    });
}

export default handlebars;
