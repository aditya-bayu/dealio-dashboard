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

                    <d-col v-if="campaign_type != 'win'" md="6" class="form-group">
                      <label>Vendor</label>
                      <d-form-select v-model="input.merchant_id">
                        <option v-for="m in merchant" :value="m.id">
                          {{m.name}}
                        </option>
                      </d-form-select>
                    </d-col>

                    <d-col v-else md="6" class="form-group">
                      <label>Point Redeem</label>
                      <d-input type="number" id="point_redeem" v-model="input.point_redeem" />
                    </d-col>

                    <d-col v-if="campaign_type == 'product-deals'" md="6" class="form-group">
                      <label>Price</label>
                      <d-input type="number" v-model="input.price" />
                    </d-col>

                    <d-col v-if="campaign_type == 'product-deals'" md="6" class="form-group">
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
                      <d-form-select v-model="input.audience_id">
                        <option v-for="a in audience" :value="a.id">
                          {{a.name}}
                        </option>
                      </d-form-select>
                    </d-col>

                    <d-col md="8" class="form-group">
                      <label>Description</label>
                      <textarea v-model="input.description"
                        rows="6" wrap="soft" class="form-control form-control-lg">
                      </textarea>
                    </d-col>

                    <d-col v-if="campaign_type != 'win' && campaign_type != 'product-deals'" md="6" class="form-group">
                      <label>Action</label>
                      <d-form-select v-model="input.action" :options="actionOptions" />
                    </d-col>

                    <d-col v-if="campaign_type != 'win' && campaign_type != 'product-deals'" md="6" class="form-group">
                      <label>Action Link</label>
                      <d-input type="text" v-model="input.action_link" />
                    </d-col>
                  </d-form-row>
                </d-col>

                <d-col lg="4">
                  <!-- Square Image -->
                  <div v-if="campaign_type == 'deals' || campaign_type == 'product-deals'">
                    <label class="text-center w-100 mb-4">Square Image</label>
                    <div class="edit-user-details__avatar m-auto">
                      <img class="img-responsive" v-if="input.image != 'undefined' && input.image" :src="getImage(input.image)" >
                      <img class="img-responsive" v-else :src="getImage('undefined.png')" >
                      <label class="edit-user-details__avatar__change">
                                  <i class="material-icons mr-1">&#xE439;</i>
                                  <input @change="onFileChange" type="file" name="image" class="form-control" />
                                </label>
                    </div>
                    <d-button size="sm" class="btn-white d-table mx-auto mt-4"><i class="material-icons">&#xE2C3;</i> Upload Image</d-button>
                    <br>
                  </div>
                  <div>
                    <!-- Landscape Image -->
                    <label class="text-center w-100 mb-4">Landscape Image</label>
                    <div class="edit-user-details__avatar m-auto">
                      <img class="img-responsive" v-if="input.banner != 'undefined' && input.banner" :src="getImage(input.banner)" >
                      <img class="img-responsive" v-else :src="getImage('undefined.png')" >
                      <label class="edit-user-details__avatar__change">
                                  <i class="material-icons mr-1">&#xE439;</i>
                                  <input @change="onFileChange2" type="file" name="image" class="form-control" />
                                </label>
                    </div>
                    <d-button size="sm" class="btn-white d-table mx-auto mt-4"><i class="material-icons">&#xE2C3;</i> Upload Image</d-button>
                  </div>
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
import action from '@/data/action.json';

export default {
  data() {
    return {
      actionOptions: action,
      campaign_type: "",
      campaign_name: "",
      temp_image: "",
      temp_banner: "",
      audience: [],
      merchant: [],
      input: {
        name: "",
        merchant_id: 0,
        start_date: "",
        end_date: "",
        price: 0,
        discount: 0,
        audience_id: "",
        description: "",
        action: "",
        action_link: "",
        point_redeem: 0,
        image: "",
        banner: ""
      }
    };
  },

  created: function()
  {
    this.campaign_type = this.$route.name.split("edit-")[1];
    this.getOneCampaign();
    this.fetchAudience();
    this.fetchMerchant();
  },

  methods: {
    getOneCampaign() {
      var id = this.$route.params.id;
      this.axios.get(address + ":3000/get-one-" + this.campaign_type, {params: {id: id}, headers: headers.headers}).then((response) => {
        this.input.name = response.data[0].name;
        this.input.merchant_id = response.data[0].merchant_id;
        this.input.start_date = response.data[0].start_date;
        this.input.end_date = response.data[0].end_date;
        this.input.price = response.data[0].price;
        this.input.discount = response.data[0].discount;
        this.input.audience_id = response.data[0].audience_id;
        this.input.description = response.data[0].description;
        this.input.action = response.data[0].action;
        this.input.action_link = response.data[0].action_link;
        this.input.point_redeem = response.data[0].point_redeem;
        this.input.image = response.data[0].image;
        this.input.banner = response.data[0].banner;
      });
    },
    fetchAudience() {
      this.axios.get(address + ":3000/get-audience", headers).then((response) => {
        for(var i = 0; i < response.data.length; i++) {
          this.audience.push(response.data[i]);
        }
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
    onFileChange2(event) {
      this.temp_banner = event.target.files[0];
    },
    editCampaign() {
      let postObj = {
        id: this.$route.params.id,
        name: this.input.name,
        merchant_id: this.input.merchant_id,
        start_date: this.input.start_date,
        end_date: this.input.end_date,
        price: this.input.price,
        discount: this.input.discount,
        audience_id: this.input.audience_id,
        description: this.input.description,
        action: this.input.action,
        action_link: this.input.action_link,
        point_redeem: this.input.point_redeem,
        image: this.input.image,
        banner: this.input.banner,
      };
      this.axios.post(address + ':3000/edit-' + this.campaign_type, postObj, headers)
      .then((response) => {
        if(response.status == 200) {
          this.$router.push('/' + this.campaign_type);
        }
      });
    },
    postImage(id) {
      let formData = new FormData();
      if(this.temp_image.length != 0) {
        formData.append('image', this.temp_image, 'campaign_' + this.campaign_type + "_" + id);
      }
      let formData2 = new FormData();
      if(this.temp_banner.length != 0) {
        formData2.append('banner', this.temp_banner, 'campaign_banner_' + this.campaign_type + "_" + id);
      }
      this.axios.post(address + ':3000/post-image', formData, headers)
      .then((response) => {
        if(response.data != 404) {
          this.input.image = response.data.originalname + '.png';
        }
        else {
          console.log("No picture uploaded");
        }
        this.axios.post(address + ':3000/post-banner', formData2, headers)
        .then((response) => {
          if(response.data != 404) {
            this.input.banner = response.data.originalname + '.png';
          }
          else {
            console.log("No banner uploaded");
          }
          this.editCampaign();
        });
      });
    },
  }
};
</script>
