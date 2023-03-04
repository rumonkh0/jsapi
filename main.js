
const fetchData = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then((res) => res.json())
        .then((data) => getData(data.data.tools))
}



const getData = (data) => {

    const row = document.getElementById("row");
    data.forEach(singleData => {
        const { id } = singleData
        // console.log(id);
        // console.log(singleData)
        // console.log("prin------------------------------------------")
        // console.log(singleData.features)

        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `

<div class="card h-100">
<img src="${singleData.image}" class="card-img-top p-3 rounded-2" alt="...">
<div class="card-body">
    <h5 class="card-title">Features</h5>
    <ol  id="features_${id}">
            
</ol>
</div>

<hr class="">

<div class="card-footer border-0 bg-transparent">
    <h5 class="card-title">${singleData.name}</h5>
    <div class="d-flex justify-content-between">

        <div class="date d-flex justify-content-between align-items-center">
            <i class="fa-solid fa-calendar-days me-2"></i>
            <p class="m-0">${singleData.published_in}</p>
        </div>



    
        <i class="fa-solid fa-arrow-right bg-danger rounded-circle p-2" onclick= "fetchId('${id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>

        

       




    </div>


</div>


</div>
`
        row.appendChild(col);

        const feature = document.getElementById(`features_${id}`)
        for (let i = 0; i < singleData.features.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = `${singleData.features[i]}`
            feature.appendChild(li)
        }
    });


}


const fetchId = (id) => {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    console.log(url)

    fetch(url)
        .then((res) => res.json())
        .then((data) => showDetails(data))
}


const showDetails = (detailsShow) => {
    // console.log("-------------------------------------------------------------------")
    // console.log(detailsShow.data)
    
    removemodal()



    const modalBody = document.getElementById("modal-body")

    // const modalContent= document.getElementById("modal")
    // Object.entries(detailsShow).forEach(singleData => {
    // console.log(singleData + `i am here`)

    const modal = document.createElement("div");
    modal.classList.add('row');
    modal.innerHTML = `
        <div class="col-md-6">

        <div class="card p-2 bg-secondary">
          <h5>${detailsShow.data.description}</h5>
          <div class="d-flex gap-3 my-4">


          </div>

          <div class="d-flex justify-content-between">
            <div >
              <h5>Features</h5>
              <ul id="modal_feature">
              </ul>
            </div>
            <div>
              <h5>Integrations</h5>
              <ul id= "integration">
              </ul>
            </div>
          </div>


        </div>

      </div>

      <div class="col-md-6">
        <div class="card">
          <img src=${detailsShow.data.image_link[0]} class="card-img-top p-3" alt="...">
          <div class="card-body">
          </div>
        </div>
      </div>
   
    `

    modalBody.appendChild(modal)


    // const featureModal= document.getElementById("modal_feature");
    // for (let i = 0; i < detailsShow.data.features.length; i++) {
    //     const li = document.createElement("li");
    //     li.innerHTML = `${detailsShow.data.features[i].feature_name}`
    //     featureModal.appendChild(li);
    //     console.log(li)
    // }

    // append goes here -----------------------------------
    const feature = document.getElementById("modal_feature");
    Object.entries(detailsShow.data.features).map((singleData) => {
      const li = document.createElement("li");
      li.innerHTML = `${singleData[1].feature_name}`;
      feature.appendChild(li);

    })


    const integration= document.getElementById("integration");
    detailsShow.data.integrations.forEach(singleIntegrations=>{
      console.log(singleIntegrations)
      const li = document.createElement("li");
      li.innerHTML = `${singleIntegrations}`;
      integration.appendChild(li);

    })
}


fetchData()

function removemodal() {
    const list = document.getElementById("modal-body");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}


//  <li>${singleData.features[0]}</li>
//     <li>${singleData.features[1]}</li>
//     <li>${singleData.features[2]}</li>