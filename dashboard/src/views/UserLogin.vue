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
              <label for="phone_number">Phone Number</label>
              <input class="form-control" type="text" v-model='input.phone_number' v-on:keyup.enter="login" placeholder="Enter Phone Number" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input class="form-control" type="password" v-model='input.password' v-on:keyup.enter="login" placeholder="Password" />
            </div>
            <div class="form-group mb-3 d-table mx-auto">
              <d-button pill class="btn-accent d-table mx-auto" v-on:click="login">Access Account</d-button>
            </div>
          </d-card-body>
        </d-card>

        <!-- Meta Details -->
        <div class="auth-form__meta d-flex mt-4">
          <d-link tag="a" to="/user-forget-password-phone">Forgot your password?</d-link>
          <d-link tag="a" to="/user-register-phone/manual" class="ml-auto">Create a new account?</d-link>
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
          phone_number: "",
          password: ""
        }
      }
  },
  methods: {
    login() {
      if(this.input.phone_number != "" && this.input.password != "") {
        if(!this.input.phone_number.includes('"') && !this.input.password.includes('"') &&
          !this.input.phone_number.includes("'") && !this.input.password.includes("'") &&
          !this.input.phone_number.includes('/') && !this.input.password.includes('/') &&
          !this.input.phone_number.includes('\\') && !this.input.password.includes('\\')) {
          this.axios.post(address + ':3000/login-user', {
            phone_number: this.input.phone_number,
            password: this.input.password
          })
          .then((response) => {
            if(response.data.token) {
              // this.$session.start();
              // this.$session.set('user', response.data.response);
              // document.cookie = "token=" + response.data.token;
              // document.cookie = "user_session=" + this.$session.get('user').id;
              // localStorage.setItem('user_session', this.$session.get('user'));
              this.$router.push('/user-login-success');
            }
            else {
              alert("Incorrect combination of phone number and password");
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
