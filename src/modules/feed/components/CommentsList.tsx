import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCommentsForArticleQuery } from '../api/repository';
import { CommentsItem, NewComment } from './index';

interface CommentsListProps {}

const CommentsList: FC<CommentsListProps> = ({}) => {
  const { slug } = useParams();

  const { data, isLoading } = useGetCommentsForArticleQuery({ slug: slug! });
  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (data?.comments.length === 0) {
    return (
      <div className="w-3/6 mx-auto mt-6">
        <NewComment slug={slug!} />
        <p className="mt-6">No comments found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl	mx-auto mt-16 flex flex-col gap-3">
      <NewComment slug={slug!} />
      {data?.comments.map((comment) => (
        <CommentsItem
          key={`comment-${comment.id}`}
          body={comment.body}
          author={comment.author}
          publishedAt={comment.createdAt}
          slug={slug!}
          commentId={comment.id}
        />
      ))}
    </div>
  );
};

export default CommentsList;
