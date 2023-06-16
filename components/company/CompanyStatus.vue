<template lang="pug">
  v-card.pa-4.rounded-lg(outlined)
      .company.fill-width.py-4
        p.subtitle-2.px-4.pt-2.mb-0 Prediction
        p.text-h3.px-4.mb-2.pt-0.green--text Investable
          ApexCharts.d-flex.justify-space-around(type="donut" :options="chartOptions" :series="series" width="320" height="320")
        a.subtitle-1.px-4.mb-0.font-weight-regular.d-flex.justify-space-around View Analysis

</template>

<script>
export default {
  name: 'CompanyStatus',
  data () {
    return {
      series: [14.4, 85.6],
      chartOptions: {
        chart: {
          type: 'donut'
        },
        legend: {
          show: false
        },
        labels: ['Not Investable', 'Investment'],
        colors: ['#B8B8D1', '#5B5F97'],
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              labels: {
                show: true,
                total: {
                  label: 'Confidence level',
                  showAlways: true,
                  show: true,
                  color: '#333333',
                  fontSize: '20px',
                  fontWeight: '600',
                  formatter: function (value) {
                    const t = 85.6
                    return t + '%'
                  }
                },
                value: {
                  color: '#FFC145',
                  fontSize: '28px',
                  fontWeight: '600'
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        dataLabels: {
          enabled: false
        }
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
