/*
       -=|SYMPTOM SJEKKER APP|=-
       Med høytid for både basselusker og basiller så er det handy og ha en egen app
       som kan sjekke symptomene dine og fortelle deg hva slags sykdom du har. Sparer 
       oss for mange turer til legen 😉

       1. Det skal være mulig å taste inn ett og ett symptom i et inputfelt - disse skal lagres
       2. Ved å trykke på f.eks en knapp så skal man kunne få opp forslag til sykdommer man kan ha
       3. Gjør det mulig å bli koblet opp til en lege som er spesialist på den sykdommen man velger på en enkel måte
       4. La "Legen" komme med svar når man stiller spørsmål til denne legen vía et input. 
          La gjerne de forskjellige legene ha forskjellige svar

*/

const symptomer = ["hoste", "kvalme", "svimmelse", "sår hals", "slapphet", "feber", "tett nese", "tørrhoste", "kløe i hals"]
const leger = [
    { name: 'Eskil', spesialities: [0, 1,] },
    { name: 'Geir', spesialities: [2, 3,] },
    { name: 'Terje', spesialities: [4, 5,] }
];
const sykdommer = [
    { name: 'Korona', symptomer: [0, 5, 6, 7] },
    { name: 'Lett forkjølelse', symptomer: [0, 3, 6, 7,] },
    { name: 'Imposter Syndrome' },
    { name: 'Mannesjuk', symptomer: [0, 1, 2, 3, 4, 5, 6, 7, 8,] },
    { name: 'Tyfis', symptomer: [0, 2, 4, 6] },
    { name: 'Rabis', symptomer: [1, 2, 6, 8] },
];


let info = '<p>God dag! Hva kan vi hjelpe deg med i dag?</p>'; 

view();
function view() {
    let html = document.getElementById(`app`);
    html.innerHTML = /*HTML*/`
   <input id="pasientInput" type="text" placeholder="Symptomer">
   <button onclick="detectInput()">Submit</button>
   <div>${info}</div>
   <div> ${selectDoctor()} kan hjelpe deg</div>
   `;

}

function detectInput() {
    let inputValue = document.getElementById("pasientInput").value;
    let inputText = inputValue.toLowerCase();
    const userSymptoms = [];
    

    for (let i = 0; i < symptomer.length; i++) {
        if(inputText.includes(symptomer[i])) {
            userSymptoms.push(symptomer[i]);
            console.log(userSymptoms);
        }
    }

    return userSymptoms //alle symtomene som personen opplever
}

function selectDoctor() {
    let poengEskil = 0
    let poengGeir = 0
    let poengTerje = 0

    const inputFromUser = detectInput()
    if(inputFromUser.length == 0) return "fullfør for å finne legen din"
    //først lege, så spesialiteter og så symptomer
    for (let i = 0; i < leger.length; i++) {
      for(let j = 0; j < leger[i].spesialities.length; j++) {
         for(let l = 0; l < inputFromUser.length; l++) {
            if (leger[i].spesialities[j] == inputFromUser[l]) {
               if (i == 0) poengEskil++
               if (i == 1) poengGeir++
               if (i == 2) poengTerje++
            }
        }
      }
    }
    info = 'Vi har kalkulert med svart magi at:'
    if(poengEskil > poengGeir || poengEskil > poengTerje) return "Eskil"
    if(poengGeir > poengEskil || poengGeir > poengTerje) return "Geir"
    if(poengTerje > poengEskil || poengTerje > poengGeir) return "Terje"

    return `Ingen lege`
}

function selectSykdom() {
   info = ''; 
   for(let i = 0; i < symptomer.length; i++){
      for(let j = 0; j < sykdommer.length; j++){
         if(symptomer[i] === sykdommer[j]){ 
            info = /*HTML*/`
            <div></div>
            `;
         }
         
      }
   }
    //velger den sykdommen vi antar det er grunnet symtomer
    return //sykdommen
}