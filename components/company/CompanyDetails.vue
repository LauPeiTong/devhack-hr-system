<template lang="pug">
v-card.pa-4.rounded-lg(outlined)
      .d-flex.flex-no-wrap.justify-space-between
        .company.fill-width
          v-card-title
            p.mb-0.primary--text Kim Junkyu
          v-card-text
            v-card.px-4.py-2(outlined)
              p.subtitle-1.mb-0.font-weight-medium Position:
                |
                v-chip.chip-small.mb-1.ml-2(
                  color="#a05195"
                  outlined
                  pill
                )
                  p.mb-0 HR Manager
              p.subtitle-1.mb-0.font-weight-medium Email:
                |
                span.font-weight-regular.ml-2 junkyuKim@gmail.com

              p.subtitle-1.mb-0.font-weight-medium Contact No.:
                |
                span.font-weight-regular.ml-2 03-347859859
              p.subtitle-1.mb-0.font-weight-medium Company Name:
                |
                span.font-weight-regular.ml-2 KJK Sdn. Bhd.
              //- a.subtitle-1.mb-0.font-weight-regular.text-decoration-underline View Details

        v-avatar(
          class="ma-1"
          size="200"
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
</style>
