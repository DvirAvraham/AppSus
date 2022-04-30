export default {
  props: ['txt'],
  template: `
          <section class="long-text">
            <p v-if="!isReadMore">{{showLessText}} </p>
            <p v-else>{{txt}}</p>
            <p v-if="txt.length >= 99" @click="isReadMore = !isReadMore">{{displayMoreLess}}</p>
          </section>
      `,
  data() {
    return {
      isReadMore: false,
    };
  },
  created() {},
  methods: {},
  computed: {
    showLessText() {
      return this.txt?.substring(0, 100);
    },
    displayMoreLess() {
      if (!this.isReadMore) return 'More...';
      return 'Less..';
    },
  },
};
