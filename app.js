var prevClickedId = "08";
const loadNewsCategory=()=>{
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url).then(response=>response.json()).then(data =>displayNewsCategory(data.data));
}

const displayNewsCategory = data =>{
    const newsCategoryField = document.getElementById("news_category_field");
    for(let i=0;i<data.news_category.length;i++){
        // console.log(data.news_category[i].category_name);
        const newCategory = document.createElement('div');
        {
            newCategory.innerHTML=`
        <button id="${data.news_category[i].category_id}"class="btn btn-secondary">${data.news_category[i].category_name}</button>
        `
        }
        
        newsCategoryField.appendChild(newCategory)
    }
}

document.getElementById("news_category_field").addEventListener("click", function(event) {
    var clickedElement = event.target;
    var clickedElementId = clickedElement.getAttribute("id");
    // console.log("Clicked element ID: " + clickedElementId);
    if(clickedElementId==="news_category_field") return;
    const prevClickedIdField = document.getElementById(prevClickedId);
    prevClickedIdField.classList.remove("bg-info");
    const markClicked = document.getElementById(clickedElementId);
    markClicked.classList.add("bg-info");
    prevClickedId = clickedElementId;
    loadClickedNews(clickedElementId,event.target.innerText);
    // markClicked.classList.remove("bg-info");
    // console.log(clickedElementId,event.target.innerText);
});



const loadClickedNews=(id,category_name)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url).then(response=>response.json()).then(data =>showClickedNews(data.data,category_name));
    const spinnerField = document.getElementById("spinner-field");
    spinnerField.classList.remove("d-none");
    
    
}
const showClickedNews = (data,category_name) =>{
    
    const newsCategoryFieldMsg = document.getElementById("news_category_field_msg");
    newsCategoryFieldMsg.innerHTML=`
        <p class="bg-white border rounded-2 px-2 py-2">${data.length} items found for category <span class="text-success fs-5">${category_name}</span></p>
        `
    const newsDetailsField = document.getElementById("news_details_field");
    newsDetailsField.innerHTML = ``;
    data.sort((a, b) => {
        if (a.total_view < b.total_view) {
          return 1;
        } else if (a.total_view > b.total_view) {
          return -1;
        } else {
          return 0;
        }
      })
    for(let i=0;i<data.length;i++){
        // console.log(data.news_category[i].category_name);
        const newNews = document.createElement('div');
        newNews.innerHTML=`
        <div class="card shadow m-5" style="max-width: 95%;text-align: justify;">
            <div class="row g-0">
              <div class="col-md-3 col-sm-12">
                <img src="${data[i].thumbnail_url}" class="img-fluid p-3 rounded-start" alt="...">
              </div>
              <div class="col-md-9 col-sm-12 align-items-center text-justify justify-content-center">
                <div class="card-body">
                  <b><h3 class="card-title">${data[i].title}</h3></b>
                  <p class="card-text mt-3 pe-5">${data[i].details.slice(0,500)}...</p>
                  <div class="d-flex mt-5 mb-4 me-5 justify-content-between">
                  <div class="d-flex">
                  <img class="me-2 rounded-circle img-fluid text-small" style="width: 50px; height: 50px;"src="${data[i].author.img}">
                  <div>
                  <h5 class="card-text font-monospace" >${data[i].author.name ? data[i].author.name :"No Data Found"}</h5>
                  <p class="card-text" style=" line-height: 0.8;"><small class="text-muted">${data[i].author.published_date ? data[i].author.published_date: "No Data Found"}</small></p>
                  </div>
                  </div>
                  <div class="d-flex">
                  <i class="fa-sharp fa-solid fa-eye px-2 text-large align-self-center"></i>
                  <b class="align-self-center">${data[i].total_view ? data[i].total_view : "No Data Found"}</b>
                  </div>
                  <button onclick="loadModal('${(data[i]._id)}')" class="text-white align-self-center btn btn-info mt-0" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">See More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
        newsDetailsField.appendChild(newNews)
    }
    const spinnerField = document.getElementById("spinner-field");
    spinnerField.classList.add("d-none");
}

const loadModal = id =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url).then(response=>response.json()).then(data =>displayModalDetails(data.data));
}

const displayModalDetails = (data) =>{
    const modalDetailsField = document.getElementById("modal-details");
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerHTML = `<b style="text-align: justify;"><h3>${data[0].title}</h3></b>`
    modalDetailsField.innerHTML = `<p style="text-align: justify; class="mt-3 pe-5">${data[0].details}</p>`;
    console.log(data[0]._id);
}

loadClickedNews('08',"All News")
loadNewsCategory();