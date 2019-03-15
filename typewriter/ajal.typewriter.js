class AjalTypeWriter{
  constructor(id){
    this.id = id;
    this.time = 40;
    this.element = document.getElementById(this.id);
    this.text = this.element.getAttribute("atw-text");
    this.textArray = this.text.split('');
    this.newTextArray = [];
  }


  start(){
    this.process();
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
