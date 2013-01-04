function unoScore(){}
(function(){

    // Private
    var 
        $win        = $(window),
        $doc        = $(document),
        $body		= $('body'),

        $currentScore,
        $winnerName,
        $gameContainer,
        $roundNumber,

        round       = 1,
        currentRound= 0,
        winnerIdx   = null,
        player      = [];

        // Public
        this.init = function() {

            $currentScore   = $('#current-score tbody');
            $winnerName     = $('#winner-name');
            $gameContainer  = $('#game-container');
            $roundNumber    = $('#round-number');

            $('#start-game').click(function() {

                var playerCount = $('#player-count').val();

                createScore(playerCount);

            });

            $('#cards>div').click(function() {

                var value = $(this).data('value');

                player[winnerIdx].score += value;

                currentRound+=value;

                renderPlayersNoButtons();
            });

            $('#clear-round').click(function() {

                player[winnerIdx].score -= currentRound;

                currentRound = 0;

                renderPlayersNoButtons();
            });

            $('#current-score').on('click', '.winner', function() {

                winnerIdx = $(this).data('idx');

                $winnerName.html(player[winnerIdx].name + ' is the winner!');

                $('#cards').show();
                $('.winner').hide();

                player[winnerIdx].wins++;

                $gameContainer.show();

                renderPlayersNoButtons();
            });

            $('#next-round').click(function(){

                $gameContainer.hide();
                renderPlayers();

                round++;
                $roundNumber.html(round);

                currentRound = 0;
            });


            var preload = new Image;
            preload.src = 'images/cards_numbers.png';
            preload.src = 'images/cards_special.png';
        }

        function createScore(playerCount) {

            player = [];

            for (var x = 0; x<playerCount; x++) {

                var playerName = prompt('Enter Player ' + x + ' name:');

                player.push({
                    idx: x,
                    name: playerName,
                    wins: 0,
                    score: 0
                });

            }

            renderPlayers();
            $('#current-score').show();
            $('#round-head').show();

        }

        function renderPlayersNoButtons() {
            renderPlayers();
            $('.winner').hide();
        };

        function renderPlayers() {

            $currentScore.empty();

            $.each(player, function(i, pl) {

                var row =   '<tr><td>' + pl.name + '</td>' +
                            '<td>' + pl.wins + '</td>' +
                            '<td>' + pl.score + '</td>' +
                            '<td><input type="button" class="winner" data-idx="' + pl.idx + '" value="winner" /></td></tr>';

                $currentScore.append(row);

            });

        }

}).apply(unoScore);


$(document).ready(function() {
	unoScore.init();
});