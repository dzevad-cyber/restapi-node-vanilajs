const fs = require('fs').promises;

exports.writeFile = async (filename, data) => {
  await fs.writeFile(filename, JSON.stringify(data), 'utf-8');
};

exports.readFile = async (filename) => JSON.parse(await fs.readFile(filename));

exports.bodyParser = (req) =>
  new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', () => resolve(body));
    } catch (err) {
      reject(err);
    }
  });
