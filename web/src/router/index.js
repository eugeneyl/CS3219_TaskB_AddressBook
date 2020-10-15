import Vue from 'vue'
import Router from 'vue-router'
import AddressBook from '@/components/AddressBook'
import AddContact from '@/components/AddContact'
import EditContact from '@/components/EditContact'

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
      path: '/editContact/:id',
      name: 'EditContact',
      component: EditContact

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
