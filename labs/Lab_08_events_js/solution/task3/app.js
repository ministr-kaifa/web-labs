red_input_field.oninput = green_input_field.oninput  = blue_input_field.oninput = inputHandler;
red_input_field.onblur = green_input_field.onblur = blue_input_field.onblur = blurHandler;
save_color.onclick = saveColorHandler;


let changingColorAreaElement = document.getElementById('changing_color_area');

let redInputFieldEleent = document.getElementById('red_input_field');
let greenInputFieldEleent = document.getElementById('green_input_field');
let blueInputFieldEleent = document.getElementById('blue_input_field');

let paletteElement = document.getElementById('color_memory');
const visiblePalettePartSize = 15;
paletteElement.style.gridTemplateColumns = `repeat(${visiblePalettePartSize}, 1fr)`;

updateColor();

function getPickedColorAsRgbString() {
    return `rgb(${redInputFieldEleent.value}, ${greenInputFieldEleent.value}, ${blueInputFieldEleent.value})`;
}

function updateColor() {
    changingColorAreaElement.style.backgroundColor = getPickedColorAsRgbString();
}

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

let replacementIndex = 0;
function saveColorHandler(e) {
    let newPaletteColorElement = document.createElement('div'); 
    newPaletteColorElement.className = 'memorized_color'
    newPaletteColorElement.style.backgroundColor = getPickedColorAsRgbString();
    if (paletteElement.childElementCount < visiblePalettePartSize) {
        paletteElement.appendChild(newPaletteColorElement);
    } else {
        paletteElement.childNodes.item(replacementIndex + 1).replaceWith(newPaletteColorElement);
        replacementIndex = (replacementIndex + 1)%visiblePalettePartSize;
    }
}
