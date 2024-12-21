function createHeroForm() {

    const form = document.createElement('div');
    form.classList.add('hero-form-container'); // Class for overall form layout

    const statsDiv = document.createElement('div');
    statsDiv.classList.add('statsDiv');
    form.appendChild(statsDiv);

    createStatsSideBar(statsDiv);

    const mainDisplayDiv = document.createElement('div');
    mainDisplayDiv.classList.add('main-display-container');

    createTabBar(mainDisplayDiv);

    const gearDiv = document.createElement('div');
    gearDiv.classList.add('windowPanel', 'Gear');
    gearDiv.style.display = 'none';
    mainDisplayDiv.appendChild(gearDiv);

    const gemsAndRunesDiv = document.createElement('div');
    gemsAndRunesDiv.classList.add('windowPanel', 'activeTab', 'GemsAndRunes');
    // gemsAndRunesDiv.style.display = 'none';
    mainDisplayDiv.appendChild(gemsAndRunesDiv);
    addRuneSection(gemsAndRunesDiv);
    addGemSection(gemsAndRunesDiv);

    const otherDiv = document.createElement('div');
    otherDiv.classList.add('windowPanel', 'Other');
    otherDiv.style.display = 'none';
    mainDisplayDiv.appendChild(otherDiv);

    const settingsDiv = document.createElement('div');
    settingsDiv.classList.add('windowPanel', 'Settings');
    settingsDiv.style.display = 'none';
    mainDisplayDiv.appendChild(settingsDiv);

    form.appendChild(mainDisplayDiv); // Append stacked divs container

    createInfoCard();
    createSetupCard()

    // Append the form to the body
    document.body.appendChild(form);
}





function createSetupCard() {
    let setupCard = document.createElement('div');
    setupCard.classList.add('setupCard');
    setupCard.id = 'setupCard';
    setupCard.style.display = 'none';
    const infoTitle = document.createElement('p');
    infoTitle.textContent = "Item Properties";
    infoTitle.classList.add('infoTitle');
    setupCard.appendChild(infoTitle);
    document.body.appendChild(setupCard);
    setupRuneSetupSection(setupCard);
    addButtons(setupCard, [
        {
            "text": "Accept",
            "classes": ['setupButton', 'acceptButton'],
            "onClick": setupAcceptButton
        },
        {
            "text": "Discard",
            "classes": ['setupButton', 'discardButton'],
            "onClick": setupCardDiscardButton
        },
    ]);
}

function setupCardDiscardButton() {
    document.getElementById('setupCard').style.display = 'none';
}

function setupAcceptButton() {
    let initiator = document.getElementById('setupCard').dataset.initiator
    let element = document.getElementById(initiator)
    let type = element.dataset.type;
    let name = element.dataset.item;

    switch (type) {
        case itemType.GEM:
            break;
        case itemType.RUNE:

            // element.setAttribute('data-secondary-rune-color', secondaryRuneColors.BLUE);
            // let secondaryRuneElement = document.createElement('div');
            // secondaryRuneElement.style.backgroundImage = element.style.backgroundImage;
            // element.style.backgroundImage = 'url(/images/rune/rune_' + secondaryRuneColors.BLUE + '.png), radial-gradient(#595959, #000000)';
            break;
        case itemType.GEAR:
            break;
        case itemType.HEIRLOOM:
            break;
        default:
            return;
    }

    setupItem(element, type, name);
    document.getElementById('setupCard').style.display = 'none';
}

function setupRuneSetupSection(element) {
    let secondaryRuneSection = document.createElement('div');
    secondaryRuneSection.classList.add('infoSection');
    secondaryRuneSection.id = 'infoSectionSecondaryRune';
    secondaryRuneSection.style.display = 'none';
    element.appendChild(secondaryRuneSection);
    addRadioButtons(secondaryRuneSection,
        {"id": "runeColor", "title": "Secondary Rune Color: "},
        [
            {"id": secondaryRuneColors.RED, "name": "Red"},
            {"id": secondaryRuneColors.GREEN, "name": "Green"},
            {"id": secondaryRuneColors.BLUE, "name": "Blue"},
            {"id": secondaryRuneColors.WHITE, "name": "White"},
        ]
    );

    let primaryRuneSection = document.createElement('div');
    primaryRuneSection.classList.add('infoSection');
    primaryRuneSection.id = 'infoSectionSecondaryRune';
    primaryRuneSection.style.display = 'none';
    element.appendChild(primaryRuneSection);
    // addDropDown(runeSection,
    //     {"id": "runeColor", "title": "Secondary Rune Color: "},
    //     [
    //         {"id": secondaryRuneColors.RED, "name": "Red"},
    //         {"id": secondaryRuneColors.GREEN, "name": "Green"},
    //         {"id": secondaryRuneColors.BLUE, "name": "Blue"},
    //         {"id": secondaryRuneColors.WHITE, "name": "White"},
    //     ]
    // );
}

