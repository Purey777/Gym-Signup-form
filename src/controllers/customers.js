import Customer from "../../model/customer.model.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt, { genSalt } from "bcrypt";

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

export const loginForm = (req, res) => {
  res.sendFile(path.resolve(__dirname + "../../../views/login.html"));
};

export const createCustomer = async (req, res) => {
  const { firstName, lastName, email, phone, password: plainText } = req.body;

  const password = await bcrypt.hash(plainText, 10);

  const existingData = await Customer.findOne({ email });
  if (existingData) {
    return res.status(400).send("User with that email already exists.");
  }

  try {
    const newUser = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    console.log(newUser);
  } catch (error) {
    console.log(error);
    return newUser.json();
  }
  res
    .status(201)
    .sendFile(path.resolve(__dirname + "../../../views/success.html"));
};

export const loginUser = async (req, res) => {
  const customer = await Customer.findOne({ email: req.body.email });

  if (!customer) {
    res.status(400).send("User not found");
  }
  try {
    if (await bcrypt.compare(req.body.password, customer.password)) {
      res.sendFile(
        path.resolve(__dirname + "../../../views/loginSuccess.html")
      );
    } else {
      res.status(400).send("Wrong email or password!");
    }
  } catch (err) {
    res.status(500).send(err);
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
    customer.password = req.body.password;
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
