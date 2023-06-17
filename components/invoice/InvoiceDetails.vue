<template lang="pug">
  v-card.pa-4.rounded-lg(outlined)
    v-card-title.py-0
      p.mb-2.mt-4 Extracted Invoice Data
    v-card-text
        .d-flex.flex-wrap.justify-space-between.align-center
          //- v-img(:src="require(`../../assets/invoice.jpg`)")
          .company.fill-width
              v-card.px-4.py-2(outlined)
                //- v-card-title.pa-0.mb-2
                //-   p.mb-0.primary--text Food

                p.subtitle-1.mb-0.font-weight-medium Category:
                  |
                  span.font-weight-regular.ml-2.body-1 Apartment
                p.subtitle-1.mb-0.font-weight-medium  Invoice Number:
                  |
                  span.font-weight-regular.ml-2.body-1 GB-INV202300000120
                p.subtitle-1.mb-0.font-weight-medium Invoice Date:
                  |
                  span.font-weight-regular.ml-2 09 Jun 2023
                p.subtitle-1.mb-0.font-weight-medium Customer Name:
                  |
                  span.font-weight-regular.ml-2 Lau Say Heng
                p.subtitle-1.mb-0.font-weight-medium Contact Number:
                  |
                  span.font-weight-regular.ml-2 012-2345673
                p.subtitle-1.mb-0.font-weight-medium Email:
                  |
                  span.font-weight-regular.ml-2 lausayheng@gmail.com
                p.subtitle-1.mb-0.font-weight-medium Country:
                  |
                  span.font-weight-regular.ml-2 Malaysia
                p.subtitle-1.mb-0.font-weight-medium Currency:
                  |
                  span.font-weight-regular.ml-2 RM
                p.subtitle-1.mb-0.font-weight-medium Sub Total:
                  |
                  span.font-weight-regular.ml-2 2,000,000
                p.subtitle-1.mb-0.font-weight-medium Tax:
                  |
                  span.font-weight-regular.ml-2 200
                p.subtitle-1.mb-0.font-weight-medium Total:
                  |
                  span.font-weight-regular.ml-2 2,000,200
                //- a.subtitle-1.mb-0.font-weight-regular.text-decoration-underline View Details
          v-img(:src="require(`../../assets/invoice.jpg`)")
  </template>

<script>
export default {
  name: 'InvoiceDetails',
  data () {
    return {}
  },
  methods: {
    getColor (category) {
      const result = this.colors.find((c) => {
        return c.name === category
      })
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
