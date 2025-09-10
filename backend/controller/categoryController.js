const Category = require('../models/CategoryModel')


exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = new Category({ name });

        await category.save();
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const categoryData = req.body;


        const category = await Category.findByIdAndUpdate(req.params.id, categoryData, { new: true });

        if (!category) return res.status(404).json({ success: false, message: "Category not found" });

        res.status(200).json({ success: true, message: "Category updated", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ success: false, message: "Category not found" });

        res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}