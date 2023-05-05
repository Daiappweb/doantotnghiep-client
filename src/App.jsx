import { Route, Routes } from 'react-router-dom';
import AuthenticationLayout from '@/layouts/AuthenticationLayout/AuthenticationLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { routes } from '@/routes';
import MainAdminLayout from './layouts/AdminLayout/MainAdminLayout';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
  let theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: { fontFamily: "'Montserrat', sans-serif" },
  });
  return (
    <ThemeProvider  theme={theme} >
    <Routes>
      {routes.map((route, index) => {
        let Layout = MainLayout;
        if (route.layout === 'AuthenticationLayout') {
          Layout = AuthenticationLayout;
        }
        if (route.layout === 'AdminLayout') {
          Layout = AdminLayout;
        }
        if(route.layout === 'MainAdminLayout'){
          Layout = MainAdminLayout;
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
    </ThemeProvider>

  );
}

export default App;
