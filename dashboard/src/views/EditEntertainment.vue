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
                      <label>Title</label>
                      <d-input type="text" id="title" v-model="input.title" />
                    </d-col>

                    <d-col v-if="entertainment_type == 'news'" md="6" class="form-group">
                      <label>Source</label>
                      <d-input type="text" id="source" v-model="input.source" />
                    </d-col>

                    <d-col v-if="entertainment_type == 'stream'" md="6" class="form-group">
                      <label>Video URL</label>
                      <d-input type="text" id="video_url" v-model="input.video_url" />
                    </d-col>

                    <d-col v-if="entertainment_type == 'horoscope'" md="6" class="form-group">
                      <label>Zodiac Sign</label>
                      <d-form-select v-model="input.zodiac_sign" :options="zodiacOptions" />
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

                    <d-col v-if="entertainment_type != 'stream'" md="8" class="form-group">
                      
                      <!-- <textarea v-model="input.description"
                        rows="6" wrap="soft" class="form-control form-control-lg">
                      </textarea> -->
                    </d-col>
                  </d-form-row>
                </d-col>

                <d-col lg="4">
                  <!-- Square Image -->
                  <div>
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
                <d-col lg="12" v-if="entertainment_type != 'stream'">
                  <label>Description</label>
                  <quill-editor ref="quill"></quill-editor>
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
import zodiac from '@/data/zodiac.json';

import Editor from '@/components/add-new-post/Editor.vue';

import 'quill/dist/quill.snow.css';

export default {
  components: {
    quillEditor: Editor,
  },
  data() {
    return {
      zodiacOptions: zodiac,
      entertainment_type: "",
      temp_image: "",
      input: {
        title: "",
        start_date: "",
        end_date: "",
        source: "",
        video_url: "",
        zodiac_sign: "",
        description: "",
        image: "",
        banner: ""
      }
    };
  },

  created: function()
  {
    this.entertainment_type = this.$route.name.split("edit-")[1];
    this.getOneEntertainment();
  },

  methods: {
    getOneEntertainment() {
      var id = this.$route.params.id;
      this.axios.get(address + ":3000/get-one-" + this.entertainment_type, {params: {id: id}, headers: headers.headers}).then((response) => {
        this.input.title = response.data[0].title;
        this.input.start_date = response.data[0].start_date;
        this.input.end_date = response.data[0].end_date;
        this.input.source = response.data[0].source;
        this.input.video_url = response.data[0].video_url;
        this.input.zodiac_sign = response.data[0].zodiac_sign;
        this.input.description = response.data[0].description;
        this.input.image = response.data[0].image;
        this.input.banner = response.data[0].banner;
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
    editEntertainment() {
      let postObj = {
        id: this.$route.params.id,
        title: this.input.title,
        start_date: this.input.start_date,
        end_date: this.input.end_date,
        source: this.input.source,
        video_url: this.input.video_url,
        zodiac_sign: this.input.zodiac_sign,
        description: this.input.description,
        image: this.input.image,
        banner: this.input.banner
      };
      this.axios.post(address + ':3000/edit-' + this.entertainment_type, postObj, headers)
      .then((response) => {
        if(response.status == 200) {
          this.$router.push('/' + this.entertainment_type);
        }
      });
    },
    postImage(id) {
      let formData = new FormData();
      if(this.temp_image.length != 0) {
        formData.append('image', this.temp_image, 'entertainment_' + this.entertainment_type + "_" + id);
      }
      let formData2 = new FormData();
      if(this.temp_banner.length != 0) {
        formData2.append('banner', this.temp_banner, 'entertainment_banner_' + this.entertainment_type + "_" + id);
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
          this.editEntertainment();
        });
      });
    },
  }
};
</script>
