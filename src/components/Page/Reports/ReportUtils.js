export const lineData = {
    
};

export const getDonutState = (map) => ({
    options: {
        labels: Object.keys(map),
        fill: {
            colors: ['#2C3668', 'rgb(69, 90, 100)', 'rgb(111, 191, 115)','rgb(255, 172, 51)','rgb(100, 181, 246)']
          },
          dataLabels: {
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex]
            },
          },
    },
    series: Object.values(map),
});
