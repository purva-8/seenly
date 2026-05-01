const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const accept = req.headers['accept'] || '';

  if (accept.includes('text/markdown')) {
    const md = fs.readFileSync(path.join(process.cwd(), 'index.md'), 'utf-8');
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.send(md);
  } else {
    const html = fs.readFileSync(path.join(process.cwd(), '_index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }
};
