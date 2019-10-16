window.onload = () => {
    const textareaElement = document.querySelector('.question-input');
    const lengthLeftDiv = document.querySelector('.lengthleft');
    //const btnQuestionSubmit = document.querySelector('.btn-submitQuestion');
    const formElement = document.querySelector('.create-question-form');
    const errorMessageElement = document.querySelector('.error-message');

    textareaElement.addEventListener('input', (event)=>{
        let lengthLeft = 200 - textareaElement.value.length;
        //. innerText .innerHTML
        lengthLeftDiv.innerHTML = `Còn ${lengthLeft}/200 kí tự`;
    });
    formElement.addEventListener('submit', (event)=>{
        event.preventDefault();
        const value = textareaElement.value;
        if(!value) {
            //show errors message
            
            errorMessageElement.innerHTML = `Vui lòng nhập câu hỏi`;
        } else {
            errorMessageElement.innerText = ``;

            // send req to server
            fetch(`/create-question`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    questionContent : value,
                })
            })
                .then((response)=>{
                    return response.json();
                })
                .then(data=>{
                    
                    window.location.href = `/question?questionId=${data.data.id}`;
                })
                .catch((error)=>{
                    console.log(error);
                });
            textareaElement.value = ``;    
        }
    });
}

