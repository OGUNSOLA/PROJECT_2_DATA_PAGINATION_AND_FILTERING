/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const div = document.querySelector('.page');
const studentUl = div.querySelector('ul');
const paginationUl = document.querySelector('ul.link-list');
const numOfButtons = Math.ceil(data.length / 9);
let search = document.getElementById('search');
const searchBtn = document.querySelector('.student-search button');
let found = [];
let numOfSearchButtons;
let pageButtonClicked;
let noResultMessage;






for (let i = 0; i < data.length; i++) {
   const studentLi = document.createElement('li');
   const photo = document.createElement('img');
   const studentDiv = document.createElement('div');
   const studentEmail = document.createElement('span');
   const studentName = document.createElement('h3');
   let joinedDate = document.createElement('span');
   const joinedDiv = document.createElement('div');

   photo.src = data[i].picture.medium;
   photo.className = 'avatar';
   photo.setAttribute('alt', "Profile Picture");
   let studentInfo = data[i].name.first + " " + data[i].name.last;
   studentName.textContent = studentInfo;
   studentEmail.textContent = data[i].email;
   let dateJoined = ` Joined ${data[i].registered.date}`;
   joinedDate.textContent = dateJoined;
   joinedDate.className = 'date';
   studentDiv.className = "student-details";
   studentDiv.appendChild(photo);
   studentDiv.appendChild(studentName);
   studentDiv.appendChild(studentEmail);
   joinedDiv.appendChild(joinedDate);
   joinedDiv.className = "joined-details";
   studentLi.appendChild(studentDiv);
   studentLi.appendChild(joinedDiv);
   studentLi.className = "student-item cf";
   studentUl.appendChild(studentLi);

}

 let list = document.querySelectorAll('.student-list li');

function addPagination(numOfButtons) {
   

   for (let i = 0; i < numOfButtons; i++) {
      const buttonLi = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = i + 1;
      btn.setAttribute('type', 'button');
      buttonLi.appendChild(btn);
      paginationUl.appendChild(buttonLi);
      
   }


   return (document.querySelectorAll("ul.link-list li"));
}

let theButtons = addPagination(numOfButtons);


paginationUl.addEventListener('click', (e) => {
   if (e.target.tagName == 'BUTTON') {
      for (let i = 0; i < theButtons.length; i++) {
         theButtons[i].firstElementChild.className = '';
      }
      e.target.className = 'active';
      pageButtonClicked = e.target;
      changeDisplay(pageButtonClicked);
   }

});


window.onload = (event) => {
   defaultDisplay(list);
};

function defaultDisplay(list){
  

   for (let i = 0; i < list.length; i++) {
      
      list[i].style.display = 'none';
   }
   for (let i = 0; i < 9; i++) {
      list[i].style.display = 'block';
   }

   theButtons[0].firstElementChild.className = 'active';
}

function changeDisplay(pageButtonClicked) {


   for (let i = 0; i < numOfButtons; i++) {
      if (pageButtonClicked.textContent == i + 1) {
         hideAll();
         for (let j = i * 9; j < (i * 9) + 9; j++) {
            if (list[j]) {
               list[j].style.display = 'block';
            }

         }
      }
   }


}

function hideAll() {
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
   }
}

// SEARCH SECTION 

search.addEventListener('keyup', () => {
   
   searchItem();
});

searchBtn.addEventListener('click', () => {
  
   searchItem();
});


const namesToCompare = document.querySelectorAll('.student-list h3');

function searchItem() {
   if(noResultMessage){
      noResultMessage.remove();
   }
  
   hideAll();
   found= [];
   const str = search.value.toLowerCase();
   for (let i = 0; i < namesToCompare.length; i++) {
      let strstr = namesToCompare[i].textContent.toLowerCase();
      

      if (strstr.includes(str)) {
         found.push(list[i]);         
      }
   }
   displaySeach();  
}



function displaySeach(){
 

   while(paginationUl.firstChild){
      paginationUl.removeChild(paginationUl.firstChild);
   }
   
   for (let i = 0; i < list.length; i++) {
      
      list[i].style.display = 'none';
   }

   let a;
   if(found.length >9){
      a =9;
   }
   else {
      a = found.length;
   }

   for (let i = 0; i < a; i++) {
      found[i].style.display = 'block';
   }

   if(found.length == 0){
      numOfSearchButtons = 1;
      noResultMessage = document.createElement('h1');
      noResultMessage.textContent = 'No Result';
      noResultMessage.className = 'noResult';
      div.insertBefore(noResultMessage,studentUl);
      //document.getElementsByTagName('header')[0].appendChild(noResultMessage);

   }else {
      numOfSearchButtons= Math.ceil(found.length / 9);
   }
   

   for (let i = 0; i < numOfSearchButtons; i++) {
      const buttonLi = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = i + 1;
      btn.setAttribute('type', 'button');
      buttonLi.appendChild(btn);
      paginationUl.appendChild(buttonLi);
      
   }
   console.log(paginationUl);
   paginationUl.firstElementChild.firstElementChild.className = 'active';

}
