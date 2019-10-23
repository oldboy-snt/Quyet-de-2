const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionsModel = require('./model');


mongoose.connect('mongodb://localhost:27017/quyet-de-web29', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);

    } else {

        console.log('Connected to mongodb successfully');
        
        app.use(bodyParser.json());
        app.use(express.static('public'));

        // parse application/x-www-form-urlencoded 
        app.use(bodyParser.urlencoded({ extended: false }));

        app.get("/ask", (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/ask.html'));
        });

        app.get('/question', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/question.html'));
        });

        app.get('/home', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/home.html'));
        });

        app.get('/search', (req, res)=>{
            res.sendFile(path.resolve(__dirname, './public/search.html'));
        });

        app.put('/update-vote', (req, res) => {

            questionsModel.findOneAndUpdate({_id:req.body.questionContent.data.id}, req.body.questionContent.data, function (err, data) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                } else {
                    res.status(201).json({
                        success : true,
                        message : "Update successfully."
                    })
                }
            })
        });

        app.post('/get-questions', (req, res) => {
            const searchingPhrase = req.body.searchingPhrase;

            questionsModel.find({},'content',function(err, data) {
                if(err) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                } else {
                    const questions = data.filter(item=>{
                        return item.content.indexOf(searchingPhrase) !== -1;
                    })
                    
                    res.status(201).json({
                        success : true,
                        data : questions
                    })
                }
            });
        })

        app.post('/create-question', (req, res) => {
            const newQuestion = {
                content : req.body.questionContent
            };
            questionsModel.create(newQuestion, (err, data)=>{
                if(err) {
                    res.status(500).json({
                        success :  false,
                        message :  err.message

                    })
                    
                } else {
                    res.status(201).json({
                        success : true,
                        data : {
                            id : data._id,
                            content : data.content,
                            like : data.like,
                            dislike : data.dislike
                        }
                    })
                }
            })
        });

        app.get('/get-question-by-id', (req, res) => {
            // get question
            const id = req.query.id;
            questionsModel.findById(id).exec( function(err, data) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                } else {
                    res.status(201).json({
                        success : true,
                        data : {
                            id : data._id,
                            content : data.content,
                            like : data.like,
                            dislike : data.dislike
                        }
                    })
                }
            })
        })

        app.get('/get-any-question', (req, res) => {

            questionsModel.countDocuments().exec(function(err, count) {

                const random = Math.floor(Math.random() * count)
                
                questionsModel.findOne().skip(random).exec( function (err, data){
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    } else {
                        res.json({
                            success: true,
                            data: {
                                id : data._id,
                                content : data.content,
                                like : data.like,
                                dislike : data.dislike
                            }
                        });
                    }
                })

            })
        });

        app.listen(3000);
    }
})

