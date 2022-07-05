const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard } = require('./board.controller')
const router = express.Router()

router.get('/', log, getBoards)
router.get('/:boardId', getBoardById)
router.post('/', addBoard)
router.put('/:boardId', updateBoard)
router.delete('/:boardId', removeBoard)

module.exports = router
