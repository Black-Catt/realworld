import { FC } from 'react';
import { ArticleList } from './index';
import { FEED_PAGE_SIZE } from '../consts';
import ReactPaginate from 'react-paginate';
import { usePageParam } from '../hooks/usePageParam';
import { GlobalFeedInDTO } from '../api/dto/global-feed';

interface FeedProps {
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  data?: GlobalFeedInDTO;
}

const Feed: FC<FeedProps> = ({ data, isLoading, isFetching, error }) => {
  const { page, setPage } = usePageParam();

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  if (isLoading || isFetching) {
    return <p className="mt-4">Feed loading...</p>;
  }

  if (error) {
    return <p className="mt-4">Error while loading feed</p>;
  }

  if (data?.articlesCount === 0) {
    return <p className="mt-4">No articles are here</p>;
  }

  return (
    <>
      <ArticleList list={data?.articles || []} />
      <nav className="my-6">
        <ReactPaginate
          pageCount={Math.ceil((data?.articlesCount || 0) / FEED_PAGE_SIZE)}
          pageRangeDisplayed={Math.ceil(
            (data?.articlesCount || 0) / FEED_PAGE_SIZE
          )}
          previousLabel={null}
          nextLabel={null}
          containerClassName="flex"
          pageClassName="group"
          pageLinkClassName="p-3 bg-white border border-gray-300 -ml-px "
          activeClassName="bg-black"
          activeLinkClassName="text-realworld-green"
          onPageChange={handlePageChange}
          forcePage={page}
        />
      </nav>
    </>
  );
};

export default Feed;
