import { FC } from 'react';
import { Feed } from '../components';
import { Banner } from '../../../common/components';
import { useGetGlobalFeedQuery } from '../api/repository';
import { useMatch, useSearchParams } from 'react-router-dom';
import { usePageParam } from '../hooks/usePageParam';
import { Container } from '../../../common/components';
import { FeedToggle } from '../components';
import TagCloud from '../components/TagCloud';
import { useAuth } from '../../auth/hooks/useAuthState';
import { routes } from '../../../core/routes';

interface GlobalFeedPageProps {}

const GlobalFeedPage: FC<GlobalFeedPageProps> = ({}) => {
  const { isLoggedIn } = useAuth();
  const personalFeed = useMatch(routes.personalFeed.path);

  const [searchParams] = useSearchParams();

  const { page } = usePageParam();

  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get('tag'),
    isPersonalFeed: personalFeed !== null,
  });

  const feedToggleItems = [];

  if (isLoggedIn) {
    feedToggleItems.push({
      text: 'Your feed',
      link: '/personal-feed',
    });
  }

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Banner />
      <Container>
        <FeedToggle items={feedToggleItems} />
        <div className="flex">
          <div className="w-3/4">
            <Feed
              data={data}
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
            />
          </div>
          <div className="w-1/4 pl-3">
            <TagCloud />
          </div>
        </div>
      </Container>
    </>
  );
};
export default GlobalFeedPage;
