<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Logo -->
            <img class="auth-form__logo d-table mx-auto mb-3" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboards - Register Template">

            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">Forget Password</h5>

            <!-- Form Fields -->
            <div class="form-group">
              <label for="password">New Password</label>
              <input class="form-control" type="password" v-model="input.password" v-on:keyup.enter="submit" placeholder="Password" />
            </div>
            <div class="form-group">
              <label for="password">Confirm Password</label>
              <input class="form-control" type="password" v-model="input.confirm_password" v-on:keyup.enter="submit" placeholder="Password" />
            </div>
            <d-button pill class="btn-accent d-table mx-auto" v-on:click="submit">Create Account</d-button>

          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import address from '@/address';
export default {
  name: 'user-forget-password',
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
        input:{
          password: "",
          confirm_password: ""
        },
      }
  },
  created: function() {

  },
  methods: {
    submit() {
      var forget_phone_number_id = this.$route.params.id;
      if(this.input.password != "" && this.input.confirm_password != "") {
        if(this.input.password == this.input.confirm_password) {
          let postObj = {
            id: forget_phone_number_id,
            password: this.input.password
          };
          this.axios.post(address + ':3000/forget-password-user', postObj)
          .then((response) => {
            if(response.status == 200) {
              this.$router.push('/user-forget-password-success');
            }
          });
        }
        else {
          alert("Password didn't match");
        }
      }
      else {
        alert("Field cannot be empty");
      }
    }
  }
}
</script>
