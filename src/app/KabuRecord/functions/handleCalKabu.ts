const handleCalKabu = (sundayPrice: number, mondayMorningPrice: number) => {
  if(sundayPrice === 0 || mondayMorningPrice === 0) {
    return 0;
  }
  return ((mondayMorningPrice / sundayPrice) * 100).toFixed(2);
};

export default handleCalKabu;