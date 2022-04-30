import { noteService } from '../services/notes-services.js';
import noteActionsDetails from '../cmps/note-actions-details.cmp.js';
import noteTxt from './note-txt-details.cmp.js';
import noteImg from './note-img-details.cmp.js';
import noteVid from './note-vid-details.cmp.js';
import noteList from './note-list-details.cmp.js';

export default {
  props: ['note'],
  template: `
        <section v-if="note" class="note-details" :style="{'background-color': note.bgColor}">
           <component :is="note.type" @updateNote="updateNote" :note="note"></component>
          <note-actions-details @updateColor="updateColor" @removeNote="removeNote" />
        </section>
    `,
  components: {
    noteTxt,
    noteImg,
    noteVid,
    noteList,
    noteActionsDetails,
  },
  created() {
    const id = this.$route.params.noteId;
    noteService.get(id).then(note => (this.note = note));
    this.note = this.currNote;
    console.log(this.note);
    console.log('createatea');
  },
  data() {
    return {
      currNote: null,
    };
  },
  methods: {
    loadNote() {
      noteService.get(this.noteId).then(note => (this.note = note));
    },
    updateNote(updatedNote) {
      this.note = updatedNote;
      noteService.update(this.note);
    },
    updateColor(color) {
      this.note.bgColor = color;
      console.log('holla');
      eventBus.emit('show-msg', { txt: 'Note Color Changed', type: 'success' });
      noteService.update(this.note);
    },
    removeNote() {
      const id = this.note.id;
      noteService.remove(id).then(() => {
        this.$router.push('/notes');
        eventBus.emit('show-msg', {
          txt: 'Note has been removed',
          type: 'success',
        });
      });
    },
  },
  watch: {
    noteId: {
      handler() {
        this.loadNote();
      },
      immediate: true,
    },
  },
  computed: {
    noteId() {
      return this.$route.params.noteId;
    },
  },
  unmounted() {},
};
