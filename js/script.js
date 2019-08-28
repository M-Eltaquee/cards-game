$(document).ready(function(){
    
    // randomize array of numbers method will be used later to sort the array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

                    // First Stage : recieving difficulty of game  and store it at local storage

                    //recieving array length that = level difficulty    
    $('#selLevel').on('input', function(){
        localStorage.setItem('level', $('#selLevel').val())
        location.reload();    
    });
    level = localStorage.getItem('level') ;
                    //choosen option is kept selected
    $( `#selLevel option[value=${level}]` ).attr("selected","selected");

    // we set fill numbers array using random method
    var numbers = [];
    for(var j = 1; j <= level/2; j++){
        numbers.push(j)
    }
    for(var j = 1; j <= level/2; j++){
        numbers.push(j)
    }
    shuffle(numbers);

                            // Second: sorting cards and start button 

var card_board = $('#card_board')
for(var i= 0; i < numbers.length; i++){
    var card =  `
    <div class="card_holder bg-dark col-lg-3 col-md-4 col-sm-6 rounded">
        <div class="card" value=${numbers[i]}>
            <div class="back"></div>
            <div class="front">${numbers[i]}</div>
        </div>
    </div> 
    `
    $(card_board).append(card);  
}
                            // start button function that include removing overlay and start timer
var secs;
var mins;
var s=0;
var m=0;
start= function(){
    $('.overlay').slideUp();
    $('#hl p').removeClass('mt-2').addClass('mt-4')

    // seconds timer
    
    secs = setInterval(function(){
        s++
        if(s<10){
            s = '0'+s
        }else if(s>59){
            return s = 0
        }
        $('.timer div:last').text(s)
    },1000)
    // minutes timer

    mins = setInterval(function(){
        m++

        if(m<10){
            m = '0'+m
        }else if(m>59){
            return m =0
        }
        $('.timer div:first').text(m)
    },60000)
    $('#start button').fadeOut();
}

                            // Third: Game Logic
                            
                                //on each click on card
$('.card').on('click', function()
{
    //open the card
    if( !$(this).hasClass('rotated')){
        $(this).addClass('rotated');

    }
    //close the card if its open
    else if( $(this).hasClass('rotated')){
        $(this).removeClass('rotated');
        
    }
        //if two cards are open -- game logic
        if( $('.card').is($('.rotated:eq(1)')) ){

            //if two cards have same value
            setTimeout(function(){

                if( parseInt( $('.rotated:eq(0)').attr('value') ) == parseInt( $('.rotated:eq(1)').attr('value') ) )
                {       
                        $('.rotated:eq(0), .rotated:eq(1)').removeClass('rotated').addClass('hidden');
                       
                        //all cards matched
                        if( $('.card').is($(`.hidden:eq(${parseInt(level)-1})`)) ){
                            
                            clearInterval(secs);
                            clearInterval(mins);
                            $('#win').show().addClass('congrats')
                        }                
                }
                else{
            // if two cards dont have same value
                        $('.rotated:eq(0),.rotated:eq(1)').removeClass('rotated')                             
                }
            },500 )
                
        }
            
    });
                        // reset button function 
$('.reset').on('click', function(){
    $('.card').removeClass('hidden');
    $('.card').removeClass('rotated') ;
    $('#start button').fadeIn();
    $('.overlay').slideDown().text('');
    $('#hl p').removeClass('mt-4').addClass('mt-2')
    if(secs){
        clearInterval(secs);
    }
    if(mins){
        clearInterval(mins);
    }
    $('.timer div:first').text('00')
    $('.timer div:last').text('00')
    $('#win').hide().removeClass('congrats')
    })

})