<template lang="pug">
div
 v-card.pa-4.mb-4.rounded-lg(outlined)
   .company.fill-width
       p.subtitle-3.px-4.pt-2.mb-0 Sales
       p.subtitle-1.font-weight-regular.ml-4.primary--text from 12/8/2023 to 18/6/2023

 v-card.pa-4.rounded-lg(outlined)
   .company.fill-width
       p.subtitle-3.px-4.pt-2.mb-0 Net Sales
       p.subtitle-1.font-weight-regular.ml-4.primary--text from 12/8/2023 to 18/6/2023
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
