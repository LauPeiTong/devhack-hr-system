<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Dashboard'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
  v-row.ma-0.pt-8.fill-width
    v-col(cols="4")
      candidate-list.pt-8
    v-col(cols="4")
      candidate-details-vue.mb-5
      candidate-workmap-vue
    v-col(cols="4")
      candidate-status-vue
    //- v-col(cols="12")
    //-   startup-table-vue.pb-8.align-center.px-7
</template>

<script>
import { mapGetters } from 'vuex'
import StartupTableVue from '~/components/dashboard/startupTable.vue'
// import TrendListVue from '~/components/dashboard/trendList.vue'
import UpperTitleVue from '~/components/UpperTitle.vue'
import CandidateList from '~/components/candidate/candidateList.vue'
import CandidateStatusVue from '~/components/candidate/CandidateStatus.vue'
import CandidateWorkmapVue from '~/components/candidate/candidateWorkmap.vue'
import CandidateDetailsVue from '~/components/candidate/candidateDetails.vue'

export default {
  name: 'CandidatePage',
  components: {
    CandidateStatusVue,
    UpperTitleVue,
    StartupTableVue,
    CandidateList,
    CandidateWorkmapVue,
    CandidateDetailsVue
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
