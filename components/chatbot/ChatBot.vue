<template lang="pug">
v-card.chatbot.rounded-lg(flat height="640" )
  v-card.chat.overflow-y-auto(id="scroll" height="520" flat)
    v-container.pt-4.px-6
      template(v-for="(c, index) in conversation")
        .me(v-if="c.isMe")
          v-row
            v-col.d-flex.justify-end(col="10")
              v-card.pa-2.rounded-lg.rounded-tr-0.lightBlue(outlined)
                p.body-2.wrapped-text {{ c.text }}

          v-fade-transition(leave-absolute mode="out-in")
            v-row.mb-1.mt-1(v-if="index === conversation.length - 1")
              v-col.d-flex.justify-start(cols="10")
                v-card.pa-2.rounded-lg.rounded-tl-0(outlined height="240")
                  p.body-2.wrapped-text.grey--text.mb-2 RBot is working on your response.
                  v-img.mx-auto.rounded-pill.mb-1(:src="require(`../../assets/img/think.gif`)" max-height="200" max-width="200")

        .webot(v-else)
          v-fade-transition(leave-absolute mode="out-in")
            v-row.mb-1.mt-1
              v-col.d-flex.justify-start(cols="10")
                v-card.pa-2.rounded-lg.rounded-tl-0(outlined)
                  .d-flex.justify-end.mb-1
                    v-icon.lightBlue2--text.me-2(small @click="") mdi-content-copy
                    v-icon.lightBlue2--text.me-2(small @click="") mdi-thumb-up-outline
                    v-icon.lightBlue2--text(small @click="") mdi-thumb-down-outline
                  pre.body-2.wrapped-text {{ c.text }}
              v-col(cols="10" v-if="c.isDefault && c.defaultId == 1 && c.text !== `Here is my suggestion:\nAn error occurred.`")
                v-row
                  v-col.pt-0(cols="10")
                    v-card.pa-2.rounded-lg.rounded-tl-0(outlined)
                      p.body-2.wrapped-text.font-weight-medium.mb-0 You can download the file in here to edit the offer letter:
                  v-col.pt-0(cols="3")
                    a.text-decoration-none(:href="require(`~/assets/img/rbot.gif`)" download="OfferLetter.docx")
                      v-card.mx-auto.rounded-lg.pt-4.fill-height.text-center(
                        @click=""
                        outlined
                      )
                        v-card.text-center.rounded-lg.background.mx-16(flat)
                          v-icon.pa-4.primary--text(x-large) mdi-file-document
                        .px-4.py-2
                          p.secondary--text.font-weight-medium.mb-0 Offer Letter
                          p.caption.darkGrey--text.font-weight-light.mb-1 Microsoft Word Document

  v-footer.white.rounded-t-xl(absolute elevation="0")
    v-col(cols="12")
      v-textarea.rounded-xl.message-text-field(outlined auto-grow hide-details rows="1"
        v-model="message"
        label="YYou can ask RBot to streamline recruitment processes"
        :color="$vuetify.theme.themes.light.primary"
        append-outer-icon="mdi-send-circle"
        @keydown=""
        v-on:keyup.enter="sendMessage"
        @click:append-outer="sendMessage")

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { sendMessageToChatGPT } from '@/store/chatgptService' // Update the path

export default {
  name: 'ChatBot',
  data () {
    return {
      webot: '',
      message: '',
      currentNoOfMessage: 0,
      suggestion: [
        { id: 1, name: 'Suggest a recipe', text: 'of Creamy Carbonara Pasta' },
        { id: 2, name: 'Suggest food items', text: 'to cook Fried Rice' },
        { id: 3, name: 'Suggest a dish', text: 'for a healthy diet ' },
        { id: 4, name: 'Suggest restaurants', text: 'that are cheap and near to me' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getMessageClass',
      conversation: 'webot/getConversation',
      quota: 'webot/getQuota',
      getSuggestedItems: 'webot/getSuggestedItems'
    })
  },
  watch: {
    conversation (newMessages, oldMessages) {
      if (newMessages.length > this.currentNoOfMessage) {
        this.$nextTick(() => {
          this.scrollToBottom()
          this.currentNoOfMessage += 1
        })
      }
    }
  },
  mounted () {
    // Use JavaScript to scroll to the bottom of the page
    this.scrollToBottom()
    this.currentNoOfMessage = this.conversation.length
  },
  methods: {
    ...mapActions({
      addConversation: 'webot/addMessage',
      useQuota: 'webot/reduceQuota'
    }),
    scrollToBottom () {
      // Scroll to the bottom of the page
      const scrollElement = document.getElementById('scroll')
      const currentScroll = scrollElement.scrollTop
      const targetScroll = scrollElement.scrollHeight - currentScroll
      const duration = 1000 // Set the duration of the scroll animation in milliseconds
      const startTime = performance.now()

      function animateScroll () {
        const currentTime = performance.now()
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const easedProgress = easeInOutQuad(progress)

        scrollElement.scrollTop = currentScroll + easedProgress * targetScroll

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      function easeInOutQuad (t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }

      requestAnimationFrame(animateScroll)
    },
    async getRespones () {
      const response = await sendMessageToChatGPT(this.$axios, this.message, false)
      this.webot = response
      this.webot = this.processText(this.webot)
      this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })
    },
    sendMessage () {
      if (this.quota < 1) {
        this.message = this.processText(this.message)
        this.addConversation({ text: this.message, isDefault: false, isMe: true, defaultId: -1 })

        this.webot = 'You have exceeded the WeBot free quota (5 times). You can purchase more foods to gain more quota. Thank you ^^'
        this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

        this.message = ''

        console.log('You have exceeded the WeBot quota (5 times). You can purchase more foods to gain more quota. Thank you ^^')
      } else {
        if (this.message !== '') {
          this.message = this.processText(this.message)
          this.addConversation({ text: this.message, isDefault: false, isMe: true, defaultId: -1 })

          // Use chatgpt
          this.getRespones()

          // Testing
          // this.webot = '"- Boil water with salt. \n- Add pasta, cook until al dente. \n- In a pan, heat olive oil and sauté garlic. \n- Add diced tomatoes, basil, and season with salt and pepper. - Simmer for 10 minutes. - Drain pasta and toss with tomato sauce. - Serve with grated Parmesan cheese. Enjoy!"'
          // this.webot = 'hello'
          // this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

          this.useQuota()
          this.message = ''
        }
        console.log(this.quota < 1)
      }
    },
    goBackToPreviousPage () {
      this.$router.push('/message')
    },
    processText (inputText) {
      this.processedText = inputText.replace(/\\n/g, '\n')
      return this.processedText
    }
  }
}
</script>

<style scoped>
.wrapped-text {
  white-space: pre-wrap;
}
</style>
