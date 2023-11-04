<template lang="pug">
v-container
  v-row.pa-0.mb-5
    v-col.pa-0(cols-12)
      v-card.pa-3.rounded-lg(outlined)
        .company.fill-width.py-4
          h3.fw-600.secondary--text.mb-4.px-4 Screening Test Score
          v-col.justify-center
            v-row.justify-center
              v-row.mt-2.justify-center
                ApexCharts.d-flex.justify-space-around.neg-margin-2.mt-1(type="radialBar" :options="options" :series="series" width="150" height="130")
                .d-grid.text-center.justify-center.neg-margin
                ApexCharts.d-flex.justify-space-around.neg-margin-2.mt-1(type="radialBar" :options="options2" :series="series2" width="150" height="130")
                .d-grid.text-center.justify-center.neg-margin
            v-row.justify-center
              v-row.mt-2.justify-center
                ApexCharts.d-flex.justify-space-around.neg-margin-2.mt-1(type="radialBar" :options="options3" :series="series3" width="150" height="130")
                .d-grid.text-center.justify-center.neg-margin
                ApexCharts.d-flex.justify-space-around.neg-margin-2.mt-1(type="radialBar" :options="options4" :series="series4" width="150" height="130")
                .d-grid.text-center.justify-center.neg-margin

        //-     a.subtitle-1.px-4.mb-0.font-weight-regular View Analysis
        //-     p.body-2.px-4.pt-2.mb-0.secondary--text Total sales decreases
        //-       |
        //-       span.danger--text  12.0%
        //-       |
        //-       span.secondary--text  in these 3 months
        //-     p.body-2.px-4.mb-0.secondary--text Target sales is not achieved for
        //-       |
        //-       span.danger--text  3 months
        //-     v-btn.mt-2(outlined)(
        //-       color='#4C5175'
        //-       @click="onClick"
        //-     ) Book Mentoring Session
        //- hr.mx-2.my-4

</template>

<script>
export default {
  name: 'CompanyStatus',
  data () {
    return {
      series: [80],
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
                fontSize: '20px',
                show: true
              }
            }
          }
        },

        stroke: {
          lineCap: 'round'
        },
        labels: ['Maths']
      },
      series2: [90],
      options2: {
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
                fontSize: '20px',
                show: true
              }
            }
          }
        },

        stroke: {
          lineCap: 'round'
        },
        labels: ['Programming']
      },
      series3: [40],
      options3: {
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
                fontSize: '20px',
                show: true
              }
            }
          }
        },

        stroke: {
          lineCap: 'round'
        },
        labels: ['Analytical']
      },
      series4: [50],
      options4: {
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
                fontSize: '20px',
                show: true
              }
            }
          }
        },

        stroke: {
          lineCap: 'round'
        },
        labels: ['Problem Solving']
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
