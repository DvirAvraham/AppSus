import noteActions from './note-actions.cmp.js';
import { noteService } from '../services/notes-services.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['note'],
  template: `
        <section class="note note-list" @mouseleave="hover = false" @mouseover="hover = true">
            <h3>{{note.title}}</h3>
            <ul class="todo-list">
                <li v-for="todo in note.info.todos" class="todo" >
                    <label :class="{'done':todo.doneAt}"  :for="todo.txt">{{todo.txt}}
                    <input  @click="done(todo)" :checked="todo.doneAt" type="checkbox" name="" :id="todo.txt">
                    </label>
                </li>
            </ul>
            <note-actions class="note-actions-container" :class="{'show-note-actions': hover}" :note="note" @duplicateNote="duplicateNote" @removeNote="removeNote" @togglePin="togglePin" @updateColor="updateColor"/>

        </section>
    `,
  components: {
    noteActions,
  },
  created() {
    this.currNote = this.note;
  },
  data() {
    return {
      currNote: null,
      hover: false,
    };
  },
  methods: {
    done(todo) {
      todo.doneAt ? (todo.doneAt = null) : (todo.doneAt = Date.now());
      noteService.update(this.currNote);
    },
    updateColor(color) {
      this.currNote.bgColor = color;
      console.log(color);
      noteService
        .update(this.currNote)
        .then(() => {
          eventBus.emit('updateNotes');
          eventBus.emit('show-msg', {
            txt: 'Note color has been changed',
            type: 'success',
          });
        })
        .catch(() => {
          console.log('Color Error');
        });
    },
    togglePin() {
      this.currNote.isPinned = !this.currNote.isPinned;
      noteService.update(this.currNote).then(() => {
        eventBus.emit('updateNotes');
      });
    },
    removeNote() {
      const id = this.currNote.id;
      noteService.remove(id).then(() => {
        eventBus.emit('updateNotes');
        eventBus.emit('show-msg', {
          txt: 'Note has been removed',
          type: 'success',
        });
      });
    },
    duplicateNote() {
      noteService.save(this.currNote).then(() => eventBus.emit('updateNotes'));
      eventBus.emit('show-msg', { txt: 'Note Duplicated', type: 'success' });
    },
  },
};
