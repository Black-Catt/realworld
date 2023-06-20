import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../common/components';
import { FollowButton } from './index';
import { Profile } from '../api/dto/get-profile';
import { useAuth } from '../../auth/hooks/useAuthState';
import { Button } from '../../../common/components/Button';
import { routes } from '../../../core/routes';

interface ProfileBannerProps {
  profile: Profile;
}

const ProfileBanner: FC<ProfileBannerProps> = ({ profile }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate(routes.settings.path);
  };

  return (
    <div className="bg-gray-200 pt-8 pb-4 mb-8">
      <Container>
        <div>
          <img
            src={profile.image}
            className=" w-24 h-24 rounded-full mx-auto mb-4"
            alt={`${profile.username} avatar`}
          />
          <h2 className="text-center font-bold text-2xl">{profile.username}</h2>
        </div>
        <div className="flex justify-end">
          {user?.username !== profile.username ? (
            <FollowButton
              username={profile.username}
              isFollowed={profile.following}
            />
          ) : (
            <Button onClick={goToSettings}>Edit profile settings</Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfileBanner;
