<template lang="pug">
v-row.justify-center.mx-auto
  v-card.pa-4.rounded-lg
    v-card-title
      p.mb-0 Sales Record
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
            v-text-field(v-model="description" type="text" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="date" type="text" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="amount" type="number" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-select.select-category(:items="categoriesList" label="Select a category" v-model="categories" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(v-if="index <= 1" :color="getColor(item.categories)" outlined)
                  span {{ item }}
                span(
                  v-if="index === 2"
                  class="grey--text text-caption"
                ) (+{{ categories.length - 2 }} others)
          td.py-4
            v-select.select-category(:items="statusList" label="Select a category" v-model="status" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(:color="item.status_c == 'Verified'? '#3d9970' : '#FF6B6C'" outlined)
                  span {{ item }}

      template(v-slot:item.id_c="{ item, index }")
        p.mb-0.font-weight-bold E {{ index + 1}}

      template(v-slot:item.date_c="{ item }")
        p.mb-0 {{ parseInt(item.date_c) }}

      template(v-slot:item.amount_c="{ item }")
        p.mb-0 {{ $formatCurrency(item.amount_c) }}

      //- template(v-slot:item.categories="{ item }")
      //-     v-chip.my-1(
      //-       :color="getColor(item.categories)"
      //-       outlined
      //-       pill
      //-     )
      //-       p.mb-0 {{ item.categories }}
      //-     p(v-if="item.categories == 'Transportation'")    15km

     template(v-slot:item.categories="{ item }")
         div(v-for="c in $strToList(item.categories)")
           v-chip.my-1(
             :color="getColor(c)"
             outlined
             pill
          )
            p.mb-0 {{ c }}

      template(v-slot:item.status_c="{ item }")
        v-chip.my-1(
          :color="item.status_c == 'Verified'? '#3d9970' : '#FF6B6C'"
          outlined
          pill
        )
          p.mb-0 {{ item.status_c }}

      template(v-slot:item.actions="{ item }")
        v-btn.small(@click="showPrintDialog(item)") Show PDF

</template>

<script>
export default {
  name: 'ExpensesTable',
  data () {
    return {
      search: '',
      id: '',
      name: '',
      description: '',
      date: '',
      amount: '',
      categories: '',
      status: [],
      num_shareholders: '',
      statusList: [
        'Verified',
        'Not Verified'
      ],
      categoriesList: [
        'All',
        'Bunglow',
        'Condominium',
        'Serviced Apartment',
        'Flat',
        'Soho',
        'Terraced Home',
        'Sale',
        'Rental',
        'Others'
      ],
      colors: [
        { name: 'Bunglow', color: '#003f5c' },
        { name: 'Condominium', color: '#ef5675' },
        { name: 'Serviced Apartment', color: '#ffa600' },
        { name: 'Flat', color: '#3d9970' },
        { name: 'Soho', color: '#f95d6a' },
        { name: 'Terraced Home', color: '#665191' },
        { name: 'Sale', color: '#a05195' },
        { name: 'Rental', color: '#f95d6a' },
        { name: 'Others', color: '#ff7c43' }
      ],
      headers: [
        {
          text: 'Employee',
          align: 'center',
          value: 'id_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.id.toLowerCase()) }
        },
        {
          text: 'Employee Name',
          align: 'center',
          value: 'name_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
        },
        {
          text: 'Date',
          align: 'center',
          value: 'date_c',
          filter: (value) => {
            if (!this.date) { return true }
            return value > parseInt(this.date)
          }
        },
        {
          text: 'Description',
          align: 'center',
          value: 'description_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.description.toLowerCase()) }
        },
        {
          text: 'Amount',
          align: 'center',
          value: 'amount_c',
          filter: (value) => {
            if (!this.amount) { return true }
            return value > parseInt(this.amount)
          }
        },
        {
          text: 'Categories',
          sortable: false,
          value: 'categories',
        //   filter: (f) => {
        //     if (f !== '') {
        //       if (this.categories.length === 0 || this.categories.includes('All')) {
        //         return true
        //       }
        //       const result = this.categories.filter(value => f.includes(value))
        //       if (result.length > 0) {
        //         return true
        //       } else {
        //         return false
        //       }
        //     } else {
        //       return false
        //     }
        //   }
        // },
        //         {
//           text: 'Categories',
//           sortable: false,
//           value: 'categories',
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
          text: 'Verification',
          align: 'center',
          value: 'status_c',
          filter: (value) => {
            if (this.status.length === 0) { return true }
            return this.status.includes(value)
          }
        },
        { text: 'Actions', value: 'actions' }

      ],
      startups: require('../../assets/data/expenses.json')

    }
  },
  computed: {
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
      this.$router.push('/employee')
    },
    sortNames () {
      this.names.sort()
    },
    showPrintDialog (item) {
      const printStyles = `
        <style>
        </style>
      `

      // Combine the content and print styles
      const contentToPrint = printStyles + '<h1>Receipt details</h1>' // Replace with your actual content

      // Open a new window and set the content to be printed
      const printWindow = window.open('', '_blank')
      printWindow.document.write(contentToPrint)
      printWindow.document.close()

      // Show confirmation dialog to print or cancel
      if (confirm('Do you want to print the content?')) {
        // Call the print function on the opened window if user confirms
        printWindow.print()
      }
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

// <template lang="pug">
//   v-row.justify-center.mx-auto
//     v-card.pa-4.rounded-lg
//       v-card-title
//         p.mb-0 Startup List
//         v-spacer
//       hr.mt-4
//         //- v-text-field(
//         //-   v-model="search"
//         //-   append-icon="mdi-magnify"
//         //-   label="Search"
//         //-   single-line
//         //-   hide-details
//         //- )

//       //- Datatable
//       v-data-table.mt-18(
//         :headers="headers"
//         :items="startups"
//         :search="search"
//         multi-sort
//       )

//         template(v-slot:body.prepend)
//           tr
//             td.py-4
//               v-text-field(v-model="name" type="text" label="Company Name" hide-details="auto" dense outlined)
//             td.py-4
//               v-text-field(v-model="incorporated_year" type="number" label="More than" hide-details="auto" dense outlined)
//             td.py-4
//               v-text-field(v-model="total_funding" type="number" label="More than" hide-details="auto" dense outlined)
//             td.py-4
//               v-select.select-category(:items="categoriesList" label="Select a category" v-model="categories" hide-details="auto" multiple chips dense outlined)
//                 template(v-slot:selection="{ item, index }")
//                   v-chip(v-if="index <= 1" :color="getColor(item)" outlined)
//                     span {{ item }}
//                   span(
//                     v-if="index === 2"
//                     class="grey--text text-caption"
//                   ) (+{{ categories.length - 2 }} others)
//             td.py-4
//               v-text-field(v-model="revenue" type="number" label="More than" hide-details="auto" dense outlined)

//             td.py-4
//               v-text-field(v-model="epit" type="number" label="More than" hide-details="auto" dense outlined)

//             td.py-4
//               v-text-field(v-model="revenue_growh" type="number" label="More than" hide-details="auto" dense outlined)

//         template(v-slot:item.name_c="{ item, index }")
//           p.mb-0.font-weight-bold Company {{ index + 1}}

//         template(v-slot:item.incorporated_date_c="{ item }")
//           p.mb-0 {{ parseInt(item.incorporated_date_c) }}

//         template(v-slot:item.total_funding_c="{ item }")
//           p.mb-0 {{ $formatCurrency(item.total_funding_c) }}

//         template(v-slot:item.categories="{ item }")
//           div(v-for="c in $strToList(item.categories)")
//             v-chip.my-1(
//               :color="getColor(c)"
//               outlined
//               pill
//             )
//               p.mb-0 {{ c }}

//         template(v-slot:item.revenue_c="{ item }")
//           p.mb-0 {{ $formatCurrency(item.revenue_c) }}
//         template(v-slot:item.EBIT_c="{ item }")
//           div(v-if="item.EBIT_c < 0")
//             p.mb-0.danger--text {{ $formatCurrency(item.EBIT_c) }}
//           div(v-if="item.EBIT_c == 0")
//             p.mb-0 {{ $formatCurrency(item.EBIT_c) }}
//           div(v-if="item.EBIT_c > 0")
//             p.mb-0.green--text {{ $formatCurrency(item.EBIT_c) }}

//         template(v-slot:item.revenue_growh="{ item }")
//           div(v-if="item.revenue_growh < 0")
//             p.mb-0.danger--text {{ item.revenue_growh }}%
//           div(v-if="item.revenue_growh == 0")
//             p.mb-0 {{ item.revenue_growh }}%
//           div(v-if="item.revenue_growh > 0")
//             p.mb-0.green--text {{ item.revenue_growh }}%

// </template>

// <script>
// export default {
//   name: 'ToolTable',
//   data () {
//     return {
//       search: '',
//       name: '',
//       incorporated_year: '',
//       total_funding: '',
//       categories: [],
//       revenue: '',
//       epit: '',
//       revenue_growh: '',
//       categoriesList: [
//         'All',
//         'Transportation',
//         'Commerce and Shopping',
//         'Consumer Electronics',
//         'Consumer Goods',
//         'Hardware',
//         'Clothing and Apparel',
//         'Design',
//         'Advertising',
//         'Sales and Marketing',
//         'Sustainability',
//         'Financial Services',
//         'Mobile',
//         'Payments',
//         'Software',
//         'Data and Analytics',
//         'Health Care',
//         'Lending and Investments',
//         'Agriculture and Farming',
//         'Other',
//         'Travel and Tourism',
//         'Internet Services',
//         'Apps',
//         'Information Technology',
//         'Media and Entertainment',
//         'Video',
//         'Community and Lifestyle',
//         'Science and Engineering',
//         'Biotechnology',
//         'Administrative Services',
//         'Food and Beverage',
//         'Government and Military',
//         'Sports',
//         'Energy',
//         'Natural Resources',
//         'Education',
//         'Events',
//         'Real Estate',
//         'Content and Publishing',
//         'Manufacturing',
//         'Artificial Intelligence',
//         'Professional Services',
//         'Gaming',
//         'Privacy and Security',
//         'Music and Audio',
//         'Navigation and Mapping',
//         'Platforms',
//         'Messaging and Telecommunications'
//       ],
//       colors: [
//         { name: 'Transportation', color: '#003f5c' },
//         { name: 'Commerce and Shopping', color: '#7a5195' },
//         { name: 'Consumer Electronics', color: '#ef5675' },
//         { name: 'Consumer Goods', color: '#ffa600' },
//         { name: 'Hardware', color: '#3d9970' },
//         { name: 'Clothing and Apparel', color: '#2f4b7c' },
//         { name: 'Design', color: '#f95d6a' },
//         { name: 'Advertising', color: '#665191' },
//         { name: 'Sales and Marketing', color: '#00cc66' },
//         { name: 'Sustainability', color: '#a05195' },
//         { name: 'Financial Services', color: '#2f4b7c' },
//         { name: 'Mobile', color: '#f95d6a' },
//         { name: 'Payments', color: '#ff7c43' },
//         { name: 'Software', color: '#ffa600' },
//         { name: 'Data and Analytics', color: '#00cc66' },
//         { name: 'Health Care', color: '#3d9970' },
//         { name: 'Lending and Investments', color: '#ef5675' },
//         { name: 'Agriculture and Farming', color: '#7a5195' },
//         { name: 'Other', color: '#003f5c' },
//         { name: 'Travel and Tourism', color: '#a05195' },
//         { name: 'Internet Services', color: '#ff7c43' },
//         { name: 'Apps', color: '#665191' },
//         { name: 'Information Technology', color: '#2f4b7c' },
//         { name: 'Media and Entertainment', color: '#f95d6a' },
//         { name: 'Video', color: '#00cc66' },
//         { name: 'Community and Lifestyle', color: '#3d9970' },
//         { name: 'Science and Engineering', color: '#ef5675' },
//         { name: 'Biotechnology', color: '#7a5195' },
//         { name: 'Administrative Services', color: '#003f5c' },
//         { name: 'Food and Beverage', color: '#a05195' },
//         { name: 'Government and Military', color: '#ff7c43' },
//         { name: 'Sports', color: '#665191' },
//         { name: 'Energy', color: '#2f4b7c' },
//         { name: 'Natural Resources', color: '#f95d6a' },
//         { name: 'Education', color: '#ef5675' },
//         { name: 'Events', color: '#3d9970' },
//         { name: 'Real Estate', color: '#00cc66' },
//         { name: 'Content and Publishing', color: '#7a5195' },
//         { name: 'Manufacturing', color: '#003f5c' },
//         { name: 'Artificial Intelligence', color: '#a05195' },
//         { name: 'Professional Services', color: '#ff7c43' },
//         { name: 'Gaming', color: '#665191' },
//         { name: 'Privacy and Security', color: '#2f4b7c' },
//         { name: 'Music and Audio', color: '#f95d6a' },
//         { name: 'Navigation and Mapping', color: '#42f5aa' },
//         { name: 'Platforms', color: '#f542b6' },
//         { name: 'Messaging and Telecommunications', color: '#42f5d2' }
//       ],
//       headers: [
//         {
//           text: 'Company Name',
//           align: 'start',
//           value: 'name_c',
//           filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
//         },
//         {
//           text: 'Incorp. Date',
//           align: 'center',
//           value: 'incorporated_date_c',
//           filter: (value) => {
//             if (!this.incorporated_year) { return true }
//             return value > parseInt(this.incorporated_year)
//           }
//         },
//         {
//           text: 'Total Funding',
//           align: 'end',
//           value: 'total_funding_c',
//           filter: (value) => {
//             if (!this.total_funding) { return true }
//             return value > parseInt(this.total_funding)
//           }
//         },
//         {
//           text: 'Categories',
//           sortable: false,
//           value: 'categories',
//           filter: (f) => {
//             if (f !== '') {
//               const itemsArray = JSON.parse(f.replace(/'/g, '"').replace(/"\[/g, '[').replace(/\]"/g, ']').toLowerCase())
//               if (this.categories.length === 0 || this.categories.includes('All')) {
//                 return true
//               }

//               const result = this.categories.filter(value => itemsArray.includes(value.toLowerCase()))
//               if (result.length > 0) {
//                 return true
//               } else {
//                 return false
//               }
//             } else {
//               return false
//             }
//           }
//         },
//         {
//           text: 'Revenue',
//           align: 'end',
//           value: 'revenue_c',
//           width: '12%',
//           filter: (value) => {
//             if (!this.revenue) { return true }
//             return value > parseInt(this.revenue)
//           }
//         },
//         {
//           text: 'EPIT',
//           align: 'end',
//           value: 'EBIT_c',
//           width: '13%',
//           filter: (value) => {
//             if (!this.epit) { return true }
//             return value > parseInt(this.epit)
//           }
//         },
//         {
//           text: 'Revenue Growth',
//           align: 'end',
//           value: 'revenue_growh',
//           filter: (value) => {
//             if (!this.revenue_growh) { return true }
//             return value > parseInt(this.revenue_growh)
//           }
//         },
//         {
//           text: 'Prediction',
//           value: 'status'
//         }
//       ],
//       startups: require('../../assets/data/data.json')
//     }
//   },
//   computed: {

//   },
//   methods: {
//     getColor (category) {
//       const result = this.colors.find((c) => { return c.name === category })
//       if (result) {
//         return result.color
//       } else {
//         return this.$vuetify.theme.themes.primary
//       }
//     }
//   }
// }
// </script>

// <style lang="scss" scoped>
// .width-95 {
//   width: 95% !important;
// }

// :deep(thead)  {
//   background-color: rgba(91, 95, 151, .1);
// }

// :deep(.select-category .v-chip .v-chip__content) {
//   font-size: 12px !important;
// }

// :deep(.select-category .v-chip.v-size--default) {
//   height: 20px;
// }
// </style>
