import notePreview from '../cmps/note-preview.cmp.js';
import noteTxt from '../cmps/note-text.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVid from '../cmps/note-vid.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import noteCanvas from '../cmps/note-canvas.cmp.js';

export default {
  props: ['notes'],
  template: `
                <section class="notes-list-container" >
  
                  <ul class="notes-list" >
                    <li v-for="note in notes"   :key="note.id" class="note-preview-container">
                      <component :is="note.type" :note="note" :style="{ 'background-color': note.bgColor }"></component>
                    
                    </li>
                  </ul>
                </section>
            
            `,
  components: {
    notePreview,
    noteTxt,
    noteImg,
    noteVid,
    noteList,
    noteCanvas,
  },
  data() {
    return {
      isDragging: false,
    };
  },

  methods: {
    startDrag(evt, item) {
      console.log(item);
      // this.isDragging = true;
      document.querySelector('item').classList.add('dragging');
    },
    endDrag(evt) {
      this.isDragging = false;
      document.querySelector('item').classList.remove('dragging');
    },
    onDragOver(evt, list) {
      console.log('ondrop');
      // const itemID = evt.dataTransfer.getData('itemID');
      // const item = this.notes.find(item => item.id == itemID);
      // item.list = list;
    },
  },
  computed: {},
};
