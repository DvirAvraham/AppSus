import colorPicker from './note-color-pick.cmp.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['note'],
  template: `
        <section class="note-actions-details">
            
                <div @click="goBack" title="Go back">
                    <i class="fa-solid fa-arrow-left-long"></i>
                </div>

               <div class="color-palette" @click="chooseColor = !chooseColor"  title="Change note color"> 
                    <i class="fa-solid fa-palette"></i>
                    <color-picker  v-if="chooseColor" @updateColor="updateColor"/>
                </div>
  
                <div @click="removeNote" title="Remove note">
                  <i class="fa-solid fa-trash"></i>
                </div>

                <div @click="sendNote" title="Send note">
                  <i class="fa-solid fa-paper-plane"></i>
                </div>

        </section>
    `,
  components: {
    colorPicker,
  },
  created() {},
  data() {
    return {
      chooseColor: false,
    };
  },
  methods: {
    updateColor(color) {
      this.$emit('updateColor', color);
    },
    goBack() {
      eventBus.emit('closeEdit');
    },
    removeNote() {
      this.$emit('removeNote');
    },
    sendNote() {
      console.log('hi');
      this.$emit('sendNote');
    },
  },
  computed: {},
  unmounted() {},
};
