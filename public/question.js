window.onload =  () => {
    // Get question by ID
    const url = window.location.href;
    const idString = url.substr(url.indexOf("=")+1);
    
        
   fetchQuestion(idString).then((question=>{

       document.querySelector('.questions').innerText = question.data.content;
       document.querySelector('.vote').innerText = question.data.dislike + question.data.like +" votes";
       if (question.data.like === question.data.dislike) {
        document.querySelector('.dislike').innerText = '50% dislike';
        document.querySelector('.like').innerText = '50% like';
       } else {
        document.querySelector('.dislike').innerText = ((question.data.dislike / (question.data.dislike + question.data.like))*100).toFixed(2) + "% dislike"; 
        document.querySelector('.like').innerText = ((question.data.like / (question.data.dislike + question.data.like))*100).toFixed(2) + "% like";
       }
       
   }));

   document.querySelector('.js-otherQuestion').addEventListener("click",()=>{
        fetchQuestionsRandom()
        .then(question=>{
            document.querySelector('.questions').innerText = question.data.content;
            document.querySelector('.vote').innerText = question.data.dislike + question.data.like +" votes";
            document.querySelector('.dislike').innerText = ((question.data.dislike / (question.data.dislike + question.data.like))*100).toFixed(2) + "% dislike"; 
            document.querySelector('.like').innerText = ((question.data.like / (question.data.dislike + question.data.like))*100).toFixed(2) + "% like";
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
