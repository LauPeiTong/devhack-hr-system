<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
    upper-title.ma-0(:title="'Search'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
    v-row.ma-0.pt-8.fill-width
      v-col(cols="12" class="d-flex justify-center align-center")
        search-bar.mt-10.pl-4.pb-4.mb-5.ml-5
    //- v-col(cols="12" class="d-flex justify-center align-center")
    //-   search-details.mt-10.pl-4.pb-4.mb-5.ml-5
      //- v-col(cols="8")
      //-   company-details-vue.mt-10.align-center.pl-4.pb-4.mb-5.ml-5
      //-   //- company-overview-vue.pb-8.align-center.pl-4.mb-5.ml-5
      //-   line-chart-vue.pb-8.align-center.pl-4.mb-5.ml-5
      //- v-col(cols="4")
      //-   company-status-vue.mt-10.align-center.pr-4.pb-4.mb-5.mr-5

</template>

<script>
import { mapGetters } from 'vuex'
import CompanyStatusVue from '~/components/company/CompanyStatus.vue'
import CompanyDetailsVue from '~/components/company/CompanyDetails.vue'
import UpperTitleVue from '~/components/UpperTitle.vue'
import LineChartVue from '~/components/employee/LineChart.vue'
import CompanyOverviewVue from '~/components/company/CompanyOverview.vue'
import SearchBar from '~/components/search/SearchBar.vue'
// import SearchDetails from '~/components/search/SearchDetails.vue'

export default {
  name: 'CompanyPage',
  components: {
    CompanyStatusVue,
    CompanyDetailsVue,
    CompanyOverviewVue,
    LineChartVue,
    UpperTitleVue,
    SearchBar
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

<style lang="scss" scoped>
.fill-height {
  height: 100% !important;
}
</style>
