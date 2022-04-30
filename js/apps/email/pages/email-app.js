import { emailService } from '../services/email-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../pages/email-details.cmp.js'
import folderList from '../cmps/folder-list.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'

export default {
  template: `
              <section >
                  <email-filter :show="isList" @filter="setFilter" @updateEmails="getEmails"/>
                  <div class="email-app">
                  <folder-list  class="folder-list-main" :count="unReadEmailsCount" @filtered="setFilter"/>
                  <email-details v-if="selectedEmail" :email="selectedEmail" @showList="showList"/>
                  <email-list v-if="isList" :emails="emailsToShow"  @close="emailShow = null" @select="saveSelectedEmail" />
                  </div>
                  <email-compose :noteEmail="noteEmail"/>
              </section>
          
          `,
  components: {
    emailService,
    emailList,
    emailDetails,
    folderList,
    emailCompose,
    emailFilter,
  },
  data() {
    return {
      isList: true,
      emailId: null,
      emails: null,
      selectedEmail: null,
      filterBy: null,
      show: true,
      unReadEmailsCount: 0,
      noteEmail: {
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
    if (this.$route.query.subject || this.$route.query.body) {
      this.noteEmail.subject = this.$route.query.subject
      this.noteEmail.body = this.$route.query.body
    }

    this.unsubscribe = eventBus.on('save', this.saveEmail)
    this.unsubscribe = eventBus.on('removeEmail', this.removeEmail)
    this.unsubscribe = eventBus.on('starEmail', this.starEmail)
    this.getEmails()
  },
  methods: {
    showList() {
      this.isList = true
      this.selectedEmail = null
    },
    starEmail(id) {
      const currEmail = this.getEmailById(id)
      currEmail.isStarred = !currEmail.isStarred
      return emailService.save(currEmail).then((this.emails = [...this.emails]))
    },
    getEmailById(id) {
      return this.emails.find((email) => email.id === id)
    },
    emailShow(email) {
      this.selectedEmail = email
    },
    getEmails() {
      emailService.query().then((emails) => {
        this.emails = emails
        this.unReadCount()
      })
    },
    removeEmail(id) {
      const currEmail = this.getEmailById(id)
      if (!currEmail.isDeleted) {
        currEmail.isDeleted = true
        return emailService
          .save(currEmail)
          .then((this.emails = [...this.emails]))
      }
      emailService
        .remove(id)
        .then(() => {
          const idx = this.emails.findIndex((email) => email.id === id)
          this.emails.splice(idx, 1)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    saveSelectedEmail(email) {
      this.isList = false
      emailService.save(email).then((email) => {
        this.getEmails()
        this.selectedEmail = email
      })
    },
    saveEmail(email) {
      emailService.save(email).then((email) => {
        this.getEmails()
      })
    },
    setFilter(filterBy) {
      this.getEmails()
      this.showList()
      this.filterBy = filterBy
    },
    unReadCount() {
      this.unReadEmailsCount = 0
      this.emails.forEach((email) => {
        if (!email.isRead && !email.isDeleted) this.unReadEmailsCount++
      })
    },
  },
  computed: {
    emailsToShow() {
      if (
        !this.filterBy ||
        this.filterBy === 'all' ||
        this.filterBy.isRead === 'All'
      ) {
        return this.emails.filter((email) => !email.isSent && !email.isDeleted)
      }
      if (this.filterBy === 'isSent') {
        return this.emails.filter((email) => email.isSent && !email.isDeleted)
      }
      if (this.filterBy === 'isStarred') {
        return this.emails.filter(
          (email) => email.isStarred && !email.isDeleted
        )
      }
      if (this.filterBy === 'isDeleted') {
        return this.emails.filter((email) => email.isDeleted)
      }

      if (
        this.filterBy.isRead === 'Unread' ||
        this.filterBy.isRead === 'unread'
      ) {
        return this.emails.filter(
          (email) => !email.isRead && !email.isDeleted && !email.isSent
        )
      }
      if (this.filterBy.isRead === 'Read' || this.filterBy.isRead === 'read') {
        return this.emails.filter(
          (email) => email.isRead && !email.isDeleted && !email.isSent
        )
      }
      if (this.filterBy.date) {
        const inboxEmails = this.emails.filter(
          (email) => !email.isSent && !email.isDeleted
        )
        return inboxEmails.sort((a, b) => {
          return new Date(b.sentAt) - new Date(a.sentAt)
        })
      }
      if (this.filterBy.abc) {
        const inboxEmails = this.emails.filter(
          (email) => !email.isSent && !email.isDeleted
        )
        return inboxEmails.sort((a, b) => {
          var firstName = a.to
          var secondName = b.to
          if (firstName > secondName) return 1
          else return -1
        })
      }
      if (this.filterBy.subject) {
        const regex = new RegExp(this.filterBy.subject, 'i')
        return this.emails.filter((email) => regex.test(email.subject))
      }
      if (!this.filterBy.subject && !this.filterBy.isRead) {
        return this.emails.filter((email) => !email.isSent && !email.isDeleted)
      }
    },
  },
}
