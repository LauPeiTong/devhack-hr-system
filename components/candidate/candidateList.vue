<template lang="pug">
v-card.rounded-lg
  v-card-title.pb-0
    p.mb-0.text-h6.primary--text Recommended Candidates
  v-card-text
    .d-flex.align-center.mb-2
      .caption.secondary--text.mb-1.mr-1 Developer Role
      eva-icon(name="briefcase-outline" :fill="$vuetify.theme.themes.light.primary" width="16" height="16")
    v-card.px-4.py-2.mb-2(outlined)
      .d-flex.flex-no-wrap.justify-space-between
        .company
          .d-flex.flex-wrap.align-center
            p.mb-1.text-h6.pr-2 Dylan Tan
          p.mb-0.pb-2 Software Developer
          v-row.pt-2.pb-2.pl-1
            v-chip.chip-small.mb-1(
              color='#008000'
              outlined
              pill
              )
                p.mb-0.caption Interviewed
            v-chip.chip-small.mb-1.ml-1(
              color='#008000'
              outlined
              pill
              )
                p.mb-0.caption Referred
          v-progress-linear.rounded-xl.mt-4.mb-1(
            :value="90"
            color='#90EE90'
            height="20"
            striped
          )
            template(v-slot:default=" { value }")
              p.mb-0.brown--text {{ Math.ceil(value) }}/100
        v-col
          v-row.pb-4.pl-16
            v-avatar(
              class="ma-1"
              size="60"
              tile
            )
              v-img(:src="require(`../../assets/employee/1.png`)")
          v-row.pl-10
            v-btn.ma-1.primary Send Offer

    v-card.px-4.py-2.mb-2(outlined)
      .d-flex.flex-no-wrap.justify-space-between
        .company
          .d-flex.flex-wrap.align-center
            p.mb-1.text-h6.pr-2 Aiman Humaira
          p.mb-0.pb-2 Fullstack Developer
          v-row.pt-2.pb-2.pl-1
            v-chip.chip-small.mb-1(
              color='#FF0000'
              outlined
              pill
              )
                p.mb-0.caption Not Interviewed
          v-progress-linear.rounded-xl.mt-4.mb-1(
            :value="70"
            color='#ADD8E6'
            height="20"
            striped
          )
            template(v-slot:default=" { value }")
              p.mb-0.brown--text {{ Math.ceil(value) }}/100
        v-col
          v-row.pb-4.pl-16
            v-avatar(
              class="ma-1"
              size="60"
              tile
            )
              v-img(:src="require(`../../assets/employee/2.png`)")
          v-row.pl-10
            <v-btn class="ma-1" color="primary">Schedule</v-btn>

    v-card.px-4.py-2.mb-2(outlined)
      .d-flex.flex-no-wrap.justify-space-between
        .company
          .d-flex.flex-wrap.align-center
            p.mb-1.text-h6.pr-2 Menghui
          p.mb-0.pb-2 Machine Learning Engineer
          v-row.pt-2.pb-2.pl-1
            v-chip.chip-small.mb-1(
              color='#008000'
              outlined
              pill
              )
                p.mb-0.caption Interviewed
          v-progress-linear.rounded-xl.mt-4.mb-1(
            :value="60"
            color='#FFD580'
            height="20"
            striped
          )
            template(v-slot:default=" { value }")
              p.mb-0.brown--text {{ Math.ceil(value) }}/100
        v-col
          v-row.pb-4.pl-16
            v-avatar(
              class="ma-1"
              size="60"
              tile
            )
              v-img(:src="require(`../../assets/employee/3.png`)")
          v-row.pl-10
            <v-btn class="ma-1" color="primary">Send Offer</v-btn>
      //- v-card.pa-3.rounded-lg(outlined)
      //-   h3.fw-600.secondary--text.px-4.pt-4 Sales Category
      //-   .d-flex.align-center.px-4
      //-     p.mb-1.mr-2.primary--text 1 June 2022 - 1 July 2023
      //-     eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary" width="18" height="18")
      //-   ApexCharts.d-flex.justify-space-around(type="radialBar" :options="options2" :series="series2" width="300" height="300")
      //-   p.body-2.px-4.mb-0.secondary--text.text-center The category with highest sales is
      //-     |
      //-     span.danger--text  Affordable Housing
      //-   v-card.rounded-lg.ma-4.px-4.py-2(outlined)
      //-     strong.fw-600.darkGrey--text Residential Property
      //-     h3.primary--text RM 144000
      //-   v-card.rounded-lg.ma-4.px-4.py-2(outlined)
      //-     strong.fw-600.darkGrey--text Commercial Property
      //-     h3.primary--text RM 240000
      //-   v-card.rounded-lg.ma-4.px-4.py-2(outlined)
      //-     strong.fw-600.darkGrey--text Luxury Property
      //-     h3.primary--text RM 124000
      //-   v-card.rounded-lg.ma-4.px-4.py-2(outlined)
      //-     strong.fw-600.darkGrey--text Affordable Housing
      //-     h3.primary--text RM 300000
</template>

<script>
import candidateButton from './candidateButton.vue'
export default {
  name: 'CandidateList',
  data () {
    return {
      candidateButton
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.width-95 {
  width: 95% !important;
}
.v-progress-linear.rounded-xl.mt-2.mb-1 {
    width: 150px;
  }
.chip-small {
  height: 22px;
}
.fill-height {
  height: 100% !important;
}
.neg-margin {
  margin-top: -50px;
}
.neg-margin-2 {
  margin-top: -20px;
}
.fw-600 {
  font-weight: 600 !important;
}
</style>
