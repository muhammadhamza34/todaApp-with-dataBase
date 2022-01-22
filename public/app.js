
const firebaseConfig = {
  apiKey: "AIzaSyD9Kin5A4T6SYh4Euy24H-DZ4qEfPNKdjo",
  authDomain: "todoapp-firebase-333e8.firebaseapp.com",
  projectId: "todoapp-firebase-333e8",
  storageBucket: "todoapp-firebase-333e8.appspot.com",
  messagingSenderId: "761194472679",
  appId: "1:761194472679:web:1e80a3f906184952152e42",
  measurementId: "G-L802VWVEWB"
  };

  var app = firebase.initializeApp(firebaseConfig);

var listBox = document.getElementById('listBox')

function addTodo(){
   var val = document.getElementById('todo').value;
var obj={
    values:val,
    edit:false
}
   app.database().ref('/').child('todos').push(obj)
   .then(function(success){
console.log(success,'success')
   })
   .catch(function(err){
console.log(err,'err')
   })
   
}

app.database().ref('/todos').on("child_added",function(data){
console.log(data.val(),data.key)

var li = document.createElement("li");
li.setAttribute("class","listyle");
var liTxt = document.createTextNode(data.val().values);
li.appendChild(liTxt);


var editBtn = document.createElement("button")
var editBtnTxt = document.createTextNode("EDIT");
editBtn.setAttribute("class", "stylebtn");
editBtn.setAttribute("onclick", "editList(this)");
editBtn.setAttribute("id" , data.key)
editBtn.appendChild(editBtnTxt)
li.appendChild(editBtn)


var delBtn = document.createElement("button")
var delBtnTxt = document.createTextNode("DEL")
delBtn.setAttribute("class", "stylebtn");
delBtn.setAttribute("onclick", "delList(this)")
delBtn.setAttribute("id" , data.key)
delBtn.appendChild(delBtnTxt)
li.appendChild(delBtn)
listBox.appendChild(li)

})


function delAll(){
    listBox.innerHTML = ""
    app.database().ref("/todos").remove()

}

function editList(e){
    var litxt = e.parentNode.firstChild.nodeValue
console.log(litxt,'litxt');
var editLiTxt = prompt("EDIT TODO" , litxt )
console.log(editLiTxt);
e.parentNode.firstChild.nodeValue = editLiTxt;
console.log(e.id,'e.id')

app.database().ref(`/todos/${e.id}`).update({values:editLiTxt})
.then(function(success){
    console.log(success,'success')
       })
       .catch(function(err){
    console.log(err,'err')
       })
}
function delList(e){
    console.log(e.parentNode)
    e.parentNode.remove()
    app.database().ref("todos").child(e.id).remove()
}