<template lang="pug">
.candidates-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Chatbot'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
  .pt-16.px-4.ma-0.justify-top.align-center
    v-col.pt-4(cols="12")
      chat-bot.pt-4.align-center.px-4
</template>

<script>
import { mapGetters } from 'vuex'
import ChatBot from '~/components/chatbot/ChatBot.vue'
import UpperTitleVue from '~/components/UpperTitle.vue'

export default {
  name: 'ChatbotPage',
  components: {
    UpperTitleVue,
    ChatBot
  },
  layout: 'default',
  data () {
    return {
      // search: null
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
