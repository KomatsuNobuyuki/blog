module.exports = (async function() {
  const configureLHCI = {
    ci: {
      collect: {
        url: ['http://localhost:3000/'],
        startServerCommand: 'npm start'
      },
      upload: {
        target: 'temporary-public-storage',
      }
    }
  }

  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    }
  }

  const reqUrl = process.env.REQUEST_URL + 'article';

  const fetchArticle = await fetch(reqUrl, key)
  .catch((e) => { console.error(e) })
  .then((res) => {
    return res.json();
  });

  fetchArticle.contents.forEach((article) => {
    const id = { article }
    const collectUrl = `http://localhost:3000/article/${id}`;
    configureLHCI.ci.collect.url.push(collectUrl);
  });
  console.log(`configure: ${configureLHCI.ci.collect.url}`);
  return configureLHCI;
})();