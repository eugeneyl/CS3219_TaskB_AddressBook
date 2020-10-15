import Vue from 'vue'
import Router from 'vue-router'
import AddressBook from '@/components/AddressBook'
import AddContact from '@/components/AddContact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/addContact',
      name: 'AddContact',
      component: AddContact

    },
    {
      path: '/home',
      name: 'AddressBook',
      component: AddressBook
    },
    {
      path: '/',
      redirect: 'home'
    }
  ]
})
