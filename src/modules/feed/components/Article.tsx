import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteButton, TagList } from './index';
import { FeedArticle } from '../api/dto/global-feed';
import { ArticleAuthor } from './index';

interface ArticleProps extends FeedArticle {}

const Article: FC<ArticleProps> = ({
  author,
  createdAt,
  favoritesCount,
  title,
  tagList,
  description,
  favorited,
  slug,
}) => {
  return (
    <article>
      <div className="border-t border-black/10 py-6">
        <div className="mb-4 font-light flex justify-between">
          <ArticleAuthor author={author} publishedAt={createdAt} />
          <FavoriteButton
            count={favoritesCount}
            slug={slug}
            isFavorited={favorited}
          />
        </div>
        <Link
          to={`/article/${encodeURIComponent(slug)}`}
          className="hover:no-underline"
        >
          <h1 className="mb-1 font-semibold text-2xl ">{title}</h1>
          <p className="t font-light mb-1">{description}</p>
        </Link>
        <div className="flex justify-between">
          <Link
            to={`/article/${encodeURIComponent(slug)}`}
            className="hover:no-underline"
          >
            <span className="text-gray-500 text-date font-light">
              Read more...
            </span>
          </Link>
          <TagList list={tagList} />
        </div>
      </div>
    </article>
  );
};

export default Article;
