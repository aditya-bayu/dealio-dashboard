<template>
  <component :is="layout">
    <router-view :key="$route.path" />
  </component>
</template>

<script>
export default {
	computed: {
    	layout() {
      		return `${this.$route.meta.layout || 'default'}-layout`;
    	},
  	},
	watch: {
		'$route' (to, from) {
			if(this.$session.get('user')) {
	  			// console.log(this.$session.get('user').username + ' Route changed from ' + from.path + ' to ' + to.path);
	  		}
		},
	}
};
</script>
