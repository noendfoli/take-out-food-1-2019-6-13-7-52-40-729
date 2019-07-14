function bestCharge(selectedItems) {
  return /*TODO*/;
}
function getItemAndCount(selectedItems){
    var order = selectedItems.map((vaule) =>{
       var product ={
             id:vaule.split("x")[0],
             count:vaule.split("x")[1]
       };
       return product;
       })
    return order;
}
function getDiscount(order){
    var halfDiscount = [];
    var fullDiscount = [];
    var allItems = loadAllItems();
    var promote = loadPromotions();
    halfDiscount = order.reduce((acct,value) =>{
      acct += promote.items.includes(value.id)?allItems.find((item)=>{
        return item.id == vaule.id
      }).price*value.count*0.5:allItems.find((item)=>{
        return item.id == vaule.id
      }).price*value.count;
      return acct
    },0)
    fullDiscount = order.reduce((acct,value) =>{
      acct +=allItems.find((item)=>{
         return item.id == vaule.id
      }).price*value.count;
      return acct
    },0)
    fullDiscount = fullDiscount>33?fullDiscount-6:fullDiscount
    var allDiscount = {
      halfDiscount:halfDiscount,
      fullDiscount:fullDiscount
    }
    return allDiscount;
}

function compareDiscount(allDiscount){
    if(allDiscount.fullDiscount>allDiscount.halfDiscount){
      
    }
}
function selectDiscount(order){
   var allItems = loadAllItems();
   var promote = loadPromotions();
   var receipt = [];
   order.map((value)=>{
     var item = {};
     item = {
       name:allItems.find((item)=>{
        return item.id == vaule.id
     }).name,
       count:value.count,
       subTotal:allItems.find((item)=>{
        return item.id == vaule.id
        }).price*promote.items.includes(value.id)?value.count
       discountType:""
     }
   })
}
