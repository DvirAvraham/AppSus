export default {
  template: `
        <section class="book-filter">

          <div>
            <label>Search </label>
            <input  type="text" v-model="filterBy.byName" placeholder="Search By Name">
          </div>

          <div>
            <label>Min Price </label>
            <input type="number" v-model="filterBy.fromPrice" placeholder="From" >
          </div>  

          <div>
            <label>Max Price </label>
            <input type="number" v-model="filterBy.toPrice" placeholder="To" >
          </div>  

          <button @click="setFilter">Filter</button>
        </section>
    `,
  data() {
    return {
      filterBy: {
        byName: '',
        fromPrice: '',
        toPrice: '',
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit('filtered', this.filterBy);
    },
  },
};
