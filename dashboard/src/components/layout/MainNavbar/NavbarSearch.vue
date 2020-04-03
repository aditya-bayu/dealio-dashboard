<template>
    <d-form class="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    </d-form>
</template>

<script>
import address from '@/address';
import basicFunction from '@/basicFunction';
export default {
  name: 'navbar-nav',
  data(){
    return {
      session: {},
    }
  },
  created: function()
  {
      this.fetchSession();
  },
  methods: {
    fetchSession() {
      this.session = this.$session.get('user');
    }
  }
};
</script>
