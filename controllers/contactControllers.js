const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts =  asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

//@desc Get all contacts
//@route GET /api/contacts
//@access private
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
//@access private
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
        phone,
        user_id: req.user.id
    })


    res.status(201).json(contact);
})
//@desc PUT all contacts
//@route PUT /api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to update this contact");
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
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to delete this contact");
    }


    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json({message: `Delete Contact ${req.params.id}`});
})

module.exports = {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact
}