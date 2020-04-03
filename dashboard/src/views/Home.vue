<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Error -->
    <div class="error">
      <div class="error__content">
        <h3>Hi !</h3>
        <h3>Welcome {{session.username}}</h3>
        <p>Hope you have a nice day.</p>
      </div>
    </div>
  </d-container>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      session: {}
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
