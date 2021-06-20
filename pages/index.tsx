import Link from 'next/link';
import { Article } from '@/types/Article';

type HomeProps = {
  articles: Article[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <div>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link href={`/article/${article.id}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async() => {
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    }
  }

  const reqUrl = process.env.REQUEST_URL + 'article';

  const fetchArticle = await fetch(reqUrl, key)
    .catch((e) => { console.error(e) })
    .then((res) => {
      if(!res) {
        throw new Error();
      }

      if(!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    });

  return {
    props: {
      articles: fetchArticle.contents,
    }
  }
}