function loadSetupCard(e, newItem, type, options) {
    let card = document.getElementById('setupCard');
    for ( let section of card.getElementsByClassName('infoSection')) {
        if ( section.classList.contains('buttonContainer') ) {
            continue
        }
        section.style.display = 'none';
    }
    if (newItem) {
        card.getElementsByClassName('discardButton')[0].style.display = 'none';
    } else {
        card.getElementsByClassName('discardButton')[0].style.display = 'block';
    }

    switch (type) {
        case itemType.RUNE:
            if(options['isSecondary'] !== undefined && options['isSecondary']) {
                document.getElementById('infoSectionSecondaryRune').style.display = 'block';
            }
            break;
        case itemType.GEM:
            break;
        case itemType.GEAR:
            break;
        case itemType.HEIRLOOM:
            break;
        default:
            return;
    }


    card.style.display = 'block';
    positionInfoCard(card, e);
}

function addRadioButtons(element, title, radios) {

    let radioWrapper = document.createElement('div');
    radioWrapper.classList.add('radioWrapper');
    element.appendChild(radioWrapper);
    let radioTitle = document.createElement('label');
    radioTitle.textContent = title['title'];
    radioWrapper.appendChild(radioTitle);
    let radioInputs = document.createElement('div');
    radioInputs.classList.add('radioInputs');
    radioWrapper.appendChild(radioInputs);

    // let width = Math.floor(100/buttons.length);
    // let fontSize = 1.0 - ((buttons.length-1)/10);

    for (let radio of radios) {
        let radioLabel = document.createElement('label');
        radioLabel.htmlFor = radio['id'];
        radioInputs.appendChild(radioLabel);
        let radioInput = document.createElement('input');
        radioInput.id = radio['id'];
        radioInput.type = 'radio';
        radioInput.name = 'radioButton';
        radioLabel.appendChild(radioInput);
        let spanName = document.createElement('span');
        spanName.textContent = radio['name'];
        spanName.classList.add('name');
        radioLabel.appendChild(spanName);
    }
    radioInputs.children[0].childNodes[0].checked = true;

}

function addButtons(element, buttons) {

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer', 'infoSection');
    element.appendChild(buttonContainer);
    let width = Math.floor(100/buttons.length);
    let fontSize = 1.0 - ((buttons.length-1)/10);
    for (let button of buttons) {
        let buttonElement = document.createElement('button');
        buttonElement.onclick = button['onClick'];
        buttonElement.setAttribute( 'style', 'width: calc('+width + '% - '+(buttons.length*2)+'px) !important' );
        buttonElement.style.fontSize = fontSize+"rem";
        button['classes'].push('buttonInContainer')
        buttonElement.classList.add(...button['classes']);
        buttonElement.textContent = button['text'];
        buttonContainer.appendChild(buttonElement);
    }
}

function addDropDown(element, title, options) {
    let selectDiv = document.createElement('div');
    element.appendChild(selectDiv);
    let dropDownLabel = document.createElement('label');
    dropDownLabel.textContent = title['title'];
    dropDownLabel.htmlFor = title['id']
    selectDiv.appendChild(dropDownLabel);
    let selectDropDown = document.createElement('select');
    selectDropDown.classList.add('dropdown');
    selectDropDown.id = title['id'];
    selectDropDown.name = title['id'];
    selectDiv.appendChild(selectDropDown);
    for (let option of options) {
        const optionElement = document.createElement('option');
        optionElement.textContent = option['name']
        optionElement.id = option['id'];
        selectDropDown.appendChild(optionElement);
    }
}


