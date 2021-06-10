/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          maker
          featured
          price
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getHeadphone = /* GraphQL */ `
  query GetHeadphone($id: ID!) {
    getHeadphone(id: $id) {
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
export const listHeadphones = /* GraphQL */ `
  query ListHeadphones(
    $filter: ModelHeadphoneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeadphones(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
