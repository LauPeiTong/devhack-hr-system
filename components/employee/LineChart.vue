<template lang="pug">
v-card.pa-4.rounded-lg(outlined)
  v-card-text
    h2.fw-600.secondary--text.mb-4 Employee Data?
    v-card.rounded-xl.mb-4(outlined)
      v-card-text(width="100%")
        .d-flex
          //- v-img.icon(:src="require('../../assets/1.png')" width="50")
          .d-grid.ml-2
            h3.fw-600.secondary--text Expenses (RM)
            p.font-weight-regular.subtitle-2 This Week, 11/5/2023 - 17/5/2023
        ApexCharts(type="line" width="100%" :options="chartOptions" :series="series")

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
      series: [{
        name: 'Sales',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
      }],
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
          text: 'Expenses',
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
            gradientToColors: ['#FDD835'],
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
