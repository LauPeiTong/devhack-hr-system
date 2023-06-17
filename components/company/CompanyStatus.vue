<template lang="pug">
v-container
  v-row
    v-col(cols-12)
      v-card.pa-3.rounded-lg(outlined)
          .company.fill-width.py-4
            ApexCharts.d-flex.justify-space-around(type="donut" :options="chartOptions" :series="series" width="300" height="300")
            a.subtitle-1.px-4.pb-4.mb-0.font-weight-regular.d-flex.justify-space-around View Analysis
            v-btn(outlined)(
              color='#4C5175'
              @click="onClick"
            ) Book Mentoring Session
  v-row
    v-col(cols="12")
      v-card.pa-3.rounded-lg(outlined)
        p Sales achieved
        v-progress-linear.rounded-xl(
          :value="20"
          color='#FFC145'
          height="20"
          striped
        )
          template(v-slot:default=" { value }")
            strong.brown--text {{ Math.ceil(value) }}% achieved

        .d-flex.justify-center.mt-3
          v-btn(outlined)(
                color='#4C5175'
          ) Set Target Sales
</template>

<script>
export default {
  name: 'CompanyStatus',
  data () {
    return {
      series: [50.5, 49.5],
      chartOptions: {
        chart: {
          type: 'donut'
        },
        legend: {
          show: false
        },
        labels: ['', 'Performance'],
        colors: ['#B8B8D1', '#5B5F97'],
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              labels: {
                show: true,
                total: {
                  label: 'Performance level',
                  showAlways: true,
                  show: true,
                  color: '#333333',
                  fontSize: '18px',
                  fontWeight: '600',
                  formatter: function (value) {
                    const t = 30
                    return '-' + t + '%'
                  }
                },
                value: {
                  color: '#FF6B6C',
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

</style>
