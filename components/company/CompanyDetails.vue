<template lang="pug">
v-card.pa-4.rounded-lg(outlined)
  v-card-text
      h2.fw-600.secondary--text.mb-4 Employee details
      .d-flex.flex-no-wrap.justify-space-between.align-center
        .company.fill-width
            v-card.px-4.py-2.rounded-xl(outlined)
              v-card-title.pa-0
                p.mb-0.primary--text Kim Junkyu
              .d-flex.align-center.justify-start
                p.mb-1.orange--text 4/10
                eva-icon(name="star" :height="16" :fill="$vuetify.theme.themes.light.orange")
              p.subtitle-1.mb-0.font-weight-medium Position:
                |
                v-chip.chip-small.mb-1.ml-2(
                  color="#a05195"
                  outlined
                  pill
                )
                  p.mb-0 Salesperson
              p.subtitle-1.mb-0.font-weight-medium Email:
                |
                span.font-weight-regular.ml-2.body-1 junkyuKim@gmail.com

              p.subtitle-1.mb-0.font-weight-medium Contact No.:
                |
                span.font-weight-regular.ml-2 03-347859859
              p.subtitle-1.mb-0.font-weight-medium Basic Salary:
                |
                span.font-weight-regular.ml-2 RM 2900.00
              //- a.subtitle-1.mb-0.font-weight-regular.text-decoration-underline View Details

        v-avatar.ma-1.ml-5(
          size="140"
          tile
        )
         v-img(:src="require(`../../assets/company/employee_icon.png`)")
</template>

<script>
export default {
  name: 'CompanyDetails',
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

.fw-600 {
  font-weight: 600 !important;
}
</style>