// TODO: Look at db files and create a mapping of items/gem to icons/pictures
// TODO: Also look up stats for each one

function addGemAdditionalInfo(element) {
    let additionalGemInfoDiv = document.createElement('div');
    additionalGemInfoDiv.classList.add('infoSection', 'additionalGemInfo', 'additionalInfo');
    element.appendChild(additionalGemInfoDiv);


}

function addRuneAdditionalInfo(element) {
    let additionalRuneInfoDiv = document.createElement('div');
    additionalRuneInfoDiv.classList.add('infoSection', 'additionalRuneInfo', 'additionalInfo');
    element.appendChild(additionalRuneInfoDiv);




    // TODO: Instead of sections unique to each item type, generate all the sections and have a function for each item that setups
    // TODO: the card for that specific item type




    // TODO: Looking into browser storage for current build. If there is a current build, ask if they want to start again or not
    // TODO: As the user puts in gems/runes/etc... save to something like window.currentBuild
}



function fillRuneSkillSection(element, runeItem) {
    let rune = findRuneItem(runeItem.name);
    if (rune) {

    }
}

function infoMouseExit() {
    this.style.display = 'none';
}

function positionInfoCard(infoCard, e) {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    // Y Position
    let yPos = e.clientY - (infoCard.clientHeight / 2);
    if (yPos < 0) {
        yPos = 20;
    } else if (yPos + infoCard.clientHeight > vh) {
        yPos = vh - infoCard.clientHeight - 20;
    }

    // X Position
    let xPos = e.clientX - (infoCard.clientWidth / 2);
    if (xPos < 0) {
        xPos = 20;
    } else if (xPos + infoCard.clientWidth > vw) {
        xPos = vw - infoCard.clientWidth - 20;
    }
    infoCard.style.top = yPos + 'px';
    infoCard.style.left = xPos + 'px';
}

function infoLabelMouseDown(e) {
    e.stopPropagation();
    populateAndMoveInfoCard(e, this.parentNode, true)
}

function populateAndMoveInfoCard(e, parent) {
    let type = parent.dataset.type;
    let name = parent.dataset.name;
    let infoCard = document.getElementsByClassName('infoCard')[0];
    switch (type) {
        case 'rune':
            let rune = findRuneItem(name);
            if (rune) {
                let img = parent.querySelector("img");
                populateRuneInformation(rune,
                    (rune.rune_type === runeType.PRIMARY ? 'url(' +img.src+')': img.style.backgroundImage),
                    runeType.PRIMARY);
                infoCard.style.display = 'block';
                positionInfoCard(infoCard, e);
            }
            break;
        case 'gem':
            let gem = findGemItem(name);
            if (gem) {



                let img = parent.querySelector("img");
                populateGemInformation(gem, 'url(' +img.src+')')
                infoCard.style.display = 'block';
                positionInfoCard(infoCard, e);



                // document.getElementById('itemType').textContent = "Gem";
                // document.getElementById('itemInfoName').textContent = gem.name;
                // // document.getElementById('itemInfoLevel').textContent = 'Max Level: N/A';
                // for (let child of parent.childNodes) {
                //     if (child.tagName === 'IMG') {
                //         infoImage.style.backgroundImage = 'url(' + child.src + ')';
                //     }
                // }
                // let infoCard = document.getElementsByClassName('infoCard')[0];
                // infoCard.style.display = 'block';
                // positionInfoCard(infoCard, e);
            }
            break;
        default:
            break;
    }
}

function createTabBar(element) {
    const tabBar = document.createElement('div');
    tabBar.classList.add('tabBar');
    element.appendChild(tabBar);
    addBarItem(tabBar, 'Gear', "Gear", false);
    addBarItem(tabBar, 'Runes + Gems', "GemsAndRunes", true);
    addBarItem(tabBar, 'Other??', "Other", false);
    addBarItem(tabBar, 'Settings', "Settings", false);
    addBarItem(tabBar, 'Import', "Import", false, importPlaceholder);
    addBarItem(tabBar, 'Export', "Export", false, exportPlaceholder);

}

function importPlaceholder() {

}

function exportPlaceholder() {

}

