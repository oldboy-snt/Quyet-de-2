window.onload = () => {
    
    fetchQuestions();      

    document.querySelector('#js-home').addEventListener("click",() => {
        window.location.href = `/home`;
    });
    document.querySelector('#js-ask').addEventListener("click",() => {
        window.location.href = `/ask`;
    });
    document.querySelector('#js-question').addEventListener("click",() => {
        window.location.href = `/question`;
    });
    document.querySelector('#js-search').addEventListener("click",() => {
        window.location.href = `/search`;
    });
    
}

function fetchQuestion() {
    return fetch(`/get-any-question`).then(function(response) {
        return response.json();
    }).then(function(result) {
        return result;
    });
}

function fetchQuestions(){
    fetchQuestion()
    .then(data=>{
        document.querySelector('.question-random').innerText = data.data.content;
        
        document.querySelector('.yes').addEventListener("click",()=>{
            data.data.like ++;
            fetch(`/update-vote`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    questionContent : data,
                })
            })
        })

        document.querySelector('.no').addEventListener("click",()=>{
            data.data.dislike++;
            fetch(`/update-vote`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    questionContent : data,
                })
            })
        })  
        document.querySelector('.other-question').addEventListener("click",()=>{
            window.location.reload();
            //fetchQuestions();
        });
        document.querySelector('.result').addEventListener("click",()=>{
            window.location.href = `/question?id=${data.data.id}`;
        })
    });
}