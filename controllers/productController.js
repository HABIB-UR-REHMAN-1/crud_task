const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    const category = await Category.create(req.body);
    res.status(201).json({ data: category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, minimumStock, category } = req.body;
    if (
      !name ||
      !price ||
      stock === undefined ||
      minimumStock === undefined ||
      !category
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let {
      minPrice,
      maxPrice,
      category,
      sortBy = "price",
      order = "asc",
      page = "1",
      limit = "20",
    } = req.query;
   
    minPrice = minPrice != null ? parseFloat(minPrice) : 0;
    maxPrice = maxPrice != null ? parseFloat(maxPrice) : Infinity;
    page = parseInt(page);
    limit = parseInt(limit);
   
    if (!["price", "name"].includes(sortBy)) {
      return res.status(400).json({ error: "Invalid sortBy field" });
    }
    if (!["asc", "desc"].includes(order)) {
      return res.status(400).json({ error: "Invalid order" });
    }
   
    const filter = {};
    if (minPrice) filter.price = { ...filter.price, $gte: minPrice };
    if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
