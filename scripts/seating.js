//Ignorera, jag hade inte tid eller ork för detta

class Seat{
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.isOccupied = false;
        this.student = ""; //student name to display
    }

    occupy(student){
        this.isOccupied = true;
        this.student = student;
    }

    vacate(){
        this.isOccupied = false;
        this.student = "";
    }
}