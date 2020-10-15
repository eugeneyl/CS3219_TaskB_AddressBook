<template>
    <div style="text-align:left">
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Name"
                label-for="input-1"
                description="This field is necessary."
            >
                <b-form-input
                id="input-1"
                v-model="form.name"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Email Address:" label-for="input-2" description="This field is necessary.">
                <b-form-input
                id="input-2"
                v-model="form.email"
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Gender:" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="form.gender"
                :options="gender"
                placeholder="Enter gender"
                ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Phone Number:" label-for="input-4">
                <b-form-input
                id="input-4"
                v-model="form.phone"
                placeholder="Enter phone number"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gender: [{text: "Select your gender.", value: null }, "Male", "Female"],
        }
    },
    computed: {
        form() {
            return this.$store.state.contacts.selectedContact
        },
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            let contactId = this.$route.params.id
            this.$store.dispatch('editContact', {id: contactId, data:this.form})
            this.$router.push('/home')
        }
    },
    mounted() {
        let contactId = this.$route.params.id
        this.$store.dispatch('getContact', contactId)
    }
}

</script>