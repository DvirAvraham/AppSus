export default {
  props: ['note'],
  template: `
          <section class="note-img-details" >
          <input :style="{'background-color': note.bgColor}"  type="text" class="note-title-input" @input="updateNote" v-model="updatedNote.title" placeholder="Edit Title">
              <img :src="note.info.url" alt="">
              <label for="">Enter new image url</label>
              <input :style="{'background-color': note.bgColor}"  type="text" class="note-img-input" @change="updateNote" v-model="updatedNote.info.url" placeholder="Enter new image url">
              
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
  computed: {},
  unmounted() {},
};
