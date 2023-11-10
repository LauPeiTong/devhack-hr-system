<template lang="pug">
v-row.candidate-compare.justify-center.mx-auto
  v-card.px-6.pb-6.rounded-lg.fill-width(elevation="0")
    v-row
      v-col(:cols="9")
        v-card-title.px-0.pb-0
          h3.font-weight-medium.pb-3 Recruitment.AI
          v-spacer
          p.body-2.mb-1.mr-2.primary--text We streamline and enhance the recruitment process by efficiently screening resumes, identifying top candidates, automating initial communication, and providing valuable insights, ultimately saving time, improving candidate quality, and facilitating a more data-driven hiring strategy.
        v-card-body
          v-row.pt-8
            v-col(:cols="3")
              v-card.fill-height.primary--border.rounded-lg.pa-4.primary--text.text-center(outlined @click="goToPath('/search')")
                v-card.rounded-lg.lightBlue3.pa-3.mb-3.mx-12(flat)
                  v-icon.primary--text(x-large) mdi-account-search
                p.font-weight-medium.font-14.mb-0 Candidates Sourcing
            v-col(:cols="3")
              v-card.fill-height.primary--border.rounded-lg.pa-4.primary--text.text-center(outlined @click="goToPath('/candidates')")
                v-card.rounded-lg.lightBlue3.pa-3.mb-3.mx-12(flat)
                  v-icon.primary--text(x-large) mdi-magnify
                p.font-weight-medium.font-14.mb-0 Candidates Comparison
            v-col(:cols="3")
              v-card.fill-height.primary--border.rounded-lg.pa-4.primary--text.text-center(outlined @click="goToPath('/candidate')")
                v-card.rounded-lg.lightBlue3.pa-3.mb-3.mx-12(flat)
                  v-icon.primary--text(x-large) mdi-file-document
                p.font-weight-medium.font-14.mb-0 Interview
      v-col(:cols="3")
        v-img(:src="require(`../../assets/img/dashboard.png`)" max-height="300" max-width="300")
</template>

<script>

export default {
  name: 'RecruitmentStep',
  components: { },
  data () {
    return {
      menus: [
        {
          link: '/dashboard',
          name: 'Dashboard',
          tooltip: 'Dashboard',
          icon: 'bx-grid-alt'
        },
        {
          link: '/candidates',
          name: 'Candidates',
          tooltip: 'Candidates',
          icon: 'bx-bar-chart-square'
        },
        {
          link: '/message',
          name: 'Chatbot',
          tooltip: 'Chatbot',
          icon: 'bx-message'
        },
        {
          link: '/',
          name: 'Setting',
          tooltip: 'Setting',
          icon: 'bx-cog'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    goToPath (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style scoped>
.wrapped-text {
  white-space: pre-wrap;
}

.font-14 {
  font-size: 14px;
}

.primary--border{
  border: solid 1px #4C5175;
}
</style>
