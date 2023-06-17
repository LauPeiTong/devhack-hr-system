<template lang="pug">
<<<<<<< HEAD
v-row.justify-center.mx-auto
  v-card.pa-4.rounded-lg
    v-card-title
      p.mb-0 Expenses Record
      v-spacer
    hr.mt-4
      //- v-text-field(
      //-   v-model="search"
      //-   append-icon="mdi-magnify"
      //-   label="Search"
      //-   single-line
      //-   hide-details
      //- )

    //- Datatable
    v-data-table.mt-18(
      :headers="headers"
      :items="startups"
      :search="search"
      multi-sort
      @click:row="onRowClick"
    )

      template(v-slot:body.prepend)
        tr
          td.py-4
            v-text-field(v-model="id" type="text" label="Employee ID" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="name" type="text" label="Employee Name" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="hired_year" type="number" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="sales_amount" type="number" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-select.select-category(:items="categoriesList" label="Select a category" v-model="categories" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(v-if="index <= 1" :color="getColor(item)" outlined)
                  span {{ item }}
                span(
                  v-if="index === 2"
                  class="grey--text text-caption"
                ) (+{{ categories.length - 2 }} others)
          td.py-4
            v-text-field(v-model="num_shareholders" type="number" label="More than" hide-details="auto" dense outlined)

          td.py-4
            v-select.select-category(:items="statusList" label="Select a category" v-model="status" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(:color="item == 'Investable'? '#3d9970' : '#FF6B6C'" outlined)
                  span {{ item }}

      //- template(v-slot:item.id_c="{ item, index }")
      //-   p.mb-0.font-weight-bold Employee {{ index + 1}}

      template(v-slot:item.hired_year_c="{ item }")
        p.mb-0 {{ parseInt(item.hired_year_c) }}

      template(v-slot:item.sales_amount_c="{ item }")
        p.mb-0 {{ $formatCurrency(item.sales_amount_c) }}

      template(v-slot:item.num_shareholders="{ item }")
        p.mb-0 {{ parseInt(item.num_shareholders) }}

      template(v-slot:item.categories="{ item }")
        div(v-for="c in $strToList(item.categories)")
          v-chip.my-1(
            :color="getColor(c)"
            outlined
            pill
          )
            p.mb-0 {{ c }}

      template(v-slot:item.predicted_status="{ item }")
        v-chip.my-1(
          :color="item.predicted_status == 'Investable'? '#3d9970' : '#FF6B6C'"
          outlined
          pill
        )
          p.mb-0 {{ item.predicted_status }}
=======
  v-row.justify-center.mx-auto
    v-card.py-4.px-6.rounded-lg
      v-card-title.px-0.pb-0
        p.mb-0 Employee List
        v-spacer
      .d-flex.align-center
        p.mb-0.mr-2 1 June 2023 - 1 July 2023
        eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary")
      hr.mt-4
        //- v-text-field(
        //-   v-model="search"
        //-   append-icon="mdi-magnify"
        //-   label="Search"
        //-   single-line
        //-   hide-details
        //- )

      //- Datatable
      v-data-table.mt-18(
        :headers="headers"
        :items="empolyees"
        :search="search"
        multi-sort
        @click:row="onRowClick"
      )

        template(v-slot:body.prepend)
          tr
            td.py-4
              v-text-field(v-model="name" type="text" label="Employee Name" hide-details="auto" dense outlined)
            td.py-4
              v-text-field(v-model="basic_salary" type="number" label="More than" hide-details="auto" dense outlined)
            td.py-4
              v-text-field(v-model="total_expenses" type="number" label="More than" hide-details="auto" dense outlined)
            td.py-4
              v-text-field(v-model="total_sales" type="number" label="More than" hide-details="auto" dense outlined)
            td.py-4
              v-text-field(v-model="total_commission" type="number" label="More than" hide-details="auto" dense outlined)
            td.py-4
              v-text-field(v-model="sales_growth" type="number" label="More than" hide-details="auto" dense outlined)

            td.py-4
              v-select.select-category(:items="statusList" label="Select a status" v-model="performance_status" hide-details="auto" multiple chips dense outlined)
                template(v-slot:selection="{ item, index }")
                  v-chip(:color="getColor(item)" outlined)
                    span {{ item }}

        template(v-slot:item.name="{ item }")
          .d-flex.align-center
            VueAvatar(:username="item.name" :size="24" :colors="avatarColor" :customStyles="{'color': 'white'}")
            span.ml-2 {{item.name}}

        template(v-slot:item.basic_salary="{ item }")
          p.mb-0 {{ $formatCurrency(item.basic_salary) }}

        template(v-slot:item.total_expenses="{ item }")
          p.mb-0 {{ $formatCurrency(item.total_expenses) }}

        template(v-slot:item.total_sales="{ item }")
          p.mb-0 {{ $formatCurrency(item.total_sales) }}

        template(v-slot:item.total_commission="{ item }")
          p.mb-0 {{ $formatCurrency(item.total_commission) }}

        template(v-slot:item.sales_growth="{ item }")
          p.mb-0.danger--text(v-if="item.sales_growth < 0") {{ item.sales_growth }}
          p.mb-0.green--text(v-else) {{ item.sales_growth }}

        template(v-slot:item.performance_status="{ item }")
          v-chip.my-1(
            :color="getColor(item.performance_status)"
            outlined
            pill
          )
            p.mb-0 {{ item.performance_status }}
>>>>>>> 519f301b9f97951ae495285ab56e8addd16f759e

</template>

<script>
export default {
  name: 'StartupTable',
  data () {
    return {
      search: '',
      name: '',
      basic_salary: '',
      total_expenses: '',
      total_sales: '',
      total_commission: '',
      sales_growth: '',
      performance_status: [],
      statusList: [
        'All',
        'Excellent',
        'Good',
        'Need Improvement'
      ],
      avatarColor: [[200, 54, 45], [192, 35, 69], [203, 38, 52], [189, 69, 67], [207, 46, 40], [193, 59, 48], [198, 34, 65], [197, 66, 66], [205, 41, 69], [180, 66, 59]],
      colors: [
        { name: 'Excellent', color: '#3d9970' },
        { name: 'Good', color: '#4C5175' },
        { name: 'Need Improvement', color: '#BB0000' }
      ],
      headers: [
        {
<<<<<<< HEAD
          text: 'Employee',
          align: 'start',
          value: 'id_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.id.toLowerCase()) }
        },
        {
=======
>>>>>>> 519f301b9f97951ae495285ab56e8addd16f759e
          text: 'Employee Name',
          align: 'start',
          value: 'name',
          filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
        },
        {
          text: 'Basic Salary',
          align: 'end',
          value: 'basic_salary',
          filter: (value) => {
            if (!this.basic_salary) { return true }
            return value > parseInt(this.basic_salary)
          }
        },
        {
          text: 'Total Expenses',
          align: 'end',
          value: 'total_expenses',
          filter: (value) => {
            if (!this.total_expenses) { return true }
            return value > parseInt(this.total_expenses)
          }
        },
        {
          text: 'Total Sales',
          align: 'end',
          value: 'total_sales',
          filter: (value) => {
            if (!this.total_sales) { return true }
            return value > parseInt(this.total_sales)
          }
        },
        {
          text: 'Total Commission',
          align: 'end',
          value: 'total_commission',
          filter: (value) => {
            if (!this.total_commission) { return true }
            return value > parseInt(this.total_commission)
          }
        },
        {
          text: 'Sales Growth',
          align: 'end',
          value: 'sales_growth',
          filter: (value) => {
            if (!this.sales_growth) { return true }
            return value > parseInt(this.sales_growth)
          }
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'performance_status',
          filter: (f) => {
            if (f !== '') {
              if (this.performance_status.length === 0 || this.performance_status.includes('All')) {
                return true
              }
              const result = this.performance_status.filter(value => f.includes(value))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        }
      ],
<<<<<<< HEAD
      // startups: require('../../assets/data/data.json')
      startups: require('../../assets/data/data.json')

=======
      empolyees: require('../../assets/data/employee.json')
>>>>>>> 519f301b9f97951ae495285ab56e8addd16f759e
    }
  },
  methods: {
    getColor (status) {
      const result = this.colors.find((c) => { return c.name === status })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    onRowClick (item) {
      console.log(this.empolyees)
      this.$router.push('/employee')
<<<<<<< HEAD
    },
    // handleCustomButtonClick(item){
    //   // Handle custom button click
    //   console.log('Custom Button clicked')
    // },
    sortNames () {
      this.names.sort()
=======
>>>>>>> 519f301b9f97951ae495285ab56e8addd16f759e
    }
  }
}

</script>

<style lang="scss" scoped>
.width-95 {
  width: 95% !important;
}

:deep(thead)  {
  background-color: rgba(91, 95, 151, .1);
}

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}

:deep(.select-category .v-chip.v-size--default) {
  height: 20px;
}
</style>
