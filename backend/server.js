import express  from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";


dotenv.config()
const app = express()


// app.get('/', (req, res ) => {
//     res.send('Server is ready')
// })

// console.log(process.env.MONGO_URI)


app.use(express.json()) // allow us to accept the json data in the req.body

app.post('/api/products', async (req, res) => {
    const product = req.body // user going to send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            sucess : false,
            message : "Please Provide all fields"
        })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({
            sucess : true,
            data : newProduct
        })
    } catch (error) {
        console.error("Error is Created Product")
        res.status(500).json({
            success : false,
            message : 'Server Error'
        })
    }
})
// Post Man Desktop Appliation
app.listen(5000, () => {
    connectDB()
    console.log('Server Started at http://localhost:5000 Hello world ')
})