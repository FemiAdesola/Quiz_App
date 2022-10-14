'use strict';

const username = document.getElementById('username');
const savePointBtn = document.getElementById('savePointBtn');
const finalPoint = document.getElementById('finalPoint');
const RecentPoint = localStorage.getItem('RecentPoint');
finalPoint.innerText = `Total Point: ${RecentPoint}`;

username.addEventListener('keyup', () => {
    savePointBtn.disabled = !username.value;
});

const saveTopPoint = (e) => {
    e.preventDefault();
};
