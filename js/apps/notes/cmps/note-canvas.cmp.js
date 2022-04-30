import noteActions from './note-actions.cmp.js';
import { noteService } from '../services/notes-services.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['note'],
  template: `
        <section class="note note-canvas" @mouseleave="hover = false" @mouseover="hover = true">
          <h3>{{note.title}}</h3>
            
              <div class="canvas-container" v-if="!note.info.canvas"> 
                <canvas ref="canvas" id="canvas" @mousemove="draw" @mouseup="finishPosition" @mousedown="startPosition">

                </canvas>
              </div>
              <img v-else :src="note.info.canvas" alt="">
            </div>
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
      vueCanvas: null,
      painting: false,
    };
  },
  mounted() {
    console.log(this.note.info.canvas);
    if (!this.$refs.canvas) return;
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext('2d');
    this.vueCanvas = ctx;
  },
  methods: {
    draw(ev) {
      if (!this.painting) return;
      this.vueCanvas.lineWidth = 2;
      this.vueCanvas.lineCap = 'round';
      this.vueCanvas.lineTo(ev.offsetX, ev.offsetY);
      this.vueCanvas.stroke();
      this.vueCanvas.beginPath();
      this.vueCanvas.moveTo(ev.offsetX, ev.offsetY);
    },
    startPosition() {
      console.log('hola');
      this.painting = true;
    },
    finishPosition() {
      console.log('stas');
      this.painting = false;
      this.vueCanvas.beginPath();
      this.currNote.info.canvas = this.$refs.canvas.toDataURL();
      console.log(this.currNote.info.canvas);
      noteService.update(this.currNote);
    },
    updateColor(color) {
      this.currNote.bgColor = color;
      noteService.update(this.currNote);
      eventBus.emit('show-msg', {
        txt: 'Note color has been changed',
        type: 'success',
      });
    },
    togglePin() {
      this.currNote.isPinned = !this.currNote.isPinned;
      noteService.update(this.currNote).then(res => {
        eventBus.emit('updateNotes');
      });
    },
    removeNote() {
      const id = this.currNote.id;
      noteService.remove(id).then(res => {
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
  computed: {
    embedVidUrl() {
      return this.note.info.url.replace('watch?v=', 'embed/');
    },
  },
  unmounted() {},
};
