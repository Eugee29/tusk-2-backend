// const logger = require('./logger.service')

var gIo = null

function setupSocketAPI(http) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })
  gIo.on('connection', (socket) => {
    // logger.info(`New connected socket [id: ${socket.id}]`)

    // socket.on('disconnect', (socket) => {
    //   logger.info(`Socket disconnected [id: ${socket.id}]`)
    // })

    socket.on('listen-to-board', (topic) => {
      if (socket.myTopic === topic) return
      if (socket.myTopic) {
        socket.leave(socket.myTopic)
      }
      socket.join(topic)
      socket.myTopic = topic
    })

    // socket.on('leave-board', (topic) => {
    //   socket.leave(topic)
    // })

    socket.on('board-activity', (board) => {
      socket.broadcast.to(socket.myTopic).emit('board-activity', board)
    })
  })
}

module.exports = {
  setupSocketAPI,
}
