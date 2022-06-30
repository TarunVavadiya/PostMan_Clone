
//utility functions:
// 1. utility function to get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// initialize no of parameters
let addedParamsCount = 1;

//hide the parametersBox initially
let parametersbox = document.getElementById('parametersBox')
parametersbox.style.display = 'none';

// if the user clicks on params box option, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// if the user clicks on json box option, hide the param box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})


// if the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 1}</label>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Enter Parameter ${addedParamsCount + 1} Key" id="parameterKey${addedParamsCount + 1}"
                            aria-label="Enter Parameter ${addedParamsCount + 1} Key">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Enter Parameter ${addedParamsCount + 1} value" id="parametervalue${addedParamsCount + 1}"
                            aria-label="Enter Parameter ${addedParamsCount + 1} value">
                    </div>
                    <button class="btn d-grid gap-2 col-2 mx-auto btn-secondary deleteParam">-</button>
                </div>`;
    //convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    //add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamsCount++;
});


// if the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please Wait... Fetching Response.....";
    document.getElementById('responsePrism').innerHTML = "Please Wait... Fetching Response.....";

    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    // if user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamsCount; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined && document.getElementById('parameterValue' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let Value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = Value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonText').value;
    }

    //log all the values in console for debugging
    console.log('url is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is ', data);


    // if the requesttype is post, invoke fetch api to create a post request
    if(requestType=='GET'){
        fetch(url, {
            method: 'GET',
        }).then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
        });
    }else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers:{
            'content-type':'application/json; charset=UTF-8'
            }
        }).then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
        });
    }
})