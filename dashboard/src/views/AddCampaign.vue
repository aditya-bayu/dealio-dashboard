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

                    <d-col md="6" class="form-group">
                      <label>Category</label>
                      <d-form-select v-model="input.category_id">
                        <option v-for="c in category" :value="c.id">
                          {{c.name}}
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

                    <d-col md="6" class="form-group">
                      <label>Campaign Type</label>
                      <d-form-select v-model="input.type">
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </d-form-select>
                    </d-col>

                    <d-col v-if="campaign_type == 'deals' || campaign_type == 'product-deals'" md="7" class="form-group">
                      <label>Hot Deals</label>
                      <div>
                        <d-checkbox inline v-model="input.hot_deals" toggle></d-checkbox>
                      </div>
                    </d-col>
                  </d-form-row>
                </d-col>

                <d-col lg="4">
                  <!-- Square Image -->
                  <div v-if="campaign_type == 'deals' || campaign_type == 'product-deals'">
                    <label class="text-center w-100 mb-4">Square Image</label>
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
                  <div>
                    <!-- Landscape Image -->
                    <label class="text-center w-100 mb-4">Landscape Image</label>
                    <div class="edit-user-details__avatar m-auto">
                      <img class="img-responsive" :src="getImage(image)" >
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
            <d-button size="sm" @click="addCampaign" class="btn-accent ml-auto d-table mr-3">
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
      category: [],
      input: {
        name: "",
        merchant_id: 0,
        start_date: "",
        end_date: "",
        price: 0,
        discount: 0,
        audience_id: "",
        category_id: "",
        description: "",
        type: "",
        hot_deals: 0,
        action: "",
        action_link: "",
        point_redeem: 0,
        image: "",
        banner: "",
      }
    };
  },

  created: function()
  {
    this.campaign_type = this.$route.name.split("add-")[1];
    this.fetchAudience();
    this.fetchMerchant();
    this.fetchCategory();
  },

  methods: {
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
    fetchCategory() {
      this.axios.get(address + ":3000/get-category", headers).then((response) => {
        for(var i = 0; i < response.data.length; i++) {
          this.category.push(response.data[i]);
        }
      });
    },
    addCampaign() {
      let currentdate = new Date();
      let day = currentdate.getDate();
      let month = currentdate.getMonth()+1;
      let year = currentdate.getFullYear();
      let second = currentdate.getSeconds();
      let minute = currentdate.getMinutes();
      let hour = currentdate.getHours();

      let dateformat = year + '-' + month + '-' + day;
      let timeformat = hour + ':' + minute + ':' + second;

      if(this.input.hot_deals == true) {
        this.input.hot_deals = 1;
      }
      else {
        this.input.hot_deals = 0;
      }

      let postObj = {
        name: this.input.name,
        merchant_id: this.input.merchant_id,
        start_date: this.input.start_date,
        end_date: this.input.end_date,
        price: this.input.price,
        discount: this.input.discount,
        audience_id: this.input.audience_id,
        category_id: this.input.category_id,
        description: this.input.description,
        type: this.input.type,
        hot_deals: this.input.hot_deals,
        action: this.input.action,
        action_link: this.input.action_link,
        point_redeem: this.input.point_redeem,
        date: dateformat,
        time: timeformat
      };
      this.axios.post(address + ':3000/add-' + this.campaign_type, postObj, headers)
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
    onFileChange2(event) {
      this.temp_banner = event.target.files[0];
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
          let postObj = {
            id: id,
            name: this.input.name,
            merchant_id: this.input.merchant_id,
            start_date: this.input.start_date,
            end_date: this.input.end_date,
            price: this.input.price,
            discount: this.input.discount,
            audience_id: this.input.audience_id,
            category_id: this.input.category_id,
            description: this.input.description,
            type: this.input.type,
            hot_deals: this.input.hot_deals,
            action: this.input.action,
            action_link: this.input.action_link,
            point_redeem: this.input.point_redeem,
            image: this.input.image,
            banner: this.input.banner
          };
          this.axios.post(address + ':3000/edit-' + this.campaign_type, postObj, headers)
          .then((response) => {
            if(response.status == 200) {
              console.log(response);
            }
          });
        }
        else {
          console.log("No picture uploaded");
        }
        this.axios.post(address + ':3000/post-banner', formData2, headers)
        .then((response) => {
          if(response.data != 404) {
            this.input.banner = response.data.originalname + '.png';
            let postObj = {
              id: id,
              name: this.input.name,
              merchant_id: this.input.merchant_id,
              start_date: this.input.start_date,
              end_date: this.input.end_date,
              price: this.input.price,
              discount: this.input.discount,
              audience_id: this.input.audience_id,
              category_id: this.input.category_id,
              description: this.input.description,
              type: this.input.type,
              hot_deals: this.input.hot_deals,
              action: this.input.action,
              action_link: this.input.action_link,
              point_redeem: this.input.point_redeem,
              image: this.input.image,
              banner: this.input.banner,
            };
            this.axios.post(address + ':3000/edit-' + this.campaign_type, postObj, headers)
            .then((response) => {
              if(response.status == 200) {
                console.log(response);
              }
            });
          }
          else {
            console.log("No banner uploaded");
          }
          this.$router.push('/' + this.campaign_type);
        });
      });
    },
  }
};
</script>
