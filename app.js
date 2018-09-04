
   toDoList = document.querySelector('#to-do-list');

   /*
   create element li from db and render this element
   */
   
   function createToDoListLi(el){
       let li = document.createElement('li');
       let title =document.createElement('span');
       let description =document.createElement('span');
   
       li.setAttribute('id',el.id);
       title.textContent = el.data().title;
       description.textContent = el.data().description;
   
       li.appendChild(title);
       li.appendChild(description);
        toDoList.appendChild(li);
   }
   
       db.collection('todoList').get().then((snapshot)=>{
       snapshot.docs.forEach(element => {
            console.log(element.data())
           createToDoListLi(element);
       });
   })
   