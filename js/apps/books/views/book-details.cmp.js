import longText from './long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/eventBus-service.js';
import reviewPreview from '../cmps/review-preview.cmp.js';
export default {
  // props: ['book'],
  template: `
        <section v-if="book" class="book-details">
          <div class="book-details-container">
            <img class="book-img" :src="bookImgUrl" alt="">
            <div class='book-details-content'>
  <h2 class="book-title">{{book.title}}</h2>
              <div class="sale" v-if="book.listPrice.isOnSale">ON SALE!</div>
              <p class="book-authors">{{book.authors[0]}}</p>
              <long-text :txt="book.description"/>
              <p>{{showPages}}</p>
              <p>{{displayPublishedDate}}</p>
              <p :class="colorPrice">{{bookPrice}}</p>
              <router-link class="button" to="/book">Back</router-link>
            </div>
            
          </div>
          <div class="books-pagination">
            <router-link :to="'/book/'+book.prevBookId">Prev Book</router-link> | 
            <router-link :to="'/book/'+book.nextBookId">Next Book</router-link> 
           </div>
          <div v-if="!isOnAddReview" class="reviews-container">
            <h2>Reviews</h2>
            <h3 v-if="!book.reviews">No Reviews Yet</h3>
            <button @click="isOnAddReview = true">Write Review</button>
          

            <ul>
              <li  v-for="review in book.reviews" >
                  <reviewPreview :review="review" />
              </li>
            </ul>
          </div>

          <review-add v-else :book="book"  @addReview="saveReview" @toggleReview="toggleReview"/>
        </section>
    `,
  components: {
    longText,
    reviewAdd,
    reviewPreview,
  },
  data() {
    return {
      book: null,
      isOnAddReview: false,
    };
  },
  created() {
    const id = this.$route.params.bookId;
    bookService.get(id).then(book => (this.book = book));
  },
  methods: {
    loadBook() {
      bookService.get(this.bookId).then(book => (this.book = book));
    },
    saveReview(review) {
      bookService.addReview(this.book.id, review).then(book => {
        this.book = book;
        eventBus.emit('show-msg', { txt: 'Review Added', type: 'success' });
      });
    },
    toggleReview() {
      this.isOnAddReview = false;
    },
  },
  watch: {
    bookId: {
      handler() {
        this.loadBook();
      },
      // immediate: true,
    },
  },
  computed: {
    bookId() {
      return this.$route.params.bookId;
    },
    bookImgUrl() {
      return `${this.book.thumbnail}`;
    },
    showPages() {
      if (this.book.pageCount > 500) return 'Long Reading';
      if (this.book.pageCount > 200) return 'Decent Reading';
      if (this.book.pageCount < 100) return 'Light Reading';
      return 'Normal Reading';
    },
    displayPublishedDate() {
      if (this.book.publishedDate > 10) return 'Veteran Book';
      if (this.book.publishedDate < 1) return 'New!';
      return 'Stable Book';
    },
    bookPrice() {
      const price = this.book.listPrice.amount;
      const bookLang = this.book.language;
      const currency = this.book.listPrice.currencyCode;
      return price.toLocaleString(bookLang, {
        style: 'currency',
        currency: currency,
      });
    },
    colorPrice() {
      return {
        'red-text': this.book.listPrice.amount > 150,
        'green-text': this.book.listPrice.amount < 20,
      };
    },
  },
};
