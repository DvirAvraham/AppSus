import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['count'],
  template: `
        <section>
            <div class="side-nav-bar">
              <div class="hide-on-mobile"></div>
                <div :class="isInboxSelected"class="btn" @click="setFilter('all')" ><i class="fa-solid fa-inbox "></i> <span class="desc">Inbox {{count}}</span></div>
                <div :class="isStarSelected" class="btn"  @click="setFilter('isStarred')"><i class="fa-solid fa-star "></i> <span class="desc"> Starred </span></div>
                <div :class="isSentSelected" class="btn"  @click="setFilter('isSent')"> <i class="fa-solid fa-paper-plane"></i> <span class="desc">Sent</span></div>
                <div :class="isDeletedSelected" class="btn"  @click="setFilter('isDeleted')"> <i class="fa-solid fa-trash-can"></i> <span class="desc">Deleted</span></div>
            </div>
       </section>
    `,
  data() {
    return {
      filterType: null,
    };
  },

  methods: {
    setFilter(filterType) {
      this.filterType = filterType;
      this.$emit('filtered', filterType);
    },
    compose() {
      eventBus.emit('compose', true);
    },
  },
  computed: {
    isInboxSelected() {
      if (this.filterType === 'all' || !this.filterType ) return 'selected-btn-inbox';
    },
    isStarSelected() {
      if (this.filterType === 'isStarred') return 'selected-btn';
    },
    isSentSelected() {
      if (this.filterType === 'isSent') return 'selected-btn';
    },
    isDeletedSelected() {
      if (this.filterType === 'isDeleted') return 'selected-btn';
    },
  },
}
