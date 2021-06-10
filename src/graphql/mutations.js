/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($input: ProcessOrderInput!) {
    processOrder(input: $input)
  }
`;
export const createHeadphone = /* GraphQL */ `
  mutation CreateHeadphone(
    $input: CreateHeadphoneInput!
    $condition: ModelHeadphoneConditionInput
  ) {
    createHeadphone(input: $input, condition: $condition) {
      id
      title
      description
      images {
        items {
          id
          contentType
          height
          width
          size
          createdAt
          updatedAt
          owner
          headphoneId
        }
        nextToken
      }
      maker
      featured
      price
      orders {
        items {
          id
          headphone_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateHeadphone = /* GraphQL */ `
  mutation UpdateHeadphone(
    $input: UpdateHeadphoneInput!
    $condition: ModelHeadphoneConditionInput
  ) {
    updateHeadphone(input: $input, condition: $condition) {
      id
      title
      description
      images {
        items {
          id
          contentType
          height
          width
          size
          createdAt
          updatedAt
          owner
          headphoneId
        }
        nextToken
      }
      maker
      featured
      price
      orders {
        items {
          id
          headphone_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeadphone = /* GraphQL */ `
  mutation DeleteHeadphone(
    $input: DeleteHeadphoneInput!
    $condition: ModelHeadphoneConditionInput
  ) {
    deleteHeadphone(input: $input, condition: $condition) {
      id
      title
      description
      images {
        items {
          id
          contentType
          height
          width
          size
          createdAt
          updatedAt
          owner
          headphoneId
        }
        nextToken
      }
      maker
      featured
      price
      orders {
        items {
          id
          headphone_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
      id
      fullsize {
        region
        bucket
        key
      }
      thumbnail {
        region
        bucket
        key
      }
      contentType
      height
      width
      size
      createdAt
      updatedAt
      owner
      headphoneId
      headphone {
        id
        title
        description
        images {
          nextToken
        }
        maker
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
      id
      fullsize {
        region
        bucket
        key
      }
      thumbnail {
        region
        bucket
        key
      }
      contentType
      height
      width
      size
      createdAt
      updatedAt
      owner
      headphoneId
      headphone {
        id
        title
        description
        images {
          nextToken
        }
        maker
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
      id
      fullsize {
        region
        bucket
        key
      }
      thumbnail {
        region
        bucket
        key
      }
      contentType
      height
      width
      size
      createdAt
      updatedAt
      owner
      headphoneId
      headphone {
        id
        title
        description
        images {
          nextToken
        }
        maker
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const createHeadphoneOrder = /* GraphQL */ `
  mutation CreateHeadphoneOrder(
    $input: CreateHeadphoneOrderInput!
    $condition: ModelHeadphoneOrderConditionInput
  ) {
    createHeadphoneOrder(input: $input, condition: $condition) {
      id
      headphone_id
      order_id
      order {
        id
        user
        date
        total
        headphones {
          nextToken
        }
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      headphone {
        id
        title
        description
        images {
          nextToken
        }
        maker
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer
    }
  }
`;
export const updateHeadphoneOrder = /* GraphQL */ `
  mutation UpdateHeadphoneOrder(
    $input: UpdateHeadphoneOrderInput!
    $condition: ModelHeadphoneOrderConditionInput
  ) {
    updateHeadphoneOrder(input: $input, condition: $condition) {
      id
      headphone_id
      order_id
      order {
        id
        user
        date
        total
        headphones {
          nextToken
        }
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      headphone {
        id
        title
        description
        images {
          nextToken
        }
        maker
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer
    }
  }
`;
export const deleteHeadphoneOrder = /* GraphQL */ `
  mutation DeleteHeadphoneOrder(
    $input: DeleteHeadphoneOrderInput!
    $condition: ModelHeadphoneOrderConditionInput
  ) {
    deleteHeadphoneOrder(input: $input, condition: $condition) {
      id
      headphone_id
      order_id
      order {
        id
        user
        date
        total
        headphones {
          nextToken
        }
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      headphone {
        id
        title
        description
        images {
          nextToken
        }
        maker
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      headphones {
        items {
          id
          headphone_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      headphones {
        items {
          id
          headphone_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      headphones {
        items {
          id
          headphone_id
          order_id
          createdAt
          updatedAt
          customer
        }
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
