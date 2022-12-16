let qtyPlus=document.getElementById("qty-plus");
    let qtyMinus=document.getElementById("qty-minus");
    let qtyInput=document.getElementById("qty");

// console.log(localStorage.getItem("cart"))
//////////////////////////
 
if(sessionStorage.getItem("fullname")==null){
    open("login.html","_parent")
}else{
let welcome = document.getElementById("welcome");
welcome.innerHTML=JSON.parse(sessionStorage.getItem("fullname"))
}



////////////////////// helper functions /////////
function jsonToArray(json){
    let arr=JSON.parse(json)
    return arr;
    
    }
    
    function arrayToJson(array){
      let json=JSON.stringify(array)
        return json;
        
        }
//////////////////////////////////////////////////reade all data from localstorage

let allCartData=[];

if(localStorage.getItem("cart")!= null){
  allCartData=  jsonToArray(localStorage.getItem("cart")) ;
  displayCart(allCartData)
}


///////////////////create ////////////////////////////
function grtProduct(index){
    let products=jsonToArray(localStorage.getItem("product"));
    for(let i=0;i<products.length;i++){
        if(i==index){
return products[i];
        }
    }
}

function addToCart(indexOfProduct){
let product=grtProduct(indexOfProduct);
// console.log(product);

for (let i= 0; i< allCartData.length; i++) {
   if(product.name==allCartData[i].name){
    return 1;
   }
    
}

        let cart={
            name:product.name,
            price:product.price,
            imgUrl:product.url,
            quantity:1,
        }
        allCartData.push(cart);
        localStorage.setItem("cart",arrayToJson(allCartData));
    displayCart(allCartData);
    
    

}

////////////////display in cart //////////////

function displayCart(array){
    let tbody=document.getElementById("tbody")
    let cartonna=``;
for(let i=0;i<array.length;i++){
cartonna+=`
<td class="cart_product_img">
<a href="#"><img src=${array[i].imgUrl} alt="Product"></a>
</td>
<td class="cart_product_desc">
<h5>${array[i].name} </h5>
</td>
<td class="price">
<span>$${array[i].price} </span>
</td>
<td class="qty">
<div class="qty-btn d-flex">
    <p>Qty</p>
    <div class="quantity">
        <span   class="qty-minus" ><i class="fa fa-minus"  id="qty-minus"    onClick="decreasQountity(${i})"></i></span>
        <input type="number" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="${array[i].quantity}">
        <span    class="qty-plus" ><i class="fa fa-plus" aria-hidden="true" id="qty-plus" onClick="increasQuantity(${i})" ></i></span>
    </div>
</div>
</td>
<td><button class=" btn" id="removeCart" style="background-color:#fbb710;" onClick="deleteCart(${i})">Remove</button></td>
</tr>

`

}
tbody.innerHTML=cartonna;
getTotalPrice(allCartData)
}


///////////////////////delete from cart/////////////
function deleteCart(index){
    allCartData.splice(index,1);
    localStorage.setItem("cart",arrayToJson(allCartData))
    allCartData=jsonToArray(localStorage.getItem("cart"))
    displayCart(allCartData);

}

///////////////////////Quantity of product in a cart///////////////////// 
 
 
//////////////increase
function increasQuantity(index){
    let qua=allCartData[index].quantity;
    qua++;
    allCartData[index].quantity=qua;
    displayCart(allCartData);
    localStorage.setItem("cart", arrayToJson(allCartData))
    
}
//////////////////decreas
    function decreasQountity(index){
        let qua=allCartData[index].quantity;
        if(qua<=0){
          qua=0; 
          
        }else{
            qua--;
           
        }
        allCartData[index].quantity=qua;
        localStorage.setItem("cart", arrayToJson(allCartData))
        displayCart(allCartData)
        
    }
//////////////////////////////get total price/////////////////////////////////

function getTotalPrice(allCartData){
    let tot=document.getElementById("total")  ;
  let subto=document.getElementById("subtotal")  ;
  let cartNum=document.getElementById("cartNum");
    let total =0;
   
    for(let item in allCartData){
total+=Number(allCartData[item].price * allCartData[item].quantity);

    }
    
  subto.innerText=total+"$"
  tot.innerText=total+"$"

cartNum.innerText=allCartData.length
localStorage.setItem("cartItem",allCartData.length)
}





// localStorage.removeItem("cart")
//////////////////////////get id of product to add it to cart //////////////
getID()
function getID(){
   let url_string = window.location;
   let  url = new URL(url_string);
   
   let id = url.searchParams.get("id");
    // console.log(id)
    if(id>0){
        
        addToCart(id)
         window.location="shop.html";

    }

    if(id=="frist"){
        addToCart(0) 
         window.location="shop.html";
    }

    
}

