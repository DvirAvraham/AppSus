import { eventBus } from '../../../services/eventBus-service.js'

export default {
  props: ['email'],
  template: `
        <section  class="email-details">
          <div class="actions-details" >
            <i  @click="this.$emit('showList')" class="fa-solid fa-arrow-left" ></i>
                 <i @click.stop="remove(email.id)" class="fa-solid fa-trash-can" ></i>
                 <i class="fa-solid fa-clock" ></i>
                 <i @click.stop="sendEmailAsNote(email)" class="fa-solid fa-note-sticky" ></i>
                 <i  @click.stop="star(email.id)" class="fa-solid fa-star preview-star" :class="isStar"  ></i>
              </div>
            <div class="email-details-container">
              <p class="email-subject"> {{email.subject}} </p>
              <p class="contact-details"> <span class="email-sender">{{sender}}</span>  <span class="email-address"><{{email.to}}></span></p>
              <p class="email-txt"> {{email.body}} </p>
            </div>

       </section>
    `,


methods: {
    remove(id) {
      this.$emit('showList')
      eventBus.emit('removeEmail', id)
      eventBus.emit('show-msg', {
        txt: 'Email Removed',
        type: 'success',
      });
    },
    star(id) {
      this.email.isStarred = !this.email.isStarred
      eventBus.emit('starEmail', id)
      eventBus.emit('show-msg', {
        txt: 'Email Starred',
        type: 'success',
      });
    },
    sendEmailAsNote(email) {
      let subject = email.subject
      let body = email.body
      this.$router.push(`/notes?subject=${subject}&body=${body}`)
    },
  },
  computed: {
    sender(){
      return this.email.to.substring(0,[this.email.to.indexOf('@')])
    },
    isStar() {
      if (this.email.isDeleted) return 'dont-show'
      if (this.email.isStarred) return 'isStar'
    },
    },


}
