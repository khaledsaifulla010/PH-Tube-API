let currentData = [];


const secondsToHoursMinutes = (seconds) => {
  seconds = seconds.slice(0, 5);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}hrs ${minutes}min ago`;
}


//sort data

const sortDatas = allDatas => {
  let sortData = allDatas.sort((sort1, sort2) => (parseFloat(sort1.others.views) < parseFloat(sort2.others.views)) ? 1 : (parseFloat(sort1.others.views) > parseFloat(sort2.others.views)) ? -1 : 0);
  return sortData;
}

//sort button

const sortByViews = () => {
  const datas = sortDatas(currentData);
  display(datas);
}



const handleDataLoad = async () => {

  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const tabData = data.data;

  const tabContainer = document.getElementById('tab-container');


  tabData.forEach((tabData) => {

    const div = document.createElement('div');
    div.innerHTML = `      
        <a onclick = "allVideoData('${tabData.category_id}')" class="tab bg-gray-200 mr-6 text-black hover:bg-[#FF1F3D] hover:text-white rounded-xl font-bold">${tabData.category}</a>
        `;
    tabContainer.appendChild(div);

  });
};


const allVideoData = async (categoryId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  console.log(categoryId);
  const data = await res.json();
  const allDatas = data.data;
  currentData = allDatas;
  display(allDatas);
};

const display = (allDatas) => {

  const cardContainer = document.getElementById('card-container');
  const cardContainer2 = document.getElementById('card-container2');
  cardContainer2.innerHTML = ``;

  cardContainer.innerHTML = "";
  if (allDatas.length === 0) {
    const div = document.createElement('div');
    div.innerHTML = `      
                <div>
                <img class = "lg:w-[450px] md:w-[450px] w-[320px] lg:ml-28 md:ml-28 ml-6" src="images/Icon.png" >
                <h1 class = "lg:text-4xl md:text-4xl text-xl font-bold mt-8 mb-12 lg:ml-none ml-2">Oops!! Sorry, There is no content here</h1>
                </div>
                `;
    cardContainer2.appendChild(div);
  }
  else {

    allDatas.forEach((allVideos) => {

      console.log(allVideos);

      const div = document.createElement('div');

      div.innerHTML = `
                    <div class="card lg:w-[300px] lg:h-[400px] md:w-[300px] md:[400px] w-[400px] h-[400px] p-2 bg-base-100 border my-4">
                   <figure><img src="${allVideos.thumbnail}" /></figure>

                    ${allVideos.others.posted_date ? `<div class= "bg-black text-white rounded-xl font-bold absolute lg:bottom-60 lg:right-4  md:bottom-60 md:right-4 bottom-56 right-8 p-2">
                    ${secondsToHoursMinutes(allVideos.others.posted_date)}
                    </div>` : ''}
                   
                   

                    <div class="card-body">
                      <div class="flex items-center  gap-4  ">
                      
                        <img class="rounded-full w-[30px] h-[30px] " src="${allVideos.authors[0].profile_picture}">
                        <h3 class = "text-xl font-bold">${allVideos.title}</h3>
                      </div>
                      <div class="flex items-center gap-2 mt-4">
                      <h3 class = "text-lg font-medium">${allVideos.authors[0].profile_name}</h3>
                      <img class="rounded-full w-[20px] h-[20px] "  src="images/verified-badge.png" >
                      </div>
                      <div>
                        <p class = "font-medium">${allVideos.others.views ? allVideos.others.views : "No"} Views</p>
                      </div>
                    </div>
                    </div>
                    `;

      cardContainer.appendChild(div);
    });
  }

}

// sorting video with views

handleDataLoad();
allVideoData("1000");


