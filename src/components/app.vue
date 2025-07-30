<template>
  <f7-app v-bind="f7params">
  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>

  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';

  import { getDevice }  from '../js/framework7-custom.js';
  import capacitorApp from '../js/capacitor-app.js';
  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    setup() {
      const device = getDevice();
      // Framework7 Parameters
      const f7params = {
        name: 'PadyZone', // PadyZone name
        theme: 'auto', // Automatic theme detection
        colors: {
          primary: '#df00ff',
        },
        darkMode: true,


        // PadyZone store
        store: store,
        // PadyZone routes
        routes: routes,


        // Input settings
        input: {
          scrollIntoViewOnFocus: device.capacitor,
          scrollIntoViewCentered: device.capacitor,
        },
        // Capacitor Statusbar settings
        statusbar: {
          iosOverlaysWebView: true,
          androidOverlaysWebView: false,
        },
      };
      // Login screen data
      const username = ref('');
      const password = ref('');

      const alertLoginData = () => {
        f7.dialog.alert('Username: ' + username.value + '<br>Password: ' + password.value, () => {
          f7.loginScreen.close();
        });
      }
      onMounted(() => {
        f7ready(() => {

          // Init capacitor APIs (see capacitor-app.js)
          if (device.capacitor) {
            capacitorApp.init(f7);
          }
          // Call F7 APIs here
        });
      });

      return {
        f7params,
        username,
        password,
        alertLoginData
      }
    }
  }
</script>