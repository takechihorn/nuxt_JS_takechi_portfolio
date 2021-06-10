import { API, graphqlOperation, Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import awsmobile from '../src/aws-exports'
import { getHeadphone } from '../src/graphql/queries'
import { listHeadphones } from '../src/graphql/queries'
import { createHeadphone } from '../src/graphql/mutations'
import { updateHeadphone } from '../src/graphql/mutations'
import { deleteHeadphone } from '../src/graphql/mutations'
import { listImages } from '../src/graphql/queries'
import { createImage } from '../src/graphql/mutations'
import { updateImage } from '../src/graphql/mutations'

export const state = () => ({
  headphones: null,
})

export const mutations = {
  setHeadphone(state, payload) {
    state.headphone = payload
  },
}

export const actions = {
  async createHeadphone({ dispatch }, newHeadphone) {
    try {
      // Headphone
      const headphone = {
        title: newHeadphone.title,
        price: newHeadphone.price,
        description: newHeadphone.description,
      }
      const headphoneData = await API.graphql(
        graphqlOperation(createHeadphone, { input: headphone })
      )
      const id = headphoneData.data.createProduct.id
      // Images
      if (newHeadphone.images != null && newHeadphone.images.length > 0) {
        for (let i = 0; i < newHeadphone.images.length; i++) {
          const image = newHeadphone.images[i]
          image.imageProductId = id
          image.productId = id
          await dispatch('createUpdateImage', image)
        }
      }
      return await dispatch('getHeadphone', id)
    } catch (error) {
      console.log('createUpdateImage', error)
    }
  },
  async updateHeadphone({ dispatch }, newHeadphone) {
    try {
      // Headphone
      const headphone = {
        id: newHeadphone.id,
        title: newHeadphone.title,
        price: newHeadphone.price,
        description: newHeadphone.description,
      }
      await API.graphql(
        graphqlOperation(updateHeadphone, {
          input: headphone,
        })
      )
      // Images
      if (newHeadphone.images != null && newHeadphone.images.length > 0) {
        for (let i = 0; i < newHeadphone.images.length; i++) {
          const image = newHeadphone.images[i]
          image.imageProductId = newHeadphone.id
          image.productId = newHeadphone.id
          await dispatch('createUpdateImage', image)
        }
      }
      return await dispatch('getProduct', headphone.id)
    } catch (error) {
      console.log('updateHeadphone', error)
    }
  },
  async deleteHeadphone({ dispatch }, id) {
    try {
      const headphone = await this.getHeadphone(id)
      if (headphone == null) return
      await API.graphql(graphqlOperation(deleteHeadphone, { input: headphone }))
      dispatch('getHeadphone')
    } catch (error) {
      console.log('deleteHeadphone', error)
    }
  },
  async getHeadphone(_, id) {
    try {
      const headphoneData = await API.graphql(
        // eslint-disable-next-line object-shorthand
        graphqlOperation(getHeadphone, { id: id })
      )
      if (
        headphoneData == null ||
        headphoneData.data == null ||
        headphoneData.data.getHeadphone == null
      )
        return null
      const headphone = headphoneData.data.getHeadphone

      // Images
      if (
        headphone.images.items == null ||
        headphone.images.items.length === 0
      ) {
        const imagesData = await API.graphql(
          graphqlOperation(listHeadphones, { productId: id })
        )
        const imageItems = []
        if (
          imagesData.data.listImages.items != null &&
          imagesData.data.listImages.items.length > 0
        ) {
          for (let i = 0; i < imagesData.data.listImages.items.length; i++) {
            const imageData = imagesData.data.listImages.items[i]
            if (
              imageData.productId === headphone.id &&
              imageData.fullsize != null
            ) {
              imageData.imageUrl = await Storage.get(imageData.fullsize.key)
              imageItems.push(imageData)
              headphone.imageUrl = imageData.imageUrl
            }
          }
        }
        headphone.images.items = imageItems
      }
      return headphone
    } catch (error) {
      console.log('getHeadphone', error)
      return null
    }
  },
  async getHeadphones() {
    const headphoneData = await API.graphql(graphqlOperation(listHeadphones))
    const headphones = headphoneData.data.listHeadphones.items
    for (let i = 0; i < headphones.length; i++) {
      const product = headphones[i]
      // Image
      if (product.imageUrl == null) {
        const imagesData = await API.graphql(
          graphqlOperation(listImages, { productId: product.id })
        )
        if (
          imagesData.data.listImages.items != null &&
          imagesData.data.listImages.items.length > 0
        ) {
          product.imageUrl = await Storage.get(
            imagesData.data.listImages.items[0].fullsize.key
          )
        }
      }
    }
    return headphones
  },
  async getHeadphonesPagination(_, productFilter) {
    const variables = {
      filter: productFilter.filters,
    }
    if (productFilter.nextToken != null)
      variables.nextToken = productFilter.nextToken
    const headphoneData = await API.graphql({
      query: listHeadphones,
      // eslint-disable-next-line object-shorthand
      variables: variables,
    })
    const headphones = headphoneData.data.listHeadphones
    for (let i = 0; i < headphones.items.length; i++) {
      const headphone = headphones.items[i]
      // Image
      if (headphone.imageUrl == null) {
        const imagesData = await API.graphql(
          graphqlOperation(listImages, { headphoneId: headphone.id })
        )
        if (
          imagesData.data.listImages.items != null &&
          imagesData.data.listImages.items.length > 0
        ) {
          const imageItem = Vue._.find(
            imagesData.data.listImages.items,
            function (item) {
              return item.productId === headphone.id
            }
          )
          if (imageItem != null && imageItem.fullsize != null) {
            headphone.imageUrl = await Storage.get(imageItem.fullsize.key)
          }
        }
      }
    }
    headphones.totalRecords = headphones.items.length
    return headphones
  },
  async getImagesHeadphoneId(_, headphoneId) {
    const imagesData = await API.graphql(
      // eslint-disable-next-line object-shorthand
      graphqlOperation(listImages, { headphoneId: headphoneId })
    )
    const imageItems = await Promise.all(
      imagesData.data.listImages.items.map(async (item) => {
        item.imageUrl = await Storage.get(item.fullsize.key)
        return item
      })
    )
    return imageItems
  },
  async createUpdateImage(_, data) {
    try {
      const newImage = {
        contentType: data.contentType,
        fullsize: data.fullsize,
        productId: data.productId,
      }
      if (data.id != null) {
        newImage.id = data.id
        const image = await API.graphql(
          graphqlOperation(updateImage, { input: newImage })
        )
        return Promise.resolve(image.data.updateImage)
      } else {
        const image = await API.graphql(
          graphqlOperation(createImage, { input: newImage })
        )
        return Promise.resolve(image.data.createImage)
      }
    } catch (error) {
      console.log('createUpdateImage', error)
    }
  },
  async uploadImage(_, data) {
    const {
      aws_user_files_s3_bucket_region: region,
      aws_user_files_s3_bucket: bucket,
    } = awsmobile
    const { file } = data
    const extension = file.name.substr(file.name.lastIndexOf('.') + 1)
    const imageId = uuidv4()
    const key = `images/${imageId}.${extension}`
    const newImage = {
      contentType: file.type,
      fullsize: {
        key,
        region,
        bucket,
      },
    }

    // s3 bucket storage add file to it
    try {
      const imageKey = await Storage.put(key, file, {
        level: 'public',
        contentType: file.type,
        metadata: { imageId },
      })

      newImage.imageUrl = await Storage.get(imageKey)

      return Promise.resolve(newImage)
    } catch (error) {
      console.log('uploadImage error', error)
      return Promise.reject(error)
    }
  },
}
export const getters = {
  headphones: (state) => state.headphones,
}
