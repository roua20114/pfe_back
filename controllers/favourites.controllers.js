const Cart = require("../models/favourites.models")

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
   

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const offer = cartItem.offer;
        const item = cart.cartItems.find((c) => c.offer == offer);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "cartItems.offer": offer };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
        
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

 


exports.getCartItems = (req, res) => {
  
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.offer", "_id title logo")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.offer._id.toString()] = {
            _id: item.offer._id.toString(),
            title: item.offer.title,
            img: item.offer.logo[0].img,
           
          };
        });
        res.status(200).json({ cartItems });
      }
    });

};


exports.removeCartItems = (req, res) => {
  const { offerId } = req.body.payload;
  if (offerId ) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            offer: offerId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};