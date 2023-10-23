red_input_field.oninput = green_input_field.oninput  = blue_input_field.oninput = inputHandler;
red_input_field.onblur = green_input_field.onblur = blue_input_field.onblur = blurHandler;

let changingColorAreaElement = document.getElementById('changing_color_area');
let redInputFieldEleent = document.getElementById('red_input_field');
let greenInputFieldEleent = document.getElementById('green_input_field');
let blueInputFieldEleent = document.getElementById('blue_input_field');

updateColor();

function blurHandler(e) {

    if(e.target.value.length === 0) {
        e.target.value = "0";
    }

    updateColor();

}

function inputHandler(e) {

    if(e.target.value.length === 0) {
        return;
    }

    if(!/^\d*$/g.test(e.target.value) || /^0\d+$/g.test(e.target.value) || 255 < parseInt(e.target.value)) {
        e.target.value = e.target.value.slice(0, -1);
        return;
    }
    
    updateColor();
}

function updateColor() {
    changingColorAreaElement.style.backgroundColor  = `rgb(${redInputFieldEleent.value}, ${greenInputFieldEleent.value}, ${blueInputFieldEleent.value})`;
}