// TODO: Instead of sections unique to each item type, generate all the sections and have a function for each item that setups
// TODO: the card for that specific item type

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
    infoCard.onmouseleave = infoMouseExit;

    // infoCard.style.display = 'none';
    document.body.appendChild(infoCard);

    //Item Info
    let itemInfoSection = document.createElement('div');
    itemInfoSection.classList.add('infoSectionHeader');
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

    // Create the various sections
    createBasicSection(infoCard);
    createPrefixSection(infoCard);
    createSuffixSection(infoCard);
    // createExclusiveSection(infoCard);
    createRuneSkillsSection(infoCard);
    createFooterSection(infoCard);
    for (let element of infoCard.getElementsByClassName('infoSection')){
        element.style.display = 'none'
    }

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

    let titleSeparator = document.createElement('div');
    titleSeparator.classList.add('titleLineSeparator');
    sectionNameDiv.appendChild(titleSeparator);
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
    itemBasicSection.style.display = 'none';
    itemBasicSection.id = 'itemBasicSection';
    itemBasicSection.style.paddingLeft = '10px';
    element.appendChild(itemBasicSection);
    let ul = addUnorderedList(itemBasicSection, 'basicList');

    // // Test Item for helping with positions and styling
    // let basicUnorderedListItem = document.createElement('li');
    // basicUnorderedListItem.textContent = '+1568 All Attrs [1568]';
    // ul.appendChild(basicUnorderedListItem);
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
    itemPrefixSection.style.display = 'none';
    element.appendChild(itemPrefixSection);

    addSectionName(itemPrefixSection, 'Prefix');

    let ul = addUnorderedList(itemPrefixSection, 'prefixList');

    // Test Item for helping with positions and styling
    let basicUnorderedListItem = document.createElement('li');
    ul.appendChild(basicUnorderedListItem);
}

function createSuffixSection(element) {
    let itemSuffixSection = document.createElement('div');
    itemSuffixSection.classList.add('infoSection');
    itemSuffixSection.id = 'itemSuffixSection';
    itemSuffixSection.style.display = 'none';
    element.appendChild(itemSuffixSection);
    addSectionName(itemSuffixSection, 'Suffix');
    let ul = addUnorderedList(itemSuffixSection, 'suffixList');
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
    itemExclusiveSection.style.display = 'none';
    element.appendChild(itemExclusiveSection);
    addSectionName(itemExclusiveSection, 'Exclusive');
    let ul = addUnorderedList(itemExclusiveSection, 'exclusiveList');

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
    itemRuneSkillsSection.style.display = 'none';
    itemRuneSkillsSection.id = 'itemRuneSkillsSection';
    element.appendChild(itemRuneSkillsSection);
    addSectionName(itemRuneSkillsSection, 'Rune Skills');

    let runeSkillsTable = document.createElement('table');
    runeSkillsTable.classList.add('runeSkillsTable');
    runeSkillsTable.id = 'runeSkillsTable';
    itemRuneSkillsSection.appendChild(runeSkillsTable);
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

function createListItem (element, text, color){
    let unorderedListItem = document.createElement('li');
    element.appendChild(unorderedListItem);

    let span = document.createElement('span');
    span.textContent = text;
    span.style.color = color ? color : '#9b8bef';
    unorderedListItem.appendChild(span);
}

function cleanInfoCard(infoImage){
    for (let element of document.getElementsByClassName('infoCard')[0].getElementsByClassName('infoSection')){
        element.style.display = 'none'
    }

    for (let ul of document.getElementsByClassName('infoUnorderedList')) {
        ul.replaceChildren();
    }
    document.getElementById('runeSkillsTable').replaceChildren();
    infoImage.classList.remove('runeSecondaryListItemImage');
    infoImage.style.removeProperty('background-image');
    infoImage.removeAttribute('src');
}

const infoSections = {
    [itemType.GEM]: ['itemBasicSection', 'itemSuffixSection'],
    [itemType.GEAR]: ['itemBasicSection', 'itemPrefixSection', 'itemSuffixSection'],
    [itemType.HEIRLOOM]: ['itemBasicSection', 'itemPrefixSection', 'itemSuffixSection'],
    [runeType.PRIMARY]: ['itemBasicSection', 'itemPrefixSection', 'itemSuffixSection', 'itemRuneSkillsSection'],
    [runeType.SECONDARY]: ['itemBasicSection', 'itemPrefixSection', 'itemSuffixSection'],
}

function setupInfoCardSections(type){
    for (let section of infoSections[type]) {
        document.getElementById(section).style.display = 'block';
    }
}


function sortRuneSkills (runeSkills){
    let sortedRunes = {};
    for (let skill of Object.values(runeSkills)){
        sortedRunes[skill['requirements'].reduce(function (c, d) {
            return c + d['amount'];
        }, 0)] = skill;
    }
    return Object.values(sortedRunes);
}

function populateRuneInformation(rune, image) {
    let infoImage = document.getElementById('itemInfoImage');
    cleanInfoCard(infoImage);
    setupInfoCardSections(rune.rune_type);

    document.getElementById('itemInfoName').textContent = rune.name;
    console.log(image);
    infoImage.style.backgroundImage = image;

    createListItem(document.getElementById('basicList'), rune.basic.split('//')[0], "white");

    let prefixList = document.getElementById('prefixList');
    let prefixes = [...new Set(Array.from(rune.prefix, ({ type }) => type).sort())];
    for (let prefix of prefixes){
        createListItem(prefixList, prefix);
    }

    let suffixList = document.getElementById('suffixList');
    let suffixes = [...new Set(Array.from(rune.suffix, ({ type }) => type).sort())];
    for (let suffix of suffixes){
        createListItem(suffixList, suffix);
    }

    if(rune.rune_type === runeType.PRIMARY) {
        document.getElementById('itemType').textContent = "Main Rune";
        let skillsTable = document.getElementById('runeSkillsTable');

        for (let key of sortRuneSkills(rune.skill)) {
            addRuneSkillToTable(skillsTable, key.requirements, key.effect)
        }
    } else {
        document.getElementById('itemType').textContent = "Sub Rune";
        infoImage.classList.add('runeSecondaryListItemImage');
    }
}

function populateGemInformation(gem, image) {
    let infoImage = document.getElementById('itemInfoImage');
    document.getElementById('itemType').textContent = "Gem";
    cleanInfoCard(infoImage);
    setupInfoCardSections(itemType.GEM);

    document.getElementById('itemInfoName').textContent = gem.name;
    console.log(image);
    infoImage.style.backgroundImage = image;


    let suffixList = document.getElementById('suffixList');
    let suffixes = [...new Set(Array.from(gem.affix, ({ type }) => type).sort())];
    for (let suffix of suffixes){
        createListItem(suffixList, suffix);
    }

}