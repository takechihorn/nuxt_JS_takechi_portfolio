const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const ORDER_TABLE = '<order_table_name>'
const ORDER_TYPE = 'Order'
const HEADPHONE_ORDER_TABLE = '<headphone_order_table name>'
const HEADPHONE_ORDER_TYPE = 'HeadphoneOrder'

// processPaymentからオーダー情報を取得する。
// オーダーを作成
const createOrder = async (payload) => {
  // eslint-disable-next-line camelcase
  const { order_id, username, email, total } = payload
  const params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      customer: email,
      user: username,
      total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  }
  console.log(params)
  await documentClient.put(params).promise()
}

// 中間テーブルであるcreateHeadphoneOrderも同様に作成
const createHeadphoneOrder = async (payload) => {
  const headphoneOrders = []
  // eslint-disable-next-line no-undef
  for (i = 0; i < payload.cart.length; i++) {
    // eslint-disable-next-line no-undef
    const cartItem = payload.cart[i]
    headphoneOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: HEADPHONE_ORDER_TYPE,
          headphone_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    })
  }
  const params = {
    RequestItems: {},
  }
  params.RequestItems[HEADPHONE_ORDER_TABLE] = headphoneOrders
  console.log(params)
  await documentClient.batchWrite(params).promise()
}

/*
 * processPaymentからcreateOrderをする。
 * Create an order
 * User = logged in user
 *
 */
exports.handler = async (event) => {
  try {
    const payload = event.prev.result
    payload.order_id = uuidv4()

    // create a new order
    await createOrder(payload)

    // links headphones with the order
    await createHeadphoneOrder(payload)

    // Note - You may add another function to email the invoice to the user

    return 'SUCCESS'
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}