function addBarItem(element, text, id, activeButton, onClickFunction) {
    const button = document.createElement('button');
    button.classList.add('barButton');
    button.id = id;
    button.textContent = text;

    if (activeButton) {
        button.classList.add('activeButton');
    }

    if (onClickFunction) {
        button.onclick = onClickFunction;
    } else {
        button.onclick = function () {
            let activeTab = document.getElementsByClassName('activeTab')[0]
            activeTab.style.display = 'none';
            activeTab.classList.toggle('activeTab');
            let newTab = document.getElementsByClassName(this.id)[0]
            newTab.classList.toggle('activeTab');
            newTab.style.display = 'flex';
            if (!this.classList.contains('activeButton')) {
                document.getElementsByClassName('activeButton')[0].classList.toggle('activeButton');
                this.classList.toggle('activeButton');
            }
        }
    }
    element.appendChild(button);
}


function createStatsSideBar(element) {
    addTitle(element, "Stats");

    const div = document.createElement('div');
    div.classList.add('statsPanel');
    element.appendChild(div);
}

function addTitle(element, title) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('sectionTitleContainer');
    const panelTitle = document.createElement('p');
    panelTitle.textContent = title;
    panelTitle.classList.add('sectionTitle');
    titleDiv.appendChild(panelTitle);
    element.appendChild(titleDiv);
}


function addRuneSection(element) {
    let runeSection = document.createElement('div');
    runeSection.classList.add('Section');
    addTitle(runeSection, "Runes");

    let runeWidgetContainer = document.createElement('div');
    runeWidgetContainer.classList.add('WidgetContainer');
    runeSection.appendChild(runeWidgetContainer);

    let runeListContainer = document.createElement('div');
    runeListContainer.classList.add('ListContainer', 'scrollbar');
    runeWidgetContainer.appendChild(runeListContainer);

    let runesData = window.appData.runes

    let searchBarElement = document.createElement('input');
    searchBarElement.classList.add('searchBar');
    searchBarElement.placeholder = 'Search...';
    searchBarElement.addEventListener('input', searchListOnInput)
    runeListContainer.appendChild(searchBarElement);

    for (let runeItem of runesData) {

        createRuneItem(runeListContainer, runeItem);
    }

    CreateGrid(runeWidgetContainer, 7, false, 3, 4, "rune");
    element.appendChild(runeSection);

    let infoContainer = document.createElement('div');
    infoContainer.classList.add('scrollbar', "infoWindow");
    runeWidgetContainer.appendChild(infoContainer);
}

function createRuneItem(element, runeItem) {
    let runeListItem = document.createElement('div');
    runeListItem.classList.add('ListItem');
    runeListItem.id = "rune-" + runeItem.name.toLowerCase().replace(/\s+/g, '-');
    runeListItem.setAttribute('data-type', "rune");
    runeListItem.setAttribute('data-name', runeItem.name);


    let image = document.createElement('img');
    if (runeItem.rune_type === runeType.SECONDARY){
        image.classList.add('runeSecondaryListItemImage');
        image.style.backgroundImage = 'url(./images/rune/' + runeItem.icon + '.png), url(./images/rune/rune_white.png)';
    } else {
        image.src = './images/rune/' + runeItem.icon + '.png';
    }
    runeListItem.appendChild(image);

    let runeName = document.createElement('p');
    runeName.textContent = runeItem.name;
    runeListItem.appendChild(runeName);

    makeDraggable(runeListItem);

    let infoLabel = document.createElement('div');
    infoLabel.classList.add('infoLabel');
    infoLabel.textContent = 'View Info';
    infoLabel.onmousedown = infoLabelMouseDown;
    runeListItem.appendChild(infoLabel);

    element.appendChild(runeListItem);
}

function findRuneItem(runeName) {
    for (let rune of window.appData.runes) {
        if (rune.name === runeName) {
            return rune;
        }
    }
}

function findGemItem(gemName) {
    for (let gem of window.appData.gems) {
        if (gem.name === gemName) {
            return gem;
        }
    }
}

