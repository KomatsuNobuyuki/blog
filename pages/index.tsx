import Link from 'next/link';
import { Article } from '@/types/Article';
import { getFormatedDate } from '@/utils/getFormetedDate';

type HomeProps = {
  articles: Article[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <div>
      <ul>
        {articles.map(article => {
          const { createdAt } = article;
          const date = new Date(createdAt);
          const formatedDate = getFormatedDate(date);
          const contents = article.contents;
          const regex = /<("[^"]*"|'[^']*'|[^'">])[^<>]*>/g;
          const removedHtmlTagsContents = contents.replace(regex, '');
          return (
          <li key={article.id} className="border-light border-b-2 mt-4 first:mt-0">
            <Link href={`/article/${article.id}`}>
              <a className="pb-8 block hover:opacity-70">
                <h2 className="text-2xl">{article.title}</h2>
                <div className="mt-4">
                  <p>{formatedDate}</p>
                  <p className="mt-4 line-clamp-2">{removedHtmlTagsContents}</p>
                </div>
              </a>
            </Link>
          </li>
          )
        })}
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