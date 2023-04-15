import AdminPage from '@/pages/admin';
import AdminLoginPage from '@/pages/admin/auth/login';
import AdminRegisterPage from '@/pages/admin/auth/register';
import ForgetPage from '@/pages/auth/forget';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import ResetPasswordPage from '@/pages/auth/reset-password';
import CartPage from '@/pages/cart';
import HomePage from '@/pages/home';
import SearchPage from '@/pages/search';
import ShoesDetailPage from '@/pages/shoes-detail';

export const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/auth/register',
    component: RegisterPage,
    layout: 'AuthenticationLayout',
  },
  {
    path: '/auth/login',
    component: LoginPage,
    layout: 'AuthenticationLayout',
  },
  {
    path: '/auth/forget',
    component: ForgetPage,
    layout: 'AuthenticationLayout',
  },
  {
    path: '/auth/reset-password',
    component: ResetPasswordPage,
    layout: 'AuthenticationLayout',
  },
  {
    path: '/shoes/:id',
    component: ShoesDetailPage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/search',
    component: SearchPage,
  },

  {
    path: '/admin',
    component: AdminPage,
    layout: 'AdminLayout',
  },
  {
    path: '/admin/auth/login',
    component: AdminLoginPage,
    layout: 'AuthenticationLayout',
  },
  {
    path: '/admin/auth/register',
    component: AdminRegisterPage,
    layout: 'AuthenticationLayout',
  },
];
