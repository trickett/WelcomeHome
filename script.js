var buttApplication = angular.module("buttApplication", []);

var buttController = buttApplication.controller("buttController",
    function($scope){
        $scope.counter=0;
        $scope.increment = function(i){
            $scope.counter += i;
        }

        //List for continue vs option buttons:
        var butts=[2,1,0,1,0,0,0,0,1,1,1,0,0,1,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0];
        var ch1=['s',2,3,4,5,0,7,0,9,10,11,12,3,14,15,7,3,7,19,7,22,7,25,24,7,26,24,29,24,30,7];
        var ch2=['s',8,3,6,5,0,7,0,18,12,13,12,3,17,16,7,3,7,20,7,21,7,23,24,7,27,24,28,24,30,7];

        var screen=document.getElementById("screen");
        var picture=document.getElementById("picture");
        var story=document.getElementById("story");

        var back=document.getElementById("back");
        var opt1=document.getElementById("opt1");
        var opt2=document.getElementById("opt2");

        $scope.nextScreen = function(opt){
            var goTo=0;
            if (opt=='back'){
                if (screen.className != "s"){
                    //parse out last screen
                    var hold=screen.className.split(',');
                    hold.pop();
                    //update screen path to remove current
                    screen.className=hold+'';
                    //switch to that
                    var backTo=hold.pop();
                    if (backTo=='s'){
                	    $scope.increment(1);
                        counterShow(1);
                    } else {
                        counterShow(0);
                    }
                    console.log(backTo);
                    story.className='s'+backTo;
                    $scope.story=storyContent[backTo];
                    $scope.option1=optionsContent[backTo];
                    $scope.option2=optionsContent2[backTo];
                    buttonReset(backTo);
                } else {
                    goTo='s';
                    var backTo='s';
                    buttonReset(0);
                    $scope.story=storyContent[0];
                    $scope.option1=optionsContent[0];
                    $scope.option2=optionsContent2[0];
                    counterShow(1);
                }
                if (backTo == 2 || backTo==27){
                    var useI="url('images/"+backTo+".gif')";
                } else {
                    var useI="url('images/"+backTo+".jpg')";
                }
                picture.style.backgroundImage=useI;
            } else {
                //find next move
                //  current state:
                var hold=screen.className.split(',');
                var curS=hold.pop();
                if (curS=='s'){
                    goTo=1;
                    counterShow(0);
                } else {
                    if (opt=='opt1'){
                        goTo=ch1[curS];
                    } else {
                        goTo=ch2[curS];
                    }
                }
                //switch to next
                story.className='s'+goTo;
                $scope.story=storyContent[goTo];
                $scope.option1=optionsContent[goTo];
                $scope.option2=optionsContent2[goTo];
                //update screen path
                if(curS != 0){
                    screen.className=screen.className+','+goTo;
                } else {
                    screen.className='s';
                    counterShow(1);
                }
                if (goTo == 2 || goTo==27){
                    var useI="url('images/"+goTo+".gif')";
                } else {
                    var useI="url('images/"+goTo+".jpg')";
                }
                picture.style.backgroundImage=useI;
                buttonReset(goTo);
            }
            function buttonReset(state){
                if (butts[state]==1){
	                opt1.innerHTML="Option 1";
	                opt2.innerHTML="Option 2";
                    $scope.do="What do you do?";
                } else if (butts[state]==2){
                    opt1.innerHTML="Start Over";
                    opt2.innerHTML="Start Over";
                    $scope.do="";
                    $scope.increment(1);
                } else {
	                opt1.innerHTML="Continue";
	                opt2.innerHTML="Continue";
                    $scope.do="";
                }
            };
            function counterShow(i){
                if (i==1){
                    document.getElementById("counter").style.visibility='visible';
                    document.getElementById("counter").style.height='18px';
                } else {
                    document.getElementById("counter").style.visibility='hidden';
                    document.getElementById("counter").style.height='0px';
                }
            }
        }
    });