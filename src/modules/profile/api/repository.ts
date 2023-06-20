import { axiosBaseQuery } from '../../../core/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { GetProfileInDTO } from './dto/get-profile';
import { FollowUserInDTO } from './dto/follow-user';
import { UpdateUserInDTO } from './dto/update-user.in';
import { UpdateUserOutDTO } from './dto/update-user.out';
import { setUser } from '../../auth/service/slice';
import { RootState } from '../../../store/store';
import { feedApi } from '../../feed/api/repository';

interface ProfileParams {
  username: string;
}

interface UpdateProfileParams {
  avatar: string;
  bio: string;
  username: string;
  email: string;
  newPassword: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.realworld.io/api',
  }),

  endpoints: (builder) => ({
    //==============
    //queries
    //==============
    getProfile: builder.query<GetProfileInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}`,
      }),
      providesTags: ['Profile'],
    }),

    //==============
    //mutations
    //==============

    followUser: builder.mutation<FollowUserInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}/follow`,
        method: 'post',
      }),
      onQueryStarted: async (_, { dispatch }) => {
        dispatch(feedApi.util.invalidateTags(['Article']));
      },
      invalidatesTags: ['Profile'],
    }),
    unFollowUser: builder.mutation<FollowUserInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}/follow`,
        method: 'delete',
      }),
      onQueryStarted: async (_, { dispatch }) => {
        dispatch(feedApi.util.invalidateTags(['Article']));
      },

      invalidatesTags: ['Profile'],
    }),
    updateUser: builder.mutation<UpdateUserInDTO, UpdateProfileParams>({
      query: ({ email, username, bio, avatar, newPassword }) => {
        const data: UpdateUserOutDTO = {
          user: {
            email,
            username,
            bio,
            image: avatar,
          },
        };

        if (newPassword) {
          data.user.password = newPassword;
        }

        return {
          url: '/user',
          method: 'put',
          data,
        };
      },
      onQueryStarted: async (
        { email, username, bio, avatar },
        { dispatch, queryFulfilled, getState }
      ) => {
        const state = getState() as RootState;
        await queryFulfilled;

        dispatch(
          setUser({
            token: state.auth.user!.token,
            email,
            username,
            bio,
            image: avatar,
          })
        );
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useUpdateUserMutation,
} = profileApi;
