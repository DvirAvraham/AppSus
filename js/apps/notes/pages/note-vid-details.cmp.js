export default {
  props: ['note'],
  template: `
            <section class=" note-img-details"  :style="{'background-color': note.bgColor}">
            <input :style="{'background-color': note.bgColor}"  type="text" class="note-title-input" @input="updateNote" v-model="updatedNote.title" placeholder="Edit Title">
                <div class="video-container">
                    <iframe class="responsive-iframe" 
                    :src="embedVidUrl"
                    frameBorder="0"                   
                    >
                    </iframe>
                </div>
                <label for="">Enter new video url</label>
                <input :style="{'background-color': note.bgColor}"  type="text" class="note-img-input" @change="updateNote" v-model="updatedNote.info.url" placeholder="Enter new video url">
                
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
  methods: {
    updateNote() {
      this.$emit('updateNote', this.updatedNote);
    },
  },
  computed: {
    embedVidUrl() {
      return this.note.info.url.replace('watch?v=', 'embed/');
    },
  },
  unmounted() {},
};
