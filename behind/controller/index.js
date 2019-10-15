module.exports = {
  add: async (ctx, next) => {
    ctx.response.body = '{message:"success"}'
  }
}