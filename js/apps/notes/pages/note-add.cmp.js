import { noteService } from '../services/notes-services.js';
import { utilService } from '../../../services/util-service.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default {
  template: `
        <section class="notes-add-container">

                <input :placeholder="placeholder"  v-model="title" type="text"  @keyup.enter="onSaveNote">
                <div class="note-types-add">
                    <div title="Text" @click="setType('noteTxt')" :class="{'active-type-add': active === 'text'}">
                    <i class="fa-solid fa-square-pen"></i>
                    <i class="fa-regular fa-text"></i>
                    </div>
                    <div title="Image" @click="setType('noteImg')" :class="{'active-type-add': active === 'image'}">
                   <i class="fa-regular fa-image"></i>
                    </div>
                    <div title="Video" @click="setType('noteVid')" :class="{'active-type-add': active === 'video'}">
                    <i class="fa-brands fa-youtube-square"></i>
                    </div>
                    <div title="Todo list" class="note-list-icon" @click="setType('noteList')" :class="{'active-type-add': active === 'list'}">
                        <i class="fa-regular fa-square-check"></i>
                    </div>
                    
                     <div @click="openCanvas" title="Create canvas">
                         <i class="fa-solid fa-brush"></i>
                    </div>   
                    <div @click="onSaveNote" class="add-note-btn" title="Add note">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
        </section>
    `,
  components: {},
  created() {
    this.note = noteService.getEmptyNote();
    if (this.$route.query.subject || this.$route.query.body) {
      this.note.title = this.$route.query.subject;
      this.note.info.txt = this.$route.query.body;
      noteService.save(this.note).then(() => {
        eventBus.emit('updateNotes');
        this.$router.push('/notes');
      });
    }
  },
  data() {
    return {
      note: null,
      title: '',
      placeholder: `What's on your mind...`,
      active: 'text',
    };
  },
  methods: {
    openCanvas() {
      var canvasNote = noteService.getEmptyNote();
      canvasNote.type = 'noteCanvas';
      canvasNote.title = 'Canvas';
      canvasNote.info.canvas = 'd';
      noteService.save(canvasNote).then(() => {
        eventBus.emit('updateNotes');
        eventBus.emit('show-msg', { txt: 'Note Added', type: 'success' });
      });
      eventBus.emit('openEdit', canvasNote);
    },
    onSaveNote() {
      if (!this.title) return;
      if (this.note.type === 'noteImg' || this.note.type === 'noteVid')
        this.note.info.url = this.title;
      if (this.note.type === 'noteTxt') this.note.info.txt = this.title;
      if (this.note.type === 'noteList') {
        var todos = this.title.split(',').map(todoTxt => {
          return { id: utilService.makeId(), txt: todoTxt, doneAt: null };
        });
        this.note.info.todos = todos;
      }
      noteService.save(this.note).then(() => {
        eventBus.emit('updateNotes');
        eventBus.emit('show-msg', { txt: 'Note Added', type: 'success' });
      });
      this.title = '';
    },
    setType(type) {
      this.note.type = type;
      switch (type) {
        case 'noteImg':
          this.active = 'image';
          this.placeholder = 'Enter image URL...';
          break;
        case 'noteVid':
          this.active = 'video';
          this.placeholder = 'Enter video URL...';
          break;
        case 'noteTxt':
          this.active = 'text';
          this.placeholder = `What's on your mind...`;
          break;
        case 'noteList':
          this.active = 'list';
          this.placeholder = 'Enter comma seperated list...';
      }
    },
  },
  computed: {},
  unmounted() {},
};
