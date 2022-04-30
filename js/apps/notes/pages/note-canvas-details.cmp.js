import { eventBus } from '../../../services/eventBus-service.js';
import { noteService } from '../services/notes-services.js';

export default {
  props: ['note'],
  template: `
            <section class="note-img-details" >
                        <h2>Edit Canvas</h2>
                        <input :style="{'background-color': note.bgColor}"  type="text" class="note-title-input" @input="updateNote" v-model="updatedNote.title" placeholder="Edit Title">
                    <div class="canvas-container"> 
                        <canvas ref="canvas" id="canvas" @mousemove="draw" @mouseup="finishPosition" @mousedown="startPosition">

                        </canvas>
                    </div>
            </section>
        `,
  components: {},
  created() {
    this.updatedNote = this.note;
  },
  data() {
    return {
      updatedNote: null,
    };
  },
  mounted() {
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext('2d');
    this.vueCanvas = ctx;
    if (this.note.info.canvas) {
      var elImg = new Image();
      elImg.src = this.note.info.canvas;
      this.vueCanvas.drawImage(elImg, 0, 0, 300, 150);
    }
  },
  methods: {
    updateNote() {
      this.$emit('updateNote', this.updatedNote);
      eventBus.emit('updateNotes');
    },
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
      this.painting = true;
    },
    finishPosition() {
      this.painting = false;
      this.vueCanvas.beginPath();
      this.note.info.canvas = this.$refs.canvas.toDataURL();
      noteService.update(this.note);
      this.updateNote();
      eventBus.emit('updateNotes');
    },
  },
  computed: {},
  unmounted() {
    eventBus.emit('updateNotes');
  },
};
