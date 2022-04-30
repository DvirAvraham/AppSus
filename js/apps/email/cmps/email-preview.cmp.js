import { eventBus } from '../../../services/eventBus-service.js';

export default {
  props: ['email'],
  template: `
     <section class="email-preview" >
       <div class="preview-container" :class="isReadBgc" >
           <i  @click.stop="star(email.id)" class="fa-solid fa-star preview-star" :class="isStar"  class="preview-btn"></i>
          <div class="preview-content">
                <div class="sender-name" :class="isRead">{{Sender}} </div>
                <div class="email-subject" :class="isRead"> {{email.subject}}  </div>
                <div class="preview-email-body"> -  {{emailTxt}} <span class="preview-date">{{time}} </span></div>
          </div>
                <div class="actions">
                   <i title="remove" @click.stop="remove(email.id)" class="fa-solid fa-trash-can" class="preview-btn"></i>
                   <i title="Readen" v-if="email.isRead" class="fa-solid fa-envelope-open" class="preview-btn" @click.stop="save(email)"></i>
                   <i title="Unreaden" v-else class="fa-solid fa-envelope" class="preview-btn" @click.stop="save(email)"></i>
                   <i class="fa-solid fa-clock" class="preview-btn"></i>
                   <i title="Send as note" @click.stop="sendEmailAsNote(email)" class="fa-solid fa-note-sticky" class="preview-btn"></i>
                </div>
         </div>
     </section>
    `,

  methods: {
    save(email) {
      email.isRead = !email.isRead;
      eventBus.emit('save', email);
    },
    remove(id) {
      eventBus.emit('removeEmail', id);
      eventBus.emit('show-msg', {
        txt: 'Email Removed',
        type: 'success',
      });
    },
    star(id) {
      eventBus.emit('starEmail', id);
      eventBus.emit('show-msg', {
        txt: 'Email Starred',
        type: 'success',
      });
    },
    sendEmailAsNote(email) {
      let subject = email.subject;
      let body = email.body;
      this.$router.push(`/notes?subject=${subject}&body=${body}`);
    },
  },
  computed: {
    time() {
      var currDate = new Date();
      var day = 60 * 60 * 24 * 1000;
      var year = day * 365;
      var sentAt = new Date(this.email.sentAt);
      if (currDate - sentAt < day)
        return sentAt.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        });
      if (currDate - sentAt > day && currDate - sentAt < year)
        return sentAt.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        });
      if (currDate - sentAt > year)
        return sentAt.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
    },

    isStar() {
      if (this.email.isDeleted) return 'dont-show';
      if (this.email.isStarred) return 'isStar';
    },
    isRead() {
      if (!this.email.isRead)
        return { read: [this.email.to, this.email.subject] };
    },
    isReadBgc() {
      if (!this.email.isRead)
        return { bgc: [this.email.to, this.email.subject] };
    },
    Sender() {
      return this.email.to.substring(0, [this.email.to.indexOf('@')]);
    },
    emailTxt() {
      if (this.email.body.length > 30)
        return this.email.body.substring(0, 30) + '...';
      else return this.email.body;
    },
  },
};
