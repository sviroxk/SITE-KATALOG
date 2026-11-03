const express = require('express')
const router = express.Router()
const { CollectionController } = require('../controllers')

router.post('/', CollectionController.createCollection)
router.get('/:userId', CollectionController.getCollections)
router.post('/:collectionId/items', CollectionController.addItemToCollection)
router.get('/:collectionId/items', CollectionController.getCollectionItems)
router.delete('/items/:itemId', CollectionController.removeItemFromCollection)

module.exports = router