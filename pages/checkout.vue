<template>
  <v-form ref="billing" class="px-1">
    <p class="title ml-3 mb-4">Payment Details</p>
    <v-text-field
      v-model="cardNumber"
      label="Card #"
      outlined
      :rules="[rules.required]"
    ></v-text-field>
    <v-row>
      <v-col class="py-0">
        <v-text-field
          v-model="expiryDate"
          label="Date"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col class="py-0">
        <v-text-field
          v-model="cvc"
          label="cvc"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col class="py-0">
        <v-text-field
          v-model="cardZip"
          label="Zip"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click.native="submitOrder">Submit</v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BillingDetails',
  props: {
    cart: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardZip: '',
    rules: {
      email: (v) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'Invalid e-mail.'
      },
      required: (v) => !!v || 'Required.',
    },
  }),
  computed: {
    ...mapGetters({
      token: 'token',
    }),
  },
  methods: {
    shippingOpts(tokenID) {
      this.$commerce.checkout
        .getShippingOptions(tokenID, {
          country: this.country.code,
        })
        .then((r) => {
          this.$emit('shippingCost', r[0].price.formatted)
          this.shipMethod = r[0].id
        })
    },
  },
}
</script>
