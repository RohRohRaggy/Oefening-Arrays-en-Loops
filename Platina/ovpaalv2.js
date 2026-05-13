// Opdracht 1: De Data
let passagiersLijst = [
    { id: 163821, naam: "Leo Daams", saldo: 34, woonplaats: "Den Bosch", foto: "https://i.pravatar.cc/150?u=163821" },
    { id: 145032, naam: "Nicole Hops", saldo: 18, woonplaats: "Maastricht", foto: "https://i.pravatar.cc/150?u=145032" },
    { id: 192837, naam: "Rosa Janssen", saldo: 45, woonplaats: "Herkenbosch", foto: "https://i.pravatar.cc/150?u=192837" },
    { id: 556677, naam: "Dillan Smits", saldo: 12, woonplaats: "Roermond", foto: "https://i.pravatar.cc/150?u=556677" },
    { id: 882233, naam: "Nino de Wit", saldo: -2, woonplaats: "Vlodrop", foto: "https://i.pravatar.cc/150?u=882233" },
    { id: 449911, naam: "Mustafa Aydin", saldo: 150, woonplaats: "Eindhoven", foto: "https://i.pravatar.cc/150?u=449911" },
    { id: 223344, naam: "Younes Bakari", saldo: 25, woonplaats: "Venlo", foto: "https://i.pravatar.cc/150?u=223344" },
    { id: 334455, naam: "Nick van Dam", saldo: 60, woonplaats: "Herten", foto: "https://i.pravatar.cc/150?u=334455" },
    { id: 778899, naam: "Mika Peters", saldo: 8, woonplaats: "Melick", foto: "https://i.pravatar.cc/150?u=778899" },
    { id: 112233, naam: "Dinand Vossen", saldo: 22, woonplaats: "Sint Odiliënberg", foto: "https://i.pravatar.cc/150?u=112233" }
];

// Geluid inladen voor inchecken
const checkSound = new Audio('sounds/inchecken.wav');

// Variabelen voor de busroute
let huidigeHalteIndex = 0;
const totaalHaltes = 6;


// functies voor passagiers
function toonPassagiers() {
    const container = document.getElementById('passagiers-container');
    container.innerHTML = '';

    passagiersLijst.forEach(p => {
        const kaart = document.createElement('div');
        kaart.className = 'passagier-kaart';
        kaart.innerHTML = `
            <img src="${p.foto}" alt="${p.naam}">
            <div class="passagier-info">
                <strong>${p.naam}</strong>
                Saldo: €${p.saldo} (${p.woonplaats})
            </div>
            <div class="actions">
                <button onclick="mutatieSaldo(${p.id}, -4)">Check in</button>
                <button onclick="verwijderPassagier(${p.id})" class="btn-delete">X</button>
            </div>
        `;
        container.appendChild(kaart);
    });
}

function voegPassagierToe(id, naam, saldo, woonplaats) {
    passagiersLijst.push({
        id,
        naam,
        saldo,
        woonplaats,
        foto: `https://i.pravatar.cc/150?u=${id}`
    });
    toonPassagiers();
}

function mutatieSaldo(id, bedrag) {
    let reiziger = passagiersLijst.find(p => p.id === id);
    if (reiziger) {
        reiziger.saldo += bedrag;
        checkSound.play().catch(() => {
            console.log("Geluid geblokkeerd: klik eerst ergens op de pagina.");
        });
        toonPassagiers();
    }
}

function verwijderPassagier(id) {
    passagiersLijst = passagiersLijst.filter(p => p.id !== id);
    toonPassagiers();
}

// functies voor busroute

function verwerkHalteGebeurtenissen() {
    console.log("Halte bereikt: passagiers worden verwerkt...");

    // Willekeurige acties voor mensen die al in de bus zitten
    passagiersLijst.forEach(p => {
        const kans = Math.random();
        if (kans < 0.25) { // 25% kans op automatisch inchecken
            mutatieSaldo(p.id, -4);
        } else if (kans > 0.85) { // 15% kans op uitstappen
            verwijderPassagier(p.id);
        }
    });

    // Kans op nieuwe passagiers die instappen
    if (Math.random() > 0.5) {
        const nieuwId = Math.floor(Math.random() * 999999);
        const namen = ["Timur", "Jarno", "Milan", "Mustafa", "Dillan"];
        const naam = namen[Math.floor(Math.random() * namen.length)];
        voegPassagierToe(nieuwId, naam, 20, "Onbekend");
    }
}

function updateBusLocatie() {
    // Reset alle haltes visueel
    for (let i = 0; i < totaalHaltes; i++) {
        const halteElement = document.getElementById(`halte-${i}`);
        if (halteElement) {
            halteElement.classList.remove('current');
            halteElement.innerText = halteElement.innerText.replace(' (Huidig)', '');
        }
    }

    // Zet de bus op de nieuwe halte
    const actueleHalte = document.getElementById(`halte-${huidigeHalteIndex}`);
    if (actueleHalte) {
        actueleHalte.classList.add('current');
        actueleHalte.innerText += ' (Huidig)';
    }

    verwerkHalteGebeurtenissen();

    // Verhoog index voor de volgende 20 seconden
    huidigeHalteIndex = (huidigeHalteIndex + 1) % totaalHaltes;
}

// Elke 20 seconden naar de volgende halte
setInterval(updateBusLocatie, 20000);

// start simulatie op laden
window.onload = () => {
    toonPassagiers();
    updateBusLocatie();
};