// Initialize Chart
const ErrorFunc = (isTrue,name,salary) => {
  const errorContainer = document.getElementById('error-container');
  errorContainer.style.display='block'
  const errorChild = document.getElementById('error-child');
  if (isTrue) {
    errorChild.innerHTML = `<div><p class ="fw-bold fs-2"> Name:<span class="text-danger"> ${name}</span></p>
    <span id="close"> X </span>
    <p class ="fw-bold fs-2">Salary: <span class="text-danger"> ${salary}</span> </p>
    </div>`
  }
  else {
    errorChild.innerHTML = `<div><p class ="fw-bold fs-2"><span class="text-danger"> ${name}</span></p>
    <span id="close"> X </span>
    <p class ="fw-bold fs-2">Length:<span class="text-danger"> ${salary}</span> </p>
    </div>`
  }
  document.getElementById('close').addEventListener('click', () => {
    errorContainer.style.display='none'
  })
}
function initializeChart(data) {
  var chartData = formatChartData(data);
  drawChart(chartData);
}

const formatChartData = function (data) {
  const chartItems = getChartItems(data);

  const dataWithUniqueName =uniQuiFyNames(chartItems);

  return [
    {
      key: "unnecessary data",
      values: dataWithUniqueName,
    },
  ];
};

const getChartItems = function (data) {
  const chartItems = [];
  for (const i in data) {
    chartItems.push(data[i]);
  }

  return chartItems;
};

const drawChart = function drawChart(data) {
  nv.addGraph(function () {
    const chart = nv.models
      .discreteBarChart()
      .x(function (d) {
        return d.name;
      })
      .y(function (d) {
        return parseFloat(d.salary);
      })
      .staggerLabels(true);
    d3.select("#chart svg").datum(data).call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
};

//save new item
document.addEventListener("DOMContentLoaded", () => {
  initializeChart(salary_data);
  document
    .getElementById("AddRecord")
    .addEventListener("click", addRecordHandler);
  const btnShowLast = document.getElementById("showLast");
  btnShowLast.addEventListener("click", function showLastHandler(e) {
    showLastItem();
  });

  document
    .getElementById("recordCount")
    .addEventListener("click", function recordCountHandler(e) {
      loadFirebaseData(showRecordCountListener);
    });

  window.setTimeout(function () {
    document
      .getElementById("recordCount")
      .setAttribute("class", "btn btn-success");
  }, 2000);
});

const showRecordCountListener = function (chartItems) {
  ErrorFunc(false,"Total Value",chartItems[0].values.length);
};

const initialCountListener = function () {
  const itemsObj = JSON.parse(this.responseText);
  const chartItems = getChartItems(itemsObj);
  document.getElementById("initial-count").innerText = chartItems.length;
};

function addRecordHandler() {
  const name = document.getElementById("name");
  const nameValue = name.value;
  // Clear Value From Input
  name.value = '';
  const salary = document.getElementById("salary");
  const salaryValue = salary.value;
  // Clear Value From Input
  salary.value = '';

  if (!nameValue || !salaryValue) {
    ErrorFunc(true,'Hey Bro input Your Name','Hey Bro input Your Salary');
    return;
  }
// solve Error
  addRecord(nameValue, salaryValue);
}

function addRecord(name, salary) {
  const newItem = getRecord(name, salary);
  const id = Math.ceil(Math.random() * 1000000000);

  salary_data[id] = newItem;
  initializeChart(salary_data);
}

function getRecord(name, salary) {
  const newItem = {
    name: name,
    salary: salary,
  };

  return newItem;
}

function secondHandler(e) {
  console.log("why are you clicking around????");
}

const showLastItem = function () {
  const items = salary_data;
  let lastKey;
  for (const key in items){
    lastKey = key;
  };
  const lastItem = items[lastKey];
  const lastRecord = getRecord(lastItem.name, lastItem.salary);
  ErrorFunc(true,lastRecord.name,lastRecord.salary);
};

const loadFirebaseData = function (resHandler) {
  const data = salary_data;
  const chartData = formatChartData(data);
  resHandler(chartData);
};
function toggleErrorMessage(selector, value, msg) {
  if (value) {
    document.getElementById(selector + "line").style.display = "none";
  } else {
    document.getElementById(selector).style.display = "block";
    document.getElementById(selector).innerText = msg;
  }
}


const anotherRecordCountHandler = function anotherRecordCountHandler(e) {
  console.log("you have extra click handler");
  for (let i = 0; i < 10; i++) {
    const isEven = i % 2 ? "odd" : "even";
    console.log(isEven);
  }
};

function longLineCode() {
  console.log("you have extra click handler");
  for (let i = 0; i < 10; i++) {
    const isEven = i % 2 ? "odd" : "even";
    console.log(isEven);
  }
}

/*
  bad data breaks code. Broken code needs more code to fix.
  and more code means higher job security. So, smile :)



  how it works: 
  we keep track of names in the "uniqueNames" object. 
  
  If a name exists in the uniqueNames object, you got a duplicate. 

  For a duplicate, you will add a white space
  to distinguish it from the previous one

  i hate writing comment. 
  need a coffee break!
*/

const uniQuiFyNames = function (items) {
  const uniqueNames = {};

  return items.map(function (item) {
    if (uniqueNames[item.name] !== undefined) {
      uniqueNames[item.name] += " ";
      item.name += uniqueNames[item.name];
    } else {
      uniqueNames[item.name] = "";
    }
    return item;
  });
};
