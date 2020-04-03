z<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Vendor</span>
        <h3 class="page-title">Merchant List</h3>
      </d-col>
      <d-col col sm="8" class="text-center text-sm-right mb-4 mb-sm-0">
        <d-link to="/add-merchant">
          <d-button class="btn-blue" v-d-tooltip.hover="'Edit'">
            Add Merchant
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
          <d-link :to="'/edit-merchant/' + props.row.id">
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
          label: 'Category',
          field: 'category_id',
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
    this.fetchMerchant();
  },

  methods: {
    fetchMerchant() {
      this.axios.get(address + ":3000/get-merchant", headers).then((response) => {
        this.rows = response.data;
      });
    }
  },
};
</script>
