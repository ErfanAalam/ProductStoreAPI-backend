import express from 'express'
import mongoose, { model, Schema } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(express({urlencoded:true}))
app.use(express.json())
app.use(cors({"origin":"*"}))


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully");

        app.listen(port, () => {
            console.log(`Server started at ${port}`);
        })
    })

    const productSchema = new Schema({
        id:{
            type : String,
            required : true,
            unique : true
        },
        img:{
            type : String,
            required : true,
        },
        title:{
            type : String,
            required : true,
        },
        desc:{
            type : String,
            required : true,
        },
        price:{
            type : String,
            required : true,
        },
        rating:{
            type : String,
            required : true,
        }
    })

    const productModel = model("products", productSchema)

app.get("/", async(req, res) => {
    const Product = await productModel.find()
    res.json(Product)
})

app.get("/:id",async(req,res)=>{

    const id = req.params.id

    const product = await productModel.findOne({id})

    res.json(product)
})


app.post("/addProduct",async(req,res)=>{
    const {id,img,title,desc,price, rating} = req.body

    const productToSave = productModel({
        id,
        img,
        title,
        desc,
        price,
        rating
    })

    await productToSave.save()

    res.send("product added")

})

app.delete("/deleteProduct/:id",async(req,res)=>{

    const id = req.params.id

    await productModel.findOneAndDelete({id})

    res.json("Product deleted")
})
