// Functie om het netjes te houden
function toonPassagiers(lijst) {
    for (let i = 0; i < lijst.length; i++) {
        console.log(lijst[i]);
    }
    console.log("---"); // Scheiding tussen opdrachten
}

//opdracht 1
let passagiers = ["Max", "Rosa", "Dillan", "Nick", "Mika", "Quijian", "Wout", "Naomi", "Sem", "Dinand"];
console.log("Opdracht 1: Startlijst");
toonPassagiers(passagiers);

//opdracht 2
passagiers.push("Diego");
console.log("Opdracht 2: Na het instappen");
toonPassagiers(passagiers);

//opdracht 3
passagiers.splice(4, 1);
console.log("Opdracht 3: Na het uitstappen van het vijfde persoon");
toonPassagiers(passagiers);

//opdracht 4
passagiers.sort(() => Math.random() - 0.5);
console.log("Opdracht 4: Na het schudden van de bus");
toonPassagiers(passagiers);

//opdracht 5
console.log("Opdracht 5: Iedereen stapt uit bij de eindbestemming");
while (passagiers.length > 0) {
    let uitgestapt = passagiers.pop();
    console.log(uitgestapt + " is uitgestapt. Passagiers over: " + passagiers.length);
}