<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="500px" min-width="360px">
        <div v-if="!$auth.isAuthenticated">
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="blue accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab>
              <v-icon large>mdi-login</v-icon>
              <div class="caption py-1">Login</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form
                    ref="loginForm"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="login"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form.email"
                          type="email"
                          :rules="EmailRules"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form.password"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          type="submit"
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                        >
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <nuxt-link to="/signup">Need an account? Signup</nuxt-link>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
        <div v-else>
          You're logged in as {{ $auth.email }}.
          <v-btn
            x-large
            block
            color="success"
            @click="$store.dispatch('auth/logout')"
          >
            Logout
          </v-btn>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
    dialog: true,
    tab: 0,
    valid: true,
    EmailRules: [
      (v) => !!v || 'Required',
      (v) => (v && v.length >= 8) || 'Min 8 characters',
    ],

    show1: false,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => (v && v.length >= 8) || 'Min 8 characters',
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || 'Password must match'
    },
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push('/')
      } catch (error) {
        console.log({ error })
      }
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style></style>
