import Link from 'next/link';
import { Article } from '@/types/Article';
import { MicroCMSResponse } from '@/types/MicroCMSResponse';
import { getFormatedDate } from '@/utils/getFormatedDate';

import styles from '@/styles/ArticleList.module.css';

type HomeProps = {
  articles: Article[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <div>
      <ul>
        {articles.map(article => {
          return (
          <li key={article.id} className={ styles.articleListItem }>
            <Link href={`/article/${article.id}`}>
              <a className={ styles.articleListLink }>
                <h2 className={ styles.articleListTitle }>{article.title}</h2>
                <div className={ styles.wrapArticleListContents }>
                  <p>{article.createdAt}</p>
                  <p className={ styles.articleListContent }>{article.contents}</p>
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

      return res.json() as Promise<MicroCMSResponse<Article>>;
    });

    const articles = fetchArticle.contents.map((article: Article) => {
      const { createdAt } = article;
      const date = new Date(createdAt);
      const formatedDate = getFormatedDate(date);

      article.createdAt = formatedDate;
      const regex = /<("[^"]*"|'[^']*'|[^'">])[^<>]*>/g;
      const removedHtmlTagsContents = article.contents.replace(regex, '');
      article.contents = removedHtmlTagsContents;

      return article;
    });

  return {
    props: {
      articles,
    }
  }
}