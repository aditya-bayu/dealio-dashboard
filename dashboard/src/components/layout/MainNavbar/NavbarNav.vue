<template>
  <d-navbar-nav class="flex-row" v-if="session">
    <li class="nav-item border-left border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">2</d-badge>
        </div>
      </a>
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Analytics</span>
            <p>Your website’s active users count increased by <span class="text-success text-semibold">28%</span> in the last week. Great job!</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item href="#">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE8D1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Sales</span>
            <p>Last week your store’s sales count decreased by <span class="text-danger text-semibold">5.52%</span>. It could have been worse!</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center">View all Notifications</d-dropdown-item>
      </d-collapse>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
        <img class="user-avatar rounded-circle mr-2" :src="getImage(image)" alt="User Avatar"> <span class="d-none d-md-inline-block">{{session.username}}</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item to="user-profile"><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item>
        <d-dropdown-item to="edit-user-profile"><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>
        <d-dropdown-item to="file-manager-list"><i class="material-icons">&#xE2C7;</i> Files</d-dropdown-item>
        <d-dropdown-item to="transaction-history"><i class="material-icons">&#xE896;</i> Transactions</d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item href="#" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> <span v-on:click="logout">Logout</span>
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
  <d-navbar-nav class="flex-row" v-else>
    <li class="nav-item dropdown" style="display: flex; align-items: center">
      <d-link to="/login">
        <d-button size="sm" class="btn-accent ml-auto d-table mr-3">
          Login
        </d-button>
      </d-link>
    </li>
  </d-navbar-nav>
</template>

<script>
import address from '@/address';
import basicFunction from '@/basicFunction';
export default {
  name: 'navbar-nav',
  data(){
    return {
      session: {},
      notifications: [],
      notifClicked: 0,
      avatarImg: null,
    }
  },
  created: function()
  {
      this.fetchSession();
      this.setNotification();
  },
  methods: {
    fetchSession() {
      this.session = this.$session.get('user');
    },
    getImage(image) {
       return address + ':3000/images/undefined.png';
    },
    setNotification() {
      if(this.session) {
        if(this.session.status == "wait-profile") {
          var temp = {
            id: "notif_wait",
            category: "Profile",
            description: "You <span class='text-danger text-semibold'>haven't completed</span> your profile yet. Please complete your profile to access other content",
            href: "/admin/edit-user-profile",
          }
          this.notifications.push(temp);
        }
        else if(this.session.status == "active") {
          if(this.session.role == "user") {
            if(this.session.tahapan_kegiatan == "Eksplorasi") {
              var tk = "eksplorasi";
            }
            else if(this.session.tahapan_kegiatan == "Operasi Produksi") {
              var tk = "op";
            }
            var temp = {
              id: "notif_format_csv",
              category: "Import Spreadsheet",
              description: "Click here to download Spreadsheet Format",
              href: "/admin/downloads/FormatCSV.rar",
              read: 0,
            }
            var temp2 = {
              id: "notif_active",
              category: "Profile",
              description: "Your profile is <span class='text-success text-semibold'>complete</span>, you can upload Spreadsheet files now",
              href: "/admin/csv-neraca-"+tk,
              read: 0,
            }
            this.notifications.push(temp);
            this.notifications.push(temp2);
          }
        }
      }
    },
    checkNotifClick() {
      this.notifClicked = 1;
    },
    logout() {
      this.axios.get(address + ":3000/logout").then((response) => {
        alert("Successfully Logged Out");
        basicFunction.deleteAllCookies();
        localStorage.clear();
        this.$session.destroy();
        this.$router.push('/login');
        location.reload();
      });
    }
  }
};
</script>

<style>
  .nav-link:hover {
    cursor: pointer;
  }

  /* IE11 Navbar flex fix. */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .navbar-nav {
      align-items: stretch !important;
      flex: 1 1 100%;
      flex-flow: row wrap;
    }

    .nav-item.notifications {
      margin-left: auto !important;
    }
  }
</style>
