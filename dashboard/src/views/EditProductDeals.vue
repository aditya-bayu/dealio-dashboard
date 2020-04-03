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
                      <label>Vendor</label>
                      <d-form-select v-model="input.merchant_id">
                        <option v-for="m in merchant" :value="m.id">
                          {{m.name}}
                        </option>
                      </d-form-select>
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>Price</label>
                      <d-input type="number" v-model="input.price" />
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>Discount</label>
                      <d-input type="number" v-model="input.discount" />
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>Start Date</label>
                      <d-datepicker
                        v-model="input.start_date"
                        @opened="handleOpened"
                        @closed="handleClosed"
                        format="yyyy-MM-dd"
                        typeable />
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>End Date</label>
                      <d-datepicker
                        v-model="input.end_date"
                        @opened="handleOpened"
                        @closed="handleClosed"
                        format="yyyy-MM-dd"
                        typeable />
                    </d-col>

                    <d-col md="6" class="form-group">
                      <label>Audience</label>
                      <d-form-select v-model="input.audience" :options="audienceOptions" />
                    </d-col>

                    <d-col md="8" class="form-group">
                      <label>Description</label>
                      <textarea v-model="input.description"
                        rows="6" wrap="soft" class="form-control form-control-lg">
                      </textarea>
                    </d-col>
                  </d-form-row>
                </d-col>

                <!-- User Profile Picture -->
                <d-col lg="4">
                  <label class="text-center w-100 mb-4">Image</label>
                  <div class="edit-user-details__avatar m-auto">
                    <img class="img-responsive" v-if="input.image != 'undefined' && input.image" :src="getImage(input.image)" >
                    <img class="img-responsive" v-else :src="getImage('undefined.png')" >
                    <label class="edit-user-details__avatar__change">
                                <i class="material-icons mr-1">&#xE439;</i>
                                <input @change="onFileChange" type="file" name="image" class="form-control" />
                              </label>
                  </div>
                  <d-button size="sm" class="btn-white d-table mx-auto mt-4"><i class="material-icons">&#xE2C3;</i> Upload Image</d-button>
                </d-col>
              </d-form-row>
            </d-form>
          </d-card-body>
          <!-- Save Changes -->
          <d-card-footer class="border-top">
            <d-button size="sm" @click="postImage($route.params.id)" class="btn-accent ml-auto d-table mr-3">
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
import audience from '@/data/audience.json';

export default {
  data() {
    return {
      audienceOptions: audience,
      temp_image: "",
      merchant: [],
      input: {
        name: "",
        merchant_id: "",
        start_date: "",
        end_date: "",
        audience: "",
        description: "",
        price: "",
        discount: "",
        image: ""
      }
    };
  },

  created: function()
  {
    this.getOneProductDeals();
    this.fetchMerchant();
  },

  methods: {
    getOneProductDeals() {
      var id = this.$route.params.id;
      this.axios.get(address + ":3000/get-one-product-deals", {params: {id: id}, headers: headers.headers}).then((response) => {
        this.input.name = response.data[0].name;
        this.input.merchant_id = response.data[0].merchant_id;
        this.input.start_date = response.data[0].start_date;
        this.input.end_date = response.data[0].end_date;
        this.input.audience = response.data[0].audience;
        this.input.description = response.data[0].description;
        this.input.price = response.data[0].price;
        this.input.discount = response.data[0].discount;
        this.input.image = response.data[0].image;
      });
    },
    fetchMerchant() {
      this.axios.get(address + ":3000/get-merchant", headers).then((response) => {
        for(var i = 0; i < response.data.length; i++) {
          this.merchant.push(response.data[i]);
        }
      });
    },
    getImage(image) {
      return address + ':3000/images/' + image;
    },
    onFileChange(event) {
      this.temp_image = event.target.files[0];
    },
    editProductDeals() {
      let postObj = {
        id: this.$route.params.id,
        name: this.input.name,
        merchant_id: this.input.merchant_id,
        start_date: this.input.start_date,
        end_date: this.input.end_date,
        audience: this.input.audience,
        description: this.input.description,
        price: this.input.price,
        discount: this.input.discount,
        image: this.input.image,
      };
      this.axios.post(address + ':3000/edit-product-deals', postObj, headers)
      .then((response) => {
        if(response.status == 200) {
          this.$router.push('/product-deals');
        }
      });
    },
    postImage(id) {
      let formData = new FormData();
      if(this.temp_image.length != 0) {
        formData.append('image', this.temp_image, 'campaign_' + this.campaign_type + "_" + id);
      }
      this.axios.post(address + ':3000/post-image', formData, headers)
      .then((response) => {
        if(response.data != 404) {
          this.input.image = response.data.originalname + '.png';
        }
        else {
          alert("No picture uploaded");
        }
        this.editProductDeals();
      });
    },
  }
};
</script>
