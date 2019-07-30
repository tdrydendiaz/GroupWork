const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Item = require("../models/item");
const itemValidation = require("../validation/item");
const bcrypt = require("bcryptjs");


// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
        message: "User"
    });
});

//@route GET item/all
//@desc Get all items
//@access Public
router.get("/all", (req, res) => {
    const errors = {};
    Item.find({}, '-email')
        .then(items => {
            if (!items) {
                errors.noItems = "There are no items";
                res.status((404).json(errors))
            }
            res.json(items);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   GET item/username
// @desc    Get all items from one username
// @access  Public
router.get("/username", (req, res) => {
    const errors = {};
    Item.find({ username: req.body.username })
        .then(items => {
            if (!items) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.json(items);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   DELETE item/deleteItem
// @desc    Delete first Item
// @access  Public
router.delete("/deleteItem", (req, res) => {
    let errors = {};
    const email = req.body.email;
    const id = req.body._id;
    Item.findById(id).then(item => {
        bcrypt.compare(email, item.email).then(isMatch => {
            if (isMatch) {
                item
                    .remove().then(() => {
                        res.json({ success: true });
                    })
                    .catch(err =>
                        res.status(404).json({ itemnotfound: "No item found" })
                    );

            } else {
                errors.email = "Email Incorrect";
                return res.status(400).json(errors);
            }
        });
    }).catch(err => res.status(404).json({ noItem: "There is no item with this ID" }));
});

// @route   POST item/createItem
// @desc    Add user
// @access  Public
router.post("/createItem", (req, res) => {
    const { errors, isValid } = itemValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    const newItem = new Item({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newItem.email, salt, (err, hash) => {
            if (err) throw err;
            newItem.email = hash;
            newItem.save().then(item => res.json(item))
                .catch(err => console.log(err));
        });
    });
});

// @route   PUT item/updateItem
// @desc    Update items from one username
// @access  Public
router.put("/updateItem", (req, res) => {
    const { errors, isValid } = itemValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let errorlog = {};
    const newItem = new Item({
        email: req.body.email,
        username: req.body.username,
        content: req.body.content
    })
    const id = req.body._id;
    Item.findById(id).then(item => {
        bcrypt.compare(email, item.email).then(isMatch => {
            if (isMatch) {
                Item.replaceOne({ '_id': id },
                    { 'username': req.body.username, 'content': req.body.content, 'email': item.email })
                    .then(({ ok, n }) => {
                        res.json({ noItems: "updated :)" });
                    })
                    .catch(err => res.status(404).json(err));
            } else {
                errorlog.email = "Email Incorrect";
                return res.status(400).json(errorlog);
            }
        });
    }).catch(err => res.status(404).json({ noItem: "There is no item with this ID" }));
});

module.exports = router;