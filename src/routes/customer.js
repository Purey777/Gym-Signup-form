import express from "express";
import {
  getCustomers,
  customerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getForm,
  loginForm,
  loginUser,
} from "../controllers/customers.js";

const router = express.Router();

router.get("/form", getForm);

router.get("/", getCustomers);

router.get("/login", loginForm);

router.post("/",loginUser )

router.post("/", createCustomer);

router.get("/:id", customerById);

router.patch("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;
