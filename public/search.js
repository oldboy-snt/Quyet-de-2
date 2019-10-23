window.onload = function() {
    const formSearch = document.querySelector('.search');
    const containerElement = document.querySelector('.container');
    formSearch.addEventListener('submit', function(event) {
        event.preventDefault();
        const value = document.querySelector('.search-input').value.trim();
        
        const questionsElement = document.getElementsByClassName("linkQuestion");
        const resultNoti = document.getElementsByClassName("resultNotification");

        if(questionsElement.length > 0) {
            while(questionsElement.length > 0) {
                containerElement.removeChild(questionsElement[0]);                
            }
        }
        
        if(resultNoti.length) {
            containerElement.removeChild(resultNoti[0]);
        }
         
        fetchQuestions(value)
        .then(data => {
            const result = document.createElement("div");
            result.style.fontSize = "150%";
            result.innerHTML = `Có ${data.data.length} kết quả tìm kiếm`;
            result.style.color = "green";
            result.setAttribute("class", "resultNotification");
            result.style.marginLeft = "15%";
            result.style.marginBottom = "2%";
            containerElement.appendChild(result);

            for(let i = 0; i < data.data.length; i++) {

                const divElement = document.createElement("div");
                const aElement = document.createElement("a");
                divElement.setAttribute("class", "linkQuestion");
               
                divElement.style.marginLeft = '15%';
                aElement.innerHTML = data.data[i].content;
                aElement.style.fontSize = "120%";
                aElement.href = `/question?questionId=${data.data[i]._id}`;
                
                divElement.appendChild(aElement);
                containerElement.appendChild(divElement);
            }
        })
        
    })

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

function fetchQuestions(value) {
    return fetch(`get-questions`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            searchingPhrase : value
        })
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}