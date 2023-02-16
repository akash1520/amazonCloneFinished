const express = require("express");
const router = new express.Router()
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log("new data"+productsdata)
        res.status(201).json(productsdata)
    } catch (error) {
        console.log("error" + error.message)
    }
})

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params

        const individualData = await Products.find({ id: id })
        res.status(201).json(individualData)
        console.log(id)
    } catch (error) {
        console.log("error", error.message)
    }
})

//register data
router.post("/register", async (req, res) => {
    const {
        fname,
        email,
        mobile,
        password,
        cpassword
    } = req.body
    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(400).json({ error: "Fill all the data" })
        console.log("User didn't provide proper data")
    }

    try {
        const preUser = await USER.findOne({ email: email })

        if (preUser) {
            res.status(409).json({ Error: "This user is already present" })
        } else if (password != cpassword) {
            res.status(422).json({ Error: "Passwords don't match" })
        } else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            })

            //password hashing process

            const storedata = await finalUser.save()
            console.log(storedata)
            res.status(201).json(storedata)


        }

    } catch (error) {

    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ error: "Wrong details, fill it properly" })
    }

    try {
        const userLogin = await USER.findOne({ email: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            // console.log(isMatch)


            if (!isMatch) {
                res.status(400).json({ error: "Wrong password, please enter the correct password" })
            }

            else {
                 //token generation
                 const token = await userLogin.generateAuthtoken()
                 // console.log(token);
 
                 //cookie generation
                 res.cookie("amazonWeb", token, {
                     httpOnly: true,
                     expires: new Date(Date.now() + 240000)
                 })
                res.status(200).json(userLogin)
            }

        } else {
            res.status(400).json({ error: "Invalid Details" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid details" })
    }

})

router.post("/addcart/:id", authenticate, async (req, res) => {

    try {
        console.log("Working");
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart + "Found the cart");

        const Usercontact = await USER.findOne({ _id: req.userID });
        console.log(Usercontact + "Found the user with given cookie");


        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData + " Cart data has been saved");
            console.log(Usercontact + "User Will be saved with new cart data");
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
});


router.get("/validuser", authenticate, async (req, res) => {
    try {
        const Usercontact = await USER.findOne({ _id: req.userID });
        if (Usercontact) res.status(201).json(Usercontact)
    } catch (error) {
        res.status(400).json({ error: "User not found" })
    }
})

router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyUser = await USER.findOne({ _id: req.userID });
        res.status(201).json(buyUser)
    } catch (error) {
        res.status(400).json({ error: "User not found" })
    }
})

router.get("/logout",authenticate, async(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token!==req.token
        })

        res.clearCookie("amazonWeb")
        req.rootUser.save()
        res.status(201).json(req.rootUser.tokens)
        console.log("User successfully loged out")

    } catch (error) {
        console.log(error)
    }
})

router.delete("/removeCart/:id",authenticate,async(req,res)=>{
    try {
        const {id}=req.params
        req.rootUser.carts = req.rootUser.carts.filter((remVal)=>{
            return remVal._id!=id;
        })
        req.rootUser.save(()=>{
        console.log("Item is removed")
        })
        res.status(200).json(req.rootUser)
    } catch (error) {
        console.log("error"+error)
        res.status(400).json(req.rootUser)
    }
})

module.exports = router;