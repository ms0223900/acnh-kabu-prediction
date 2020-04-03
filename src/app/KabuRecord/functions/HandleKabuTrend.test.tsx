import HandleKabuTrend from './HandleKabuTrend';

describe('test HandleKabuTrend', () => {
  
});

describe('test getKabuTrendPredictionsFromKabuValue', () => {
  it('test 0 condition', () => {
    const res = HandleKabuTrend.getKabuTrendPredictionsFromKabuValue(0);
    const _expect = ['notDefined'];
    expect(res).toEqual(_expect);
  });

  it('test kabuValue >= 90 condition', () => {
    const res = HandleKabuTrend.getKabuTrendPredictionsFromKabuValue(90);
    const _expect = ['wave', 'third', 'forth'];
    expect(res).toEqual(_expect);
  });

  it('test kabuValue >= 85 and kabuValue < 90 condition', () => {
    const res = HandleKabuTrend.getKabuTrendPredictionsFromKabuValue(88);
    const _expect = ['third', 'forth', 'decrement'];
    expect(res).toEqual(_expect);
  });

  it('test kabuValue >= 80 and kabuValue < 85 condition', () => {
    const res = HandleKabuTrend.getKabuTrendPredictionsFromKabuValue(81);
    const _expect = ['forth'];
    expect(res).toEqual(_expect);
  });

  it('test kabuValue >= 60 and kabuValue < 80 condition', () => {
    const res = HandleKabuTrend.getKabuTrendPredictionsFromKabuValue(61);
    const _expect = ['wave', 'forth'];
    expect(res).toEqual(_expect);
  });

  it('test kabuValue > 0 and kabuValue < 60 condition', () => {
    const res = HandleKabuTrend.getKabuTrendPredictionsFromKabuValue(59);
    const _expect = ['forth'];
    expect(res).toEqual(_expect);
  });
});
