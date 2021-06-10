<template>
  <v-container align="center">
    <h2 class="display-2">Add new Headphone</h2>
    <form action="">
      <v-layout>
        <v-flex x6>
          <strong>Payment address</strong>
          <v-text-field v-model="title" label="Title"></v-text-field>
          <v-text-field label="Address"></v-text-field>
          <v-text-field label="Zipcode"></v-text-field>
          <v-text-field label="City"></v-text-field>
          <v-text-field label="Phone"></v-text-field>
          <v-text-field label="E-mail"></v-text-field>

          <v-checkbox
            v-model="delivery_address"
            label="Other delivery address"
          ></v-checkbox>
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="blue-grey"
            class="ma-2 white--text"
            @click="loader = 'loading3'"
          >
            Upload
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-flex>
        <v-flex x6>
          <strong>Delivery address</strong>
          <div v-if="delivery_address">
            <v-text-field label="Name"></v-text-field>
            <v-text-field label="Address"></v-text-field>
            <v-text-field label="Zipcode"></v-text-field>
            <v-text-field label="City"></v-text-field>
          </div>
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { listHeadphones } from '../src/graphql/queries'
import { createHeadphone, deleteHeadphone } from '../src/graphql/mutations'
// import * as queries from "../graphql/queries";
// import { getheadphone } from '../graphql/queries'
import * as mutations from '../src/graphql/mutations'

export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      title: '',
      description: '',
      image: '',
      maker: '',
      price: '',
    }
  },
  // reated() {
  //   this.subscription = API.graphql(
  //    c graphqlOperation(subscriptions.onCreateheadphone)
  //   ).subscribe({
  //     next: (headphoneData) =>
  //       // eslint-disable-next-line no-console
  //       console.log(
  //         'something happened....' + JSON.stringify(headphoneData, null, 2)
  //       ),
  //   })
  // },
  destroyed() {
    this.subscription.unsubscribe()
  },
  methods: {
    resetFields() {
      this.Headphone.id = ''
      this.Headphone.name = ''
      this.Headphone.description = ''
      this.Headphone.city = ''
    },
    async getCurrentUSerInfo() {
      // eslint-disable-next-line no-console
      console.log('in getCurrentUSerInfo()...')
      try {
        const currentUser = await Auth.currentUserInfo()
        if (currentUser.username) {
          // eslint-disable-next-line no-console
          console.log(
            'current user information: ' + JSON.stringify(currentUser, null, 2)
          )
          this.userInfo = currentUser
        } else {
          // eslint-disable-next-line no-console
          console.log(
            'No user info - not logged in? - used saved info?' +
              JSON.stringify(this.userInfo, null, 2)
          )
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(
          'current user information error: ' + JSON.stringify(err, null, 2)
        )
      }
    },
    async addheadphone() {
      console.log('adding a Headphone...')

      try {
        const timestamp = Date.now()
        const { name, description, city } = this.Headphone
        const Headphone = {
          name,
          description,
          city,
          clientId: timestamp.toString(),
        }
        console.log('in addheadphone(): ' + JSON.stringify(Headphone, null, 2))
        const response = await API.graphql(
          graphqlOperation(createHeadphone, { input: Headphone })
        )

        console.log(
          'Headphone successfully added: ' + JSON.stringify(response, null, 2)
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('add Headphone error: ' + JSON.stringify(err, null, 2))
      }
      this.resetFields()
    },
    // async getheadphone() {
    //   // eslint-disable-next-line no-console
    //   console.log(
    //     'getting a Headphone for id: ' + this.Headphone.id + '   ....'
    //   )
    //   try {
    //     const Headphone = await API.graphql(
    //       graphqlOperation(getheadphone, { id: this.Headphone.id })
    //       // graphqlOperation(queries.getheadphone, { id: this.Headphone.id })
    //     )
    //     console.log('Headphone: ' + JSON.stringify(Headphone, null, 2))
    //   } catch (err) {
    //     console.log('get Headphone error: ' + JSON.stringify(err, null, 2))
    //   }
    //   this.resetFields()
    // },
    async listAllheadphones() {
      console.log('getting Headphone list....')
      try {
        const response = await API.graphql(graphqlOperation(listHeadphones))
        this.headphones = response.data.listheadphones.items
        console.log(
          'list of headphones: ' + JSON.stringify(this.headphones, null, 2)
        )
      } catch (err) {
        console.log('list headphones error: ' + JSON.stringify(err, null, 2))
      }
    },
    async updateheadphone() {
      console.log('updating a Headphone....')
      try {
        const headphoneDetails = {
          id: this.Headphone.id,
          description: this.Headphone.description,
          name: this.Headphone.name,
          city: this.Headphone.city,
        }

        const updatedheadphone = await API.graphql(
          graphqlOperation(mutations.updateHeadphone, {
            input: headphoneDetails,
          })
        )
        console.log(
          'update Headphone: ' + JSON.stringify(updatedheadphone, null, 2)
        )
      } catch (err) {
        console.log('update Headphone error: ' + JSON.stringify(err, null, 2))
      }
      this.resetFields()
    },

    async deleteheadphone() {
      console.log('deleting a Headphone....')
      try {
        const headphoneDetails = {
          id: this.Headphone.id,
        }
        const deletedheadphone = await API.graphql(
          graphqlOperation(deleteHeadphone, { input: headphoneDetails })
        )
        console.log(
          'deleted Headphone: ' + JSON.stringify(deletedheadphone, null, 2)
        )
      } catch (err) {
        console.log('deleted Headphone error: ' + JSON.stringify(err, null, 2))
      }
      this.resetFields()
    },
  },
}
</script>
