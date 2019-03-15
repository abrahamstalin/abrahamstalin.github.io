class AjalTypeWriter{
  constructor(id){
    this.id = id;
    this.time = 40;
    this.element = document.getElementById(this.id);
    this.text = this.element.getAttribute("atw-text");
    this.textAll = this.element.getAttribute("atw-text");
    if (this.element.getAttribute("atw-time")){
      this.time = parseInt(this.element.getAttribute("atw-time"));
    }
    this.textArray = this.text.split('');
    this.newTextArray = [];
    this.timeProcess = 900;
  }


  start(){
    this.process();
  }

  infinity(ejecutando = false){

    if (!ejecutando){
      ejecutando = true;
      this.process();
    }

    if (this.textArray.join('')==this.newTextArray.join('')){
      this.infinityTwo(false);
    }else{
      setTimeout(()=>{
          this.infinity(ejecutando);
        },this.timeProcess);

    }

  }
  infinityTwo(ejecutando = false){
    if (!ejecutando){
      ejecutando = true;
      this.reverse();
    }

    if (''==this.newTextArray.join('')){
      this.infinity(false);
    }else{
      setTimeout(()=>{
          this.infinityTwo(ejecutando);
        },this.timeProcess);
    }

  }
  reverse(){
    if (this.newTextArray.length == 0){
      this.newTextArray = this.textArray;
      this.paintHtml();
    }
    this.processReverse();
  }

  process(){
    if (this.textArray.join('')!=this.newTextArray.join('')){
      this.newTextArray.push(this.textArray[this.newTextArray.length]);
      this.paintHtml();
      setTimeout(()=>{
        this.process();
      },this.time);
    }
  }

  processReverse(){
    if (''!=this.newTextArray.join('')){
      this.newTextArray.pop();
      this.paintHtml();
      setTimeout(()=>{
        this.processReverse();
      },this.time);
    }
  }

  paintHtml(){
    this.element.innerHTML = this.newTextArray.join('');
  }

}
