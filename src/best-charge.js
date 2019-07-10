function bestCharge(selectedItems) {
  return /*TODO*/;
}
function getItemAndCount(selectedItems){
    var order = selectedItems.map((vaule) =>{
       var product ={
             item:vaule.split("x")[0],
             count:vaule.split("x")[1]
       };
       return product;
       })
    return order;
}
