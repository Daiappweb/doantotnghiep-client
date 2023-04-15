import { Route, Routes } from 'react-router-dom';
import AuthenticationLayout from '@/layouts/AuthenticationLayout/AuthenticationLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { routes } from '@/routes';

function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        let Layout = MainLayout;
        if (route.layout === 'AuthenticationLayout') {
          Layout = AuthenticationLayout;
        }
        if (route.layout === 'AdminLayout') {
          Layout = AdminLayout;
        }
        const Page = route.component;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
