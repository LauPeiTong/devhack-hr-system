<template lang="pug">
  v-card.pa-4.rounded-lg(outlined)
      .company.fill-width.py-4
        p.text-h5.px-2.mb-0.pt-0.primary--text News
          |
          span.subtitle-2.secondary--text.ml-2 (12 news)
        hr.px-2
        p.subtitle-2.px-2.pt-2.mb-0 Keywords:
        d-flex.flex-wrap
          v-chip.chip-small.mb-1.ml-2(
            color="#a05195"
            outlined
            pill
          )
            p.mb-0 ChatGPT
          v-chip.chip-small.mb-1.ml-2(
            color="#a05195"
            outlined
            pill
          )
            p.mb-0 AI
        v-card.pa-2.mt-4(outlined)
          .d-flex.flex-no-wrap.justify-space-between
            .company
              .d-flex.flex-wrap.align-center
                p.mb-1.text-h6.pr-2 Malaysia News
              p.mb-0.subtitle-2.font-weight-regular ...wish to invest RM XXXXXXX.XX in developing an application that utilizes
                |
                span.green--text  ChatGPT
                |
                span  in the future...
        v-card.pa-2.mt-2(outlined)
          .d-flex.flex-no-wrap.justify-space-between
            .company
              .d-flex.flex-wrap.align-center
                p.mb-1.text-h6.pr-2 Malaya Mail
              p.mb-0.subtitle-2.font-weight-regular ...wish to invest RM XXXXXXX.XX in developing an application that utilizes
                |
                span.green--text  ChatGPT
                |
                span  in the future...
        v-card.pa-2.mt-4(outlined)
          .d-flex.flex-no-wrap.justify-space-between
            .company
              .d-flex.flex-wrap.align-center
                p.mb-1.text-h6.pr-2 Malaysia News
              p.mb-0.subtitle-2.font-weight-regular ...wish to invest RM XXXXXXX.XX in developing an application that utilizes
                |
                span.green--text  ChatGPT
                |
                span  in the future...

</template>

<script>
export default {
  name: 'CompanyStatus',
  data () {
    return {
    }
  },
  methods: {
    getColor (category) {
      const result = this.colors.find((c) => { return c.name === category })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    onRowClick (item) {
      this.$router.push('/company')
    }
  }
}
</script>

<style lang="scss" scoped>
.width-95 {
  width: 95% !important;
}

.fill-height {
  height: 100% !important;
}
</style>
