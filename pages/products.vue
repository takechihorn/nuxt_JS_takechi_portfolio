<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6"></v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              :key="pro.id"
              v-for="pro in products"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    :src="pro.src"
                  >
                    <v-card-title>{{ pro.type }} </v-card-title>
                    <v-expand-transition>
                      <div v-if="hover" style="height: 100%">
                        <v-btn v-if="hover" href="/product" class="" outlined
                          >VIEW</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>
                      <a href="/product" style="text-decoration: none">{{
                        pro.name
                      }}</a>
                    </div>
                    <div>${{ pro.price }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div class="text-center mt-12">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../src/graphql/queries'
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'BLACK TEE',
          type: 'Jackets',
          price: '18.00',
          src: require('../assets/img/shop/deal1.jpg'),
        },
        {
          id: 2,
          name: 'WHITE TEE',
          type: 'Polo',
          price: '40.00',
          src: require('../assets/img/shop/deal2.jpg'),
        },
        {
          id: 3,
          name: 'Zara limited...',
          type: 'Denim',
          price: '25.00',
          src: require('../assets/img/shop/deal3.jpg'),
        },
        {
          id: 4,
          name: 'SKULL TEE',
          type: 'Jackets',
          price: '30.00',
          src: require('../assets/img/shop/deal4.jpg'),
        },
        {
          id: 5,
          name: 'MANGO WINTER',
          type: 'Sweaters',
          price: '50.00',
          src: require('../assets/img/shop/deal5.jpg'),
        },
        {
          id: 6,
          name: 'SHIRT',
          type: 'Denim',
          price: '34.00',
          src: require('../assets/img/shop/deal6.jpg'),
        },
        {
          id: 7,
          name: 'TRUCKER JACKET',
          type: 'Jackets',
          price: '38.00',
          src: require('../assets/img/shop/deal7.jpg'),
        },
        {
          id: 8,
          name: 'COATS',
          type: 'Jackets',
          price: '25.00',
          src: require('../assets/img/shop/deal8.jpg'),
        },
        {
          id: 9,
          name: 'MANGO WINTER',
          type: 'Sweaters',
          price: '50.00',
          src: require('../assets/img/shop/deal9.jpg'),
        },
        {
          id: 10,
          name: 'SHIRT',
          type: 'Denim',
          price: '34.00',
          src: require('../assets/img/shop/deal10.jpg'),
        },
        {
          id: 11,
          name: 'TRUCKER JACKET',
          type: 'Jackets',
          price: '38.00',
          src: require('../assets/img/shop/deal11.jpg'),
        },
        {
          id: 12,
          name: 'COATS',
          type: 'Jackets',
          price: '25.00',
          src: require('../assets/img/shop/deal12.jpg'),
        },
      ],
    }
  },
  beforeMount() {
    let data
    ;(async () => {
      try {
        ;({ data } = await API.graphql(
          graphqlOperation(queries.listHeadphones)
        ))
        console.log(data)
        // console.log(errors)
      } catch (err) {
        console.log(err)
      }
    })()
  },
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
