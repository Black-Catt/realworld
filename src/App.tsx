import { FC, useEffect } from 'react';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { Header } from './common/components';
import { routes } from './core/routes';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  const isGlobalFeedPage = useMatch(routes.globalFeed.path);
  const navigate = useNavigate();

  useEffect(() => {
    if (isGlobalFeedPage) {
      navigate(routes.personalFeed.path);
    }
  }, []);

  return (
    <div className="pb-16">
      <Header />
      <Routes>
        {Object.values(routes).map((route) => {
          if (route.protected) {
            return (
              <Route
                key={`route-${route.path}`}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <route.Element />
                  </ProtectedRoute>
                }
              />
            );
          }
          return (
            <Route
              key={`route-${route.path}`}
              path={route.path}
              element={<route.Element />}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
