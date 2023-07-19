export const goodbye = async (event, context, cb) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Goodbye World!',
    }),
  }
}
