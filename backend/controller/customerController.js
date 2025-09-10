const Customer = require("../models/CustomerModel");

// 🔹 Add Customer
exports.addCustomer = async (req, res) => {
    try {
        const { name, mobile, adress } = req.body;

        // 🔹 Check if customer exists with same name & mobile
        let customer = await Customer.findOne({ name, mobile });

        if (customer) {
            // ✅ Update existing customer
            customer.adress = adress || customer.adress;
            await customer.save();
            return res.status(200).json({ success: true, message: "Customer updated", data: customer });
        } else {
            // ✅ Create new customer
            customer = new Customer({ name, mobile, adress });
            await customer.save();
            return res.status(201).json({ success: true, message: "Customer created", data: customer });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// 🔹 Get All Customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Get Single Customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Update Customer
exports.updateCustomer = async (req, res) => {
    try {
        const { name, mobile, adress } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, mobile, adress },
            { new: true, runValidators: true }
        );
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 🔹 Delete Customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
