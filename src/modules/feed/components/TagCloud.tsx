import { FC } from 'react';
import { useGetPopularTagsQuery } from '../api/repository';
import { TagList } from './index';
import Container from '../../../common/components/Container';

interface TagCloudProps {}

const TagCloud: FC<TagCloudProps> = ({}) => {
  const { data, isFetching, isLoading, error } = useGetPopularTagsQuery();

  if (isLoading || isFetching) {
    return (
      <Container>
        <p className="mb-2">Loading popular tags...</p>
      </Container>
    );
  }

  if (error) {
    return <Container>Error while loading feed</Container>;
  }

  return (
    <div className="bg-slate-100 p-3 pt-1.5">
      <p className="mb-2">Popular tags</p>
      <TagList list={data!.tags} itemStyle="DARK" />
    </div>
  );
};
export default TagCloud;
