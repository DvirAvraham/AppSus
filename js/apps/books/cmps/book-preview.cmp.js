export default {
  props: ['book'],
  template: `
        <section class="book-preview">
          <div class="img-container">
            <img :src="bookImgUrl" alt="">
            <div v-if="book.listPrice.isOnSale" class="sale">SALE</div>
            <router-link class="button img-btn" :to="'/book/'+book.id">More Details</router-link>
            <div class="img-overlay">
            </div>
          </div>
          <div class='book-content'>
            <h2 class='book-title'>{{book.title}}</h2>
            <p class='book-author'>{{book.authors[0]}}</p>
            <p class="book-price">{{bookPrice}}</p>
          </div>
        </section>
    `,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    bookImgUrl() {
      return `${this.book.thumbnail}`;
    },
    bookPrice() {
      const price = this.book.listPrice.amount;
      const bookLang = this.book.language;
      const currency = this.book.listPrice.currencyCode;
      return price.toLocaleString(bookLang, {
        style: 'currency',
        currency,
      });
    },
  },
};
