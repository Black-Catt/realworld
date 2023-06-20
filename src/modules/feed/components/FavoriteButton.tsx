import { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { Button } from '../../../common/components';
import { useAuth } from '../../auth/hooks/useAuthState';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../core/routes';
import {
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} from '../api/repository';
import { toast } from 'react-hot-toast';

interface FavoriteButtonProps {
  count: number;
  slug: string;
  isFavorited: boolean;
  extended?: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  count,
  slug,
  isFavorited,
  extended = false,
}) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [triggerFavoriteMutation, { isLoading }] = useFavoriteArticleMutation();
  const [triggerUnFavoriteMutation, unFavoriteMutationState] =
    useUnFavoriteArticleMutation();

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      navigate(routes.signIn.path);
      return;
    }

    try {
      if (isFavorited) {
        await triggerUnFavoriteMutation({ slug }).unwrap();
      } else {
        await triggerFavoriteMutation({ slug }).unwrap();
      }
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Button
      btnStyle="GREEN"
      variant={isFavorited ? 'BASE' : 'OUTLINE'}
      onClick={handleFavoriteClick}
      disabled={isLoading}
    >
      <div className="flex items-center">
        <AiOutlineHeart />
        <span className="ml-1 font-normal">
          {extended && 'Favorite Article ('}
          {count}
          {extended && ')'}
        </span>
      </div>
    </Button>
  );
};
export default FavoriteButton;
