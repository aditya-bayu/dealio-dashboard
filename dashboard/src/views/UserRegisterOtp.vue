<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Logo -->
            <img class="auth-form__logo d-table mx-auto mb-3" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboards - Register Template">

            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">We have sent a misscall to {{regis_phone_number.phone_number}}</h5>

            <!-- Form Fields -->
            <div class="form-group">
              <label>Last 4 Digit Caller Number</label>
              <input class="form-control" type="text" v-model="input.otp_code" v-on:keyup.enter="register" placeholder="Enter OTP" />
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
        regis_phone_number: {},
        otp_regis_id: "",
        input:{
          otp_code: ""
        },
      }
  },
  created: function()
  {
    this.login_method = this.$route.params.method;
    this.fetchOnePhoneNumber();
  },
  methods: {
    fetchOnePhoneNumber() {
      var regis_phone_number_id = this.$route.params.id;
      this.axios.get(address + ":3000/citcall-otp", {params: {id: regis_phone_number_id}}).then((response) => {
        this.regis_phone_number = response.data.result[0];
        if(response.data.body.rc == 0) {
          let postObj = {
            regis_phone_number_id: this.regis_phone_number.id,
            otp_code: response.data.body.token
          };
          this.axios.post(address + ':3000/user-register-otp', postObj)
          .then((response) => {
            if(response.status == 200) {
              this.otp_regis_id = response.data.insertId;
            }
          });
        }
        else {
          console.log(response.data.body);
          alert("Something went wrong");
          this.$router.push('/user-register-phone/' + this.login_method);
        }
      });
    },
    register() {
      var regis_phone_number_id = this.$route.params.id;
      if(this.input.otp_code != "") {
        let postObj = {
          id: this.otp_regis_id,
          regis_phone_number_id: regis_phone_number_id,
          phone_number: this.regis_phone_number.phone_number,
          otp_code: this.input.otp_code
        };
        this.axios.post(address + ':3000/check-register-otp', postObj)
        .then((response) => {
          if(response.data == 200) {
            this.$router.push('/user-register/'+ this.login_method + '/' + regis_phone_number_id);
          }
          else {
            alert("Wrong OTP Code");
            this.$router.push('/user-register-phone/' + this.login_method);
          }
        });
      }
      else {
        alert("Field cannot be empty");
      }
    }
  }
}
</script>
