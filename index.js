
const apiKey = "fncFhSohvcNaQNYUoV6JlFxnDjoap7uq";
const imageURL = "https://wallhaven.cc/api/v1/w/";
const tagURL = "https://wallhaven.cc/api/v1/tag/";
const searchURL = "https://wallhaven.cc/api/v1/search"
const apiURL = "?apikey=" + apiKey;

// https://cors-anywhere.herokuapp.com
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
const proxyurl = "https://cors-anywhere.herokuapp.com/";


const txtSearch = document.getElementById("txtSearch");
const txtExcludeSearch = document.getElementById("txtExcludeSearch");
const ddSortBy = document.getElementById("ddSortBy");
const rdoSort = document.querySelectorAll("input[name=\"rdoSort\"]");

const btnSearch = document.getElementById("btnSearch");
const searchForm = document.getElementById("frmSearch");
searchForm.addEventListener('submit', getResults); 

const wallpaperDetailsModal = document.getElementById("wallpaperDetailsModal");
const wallpaperModalTitle = document.getElementById("wallpaperModalTitle");
const wallpaperDetailsImage = document.getElementById("wallpaperDetailsImage");
const wallpaperDetailsImageLink = document.getElementById("wallpaperDetailsImageLink");
const wallpaperDetailsTags = document.getElementById("wallpaperDetailsTags");
const wallpaperDetailsColors = document.getElementById("wallpaperDetailsColors");
const wallpaperDetailsDate = document.getElementById("wallpaperDetailsDate");

const errorHeader = document.getElementById("h2Error");
// const resultsHeader = document.getElementById("h2Results");

const resultsDiv = document.getElementById("resultsDiv");
// const moreDiv = document.getElementById("moreDiv");

// moreDiv.style.display = "none";
resultsDiv.style.display = "none";
// resultsHeader.style.display = "none";
errorHeader.style.display = "none";

// const moreLink = document.getElementById("moreLink");
// moreLink.addEventListener('click', getMoreResults); 
// moreLink.style.display = "none";

const headerDiv = document.getElementById("header");


let URL = "";
let searchString = "";

// Individual Image Information
// let URL = imageURL + "xlq353" + apiURL; // NSFW
// let URL = imageURL + "39myl3" + apiURL; // SFW
// URL = imageURL + "39myl3" + apiURL; // SFW
// URL = imageURL + "xlq353" + apiURL; // NSFW

// Tag Information
//URL = tagURL + "/1" + apiURL;

// Search
// URL = searchURL + apiURL;

// Search Query
// tagname - search fuzzily for a tag/keyword
// -tagname - exclude a tag/keyword
// +tag1 +tag2 - must have tag1 and tag2
// +tag1 -tag2 - must have tag1 and NOT tag2
// @username - user uploads
// id:123 - Exact tag search (can not be combined)
// type:{png/jpg} - Search for file type (jpg = jpeg)
// like:wallpaper ID - Find wallpapers with similar tags
// URL = searchURL + apiURL + "q=";

// Search Categories
// URL = searchURL + apiURL + "&categories=101";

// Search Purity - SFW, sketchy, NSFW 100/110/111/etc (sfw/sketchy/nsfw)
// URL = searchURL + apiURL + "&purity=100"; // SFW // Default
// URL = searchURL + apiURL + "&purity=110"; // sketchy
// URL = searchURL + apiURL + "&purity=111"; // NSFW

// Search topRange -- Sorting MUST be set to 'toplist'
// 1d, 3d, 1w, 1M* , 3M, 6M, 1y
// URL = searchURL + apiURL + "&topRange=1d"; // "&sorting=toplist"

// Search atleast -- Minimum resolution allowed
// URL = searchURL + apiURL + "&atleast=1920x1080";

// Search resolutions -- List of exact wallpaper resolutions, Single resolution allowed
// URL = searchURL + apiURL + "&resolutions=1920x1080,1920x1200";

// Search ratios List of aspect ratios, Single ratio allowed
// URL = searchURL + apiURL + "&ratios=16x9,16x10";

