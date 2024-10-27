import express from 'express';
import { deleteInventory, getAllInventory, getSingleInventory, updateInventory, addInventory } from '../controllers/inventoryController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id',  getSingleInventory); 
router.get('/', getAllInventory);
router.put('/:id',  updateInventory); 
router.delete('/:id',deleteInventory);
router.post('/addInventory', addInventory);

export default router;
