import random from "random-words";

function initForm(id: string) {
  const form = document.getElementById(id) as HTMLFormElement;

  if (form) {
    const word = form.querySelector('input[name="word"]') as HTMLInputElement;
    word.value = random() as string;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const action = form.getAttribute("action") as string;

      if (word && action) {
        fetch(`${action}?word=${word.value}`);
        word.value = random() as string;
        word.focus();
        word.select();
      }
    });
  }
}

initForm("no-middleware");
initForm("skog-middleware");
initForm("special");
