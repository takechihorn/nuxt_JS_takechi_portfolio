<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
              :src="require('../../../assets/img/home/deal1.jpg')"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="require('../../../assets/img/home/slider2.jpg')"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="require('../../../assets/img/home/slider3.jpg')"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="require('../../../assets/img/home/slider1.jpg')"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <div class="pl-6">
            <p class="display-1 mb-0">Modern Black T-Shirt</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">$65.00</p>
              <v-spacer></v-spacer>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
              tincidunt eget nullam non. Tincidunt arcu non sodales neque
              sodales ut etiam. Lectus arcu bibendum at varius vel pharetra.
              Morbi tristique senectus et netus et malesuada.
            </p>
            <v-btn class="primary white--text" outlined tile dense
              ><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id
                leo in vitae turpis massa. Orci dapibus ultrices in iaculis
                nunc. At auctor urna nunc id cursus metus. Integer feugiat
                scelerisque varius morbi enim nunc. Aliquam sem et tortor
                consequat id porta nibh venenatis cras. Pellentesque pulvinar
                pellentesque habitant morbi tristique senectus et netus.
                Malesuada nunc vel risus commodo viverra maecenas. Neque
                volutpat ac tincidunt vitae semper quis.
              </p>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
    </v-container>
    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    item: 5,
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Lorem ipsum dolor?',
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
          '\n',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title:
          'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Lorem ipsum dolor',
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Lorem ipsum dolor',
        subtitle: '',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Lorem ipsum dolor',
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
    ],
  }),
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  mounted() {
    // Get Product
    this.getHeadphone()
    console.log(this.productData)
  },
  methods: {
    async getHeadphone() {
      // Get Product by Id
      const headphoneData = await this.$store.dispatch(
        'product/getHeadphone',
        this.id
      )
      if (headphoneData != null) {
        this.headphone = headphoneData
      }
    },
  },
}
</script>
