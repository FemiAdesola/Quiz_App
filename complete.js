'use strict';

const username = document.getElementById('username');
const savePointBtn = document.getElementById('savePointBtn');
const finalPoint = document.getElementById('finalPoint');
const RecentPoint = localStorage.getItem('RecentPoint');
finalPoint.innerText = `Total Point: ${RecentPoint}`;

username.addEventListener('keyup', () => {
    savePointBtn.disabled = !username.value;
});

const topPoints = JSON.parse(localStorage.getItem('topPoint')) || [];

const MAX_TOP_POINTS = 5;


const saveTopPoint = (e) => {
    e.preventDefault();

    // get top point in local storage 
    const point = {
        point: Math.floor(Math.random()*100),
    //    point: RecentPoint,
        name: username.value,
    };
    topPoints.push(point);
   
    topPoints.sort((a, b) => b.point - a.point); // For sorting from higher point to lower point 
    topPoints.splice(5); // For stopping score at max of 5 people

    localStorage.setItem('topPoint', JSON.stringify(topPoints));
    window.location.assign('/');
};
