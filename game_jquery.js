var playing = false;
var score;
var trialsleft;
var step;//for random steps
var action;//for settime interval
var audio1 = new Audio("audio/knife1.mp3");
var audio2 = new Audio("audio/knife2.mp3");
var emojis = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];//for emojis

$(function(){
    //click on start or reset button
    $('#front').show();
    $("#startReset").click(function () {
        if(playing == true){
            //if we are playing
            location.reload();//reload page
        }else{
            //if we are not playing from before
            $('#front').hide();
            $('#score').show();
            playing = true;
            //set score to 0
            score = 0;
            $("#scoreValue").html(score);

            //show trials left box
           
            $('#trialsleft').show();
            trialsleft=3;
            addhearts();
    
            //hide game over box
            $('#gameOver').hide();
    
            //change button to reset game
            $('#startReset').html('Reset Game')
    
            
            //start action
            startAction();
        }
    });
        //slice a emoji
        $("#emoji1").mouseover(function () { 
            score++;// increase score
            $("#scoreValue").html(score);

            //play sound
            if(score % 2) audio1.play();
            else audio2.play();

            //stop emoji
            clearInterval(action);

            //hide emoji
            $('#emoji1').hide("explode",500);//slice emoji

            //send new emoji
            setTimeout(startAction,500);
        });
     

  //functions

   //addhearts
   function addhearts() {
    $('#trialsleft').empty();
    for(i = 0 ; i < trialsleft ; i++){
        $('#trialsleft').append('<img src="images/wrong.png" , class="life">');
    }
}

  //start action
  function startAction(){
      //generate random emoji
      $('#emoji1').show();

      //choose random emoji
      chooseRandom();
      //random position
      $('#emoji1').css({
          'left': Math.round(550 * Math.random()),
          'top': -50
      });
      //generate random step
      step=1 + Math.round(5 * Math.random());//change steps
      //descend emojis down by 10ms
      action = setInterval(function(){
          //move emoji by one step
          $('#emoji1').css('top', $('#emoji1').position().top + step);

          //check if the emoji is too low
          if($('#emoji1').position().top > $('#emojicontainer').height()-50){
              //yes it is low
              // check trails left
              if(trialsleft > 1){
                  //generate a emoji
                  $("#emoji1").show();
                  //choose random emoji
                  chooseRandom();
                  //random position
                  $('#emoji1').css({
                      'left': Math.round(550 * Math.random()),
                      'top': -50
                  });
                  //generate random step
                  step= 1 + Math.round(5 * Math.random());//change steps
                  
                  //reduce trials by one
                  trialsleft--;
                  //populate trails left box by one
                  addhearts();

              }else{
                  //game over
                  playing=false;//we are ot playing any more
                  $("#score").hide();
                  $('#startreset').html('Start Game');
                  $('#gameOver').show();
                  $('#gameOver').html('<p>Game Over!</p><p>Your score is '+ score + '</p>');
                  $('#trialsleft').hide();
                  stopAction();//stops Action
              }
          }
      },10);
  }

 
  //choose random emojis
  function chooseRandom(){
      $('#emoji1').attr('src','images/' + emojis[Math.round(9*Math.random())]+'.png');
  }

 
   // Stop Action
   function stopAction(){
    clearInterval(action);
    $('#emoji1').hide();
}



});
