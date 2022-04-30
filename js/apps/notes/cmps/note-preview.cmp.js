import noteTxt from './note-text.cmp.js';
import noteImg from './note-img.cmp.js';
import noteVid from './note-vid.cmp.js';
import noteList from './note-list.cmp.js';

export default {
  props: ['note'],
  template: `
        <component :is="note.type" :note="note" :style="{ 'background-color': note.bgColor }"></component>
              
              `,
  components: {
    noteTxt,
    noteImg,
    noteVid,
    noteList,
  },
  data() {
    return {};
  },

  methods: {},
  computed: {
    noteType() {
      return ``;
    },
  },
};
