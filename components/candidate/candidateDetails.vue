<template lang="pug">
v-card.pa-4.rounded-lg(outlined)
  v-card-text
      p.pt-1.pb-3.mb-0.text-h6.primary--text Candidate details
      .d-flex.flex-no-wrap.justify-space-between.align-center
        .company.fill-width
            v-card.px-4.py-2.rounded-xl(outlined)
              v-card-title.pa-0
                p.mb-0.primary--text Dylan Tan
              .d-flex.align-center.justify-start
                p.mb-1.orange--text 9/10
                eva-icon(name="star" :height="16" :fill="$vuetify.theme.themes.light.orange")
              p.subtitle-1.mb-0.font-weight-medium Position:
                |
                v-chip.chip-small.mb-1.ml-2(
                  color="#a05195"
                  outlined
                  pill
                )
                  p.mb-0 Software Developer
              p.subtitle-1.mb-0.font-weight-medium Email:
                |
                span.font-weight-regular.ml-2.body-1 dylan@gmail.com

              p.subtitle-1.mb-0.font-weight-medium Contact No.:
                |
                span.font-weight-regular.ml-2 012-347859859
              p.subtitle-1.mb-0.font-weight-medium Current Employer:
                |
                span.font-weight-regular.ml-2 PWC
              //- a.subtitle-1.mb-0.font-weight-regular.text-decoration-underline View Details
</template>

<script>
export default {
  name: 'CandidateDetails',
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