function addGemSection(element) {
    let gemSection = document.createElement('div');
    gemSection.classList.add('Section');
    addTitle(gemSection, "Gems");

    let gemWidgetContainer = document.createElement('div');
    gemWidgetContainer.classList.add('WidgetContainer');
    gemSection.appendChild(gemWidgetContainer);

    let gemListContainer = document.createElement('div');
    gemListContainer.classList.add('ListContainer');
    gemListContainer.classList.add('scrollbar');
    gemWidgetContainer.appendChild(gemListContainer);

    let gemData = window.appData.gems

    let searchBarElement = document.createElement('input');
    searchBarElement.classList.add('searchBar');
    searchBarElement.placeholder = 'Search...';
    searchBarElement.addEventListener('input', searchListOnInput)
    gemListContainer.appendChild(searchBarElement);


    for (let gemItem of gemData) {

        createGemItem(gemListContainer, gemItem);
    }

    CreateGrid(gemWidgetContainer, 4, true, 2, 7, "gem");

    element.appendChild(gemSection);
}

function searchListOnInput() {
    for (let listItem of this.parentNode.getElementsByClassName('ListItem')) {
        if (this.value.length > 0) {
            if (listItem.dataset.name.trim().toLowerCase().includes(this.value.toLowerCase().trim())) {
                listItem.style.display = 'flex';
            } else {
                listItem.style.display = 'none';
            }
        } else {
            listItem.style.display = 'flex';
        }
    }
}

function CreateGrid(element, lines, concave, middle, startingLineSize, type) {
    let Grid = document.createElement('div');
    Grid.classList.add('HoneyCombGrid');
    let count = 0;
    let reduce = 0;
    for (let i = 0; i < lines; i++) {

        let gridCount = concave ? startingLineSize - i : startingLineSize + i;
        if (i > middle) {
            reduce++;
            gridCount = concave ? gridCount + reduce * 2 : gridCount - reduce * 2;
        }

        let gridLine = document.createElement('div');
        gridLine.setAttribute('data-row', ""+i);
        for (let j = 0; j < gridCount; j++) {
            count++;
            let HexSlot = document.createElement('div');
            HexSlot.setAttribute('data-type', type);
            HexSlot.classList.add('HexSlot', type);
            HexSlot.id = type + "Slot" + count;
            HexSlot.oncontextmenu = function (e) {
                e.preventDefault();
                return false;
            }
            gridLine.appendChild(HexSlot)
        }
        Grid.appendChild(gridLine);
    }
    element.appendChild(Grid);
}

function createGemItem(element, gemItem) {
    let gemListItem = document.createElement('div');
    gemListItem.classList.add('ListItem');
    gemListItem.setAttribute('data-type', "gem");
    gemListItem.id = "gem-" + gemItem.name.toLowerCase().replace(/\s+/g, '-');

    gemListItem.setAttribute('data-name', gemItem.name);

    let image = document.createElement('img');
    image.src = './images/gem/' + gemItem.icon + '.png';
    gemListItem.appendChild(image);

    let gemName = document.createElement('p');
    gemName.textContent = gemItem.name;
    gemListItem.appendChild(gemName);

    let infoLabel = document.createElement('div');
    infoLabel.classList.add('infoLabel');
    infoLabel.textContent = 'View Info';
    infoLabel.onmousedown = infoLabelMouseDown;
    gemListItem.appendChild(infoLabel);

    makeDraggable(gemListItem);

    element.appendChild(gemListItem);
}

function makeDraggable(element) {
    element.onmousedown = dragMouseDown;
}


