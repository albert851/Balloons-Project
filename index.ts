
let score = 0;
let YPoint = 850;
let balloonsIndex = 0;
let remainingLives = 3;
let sound1 = new Audio("./pop.mp3");
let sound2 = new Audio("./gameOver.mp3");
let music = new Audio("./tarata.mp3")
let playElement = document.querySelector('.start-btn')!
let scoreElement = document.querySelector('#score-count')!
let liveElement = document.querySelector('#live-count')!
let canvasElement = document.querySelector('.canvas')!
let balloonArr:HTMLDivElement[] = []

let generateRandomXPos = function(){
    return Math.floor(Math.random() * 90);
};

let newBalloon = () => {

  console.log(remainingLives)
  console.log(score)

  let positionX = generateRandomXPos();
  let el = document.createElement('img');
  el.setAttribute("src", "./balloon.png");
  let newYPoint = YPoint;
  el.className = 'balloon';
  el.style.left = positionX +'%';
  el.style.top = newYPoint.toString()+"px";
  balloonArr[balloonsIndex] = el;
  balloonsIndex++

  canvasElement.appendChild(el);

  let newPositionX = Math.round(Math.random()*2)
  let newX = positionX

  let topUpdate = setInterval(function() {

    if(newPositionX == 1){
      if(el.style.left.toString() < "0%")
        newPositionX = 2
      else newX -= 0.1
      el.style.left = newX+"%";
    }
    if(newPositionX == 2){
      if(el.style.left.toString() > "90%")
        newPositionX = 1
      else newX += 0.1
      el.style.left = newX+"%";
    }

    newYPoint--
    el.style.top = newYPoint.toString()+"px";

    if(remainingLives == 0){

      el.remove()

      music.pause()
      sound2.play()

      playElement.textContent = "Game Over!"

      playElement.style.display = "inline"
      playElement.style.left = "45%"

      clearInterval(topUpdate)
      
    }

    if(el.style.top.toString() == "400px")
      if(el.style.display.toString() != "none")
        newBalloon()

    if(el.style.top.toString() == "-60px"){
      if(el.style.display.toString() != "none"){
        el.remove()
        remainingLives --
        liveElement.textContent = remainingLives.toString()
        newBalloon()
      } 
    }

    el.onclick = function(){
      sound1.play()
      score ++
      el.style.display = "none";
      scoreElement.textContent = score.toString()
      newBalloon()
    };
    
  }, 10);
  
}

playElement.addEventListener("click", () => {
  playElement.style.display = "none";
  
  score = 0
  remainingLives = 3

  scoreElement.textContent = score.toString()
  liveElement.textContent = remainingLives.toString()

  newBalloon()
  music.currentTime = 0
  music.play()
})