
// const accessToken = "10223060321154850";
// const baseURL = "https://superheroapi.com/api/" + accessToken;

// const accessKey = "5077735c4722932221088862655a3ff2";
// const baseURL = "https://api-v3.igdb.com/";

const apiKey = "fncFhSohvcNaQNYUoV6JlFxnDjoap7uq";
const baseURL = "https://wallhaven.cc/api/v1/w/";
const apiURL = "?apikey=" + apiKey;


const errorHeader = document.getElementById("h2Error");
const resultsHeader = document.getElementById("h2Results");
const h3SearchedOn = document.getElementById("h3SearchedOn");

const colorTextBox = document.getElementById("txtColor");

const btnSearch = document.getElementById("btnSearch");

const searchForm = document.getElementById("frmSearch");

// searchForm.addEventListener('submit', getResults); 


let reqHeader = new Headers();

// reqHeader.append('Content-Type', 'text/json'); //,'no-cors'
// reqHeader.append('Access-Control-Allow-Origin'); //,'no-cors'
reqHeader.append("Access-Control-Allow-Origin", "*");


let initObject = {
    method: 'GET', headers: reqHeader,
};

// initObject = {headers: {'Access-Control-Allow-Origin': '*'}};

const proxyurl = "https://cors-anywhere.herokuapp.com/";

// let URL = baseURL + "xlq353" + apiURL;
//let URL = baseURL + "39myl3" + apiURL;
let URL = proxyurl + baseURL + "39myl3" + apiURL;

console.log(reqHeader);
console.log(initObject);
console.log(URL);

let myRequest = new Request(URL, {
	method: 'GET', 
  mode: 'cors', 
	//mode: 'no-cors', 
	redirect: 'follow',
	headers: new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
	})
});

console.log(myRequest);

let requestPTag = document.createElement("p");
// for (item in request){
//   requestPTag.innerHTML = item.Headers;
// };
for (let pair of reqHeader.entries()) {
  console.log(pair[0]+ ': '+ pair[1]);
  requestPTag.innerHTML = pair[0]+ ': '+ pair[1];
}

searchForm.appendChild(requestPTag);


      //fetch(URL, initObject)
      // fetch(URL, {
      //   mode: 'cors',
      //   headers: {
      //     'Access-Control-Allow-Origin':'*'
      //   }
      // })
      //fetch(request)
      fetch(URL)
      .then(result => {
          console.log(result);
          return result.json();
      })
      .then(data => {
          console.log(data);
          // displayResults(data);
      })
      .catch(err => {
          console.log(err)
          errorHeader.innerText = err;
          errorHeader.style.display = 'flex';
      });






