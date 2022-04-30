import { eventBus } from '../../../services/eventBus-service.js'
import { emailService } from '../services/email-service.js'

export default {
  props: ['noteEmail'],
  template: `
     <section>
         <div class="email-compose" :class="isOpen" :class="isModalWide">
             <div class="compose-header" :class="isModalHeaderWide">
                  <div>New Massage</div>
                  <div class="compose-actions">
                  <div  @click="toggleWideModal"><i class="fa-solid fa-up-right-and-down-left-from-center expand-compose"></i></div>
                  <div @click="closeModal" class="compose-close">x</div>
                  </div>
              </div>
                 <form >
                    <div class="compose-inputs"> 
                     To<input type="email" placeholder="example@gmail.com" v-model="email.to" required>
                   </div>            
                   <div class="compose-inputs"> 
                     Subject<input type="text"  v-model="email.subject">
                   </div>            
                   <div> 
                   <textarea rows="10" cols="40"  v-model="email.body" class="compose-body"></textarea>
                   </div>     
                   <button @click="sendEmail(email)"> Send  </button>
                </form>      
             </div> 
    </section>
      `,
  data() {
    return {
      isWide :false,
      isModalOpen: false,
      email: {
        subject: '',
        body: '',
        isRead: true,
        sentAt: Date.now(),
        to: '',
        isSent: true,
        isStarred: false,
        isDeleted: false,
      },
    }
  },
  created() {
    this.unsubscribe = eventBus.on('compose', this.openModal)
    if (this.noteEmail.subject) this.openNoteEmail()
  },
  methods: {
    toggleWideModal(){
      this.isWide = !this.isWide
    },
    resetCompose(){
      return  {
        subject: '',
        body: '',
        isRead: true,
        sentAt: Date.now(),
        to: '',
        isSent: true,
        isStarred: false,
        isDeleted: false,
      }
    },
    closeModal(){
      this.email = this.resetCompose
      this.isModalOpen=false
      this.$router.push({
        path:`/email`
    })
    },
    openNoteEmail() {
      this.isModalOpen = true
      this.email.subject = this.noteEmail.subject
      this.email.body = this.noteEmail.body
    },
    sendEmail(email) {
      emailService.save(email).then((res) => {
        this.isModalOpen = false
        this.$emit('updateEmails')
        this.$router.push({
          path:`/email`
      })
      eventBus.emit('show-msg', {
        txt: 'Email Sent',
        type: 'success',
      });
      this.email = this.resetCompose
      })
    },

    openModal() {
      this.isModalOpen = true
    },
  },
  computed: {
    isModalWide(){
      if (this.isWide) return 'wide'
    },
    isModalHeaderWide(){
      if (this.isWide) return 'wide-header'
    },
    isOpen() {
      if (this.isModalOpen) return 'open'
    },
  },
}
