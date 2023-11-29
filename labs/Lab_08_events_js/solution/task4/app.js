red_input_field.oninput = green_input_field.oninput  = blue_input_field.oninput = colorInputHandler;
red_input_field.onblur = green_input_field.onblur = blue_input_field.onblur = colorInputBlurHandler;
save_color.onclick = saveColorHandler;

let changingColorAreaElement = document.getElementById('changing_color_area');

let redInputFieldElement = document.getElementById('red_input_field');
let greenInputFieldElement = document.getElementById('green_input_field');
let blueInputFieldElement = document.getElementById('blue_input_field');

let paletteElement = document.getElementById('palette');
const visiblePalettePartSize = 15;
paletteElement.style.gridTemplateColumns = `repeat(${visiblePalettePartSize}, 1fr)`;

const nonColorFunctionalDivs = document.querySelectorAll('div:not(#bottom_wrapper, .container, #playground, #palette, #color_picker, #color_picker *)');
nonColorFunctionalDivs.forEach(e => {
    e.addEventListener('click', e => applyColor(e.target, selectedPaletteColor));
});

updateColor();

function getPickedColorAsRgbString() {
    return `rgb(${redInputFieldElement.value}, ${greenInputFieldElement.value}, ${blueInputFieldElement.value})`;
}

function updateColor() {
    changingColorAreaElement.style.backgroundColor = getPickedColorAsRgbString();
}

function colorInputBlurHandler(e) {

    if(e.target.value.length === 0) {
        e.target.value = "0";
    }

    updateColor();

}

function colorInputHandler(e) {

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
    newPaletteColorElement.className = 'memorized_color';
    newPaletteColorElement.style.backgroundColor = getPickedColorAsRgbString();
    newPaletteColorElement.onclick = pickColorFromPalette;
    if (paletteElement.childElementCount < visiblePalettePartSize) {
        paletteElement.appendChild(newPaletteColorElement);
    } else {
        paletteElement.childNodes.item(replacementIndex + 1).replaceWith(newPaletteColorElement);
        replacementIndex = (replacementIndex + 1)%visiblePalettePartSize;
    }
}

let selectedPaletteColor = undefined;
function pickColorFromPalette(e) {
    selectedPaletteColor = e.target.style.backgroundColor;
}

function applyColor(element, colorAsRgbString) {
    element.style.backgroundColor = colorAsRgbString;
}