window.onload =  () => {
    // Get question by ID
    const url = window.location.href;

    const equalPosition = url.indexOf("=");

    if(equalPosition !== -1) {
        idString = url.substr(equalPosition + 1);
        fetchQuestion(idString).then((question=>{

            const like = Number(question.data.like);
            const dislike = Number(question.data.dislike);

            document.querySelector('.questions').innerText = question.data.content;
            document.querySelector('.vote').innerText = dislike + like +" votes";
            if (like === 0 &&  dislike === 0) {
             document.querySelector('.dislike').innerText = '50% dislike';
             document.querySelector('.like').innerText = '50% like';
            } else {
             document.querySelector('.dislike').innerText = ((dislike / (dislike + like))*100).toFixed(2) + " % dislike"; 
             document.querySelector('.like').innerText = ((like / (dislike + like))*100).toFixed(2) + " % like";
            }
            
        }));
    } else {
        fetchQuestionsRandom()
        .then(question=>{

            const like = Number(question.data.like);
            const dislike = Number(question.data.dislike);

            document.querySelector('.questions').innerText = question.data.content;
            document.querySelector('.vote').innerText = dislike + like +" votes";
            if (like === 0 &&  dislike === 0) {
                document.querySelector('.dislike').innerText = '50% dislike';
                document.querySelector('.like').innerText = '50% like';
               } else {
                document.querySelector('.dislike').innerText = ((dislike / (dislike + like))*100).toFixed(2) + " % dislike"; 
                document.querySelector('.like').innerText = ((like / (dislike + like))*100).toFixed(2) + " % like";
                console.log(Math.floor(dislike*1.2 / (dislike + like)));
                document.querySelector('.dislike').classList.add("col-"+ Math.floor(dislike*12 / (dislike + like)))
            }
        })
    }
    
         
   document.querySelector('.js-otherQuestion').addEventListener("click",()=>{
        fetchQuestionsRandom()
        .then(question=>{

            
            const like = Number(question.data.like);
            const dislike = Number(question.data.dislike);
            
            document.querySelector('.questions').innerText = question.data.content;
            document.querySelector('.vote').innerText = dislike + like +" votes";
            if (like === 0 &&  dislike === 0) {
                document.querySelector('.dislike').innerText = '50% dislike';
                document.querySelector('.like').innerText = '50% like';
               } else {
                 
                document.querySelector('.dislike').innerText = ((dislike / (dislike + like))*100).toFixed(2) + " % dislike"; 
                document.querySelector('.like').innerText = ((like / (dislike + like))*100).toFixed(2) + " % like";
                document.querySelector('.dislike').classList.add("col-"+ Math.floor(dislike*12 / (dislike + like)))
            }
        })
   });

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

function fetchQuestionsRandom() {
    return fetch(`/get-any-question`).then(function(response) {
        return response.json();
    }).then(function(result) {
        return result;
    });
}


function fetchQuestion(id) {
    return fetch(`get-question-by-id?id=${id}`).then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}
