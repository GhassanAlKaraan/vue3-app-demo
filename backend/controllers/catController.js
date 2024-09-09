import asyncHandler from "express-async-handler";
import Cat from "../models/CatModel.js";

const addCat = asyncHandler(async (req, res) => {
    const { name, breed, age, favoriteToy } = req.body;

    if (!name || !breed || !age || !favoriteToy) {
        res.status(400);
        throw new Error("Wrong payload, must have name, breed, age and favoriteToy");
    }

    const cat = await Cat.create({
        name,
        breed,
        age,
        favoriteToy
    });

    if (cat) {
        res.status(201).json(cat);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

});

const updateCat = asyncHandler(async (req, res) => {
    const { name, breed, age, favoriteToy } = req.body;
    const { id } = req.params;
    const cat = await Cat.findById(id);

    try {
        cat.name = name;
        cat.breed = breed;
        cat.age = age;
        cat.favoriteToy = favoriteToy;

        await cat.save();
        res.status(200).json({ message: "cat updated!" });
    } catch (err) {
        res.status(400);
        throw new Error("could not update cat info");
    }
});

const deleteCat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cat = await Cat.findById(id);
    try {
        await cat.deleteOne();
        res.status(200).json({ message: "cat deleted!" });
    } catch (err) {
        res.status(400);
        throw new Error("could not delete cat");
    }
});

const getCat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cat = await Cat.findById(id);
    res.status(200).json({
        message: "cat info",
        cat: cat,
    });
});

const getCats = asyncHandler(async (req, res) => {
    const cats = await Cat.find({});
    res.status(200).json({
        message: "all cats",
        cats: cats,
    });
});

export { addCat, updateCat, deleteCat, getCat, getCats };