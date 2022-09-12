//价格过滤器
export default (filterPrice) => {
  let newVal = parseFloat(filterPrice).toFixed(2)
  return newVal   //此文件用来过滤价格 （使小数保留两位）
}
