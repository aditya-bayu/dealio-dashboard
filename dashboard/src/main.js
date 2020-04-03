/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';
import VueAnalytics from 'vue-analytics';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSession from 'vue-session';
import VueGoodTablePlugin from 'vue-good-table';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/shards-dashboard-pro/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';
import 'vue-good-table/dist/vue-good-table.css';

// Core
import App from './App.vue';
import router from './router';

// Layouts
import Default from '@/layouts/Default.vue';
import HeaderNavigation from '@/layouts/HeaderNavigation.vue';
import IconSidebar from '@/layouts/IconSidebar.vue';

const isProd = process.env.NODE_ENV === 'production';

ShardsVue.install(Vue);

Vue.component('default-layout', Default);
Vue.component('header-navigation-layout', HeaderNavigation);
Vue.component('icon-sidebar-layout', IconSidebar);

Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.prototype.$eventHub = new Vue();

// Analytics
Vue.use(VueAnalytics, {
  id: isProd ? 'UA-115105611-1' : 'UA-115105611-2',
  router
});

var options = {
	persist: true
};

Vue.use(VueAxios, axios);
Vue.use(VueSession, options);
Vue.use(VueGoodTablePlugin);

router.beforeEach((to, from, next) => {
	if(to.path != '/login' && to.path != '/register' && to.path.split('-')[0] != '/user') {
		if(localStorage.getItem('user_session')) {
			next();
		}
		else {
			next('/login');
		}
	}
	else {
		next();
	}
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
