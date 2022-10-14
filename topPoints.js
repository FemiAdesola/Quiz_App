const topPointList = document.getElementById("topPointList");
const topPoints = JSON.parse(localStorage.getItem("topPoints")) || [];


topPointList.innerHTML = topPoints
  .map(point => {
    return `<li class="topPoint">${point.name} - ${point.point}</li>`;
  })
  .join("");

  console.log(topPointList)