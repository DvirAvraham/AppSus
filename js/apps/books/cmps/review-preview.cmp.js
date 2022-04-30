export default {
  props: ['review'],
  template: `
    <section class="review-preview">
        <p class="review-name">{{review.name}}</p>
        <div>
            <p>Rating: {{review.rating}}</p>
            <i v-for="n in review.rating" class="fa-solid fa-star yellow"></i>
            <p>{{review.text}}</p>
        </div>

    </section>
    `,
  components: {},
  methods: {},
  computed: {},
};
