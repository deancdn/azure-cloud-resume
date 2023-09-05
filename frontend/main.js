window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
})

const functionApiUrl = 'https://getvisitorcounter.azurewebsites.net/api/GetVisitorCounter';
const localFunctionApi = 'http://localhost:7071/api/GetResumeCounter';

const getVisitCount = () => {
    let count = 30;
    console.log("Before fetch request");
    fetch(functionApiUrl)
        .then(response => {
            console.log("After fetch, before JSON parsing");
            return response.json();
        })
        .then(response => {
            console.log("After JSON parsing, before updating count");
            count = response.count;
            document.getElementById("counter").innerText = count;
            console.log("Count updated:", count);
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
    console.log("After fetch request");
    return count;
}
