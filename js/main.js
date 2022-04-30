import { router } from './router.js';
import appFooter from './pages/app-footer.cmp.js';
import appHeader from './pages/app-header.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

const options = {
  template: `
    
    <section>
        <app-header />
        <section class="main-content-container">
         <router-view />
        </section>
        <user-msg />
        <app-footer/>
    </section>
  
    `,
  components: {
    appFooter,
    appHeader,
    userMsg,
  },
};

const app = Vue.createApp(options);
app.use(router);

app.mount('#app');
