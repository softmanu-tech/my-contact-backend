const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts =  asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
})

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

//@desc POST all contacts
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
    console.log("This is the request body:",req.body);

    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please provide all the fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })


    res.status(201).json(contact);
})
//@desc PUT all contacts
//@route PUT /api/contacts
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        
    )
    res.status(200).json(updatedContact);
})

//@desc DELETE all contacts
//@route DELETE /api/contacts
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.status(200).json({message: `Delete Contact ${req.params.id}`});
})

module.exports = {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact
}