<template lang="pug">
  v-row.justify-center.mx-auto
    v-col(:cols="4")
      v-card.rounded-lg
        v-card-title.pb-0
          p.mb-0.text-h6.primary--text Residential Properties
        v-card-text
          .d-flex.align-center.mb-2
            .caption.secondary--text.mb-1.mr-1 Top Sellers (1 June 2023 - 1 July 2023)
            eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary" width="16" height="16")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2 Dylan Tan
                  v-chip.chip-small.mb-1(
                    :color="$vuetify.theme.themes.light.danger"
                    outlined
                    pill
                  )
                    p.mb-0.caption 210 Points
                p.mb-0 Total Sales: RM 300,000.00
                p.mb-0.green--text +50.2%

              v-avatar(
                class="ma-1"
                size="60"
                tile
              )
                v-img(:src="require(`../../assets/employee/1.png`)")

          v-card.px-4.py-2.mb-2(outlined)
              .d-flex.flex-no-wrap.justify-space-between
                .company
                  .d-flex.flex-wrap.align-center
                    p.mb-1.text-h6.pr-2 Aiman Humaira
                    v-chip.chip-small.mb-1(
                      :color="$vuetify.theme.themes.light.danger"
                      outlined
                      pill
                    )
                      p.mb-0.caption 342 Points
                  p.mb-0 Total Sales: RM 20,000.00
                  p.mb-0.green--text +80.1%

                v-avatar(
                  class="ma-1"
                  size="60"
                  tile
                )
                  v-img(:src="require(`../../assets/employee/2.png`)")

          v-card.px-4.py-2(outlined)
              .d-flex.flex-no-wrap.justify-space-between
                .company
                  .d-flex.flex-wrap.align-center
                    p.mb-1.text-h6.pr-2 Menghui
                    v-chip.chip-small.mb-1(
                      :color="$vuetify.theme.themes.light.danger"
                      outlined
                      pill
                    )
                      p.mb-0.caption 323 Points
                  p.mb-0 Total Sales: RM 10,000.00
                  p.mb-0.green--text +33.2%

                v-avatar(
                  class="ma-1"
                  size="60"
                  tile
                )
                  v-img(:src="require(`../../assets/employee/3.png`)")

    v-col(:cols="4")
      v-card.rounded-lg
        v-card-title.pb-0
          p.mb-0.text-h6.primary--text Commercial Properties
        v-card-text
          .d-flex.align-center.mb-2
            .caption.secondary--text.mb-1.mr-1 Top Sellers (1 June 2023 - 1 July 2023)
            eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary" width="16" height="16")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2 Lau Sayheng
                  v-chip.chip-small.mb-1(
                    :color="$vuetify.theme.themes.light.danger"
                    outlined
                    pill
                  )
                    p.mb-0.caption 450 Points
                p.mb-0 Total Sales: RM 300,000.00
                p.mb-0.green--text +50.2%

              v-avatar(
                class="ma-1"
                size="60"
                tile
              )
                v-img(:src="require(`../../assets/employee/4.png`)")

          v-card.px-4.py-2.mb-2(outlined)
              .d-flex.flex-no-wrap.justify-space-between
                .company
                  .d-flex.flex-wrap.align-center
                    p.mb-1.text-h6.pr-2 Sashmikha
                    v-chip.chip-small.mb-1(
                      :color="$vuetify.theme.themes.light.danger"
                      outlined
                      pill
                    )
                      p.mb-0.caption 392 Points
                  p.mb-0 Total Sales: RM 20,000.00
                  p.mb-0.green--text +80.1%

                v-avatar(
                  class="ma-1"
                  size="60"
                  tile
                )
                  v-img(:src="require(`../../assets/employee/5.png`)")

          v-card.px-4.py-2(outlined)
              .d-flex.flex-no-wrap.justify-space-between
                .company
                  .d-flex.flex-wrap.align-center
                    p.mb-1.text-h6.pr-2 David Tan
                    v-chip.chip-small.mb-1(
                      :color="$vuetify.theme.themes.light.danger"
                      outlined
                      pill
                    )
                      p.mb-0.caption 231 Points
                  p.mb-0 Total Sales: RM 10,000.00
                  p.mb-0.green--text +33.2%

                v-avatar(
                  class="ma-1"
                  size="60"
                  tile
                )
                  v-img(:src="require(`../../assets/employee/6.png`)")

    v-col(:cols="4")
      v-card.rounded-lg
        v-card-title.pb-0
          p.mb-0.text-h6.primary--text Affordable Housing
        v-card-text
          .d-flex.align-center.mb-2
            .caption.secondary--text.mb-1.mr-1 Top Sellers (1 June 2023 - 1 July 2023)
            eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary" width="16" height="16")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2 Junbin Chng
                  v-chip.chip-small.mb-1(
                    :color="$vuetify.theme.themes.light.danger"
                    outlined
                    pill
                  )
                    p.mb-0.caption 430 Points
                p.mb-0 Total Sales: RM 300,000.00
                p.mb-0.green--text +50.2%

              v-avatar(
                class="ma-1"
                size="60"
                tile
              )
                v-img(:src="require(`../../assets/employee/7.png`)")

          v-card.px-4.py-2.mb-2(outlined)
              .d-flex.flex-no-wrap.justify-space-between
                .company
                  .d-flex.flex-wrap.align-center
                    p.mb-1.text-h6.pr-2 Sarween
                    v-chip.chip-small.mb-1(
                      :color="$vuetify.theme.themes.light.danger"
                      outlined
                      pill
                    )
                      p.mb-0.caption 328 Points
                  p.mb-0 Total Sales: RM 20,000.00
                  p.mb-0.green--text +80.1%

                v-avatar(
                  class="ma-1"
                  size="60"
                  tile
                )
                  v-img(:src="require(`../../assets/employee/8.png`)")

          v-card.px-4.py-2(outlined)
              .d-flex.flex-no-wrap.justify-space-between
                .company
                  .d-flex.flex-wrap.align-center
                    p.mb-1.text-h6.pr-2 Lau Pei Tong
                    v-chip.chip-small.mb-1(
                      :color="$vuetify.theme.themes.light.danger"
                      outlined
                      pill
                    )
                      p.mb-0.caption 232 Points
                  p.mb-0 Total Sales: RM 10,000.00
                  p.mb-0.green--text +33.2%

                v-avatar(
                  class="ma-1"
                  size="60"
                  tile
                )
                  v-img(:src="require(`../../assets/employee/9.png`)")

</template>

<script>
export default {
  name: 'TrendList',
  data () {
    return {
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

.chip-small {
  height: 22px;
}
</style>
