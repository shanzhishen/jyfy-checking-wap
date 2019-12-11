import Vue from 'vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QTabPanels,
  QTabPanel,
  QSeparator,
  QTabs,
  QTab,
  QRouteTab,
  QCard,
  QCardSection,
  QCardActions,
  QScrollArea,
  QInput,
  QForm,
  QParallax,
  QFooter,
  QMenu,
  QSplitter,
  QAvatar,
  Ripple,
  QSelect,
  Notify,
  SessionStorage,
  Dialog,
  QBtnDropdown,
  ClosePopup,
  QFab,
  QFabAction,
  QPageSticky
} from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 1500,
})

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QTabPanels,
    QTabPanel,
    QRouteTab,
    QSeparator,
    QTabs,
    QTab,
    QCard,
    QCardSection,
    QCardActions,
    QScrollArea,
    QInput,
    QForm,
    QParallax,
    QFooter,
    QMenu,
    QSplitter,
    QAvatar,
    QSelect,
    QBtnDropdown,
    QFab,
    QFabAction,
    QPageSticky
  },
  directives: {
    Ripple,
    ClosePopup
  },
  plugins: {
    Notify,
    SessionStorage,
    Dialog
  },
  config: {
    notify: { /* Notify defaults */ }
  },
  lang: lang,
  iconSet: iconSet
 })