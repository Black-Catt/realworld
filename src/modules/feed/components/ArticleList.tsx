import { FC } from 'react';
import { Article } from './index';
import { FeedArticle } from '../api/dto/global-feed';

interface ArticleListProps {
  list: FeedArticle[];
}

const ArticleList: FC<ArticleListProps> = ({ list }) => {
  return (
    <div>
      {list.map((article) => (
        <Article key={article.slug} {...article} />
      ))}
    </div>
  );
};

export default ArticleList;
