const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
        .then(res => res.json())
        .then(data => showData(data.data))
        .catch(error => console.error('Error fetching data:', error));
}

const timeFormat = (value) => {
    const hours = parseInt(value / 3600);
    const minutes = parseInt((value % 3600) / 60);

    if (hours !== 0 || minutes !== 0) {
        return `${hours} hours ${minutes} minutes ago`;
    } else {
        return `few minutes ago`;
    }
}

const showData = (data) => {
    const content = document.getElementById("api-content");

    content.innerHTML = "";
    if (data.length > 0) {
        data.forEach(element => {
            const card = document.createElement("div");
            card.classList.add("col-lg-3");
            card.innerHTML = `
                <div class="container mt-5">
                    <div class="card-thumbnail container">
                        <img class="thumbnail-img" src="${element.thumbnail}" alt="">
                        <p class="watch-time">${timeFormat(element.others.posted_date)}</p>
                    </div>
                    <div class="card-all mt-3 container">
                        <div class="card-pic">
                            <img class="card-pro-pic" src="${element.authors[0].profile_picture}" alt="">
                            
                        </div>
                        <div class="card-pic-info">
                            <h5>${element.title}</h5>
                            <p>${element.authors[0].profile_name} ${showVerifiedIcon(element.authors[0].verified)}</p>
                            <p>${element.others.views} Views</p>
                        </div>
                    </div>
                </div>
            `;
            content.appendChild(card);
        });
    } else {
        const temp = document.createElement("div");
        temp.innerHTML = `
            <div class="drawing-container text-center mt-5">
            <img class="drawing-image" src="./image/Icon.png" alt="">
                <h1> Oops!! Sorry, There is no <br> content here </h1>
            </div>
        `;
        content.appendChild(temp);
    }
}

loadData();



const loadMusicData = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1001")
        .then(res => res.json())
        .then(data => showData(data.data))
}

const loadComedyData = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1003")
        .then(res => res.json())
        .then(data => showData(data.data))
}

const loadDrawingData = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1005")
        .then(res => res.json())
        .then(data => showData(data.data))
}


const sortByView = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
        .then(res => res.json())
        .then(data => sorting(data.data));
}

const sorting = (data) => {
    data.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
    showData(data);
}



const showVerifiedIcon = (verified) => {
    if (verified) {
        return '<i class="fas fa-check-circle verified-icon" style="color: blue;"></i>';
    } else {
        return '';
    }
}

