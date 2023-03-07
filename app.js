const loadNewsCategory=()=>{
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url).then(response=>response.json()).then(data =>displayNewsCategory(data.data));
}

const displayNewsCategory = data =>{
    const newsCategoryField = document.getElementById("news_category_field");
    for(let i=0;i<data.news_category.length;i++){
        // console.log(data.news_category[i].category_name);
        const newCategory = documrnt.createElement
    }
}

loadNewsCategory();