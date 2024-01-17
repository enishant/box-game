var boxgame = {
    init: function() {
        this.btn_start = document.getElementById('btn_start');
        this.btn_pause = document.getElementById('btn_pause');
        this.btn_reset = document.getElementById('btn_reset');
        this.box_container = document.getElementById('box-game-container');
        this.box = document.getElementById('box');
        this.interval = 0;
        this.move_duration = 5;
        this.game_state = 'NOT_STARTED';
        this.scorecard = {
            box_container: 0,
            box: 0,
        };
        boxgame.update_score();
        this.btn_start.addEventListener('click',this.start_game);
        this.btn_pause.addEventListener('click',this.pause_game);
        this.btn_reset.addEventListener('click',this.reset_game);
        this.box_container.addEventListener('click',this.box_container_click);
        this.box.addEventListener('click',this.box_click);

        boxgame.box.style.display = 'none';
    },
    start_game: function() {
        boxgame.btn_start.style.background = '#ccc';
        boxgame.btn_start.style.color = '#fff';
        boxgame.btn_start.style.pointerEvents = 'none';
        if(boxgame.game_state == 'pause') {
            boxgame.game_state = 'active';
            boxgame.btn_pause.style.background = '#fff';
            boxgame.btn_pause.style.color = '#000';
            boxgame.btn_pause.style.pointerEvents = 'auto';
            boxgame.box.style.display = 'block';
            boxgame.box_container.style.pointerEvents = 'auto';
        }

        var move_duration = boxgame.move_duration;
        if(boxgame.game_state == 'NOT_STARTED') {
            move_duration = prompt('Set duration in seconds for moving box.',boxgame.move_duration);
            move_duration = parseInt(move_duration);
            if( isNaN(move_duration) === false && move_duration > 0) {
                boxgame.game_state = 'active';
                boxgame.box_container.style.pointerEvents = 'auto';
                boxgame.box.style.display = 'block';
                boxgame.random_move();
                boxgame.interval = setInterval(function() {
                    if(boxgame.game_state == 'active') {
                        boxgame.random_move();
                    }
                },move_duration * 1000);
            } else {
                alert('Duration must be a number value in seconds.');
                boxgame.start_game();
            }
        }
    },
    pause_game: function() {
        boxgame.game_state = 'pause';
        boxgame.box_container.style.pointerEvents = 'none';
        boxgame.btn_pause.style.background = '#ccc';
        boxgame.btn_pause.style.color = '#fff';
        boxgame.btn_pause.style.pointerEvents = 'none';
        boxgame.btn_start.style.background = '#fff';
        boxgame.btn_start.style.color = '#000';
        boxgame.btn_start.style.pointerEvents = 'auto';
        boxgame.box.style.display = 'none';
    },
    reset_game: function() {
        var confirm_reset = confirm('Are you sure about resetting game?')
        if( confirm_reset ) {
            boxgame.resetGameData();
        }
    },
    resetGameData: function() {
        clearInterval(boxgame.interval);
        boxgame.game_state = 'NOT_STARTED';
        boxgame.scorecard = {
            box_container: 0,
            box: 0,
        };
        boxgame.update_score();
        boxgame.btn_start.style.background = '#fff';
        boxgame.btn_start.style.color = '#000';
        boxgame.btn_start.style.pointerEvents = 'auto';
        boxgame.btn_pause.style.background = '#fff';
        boxgame.btn_pause.style.color = '#000';
        boxgame.btn_pause.style.pointerEvents = 'auto';
        boxgame.box.style.display = 'none';
        
    },
    random_move: function() {
        var box_container_width = boxgame.box_container.clientWidth;
        var box_container_height = boxgame.box_container.clientHeight;
        var box_width = boxgame.box.clientWidth;
        var box_height = boxgame.box.clientHeight;
        var max_left_postion = box_container_width - box_width;
        var max_top_postion = box_container_height - box_height;
        var top = Math.floor(Math.random() * max_top_postion);
        var left = Math.floor(Math.random() * max_left_postion);
        boxgame.box.style.top = top;
        boxgame.box.style.left = left;
    },
    box_click:  function() {
        boxgame.scorecard.box++;
        boxgame.random_move();
        boxgame.update_score();
        boxgame.play_sound(1);
    },
    box_container_click: function() {
        boxgame.scorecard.box_container++;
        boxgame.update_score();
    },
    update_score: function() {
        var html = '';
        html += 'Tries: ' + boxgame.scorecard.box_container + ', ';
        html += 'Captures: ' + boxgame.scorecard.box + ', ';
        html += 'Failed: ' + (boxgame.scorecard.box_container - boxgame.scorecard.box) + '';
        document.getElementById('score').innerHTML = html;
    },
    play_sound: function(sound) {
        if(sound != undefined && sound != '') {
          var audio = new Audio('sounds/' + sound +'.wav');
          audio.play()
        }
    }
}
boxgame.init();
