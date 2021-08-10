const fetch = require('node-fetch');

async function main() {
  const urls = ['http://localhost:3000/'];

  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    }
  }

  const reqUrl = process.env.REQUEST_URL + 'article';

  const fetchArticle = await fetch(reqUrl, key)
  .then((res) => {
    return res.json()
  });

  fetchArticle.contents.forEach((article) => {
    const { id } = article;
    const collectUrl = `--collect.url=http://localhost:3000/article/${id}`;
    urls.push(collectUrl);
  });

  process.stdout.write(urls.join('\n'));
  process.exit(0);
}

main().catch(err => {
  process.stderr.write(err.stack);
  process.exit(1);
});