


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data)
        )
}


const removeActive = () => {
    const Btns = document.querySelectorAll(".lesson-btn");
    Btns.forEach((btn) => {
        btn.classList.remove("active");
    })
}


const loadLevelWord = (id) => {

    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    
    
    removeActive()
    
    clickBtn.classList.add("active");
    
    fetch(url)
        .then(res => res.json())
    .then(data=>displayLevelWord(data.data))
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    wordDetailDisplay(details.data)
    
    
}


const manageSpinner = (status) => {
    if (status) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    } else {
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
  
}




const createElements = (arr) => {
  
    const elements =  arr.map((el) => {
        const htmlElement = `<span class="btn">${el}</span>`;
        return htmlElement;
        
    })
    

    return elements.join("  ");
}


const wordDetailDisplay = (word) => {
    

    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    
        <div id="details-container" class="space-y-6">

              <div>
                <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
              </div>
              <div>
                <h2 class="font-bold">Meaning</h2>
                <p>${word.meaning}</p>
              </div>

              <div>
                <h2 class="font-bold">Example</h2>
                <p>${word.sentence}</p>
              </div>
              <div>
                <h2 class="font-bold">Synonym</h2>
                <div>${createElements(word.synonyms)}</div>
              </div>



            </div>
            

    `
    document.getElementById("my_modal_4").showModal();

}

// my_modal_4.showModal()
const displayLevelWord = (words) => {
    
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center  col-span-full space-y-6 py-10">
        <img src="./assets/alert-error.png" class="mx-auto"/>
              <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
              <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
          </div>
       `
        manageSpinner(false)
        return 
    }
    words.forEach(word => {
        
        const card = document.createElement("div");
       

        card.innerHTML = `
            <div class="bg-white text-center rounded-xl shadow-sm py-10 px-4" >
            <h2 class="font-bold text-2xl">${word.word? word: "শব্দ পাওয়া যায় নি"}</h2>
            <p class="font-medium my-2">Meaning/Pronunciation</p>
            <div class="text-2xl font-semibold font-bangla">"${word.meaning? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation : "Pronunciation পাওয়া যায় নি"}"</div>
            <div class="flex justify-between items-center">
              
              <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ffcc]"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ffcc]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `

        wordContainer.append(card)
    })
    manageSpinner(false)
}


const displayLesson = (data) => {

    const lessons = data.data;
    
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
 
    for(const lesson of lessons){

        const btnDiv = document.createElement("div");
        

        btnDiv.innerHTML = `
            <button  id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" href="">
            <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
            </button>
        `

        levelContainer.appendChild(btnDiv)
        
    };
}

loadLessons()