import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 0,
            required: true,
        },
        favoriteToy: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

const Cat = mongoose.model("Cat", catSchema);
export default Cat;
