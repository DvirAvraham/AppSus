import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="emails-list">
            <ul >
                <li v-for="email in emails" :key="email.id" class="email-list"  >
                   <email-preview :email="email"  @click="select(email)" />
                </li>
            </ul>
        </section>
    `,
    components:{
        emailPreview,
    },
    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        select(email) {
            email.isRead = true
            this.$emit('select',email)

            // this.$router.push({
            //     path:`/email/${email.id}`
            // })
        }
    },
    computed: {
        // isRead(){
        //     return { 'read': this.email.isRead}
        // }
    }
}