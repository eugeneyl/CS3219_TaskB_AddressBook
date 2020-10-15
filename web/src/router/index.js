import Vue from 'vue'
import Router from 'vue-router'
import AddressBook from '@/components/AddressBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddressBook',
      component: AddressBook
    }
  ]
})
