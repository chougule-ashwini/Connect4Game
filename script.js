$(document).ready(function () {
    const connect4 = new Connect4('#connect4');
});
class Connect4 {
    constructor(target) {
        this.ROWS = 6;
        this.COLS = 7;
        this.target = target;
        this.creatLayout();
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
}