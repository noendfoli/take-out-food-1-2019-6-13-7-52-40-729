// 完成时间: 4min
function bestCharge(selectedItems) {
  const items = splitItemAndCount(selectedItems)
  const bestCharge = getBestCharge(items)
  return getReciptContent(bestCharge)
}

// 完成时间: 3min
function splitItemAndCount(selectedItems) {
  return selectedItems.map(item => {
    let id, count
    [id, count] = item.split(' x ')
    return { id, count }
  })
}

// 完成时间: 5min
function getBestCharge(items) {
  let bestCharge = {
    sumPrice: 0,
    promoPrice: 0,
    items: [],
    promoType: null,
    promoItems: []
  }

  items.forEach(item => {
    const itemInfo = getItemDetailById(item.id)
    const cost = item.count * itemInfo.price
    bestCharge.sumPrice += cost
    Object.assign(item, itemInfo, {cost})
  })

  bestCharge.items = items

  const promotions = loadPromotions()
  promotions.forEach(promotion => {
    promotionResult = handlePromotion(promotion, items)

    if (promotionResult.promoPrice > bestCharge.promoPrice) {
      bestCharge.promoType = promotion.type
      bestCharge.promoItems = promotionResult.promoItems
      bestCharge.promoPrice = promotionResult.promoPrice
    }
  })

  bestCharge.sumPrice -= bestCharge.promoPrice

  return bestCharge
}

// 完成时间: 2min
function getItemDetailById(itemId) {
  const items = loadAllItems()
  const ret = items.filter(item => item.id === itemId)
  return ret.length ? ret[0] : null
}

// 完成时间: 2min
function handlePromotion(promotion, items) {
  let promotionResult = {
    promoItems: [],
    promoPrice: 0
  }
  switch (promotion.type) {
    case '满30减6元':
      promotionResult.promoPrice = full30Minus6PromotionHandler(items)
      break
    case '指定菜品半价':
      promotionResult = halfPricePromotionHandler(promotion, items)
      break
  }

  return promotionResult
}

// 完成时间: 1min
function full30Minus6PromotionHandler(items) {
  const sumPrice = items.reduce((sum, item) => sum + (item.cost), 0)
  return sumPrice >= 30 ? 6 : 0
}

// 完成时间: 3min
function halfPricePromotionHandler(promotion, items) {
  const promoItems = items.filter(item => promotion.items.includes(item.id))
  const promoPrice = promoItems.reduce((sum, item) => sum + (0.5 * item.cost), 0)
  return {
    promoItems,
    promoPrice
  }
}

// 完成时间: 4min
function getReciptContent(bestCharge) {
  let content = ''
  const title = '============= 订餐明细 ============='
  const splitLine = '-----------------------------------'
  const end = '==================================='

  content = content.concat(title, '\n')
  bestCharge.items.forEach(item => {
    content = content.concat(`${item.name} x ${item.count} = ${item.count * item.price}元`, '\n')
  })
  content = content.concat(splitLine, '\n')

  if (bestCharge.promoType) {
    content = content.concat('使用优惠:', '\n')
    switch (bestCharge.promoType) {
      case '满30减6元':
        content = content.concat('满30减6元，省6元', '\n')
        break
      case '指定菜品半价':
        itemNames = bestCharge.promoItems.map(item => item.name).join('，')
        content = content.concat(`指定菜品半价(${itemNames})，省${bestCharge.promoPrice}元`, '\n')
        break
    }
    content = content.concat(splitLine, '\n')
  }

  content = content.concat(`总计：${bestCharge.sumPrice}元`, '\n')
  content = content.concat(end)
  return content
}
