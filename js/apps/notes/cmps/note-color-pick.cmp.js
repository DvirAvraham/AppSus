export default {
  template: `
        <section class="color-pickers">
            <div v-for="color in colors" :style="{ 'background-color': color.color }" :title="color.title"  class="color-option" @click.stop="updateColor(color.color)"></div>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
      colors: [
        { color: '#bdea8a', title: 'Lightgreen' },
        { color: '#fff475', title: 'Lightyellow' },
        { color: '#a7ffeb', title: 'Greenblue' },
        { color: '#f28b82', title: 'Lightorange' },
        { color: '#d7aefb', title: 'Lightpink' },
        { color: '#e8eaed', title: 'lightgreen' },
      ],
    };
  },
  methods: {
    updateColor(color) {
      this.$emit('updateColor', color);
    },
  },
  computed: {},
  unmounted() {},
};
