
/*
=========================================================================================
======================  Array & Maps Manipulation   =====================================
=========================================================================================
*/

/**
 * Group an array of objects by their key values.
 * 
 * @param {array} source The input array
 * @param {*} key The key to group by
 * @return {object} Object contains the values of the key and corresponding array of members
 */
export const groupBy = (source, key) => {
  return source.reduce(function(rv, x) {

    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


/**
 * Sum reducer used to calculate the sum of an array using its reduce() function. 
 * 
 * @param {number} accumulator 
 * @param {number} currentValue
 * @return {number} The sum of new accumulator
 */
export const sumReducer = (accumulator, currentValue) => accumulator + currentValue;


/**
 * Get the max value range for an array.
 * 
 * Given a single-level array [] or double-level array [[],[],], 
 * the range is calculated between max and min values of the entire array.
 * 
 * @param {array} source The input array. 
 * @return {number} The max range
*/
 export const getMaxRange = (source)=>{
  var maxValue = 0;
  var minValue = 0;
  source.forEach((item, i) =>{
    let sum = Array.isArray(Object.values(item)[0]) ? Object.values(item)[0].reduce(sumReducer) : Object.values(item)[0];
    maxValue = sum > maxValue ? sum : maxValue;
    minValue = sum < minValue ? sum : minValue;
  });
  return maxValue - minValue;
};


export const sortStats = (stats, reduce=true) =>{
  if (stats && Array.isArray(stats)){
    stats.sort((a , b) => {
      var aTotal = Object.values(a)[0];
      var bTotal = Object.values(b)[0];

      aTotal = Array.isArray(aTotal)? (reduce? aTotal.reduce(sumReducer) : aTotal[0]) : aTotal;
      bTotal = Array.isArray(bTotal)? (reduce? bTotal.reduce(sumReducer) : bTotal[0]) : bTotal;

      if (aTotal > bTotal) return -1;
      if (aTotal < bTotal) return 1;
      return 0;
    })

  }

  return stats;
}


export const findMaxValue =  (source)=>{
  var maxValue = 0;
  var minValue = 0;

  source.forEach((item, i) =>{
    var values = Object.values(item);

    if (values && Array.isArray(values)){
      values.forEach((subVal, j)=>{
        if (subVal && Array.isArray(subVal)){
          subVal.forEach((leafVal, k)=>{
            maxValue = leafVal > maxValue ? leafVal : maxValue;
            minValue = leafVal < minValue ? leafVal : minValue;
          })
        }else if(subVal){
          maxValue = subVal > maxValue ? subVal : maxValue;
          minValue = subVal < minValue ? subVal : minValue;
        }
      })
    }
  });
  return maxValue - minValue;
};

export const findMinValue =  (source)=>{
  var maxValue = 0;
  var minValue = Infinity;

  source.forEach((item, i) =>{
    var values = Object.values(item);

    if (values && Array.isArray(values)){
      values.forEach((subVal, j)=>{
        if (subVal && Array.isArray(subVal)){
          subVal.forEach((leafVal, k)=>{
            maxValue = leafVal > maxValue ? leafVal : maxValue;
            minValue = leafVal < minValue ? leafVal : minValue;
          })
        }else if(subVal){
          maxValue = subVal > maxValue ? subVal : maxValue;
          minValue = subVal < minValue ? subVal : minValue;
        }
      })
    }
  });
  return minValue;
};

/*
=========================================================================================
======================  Math Manipulation   =====================================
=========================================================================================
*/

/**
 * 
 * @param {number} a 
 * @param {number} b 
 */
export const percentize = (a, b) =>{
  return Math.round(a / b * 100 * 100) / 100;
};

/*
=========================================================================================
======================  String Manipulation   =====================================
=========================================================================================
*/

/**
 * Used to ensure routing URLs do not end with / so we can have consistent url building schema
 * @param {string} url the url to be trimmed
 * @return {string} newly trimmed url
 */
export const trimUrl = url =>{
  if(url){
    if (url.length > 1 && url.endsWith("/"))
      return url.substring(0, url.length - 1);
    else
      return url
  }

  return "/";
};

export const ellipsisString = (str, n, useWordBoundary )=>{
  //try{
    if (str.length <= n) { return str; }
    var subString = str.substr(0, n-1);
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(' ')) 
      : subString) + "...";
};


/*
=========================================================================================
==================================  Data Parsing   ======================================
=========================================================================================
*/


export const parseDataRows = (samples) => {
  var rows = [];

  if (samples && samples.length > 0){
    try{
      samples.forEach((item, i) =>{
        rows.push(Object.values(item));
      });
    }
    catch{}
  }
  return rows;
};

export const parseDataColumns = (samples) => {
  var columns = [];
  if (samples && samples.length > 0){
    try{
      columns = Object.keys(samples[0]);

    }
    catch{}
  }
  return columns;   
};

/*
=========================================================================================
==================================  Date Parsing   ======================================
=========================================================================================
*/

export const formatDate = (date)=>{
  if (date){
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
  }
  else{
    return "";
  }
}