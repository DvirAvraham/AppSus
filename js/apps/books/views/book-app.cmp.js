import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookSearch from '../cmps/book-search.cmp.js';

export default {
  template: `
    <section class="book-app">
        <book-search  @updateBooks="updateBooks"></book-search> 
        <book-filter  @filtered="setFilters"></book-filter>
        <book-list  :books="booksForDisplay"  />
        
    </section>
  `,
  components: {
    bookList,
    bookDetails,
    bookFilter,
    bookSearch,
  },
  data() {
    return {
      books: null,
      filterBy: null,
    };
  },
  created() {
    bookService.query().then(books => (this.books = books));
  },
  methods: {
    setFilters(filterBy) {
      this.filterBy = filterBy;
    },
    updateBooks() {
      bookService.query().then(books => (this.books = books));
    },
  },
  computed: {
    booksForDisplay() {
      if (!this.filterBy) return this.books;
      const regex = new RegExp(this.filterBy.byName, 'i');
      let filterdByTitle = this.books.filter(book => regex.test(book.title));
      return filterdByTitle.filter(book => {
        return (
          this.filterBy.fromPrice <= book.listPrice.amount &&
          book.listPrice.amount <= this.filterBy.toPrice
        );
      });
    },
  },
};
