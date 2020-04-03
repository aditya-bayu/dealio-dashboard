z<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Entertainment</span>
        <h3 class="page-title">{{entertainment_name}}</h3>
      </d-col>
      <d-col col sm="8" class="text-center text-sm-right mb-4 mb-sm-0">
        <d-link :to="'/add-' + entertainment_type">
          <d-button class="btn-blue" v-d-tooltip.hover="'Edit'">
            Add {{entertainment_name}}
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
          <d-link :to="'/edit-' + entertainment_type + '/' + props.row.id">
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
      entertainment_type: "",
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Title',
          field: 'title',
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
    this.entertainment_type = this.$route.name;
    this.entertainment_name = this.entertainment_type.charAt(0).toUpperCase() + this.entertainment_type.slice(1);
    this.fetchEntertainment();
  },

  methods: {
    fetchEntertainment() {
      this.axios.get(address + ":3000/get-" + this.entertainment_type, headers).then((response) => {
        this.rows = response.data;
      });
    }
  },
};
</script>
