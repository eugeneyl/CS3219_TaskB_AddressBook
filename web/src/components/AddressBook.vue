<template>
    <div id="contacts-table">
        <table class="table">
            <colgroup>
                <col span="1" style="width: 19%;">
                <col span="1" style="width: 19%;">
                <col span="1" style="width: 19%;">
                <col span="1" style="width: 19%;">
                <col span="1" style="width: 24%;">
            </colgroup>
            <thead>
                <tr>
                    <th id="name">Name</th>
                    <th id="gender">Gender</th>
                    <th id="email">Email</th>
                    <th id="phone">Phone Number</th>
                    <th id="options"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contactList" :key="contact._id">
                    <td>{{contact.name}}</td>
                    <td>{{contact.gender}}</td>
                    <td>{{contact.email}}</td>
                    <td>{{contact.phone}}</td>
                    <td style="text-align:center">
                        <button v-on:click="editContact(contact._id)" type="button" class="btn btn-light">Edit</button>
                        <button v-on:click="deleteContact(contact._id)" type="button" class="btn btn-light">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
export default {
    computed: {
        contactList() {
            return this.$store.state.contacts.contactList
        }
    },
    methods:{
        editContact(id) {
            console.log("edit" + id)
        },
        deleteContact(id) {
            console.log("delete" + id)
        },
    },
    mounted() {
        this.$store.dispatch('getAllContact');
    }
}
</script>

<style scoped>
#contacts-table{
    width:100%
}
table{
    width:100%;
    border-collapse: separate;
    text-align: left;
}
button{
    margin: 0px 10px
}
</style>