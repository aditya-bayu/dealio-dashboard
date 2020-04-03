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
                      <label>Category</label>
                      <d-input type="text" v-model="input.category_id" />
                    </d-col>
                  </d-form-row>
                </d-col>
                <d-col lg="4">
                  <!-- Vendor Image -->
                  <div>
                    <label class="text-center w-100 mb-4">Vendor Image</label>
                    <div class="edit-user-details__avatar m-auto">
                      <img class="img-responsive" :src="getImage(image)" >
                      <label class="edit-user-details__avatar__change">
                                  <i class="material-icons mr-1">&#xE439;</i>
                                  <input @change="onFileChange" type="file" name="image" class="form-control" />
                                </label>
                    </div>
                    <d-button size="sm" class="btn-white d-table mx-auto mt-4"><i class="material-icons">&#xE2C3;</i> Upload Image</d-button>
                    <br>
                  </div>
                </d-col>
              </d-form-row>
            </d-form>
          </d-card-body>
          <!-- Save Changes -->
          <d-card-footer class="border-top">
            <d-button size="sm" @click="addMerchant" class="btn-accent ml-auto d-table mr-3">
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
      temp_image: "",
      input: {
        name: "",
        category_id: "",
        image: "",
      }
    };
  },

  created: function()
  {

  },

  methods: {
    addMerchant() {
      let postObj = {
        name: this.input.name,
        category_id: this.input.category_id,
        image: this.input.image
      };
      this.axios.post(address + ':3000/add-merchant', postObj, headers)
      .then((response) => {
        if(response.status == 200) {
          this.postImage(response.data.insertId);
        }
      });
    },
    getImage(image) {
       return address + ':3000/images/undefined.png';
    },
    onFileChange(event) {
      this.temp_image = event.target.files[0];
    },
    postImage(id) {
      let formData = new FormData();
      if(this.temp_image.length != 0) {
        formData.append('merchant', this.temp_image, 'merchant_' + id);
      }
      this.axios.post(address + ':3000/post-merchant-image', formData, headers)
      .then((response) => {
        if(response.data != 404) {
          this.input.image = response.data.originalname + '.png';
          let postObj = {
            id: id,
            name: this.input.name,
            category_id: this.input.category_id,
            image: this.input.image
          };
          this.axios.post(address + ':3000/edit-merchant', postObj, headers)
          .then((response) => {
            if(response.status == 200) {
              console.log(response);
            }
          });
        }
        else {
          console.log("No picture uploaded");
        }
        this.$router.push('/merchant');
      });
    },
  }
};
</script>
