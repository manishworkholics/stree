const jewellery = require('../models/jewelleryModel')



exports.addjewellery = async (req, res) => {
    try {
        const { name, type, pricePerDay, isAvailable } = req.body;
        const jewelleries = new jewellery({ name, type, pricePerDay, isAvailable })
        await jewelleries.save()
        res.status(201).json(jewelleries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}



exports.getjewellery = async (req, res) => {
   try {
        const jewelleries = await jewellery.find()
        res.status(201).json(jewelleries)

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}