/********************************************************************************* 
*  WEB322 – Assignment 1 
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.   
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*  Name: Chakshu Alawadhi Student ID: 150056208 Date: 3 nov 2022
********************************************************************************/ 

const express = require('express')

const app = express()

//set view engine as ejs to use ejs template
app.set('view engine','ejs')

//Require mongoose for mongoddb operations
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://seneca_calawadhi:jasontodd176@cluster0.ckjal8t.mongodb.net/books_db?retryWrites=true&w=majority",
{useNewUrlParser: true, 
    useUnifiedTopology: true},(error)=>{
        if(error){
            console.log("Mongo db not connected due to error below")
            console.log(error)
        }
        else{
            console.log("mongo db connection success!!!")
        }
    })

//Step 1 create a schema

const booksSchema = mongoose.Schema({
    book_name : String ,
    publisher_name : String , 
    genre_type : String ,
    price : Number ,
    publisher_email : String 


})

//step 2 : create model for your collection

const booksModel = mongoose.model("book", booksSchema)

//Step 3 : create your first document using booksModel
/*
booksModel.create({
    book_name : "Sherlock Holmes" ,
    publisher_name : "gotham_works",
    genre_type : "Mystery",
    price : 50 ,
    publisher_email : "jasontodd@mail.com"
},(error,book_create)=>{
    if(error){
        console.log("book document not created due to this error!!!")
        console.log(error)
    }
    else{
        console.log("book created successfully as !!!")
        console.log(book_create)
    }
})
*/

//step 4 : read operation : display all documents from the collection in mongodb

booksModel.find({},(error,all_books)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("*******books documents from books_db collection********")
        console.log(all_books)
        console.log("=======================================================")
    }
})

// find one document using id
booksModel.findById("63648028e280a23395e03a8a",(error, book_found)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("---book found using its id----")
        console.log(book_found)
    }
})

//update document

booksModel.findByIdAndUpdate("63648028e280a23395e03a8a",{
    book_name : "holmes" ,
    publisher_name : "gotham12333",
    genre_type : "action and mystery",
    publisher_email : "jason123@gmail.com",
    price : 60

},(error, book_updated)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("-----book document has been updated----")
        console.log(book_updated)
        console.log("-----------------------------------------")
    }
})

//delete document

booksModel.findByIdAndDelete("63648028e280a23395e03a8a",(error, book_deleted)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("====document deleted successfully===")
        console.log(book_deleted)
        console.log("====================================")
    }
})

app.get("/all",(req,res)=>{

    booksModel.find({},(error,all_books)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log("*******books documents from books_db collection********")
            console.log(all_books)
            console.log("=======================================================")

            res.render("display.ejs",{books:all_books})
        }
    })
})

app.listen(3400,()=>{

    console.log("App is listening at port 3400!!!")
}) 