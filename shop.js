

document.getElementById("displayCount").innerHTML=localStorage.getItem("cartItem")

if(sessionStorage.getItem("fullname")==null){
    // open("login.html","_parent")
}else{
let welcome = document.getElementById("welcome");
welcome.innerHTML=JSON.parse(sessionStorage.getItem("fullname"))
}

products=[

{name:"oppoA5",url:"https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",price:"534",category:"laptop",type:"oppo"},
{name:"dellA7",url:"https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600",price:"944",category:"laptop",type:"dell"},

{name:"OppoReno5",url:"https://images.pexels.com/photos/1693627/pexels-photo-1693627.jpeg?auto=compress&cs=tinysrgb&w=600",price:"244",category:"phone",type:"oppo"},
{name:"apple",url:"https://images.pexels.com/photos/842991/pexels-photo-842991.jpeg?auto=compress&cs=tinysrgb&w=600",price:"844",category:"phone",type:"apple"},
{name:"oppoReno7",url:"https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&w=600",price:"444",category:"phone",type:"oppo"},
{name:"sonyP45",url:"https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600",price:"744",category:"laptop",type:"sony"},
{name:"HP9",url:"https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=600",price:"644",category:"laptop",type:"hp"},
{name:"HP9PRO",url:"https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?auto=compress&cs=tinysrgb&w=600",price:"344",category:"laptop",type:"hp"},
{name:"samsungA34",url:"https://images.pexels.com/photos/583842/pexels-photo-583842.jpeg?auto=compress&cs=tinysrgb&w=600",price:"1000",category:"phone",type:"samsung"}

]
localStorage.setItem("product",JSON.stringify(products))
// console.log(localStorage.getItem("product"))
// console.log(products)
///////////////////////display the product////////////////////
display(products)

function display(products){
    let cartonna=``;
for(let i=0;i<products.length;i++){

    if(products[i].category=="phone"){
cartonna+=`
<div class="store-product phone" data-product="phone">
                        
<img src="${products[i].url}" alt="" class="">
<div class="product-details">
    <h2>${products[i].name}</h2>
<p><span>$${products[i].price }</span>$${products[i].price}</p>
 <button  onclick=sendId(${i})>add to cart</button>
</div>
    </div>

`
}else{
    cartonna+=`
    <div class="store-product laptop" data-product="laptop">
                            
    <img src="${products[i].url}" alt="" class="">
    <div class="product-details">
        <h2>${products[i].name}</h2>
    <p><span>$${products[i].price}</span>$${products[i].price}</p>
     <button onclick=sendId(${i})>add to cart</button>
    </div>
        </div>
    
    `  
}}
document.getElementById("store-products").innerHTML=cartonna;
}


function sendId(id){

    if(sessionStorage.getItem("fullname")==null){
        open("login.html","_parent")
        return;}
    if(id==0){
  id="frist";
  
    }
  window.location=`cart.html?id=${id}`
  }


////////////////////////////////////// filter by category ///////////////////////////////
//   const btns=document.querySelectorAll(".cat");
// const storeProduct=document.querySelectorAll(".store-product")
// for(let i=0;i<btns.length;i++){
//     btns[i].addEventListener("click",function(e){
//         e.preventDefault();//not reload page
//         const filter=e.target.dataset.filter;
//         // console.log(filter)
//         storeProduct.forEach((product)=>{
//             if(filter=="all"){
//                 product.style.display="block"
//             }else {
//                if(product.classList.contains(filter)){
//                 product.style.display="block"
//                }else{
//                 product.style.display="none"
//                }
//             }
//         })

//     })
// }



let all=document.getElementById("all")
let laptop=document.getElementById("laptop")
let phone=document.getElementById("phone")
all.addEventListener("click",(e)=>{
    e.preventDefault();
    display(products)
})
laptop.addEventListener("click",(e)=>{
    e.preventDefault();
    categoryFiltring(products,"laptop")
})
phone.addEventListener("click",(e)=>{
    e.preventDefault();
    categoryFiltring(products,"phone")
})
function categoryFiltring(array,category){
    let pro=array.filter((el)=>{
        return el.category.toLowerCase() ==category.toLowerCase();
    })
display(pro)
}

//////////////////////////////////////search //////////////////////////////////////
// const search=document.getElementById("searchr");
// search.addEventListener("keyup",function(e){
// e.preventDefault();
// const searchValue=search.value.toLowerCase().trim();
// for(let i=0;i<storeProduct.length;i++){
//     if(storeProduct[i].classList.contains(searchValue)){
//         storeProduct[i].style.display="block";

//     }else if(searchValue == ""){
//         storeProduct[i].style.display="block";
        
//     }else{
//         storeProduct[i].style.display="none";
        
//     }
// }

// })
////////////////////////////// high to low (price)///////

document.getElementById("high").addEventListener("click",function(){highToLow(products)})
function highToLow(array){
    array.sort(function(current,next){
return  next.price- current.price;
    })

    display(array)

}

////////////////////////////// low to high  (price)///////
document.getElementById("low").addEventListener("click",function(){lowToHigh(products)})
function lowToHigh(array){
    array.sort(function(current,next){
return  current.price-next.price;
    })

    display(array)

}

/////////////////////  price  rang handling ///////////////////


function rang( array ,price){
product =products.filter(function(item){
return parseFloat(item.price) <= parseFloat(price);
})
// console.log(product);
 display(product)

}
let rangeInput = document.getElementById("range");

rangeInput.addEventListener("input" , function(){
    let priceValue = document.getElementById("price-value");
    let price=rangeInput.value;
    priceValue.innerHTML = price + "$";

    rang( products ,price)

})

//////////////////////////////////////search  by type of product //////////////////////////////////////
let  search=document.getElementById("searchr");
search.addEventListener("keyup",function(e){
e.preventDefault();
let text=search.value.toLowerCase().trim();
searchType(products,text)

})


function searchType(array,text){
  let product=  array.filter(function(el){

      return  el.type.toLowerCase().includes(text.toLowerCase())  
    })
    display(product);
}