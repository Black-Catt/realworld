import { FC } from 'react';
import { Container } from '../../../common/components';
import { Author } from '../api/dto/global-feed';
import { ArticleMeta } from './index';

interface ArticleBannerProps {
  title: string;
  author: Author;
  likes: number;
  publishedAt: string;
  slug: string;
  isFavorited: boolean;
}

const ArticleBanner: FC<ArticleBannerProps> = ({
  title,
  author,
  likes,
  publishedAt,
  slug,
  isFavorited,
}) => {
  return (
    <div className="bg-stone-700 pt-8 pb-4 mb-8">
      <Container>
        <h1 className="text-white text-2xl font-semibold leading-7 mb-8">
          {title}
        </h1>
        <ArticleMeta
          author={author}
          likes={likes}
          publishedAt={publishedAt}
          slug={slug}
          isFavorited={isFavorited}
          authorNameStyle="LIGHT"
        />
      </Container>
    </div>
  );
};

export default ArticleBanner;
