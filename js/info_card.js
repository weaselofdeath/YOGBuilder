// TODO: Instead of sections unique to each item type, generate all the sections and have a function for each item that setups
// TODO: the card for that specific item type
// Card Rune Setup
// basic
//
// prefix ---------
//     *
//     *
//     *
// suffix -------------------
//     *
//     *
//     *
// exclusive -------------
//     *
// Rune Skills --------
//
// ------------------
// Who can equip on left and "<Type> Level: <MaxLevel>"
// TODO: Looking into browser storage for current build. If there is a current build, ask if they want to start again or not
// TODO: As the user puts in gems/runes/etc... save to something like window.currentBuild


function createInfoCard() {
    let infoCard = document.createElement('div');
    infoCard.classList.add('infoCard');
    const infoTitle = document.createElement('p');
    infoTitle.textContent = "<Item Name>";
    infoTitle.id = "itemInfoName";
    infoTitle.classList.add('infoTitle');
    infoCard.appendChild(infoTitle);
    // infoCard.onmouseleave = infoMouseExit;

    // infoCard.style.display = 'none';
    document.body.appendChild(infoCard);

    //Item Info
    let itemInfoSection = document.createElement('div');
    itemInfoSection.classList.add('infoSection');
    infoCard.appendChild(itemInfoSection);

    createItemDisplay(itemInfoSection, 'itemInfoImage')

    let itemInfo = document.createElement('div');
    itemInfo.classList.add('infoItem');
    itemInfoSection.appendChild(itemInfo);

    let itemLevel = document.createElement('p');
    itemLevel.textContent = '<Item Type>';
    itemLevel.classList.add('itemType');
    itemLevel.id = 'itemType';
    itemInfo.appendChild(itemLevel);


    // let expanderContainer = document.createElement('div');
    // expanderContainer.classList.add('expanderContainer');
    // expanderContainer.id = 'expanderContainer';
    // infoCard.appendChild(expanderContainer);
    //
    // let expander = document.createElement('div');
    // expander.classList.add('expander');
    // expander.id = 'expander';
    // expander.onmousedown = expanderClicked;
    // infoCard.appendChild(expander);

    // Create the various sections
    createBasicSection(infoCard);
    createPrefixSection(infoCard);
    createSuffixSection(infoCard);
    createExclusiveSection(infoCard);
    createRuneSkillsSection(infoCard);
    createFooterSection(infoCard);

}

function createItemDisplay(element, imgId){
    let imageBackground = document.createElement('div');
    imageBackground.classList.add('infoImage');
    imageBackground.style.backgroundImage = 'url(./images/ui/backgrounds/mythic.png)';
    element.appendChild(imageBackground);
    let imageBlock = document.createElement('div');
    imageBlock.id = imgId;
    imageBackground.appendChild(imageBlock);
    let imageBorder = document.createElement('div');
    imageBorder.style.backgroundImage = 'url(./images/ui/borders/mythic.png)';
    imageBlock.appendChild(imageBorder);
}

function addSectionName(element, name) {
    let sectionNameDiv = document.createElement('div');
    sectionNameDiv.style.minWidth = '100%';
    sectionNameDiv.style.display = 'flex';

    element.appendChild(sectionNameDiv);

    let sectionTitle = document.createElement('span');
    sectionTitle.textContent = name;
    sectionTitle.classList.add('sectionName');
    sectionNameDiv.appendChild(sectionTitle);

    let titleSeprator = document.createElement('div');
    titleSeprator.classList.add('titleLineSeparator');
    sectionNameDiv.appendChild(titleSeprator);
}

function addUnorderedList(element, id) {
    let unorderedList = document.createElement('ul');
    unorderedList.classList.add('infoUnorderedList');
    unorderedList.id = id;
    element.appendChild(unorderedList);
    return unorderedList;
}

function createBasicSection(element) {
    let itemBasicSection = document.createElement('div');
    itemBasicSection.classList.add('infoSectionList');
    itemBasicSection.id = 'itemBasicSection';
    itemBasicSection.style.paddingLeft = '10px';
    element.appendChild(itemBasicSection);
    let ul = addUnorderedList(itemBasicSection, 'basicList');

    // Test Item for helping with positions and styling
    let basicUnorderedListItem = document.createElement('li');
    basicUnorderedListItem.textContent = '+1568 All Attrs [1568]';
    ul.appendChild(basicUnorderedListItem);
}

function createPrefixListItem (element, level, maxLevel, attribute, attrRange){
    let basicUnorderedListItem = document.createElement('li');
    element.appendChild(basicUnorderedListItem);

    let span1 = document.createElement('span');
    span1.textContent = level;
    span1.style.color = maxLevel ? '#f3b277' : '#888293';
    basicUnorderedListItem.appendChild(span1);

    let span2 = document.createElement('span');
    span2.textContent = attribute;
    span2.style.color = '#9b8bef';
    basicUnorderedListItem.appendChild(span2);

    let span3 = document.createElement('span');
    span3.textContent = attrRange;
    span3.style.color = '#9C94A8';
    basicUnorderedListItem.appendChild(span3);
}

function createPrefixSection(element) {
    let itemPrefixSection = document.createElement('div');
    itemPrefixSection.classList.add('infoSection');
    itemPrefixSection.id = 'itemPrefixSection';
    element.appendChild(itemPrefixSection);

    addSectionName(itemPrefixSection, 'Prefix');

    let ul = addUnorderedList(itemPrefixSection, 'prefixList');

    // Test Item for helping with positions and styling
    let basicUnorderedListItem = document.createElement('li');
    ul.appendChild(basicUnorderedListItem);

    createPrefixListItem(ul, '[Lv5]', false, '+899 INT', '[848-893]')
    createPrefixListItem(ul, '[Lv7]', true, '+1030 Spell Power', '[848-893]')
    createPrefixListItem(ul, '[Lv6]', false, '+993 Spell Power', '[972-1020]')
}

