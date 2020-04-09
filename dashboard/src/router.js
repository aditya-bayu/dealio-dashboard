import Vue from 'vue';
import Router from 'vue-router';

import Analytics from './views/Analytics.vue';
import OnlineStore from './views/OnlineStore.vue';
import HeaderNavigation from './views/HeaderNavigation.vue';
import IconSidebarNav from './views/IconSidebarNav.vue';
import PersonalBlog from './views/PersonalBlog.vue';
import UserProfile from './views/UserProfile.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import EditUserProfile from './views/EditUserProfile.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import ChangePassword from './views/ChangePassword.vue';
import FileManagerList from './views/FileManagerList.vue';
import FileManagerCards from './views/FileManagerCards.vue';
import TransactionHistory from './views/TransactionHistory.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('./views/Merchant.vue'),
    },
    {
      path: '/add-merchant',
      name: 'add-merchant',
      component: () => import('./views/AddMerchant.vue'),
    },
    {
      path: '/edit-merchant/:id',
      name: 'edit-merchant',
      component: () => import('./views/EditMerchant.vue'),
    },
    {
      path: '/deals',
      name: 'deals',
      component: () => import('./views/Campaign.vue'),
    },
    {
      path: '/add-deals',
      name: 'add-deals',
      component: () => import('./views/AddCampaign.vue'),
    },
    {
      path: '/edit-deals/:id',
      name: 'edit-deals',
      component: () => import('./views/EditCampaign.vue'),
    },
    {
      path: '/earn',
      name: 'earn',
      component: () => import('./views/Campaign.vue'),
    },
    {
      path: '/add-earn',
      name: 'add-earn',
      component: () => import('./views/AddCampaign.vue'),
    },
    {
      path: '/edit-earn/:id',
      name: 'edit-earn',
      component: () => import('./views/EditCampaign.vue'),
    },
    {
      path: '/win',
      name: 'win',
      component: () => import('./views/Campaign.vue'),
    },
    {
      path: '/add-win',
      name: 'add-win',
      component: () => import('./views/AddCampaign.vue'),
    },
    {
      path: '/edit-win/:id',
      name: 'edit-win',
      component: () => import('./views/EditCampaign.vue'),
    },
    {
      path: '/product-deals',
      name: 'product-deals',
      component: () => import('./views/Campaign.vue'),
    },
    {
      path: '/add-product-deals',
      name: 'add-product-deals',
      component: () => import('./views/AddCampaign.vue'),
    },
    {
      path: '/edit-product-deals/:id',
      name: 'edit-product-deals',
      component: () => import('./views/EditCampaign.vue'),
    },
    {
      path: '/audience',
      name: 'audience',
      component: () => import('./views/Audience.vue'),
    },
    {
      path: '/add-audience',
      name: 'add-audience',
      component: () => import('./views/AddAudience.vue'),
    },
    {
      path: '/edit-audience/:id',
      name: 'edit-audience',
      component: () => import('./views/EditAudience.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/Entertainment.vue'),
    },
    {
      path: '/add-news',
      name: 'add-news',
      component: () => import('./views/AddEntertainment.vue'),
    },
    {
      path: '/edit-news/:id',
      name: 'edit-news',
      component: () => import('./views/EditEntertainment.vue'),
    },
    {
      path: '/stream',
      name: 'stream',
      component: () => import('./views/Entertainment.vue'),
    },
    {
      path: '/add-stream',
      name: 'add-stream',
      component: () => import('./views/AddEntertainment.vue'),
    },
    {
      path: '/edit-stream/:id',
      name: 'edit-stream',
      component: () => import('./views/EditEntertainment.vue'),
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('./views/Entertainment.vue'),
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: () => import('./views/AddEntertainment.vue'),
    },
    {
      path: '/edit-event/:id',
      name: 'edit-event',
      component: () => import('./views/EditEntertainment.vue'),
    },
    {
      path: '/horoscope',
      name: 'horoscope',
      component: () => import('./views/Entertainment.vue'),
    },
    {
      path: '/add-horoscope',
      name: 'add-horoscope',
      component: () => import('./views/AddEntertainment.vue'),
    },
    {
      path: '/edit-horoscope/:id',
      name: 'edit-horoscope',
      component: () => import('./views/EditEntertainment.vue'),
    },
    {
      path: '/user-login',
      name: 'user-login',
      component: () => import('./views/UserLogin.vue'),
    },
    {
      path: '/user-register-phone/:method',
      name: 'user-register-phone',
      component: () => import('./views/UserRegisterPhone.vue'),
    },
    {
      path: '/user-register-otp/:method/:id',
      name: 'user-register-otp',
      component: () => import('./views/UserRegisterOtp.vue'),
    },
    {
      path: '/user-register/:method/:id',
      name: 'user-register',
      component: () => import('./views/UserRegister.vue'),
    },
    {
      path: '/user-register-success/',
      name: 'user-register-success',
      component: () => import('./views/UserRegisterSuccess.vue'),
    },
    {
      path: '/user-login/',
      name: 'user-login',
      component: () => import('./views/UserLogin.vue'),
    },
    {
      path: '/user-login-success/',
      name: 'user-login-success',
      component: () => import('./views/UserLoginSuccess.vue'),
    },
    {
      path: '/user-forget-password-phone/',
      name: 'user-forget-password-phone',
      component: () => import('./views/UserForgetPasswordPhone.vue'),
    },
    {
      path: '/user-forget-password-otp/:id',
      name: 'user-forget-password-otp',
      component: () => import('./views/UserForgetPasswordOtp.vue'),
    },
    {
      path: '/user-forget-password/:id',
      name: 'user-forget-password',
      component: () => import('./views/UserForgetPassword.vue'),
    },
    {
      path: '/user-forget-password-success/',
      name: 'user-forget-password-success',
      component: () => import('./views/UserForgetPasswordSuccess.vue'),
    },
    {
      path: '/test-image/',
      name: 'test-image',
      component: () => import('./views/TestImage.vue'),
    },
    {
      path: '/ecommerce',
      name: 'ecommerce',
      component: OnlineStore,
    },
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: UserProfile,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
    },
    {
      path: '/edit-user-profile',
      name: 'edit-user-profile',
      component: EditUserProfile,
    },
    {
      path: '/login-admin',
      name: 'login-admin',
      meta: { layout: 'icon-sidebar' },
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'icon-sidebar' },
      component: Register,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { layout: 'icon-sidebar' },
      component: ForgotPassword,
    },
    {
      path: '/change-password',
      name: 'change-password',
      meta: { layout: 'icon-sidebar' },
      component: ChangePassword,
    },
    {
      path: '/file-manager-list',
      name: 'file-manager-list',
      component: FileManagerList,
    },
    {
      path: '/file-manager-cards',
      name: 'file-manager-cards',
      component: FileManagerCards,
    },
    {
      path: '/transaction-history',
      name: 'transaction-history',
      component: TransactionHistory,
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    },
    {
      path: '/header-navigation',
      name: 'header-navigation',
      meta: { layout: 'header-navigation' },
      component: HeaderNavigation,
    },
    {
      path: '/icon-sidebar-nav',
      name: 'icon-sidebar-nav',
      meta: { layout: 'icon-sidebar' },
      component: IconSidebarNav,
    }, {
      path: '*',
      redirect: '/errors',
    },
  ],
});
