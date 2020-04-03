<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Logo -->
            <img class="auth-form__logo d-table mx-auto mb-3" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboards - Login Template">

            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">Access Your Account</h5>

            <!-- Form Fields -->
            <div class="form-group">
              <label for="username">Username</label>
              <input class="form-control" type="username" v-model='input.username' v-on:keyup.enter="login" placeholder="Enter username" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input class="form-control" type="password" v-model='input.password' v-on:keyup.enter="login" placeholder="Password" />
            </div>
            <div class="form-group mb-3 d-table mx-auto">
              <d-button pill class="btn-accent d-table mx-auto" v-on:click="login">Access Account</d-button>
            </div>
            <div class="form-group mb-3 d-table mx-auto">
              <d-link to="/register">Doesn't have an account yet?</d-link>
            </div>
          </d-card-body>

          <!-- Social Icons -->
          <d-card-footer class="border-top">
            <ul class="auth-form__social-icons d-table mx-auto">
              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#"><i class="fab fa-github"></i></a></li>
              <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
            </ul>
          </d-card-footer>
        </d-card>

        <!-- Meta Details -->
        <div class="auth-form__meta d-flex mt-4">
          <d-link tag="a" to="forgot-password">Forgot your password?</d-link>
          <d-link tag="a" to="register" class="ml-auto">Create a new account?</d-link>
        </div>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import address from '@/address';
export default {
  name: 'login',
  props: {
    /**
       * The component's title.
       */
    title: {
      type: String,
      default: 'Application',
    },
  },
  data(){
      return {
        input: {
          username: "",
          password: ""
        }
      }
  },
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        if(!this.input.username.includes('"') && !this.input.password.includes('"') &&
          !this.input.username.includes("'") && !this.input.password.includes("'") &&
          !this.input.username.includes('/') && !this.input.password.includes('/') &&
          !this.input.username.includes('\\') && !this.input.password.includes('\\')) {
          this.axios.post(address + ':3000/login-admin', {
            username: this.input.username,
            password: this.input.password
          })
          .then((response) => {
            if(response.data.token) {
              this.$session.start();
              this.$session.set('user', response.data.response);
              document.cookie = "token=" + response.data.token;
              document.cookie = "user_session=" + this.$session.get('user').id;
              localStorage.setItem('user_session', this.$session.get('user'));
              this.$router.push('/');
            }
            else {
              alert("Incorrect combination of username and password");
            }
          });
        }
        else {
          alert("Do not use special character in login form");
        }
      }
      else {
        alert("Username and password cannot be empty");
      }
    }
  }
};
</script>
