import axios from 'axios';

const apiURL = "http://localhost:8080/api/contacts"

export default {
    state: {
        contactList: [],
        selectedContact: {}
    },
    mutations: {
        setContactList(state, contactList){
            state.contactList = [...contactList]
        },
        addToContactList(state, contact){
            state.contactList = [...state.contactList, contact]
        },
        deleteFromContactList(state, contactId){
            var list = [...state.contactList]
            list.filter(contact => contact._id !== contactId)
            state.contactList = list
        },
        editContactList(state, updatedContact){
            var list = [...state.contactList]
            list = list.map(contact => {
                if (contact._id === updatedContact._id) {
                    contact = updatedContact
                }
                return contact
            })
            state.contactList = list
        },
        updateSelectedContact(state, contact){
            state.selectedContact = {}
            state.selectedContact = contact
        },
    },
    actions: {
        async getAllContact({ commit }) {
            axios.get(apiURL)
                .then(response => {
                    commit('setContactList', response.data.data)
                })
                .catch(e => {
                    console.log("Error getting contact list: " + e)
                })
        },
        async getContact({ commit }, contactId) {
            axios.get(apiURL + "/" + contactId)
                .then(response => {
                    commit('updateSelectedContact', response.data.data)
                })
                .catch(e => {
                    console.log("Error getting contact list: " + e)
                })
        },
        async addContact({ commit }, contact) {
            axios.post(apiURL, contact)
                .then(response => {
                    commit('addToContactList', response.data.data)
                })
                .catch(e => {
                    console.log("Error adding contact list: " + e)
                })
        },
        async deleteContact({ commit }, contactId) {
            axios.delete(apiURL+"/"+contactId)
                .then( () => {
                    commit('deleteFromContactList', contactId)
                })
                .catch(e => {
                    console.log("Error deleting from contact list: " + e)
                })
        },
        async editContact({ commit }, res) {
            axios.put(apiURL+"/"+res.id, res.data)
                .then(response => {
                    commit('editContactList', response.data.data)
                })
                .catch(e => {
                    console.log("Error editting contact list: " + e)
                })
        },
    }
};