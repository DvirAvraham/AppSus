import { bookService } from '../services/book-service.js';

export default {
  props: ['book'],
  template: `
            <section class="review-add">
                <form @submit.prevent="saveReview(review),toggleReview()">
                    <label for="">Name:</label>
                    <input required v-model="review.name" ref="nameInput" type="text" name="" id="" placeholder="Enter Your Name">
                    <label for="">Your Review:</label>
                    <textarea required v-model="review.text" rows="5" cols="40"></textarea>
                    <label for="">Book Rating</label>

                    <div class="rating">
                      <input  type="radio" name="star" id="star1" />
                      <label @click="setRating(5)"  for="star1"></label>
                      <input  type="radio" name="star" id="star2" />
                      <label @click="setRating(4)" for="star2"></label>
                      <input type="radio" name="star" id="star3" />
                      <label @click="setRating(3)" for="star3"></label>
                      <input type="radio" name="star" id="star4" />
                      <label @click="setRating(2)" for="star4"></label>
                      <input   type="radio" name="star" id="star5" />
                      <label  @click="setRating(1)" for="star5"></label>
                    </div>
                    <!-- <select> -->
                      <!-- <option v-for="n in 5">{{'😊'.repeat(n)}}</option> -->
                      <!-- <option v-for="n in 5">{{[...Array(n)].map(res => '😊').join('')}}</option> -->
                    <!-- </select> -->
                    <input required v-model="review.date" type="date" >
                    <div>
                      <button class="white-bg" @click="toggleReview()">Cancel</button>
                      <button>Add review</button>
                    </div>
                </form>
            </section>
        `,
  data() {
    return {
      review: null,
    };
  },
  created() {
    this.review = bookService.getEmptyReview();
  },
  mounted() {
    this.$refs.nameInput.focus();
  },
  methods: {
    saveReview(review) {
      this.$emit('addReview', review);
    },
    toggleReview() {
      this.$emit('toggleReview');
    },
    setRating(num) {
      this.review.rating = num;
    },
  },
  computed: {},
};
