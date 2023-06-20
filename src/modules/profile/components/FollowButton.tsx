import { ComponentProps, FC } from 'react';
import { Button } from '../../../common/components';
import { ButtonStyleEnum } from '../../../common/components/Button';
import { toast } from 'react-hot-toast';
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '../api/repository';

interface FollowButtonProps {
  username: string;
  isFollowed: boolean;
  btnStyle?: ComponentProps<typeof Button>['btnStyle'];
}

const FollowButton: FC<FollowButtonProps> = ({
  username,
  isFollowed,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const [triggerFollow] = useFollowUserMutation();
  const [triggerUnfollow] = useUnFollowUserMutation();

  const toggleFollow = () => {
    try {
      if (!isFollowed) {
        triggerFollow({ username: encodeURIComponent(username) }).unwrap();
      } else {
        triggerUnfollow({ username: encodeURIComponent(username) }).unwrap();
      }
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Button onClick={toggleFollow} btnStyle={btnStyle}>
      {isFollowed ? 'Unfollow' : 'Follow'} {username}
    </Button>
  );
};

export default FollowButton;
