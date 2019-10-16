const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(express.static('public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/ask", (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./public/ask.html'));
});

app.get('/question', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/question.html'));
});


app.post('/create-question',(req, res)=> {
    // id 
    // content
    //like
    //dislike

    const newQuestion = {
        id : new Date().getTime(),
        content : req.body.questionContent,
        like : 0,
        dislike : 0,
    };
    
    
    // read data 
    fs.readFile('./data.json' ,(err, data)=> {
        if  (err) {
            res.status(200).json({
                success : false,
                message : err.message
            });
        } else {
        const questionArray = JSON.parse(data);
        questionArray.push(newQuestion);
        // write new data 
        fs.writeFile('data.json',JSON.stringify(questionArray), (err)=>{
            if (err) {
                res.status(500).json({
                    success : false,
                    message : err.message
                });
            } else {
                res.json({
                    success : true,
                    data : newQuestion
                });
            }
            });
        }
    })
    // push new question
     
});

app.get('/get-question-by-id', (req, res)=>{
    // get question
    const id = req.query.id;
    fs.readFile('./data.json',"utf-8", (err, data)=>{
        if (err) {
            res.status(200).json({
                success : false,
                message : err.message
            });
        } else {
            const questionArray = JSON.parse(data);            
            const question = questionArray.find((questionElement)=>{
                return questionElement.id === Number(id);
            });
            
            res.json({
                success : true,
                data : question
            });
        }
    })
})

app.listen(3000);