// Search Colors
// URL = searchURL + apiURL + "&colors=0099cc";
// URL = searchURL + apiURL + "&colors=226666"; // Not in the system
// URL = searchURL + apiURL + "&colors=ea4c88,ffcc33,cc0000,999999"

// Search Sorting
// URL = URL + "&sorting=date_added"; // Default
// URL = URL + "&sorting=relevance";
// URL = URL + "&sorting=random";
// URL = URL + "&sorting=views";
// URL = URL + "&sorting=favorites";
// URL = URL + "&sorting=toplist";

// Search Sorting Order
// URL = URL + "&order=desc"; // Default
// URL = URL + "&order=asc";


// Search Pagination
//URL = URL + "&page=3";


// Search seed -- [a-zA-Z0-9]{6} -- Optional seed for random results
// URL = URL + "&seed=abcdef";

// console.log(URL);

// ####################################
// BEGIN Code For Testing
// txtSearch.value = "space art";
// txtSearch.value = "minimalism";
// txtSearch.value = "Cthulhu";
// txtSearch.value = "Rogue";
// txtSearch.value = "Star Wars";
// txtSearch.value = "LEGO";
// txtSearch.value = "Moon";
// txtSearch.value = "architecture";
txtSearch.value = "Asian architecture";
// txtExcludeSearch.value = "anime";
txtExcludeSearch.value = "Azur Lane";
// ddSortBy[2].selected = true;
// END Code For Testing
// ####################################

let currentPage = 0;
let lastPage = 0;

// setRandomHeaderImage();

// Get the results after the search
function getResults(e){
  e.preventDefault();

  while (resultsDiv.firstChild) { // while the value is not null
    resultsDiv.removeChild(resultsDiv.firstChild);
  };

  // resultsHeader.style.display = "none";
  resultsDiv.style.display = "none";
  errorHeader.style.display = "none";
  // moreDiv.style.display = "none";
  // moreLink.style.display = "none";

  currentPage = 0;
  lastPage = 0;

  URL = searchURL + apiURL;
  searchString = "";

  // URL += "&q=" + txtSearch.value.replace(' ', '+');
  if (txtSearch.value.length > 0) {
    // Is this the correct API syntax?: CORRECT
    searchString += "&q=" + txtSearch.value.replace(' ', '%20+');
    // Or is this the correct API syntax?: INCORRECT
    // searchString += "&q=" + txtSearch.value.replace(' ', '%20');
    // URL += "&q=" + txtSearch.value.replace(' ', '%20+');
  };
  if (txtExcludeSearch.value.length > 0) {
    //if (txtSearch.value.length <= 0) {
    if (searchString.length <= 0) {
      searchString += "&q=-";
      // URL += "&q=-";
    } else {
      searchString += "%20-";
      // URL += "%20-";
    }

    // Is this the correct API syntax?: CORRECT
    searchString += txtExcludeSearch.value.replace(' ', '%20-');
    // Or is this the correct API syntax?: INCORRECT
    // searchString += txtExcludeSearch.value.replace(' ', '%20');
    // URL += txtExcludeSearch.value.replace(' ', '%20-');
  };

  // Search Purity - SFW, sketchy, NSFW 100/110/111/etc (sfw/sketchy/nsfw)
  // searchString += "&purity=111"; // NSFW

  URL += searchString.replace(',', '');
  URL += "&sorting=" + ddSortBy.value;

  for (rdo of rdoSort){
    if (rdo.checked) {
      URL += "&order=" + rdo.value;
    };
  };



  // console.log(URL);

  // console.log("https://wallhaven.cc/search?" + searchString);

  fetch(proxyurl + URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);
      displayResults(jsonData);
  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });

};



