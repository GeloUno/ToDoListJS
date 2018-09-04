const toDoList = document.querySelector('#to-do-list');
const addToDoForm = document.querySelector('#add-to-do-form');
/*
create element li from db and render this element
*/

function createToDoListLi(el) {
    let li = document.createElement('li');
    let title = document.createElement('span');
    let description = document.createElement('span');
    let cross = document.createElement('button');

    li.setAttribute('id', el.id);
    title.textContent = el.data().title;
    description.textContent = el.data().description;
    cross.textContent = 'Delete';

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(cross);
    toDoList.appendChild(li);

    // delete function from evenlistener click button 

    cross.addEventListener('click', e => {
      //  e.stopPropagation();
        console.log(e.target.parentElement.getAttribute('id'));
        let id = e.target.parentElement.getAttribute('id');
        db.collection('todoList').doc(id).delete().then(()=>{
        //    console.log("Delete: " + id);
        });
    })
}
// geting data from FireBase
// db.collection('todoList').get().then((snapshot) => {
//     snapshot.docs.forEach(element => {
//         console.log(element.data())
//         createToDoListLi(element);
//     });
// })
// seting data to FireBase

addToDoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if ((addToDoForm.title.value != '') && (addToDoForm.description.value != '')) {
        // add colection to the FireBase
        db.collection('todoList').add({
            title: addToDoForm.title.value,
            description: addToDoForm.description.value

        });
    }
    addToDoForm.title.value = '';
    addToDoForm.description.value = '';

});

db.collection('todoList').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
  //  console.log(changes);
    changes.forEach(element => {
      //  console.log(element);
        if(element.type =='added'){
         //   console.log(element.doc.data());
            createToDoListLi(element.doc);
        }
        else if(element.type =='removed'){
          //  console.log(element.doc.id);
            let id = toDoList.querySelector('[id='+ element.doc.id +']');
          //  console.log("removed"+id);
            toDoList.removeChild(id);
        }
    });
    
})