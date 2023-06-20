import { GlobalFeedPage, ArticlePage, EditorPage } from '../modules/feed/pages';
import { ProfilePage, SettingsPage } from '../modules/profile/pages';
import { SignUpPage, SignInPage } from '../modules/auth/pages';
import { FC } from 'react';

interface RouteItem {
  path: string;
  Element: FC;
  protected?: boolean;
}

export const routes: Record<string, RouteItem> = {
  globalFeed: {
    path: '/',
    Element: GlobalFeedPage,
  },
  personalFeed: {
    path: '/personal-feed',
    Element: GlobalFeedPage,
    protected: true,
  },
  profile: {
    path: '/:profile',
    Element: ProfilePage,
  },
  profileFavorites: {
    path: '/:profile/favorites',
    Element: ProfilePage,
    protected: true,
  },
  singleArticle: {
    path: '/article/:slug',
    Element: ArticlePage,
  },
  signUp: {
    path: '/sign-up',
    Element: SignUpPage,
  },
  signIn: {
    path: '/sign-in',
    Element: SignInPage,
  },
  settings: {
    path: '/settings',
    Element: SettingsPage,
    protected: true,
  },
  createArticle: {
    path: '/editor',
    Element: EditorPage,
    protected: true,
  },
  editArticle: {
    path: '/editor/:slug',
    Element: EditorPage,
    protected: true,
  },
};
