import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import cheerio from 'cheerio';
import { getHighlighter } from 'shiki';
import { Article } from '@/types/Article';
import { MicroCMSResponse } from '@/types/MicroCMSResponse';
import { getFormatedDate } from '@/utils/getFormatedDate';
import { replaceHtmltagToPlainStr } from '@/utils/replaceHtmltagToPlainStr';

import styles from '@/styles/ArticleDetail.module.css';

type ArticleIdProps = {
  metaDesc: string,
  htmlElm: string,
  article: Article
}

interface PageParams extends ParsedUrlQuery {
  id: string
}

export default function ArticleId({ metaDesc, htmlElm, article }: ArticleIdProps) {
  return (
    <main>
      <Head>
        <title>{ article.title } | smallpine8 blog</title>
        <meta name="description" content={ metaDesc }></meta>
      </Head>
      <h1 className={ styles.articleDetailTitle }>{article.title}</h1>
      <p className={ styles.articleDetailDate }>{article.createdAt}</p>
      <div className={ styles.articleDetailBody } dangerouslySetInnerHTML={{ __html: htmlElm }} />
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
  const highlighter = await getHighlighter({ theme: 'nord' });

  const $ = cheerio.load(article.contents);
  $('pre').each((_, elm) => {
    let lang;
    let text = $(elm).text();
    // CMSのコンテンツ側のコードブロック行頭に「!! 言語名」という文字列を入れそいつを抜き取ってハイライトの言語名を指定
    const regExp = /\!\! \w*/;
    if(text.match(regExp)) {
      lang = text.match(regExp)![0].substr(3);
      text = text.replace(regExp, '').replace(/\s/, '');
    }
    const hlElem = lang ? highlighter.codeToHtml(text, lang) : highlighter.codeToHtml(text);
    $(elm).html(hlElem);
  });
  const htmlElm = $.html();
  return {
    props: {
      metaDesc,
      htmlElm,
      article
    }
  }
}