function displayResults(jsonData){
  console.log(jsonData);

  let results = jsonData.data;
  console.log(results);

  if (results.length > 0) {
    // resultsHeader.style.display = 'flex';
    resultsDiv.style.display = 'flex';
    // moreDiv.style.display = 'flex';
    // moreLink.style.display = 'flex';

    currentPage++;
    lastPage = jsonData.meta.last_page;
    // console.log("current", currentPage, "last", lastPage);

    if (currentPage > 1) {
      let moreRowDiv = document.getElementById("moreRowDiv");
      moreRowDiv.parentNode.removeChild(moreRowDiv);
    };

    let resultsContainerDiv = document.createElement("div");
    resultsContainerDiv.className = "container";

    let resultsRowDiv = document.createElement("div");
    resultsRowDiv.className = "row";


    for (let i = 0; i < results.length; i++) {
          // console.log(results[i]);

          let createDate = new Date(results[i].created_at);

          let wallpaperDiv = document.createElement("div");
          wallpaperDiv.className = "wallpaperDiv";

          let wallpaperP = document.createElement("p");
          //wallpaperP.innerHTML += "<strong>" + results[i].category + "</strong>";
          // From https://stackoverflow.com/questions/2332811/capitalize-words-in-string
          wallpaperP.innerHTML += "<strong>" + results[i].category.replace(/\b\w/g, l => l.toUpperCase()) + "</strong>";
          wallpaperP.innerHTML += " " + results[i].purity;
          wallpaperP.innerHTML += " (" + results[i].resolution + ")";
          // wallpaperP.innerHTML += " " + createDate.toDateString();

          let wallpaperP2 = document.createElement("p");
          // wallpaperP2.innerHTML += " (" + results[i].resolution + ")";
          wallpaperP2.innerHTML += "    " + createDate.toDateString();
          // let wallpaperSpan1 = document.createElement("span");
          // wallpaperSpan1.innerHTML += " (" + results[i].resolution + ")";
          // wallpaperSpan1.style = "text-align: left;";
          // let wallpaperSpan2 = document.createElement("span");
          // wallpaperSpan2.innerHTML += createDate.toDateString();
          // wallpaperSpan2.style = "text-align: right;";

          let wallpaperImg = document.createElement("img");
          wallpaperImg.src = results[i].thumbs.small;
          wallpaperImg.alt = results[i].id;

          let wallpaperA = document.createElement("a");
          // wallpaperA.href = results[i].short_url; // page about the image
          wallpaperA.href = "#";
          // wallpaperA.href = results[i].path; // image only
          // wallpaperA.target = "_blank";
          wallpaperA.addEventListener('click', loadWallpaperDetailsModal);


          wallpaperDiv.appendChild(wallpaperP);

          wallpaperA.appendChild(wallpaperImg);
          wallpaperDiv.appendChild(wallpaperA);

          wallpaperDiv.appendChild(wallpaperP2);
          // wallpaperDiv.appendChild(wallpaperSpan1);
          // wallpaperDiv.appendChild(wallpaperSpan2);

          // resultsDiv.appendChild(wallpaperDiv);
          resultsRowDiv.appendChild(wallpaperDiv);

    };

    let moreA = document.createElement("a");
    moreA.href = "#";
    moreA.innerText =  "more " + txtSearch.value + " wallpapers";
    moreA.className = "colorBlackLink";
    // moreA.style = "text-align: right;";
    moreA.addEventListener('click', getMoreResults); 


    let moreRowDiv = document.createElement("div");
    moreRowDiv.className = "row justify-content-end p-4"; // "row clearfix";
    moreRowDiv.id = "moreRowDiv";

    // let moreColOneDiv = document.createElement("div");
    // moreColOneDiv.className = "col-md-11";

    let moreColTwoDiv = document.createElement("div");
    // moreColTwoDiv.className = "col-md-4";
    moreColTwoDiv.className = "col text-right";

    moreColTwoDiv.appendChild(moreA);

    // moreRowDiv.appendChild(moreColOneDiv);
    moreRowDiv.appendChild(moreColTwoDiv);
    //resultsDiv.appendChild(moreRowDiv);

    resultsContainerDiv.appendChild(resultsRowDiv);
    resultsContainerDiv.appendChild(moreRowDiv);

    if (currentPage >= lastPage) {
      resultsContainerDiv.removeChild(moreRowDiv)
    };

    resultsDiv.appendChild(resultsContainerDiv);

  };

};

