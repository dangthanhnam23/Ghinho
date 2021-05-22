
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; 
const recognition = new SpeechRecognition(); 
const mic = document.querySelector(".mic");
const input  = document.querySelector(".input");
const chat = document.querySelector(".chat");
const texts = document.querySelector(".text");
let textend = "";
let recognittionstart = 0; 
var recognittionarr = []; 
var save = localStorage.getItem("save");
const workmic = document.querySelector(".Workmic");
const w3review = document.querySelector("#w3review");
recognition.lang = 'vi-VI';
recognition.continuous = false; 
function savedata(text , content) {
    w3review.innerText = text;
    var savefile = textend.indexOf("lưu trên");
    var searchfile = textend.indexOf("tìm kiếm trên");
if(savefile > 0) {
    var stringslice = textend.slice(savefile + 9, textend.length);
    var textcontent = textend.slice(0 , savefile);
    var getdata = JSON.parse(localStorage.getItem(stringslice));
    createData(stringslice , textcontent , getdata)
}
if(searchfile > 0) {
    var stringslice = textend.slice(searchfile +  14, textend.length);
    var textcontent = textend.slice(0 , searchfile - 1);
    var getdata = JSON.parse(localStorage.getItem(stringslice));
    searchData(stringslice ,textcontent, getdata)
}
}
function createData (stringslice ,textcontent , getdata  ) {
    if(getdata) {
        getdata.push(textcontent + stringslice);
        localStorage.setItem(stringslice  , JSON.stringify(getdata));
        loadall();
    }else {
       localStorage.setItem(stringslice  , JSON.stringify(recognittionarr));
       recognittionarr.push(textcontent);
       localStorage.setItem(stringslice  , JSON.stringify(recognittionarr));
       var save = JSON.parse(localStorage.getItem("save"));
       save.push(stringslice);
       localStorage.setItem("save" , JSON.stringify(save));
       loadall(save);
    }
    giongnoi("Đã lưu một thư mục ở " + stringslice);
    textend = "";
    texts.innerText = "Không Có"; 
}
function searchData(stringslice , textcontent , getdata) {
var array = [];
if(getdata == null) {
    giongnoi("Không có dư liệu ");
}else {
  getdata.map((item) => {
     item.indexOf(textcontent) > -1 ? array.push(item) : "";
  });
  loaddata(array);
 }
}
function loadall(save , stringslice) {
   var save = JSON.parse(localStorage.getItem("save"));
   var array = [];
   save.map((item) => {
     var getitem = JSON.parse(localStorage.getItem(item));
     getitem.map((items) => {
        array.push(items);
     })
   })
   loaddata(array , "all");
}
function loaddata(array , string) {
   var ketqua =document.querySelector(".return");
   html = ""; 
   array.map((item , index) => {
     html += "<p class ='contenttext'>"+ array[index] +"</p>";
   })
   ketqua.innerHTML = html;
   textend += "";
   if(string != "all") {
    docketqua();
   }
}
function docketqua(text) {
  var length =  document.querySelectorAll(".contenttext");
  console.log(length);
  if(typeof text == "number") {
    var content =  length[text].innerHTML;
    giongnoi(content);
   return; 
  }else if(text == "tất cả") {
    var i = 0;
    setInterval(() => {
        console.log(i);
        if(i != length.length ) {
        giongnoi(length[i].innerHTML); 
        i++;
    }
    }, 2000);
  }else {
    giongnoi("Có " +  length.length + "Phần Tử Bạn muốn đọc phần tử nào");
    textend = "";
    setTimeout(() => {
        mic.click();
    }, 1500);
  }
}
function giongnoi(text) {
    responsiveVoice.setDefaultVoice("Vietnamese Female");
    responsiveVoice.speak(text);
}
input.onclick = (e) => {
    textend = "";
    var value =  w3review.value;
    laytext(value);
}
mic.onclick = (e) => {
    textend = "";
    recognition.start();
    workmic.innerText  = "Đang Hoạt Động - Hãy nói gì đó";
}
recognition.onspeechend = () => {
    recognition.stop();
    workmic.innerHTML  = "Không Hoạt Động";
}
recognition.onerror = (err) => {
    console.log(err);
}
recognition.onresult = (e) => {
    let text = e.results[0][0].transcript;
    laytext(text);
};
    var screen = screen.availWidth; 
    if(screen < 1000) {
     document.querySelector("#w3review").innerText = "";
    }
console.log(screen);
document.querySelector("#w3review").addEventListener("change", mobileAI );
function mobileAI() {
    var x =  document.querySelector("#checkbox");
    value = w3review.value;
    if(x.checked == true) {
      laytext(value);
    }
}
function laytext (text) {
    switch (text) {
        case "một":
         text = 1;
         docketqua(text);
         break
        case "hai":
         text = 2;  
         docketqua(text);
         break
        case "ba":
         text = 3;
         docketqua(text);
         break
        case "bốn":
         text = 4;
         docketqua(text);
         break
        case "năm":
         text = 5;
         docketqua(text);
         break
        case "sáu":
         text = 6;
         docketqua(text);
         break
        case "bảy":
         text = 7;
         docketqua(text);
         break
        case "tám":
         text = 8;
         docketqua(text);
         break
        case "chín": 
         text = 9;
         docketqua(text);
         break
         case "tất cả": 
         docketqua(text);
         break
    case "rồi":
        savedata(textend);
          break;
    case "hủy bỏ":
        textend = "";
        texts.innerText = textend;
        giongnoi("đã hủy bỏ thành công");
        setTimeout(() => {
            recognition.start();
         }, 500);
          break;
     default:
        textend += text;
        giongnoi("Câu Này Đã Hoàn Thành Chưa");
        chat.innerText = "Câu Này Đã Hoàn Thành Chưa";
        texts.innerText = textend;
        setTimeout(() => {
            recognition.start();
           }, 500);
          break;
      }
}
if(!save) { 
    var array = [];
    localStorage.setItem("save" , JSON.stringify(array));
}
loadall();
