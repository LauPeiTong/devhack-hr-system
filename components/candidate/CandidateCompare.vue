<template lang="pug">
v-row.candidate-compare.justify-center.mx-auto
  v-card.px-6.pb-6.rounded-lg.fill-width
    v-card-title.px-0.pb-0
      p.mb-0 Candidates Comparison
      v-spacer
    .d-flex.align-center
      .body-2.mb-1.mr-2.primary--text Total: 3 Candidates
    hr.my-4

    v-row
      v-col.d-grid(:cols='3')
        v-card.rounded-lg.pa-4.background.fill-height(outlined)
          .font-weight-medium.mb-2.primary--text Potential Candidates
          v-divider.mb-3
          v-text-field.mb-3(
            v-model="job"
            type="text"
            label="Job Position"
            hide-details="auto"
            dense
            outlined
            :append-outer-icon="'mdi-magnify'"
            @click:append-outer="predict"
          )
          draggable.list-group.fill-height(:list='candidates', group='people', @change='' v-bind="dragOptions")
            .text-center.my-auto(v-if="loading")
              v-progress-circular.text-center(
                indeterminate
                color="primary"
              )

            .list-group-item(v-for='(element, index) in candidates', :key='element.id' v-else)
              v-card.pa-3.mb-3.rounded-lg(outlined)
                .d-flex
                    v-img.mr-2(:src="require(`../../assets/employee/${element.id}.png`)" max-width="40")
                    .d-grid
                      p.text-14.mb-0.primary--text Candidate {{ element.id }}
                      .d-flex
                        .caption.darkGrey--text.me-1.mb-0 View resume
                        i.bx.bx-search-alt.darkGrey--text

      v-col(:cols='9')
        v-card.rounded-lg.pa-4(outlined)
          .font-weight-medium.mb-2.primary--text Selected Candidates
          v-divider.mb-3

          .title.d-flex.pa-3
            .candidate.me-2
            v-row
              v-col.px-1
                v-card.pa-1.rounded-lg.lightRed(elevation=0)
                  h6.font-weight-medium.primary--text.text-center Skills
              v-col.px-1
                v-card.pa-1.rounded-lg.lightRed2(elevation=0)
                  h6.font-weight-medium.primary--text.text-center Experience
              v-col.pl-1
                v-card.pa-1.rounded-lg.lightRed3(elevation=0)
                  h6.font-weight-medium.primary--text.text-center Achievement

          draggable.list-group(:list='selectedCandidates', group='people', @change='' v-bind="dragOptions")
            v-card.d-flex.align-center.justify-center.empty-card.pa-3.mb-3.rounded-lg(outlined v-if="selectedCandidates.length === 0")
              h5.darkGrey--text.font-weight-medium Drag and drop the candidates to compare
            .list-group-item(v-for='(candidate, index) in selectedCandidates', :key='candidate.id' v-else)
              v-card.pa-3.mb-3.rounded-lg(outlined)
                .d-flex
                  .candidate.me-2
                    v-img.mr-2(:src="require(`../../assets/employee/${candidate.id}.png`)" max-width="30")
                    .d-grid
                      p.text-14.mb-0.primary--text Candidate {{ candidate.id }}
                      .d-flex
                        .caption.darkGrey--text.me-2.mb-0 View resume
                        i.bx.bx-search-alt.darkGrey--text
                    v-btn.primary.mt-2(elevation=0 small) Schedule

                  v-row.compare
                    v-col.px-1
                      v-card.fill-height.pa-3.lightRed.rounded-lg(elevation=0)
                        template(v-for="skill in candidate.skills" )
                          v-chip.mb-2.me-1(outlined small :style="{ 'font-weight': isOverlapSkill(skill) ? 400 : 600 }" :color="isOverlapSkill(skill) ? '#848484' : '#4C5175'")
                            span.text-12 {{ skill }}
                    v-col.px-1
                      v-card.fill-height.pa-3.lightRed2.rounded-lg(elevation=0)
                        template(v-for="(experience, index) in candidate.experience" )
                          .experience.border
                            p.text-14.font-weight-medium.mb-0 {{ experience.title }}
                            p.caption.mb-0 ({{ experience.company }})
                            p.caption.mb-0 {{ experience.duration }}
                          v-divider.my-2.darkGrey(v-if="index !== candidate.experience.length - 1")
                    v-col.pl-1
                      v-card.fill-height.pa-3.lightRed3.rounded-lg(elevation=0)
                        template(v-for="(achievement, index) in candidate.achievements" )
                          p.text-14.font-weight-medium.mb-0 {{ achievement }}
                          v-divider.my-2.darkGrey(v-if="index !== candidate.achievements.length - 1")

        v-card.rounded-lg.pa-4.mt-3.conclusion-card(outlined)
          .d-flex.mb-2
            v-icon.primary--text.me-2 mdi-lead-pencil
            .font-weight-medium.primary--text Conclusion
          v-divider.mb-3.lightBlue2
          .result(v-if="selectedCandidates.length > 0")
            p.text-14.mb-0 Most suitable candidate:
              |
              .font-weight-medium.primary--text Candidate {{ bestCandidate.id }}
          p.text-14.mb-0(v-else) No conclusion
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'TwoLists',
  display: 'Two Lists',
  order: 1,
  components: {
    draggable
  },
  data () {
    return {
      loading: false,
      job: null,
      candidates: [],
      list1: [
        {
          id: 1,
          skills: [
            'HTML',
            'CSS',
            'JavaScript',
            'Vue.js',
            'Spring Boot',
            'Bootstrap',
            'Vuetify',
            'Java',
            'Python',
            'C#'
          ],
          experience: [
            {
              title: 'Frontend Developer Intern',
              company: 'MSP System',
              duration: 'February 2023 - Present'
            },
            {
              title: 'Frontend Developer Intern',
              company: 'Yezza',
              duration: 'October 2022 - January 2023'
            }
          ],
          achievements: [
            'eMobiq Challenge 2023 (Champion)',
            'Hilti IT Competition 2023 (Second Runner Up)',
            'i-UM Disrupt 2022 (First Runner Up)',
            'UM Hackathon 2023 (First Runner Up)',
            'CIPTA 2022 (Champion)',
            'ZTE IoT Challenge 2022 (Second Runner Up)'
          ]
        },
        {
          id: 2,
          skills: [
            'Python',
            'Java',
            'Git',
            'HTML',
            'CSS',
            'JavaScript',
            'Oracle',
            'Firebase',
            'Vue.js',
            'Spring Boot',
            'Bootstrap',
            'Vuetify',
            'Flutter'
          ],
          experience: [
            {
              title: 'Software Engineer Intern',
              company: 'Seagate Technology',
              duration: 'July 2023 - Sep 2023'
            },
            {
              title: 'Computer Lab Assistant',
              company: 'University Putra Malaysia',
              duration: 'Oct 2023 - Present'
            },
            {
              title: 'Coding Tutor',
              company: 'CodingBar',
              duration: 'Sep 2023 - Present'
            },
            {
              title: 'Online Tutor',
              company: 'FrenzTalk',
              duration: 'Sep 2023 - Present'
            }
          ],
          achievements: [
            'Top 20 Participant in Malaysia, Huawei Seeds for the Future 2023',
            'Champion, Emobiq Challenge 2023',
            'First Runner Up, UMHackathon 2023',
            'Second Runner Up, Hilti ITC 2023',
            'Second Runner Up, MASA Hackathon 2022',
            'First Runner Up, iUM Disrupt Hackathon 2022'
          ]
        },
        {
          id: 3,
          skills: [
            'Dart',
            'JavaScript',
            'Vue.js',
            'Flutter',
            'Java',
            'Python',
            'Firebase'
          ],
          experience: [
            {
              title: 'Python Developer Intern',
              company: 'Intel',
              duration: 'July 2023 - October 2023'
            },
            {
              title: 'Python Developer Intern',
              company: 'Keysight',
              duration: 'July 2022 - October 2022'
            }
          ],
          achievements: [
            'eMobiq Challenge 2023 (Champion)',
            'Hilti IT Competition 2023 (Second Runner Up)',
            'UM Hackathon 2023 (First Runner Up)'
          ]
        }

      ],
      selectedCandidates: []
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    bestCandidate () {
      const candidateWithId2 = this.selectedCandidates.find(candidate => candidate.id === 2)
      if (candidateWithId2) {
        return candidateWithId2
      }

      const candidateWithId3 = this.selectedCandidates.find(candidate => candidate.id === 3)
      if (candidateWithId3) {
        return candidateWithId3
      }

      // If neither candidate with id 2 nor id 3 is found, return the first candidate
      return this.selectedCandidates[0]
    }
  },
  mounted () {
    // this.predict()
  },
  methods: {
    async predict () {
      this.loading = true
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Set the content type based on your API
          },
          body: JSON.stringify({}) // Include any request data here
        })
        if (response.ok) {
          const result = await response.json()
          this.candidates = result.resume
          console.log(this.candidates)

          if (this.candidates === undefined) {
            this.candidates = this.list1
          }
        } else {
          this.candidates = this.list1
        }
      } catch (error) {
        this.candidates = this.list1
      }
      this.loading = false
    },
    isOverlapSkill (skill) {
      if (this.selectedCandidates.length < 2) {
        return false
      }

      if (this.selectedCandidates.length === 2) {
        return this.selectedCandidates[0].skills.includes(skill) && this.selectedCandidates[1].skills.includes(skill)
      }

      if (this.selectedCandidates.length === 3) {
        return this.selectedCandidates[0].skills.includes(skill) && this.selectedCandidates[1].skills.includes(skill) && this.selectedCandidates[2].skills.includes(skill)
      }

      return true
    },
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>

<style>
.ghost {
  opacity: 0.5;
  background: #F8F8F8;
}

.list-group {
  min-height: 350px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.candidate {
  min-width: 110px;
}

.text-14 {
  font-size: 14px;
}

.text-12 {
  font-size: 12px;
}

.empty-card {
  height: 100px;
  border: dotted 2px #C1C1C1 !important;
}

.conclusion-card {
  border: dashed 2px #aaaec8 !important;
  background-color: #e5e6ee !important;
}

</style>
