import express from 'express';
import { deleteInventory, getAllInventory, getSingleInventory, updateInventory, addInventory } from '../controllers/inventoryController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id',authenticate, restrict(["admin", "BacSi"]),  getSingleInventory); 
router.get('/', authenticate, restrict(["admin", "BacSi"]),getAllInventory);
router.put('/:id', authenticate, restrict(["admin"]), updateInventory); 
router.delete('/:id',authenticate, restrict(["admin",]),deleteInventory);
router.post('/addInventory', addInventory);

export default router;
