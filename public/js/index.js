function getTestCases(){
    fetch('/blog-posts/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'get',
    })
    .then( response => {
        if ( response.ok ){
            return response.json();
        }
        throw new Error ( response.statusText );
    })
    .then( responseJSON => {
        console.log(responseJSON)
    })
    .catch( err => {
        console.log( err );
    });
    
}
function postTestCase(){

}
function putTestCase(){

}
function deleteTestCase(){

}

getTestCases()