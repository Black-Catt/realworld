import { FC, ComponentProps } from 'react';
import { NameStyleEnum } from './ArticleAuthor';
import { ArticleAuthor } from './index';
import { Author } from '../api/dto/global-feed';
import { useDeleteCommentMutation } from '../api/repository';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../auth/hooks/useAuthState';
import { FaTrashAlt } from 'react-icons/fa';

interface CommentsMetaProps {
  commentId: number;
  author: Author;
  publishedAt: string;
  slug: string;
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
  authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
  authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
}

const CommentsMeta: FC<CommentsMetaProps> = ({
  commentId,
  authorNameStyle = NameStyleEnum.LIGHT,
  author,
  publishedAt,
  authorDirection,
  authorNameSize,
  slug,
}) => {
  const auth = useAuth();
  const [triggerDeleteComment, { isLoading }] = useDeleteCommentMutation();

  const deleteComment = async () => {
    try {
      await triggerDeleteComment({ articleSlug: slug, id: commentId }).unwrap();
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };
  const isAuthor = auth.user?.username === author.username;

  return (
    <div className="flex justify-between items-center">
      <ArticleAuthor
        author={author}
        publishedAt={publishedAt}
        nameStyle={authorNameStyle}
        direction={authorDirection}
        nameSize={authorNameSize}
      />

      {isAuthor && (
        <button onClick={deleteComment} disabled={isLoading}>
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default CommentsMeta;
