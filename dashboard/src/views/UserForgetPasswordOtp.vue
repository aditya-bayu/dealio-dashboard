<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Logo -->
            <img class="auth-form__logo d-table mx-auto mb-3" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboards - Register Template">

            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">We have sent a misscall to {{forget_phone_number.phone_number}}</h5>

            <!-- Form Fields -->
            <div class="form-group">
              <label>Last 4 Digit Caller Number</label>
              <input class="form-control" type="text" v-model="input.otp_code" v-on:keyup.enter="submit" placeholder="Enter OTP" />
            </div>
            <d-button pill class="btn-accent d-table mx-auto" v-on:click="submit">Submit</d-button>

          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import address from '@/address';
export default {
  name: 'user-forget-password-otp',
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
        forget_phone_number: {},
        otp_forget_id: "",
        input:{
          otp_code: ""
        },
      }
  },
  created: function()
  {
    this.fetchOnePhoneNumber();
  },
  methods: {
    fetchOnePhoneNumber() {
      var forget_phone_number_id = this.$route.params.id;
      this.axios.get(address + ":3000/citcall-forget-otp", {params: {id: forget_phone_number_id}}).then((response) => {
        this.forget_phone_number = response.data.result[0];
        if(response.data.body.rc == 0) {
          let postObj = {
            forget_phone_number_id: forget_phone_number_id,
            otp_code: response.data.body.token
          };
          this.axios.post(address + ':3000/user-forget-otp', postObj)
          .then((response) => {
            if(response.status == 200) {
              this.otp_forget_id = response.data.insertId;
            }
          });
        }
        else {
          console.log(response.data.body);
          alert("Something went wrong");
          this.$router.push('/user-forget-password-phone/');
        }
      });
    },
    submit() {
      var forget_phone_number_id = this.$route.params.id;
      if(this.input.otp_code != "") {
        let postObj = {
          id: this.otp_forget_id,
          forget_phone_number_id: forget_phone_number_id,
          user_manual_id: this.forget_phone_number.id,
          otp_code: this.input.otp_code
        };
        this.axios.post(address + ':3000/check-forget-otp', postObj)
        .then((response) => {
          if(response.data == 200) {
            this.$router.push('/user-forget-password/' + forget_phone_number_id);
          }
          else {
            alert("Wrong OTP Code");
            this.$router.push('/user-forget-password-phone/');
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
