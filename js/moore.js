var states = [];
var inputAlphabet = [];
var stateLenght;
function create(){

  if(document.getElementById('stateLenght').value!="" && document.getElementById('inputAlphabet').value!="" && document.getElementById('outputAlphabet').value!=""){
      document.getElementById('step-2').style.display = "block";
      stateLenght = document.getElementById('stateLenght').value;
       inputAlphabet = document.getElementById('inputAlphabet').value.split(',');
      var outputAlphabet = document.getElementById('outputAlphabet').value.split(',');

      //Option create Input State value
      var selectForm = document.getElementById('step2-form');

      for (var i = 0; i < stateLenght; i++) {
          var select = document.createElement('select');

          states[i] = "q"+i;
          for (var j = 0; j < outputAlphabet.length; j++) {
            var option = document.createElement('option');
            option.value = outputAlphabet[j];
            option.innerText = outputAlphabet[j];
            select.appendChild(option);
          }
          select.setAttribute("id",states[i]);
          var label = document.createElement('label');
          label.innerText = states[i] + " value : ";
          var br = document.createElement('br');
          selectForm.appendChild(label);
          selectForm.appendChild(select);
          selectForm.appendChild(br);
      }
      var button = document.createElement('input');
      button.setAttribute("onclick","confirmValue();");
      button.setAttribute("type","button");
      button.value = "Confirm State Value";
      selectForm.appendChild(button);
  }else{
    alert("WARNING! There are empty spaces!");
  }
}
var stateValues = [];
function confirmValue(){
    for (var i = 0; i < states.length; i++) {
        stateValues[states[i]] = document.getElementById(states[i]).value;
    }
    document.getElementById('step-3').style.display = "block";
    var oldStateSelect = document.getElementById('oldState');
    var inputValueSelect = document.getElementById('inputValue');
    var newStateSelect = document.getElementById('newState');
    for (var i = 0; i < states.length; i++) {
      var optionOld = document.createElement('option');
      var optionNew = document.createElement('option');
      optionOld.value = states[i];
      optionNew.value = states[i];
      optionOld.innerText = states[i];
      optionNew.innerText = states[i];
      oldStateSelect.appendChild(optionOld);
      newStateSelect.appendChild(optionNew);
    }
    for (var i = 0; i < inputAlphabet.length; i++) {
      var option = document.createElement('option');
      option.value = inputAlphabet[i];
      option.innerText = inputAlphabet[i];
      inputValueSelect.appendChild(option);
    }

}
function addTable(){
      document.getElementById('tableDiv').style.display = 'block';
      var oldState = document.getElementById('oldState').value;
      var inputValue = document.getElementById('inputValue').value;
      var newState = document.getElementById('newState').value;
      var array = [oldState,inputValue,newState];

      //Table create
      var count = document.getElementById('listTable').rows.length;
      //check unique state
      if(count > 1){
          var result = check(oldState,inputValue,count);
          if(result == 0){
                return alert("There mustn't be more than one state.");
          }
      }
      var table = document.getElementById('listTable');
      var tr = document.createElement('tr');
        for (var i=0;i<3;i++) {
            var td = document.createElement('td');
            td.value = array[i];
            if(i!=1){
              td.innerHTML = array[i]+"\/"+stateValues[array[i]];
            }else {
              td.innerHTML = array[i];
            }
            tr.appendChild(td);
        }
        tr.setAttribute("id",array[0]+array[1]);
        table.appendChild(tr);
}
function check(state,letter,count){
    for (var i = 1; i < count; i++) {
      var row = document.getElementById('listTable').rows[i].cells;
      if(row[0].value==state && row[1].value==letter)
          return 0;
    }
    return 1;
}
var nowState,resultOutput = "";
function searchTable(){
      var word = document.getElementById('searchWord').value;
      var divList = document.getElementById('divList');
      var ul = document.createElement('ul');
      var output = "";
      nowState = "q0";
      resultOutput = stateValues[nowState];
      for (var i = 0; i < word.length; i++) {
          output = outputResult(word.charAt(i),nowState);
          var li = document.createElement('li');
          li.innerText = output;
          ul.appendChild(li);
      }
      var resultHeader = document.createElement('h3');
      resultHeader.innerText = word + " , " + resultOutput;
      divList.appendChild(resultHeader);
      divList.appendChild(ul);
}
function outputResult(char,nState){
    var row = document.getElementById('listTable').rows.namedItem(nState+char).cells;
    nowState = row[2].value;
    resultOutput += stateValues[nowState];
    var rtrn ="Old state "+row[0].value+" input "+row[1].value+" ----------> output "+stateValues[nowState]+" new state "+row[2].value;
    return rtrn;
}
