<template lang="pug">
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

</template>

<script>
export default {
  name: 'StartupTable',
  data () {
    return {
      search: '',
      id: '',
      name: '',
      hired_year: '',
      sales_amount: '',
      categories: [],
      status: [],
      num_shareholders: '',
      statusList: [
        'Investable',
        'Not Investable'
      ],
      categoriesList: [
        'All',
        'Transportation',
        'Commerce and Shopping',
        'Consumer Electronics',
        'Consumer Goods',
        'Hardware',
        'Clothing and Apparel',
        'Design',
        'Advertising',
        'Sales and Marketing',
        'Sustainability',
        'Financial Services',
        'Mobile',
        'Payments',
        'Software',
        'Data and Analytics',
        'Health Care',
        'Lending and Investments',
        'Agriculture and Farming',
        'Other',
        'Travel and Tourism',
        'Internet Services',
        'Apps',
        'Information Technology',
        'Media and Entertainment',
        'Video',
        'Community and Lifestyle',
        'Science and Engineering',
        'Biotechnology',
        'Administrative Services',
        'Food and Beverage',
        'Government and Military',
        'Sports',
        'Energy',
        'Natural Resources',
        'Education',
        'Events',
        'Real Estate',
        'Content and Publishing',
        'Manufacturing',
        'Artificial Intelligence',
        'Professional Services',
        'Gaming',
        'Privacy and Security',
        'Music and Audio',
        'Navigation and Mapping',
        'Platforms',
        'Messaging and Telecommunications'
      ],
      colors: [
        { name: 'Transportation', color: '#003f5c' },
        { name: 'Commerce and Shopping', color: '#7a5195' },
        { name: 'Consumer Electronics', color: '#ef5675' },
        { name: 'Consumer Goods', color: '#ffa600' },
        { name: 'Hardware', color: '#3d9970' },
        { name: 'Clothing and Apparel', color: '#2f4b7c' },
        { name: 'Design', color: '#f95d6a' },
        { name: 'Advertising', color: '#665191' },
        { name: 'Sales and Marketing', color: '#00cc66' },
        { name: 'Sustainability', color: '#a05195' },
        { name: 'Financial Services', color: '#2f4b7c' },
        { name: 'Mobile', color: '#f95d6a' },
        { name: 'Payments', color: '#ff7c43' },
        { name: 'Software', color: '#ffa600' },
        { name: 'Data and Analytics', color: '#00cc66' },
        { name: 'Health Care', color: '#3d9970' },
        { name: 'Lending and Investments', color: '#ef5675' },
        { name: 'Agriculture and Farming', color: '#7a5195' },
        { name: 'Other', color: '#003f5c' },
        { name: 'Travel and Tourism', color: '#a05195' },
        { name: 'Internet Services', color: '#ff7c43' },
        { name: 'Apps', color: '#665191' },
        { name: 'Information Technology', color: '#2f4b7c' },
        { name: 'Media and Entertainment', color: '#f95d6a' },
        { name: 'Video', color: '#00cc66' },
        { name: 'Community and Lifestyle', color: '#3d9970' },
        { name: 'Science and Engineering', color: '#ef5675' },
        { name: 'Biotechnology', color: '#7a5195' },
        { name: 'Administrative Services', color: '#003f5c' },
        { name: 'Food and Beverage', color: '#a05195' },
        { name: 'Government and Military', color: '#ff7c43' },
        { name: 'Sports', color: '#665191' },
        { name: 'Energy', color: '#2f4b7c' },
        { name: 'Natural Resources', color: '#f95d6a' },
        { name: 'Education', color: '#ef5675' },
        { name: 'Events', color: '#3d9970' },
        { name: 'Real Estate', color: '#00cc66' },
        { name: 'Content and Publishing', color: '#7a5195' },
        { name: 'Manufacturing', color: '#003f5c' },
        { name: 'Artificial Intelligence', color: '#a05195' },
        { name: 'Professional Services', color: '#ff7c43' },
        { name: 'Gaming', color: '#665191' },
        { name: 'Privacy and Security', color: '#2f4b7c' },
        { name: 'Music and Audio', color: '#f95d6a' },
        { name: 'Navigation and Mapping', color: '#42f5aa' },
        { name: 'Platforms', color: '#f542b6' },
        { name: 'Messaging and Telecommunications', color: '#42f5d2' }
      ],
      headers: [
        {
          text: 'Employee',
          align: 'start',
          value: 'id_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.id.toLowerCase()) }
        },
        {
          text: 'Employee Name',
          align: 'start',
          value: 'name_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
        },
        {
          text: 'Hired. Date',
          align: 'center',
          value: 'hired_year_c',
          filter: (value) => {
            if (!this.hired_year) { return true }
            return value > parseInt(this.hired_year)
          }
        },
        {
          text: 'Sales Amount',
          align: 'end',
          value: 'sales_amount_c',
          filter: (value) => {
            if (!this.sales_amount) { return true }
            return value > parseInt(this.sales_amount)
          }
        },
        {
          text: 'Categories',
          sortable: false,
          value: 'categories',
          filter: (f) => {
            if (f !== '') {
              const itemsArray = JSON.parse(f.replace(/'/g, '"').replace(/"\[/g, '[').replace(/\]"/g, ']').toLowerCase())
              if (this.categories.length === 0 || this.categories.includes('All')) {
                return true
              }

              const result = this.categories.filter(value => itemsArray.includes(value.toLowerCase()))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        },
        {
          text: 'Number of Shareholders',
          value: 'num_shareholders',
          align: 'center',
          filter: (value) => {
            if (!this.num_shareholders) { return true }
            return value > parseInt(this.num_shareholders)
          }
        },
        {
          text: 'Prediction',
          align: 'center',
          value: 'predicted_status',
          filter: (value) => {
            if (this.status.length === 0) { return true }
            return this.status.includes(value)
          }
        }
      ],
      // startups: require('../../assets/data/data.json')
      startups: require('../../assets/data/data.json')

    }
  },
  computed: {

  },
  methods: {
    getColor (category) {
      const result = this.colors.find((c) => { return c.id === category })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    onRowClick (item) {
      this.$router.push('/employee')
    },
    // handleCustomButtonClick(item){
    //   // Handle custom button click
    //   console.log('Custom Button clicked')
    // },
    sortNames () {
      this.names.sort()
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
