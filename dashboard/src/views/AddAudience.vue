<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-row>
      <d-col lg="12" class="mx-auto mt-4">
        <d-card class="card-small edit-user-details mb-4">
          <d-card-body class="p-0">
            <d-form class="py-4">
              <d-form-row class="mx-4">
                <d-col lg="8">
                  <d-form-row>

                    <d-col md="6" class="form-group">
                      <label>Name</label>
                      <d-input type="text" id="name" v-model="input.name" />
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>City</label>
                      <d-input type="text" id="name" v-model="input.city" />
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>Gender</label>
                      <div>
                        <d-form-radio inline name="gender" value="all" v-model="input.gender">All</d-form-radio>
                        <d-form-radio inline name="gender" value="male" v-model="input.gender">Male</d-form-radio>
                        <d-form-radio inline name="gender" value="female" v-model="input.gender">Female</d-form-radio>
                      </div>
                    </d-col>

                    <d-col md="3" class="form-group">
                      <label>Age Start</label>
                      <d-input type="number" id="age_start" v-model="input.age_start" />
                    </d-col>

                    <d-col md="3" class="form-group">
                      <label>Age End</label>
                      <d-input type="number" id="age_end" v-model="input.age_end" />
                    </d-col>

                  </d-form-row>
                </d-col>

              </d-form-row>
            </d-form>
          </d-card-body>
          <!-- Save Changes -->
          <d-card-footer class="border-top">
            <d-button size="sm" @click="addAudience" class="btn-accent ml-auto d-table mr-3">
              Submit
            </d-button>
          </d-card-footer>

        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import address from '@/address';
import headers from '@/headers';

export default {
  data() {
    return {
      input: {
        name: "",
        city: "",
        gender: "",
        age_start: "",
        age_end: ""
      }
    };
  },

  created: function()
  {

  },

  methods: {
    addAudience() {
      let postObj = {
        name: this.input.name,
        city: this.input.city,
        gender: this.input.gender,
        age_start: this.input.age_start,
        age_end: this.input.age_end
      };
      this.axios.post(address + ':3000/add-audience', postObj, headers)
      .then((response) => {
        if(response.status == 200) {
          this.$router.push('/audience');
        }
      });
    }
  }
};
</script>
