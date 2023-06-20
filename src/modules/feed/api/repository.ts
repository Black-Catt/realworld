import { createApi } from '@reduxjs/toolkit/query/react';
import { GlobalFeedInDTO, FeedArticle } from './dto/global-feed';
import { FEED_PAGE_SIZE } from '../consts';
import { PopularTagsInDTO } from './dto/popular-tags';
import { realWorldBaseQuery } from '../../../core/api/realWorldBaseQuery';
import { SingleArticleInDTO } from './dto/single-article';
import { ArticleCommentsInDTO } from './dto/article-comments';
import { FavoriteArticleInDTO } from './dto/favorite-article';
import { CreateArticleInDTO } from './dto/create-article.in';
import { CreateArticleOutDTO } from './dto/create-article.out';
import { EditArticleInDTO } from './dto/edit-article.in';
import { EditArticleOutDTO } from './dto/edit-article.out';
import { NewCommentInDTO } from './dto/new-comment.in';
import { NewCommentOutDTO } from './dto/new-comment.out';

interface BaseFeedParams {
  page: number;
}

interface ProfileFeedParams extends BaseFeedParams {
  author: string;
  isFavorite?: boolean;
}

interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
  isPersonalFeed?: boolean;
}

export interface FeedData {
  articles: FeedArticle[];
  articlesCount: number;
}

interface SingleArticleParams {
  slug: string;
}

interface FavoriteArticleParams {
  slug: string;
}

interface CreateArticleParams {
  title: string;
  description: string;
  body: string;
  tags: string;
}

interface EditArticleParams extends CreateArticleParams {
  slug: string;
}

interface DeleteArticleParams {
  slug: string;
}

interface CreateCommentParams {
  articleSlug: string;
  comment: string;
}

interface DeleteCommentParams {
  id: number;
  articleSlug: string;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: realWorldBaseQuery,
  tagTypes: ['Articles', 'Article', 'ProfileFeed', 'Comments'],
  endpoints: (builder) => ({
    //==============================
    //queries
    //==============================

    getGlobalFeed: builder.query<GlobalFeedInDTO, GlobalFeedParams>({
      keepUnusedDataFor: 1,
      query: ({ page, tag, isPersonalFeed }) => ({
        url: isPersonalFeed ? '/articles/feed' : '/articles',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          tag,
        },
      }),
      providesTags: ['Articles'],
    }),

    getProfileFeed: builder.query<GlobalFeedInDTO, ProfileFeedParams>({
      keepUnusedDataFor: 1,
      query: ({ page, author, isFavorite = false }) => ({
        url: '/articles',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          author: isFavorite ? undefined : author,
          favorited: !isFavorite ? undefined : author,
        },
      }),
      providesTags: ['ProfileFeed'],
    }),

    getPopularTags: builder.query<PopularTagsInDTO, void>({
      keepUnusedDataFor: 1,
      query: () => ({
        url: '/tags',
      }),
    }),

    getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
      keepUnusedDataFor: 1,
      query: ({ slug }) => ({ url: `/articles/${slug}` }),
      providesTags: ['Article'],
    }),

    getCommentsForArticle: builder.query<
      ArticleCommentsInDTO,
      SingleArticleParams
    >({
      keepUnusedDataFor: 1,
      query: ({ slug }) => ({
        url: `/articles/${slug}/comments`,
      }),
      providesTags: ['Comments'],
    }),

    //==============================
    //mutations
    //==============================

    favoriteArticle: builder.mutation<
      FavoriteArticleInDTO,
      FavoriteArticleParams
    >({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'post',
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),

    unFavoriteArticle: builder.mutation<
      FavoriteArticleInDTO,
      FavoriteArticleParams
    >({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'delete',
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),

    createArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
      query: ({ title, description, body, tags }) => {
        const data: CreateArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        };
        return { url: '/articles', method: 'post', data };
      },
      invalidatesTags: ['Articles'],
    }),

    editArticle: builder.mutation<EditArticleInDTO, EditArticleParams>({
      query: ({ title, description, body, tags, slug }) => {
        const data: EditArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        };
        return { url: `/articles/${slug}`, method: 'put', data };
      },
      invalidatesTags: ['Articles'],
    }),

    deleteArticle: builder.mutation<any, DeleteArticleParams>({
      query: ({ slug }) => {
        return {
          url: `/articles/${slug}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['Articles'],
    }),

    createComment: builder.mutation<NewCommentInDTO, CreateCommentParams>({
      query: ({ articleSlug, comment }) => {
        const data: NewCommentOutDTO = {
          comment: {
            body: comment,
          },
        };
        return {
          url: `/articles/${articleSlug}/comments`,
          method: 'post',
          data,
        };
      },
      invalidatesTags: ['Comments'],
    }),

    deleteComment: builder.mutation<any, DeleteCommentParams>({
      query: ({ id, articleSlug }) => {
        return {
          url: `/articles/${articleSlug}/comments/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetGlobalFeedQuery,
  useGetPopularTagsQuery,
  useGetProfileFeedQuery,
  useGetSingleArticleQuery,
  useGetCommentsForArticleQuery,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = feedApi;
