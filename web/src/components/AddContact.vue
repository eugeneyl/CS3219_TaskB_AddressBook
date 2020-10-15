<template>
    <div style="text-align:left">
        <b-form @submit="onSubmit" @reset="onReset">
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
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                gender: null,
                email: '',
                phone: ''
            },
            gender: [{text: "Select your gender.", value: null }, "Male", "Female"]
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            console.log(this.form)
            this.$store.dispatch('addContact', this.form)
            this.$router.push('/home')
        },
        onReset(event) {
            event.preventDefault();
            this.form.name= ''
            this.form.gender = null
            this.form.email = ''
            this.form.phone = ''
        }
    }
}

</script>
