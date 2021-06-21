import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Article } from '@/types/Article';
import { MicroCMSResponse } from '@/types/MicroCMSResponse';

type ArticleIdProps = {
  article: Article
}

interface PageParams extends ParsedUrlQuery {
  id: string
}

export default function ArticleId({ article }: ArticleIdProps) {
  return (
    <main>
      <h1>{article.title}</h1>
      <p>{article.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: article.contents }} />
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

      return res.json();
    });

  return {
    props: {
      article: fetchArticle
    }
  }
}