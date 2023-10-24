import Customer from "../../model/customer.model.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getForm = (req, res) => {
  res.sendFile(path.resolve(__dirname + "../../../views/index.html"));
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const customerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).send("Customer with that id not found!");
    }
    res.send(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const createCustomer = async (req, res) => {
  const user = new Customer(req.body);
  try {
    await user.save();
    res
      .status(201)
      .sendFile(path.resolve(__dirname + "../../../views/success.html"));
    console.log(newUser);
  } catch (err) {
    res.status(500).send(err);
    console.log(err.message);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).send("Can't find customer!");
    }
    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
    customer.email = req.body.email;
    customer.phone = req.body.phone;
    customer.signUpDate = req.body.signUpDate;
    const updatedCustomer = await customer.save();
    res.send(`Customer updated!`);
    console.log(updatedCustomer);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = Customer.findById(req.params.id);
    const deletedCustomer = await customer.deleteOne();
    res.send(deletedCustomer);
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
};
