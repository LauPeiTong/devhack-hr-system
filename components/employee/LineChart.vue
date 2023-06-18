<template lang="pug">
v-card.pa-4.rounded-lg(outlined)
  v-card-text
    h2.fw-600.secondary--text.mb-4 Sales Report and Analysis
    v-card.rounded-xl.mb-4(outlined)
      v-card-text(width="100%")
        .d-flex.justify-space-between
          .d-grid.ml-2
            h3.fw-600.primary--text Total Sales: RM 45784.50
            .font-weight-regular.subtitle-2 This Month, 11/5/2023 - 11/6/2023
          a(href="./expenses") View Details
        ApexCharts(type="line" width="100%" height="400" :options="chartOptions" :series="series1")
        .body-2.px-4.mb-0.secondary--text Target sales is not achieved for
              |
              span.danger--text  3 months

    v-card.rounded-xl.mb-4(outlined)
      v-card-text(width="100%")
          .d-flex
            //- v-img.icon(:src="require('../../assets/1.png')" width="50")
            .d-grid.ml-2
              h3.fw-600.primary--text Total RM 45000.00
              p.font-weight-regular.subtitle-2 This Month, 11/5/2023 - 11/6/2023
          ApexCharts(type="line" width="100%" height="400" :options="chartOptions2" :series="series2")
          .body-2.px-4.pt-2.mb-0.secondary--text Total Net Sales decreases
              |
              span.danger--text  12.0%
              |
              span.secondary--text  in these 3 months

  //- v-tabs.rounded-xl(vertical)
  //-   v-tab(active)
  //-     v-icon mdi-fire
  //-   v-tab
  //-     v-icon mdi-speedometer
  //-   v-tab
  //-     v-icon mdi-vibrate

</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      series1: [
        {
          name: 'Target Sales',
          data: [19, 15, 10, 9, 10, 17, 20, 9, 17, 7, 19, 5, 13, 9, 18, 22, 12, 7]
        },
        {
          name: 'Total Sales',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      series2: [
        {
          name: 'Total Net Sales',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line'
        },
        // forecastDataPoints: {
        //   count: 7
        // },
        stroke: {
          width: 5,
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
          tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), 'dd MMM')
            }
          }
        },
        title: {
          text: 'Total Sales (RM)',
          align: 'left',
          style: {
            fontSize: '16px',
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#BCE7D9'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        yaxis: {
          min: -10,
          max: 40
        }
      },
      chartOptions2: {
        chart: {
          height: 350,
          type: 'line'
        },
        // forecastDataPoints: {
        //   count: 7
        // },
        stroke: {
          width: 5,
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
          tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), 'dd MMM')
            }
          }
        },
        title: {
          text: 'Total Net Sales (RM)',
          align: 'left',
          style: {
            fontSize: '16px',
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#BCE7D9'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        yaxis: {
          min: -10,
          max: 40
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    goToExpensesPage () {
      this.$router.push('/expenses')
    }
  }
}
</script>

<style lang="scss" scoped>
.fw-600 {
  font-weight: 600 !important;
}

.icon {
  max-width: 50px;
}
</style>