function dragMouseDown(e) {
    if (this.dataset.dragging) {
        let type = this.dataset.type;
        let name = this.dataset.name;
        let fromId = this.dataset.fromId;
        let secondary = !!this.childNodes[0].style.backgroundImage;
        let imageUrl = this.childNodes[0].style.backgroundImage ? this.childNodes[0].style.backgroundImage.replace(", url(\"./images/rune/rune_white.png\")", "") : 'url(' + this.childNodes[0].src+ ')';
        this.remove();
        let droppedElement = document.elementFromPoint(e.clientX, e.clientY);
        droppedElement = droppedElement.classList.contains('HexSlot') ? droppedElement : droppedElement.parentNode;
        if (droppedElement.classList.contains('HexSlot')) {
            if (droppedElement.classList.contains(type)) {
                cleanHex(droppedElement);
                droppedElement.classList.add('filled');
                droppedElement.setAttribute('data-item', name);
                droppedElement.setAttribute('data-from-id', fromId);
                loadSetupCard(e, true, type, {'isSecondary': secondary})
                droppedElement.style.backgroundImage = imageUrl;
                document.getElementById('setupCard').setAttribute('data-initiator', droppedElement.id);
                droppedElement.onmousedown = hexOnMouseDown;
                // let option = {}
                // switch (type) {
                //     case itemType.RUNE:
                //         break;
                //     case itemType.GEM:
                //         break;
                //     default:
                //         break;
                // }


                // droppedElement.onmousemove = hexOnMouseMove;
                window.draggingElement = null;
                document.removeEventListener('mousemove', dragMouseMove, false);
            }
        }
    } else {
        let draggingDiv = document.createElement('div');
        draggingDiv.classList.toggle('dragging');
        draggingDiv.setAttribute('data-dragging', true);
        draggingDiv.setAttribute('data-type', this.dataset.type);
        draggingDiv.setAttribute('data-name', this.dataset.name);
        draggingDiv.setAttribute('data-from-id', this.id);
        draggingDiv.style.top = e.clientY - 30 + 'px';
        draggingDiv.style.left = e.clientX - 30 + 'px';
        draggingDiv.onmousedown = dragMouseDown;
        // draggingDiv.onmousemove = ;
        document.addEventListener('mousemove', dragMouseMove, false);
        window.draggingElement = draggingDiv;

        let image = document.createElement('img');
        if (this.childNodes[0].classList.contains('runeSecondaryListItemImage')) {
            image.style.backgroundImage = this.childNodes[0].style.backgroundImage;
            image.classList.add('runeSecondaryListItemImage');
        }else{
            image.src = this.childNodes[0].src;
        }
        draggingDiv.appendChild(image);

        document.body.appendChild(draggingDiv);
    }
}

function setupItem(element, type, name) {
    switch (type) {
        case itemType.RUNE:
            rune = findRuneItem(name);
            if (rune.rune_type === runeType.SECONDARY) {
                let selectedColor = document.querySelector('input[name="radioButton"]:checked').id;
                let discardButton = document.getElementsByClassName('discardButton')[0];

                if(discardButton.style.display !== 'none') {
                    let previousColor = element.dataset.secondaryRuneColor;
                    element.setAttribute('data-secondary-rune-color', selectedColor);
                    element.style.backgroundImage = element.style.backgroundImage.replace(previousColor+".png", selectedColor+".png");
                }else {
                    element.setAttribute('data-secondary-rune-color', selectedColor);
                    let secondaryRuneElement = document.createElement('div');
                    secondaryRuneElement.style.backgroundImage = element.style.backgroundImage;
                    element.style.backgroundImage = 'url(./images/rune/rune_' + selectedColor + '.png), radial-gradient(#595959, #000000)';
                    element.classList.add('SecondaryRune');
                    element.appendChild(secondaryRuneElement);
                }
            }
            break;
        case itemType.GEM:
            break;
        case itemType.GEAR:
            break;
        case itemType.HEIRLOOM:
            break;
        default:
            return;
    }
    // TODO: Show Form to Configure Rune/Gem
    // TODO: If rune is secondary, you need to choose what color it is, R G or B

}


window.draggingElement = null;

function dragMouseMove(e) {
    draggingElement.style.top = e.clientY - 30 + 'px';
    draggingElement.style.left = e.clientX - 30 + 'px';
}

function cleanHex(hex) {
    hex.classList.remove('filled', 'SecondaryRune', 'runeSecondaryListItemImage');
    hex.removeAttribute('data-item');
    hex.style.removeProperty('background-image');
    hex.removeAttribute('data-secondary-rune-color');
    for (let child of hex.children) {
        child.remove();
    }
    hex.onmousedown = null;
}

function hexOnMouseDown(e) {
    if (e.shiftKey || e.which === 3) {
        cleanHex(this);
    } else {
        // let originator = document.getElementById(this.dataset.fromId);
        // populateAndMoveInfoCard(e, originator, false);
        loadSetupCard(e, false, this.dataset.type, {'isSecondary':  this.classList.contains('SecondaryRune') });
    }
}

