const content = document.querySelector(".content")
const row = 10;
const rowName = {
    1:'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5 : 'E',
    6: 'F',
    7 :'G',
    8 : 'H',
    9 : 'I',
    10: 'K',
}
//add class vip
const vipClass = (i)=>{
    if(i === 8 ){
        return 'vip top'
    }
    else if(i === 9 ){
        return 'vip'
    }
    else if(i === 10 ){
        return 'vip'
    }
    else{
        return ''
    }
};

//format number
const formatNumber = (number)=>{
   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}


const movieList = [
    {
    id: 1,
    animation:'2D',
    name: 'Avengers', 
    time: '12:00',
    price: 100000,
    theater:'CGV Vincom',
    vipprice:50000,
    room: 'A1',
    image: 'https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg'
}
]
let html = '' ; // temp
//handle html Column 
const htmlCol = (j,i)=>{
    return `<span class="chair ${vipClass(i)}">${rowName[i]}${j}</span>`
}

//create table cinemax
const col= 10;
    for(let i = 1;i<=row ;i++){
        for(let j = 1 ;j<= col;j++ ){
            html += htmlCol(j,i)
        }  
        html+= `<br>`
    }

//render
content.innerHTML = html

const chailList = []

let totalArr = [];
//render about
const renderAbout = (movie,vip)=>{
    let total = sumWithInitial = totalArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue.prices,
        0
      );
    let price = vip ? movie.price + movie.vipprice : movie.price;
    console.log(total);
     return `
            <div class="about_img">
            <img src="${movie.image}" alt="" />
            <h3>${movie.name}</h3>
            <h3>${movie.animation}</h3>
        </div>
        <div class="thongtin">
            <div class="rap">
            <span>Rạp: </span>
            <span>${movie.theater}</span>
            </div>
            <div class="suat">
            <span>Suất chiếu: </span>
            <span>${movie.time}</span>
            </div>
            <div class="phong">
            <span>Phòng: </span>
            <span>${movie.room}</span>
            </div>
            <div class="ghe">
            <span>Ghế: </span>
            <span>${chailList.map((chair)=>{
                return `${chair}`
            })}</span>
        </div>
        <div class="thanhtoan">
            <div class="gia">
            <span>Giá vé: </span>
            <span>${formatNumber(price)}</span>
            </div>
            <div class="tong">
            <span>Tổng</span>
            <span>${ formatNumber(total)}</span>
            </span>
        </div>
        <div class="button">
            <button onclick="handleButton()" id="btn_submit" class="btn btn-primary">Đặt vé</button>
        </div>
    `
}
// render_user
const renderForm = (movie,user)=>{
    let total = sumWithInitial = totalArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue.prices,
        0
      );
     return `
            <div class="about_img">
            <img src="${movie.image}" alt="" />
            <h3>${movie.name}</h3>
            <h3>${movie.animation}</h3>
        </div>
        <div class="thongtin">
            <div class="name">
            <span>Tên: </span>
            <span>${user.name}</span>  
            </div>
            <div class="age">
            <span>Tuổi: </span>
            <span>${user.age}</span>  
            </div>
            <div class="email">
            <span>email: </span>
            <span>${user.email}</span>  
            </div>
            <div class="phone">
            <span>số điện thoại: </span>
            <span>${user.phone}</span>  
            </div>
            <div class="rap">
            <span>Rạp: </span>
            <span>${movie.theater}</span>
            </div>
            <div class="suat">
            <span>Suất chiếu: </span>
            <span>${movie.time}</span>
            </div>
            <div class="phong">
            <span>Phòng: </span>
            <span>${movie.room}</span>
            </div>
            <div class="ghe">
            <span>Ghế: </span>
            <span>${chailList.map((chair)=>{
                return `${chair}`
            })}</span>
        </div>
        <div class="thanhtoan">
            <div class="tong">
            <span>Tổng</span>
            <span>${ formatNumber(total)}</span>
            </span>
        </div>
    `
}


//index
let indexTemp = [];

//handle click column
const chairList = [... document.querySelectorAll('.chair')]
chairList.forEach((chair,index)=>{
    chair.onclick = (e)=>{
        //toggle class
        if(chailList.length >= 8){
            alert("Bạn chỉ được đặt tối đa là 8 vé ")
            return ;    
        }
        chair.classList.toggle('check')

        if(!indexTemp.some((an) => an === index)){
            indexTemp.push(index)
        }else{
            indexTemp.splice(indexTemp.indexOf(index),1)
        }

        if(chair.classList.contains('remove')){
            return
        }
        //add chair to chairList
        if(chair.classList.contains('check')){
                chailList.push(chair.textContent)
        }else{
            chailList.splice(chailList.indexOf(chair.textContent),1)
        
        }
        //get class vip and handle total price
        const vip = chair.classList.contains('vip')

        if(chair.classList.contains('check')){
             if(vip){
                totalArr.push(
                   {
                       index:index,
                       prices : movieList[0].vipprice + movieList[0].price
                   }
                )
            }else{
                totalArr.push(
                    {
                        index:index,
                        prices :movieList[0].price
                    }
                 )
            }
        }else{
            let indexTotal = totalArr.findIndex((total)=>total.index === index);
            totalArr.splice(indexTotal,1);
        }

      

        //render about
        if(chailList.length > 0){
            const about = document.querySelector(".about")
            about.innerHTML = renderAbout(movieList[0],vip)
        }else{
            const about = document.querySelector(".about")
            about.innerHTML = ''
        }
    }
})

const handleButton = (event) => {
    document.querySelector('.main-block').classList.add('active');
    indexTemp.forEach(index => {
        chairList[index].classList.remove('check')
        chairList[index].classList.add('remove')
        chailList.splice(chailList[index],1)
    })
    const about = document.querySelector(".about")
    about.innerHTML = ''
}

document.querySelector('.button2').onclick = (e)=>{
    const name = document.querySelector('#fullname').value
    const email = document.querySelector('#email').value
    const phone = document.querySelector('#phone').value
    const age =document.querySelector('#age').value
    const user = {name,email,phone,age}
    document.querySelector('.main-block').innerHTML = renderForm(movieList[0],user)
    totalArr = [];
}