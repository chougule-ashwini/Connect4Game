$(document).ready(function () {
    const connect4 = new Connect4('#connect4');
});
class Connect4 {
    constructor(target) {
        this.ROWS = 6;
        this.COLS = 7;
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
            $($lastEmptyCell).addClass('hover-blue');
        });

        $layout.on("mouseleave", '.col.empty', function () {
            $('.col').removeClass('hover-blue');
        });

        $layout.on("click", '.col.empty', function () {
            $('.col').removeClass('hover-blue');

            const columnIndex = $(this).data('col');
            const rowIndex = $(this).data('row');
            const $lastEmptyCell = findLastEmptyCell(columnIndex);
            $($lastEmptyCell).removeClass('empty hover-blue');
            $($lastEmptyCell).addClass('blue');

        });
    }
}