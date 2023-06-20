import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '../../../common/components';
import { useGetProfileFeedQuery } from '../../feed/api/repository';
import { Feed, FeedToggle } from '../../feed/components';
import { usePageParam } from '../../feed/hooks/usePageParam';
import { useGetProfileQuery } from '../api/repository';
import { ProfileBanner } from '../components';

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const { page } = usePageParam();
  const { profile } = useParams();
  const { pathname } = useLocation();

  const { data: profileInfo, isLoading: profileLoading } = useGetProfileQuery({
    username: profile!,
  });

  const { data, isLoading, isFetching, error } = useGetProfileFeedQuery({
    page,
    author: profile!,
    isFavorite: pathname.includes(`/${encodeURIComponent(profile!)}/favorites`),
  });

  const feedToggleItems = [
    {
      text: 'Favorite articles',
      link: `/${encodeURIComponent(profile!)}/favorites`,
    },
  ];

  if (profileLoading) {
    return null;
  }

  return (
    <div>
      <ProfileBanner profile={profileInfo!.profile} />
      <Container>
        <FeedToggle
          defaultText="My articles"
          defaultLink={`/${encodeURIComponent(profile!)}`}
          items={feedToggleItems}
        />
        <Feed
          data={data}
          error={error}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
};

export default ProfilePage;
