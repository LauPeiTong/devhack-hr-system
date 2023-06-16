<template lang="pug">
    v-card.pa-4.rounded-lg(outlined)
      .company.fill-width
        p.subtitle-2.px-4.pt-2.mb-0 Company Overview
        p.text-h5.px-4.mb-0.pt-0.primary--text Improving operational effectiveness through Intelligent automation, Data Services & ML and Conversational AI
        br
        v-card-text.pt-2
          p.font-weight-medium Intelligent Automation
          p Working with primarily UiPath and Microsoft (Power Automate/Apps) platforms, supported by other Intelligent Document providers (Abbyy/Google and more) we help our customers realize their automation journey, Our strong background in finance, supply chain, manufacturing and financial services gives us the necessary business understanding to transform and automate processes which makes sense for the business.
          br
          p.font-weight-medium Conversational AI
          p Whereas Robotic Process Automation takes care of execution Low-code Conversational AI engines like our platform, BotExpress, automates the communication through a variety of customer or internal channels. You can test the bot platform by clicking the chat box in lower right hand corner.
</template>

<script>
export default {
  name: 'CompanyOverview',
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
