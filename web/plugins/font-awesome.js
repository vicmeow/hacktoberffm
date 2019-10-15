import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUp,
  faCheck,
  faSpinner,
  faLink,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faTwitter,
  faGithub,
  faArrowUp,
  faCheck,
  faSpinner,
  faLink,
  faInfoCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
