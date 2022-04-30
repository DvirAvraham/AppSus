import bookPreview from './book-preview.cmp.js';

export default {
  props: ['books'],
  template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-preview-container" >
                   <book-preview :book="book" />
                </li>
            </ul>
        </section>
    `,
  components: {
    bookPreview,
  },
  methods: {
    remove(id) {
      this.$emit('remove', id);
    },
  },
  computed: {},
};
