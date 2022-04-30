import { noteService } from '../services/notes-services.js';
import notesList from './notes-list.cmp.js';
import { eventBus } from '../../../services/eventBus-service.js';
import noteAdd from './note-add.cmp.js';
import detailsModal from './modal.cmp.js';
import notesFilter from '../cmps/notes-filter.cmp.js';
export default {
  template: `
              <section class="notes-app-container">
                  <div class="overlay" :class="{'open-overlay':currNote}" @click="currNote = null"></div>
                  <note-add />
                  <notes-filter  @filtered="setFilter" />
                  <p v-if="noNotes">There Are No Notes Yet</p>
                  <p v-if="!pinnedNotes && !notes"></p>
                  <p v-if="pinnedNotes && pinnedNotes.length">Pinned Notes</p>
                  <notes-list :notes="pinnedNotesToDisplay" />
                    <p v-if="pinnedNotes.length && notes.length">Other Notes</p>
                  <notes-list @openModal="openModal" :notes="notesToDisplay" />
                  <details-modal  v-if="currNote" :is="currNote.type"  :note="currNote" @removeNote="hideModal"/>
                </section>
          
          `,
  components: {
    notesList,
    noteAdd,
    detailsModal,
    notesFilter,
  },
  data() {
    return {
      notes: null,
      pinnedNotes: null,
      currNote: null,
      filterBy: null,
    };
  },
  created() {
    this.unsubscribe = eventBus.on('updateNotes', this.updateNotes);
    this.unsubscribe1 = eventBus.on('openEdit', this.openModal);
    this.unsubscribe2 = eventBus.on('closeEdit', this.hideModal);
    this.updateNotes();
  },
  methods: {
    hideModal() {
      this.currNote = null;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    updateNotes() {
      noteService.query().then(notes => {
        this.notes = notes.filter(note => !note.isPinned);
        this.pinnedNotes = notes.filter(note => note.isPinned);
      });
    },
    openModal(note) {
      this.currNote = note;
      console.log(this.currNote);
      console.log('open modal');
    },
  },
  computed: {
    noNotes() {
      return (
        (!this.notes && !this.pinnedNotes) ||
        (!this.notes.length && !this.pinnedNotes.length)
      );
    },
    notesToDisplay() {
      if (!this.filterBy) return this.notes;
      const regex = new RegExp(this.filterBy.title, 'i');
      if (this.filterBy.type) {
        return this.notes.filter(note => {
          return regex.test(note.title) && note.type === this.filterBy.type;
        });
      } else {
        return this.notes.filter(note => {
          return regex.test(note.title);
        });
      }
    },

    pinnedNotesToDisplay() {
      if (!this.filterBy) return this.pinnedNotes;
      const regex = new RegExp(this.filterBy.title, 'i');
      if (this.filterBy.type) {
        return this.pinnedNotes.filter(note => {
          return regex.test(note.title) && note.type === this.filterBy.type;
        });
      } else {
        return this.pinnedNotes.filter(note => {
          console.log(note);
          return regex.test(note.title);
        });
      }
    },
  },
  unmounted() {
    this.unsubscribe();
    this.unsubscribe1();
    this.unsubscribe2();
  },
};
