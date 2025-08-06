const textarea = document.querySelector('textarea');
const voicelist = document.querySelector('select');
const speechBtn = document.querySelector('button');

let synth = speechSynthesis; //tarayıcı tarafından sağlanan ses sentezleme arayüzü
let isSpeaking = true; // konuşma durumunu takip eden değişken

function voices(){
    // tarayıcıdaki tüm sesleri al,açılır listede göster

    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : ""; // varsayılan ses olarak Google US English seçildi
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices); // sesler değiştiğinde çağrılır

function textToSpeech(text){
    //metni sesli konuşmaya çevirir
    let utterance = new SpeechSynthesisUtterance(text); // konuşma ifadesi oluştur

    for(let voice of synth.getVoices()){
        if(voice.name === voicelist.value){ // seçilen sesi bul
            utterance.voice = voice; // konuşma ifadesine sesi ata
        }
    }

    utterance.addEventListener("end", () => {
        isSpeaking = false; // konuşma bittiğinde durumu güncelle
        document.querySelector('.placeholder').style.display = "none";
    });

    synth.speak(utterance);
    isSpeaking = true; // konuşma başladığında durumu güncelle
}

speechBtn.addEventListener("click", e => {
    e.preventDefault();

    if(textarea.value !== ""){
        if(!synth.speaking){ // eğer konuşma yapılmıyorsa
            textToSpeech(textarea.value); // metni sesli konuşmaya çevir
            document.querySelector('.placeholder').style.display = "block"; // placeholder'ı göster
        }
    }
});