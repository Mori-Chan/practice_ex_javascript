const startButton = document.getElementById('start');
startButton.addEventListener('click', start);

const endButton = document.getElementById('end');
endButton.addEventListener('click', end);

const flexChild = document.getElementsByClassName("flex-child");
let timer = document.getElementById('timer');
// let timer = document.getElementById('timer').value;

let flg = false;

let interval;

function start() {
  // let random = Math.floor( Math.random() * 24 ) + 1;
  flg = true;
  let randoms = [];
  let min = 1, max = flexChild.length + 1;

  for(let i = min; i < max; i++) {
    while(true) {
      let tmp = intRandom(min, max);
      if(!randoms.includes(tmp)) {
        randoms.push(tmp);
        // console.log(i);
        flexChild[i-1].innerHTML= tmp;
        break;
      }
    }
  }
  for(var i = 0; i < flexChild.length; i++){
    flexChild[i].addEventListener('click',function(){
      let num = parseInt(this.innerHTML);
      let elem = this;
      if(flg){
        if(randoms.includes(num) && (Math.min.apply(null, randoms) === num || randoms.length === 1)) {
          elem.style.background = 'blue';
          var idx = randoms.indexOf(num);
          if(idx >= 0){
            randoms.splice(idx, 1);
          }
        }
        if (randoms.length === 0) {
          clearInterval(interval);
          setTimeout(function(){
            alert(timer.value);
            for(let j = 0; j < flexChild.length; j++) {
              flexChild[j].style.background = 'aquamarine';
            }
            timer.value = updateTime(0);
            start();
          }, 10);
        }
      }
    },false);
  }

  const startTime = new Date().getTime();
  // timer.value = countUp(startTime);
  interval = setInterval( function() {
    timer.value = countUp(startTime);
  },10);
}

function intRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function countUp(startTime) {
  let elapsedTime = Date.now() - startTime;
  return updateTime(elapsedTime);
}

function updateTime(elapsedTime) {
  //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
  let m = Math.floor(elapsedTime / 60000);

  //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
  let s = Math.floor(elapsedTime % 60000 / 1000);

  //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
  let ms = elapsedTime % 1000;

  //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
  //javascriptでは文字列数列を連結すると文字列になる
  //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
  m = ('0' + m).slice(-1);
  s = ('0' + s).slice(-2);
  ms = ('0' + ms).slice(-2);

  return m + ':' + s + ':' + ms;
  // let time = m + ':' + s + ':' + ms;
  // console.log(time);
  // return time;
}

// function clickNum(number, randoms) {
//   if(number) {
//     let num = number.innerHTML;
//     if(num) {
//       if(randoms.includes(num)) {
//         num.style.background = 'bulue';
//       }
//     }
//   }
// }

function end() {
  if(flg){
    clearInterval(interval);
    for(let i = 0; i < flexChild.length; i++) {
      flexChild[i].innerHTML= '';
      flexChild[i].style.background = 'aquamarine';
    }
    timer.value = updateTime(0);
    // timer.value = '00:00:111';
    // console.log(timer.value);
  }
}
