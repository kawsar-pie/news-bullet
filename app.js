const loadNewsCategory=()=>{
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url).then(response=>response.json()).then(data =>displayNewsCategory(data.data));
}

const displayNewsCategory = data =>{
    const newsCategoryField = document.getElementById("news_category_field");
    for(let i=0;i<data.news_category.length;i++){
        // console.log(data.news_category[i].category_name);
        const newCategory = document.createElement('div');

        if(i==data.news_category.length-1){
            newCategory.innerHTML=`
            <button id="${data.news_category[i].category_id}"class="btn btn-info">${data.news_category[i].category_name}</button>
            `
        }
        else{
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
    const markClicked = document.getElementById(clickedElementId);
    markClicked.classList.add("bg-info");
    loadClickedNews(clickedElementId,event.target.innerText);
    // markClicked.classList.remove("bg-info");
    console.log(clickedElementId,event.target.innerText);
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
    for(let i=0;i<data.length;i++){
        // console.log(data.news_category[i].category_name);
        const newNews = document.createElement('div');
        newNews.innerHTML=`
        <div class="card shadow m-5" style="max-width: 95%;">
            <div class="row g-0">
              <div class="col-md-5">
                <img src="${data[i].thumbnail_url}" class="img-fluid p-3 rounded-start" alt="...">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <b><h5 class="card-title">${data[i].title}</h5></b>
                  <p class="card-text">${data[i].details.slice(0,500)}...</p>
                  <p class="card-text"><small class="text-muted">${data[i].author.published_date}</small></p>
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
loadClickedNews('08',"All News")
loadNewsCategory();