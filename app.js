const loadPhones = async(searchsText, dataLimit)=>{
   const url =`https://openapi.programming-hero.com/api/phones?search=${searchsText}`;

   const res = await fetch(url);
   const data = await res.json();
   displayPhones(data.data,dataLimit); 
    
}

const displayPhones = (phones, dataLimit) =>{

    const PhoneCointer =document.getElementById("phoneContainer")
    PhoneCointer.innerHTML="";

    // dislay only 10 phone 
    const showAll=document.getElementById('show-all');

    if(dataLimit && phones.length > 10){
        phones=phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
   else{
    showAll.classList.add ('d-none');

   }

    // display no phone found 
    const noPhone= document.getElementById("no-data");
    if(phones.length === 0){
        noPhone.classList.remove("d-none");
    }
    else{
        noPhone.classList.add("d-none");
    }
        phones.forEach(phone => {
        const {brand,image,phone_name,slug}=phone
        const createDiv =document.createElement('div')
        createDiv.innerHTML="";
        createDiv.classList.add('col')
        createDiv.innerHTML=`
        <div class="card h-100">
        <img src="${image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">Brand: ${brand}</h5>
          <h5 class="card-text">Phone Name: ${phone_name}  </h5>
          
        </div>
        <button onclick="lodePhoneDetail('${slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">View Details</button>
      </div>
        
        
        `;
        PhoneCointer.appendChild(createDiv);
        
    })

    toggleSpiner(false);

}

const searchProcess =(dataLimit)=>{
    toggleSpiner(true);
    const searchFild = document.getElementById('searce-filde');
    const searchText = searchFild.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-Search').addEventListener('click', function(){
    searchProcess(10);
});


// search input fild enter even handler

document.getElementById("searce-filde").addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        searchProcess(10);
    }
})



const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')

    }
}


document.getElementById('btn-show-all').addEventListener('click', function(){
    searchProcess();

});

const lodePhoneDetail = async id =>{
    const url =(`https://openapi.programming-hero.com/api/phone/${id}`);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const{releaseDate}=phone;
    const modalTiale =document.getElementById('phoneDetailModalLabel');
    modalTiale.innerText=phone.name;

    const modalBody = document.getElementById('phoneDetail');
    modalBody.innerHTML=`
     <p> Release Date: ${releaseDate? releaseDate: 'no deat' }</p>

    
    `;
}

// loadPhones();

