// Opdracht 1: Array met objecten
// We gebruiken de nummers (163821) als een 'id' binnen het object
let passagiersLijst = [
    { id: 163821, naam: "Leo Daams", saldo: 34, woonplaats: "Den Bosch" },
    { id: 145032, naam: "Nicole Hops", saldo: 18, woonplaats: "Maastricht" }
];


// Opdracht 2: Functionaliteiten

// Functie: Lijst met passagiers oproepen
function toonPassagiers() {
    console.log("--- Actuele Passagierslijst ---");
    passagiersLijst.forEach(p => {
        console.log(`ID: ${p.id} | Naam: ${p.naam} | Saldo: €${p.saldo} | Stad: ${p.woonplaats}`);
    });
}

// Functie: Nieuwe passagier toevoegen
function voegPassagierToe(id, naam, saldo, woonplaats) {
    passagiersLijst.push({ id, naam, saldo, woonplaats });
}

// Functie: In- of uitchecken (saldo aanpassen)
function mutatieSaldo(id, bedrag) {
    let reiziger = passagiersLijst.find(p => p.id === id);
    if (reiziger) {
        reiziger.saldo += bedrag;
        console.log(`Saldo van ${reiziger.naam} is nu: €${reiziger.saldo}`);
    }
}

// Functie: OV-kaart opzeggen (verwijderen)
function verwijderPassagier(id) {
    passagiersLijst = passagiersLijst.filter(p => p.id !== id);
}


// --- TESTEN VAN DE FUNCTIONALITEITEN ---

// 1. Nieuwe passagier toevoegen
voegPassagierToe(123456, "Max Nikoliszyn", 20, "Herkenbosch");

// 2. Inchecken (er gaat €4 af)
mutatieSaldo(163821, -4);

// 3. Opzeggen (Nicole verwidjeren)
verwijderPassagier(145032);

// 4. De lijst tonen
toonPassagiers();