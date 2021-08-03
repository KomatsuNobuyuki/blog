import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Article } from '@/types/Article';
import { MicroCMSResponse } from '@/types/MicroCMSResponse';
import { getFormatedDate } from '@/utils/getFormatedDate';

import styles from '@/styles/ArticleDetail.module.css';

type ArticleIdProps = {
  article: Article
}

interface PageParams extends ParsedUrlQuery {
  id: string
}

export default function ArticleId({ article }: ArticleIdProps) {
  return (
    <main>
      <h1 className={ styles.articleDetailTitle }>{article.title}</h1>
      <p className={ styles.articleDetailDate }>{article.createdAt}</p>
      <div className={ styles.articleDetailBody } dangerouslySetInnerHTML={{ __html: article.contents }} />
    </main>
  );
}

export const getStaticPaths = async() => {
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    }
  }
  
  const reqUrl = process.env.REQUEST_URL + 'article';
  const fetchArticle = await fetch(reqUrl, key)
    .catch(e => {
      console.error(e)
    })
    .then(res => {
      if(!res) {
        throw new Error();
      }

      if(!res.ok) {
        throw new Error();
      }

      return res.json() as Promise<MicroCMSResponse<Article>>;
    });

  const paths = fetchArticle.contents.map((article) => `/article/${article.id}`);

  return { paths, fallback: false };
}

export const getStaticProps = async (context: GetStaticPropsContext<PageParams>) => {
  const id = context.params?.id
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY
    }
  }

  const reqUrl = process.env.REQUEST_URL + 'article/' + id;
  const fetchArticle = await fetch(reqUrl, key)
    .catch(e => {
      console.error(e)
    })
    .then(res => {
      if(!res) {
        throw new Error();
      }

      if(!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json() as Promise<Article>;
    });

  const { createdAt } = fetchArticle;
  const date = new Date(createdAt);
  const formatedDate = getFormatedDate(date);
  fetchArticle.createdAt = formatedDate;
  return {
    props: {
      article: fetchArticle
    }
  }
}