function createSuffixSection(element) {
    let itemSuffixSection = document.createElement('div');
    itemSuffixSection.classList.add('infoSection');
    itemSuffixSection.id = 'itemSuffixSection';
    element.appendChild(itemSuffixSection);
    addSectionName(itemSuffixSection, 'Suffix');
    let ul = addUnorderedList(itemSuffixSection, 'suffixList');

    createPrefixListItem(ul, '[Lv6]', false, '+921 INT', '[883-928]')
    createPrefixListItem(ul, '[Lv3]', true, '+5 Lightning Penetration', '[5-6]')
    createPrefixListItem(ul, '[Lv7]', true, '+931 INT', '[918-963]')
}

function createExclusiveListItem(element, attribute, attrCalculation){
    let exclusiveUnorderedListItem = document.createElement('li');
    element.appendChild(exclusiveUnorderedListItem);

    let span1 = document.createElement('span');
    span1.textContent = attribute;
    span1.style.color = '#f3b277';
    exclusiveUnorderedListItem.appendChild(span1);

    let span3 = document.createElement('span');
    span3.textContent = attrCalculation;
    span3.style.color = '#9C94A8';
    exclusiveUnorderedListItem.appendChild(span3);
}

function createExclusiveSection(element) {
    let itemExclusiveSection = document.createElement('div');
    itemExclusiveSection.classList.add('infoSection');
    itemExclusiveSection.id = 'itemExclusiveSection';
    element.appendChild(itemExclusiveSection);
    addSectionName(itemExclusiveSection, 'Exclusive');
    let ul = addUnorderedList(itemExclusiveSection, 'exclusiveList');

    createExclusiveListItem(ul, '+316.2 All Attrs', '[0.6*Hero Level]');
}


function addRuneSkillToTable(element, requirements, effect) {
    let tableRow = document.createElement('tr');
    tableRow.classList.add('runeSkillRow');
    element.appendChild(tableRow);

    let requirementsCell = document.createElement('td');
    requirementsCell.classList.add('runeSkillRequirementsCell');
    tableRow.appendChild(requirementsCell);

    for (let requirement of requirements) {
        let amount = requirement['amount'];
        let color = requirement['color'];

        for (let i = 0; i < amount; i++) {

            let runeSkillsTick = document.createElement('div');
            runeSkillsTick.classList.add('runeSkillTick');
            let backgroundColor = '#ffffff';
            switch (color) {
                case 'r':
                    backgroundColor = '#ff0000';
                    break;
                case 'g':
                    backgroundColor = '#26FFA2';
                    break;
                case 'b':
                    backgroundColor = '#4DA5F2';
                    break;
            }
            runeSkillsTick.style.backgroundColor = backgroundColor;
            requirementsCell.appendChild(runeSkillsTick);
        }
    }

    let descriptionCell = document.createElement('td');
    descriptionCell.classList.add('runeSkillDescriptionCell');
    descriptionCell.textContent = effect;
    tableRow.appendChild(descriptionCell);
}


function createRuneSkillsSection(element) {
    let itemRuneSkillsSection = document.createElement('div');
    itemRuneSkillsSection.classList.add('infoSection');
    itemRuneSkillsSection.id = 'itemRuneSkillsSection';
    element.appendChild(itemRuneSkillsSection);
    addSectionName(itemRuneSkillsSection, 'Rune Skills');

    let runeSkillsTable = document.createElement('table');
    runeSkillsTable.classList.add('runeSkillsTable');
    runeSkillsTable.id = 'runeSkillsTable';
    itemRuneSkillsSection.appendChild(runeSkillsTable);


    addRuneSkillToTable(runeSkillsTable,[
            {
                "color": "b",
                "amount": 1
            }
        ],
        "Lightning Penetration +15"
        );

    addRuneSkillToTable(runeSkillsTable,[
            {
                "color": "b",
                "amount": 2
            }
        ],
        "Max HP +7%"
    );
    addRuneSkillToTable(runeSkillsTable,[
            {
                "color": "b",
                "amount": 3
            }
        ],
        "Spell Damage +7%"
    );
    addRuneSkillToTable(runeSkillsTable,[
            {
                "color": "b",
                "amount": 4
            }
        ],
        "Lightning Damage +10%"
    );
    addRuneSkillToTable(runeSkillsTable,[
            {
                "color": "b",
                "amount": 5
            }
        ],
        "INT +5%"
    );
    addRuneSkillToTable(runeSkillsTable, [
            {
                "color": "b",
                "amount": 5
            },
            {
                "color": "g",
                "amount": 1
            }
        ],
        "Lightning damage dealt by the wearer has a 3% chance to trigger Electrocution."
    );
}

function createFooterSection(element) {
    let itemFooterSection = document.createElement('div');
    itemFooterSection.classList.add('infoFooter');
    element.appendChild(itemFooterSection);

    let whoCanEquip = document.createElement('span');
    whoCanEquip.id = 'whoCanEquip';
    // whoCanEquip.textContent = '<WhoCanEquip>';
    whoCanEquip.textContent = 'All blackguards can equip';
    itemFooterSection.appendChild(whoCanEquip);

    let itemLevel = document.createElement('span');
    itemLevel.id = 'itemLevel';
    itemLevel.textContent = '<itemLevel>';
    itemLevel.textContent = 'Rune Level: 520';
    itemFooterSection.appendChild(itemLevel);

}