import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { Article } from '@/types/Article';
import { MicroCMSResponse } from '@/types/MicroCMSResponse';
import { getFormatedDate } from '@/utils/getFormatedDate';
import { replaceHtmltagToPlainStr } from '@/utils/replaceHtmltagToPlainStr';

import styles from '@/styles/ArticleDetail.module.css';

type ArticleIdProps = {
  metaDesc: string
  article: Article
}

interface PageParams extends ParsedUrlQuery {
  id: string
}

export default function ArticleId({ metaDesc, article }: ArticleIdProps) {
  return (
    <main>
      <Head>
        <title>{ article.title } | smallpine8 blog</title>
        <meta name="description" content={ metaDesc }></meta>
      </Head>
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
  const article = await fetch(reqUrl, key)
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

  const paths = article.contents.map((article) => `/article/${article.id}`);

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
  const article = await fetch(reqUrl, key)
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

  const { createdAt } = article;
  const date = new Date(createdAt);
  const formatedDate = getFormatedDate(date);
  article.createdAt = formatedDate;

  const plainStr = replaceHtmltagToPlainStr(article.contents);
  const metaDesc = plainStr.substr(0, 117) + '...';
  return {
    props: {
      metaDesc,
      article
    }
  }
}