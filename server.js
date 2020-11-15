require('dotenv').config({ path: `${__dirname}/secrets.env` });

const http = require('http');

const server = http.createServer((req, res) => {
  console.log('hello world');
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port ${port}`));
