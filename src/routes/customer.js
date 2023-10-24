import express from "express";
import {
  getCustomers,
  customerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getForm,
} from "../controllers/customers.js";

const router = express.Router();

router.get("/form", getForm);

router.get("/", getCustomers);

router.get("/:id", customerById);

router.post("/", createCustomer);

router.patch("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;
