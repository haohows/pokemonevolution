// 針對要被拖曳的元素 (進化石) 監聽 dragstart 事件， 並且把要傳遞給 pokemon (寶可夢) 的資料透過 setData 加以設定：
function evolutionaryStones() {
    let waterStone = document.querySelector('#waterStone');
    let fireStone = document.querySelector('#fireStone');
    let thunderStone = document.querySelector('#thunderStone');
    let shinyStone = document.querySelector('#shinyStone');
    let duskStone = document.querySelector('#duskStone');

    waterStone.addEventListener('dragstart', dragStoneStart);
    fireStone.addEventListener('dragstart', dragStoneStart);
    thunderStone.addEventListener('dragstart', dragStoneStart);
    shinyStone.addEventListener('dragstart', dragStoneStart);
    duskStone.addEventListener('dragstart', dragStoneStart);

    function dragStoneStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);

    };
}
evolutionaryStones();

// 針對要被置放的容器 pokemon 監聽 drop 事件， 來處理當使用者放掉的時候要執行的行為， 並透過 getData 來取得傳遞的資料； 監聽 dragenter 和 dragover 事件來避免預設行為：
//放置容器設置偵聽事件
function addDop() {
    let pokemon = document.querySelector('#pokemon');
    pokemon.addEventListener('drop', dropStoneInPokemon);
    pokemon.addEventListener('dragenter', cancelDefault);
    pokemon.addEventListener('dragover', cancelDefault);
}
addDop();


// 進化石放置區
function evolutionaryStone() {
    let evolutionaryStone = document.querySelectorAll('.evolutionaryStone');
    let Stone = document.querySelectorAll('.stone');
    for (let i = 0; i < evolutionaryStone.length; i++) {
        if (
            evolutionaryStone[i].contains(waterStone) ||
            evolutionaryStone[i].contains(fireStone) ||
            evolutionaryStone[i].contains(thunderStone) ||
            evolutionaryStone[i].contains(shinyStone) ||
            evolutionaryStone[i].contains(duskStone)
        ) {
            evolutionaryStone[i].removeEventListener('drop', dropStonesInArea);
            evolutionaryStone[i].removeEventListener('dragenter', cancelDefault);
            evolutionaryStone[i].removeEventListener('dragover', cancelDefault);
        } else {
            evolutionaryStone[i].addEventListener('drop', dropStonesInArea);
            evolutionaryStone[i].addEventListener('dragenter', cancelDefault);
            evolutionaryStone[i].addEventListener('dragover', cancelDefault);
        }
    }
}


//寶可夢放置
function dropStoneInPokemon(e) {
    cancelDefault(e);
    let id = e.dataTransfer.getData('text/plain');
    e.target.appendChild(document.querySelector('#' + id));
    evolutionaryStone();
    evolutionaryMessage(id);
};

// 進化石放置
function dropStonesInArea(e) {
    cancelDefault(e);
    let id = e.dataTransfer.getData('text/plain');
    e.target.appendChild(document.querySelector('#' + id));
    evolutionaryStone();
};

// 禁止預設事件
function cancelDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
};

// 當伊布進化後，就不能再放進化石
function evolutionaryMessage(id) {
    if (
        pokemon.contains(waterStone) ||
        pokemon.contains(fireStone) ||
        pokemon.contains(thunderStone) ||
        pokemon.contains(shinyStone) ||
        pokemon.contains(duskStone)
    ) {
        removeDop();
        pokemonEvolution();
        pokemonType(id);
    };
};


//放置容器移除偵聽事件
function removeDop() {
    pokemon.removeEventListener('drop', dropStoneInPokemon);
    pokemon.removeEventListener('dragenter', cancelDefault);
    pokemon.removeEventListener('dragover', cancelDefault);
}

//進化石使用效果
function pokemonEvolution() {
    setTimeout(() => {
        pokemon.classList.add('stoneHide');
    }, 300);
    setTimeout(() => {
        pokemon.classList.add('stoneNone');
    }, 800);
    setTimeout(() => {
        pokemon.classList.add('pokemonHide');
    }, 1000);
}

// 寶可夢進化類型判定
function pokemonType(id) {
    setTimeout(() => {
        switch (id) {
            case 'waterStone':
                pokemon.classList.remove('EeveeText');
                pokemon.classList.add('Vaporeon');
                pokemon.classList.add('VaporeonText');

                break;

            case 'fireStone':
                pokemon.classList.remove('EeveeText');
                pokemon.classList.add('Flareon');
                pokemon.classList.add('FlareonText');
                break;

            case 'thunderStone':
                pokemon.classList.remove('EeveeText');
                pokemon.classList.add('Jolteon');
                pokemon.classList.add('JolteonText');
                break;

            case 'shinyStone':
                pokemon.classList.remove('EeveeText');
                pokemon.classList.add('Espeon');
                pokemon.classList.add('EspeonText');
                break;

            case 'duskStone':
                pokemon.classList.remove('EeveeText');
                pokemon.classList.add('Umbreon');
                pokemon.classList.add('UmbreonText');
                break;

            default:
                break;
        }
        resetSwitch = true;
        reset.classList.remove('conNotClick')
    }, 1500);
}


//還原設置
let reset = document.querySelector('#reset');
let content = document.querySelector('.content');
let resetSwitch = false;
let originalData = content.innerHTML;
reset.addEventListener('click', resetEvolutionary);

function resetEvolutionary() {
    if (!resetSwitch) {
        return
    } else {
        content.innerHTML = originalData;
        reset.classList.add('conNotClick')
        removeDop();
        addDop();
        evolutionaryStones();
        resetSwitch = false;
    }
}


//限定只可以用PC瀏覽
function userIsNotPc() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        let userIsNotPcWrap = document.querySelector('.wrap');
        userIsNotPcWrap.innerHTML = `
            <div style="text-align: center;background:#ffffff; font-weight: bold;">
            <p style="font-size:16px">很抱歉，本頁面不支援行動載具</p>
            <p style="font-size:16px">請改用PC開啟本頁面</p>
            </div>
        `
    } else {
        return;
    }
}
userIsNotPc();