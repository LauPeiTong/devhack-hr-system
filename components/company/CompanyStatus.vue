<template lang="pug">
v-container
  v-row.pa-0.mb-5
    v-col.pa-0(cols-12)
      v-card.pa-3.rounded-lg(outlined)
        .company.fill-width.py-4
          h3.fw-600.secondary--text.mb-4.px-4 Performance Analysis
          ApexCharts.d-flex.justify-space-around.neg-margin-2(type="radialBar" :options="options" :series="series" width="300" height="300")
          .d-grid.text-center.justify-center.neg-margin
            a.subtitle-1.px-4.mb-0.font-weight-regular View Analysis
            p.body-2.px-4.pt-2.mb-0.secondary--text Total sales decreases
              |
              span.danger--text  12.0%
              |
              span.secondary--text  in these 3 months
            p.body-2.px-4.mb-0.secondary--text Target sales is not achieved for
              |
              span.danger--text  3 months
            v-btn.mt-2(outlined
              color='#4C5175'
              @click="onClick"
            ) Book Mentoring Session
        hr.mx-2.my-4

        .company.fill-width.py-4.px-4
          v-card.mx-4.pa-4.rounded-xl.mb-4.text-center(outlined)
            strong.darkGrey--text.mb-0 Total Points
            h1.orange--text 210 Points
          p.darkGrey--text.mb-0 Target Sales:
          h2.primary--text RM 300000.00
          v-progress-linear.rounded-xl.mt-2.mb-1(
            :value="20"
            color='#FFC145'
            height="20"
            striped
          )
            template(v-slot:default=" { value }")
              p.mb-0.brown--text {{ Math.ceil(value) }}% achieved
          p.text-center Total Sales: RM45784.50

          .d-flex.justify-center.mt-3
            v-btn(outlined color='#4C5175') Set Target Sales
  v-row.pa-0.mt-5
    v-col.pa-0(cols="12")
      v-card.pa-3.rounded-lg(outlined)
        h3.fw-600.secondary--text.px-4.pt-4 Sales Category
        .d-flex.align-center.px-4
          p.mb-1.mr-2.primary--text 1 June 2022 - 1 July 2023
          eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary" width="18" height="18")
        ApexCharts.d-flex.justify-space-around(type="radialBar" :options="options2" :series="series2" width="300" height="300")
        p.body-2.px-4.mb-0.secondary--text.text-center The category with highest sales is
          |
          span.danger--text  Affordable Housing
        v-card.rounded-lg.ma-4.px-4.py-2(outlined)
          strong.fw-600.darkGrey--text Residential Property
          h3.primary--text RM 144000
        v-card.rounded-lg.ma-4.px-4.py-2(outlined)
          strong.fw-600.darkGrey--text Commercial Property
          h3.primary--text RM 240000
        v-card.rounded-lg.ma-4.px-4.py-2(outlined)
          strong.fw-600.darkGrey--text Luxury Property
          h3.primary--text RM 124000
        v-card.rounded-lg.ma-4.px-4.py-2(outlined)
          strong.fw-600.darkGrey--text Affordable Housing
          h3.primary--text RM 300000

</template>

<script>
export default {
  name: 'CompanyStatus',
  data () {
    return {
      series: [30],
      options: {
        chart: {
          height: 280,
          type: 'radialBar'
        },

        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              startAngle: -90,
              endAngle: 90
            },
            hollow: {
              margin: 15,
              size: '70%'
            },

            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -40,
                show: true,
                color: '#888',
                fontSize: '13px'
              },
              value: {
                offsetY: -20,
                color: '#111',
                fontSize: '30px',
                show: true
              }
            }
          }
        },

        stroke: {
          lineCap: 'round'
        },
        labels: ['Performance Level']
      },
      series2: [40, 40, 20, 80],
      options2: {
        chart: {
          height: 280,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              total: {
                show: true,
                label: 'TOTAL',
                fontSize: '20px',
                fontWeight: '600',
                formatter: function (value) {
                  const t = value.globals.series.reduce((a, b) => b + a, 0)
                  return 'RM ' + t.toString() + 'K'
                }
              },
              value: {
                color: '#0083BB',
                fontSize: '25px',
                fontWeight: '600'
              }
            }
          }
        },
        labels: ['Residential Property', 'Commercial Property', 'Luxury Property', 'Affordable Housing']
      }
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
    onClick (item) {
      this.$router.push('/msessionform')
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
