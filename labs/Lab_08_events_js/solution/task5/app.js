let changingColorAreaElement = document.getElementById('changing_color_area');

let redInputFieldElement = document.getElementById('red_input_field');
let greenInputFieldElement = document.getElementById('green_input_field');
let blueInputFieldElement = document.getElementById('blue_input_field');

let selectedPaletteColor = undefined;
let paletteElement = document.getElementById('palette');
const visiblePalettePartSize = 15;
paletteElement.style.gridTemplateColumns = `repeat(${visiblePalettePartSize}, 1fr)`;
let paletteColors = [];    //цвета содержащиеся в палитре в формате стилевой строки rgb
let visiblePalettePartStartIndex = 0;

const nonColorFunctionalDivs = document.querySelectorAll('div:not(#bottom_wrapper, .container, #playground, #palette, #palette_control, #palette_control *, #palette *, #color_picker, #color_picker *)');
nonColorFunctionalDivs.forEach(e => {
    e.addEventListener('click', e => applyBackgroundColor(e.target, selectedPaletteColor));
});

updatePickedColor(); 

function pickedColorAsRgbString() {
    return `rgb(${redInputFieldElement.value}, ${greenInputFieldElement.value}, ${blueInputFieldElement.value})`;
}

function updatePickedColor() {
    changingColorAreaElement.style.backgroundColor = pickedColorAsRgbString();
}

red_input_field.onblur = green_input_field.onblur = blue_input_field.onblur = (e) => {

    if(e.target.value.length === 0) {
        e.target.value = "0";
    }

    updatePickedColor();

};

red_input_field.oninput = green_input_field.oninput  = blue_input_field.oninput = (e) => {

    if(e.target.value.length === 0) {
        return;
    }

    if(!/^\d*$/g.test(e.target.value) || /^0\d+$/g.test(e.target.value) || 255 < parseInt(e.target.value)) {
        e.target.value = e.target.value.slice(0, -1);
        return;
    }
    
    updatePickedColor();
};

save_color.onclick = () => { 
    paletteColors.push(pickedColorAsRgbString());
    updatePaletteElement();
};


let isRightArrowPresnted = false;
let isLeftArrowPresented = false;
function updatePaletteElement() {

    while (paletteElement.childElementCount < visiblePalettePartSize && paletteColors.length != paletteElement.childElementCount) {
        const newPaletteColorElement = document.createElement('div');
        newPaletteColorElement.className = 'memorized_color';
        newPaletteColorElement.onclick = (e) => selectedPaletteColor = e.target.style.backgroundColor;
        paletteElement.appendChild(newPaletteColorElement);
    }
    
    if (isLeftArrowPresented && visiblePalettePartStartIndex === 0) {
        document.getElementById('left_arrow').remove();
        isLeftArrowPresented = false;
    }

    if (!isLeftArrowPresented && 0 < visiblePalettePartStartIndex) {
        let leftArrowElement = document.createElement('div');
        leftArrowElement.id = 'left_arrow';
        leftArrowElement.onclick = () => {
            visiblePalettePartStartIndex--;
            updatePaletteElement();
        }

        let leftArrowImage = document.createElement('img');
        leftArrowImage.src = 'img/left-arrow.png';
        leftArrowImage.className = 'arrow';
        leftArrowElement.appendChild(leftArrowImage);

        document.getElementById('left_arrow_container').appendChild(leftArrowElement);
        isLeftArrowPresented = true;
    }

    if (isRightArrowPresnted && paletteColors.length - visiblePalettePartStartIndex <= 15) {
        document.getElementById('right_arrow').remove();
        isRightArrowPresnted = false;
    }

    if (!isRightArrowPresnted && 15 < paletteColors.length - visiblePalettePartStartIndex) {
        let rightArrowElement = document.createElement('div');
        rightArrowElement.id = 'right_arrow';
        rightArrowElement.onclick = () => {
            visiblePalettePartStartIndex++;
            updatePaletteElement();
        }

        let rightArrowImage = document.createElement('img');
        rightArrowImage.src = 'img/right-arrow.png';
        rightArrowImage.className = 'arrow';
        rightArrowElement.appendChild(rightArrowImage);

        document.getElementById('right_arrow_container').appendChild(rightArrowElement);
        isRightArrowPresnted = true;
    }

    updatePaletteColors();
}

function updatePaletteColors() {
    let paletteColorsElements = paletteElement.children;
    for(let i = 0; i < paletteColorsElements.length; i++) {
        applyBackgroundColor(paletteColorsElements[i], paletteColors[visiblePalettePartStartIndex + i]);
    }
}

function applyBackgroundColor(element, colorAsRgbString) {
    element.style.backgroundColor = colorAsRgbString;
}