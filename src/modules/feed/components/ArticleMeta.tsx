import { ComponentProps, FC } from 'react';
import { Author } from '../api/dto/global-feed';
import { FollowButton } from '../../profile/components';
import { ArticleAuthor, FavoriteButton } from './index';
import { Button } from '../../../common/components/Button';
import { useAuth } from '../../auth/hooks/useAuthState';
import { useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../api/repository';
import { toast } from 'react-hot-toast';

interface ArticleMetaProps {
  author: Author;
  publishedAt: string;
  slug: string;
  isFavorited: boolean;
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
  authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
  authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
  likes?: number;
  showActionButtons?: boolean;
}
const ArticleMeta: FC<ArticleMetaProps> = ({
  author,
  likes,
  publishedAt,
  authorNameStyle,
  authorDirection,
  authorNameSize,
  slug,
  isFavorited,
  showActionButtons = true,
}) => {
  const auth = useAuth();

  const [triggerDeleteArticle, { isLoading }] = useDeleteArticleMutation();

  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate(`/editor/${slug}`);
  };

  const deleteArticle = async () => {
    try {
      await triggerDeleteArticle({ slug }).unwrap();
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={author}
          publishedAt={publishedAt}
          nameStyle={authorNameStyle}
          direction={authorDirection}
          nameSize={authorNameSize}
        />
      </div>
      {showActionButtons && (
        <div className="inline-flex gap-4">
          {auth.user?.username === author.username ? (
            <>
              <Button btnStyle="DARK" onClick={navigateToEdit}>
                Edit Article
              </Button>
              <Button
                btnStyle="DANGER"
                onClick={deleteArticle}
                disabled={isLoading}
              >
                Delete Article
              </Button>
            </>
          ) : (
            <>
              <FollowButton
                username={author.username}
                isFollowed={author.following}
              />
              <FavoriteButton
                count={likes || 0}
                extended
                slug={slug}
                isFavorited={isFavorited}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleMeta;
