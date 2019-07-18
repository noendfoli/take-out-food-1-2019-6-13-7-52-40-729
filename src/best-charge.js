var allItems = loadAllItems();
var promote = loadPromotions()[1].items;
var totalPrice = 0;
var halfDiscount = 0
var halfPriceDith = [];
function bestCharge(selectedItems) {
 return getRecipetHead(selectedItems)+getRecipetBody()
}
function getRecipetHead(selectedItems){
    let recipetHead = `============= 订餐明细 =============\n`;
    selectedItems.forEach(item => {
      let dich = item.split(" x ");
      let itemDich = allItems.find((dtitem) => {
        return dtitem.id === dich[0];
      })
      totalPrice += itemDich.price * dich[1];
      if (promote.includes(itemDich.id)) {
        halfDiscount += itemDich.price * dich[1] / 2;
        halfPriceDith.push(itemDich.name);
      }
      recipetHead += `${itemDich.name} x ${dich[1]} = ${itemDich.price * dich[1]}元\n`;
    });
    return recipetHead+`-----------------------------------\n`
}
function getRecipetBody(){
    let receiptBody = choseBestCheap(totalPrice,halfDiscount,halfPriceDith);
    receiptBody += `总计：${Number(totalPrice)}元\n===================================`
    return receiptBody;
}
function choseBestCheap(){
  let receiptBody = ''
  if ((totalPrice >= 30 && halfDiscount > 6) || (totalPrice < 30 && halfDiscount != 0)) {
    totalPrice -= halfDiscount;
    receiptBody += `使用优惠:\n指定菜品半价(${halfPriceDith.join('，')})，省${halfDiscount}元\n-----------------------------------\n`
  } else if (totalPrice > 30 && halfDiscount <= 6) {
    totalPrice -= 6;
    receiptBody += `使用优惠:\n满30减6元，省6元\n-----------------------------------\n`
  }
  return receiptBody
}
