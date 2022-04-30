import { eventBus } from '../../../services/eventBus-service.js';
import { noteService } from '../services/notes-services.js';
import noteTxt from './note-txt-details.cmp.js';
import noteImg from './note-img-details.cmp.js';
import noteVid from './note-vid-details.cmp.js';
import noteList from './note-list-details.cmp.js';
import noteCanvas from './note-canvas-details.cmp.js';
import noteActionsDetails from '../cmps/note-actions-details.cmp.js';

export default {
  props: ['note'],
  template: `
        <section class="note-modal-container" :style="{'background-color': note.bgColor}">
            <component @updateNote="updateNote"  :is="note.type"  :note="note"></component>
            <p class="last-edit-text">Last Edited {{lastEditTime}}</p>
            <note-actions-details @updateNote="updateNote" @updateColor="updateColor" @sendNote="sendNote" @removeNote="removeNote" />
        </section>
    `,
  components: {
    noteTxt,
    noteImg,
    noteVid,
    noteList,
    noteCanvas,
    noteActionsDetails,
  },
  created() {
    this.currNote = this.note;
    // console.log(this.currNote);
  },
  data() {
    return {
      currNote: null,
    };
  },
  methods: {
    sendNote() {
      let subject = this.note.title;
      let body = this.note.info.txt;
      if (this.note.type === 'noteImg' || this.note.type === 'noteVid')
        body = this.note.info.url;
      if (this.note.type === 'noteList') {
        body = this.note.info.todos.map(todo => todo.txt).join(',');
      }
      if (this.note.type === 'noteCanvas') body = this.note.info.canvas;
      this.$router.push(`/email?subject=${subject}&body=${body}`);
    },
    updateNote(updatedNote) {
      // this.note = updatedNote;
      this.currNote.lastEdit = Date.now();
      noteService.update(this.note);
      eventBus.emit('show-msg', {
        txt: 'Note has been updated',
        type: 'success',
      });
    },
    updateColor(color) {
      this.currNote.bgColor = color;
      this.currNote.lastEdit = Date.now();
      noteService.update(this.currNote);
      eventBus.emit('show-msg', {
        txt: 'Note color has been changed',
        type: 'success',
      });
    },
    removeNote() {
      const id = this.note.id;
      noteService.remove(id).then(() => {
        this.note.lastEdit = Date.now();
        this.$emit('removeNote');
        eventBus.emit('updateNotes');
        eventBus.emit('show-msg', {
          txt: 'Note has been deleted',
          type: 'success',
        });
      });
    },
  },
  computed: {
    lastEditTime() {
      var date = new Date(this.note.lastEdit);
      date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${
        date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes()
      }`;
      return date;
    },
  },
  unmounted() {},
};
