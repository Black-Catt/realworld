import { FC } from 'react';
import { useGetSingleArticleQuery } from '../api/repository';
import {
  ArticleBanner,
  ArticleMeta,
  CommentsList,
  TagList,
} from '../components';
import { useParams } from 'react-router-dom';
import { Container } from '../../../common/components';
import MDEditor from '@uiw/react-md-editor';

interface ArticlePageProps {}

const ArticlePage: FC<ArticlePageProps> = ({}) => {
  const { slug } = useParams();

  const convertNewLines = (body: string) => {
    return body.split('\\n').join('');
  };

  const { data, isLoading, error } = useGetSingleArticleQuery({ slug: slug! });

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <p>Article not found</p>;
  }

  return (
    <>
      <ArticleBanner
        title={data.article.title}
        author={data.article.author}
        publishedAt={data.article.createdAt}
        likes={data.article.favoritesCount}
        slug={slug!}
        isFavorited={data.article.favorited}
      />
      <Container>
        <div className="pb-8 border-b mb-6">
          <MDEditor.Markdown
            className="mb-8"
            source={convertNewLines(data.article.body)}
          />
          <TagList list={data.article.tagList} />
        </div>
        <div className="flex justify-center">
          <ArticleMeta
            author={data.article.author}
            publishedAt={data.article.createdAt}
            likes={data.article.favoritesCount}
            slug={slug!}
            isFavorited={data.article.favorited}
          />
        </div>
        <CommentsList />
      </Container>
    </>
  );
};

export default ArticlePage;
