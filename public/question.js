window.onload =  () => {
    // Get question by ID
    const url = window.location.href;
    const idString = url.substr(url.indexOf("=")+1);
    
    fetch(`get-question-by-id?id=${idString}`)
        .then((response)=>{
            response.json();
        })
        .then(question=>{
            console.log(question);
            
        })
        .catch((err)=>{
            console.log(err);
        });
}