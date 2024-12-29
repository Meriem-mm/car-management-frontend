const express = require('express');
const router = express.Router();
// Предполага се, че ще съществува контролер за заявки за поддръжка
const requestController = require('../controllers/requestController');

// Рутове за заявките
router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestById);
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
