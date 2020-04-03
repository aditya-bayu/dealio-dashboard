z<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Campaign</span>
        <h3 class="page-title">{{campaign_name}}</h3>
      </d-col>
      <d-col col sm="8" class="text-center text-sm-right mb-4 mb-sm-0">
        <d-link :to="'/add-' + campaign_type">
          <d-button class="btn-blue" v-d-tooltip.hover="'Edit'">
            Add {{campaign_name}}
          </d-button>
        </d-link>
      </d-col>
    </d-row>

    <!-- The data -->
    <div>
      <vue-good-table
        style="font-weight: 100"
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true
      }">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'update'">
          <d-link :to="'/edit-' + campaign_type + '/' + props.row.id">
            <d-button class="btn-white" v-d-tooltip.hover="'Edit'">
              <i class="material-icons">&#xE254;</i>
            </d-button>
          </d-link>
        </span>
      </template>
      </vue-good-table>
    </div>

  </d-container>
</template>

<script>
import address from '@/address';
import headers from '@/headers';
export default {
  data() {
    return {
      campaign_type: "",
      audience: [],
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Audience',
          field: 'audience',
        },
        {
          label: 'Start Date',
          field: 'start_date',
        },
        {
          label: 'End Date',
          field: 'end_date',
        },
        {
          label: '',
          field: 'update',
          tdClass: 'text-center'
        },
      ],
      rows: [],
    };
  },

  created: function()
  {
    this.campaign_type = this.$route.name;
    this.campaign_name = this.campaign_type.charAt(0).toUpperCase() + this.campaign_type.slice(1);
    if(this.campaign_name == 'Product-deals') {
      this.campaign_name = 'E-Commerce Deals';
    }
    else if(this.campaign_name == 'Deals') {
      this.campaign_name = 'Merchant Deals';
    }
    this.fetchAudience();
    this.fetchCampaign();
  },

  methods: {
    fetchAudience() {
      this.axios.get(address + ":3000/get-audience", headers).then((response) => {
        for(var i = 0; i < response.data.length; i++) {
          this.audience.push(response.data[i]);
        }
      });
    },
    fetchCampaign() {
      this.axios.get(address + ":3000/get-" + this.campaign_type, headers).then((response) => {
        for(var i = 0; i < response.data.length; i++) {
          for(var j = 0; j < this.audience.length; j++) {
            if(response.data[i].audience_id == this.audience[j].id) {
              response.data[i].audience = this.audience[j].name
              this.rows.push(response.data[i]);
            }
          }
        }
      });
    }
  },
};
</script>
