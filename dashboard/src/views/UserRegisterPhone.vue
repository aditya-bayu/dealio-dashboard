<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Logo -->
            <img class="auth-form__logo d-table mx-auto mb-3" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboards - Register Template">

            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">Create New Account</h5>

            <!-- Form Fields -->
            <div class="form-group">
              <label for="username">Phone Number</label>
              <input class="form-control" type="text" v-model="input.phone_number" v-on:keyup.enter="register" placeholder="Enter Phone Number" />
            </div>
            <d-button pill class="btn-accent d-table mx-auto" v-on:click="register">Create Account</d-button>

          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import address from '@/address';
export default {
  name: 'register',
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
      return{
        login_method: "",
        input:{
          phone_number: ""
        },
      }
  },
  created: function()
  {
    this.login_method = this.$route.params.method;
  },
  methods: {
    register() {
      if(this.input.phone_number != "") {
        if(this.input.phone_number.slice(0, 3) == '+62') {
          this.input.phone_number.replace('+62', '08');
        }
        if(this.input.phone_number.slice(0, 2) == '08') {
          if(this.input.phone_number.length > 10 && this.input.phone_number.length < 13) {
            let postObj = {
              phone_number: this.input.phone_number
            };
            this.axios.post(address + ':3000/user-register-phone', postObj)
            .then((response) => {
              if(response.data == 403) {
                alert("Your number has been blocked, please contact customer support");
              }
              else if(response.data == 404) {
                alert("Your number has been registered before");
              }
              else {
                this.$router.push('/user-register-otp/' + this.login_method + '/' + response.data.insertId);
              }
            });
          }
          else {
            alert("Your number is invalid");
          }
        }
        else {
          alert("Your number is invalid");
        }
      }
      else {
        alert("Field cannot be empty");
      }
    }
  }
}
</script>
