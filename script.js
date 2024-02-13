//ELEMENTS
const box = document.getElementById("werset_nr1");
const buttonBox = document.getElementById("przyciski");
const markupNext = "<div class='next'> Następna strona ➡</div>";
const markupPrev = "<div class='prev'><- Poprzednia strona</div>";

box.style.border = "none";
//DISPLAYING QUOTE
const btn_Generate = document.querySelector(".btn");
btn_Generate.addEventListener("click", active);

async function active() {
  box.innerHTML = "";
  const option_translation = document.getElementById("translation").value;

  const book = document.getElementById("book_id").value;

  const chapter = document.getElementById("chapter_id").value;
  const text = document.getElementById("verses_id").value;

  if (!option_translation || !book || !chapter || !text) {
    box.innerHTML = "Coś poszło nie tak. Spróbuj podać poprawne dane";
  } else {
    //PAGINACJA

    let versesPerPage = 6;
    const range = String(text).split("-");
    let [firstIndex, lastIndex] = range;

    //JESLI FORMAT: x-y
    if (String(text).includes("-")) {
      //JESLI lastIndex - firstIndex jest mniejsze lub równe 5
      // 1-6 zadziała
      //1-7 już nie
      if (parseInt(lastIndex) - parseInt(firstIndex) <= 5) {
        displayVerse(
          "werset_nr1",
          option_translation,
          book,
          chapter,
          `${firstIndex}-${lastIndex}`
        );
      }
      //JESLI różnica interfejsu podanego przez użytkownika jest mniejsza równa 5
      //np. 1-7 wyswietli sie 1-6
      //dla 3-20 wyswietli sie 3-9
      else {
        parseInt(firstIndex) == 1
          ? displayVerse(
              "werset_nr1",
              option_translation,
              book,
              chapter,
              `${firstIndex}-${versesPerPage}`
            )
          : displayVerse(
              "werset_nr1",
              option_translation,
              book,
              chapter,
              `${firstIndex}-${parseInt(firstIndex) + versesPerPage}`
            );

        buttonBox.insertAdjacentHTML("afterbegin", markupNext);
        const next = document.querySelector(".next");

        let verseX = parseInt(firstIndex);
        let verseY = versesPerPage; //6
        next.addEventListener("click", function () {
          // jesli klikniesz to indexy powinny proporcjonalnie rosnąć
          //ale najpierw powinien zniknąć kontent indexu 1-versesPerPage
          //powinno rosnąć według schematu 1-6,7-12,13-18,19-lastIndex

          box.innerHTML = "";

          verseX = verseX + versesPerPage;
          if (verseY + versesPerPage > parseInt(lastIndex)) {
            displayVerse(
              "werset_nr1",
              option_translation,
              book,
              chapter,
              `${verseX}-${lastIndex}`
            );
            document.getElementById("przyciski").innerHTML = "";
          } else verseY = verseY + versesPerPage;

          //Gdy zajdzie cos takiego że ostatni zakres tablicy zwiekszy sie do tego stopnia że bedzie wiekszy niz zakres podany przez użytkownika

          displayVerse(
            "werset_nr1",
            option_translation,
            book,
            chapter,
            `${verseX}-${verseY}`
          );
        });
      }
    } else {
      displayVerse("werset_nr1", option_translation, book, chapter, text);
    }
  }
}

const colorTheme = document.querySelector(".colorTheme");
colorTheme.addEventListener("click", dayNightPattern);
//CHANGING THEME
function dayNightPattern() {
  if (document.body.className == "day") {
    document.body.className = "night";

    document.body.classList.remove("day");
    //ICON
    colorTheme.innerHTML = "☾";

    //FONT COLOR
    document.body.style.color = "#eeff00";
    document.querySelector(".wrapper").style.color = "white";
    document.querySelector(".wrapper").style.filter = " brightness(0.7)";
  } else if (document.body.className == "night") {
    document.body.className = "day";
    document.body.classList.remove("night");
    //ICON
    colorTheme.innerHTML = "☀";
    //FONT COLOR
    document.querySelector(".wrapper").style.color = "black";
    document.querySelector(".wrapper").style.filter = "none";
  }
}
