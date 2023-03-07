const loadNewsCategory=()=>{
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url).then(response=>response.json()).then(data =>displayNewsCategory(data.data));
}

const displayNewsCategory = data =>{
    const newsCategoryField = document.getElementById("news_category_field");
    for(let i=0;i<data.news_category.length;i++){
        // console.log(data.news_category[i].category_name);
        const newCategory = document.createElement('div');
        newCategory.innerHTML=`
        <button id="${data.news_category[i].category_id}"class="btn btn-secondary">${data.news_category[i].category_name}</button>
        `
        newsCategoryField.appendChild(newCategory)
    }
}

document.getElementById("news_category_field").addEventListener("click", function(event) {
    var clickedElement = event.target;
    var clickedElementId = clickedElement.getAttribute("id");
    // console.log("Clicked element ID: " + clickedElementId);
    if(clickedElementId==="news_category_field") return;
    loadClickedNews(clickedElementId,event.target.innerText);
    console.log(clickedElementId,event.target.innerText);
});


loadNewsCategory();