const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const catchAsync = require("../middlewares/catchAsyncErrors");

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("KEY", process.env.STRIPE_SECRET_KEY);

//process payment apt
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    console.log("REQ BODY", req.body);
    const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        phone_number_collection: {
            enabled: true,
        },
        payment_method_types: ["card"],
        line_items: req.body.cartItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    images: [item.image[0].url]
                    unit_amount: item.price * 100,
                },
                quantity:item.quantity
            }
        }))
    })
})

