export const aboutUs = {
  template: `
  <section>
    <h2>Who We are</h2>
  </section>`,
  data() {
    return {};
  },
};

export default {
  template: `
        <section class="about-page book-app">
            <h3>This is an about page</h3>
            <router-link to="/about/about-us">About Us</router-link>
            <router-view></router-view>
        </section>
    `,
  methods: {},
};
