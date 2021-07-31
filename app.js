"use strict";

const brewContainer = document.querySelector(".text-container");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const empty = document.querySelector(".empty");

const renderBrewery = (data) => {
  const html = `
    <h3>NAME: ${data.name}</h3>
    <h3>BREWERY TYPE: ${data.brewery_type}</h3>
    <h3>CITY: ${data.city}</h3>
    <h3>STATE: ${data.state}</h3>
    <h3>PHONE: ${data.phone}</h3>
    <h3>STREET: ${data.street}</h3>
    <h3>WEB ADDRESS: <a class= web href="${data.website_url}" target="_blank">${data.website_url}</a></h3>
      `;
  empty.replaceChildren();
  empty.style.opacity = 0.8;
  empty.insertAdjacentHTML("beforeend", html);
};

let keywords;

const breweryFinder = async function (keywords) {
  keywords = input.value;
  try {
    const getBrewery = await fetch(
      `https://api.openbrewerydb.org/breweries/search?query=${keywords}`
    );
    const data = await getBrewery.json();
    console.log(data);
    renderBrewery(data[0]);
  } catch (err) {
    console.error(`${err}`);
    alert(`Problem finding brewery. Please Try again.`);
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  breweryFinder(keywords);
});
