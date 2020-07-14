     
    function showDate() {
        const  showday      = document.querySelector("#showDate");

        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = [
            'January',  'February',
            'March',    'April',
            'May',      'June',
            'July',     'August',
            'September','October',
            'November', 'December'
        ];
        //this should get the date.
        const date = new Date( );
        let day     = days[ date.getDay() ];
        let month   = months[ date.getMonth() ];
        let year    = date.getFullYear();
        let todate  = date.getDate();
            //  whole day format. 
        let tdate =  day + " " + todate + " " +  month + ", " + year;
        showday.innerHTML =tdate;
    }

    showDate();
    let h;
    let m;
    let s;
    let sd;

    function showClock() {
        const  hour         = document.querySelector("#hour");
        const  minute       = document.querySelector("#minutes");
        const  second       = document.querySelector("#seconds");
        const  section      = document.querySelector("#section");

        const date = new Date( );
        h    = date.getHours();
        m    = date.getMinutes();
        s    = date.getSeconds();
        sd   =  'am';
        // to set to 12 hours clock.
        if(h > 12) {
            h = h - 12;
            sd = 'pm';
        }
        // to fix the single digit.
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        hour.innerHTML = h;
        minute.innerHTML = m;
        second.innerHTML = s;
        section.innerHTML =sd;

        setTimeout(showClock, 1000);
    }
    showClock()
    
   
    let showError = document.querySelector("#error-message");
    let schduleObject = {};

    function checkDetail() {
        let  timeChoice          = document.querySelector("#time-choice").value;
        let  foodChoice          = document.querySelector("#food-choice").value;
        let  foodSectionChoice   = document.querySelector("#food-section-choice").value;
        var re = /^[A-Za-z]+$/;
        if(!timeChoice || !foodChoice || !foodSectionChoice ){
            setErrorMesage(showError, 'Incomplete input');
            return false;
        }
        if(timeChoice.length > 2){
            setErrorMesage(showError, 'invalid time');
            return false;
        }
        if(timeChoice < 1 || timeChoice > 12){
            setErrorMesage(showError, 'time should be between 1 and 12');
            return false;
        }
        if(!re.test(foodChoice)){
            setErrorMesage(showError, 'invalid food name');
            return false;
        }
        else{
            setSuccessMesage(showError, 'added successfully');
            return true;
        }
    }
    function setErrorMesage(showError, message){
        showError.innerHTML = message;
        showError.className = "error h5";
    }
    function setSuccessMesage(showError, message){
        showError.innerHTML = message;
        showError.className = "success h5";
    }
    
    function init() {
        document.querySelector("#table-body").innerHTML = ''
        if(localStorage.foodStorage){
            schduleObject = JSON.parse(localStorage.foodStorage)
            for (let index in schduleObject){
                let  foodSectionChoice   = schduleObject[index].foodsectionchoice;
                let  foodChoice          = schduleObject[index].foodchoice;
                let  sectionChoice       = schduleObject[index].sectionchoice;
                let  timeChoice          = schduleObject[index].timechoice;
                
                tableCellData(timeChoice, sectionChoice, foodSectionChoice, foodChoice);
                showImage(timeChoice, sectionChoice, foodChoice, foodSectionChoice);
            }
        }
    }

    var myindex = 0;
    function addToSchdule() {
        let  foodSectionChoice   = document.querySelector("#food-section-choice").value;
        let  foodChoice          = document.querySelector("#food-choice").value;
        let  sectionChoice       = document.querySelector("#section-choice").value;
        let  timeChoice          = document.querySelector("#time-choice").value;

        let schduleObj = { timechoice: timeChoice, sectionchoice: sectionChoice, foodchoice: foodChoice, foodsectionchoice: foodSectionChoice, };
        schduleObject[myindex]=schduleObj
        localStorage.foodStorage = JSON.stringify(schduleObject)
        tableCellData(timeChoice, sectionChoice, foodSectionChoice, foodChoice);
        document.querySelector("#food-choice").value = '';
        document.querySelector("#section-choice").selectIndex = 0;
        // showImage(timeChoice, sectionChoice, foodChoice, foodSectionChoice);
        // console.log('addtoshc', timeChoice, sectionChoice, foodChoice, foodSectionChoice);
    }

    function tableCellData(timeChoice, sectionChoice, foodChoice, foodSectionChoice){
        let tableBody = document.querySelector("#table-body");
        let tableRow = tableBody.insertRow();
        let firstCell = tableRow.insertCell(0);
        let secondCell = tableRow.insertCell(1);
        let thirdCell = tableRow.insertCell(2);
        let forthCell = tableRow.insertCell(3);

        tableRow.id=myindex

        firstCell.innerHTML     = foodSectionChoice;
        secondCell.innerHTML    = foodChoice;
        thirdCell.innerHTML     = timeChoice + sectionChoice;
        forthCell.innerHTML     = `<button onclick="deleteRow(${myindex})"; class="delete-button">Delete</button>`;
        myindex = myindex + 1;
        showImage(timeChoice, sectionChoice, foodChoice, foodSectionChoice);
        console.log('tableCell', timeChoice, sectionChoice, foodChoice, foodSectionChoice);
    }

    function showImage(timeChoice, sectionChoice, foodSectionChoice , foodChoice) {
        const  image        = document.querySelector("#food-image");
        const  foodsec      = document.querySelector("#food-section");
        const  choiceFood      = document.querySelector("#choicefood");
        console.log('showImage suuu', timeChoice, sectionChoice, foodSectionChoice  , foodChoice, );
        // image setup
        image.style.backgroundImage = "url('images/main.jpg')";
        foodt = '';
        foods = '';
        let isTime = (h == timeChoice && sd == sectionChoice) ;
        let theMessage = (foodt = foodSectionChoice + ' time') && (foods = 'Currently eating ' + foodChoice);
        (isTime) && (sd == 'am') && (image.style.backgroundImage = "url('images/food.jpg')")  ? theMessage : '';
        (isTime) && (sd == 'pm') && (image.style.backgroundImage = "url('images/food1.jpg')")  ? theMessage : '';
        (isTime) && (sd == 'pm' && timeChoice > 7) && (image.style.backgroundImage = "url('images/food2.jpg')")  ? theMessage : '';

        foodsec.innerHTML = foodt;
        choiceFood.innerHTML = foods;
    }

    function deleteRow(rowid)  {  
        var row = document.getElementById(rowid);
        row.parentNode.removeChild(row);
        delete schduleObject[rowid]
        localStorage.foodStorage = JSON.stringify(schduleObject);
    }

    function addClick (event) {
        event.preventDefault();
        if (checkDetail()){
            addToSchdule();
        };
     }

     function clearStrorage() {
         localStorage.clear(location.foodStorage);
         location.reload()
     }
     function removeAdd(event) {
        event.preventDefault();
         clearStrorage()
     }