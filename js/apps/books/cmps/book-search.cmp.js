import { bookService } from '../services/book-service.js';

export default {
  emits: ['updateBooks'],
  template: `
      <div class="book-search-container">
        <label for="">Add Book</label>
        <input type="text"  placeholder="Search A Book" v-model="keyword" @input="searchForBooks">
      </div> 
       
        <div class="searched-books" v-if="keyword">
            <ul>
                <li v-for="book in searchedBooks">
                    <p>{{book.volumeInfo.title}}</p>
                    <button @click="addBook(book)">+</button>
                </li>
            </ul>
        </div>
      `,
  data() {
    return {
      searchedBooks: null,
      keyword: null,
      counter: 0,
    };
  },
  created() {},
  methods: {
    searchForBooks() {
      if (!this.keyword) {
        this.searchedBooks = null;
      } else
        bookService.getBooks(this.keyword).then(res => {
          this.searchedBooks = res;
        });
    },
    addBook() {
      this.keyword = null;
      const newBook = {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.searchInfo,
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate.substring(0, 4),
        description: book.volumeInfo.description
          ? book.volumeInfo.description
          : 'none',
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        language: book.volumeInfo.language,
        listPrice: {
          amount: 49,
          currencyCode: 'EUR',
          isOnSale: false,
        },
      };
      bookService.save(newBook).then(res => {
        this.$emit('updateBooks');
      });
    },
  },
};