function loadWallpaperDetailsModal(e){
  e.preventDefault();

  // console.log(e);
  let wallpaperID = e.srcElement.alt;
  // console.log("wallpaperID", wallpaperID);

  // wallpaperModalTitle.innerHTML = wallpaperID;

  // console.log (imageURL + wallpaperID + apiURL);

  fetch(proxyurl + imageURL + wallpaperID + apiURL)
  .then(result => {
      //console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);
      displayWallpaperDetailsModal(jsonData);
  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });

};


function displayWallpaperDetailsModal(jsonData){
  // console.log(jsonData);

  let results = jsonData.data;
  console.log(results);

  wallpaperModalTitle.innerHTML = "";
  wallpaperDetailsTags.innerHTML = "";
  wallpaperDetailsColors.innerHTML = "";

  // wallpaperModalTitle.innerHTML += results.id + " ";
  wallpaperModalTitle.innerHTML += "<strong>" + results.category.replace(/\b\w/g, l => l.toUpperCase()) + "</strong>";
  // wallpaperModalTitle.innerHTML += " " + results.purity;
  wallpaperModalTitle.innerHTML += " (" + results.resolution + ")";

  let createDate = new Date(results.created_at);
  wallpaperDetailsDate.innerHTML = createDate.toDateString();

  // wallpaperDetailsImage.src = results.thumbs.small;
  // wallpaperDetailsImage.src = results.thumbs.original;
  wallpaperDetailsImage.src = results.thumbs.large;

  wallpaperDetailsImageLink.href = results.url; // page about the image
  // wallpaperDetailsImageLink.href = results.path; // image only
  wallpaperDetailsImageLink.target = "_blank";

  let wallpaperTags = results.tags;
  for (let i = 0; i < wallpaperTags.length; i++) {
    // wallpaperDetailsTags.innerHTML += wallpaperTags[i].id + wallpaperTags[i].name + " ";
    let wallpaperDetailsTagLink = document.createElement("a");
    wallpaperDetailsTagLink.href = "#" + wallpaperTags[i].id;
    wallpaperDetailsTagLink.innerHTML += wallpaperTags[i].name;
    if (i < wallpaperTags.length - 1) {
      wallpaperDetailsTagLink.innerHTML += ",";
    };
    wallpaperDetailsTagLink.className = "mr-2";
    wallpaperDetailsTagLink.addEventListener('click', searchByTag);
    wallpaperDetailsTags.appendChild(wallpaperDetailsTagLink);
  };


  let wallpaperColors = results.colors;
  for (let i = 0; i < wallpaperColors.length; i++) {
    // wallpaperDetailsColors.innerHTML += wallpaperColors[i] + " ";
    let wallpaperDetailsColorSpan = document.createElement("span");
    wallpaperDetailsColorSpan.style.backgroundColor = wallpaperColors[i];
    // wallpaperDetailsColorSpan.className = "m-2 p-2";
    wallpaperDetailsColorSpan.innerHTML = wallpaperColors[i];
    if (wallpaperColors[i] == "#ffffff" || wallpaperColors[i] == "#ffff00") {
      wallpaperDetailsColorSpan.className = "colorBlackText m-2 p-2";
    } else {
      wallpaperDetailsColorSpan.className = "colorWhiteText m-2 p-2";
    };
    wallpaperDetailsColors.appendChild(wallpaperDetailsColorSpan);


    // Using the colors paramater doesn't work here
    // let wallpaperDetailColorLink = document.createElement("a");
    // wallpaperDetailColorLink.href = "#";
    // wallpaperDetailColorLink.innerHTML = wallpaperColors[i];

    // if (wallpaperColors[i] == "#ffffff") {
    //   wallpaperDetailColorLink.className = "colorBlackLink";
    // } else {
    //   wallpaperDetailColorLink.className = "colorWhiteLink";
    // };

    // wallpaperDetailColorLink.addEventListener('click', searchByColor);
    // wallpaperDetailsColorSpan.appendChild(wallpaperDetailColorLink);
  };



  $('#wallpaperDetailsModal').modal("show")

};

