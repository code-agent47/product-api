import {Router} from 'express';
import {body, check, oneOf, validationResult} from "express-validator";
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router();

/* product */

router.get("/product", getProducts)
router.get("/product/:id", getOneProduct)
router.put("/product/:id", body("name").isString(), handleInputErrors, (req,res) => {
    
})
router.post("/product", body("name").isString(), handleInputErrors, createProduct)
router.delete("/product/:id", deleteProduct)

/* update */

router.get("/update", getUpdates)
router.get("/update/:id", getOneUpdate)
router.put("/update/:id", body('title').optional,
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), 
    handleInputErrors,
    updateUpdate
)
router.post("/update", 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors,
    createUpdate
)
router.delete("/update/:id", deleteUpdate)


/* update points */

router.get("/updatepoint", () => {})
router.get("/updatepoint/:id", () => {})
router.put("/updatepoint/:id", 
   body("name").optional().isString(),
   body("description").optional().isString(),
   handleInputErrors,
() => {}
)
router.post("/updatepoint", 
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
    () => {}
)
router.delete("/updatepoint/:id", () => {})

router.use((err, req, res, next) => {
    console.log(err);
    res.json({messgae: "in router handler"});
})

export default router;

