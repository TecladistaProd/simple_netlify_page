(() => {
  class TypeWriter {
    constructor(txtEl) {
      this.txtEl = txtEl;
      this.words = JSON.parse(this.getAtt("words"));
      this.txt = "";
      this.wait = parseInt(this.getAtt("wait") || 3000, 10);
      this.wordIndex = 0;
      this.isDeleting = false;
      this.type();
    }
    async type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.txtEl.innerHTML = `<span class="txt">${this.txt}</span>`;

      if (this.txt == fullTxt && !this.isDeleting) {
        this.isDeleting = true;
        await wait(this.wait);
      } else if (this.txt == "" && this.isDeleting) {
        this.isDeleting = false;
        await wait(150);
        this.wordIndex = current + 1;
      }

      let typeSpeed = 250;
      if (this.isDeleting) typeSpeed /= 2;
      setTimeout(() => this.type(), typeSpeed);
      // requestAnimationFrame(this.type);
    }
    getAtt(att) {
      return this.txtEl.getAttribute(`data-${att}`);
    }
  }
  const txtEl = new TypeWriter(document.querySelector(".txt-type"));
  document.querySelector('.modal-btn').addEventListener('click', () => document.querySelector('.modal').classList.add('active'))
  document.querySelector('.modal .close').addEventListener('click', () => document.querySelector('.modal').classList.remove('active'))
})();

function wait(time) {
  return new Promise(res => setTimeout(res, time));
}
