const mongoose = require('mongoose');

const Model = mongoose.model('Query');

const create = async (req, res) => {
  try {
    const newQuery = new Model(req.body);
    const savedQuery = await newQuery.save();

    return res.status(201).json({
      success: true,
      result: savedQuery,
      message: 'Query created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = create;