function searchByTag(e){
  // e.preventDefault();
  // console.log(e);

  txtSearch.value = e.srcElement.text.replace(',', '');

  $('#wallpaperDetailsModal').modal("hide")

  getResults(e);

  // Using the tag id doesn't work here
  // console.log(e.srcElement.hash);

  // //
  // // Duplicates code that's in function getResults(e)
  // //
  // while (resultsDiv.firstChild) { // while the value is not null
  //   resultsDiv.removeChild(resultsDiv.firstChild);
  // };

  // // resultsHeader.style.display = "none";
  // resultsDiv.style.display = "none";
  // errorHeader.style.display = "none";
  // // moreDiv.style.display = "none";
  // // moreLink.style.display = "none";

  // currentPage = 0;
  // lastPage = 0;

  // URL = searchURL + apiURL;
  // searchString = "";


  // searchString += "&id:=" + e.srcElement.hash.replace('#', '');


  // URL += searchString;
  // URL += "&sorting=" + ddSortBy.value;

  // for (rdo of rdoSort){
  //   if (rdo.checked) {
  //     URL += "&order=" + rdo.value;
  //   };
  // };


  // console.log(URL);

  // fetch(proxyurl + URL)
  // .then(result => {
  //     // console.log(result);
  //     return result.json();
  // })
  // .then(jsonData => {
  //     // console.log(jsonData);
  //     displayResults(jsonData);
  // })
  // .catch(err => {
  //     console.log(err)
  //     errorHeader.innerText = err;
  //     errorHeader.style.display = 'flex';
  // });


}


function searchByColor(e){
  // e.preventDefault();
  // console.log(e);

   // Using the colors paramater doesn't work here

  // Searches color using the tag name not the color api
  //txtSearch.value = e.srcElement.text;
  txtSearch.value = "";

  $('#wallpaperDetailsModal').modal("hide")

  //
  // Duplicates code that's in function getResults(e)
  //
  while (resultsDiv.firstChild) { // while the value is not null
    resultsDiv.removeChild(resultsDiv.firstChild);
  };

  // resultsHeader.style.display = "none";
  resultsDiv.style.display = "none";
  errorHeader.style.display = "none";
  // moreDiv.style.display = "none";
  // moreLink.style.display = "none";

  currentPage = 0;
  lastPage = 0;

  URL = searchURL + apiURL;
  searchString = "";


  searchString += "&colors=" + e.srcElement.text.replace('#', '');


  URL += searchString;
  URL += "&sorting=" + ddSortBy.value;

  for (rdo of rdoSort){
    if (rdo.checked) {
      URL += "&order=" + rdo.value;
    };
  };


  // console.log(URL);

  // console.log("https://wallhaven.cc/search?" + searchString.replace('#', ''));

  fetch(proxyurl + URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);
      displayResults(jsonData);
  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });

}

function getMoreResults(e){
  e.preventDefault();

  nextPage = currentPage + 1;
  // Search Pagination
  URL = URL + "&page=" + nextPage;

  fetch(proxyurl + URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(jsonData);
      displayResults(jsonData);
  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });
};





// Changes the header background image to a random image
function setRandomHeaderImage(){

  URL = URL + "&purity=100&sorting=random";
  // console.log(URL);

  fetch(proxyurl + URL)
  .then(result => {
      // console.log(result);
      return result.json();
  })
  .then(jsonData => {
      // console.log(data);
      // displayResults(jsonData);

      // console.log(jsonData.data[0].path);

      // headerDiv.style.backgroundImage = "url(" + jsonData.data[0].path + ") no-repeat center";
      headerDiv.style.backgroundImage = "url(" + jsonData.data[0].path + ")";
      // console.log(headerDiv.style.backgroundImage);
      // headerDiv.style.background.URL = jsonData.data[0].path;
      // console.log(headerDiv.style.background.URL);

      // landing-section.style.background: url("../assets/graham-holtshausen-fUnfEz3VLv4-unsplash.jpg") no-repeat center; 

  })
  .catch(err => {
      console.log(err)
      errorHeader.innerText = err;
      errorHeader.style.display = 'flex';
  });

};