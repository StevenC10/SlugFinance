async function createChartData (ticker){
    await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
        method: 'POST',
        body: `{"ticker": "` + ticker +`"}`,
        headers: new Headers({
          'Content-Type': 'application/json',
          })
    })

    const fetchData = await fetch(`http://127.0.0.1:5000/v0/view?id=` + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          })
        }).then((response) => {
          if(!response.ok) {
            throw response;
          }
          return response.json();
        });
    
    //console.log(fetchData);
    const c1Options = {};
    c1Options.series = [];
    const c1GraphData = {'series': []}
    c1Options.series.push(c1GraphData);
    if (fetchData.length >= 1){
      let c1History= fetchData[0][0][1];

      for (let i=c1History.length-1; i>=0; i--){
        const temp = {};
          temp.x = new Date (c1History[i].day);
          temp.y = [];
          temp.y.push(c1History[i].open);
          temp.y.push(c1History[i].high);
          temp.y.push(c1History[i].low);
          temp.y.push(c1History[i].close);
          c1Options.series[0].series.push(temp);
      }
      c1Options.chart = {};
      c1Options.chart.type = 'candlestick';
      c1Options.chart.height = 350;
      c1Options.title = {};
      c1Options.title.text = `'`+ticker+`'`;
      c1Options.title.align = 'left';
      c1Options.xaxis = {};
      c1Options.xaxis.type = 'numeric';
      c1Options.yaxis = {};
      c1Options.yaxis.tooltip = {};
      c1Options.yaxis.tooltip.enabled = true;
    }
    //console.log(c1Options);

    return c1Options;
}

export {createChartData};