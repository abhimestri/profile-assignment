export const calculateTotalPrice = (price: any, discount: any) => {
  return discount?.type === "flat"
    ? Number(+price - +discount.value)
    : Number(price - Number(price * (discount?.value / 100)));
};

export const calculateDiscountedValue = (price: any, discount: any) => {
  return discount?.type === "flat"
    ? Number(discount.value)
    : Number(price * (discount?.value / 100));
};
