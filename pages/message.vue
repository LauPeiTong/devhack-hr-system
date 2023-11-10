<template lang="pug">
.message-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Chatbot'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
  .scroll.ma-0.justify-top.align-center(id="scroll")
    v-col.pt-7(cols="12")
      .pt-16.align-center.px-4
        v-card.chatbot.rounded-lg(elevation="0" height="640")
          .chat
            v-container.pt-0
              v-row
                //- v-col(cols="12")
                //-   p {{ data }}
                v-col.pb-0.mt-0(cols="12")
                  v-card.overflow-y-auto.rounded-lg.px-8.pt-4.pb-3.mx-4.mt-4.fill-height(outlined height="520")
                    v-img.mx-auto.rounded-pill.mb-1(:src="require(`../assets/img/rbot.gif`)" max-height="200" max-width="200")
                    p.secondary--text.text-center.font-weight-medium.mb-0 Hi, I'm RBot, your Recruitment Helper!
                    p.caption.grey--text.text-center I will help you to streamline recruitment processes, effortlessly handling tasks from candidate sourcing to hiring decisions with efficiency and precision.
                    .font-weight-medium.mb-2.secondary--text.pt-4 You can ask:
                    v-row
                      template(v-for="s in suggestion")
                        v-col.pr-2.pl-2.pb-0(cols="6")
                          v-card.px-4.py-2.rounded-lg.fill-height.background(elevation="0" @click="goToWeBotPage(s)")
                            .font-14.font-weight-medium.mb-0.primary--text {{s.name}}
                            p.mb-0.caption {{s.text}}

          v-footer.white.rounded-t-xl(absolute elevation="0")
            v-col.pt-0(cols="12")
              v-textarea.rounded-xl.message-text-field(outlined auto-grow hide-details rows="1"
                v-model="message"
                label="You can ask RBot to streamline recruitment processes"
                :color="$vuetify.theme.themes.light.primary"
                append-outer-icon="mdi-send-circle"
                @keydown=""
                v-on:keyup.enter="goToWeBotPage(null)"
                @click:append-outer="goToWeBotPage(null)")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UpperTitle from '../components/UpperTitle.vue'
// It needs money ya > <
import { sendMessageToChatGPT } from '@/store/chatgptService' // Update the path

export default {
  name: 'MessagePage',
  components: {
    UpperTitle
  },
  layout: 'default',
  data () {
    return {
      data: '',
      message: '',
      suggestion: [
        { id: 1, name: 'Generate a formal offer letter', text: 'including details such as job title, start date, and compensation for the candidate who has been approved.' },
        { id: 2, name: 'Provide a set of interview questions', text: 'focusing on assessing both technical skills and cultural fit within our company.' },
        { id: 3, name: 'Provide a detailed job description', text: 'emphasizing the impact the successful candidate will have on our team and organization.' },
        { id: 4, name: 'Generate a list of job requirements', text: 'including essential qualifications, skills, and experience needed for success in this position.' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      quota: 'webot/getQuota'
    })
  },
  methods: {
    ...mapActions({
      addConversation: 'webot/addMessage',
      useQuota: 'webot/reduceQuota'
    }),
    async getRespones (isSuggestion = true, id = -1) {
      const response = await sendMessageToChatGPT(this.$axios, this.message, isSuggestion)

      if (id === -1) {
        this.webot = this.processText(response)
      } else {
        this.webot = 'Here is my suggestion:\n' + response
        this.webot = this.processText(this.webot)
      }
      this.addConversation({ text: this.webot, isDefault: id > 0, isMe: false, defaultId: id })
    },
    goToWeBotPage (m) {
      if (this.quota < 1) {
        this.message = this.processText(this.message)
        this.addConversation({ text: (m !== null ? m.name + ' ' + m.text : this.message === '' ? 'Suggest a random recipe' : this.processText(this.message)), isDefault: false, isMe: true, defaultId: -1 })

        this.webot = 'You have exceeded the WeBot free quota (10 times). You can purchase more foods to gain more quota. Thank you ^^'
        this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

        this.message = ''

        console.log('You have exceeded the WeBot quota (10 times). You can purchase more foods to gain more quota. Thank you ^^')
      } else {
        if (m !== null) {
          // If default message is selected
          const question = m.name + ' ' + m.text

          this.addConversation({ text: question, isDefault: true, isMe: true, defaultId: -1 })
          this.message = m.name + ' ' + m.text

          // Use chatgpt
          this.getRespones(true, m.id)
        } else {
          if (this.message === '') {
            this.message = 'Suggest a random recipe'
          } else {
            this.message = this.processText(this.message)
          }
          this.addConversation({ text: this.message, isDefault: false, isMe: true, defaultId: -1 })

          // Use chatgpt
          this.getRespones(this.message === '')
        }

        // Testing
        // this.webot = 'hello'
        // this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

        this.useQuota()
        this.message = ''
      }
      this.$router.push('/chatbot')
    },
    processText (inputText) {
      this.processedText = inputText.replace(/\\n/g, '\n')
      return this.processedText
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 2000px;
}

.font-14 {
  font-size: 14px;
}

</style>
