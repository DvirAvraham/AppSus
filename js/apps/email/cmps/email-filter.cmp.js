import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['show'],
  template: `
        <section class="email-filetr">
            <button @click="compose"class="compose"> 
                <img src="https://i.ibb.co/q0XbHkf/compose.png"> 
                <span class="compose-txt"> Compose </span>
            </button>

            <div :class="showSearch">      
                  <input @input="setFilter" type="text" v-model="filterBy.subject" placeholder="Search Your Email.." class="main-search">
            </div>
            <div :class="showSearch">    
            <select v-model="filterBy.isRead" @change="setFilter" class="email-choice-list">
                    <option disabled value="" selected>Type</option>
                    <option value="All">All</option>
                     <option value="Read">Read</option>
                     <option value="Unread">Unread</option>
                </select>
               
            </div >
                <label :class="showSearch">
                 <i @click="filterBy.abc = !filterBy.abc"class="fa-solid fa-arrow-down-a-z sort-az"></i>
                </label>
                <i @click="filterBy.date = !filterBy.date" class="fa-regular fa-calendar sort-date" :class="showSearch"></i>
            </section>
    `,
  data() {
    return {
      filterBy: {
        subject: null,
        abc: false,
        isRead: '',
        date: false,
      },
    };
  },
  methods: {
    compose() {
      eventBus.emit('compose', true);
    },
    setFilter() {
      console.log('this.filterBy', this.filterBy);
      this.$emit('filter', this.filterBy);
    },
  },
  computed: {
    showSearch() {
      if (!this.show) return 'hide-search';
    },
  },
  watch: {
    filterBy: {
      handler() {
        this.setFilter();
      },
      immediate: true,
    },
  },
};
