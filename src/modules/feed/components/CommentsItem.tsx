import { FC } from 'react';
import { Author } from '../api/dto/global-feed';
import { CommentsMeta } from './index';

interface CommentsItemProps {
  body: string;
  author: Author;
  publishedAt: string;
  slug: string;
  commentId: number;
}

const CommentsItem: FC<CommentsItemProps> = ({
  body,
  author,
  publishedAt,
  slug,
  commentId,
}) => {
  return (
    <div className="border  rounded">
      <div className="p-5">
        <p>{body}</p>
      </div>
      <div className="border-t  bg-gray-150 py-3 px-5">
        <CommentsMeta
          authorNameStyle="GREEN"
          author={author}
          publishedAt={publishedAt}
          authorDirection="ROW"
          authorNameSize="SM"
          slug={slug}
          commentId={commentId}
        />
      </div>
    </div>
  );
};

export default CommentsItem;
