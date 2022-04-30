export default {
  props: ['note'],
  template: `
        <section class=" note-txt-details"  :style="{'background-color': note.bgColor}">
            <input :style="{'background-color': note.bgColor}"  type="text" class="note-title-input" @input="updateNote" v-model="updatedNote.title" placeholder="Edit Title">
            <textarea :style="{'background-color': note.bgColor}" rows="10" cols="20"class="note-txt-input" @input="updateNote" v-model="updatedNote.info.txt" placeholder="Write your text"></textarea>
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
      console.log('hi');
      this.$emit('updateNote', this.updatedNote);
    },
  },
  computed: {},
  unmounted() {},
};
