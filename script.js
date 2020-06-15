$(document).ready(function () {
    const connect4 = new Connect4('#connect4');
});
class Connect4 {
    constructor(target) {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'blue';
        this.target = target;
        this.creatLayout();
        this.eventListner();
    }
    creatLayout() {
        const $layout = $(this.target);
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $("<div>").addClass("row");
            for (let col = 0; col < this.COLS; col++) {
                const $col = $("<div>").addClass("col empty")
                    .attr({
                        "data-col": col,
                        "data-row": row
                    });
                $row.append($col);
            }
            $layout.append($row);
        }
        // Show which player has turn.
        document.getElementById('turn').innerHTML = this.player;
        document.getElementById('turn').style.color = this.player;
    }
    eventListner() {
        const $layout = $(this.target);
        let self = this;
        function findLastEmptyCell(columnIndex) {
            const allColCells = $('.col[data-col="' + columnIndex + '"]');
            console.log(allColCells);

            for (let i = allColCells.length - 1; i >= 0; i--) {
                const $lastEmptyCell = allColCells[i];
                if ($($lastEmptyCell).hasClass('empty')) {
                    return $lastEmptyCell;
                }
            }
            return null;
        };
        // Show on hover player color
        $layout.on("mouseenter", '.col.empty', function () {
            console.log(this);
            const columnIndex = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(columnIndex);
            $($lastEmptyCell).addClass('hover-' + self.player);
        });

        $layout.on("mouseleave", '.col.empty', function () {
            $('.col').removeClass('hover-' + self.player);
        });

        $layout.on("click", '.col.empty', function () {
            $('.col').removeClass('hover-' + self.player);

            const columnIndex = $(this).data('col');
            const rowIndex = $(this).data('row');
            const $lastEmptyCell = findLastEmptyCell(columnIndex);
            $($lastEmptyCell).removeClass('empty hover-' + self.player);
            $($lastEmptyCell).addClass(self.player);

            const winner = isWinner($lastEmptyCell.dataset.col, $lastEmptyCell.dataset.row);
            if (winner) {
                alert(self.player.charAt(0).toUpperCase() + self.player.slice(1) + " player is winner.");
            } else {
                //Switch Player
                self.player = self.player == 'blue' ? 'red' : 'blue';
                document.getElementById('turn').innerHTML = self.player;
                document.getElementById('turn').style.color = self.player;
            }
        });
        function isWinner(columnIndex, rowIndex) {
            columnIndex = parseInt(columnIndex);
            rowIndex = parseInt(rowIndex);

            function getCell(c, r) {
                if ($('.col[data-col="' + c + '"][data-row="' + r + '"]').hasClass(self.player))
                    return true;
                else
                    return false;
            }

            function checkVerticle() {
                var total = 0;
                for (let i = rowIndex; i < 6; i++) {
                    if (getCell(columnIndex, i)) {
                        total = total + 1;
                        if (total >= 4)
                            return true;
                    } else
                        return false;
                }
                return false;
            }

            function checkHorizontal() {
                return false;
            }

            function checkDiagonal() {
                return false;
            }
            return checkVerticle() || checkHorizontal() || checkDiagonal();
        }
    }
}