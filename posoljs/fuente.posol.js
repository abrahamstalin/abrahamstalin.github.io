/**
 * @author abrahamstalin
 * Framework de validación de formularios.
 */

const PozolJSFn = [
  (input)=>{
    return (input.getAttribute('required') && input.value == '');
  },
  (input)=>{
    return (input.getAttribute('type')=='email' && ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value));
  },
  (input) =>{
    return (input.getAttribute('comparar-igual') && input.value !=  document.getElementById(input.getAttribute('comparar-igual')).value);
  }
];

class Pozol{
	constructor(id,mensajes=null){
		this.id = id;
    this.validaciones = PozolJSFn;
		this.form = document.getElementById(this.id);
		this.form.onsubmit = (event)=>{
			if (this.esValido())
				return true;
			else{
				event.preventDefault()
				return false;
			}
		}
    if (mensajes){
      this.objetoMensajes =[];
      for (let om of mensajes){
        this.objetoMensajes[om.id]={clase:om.clase, mensaje:om.mensaje,elementoMensaje:om.elementoMensaje}
        if (!this.objetoMensajes[om.id].clase)
          this.objetoMensajes[om.id].clase = 'error';
      }
    }else{
      this.objetoMensajes = null;
    }
		this.inputs = [];
		Array.prototype.forEach.call(this.form.elements, (el)=> {
		    if (el.tagName === 'INPUT'){
		    	el.classOrignial = el.getAttribute('class');
		    	this.inputs.push(el);
		    }

		});
		this.inputs.forEach((input)=>{
			input.addEventListener('keyup',(event)=>{
				this.inputValido(input)
			});
		});
	}

  mostrarMensaje(errorInput,input){
    if (this.objetoMensajes && this.objetoMensajes != null && this.objetoMensajes[input.getAttribute('id')]){
      let mensaje = this.objetoMensajes[input.getAttribute('id')];
      if (errorInput) {
  			input.setAttribute('class',input.classOrignial + ' ' + mensaje.clase);
        try{
          document.getElementById(mensaje.elementoMensaje).innerHTML = mensaje.mensaje;
        }catch(err){
          console.log(err);
        }

  		}else {
  			input.setAttribute('class',input.classOrignial);
        try{
          document.getElementById(mensaje.elementoMensaje).innerHTML = '';
        }catch(err){
          console.log(err);
        }
  		}

    }else{
      if (errorInput) {
  			input.setAttribute('class',input.classOrignial + ' is-invalid');
  			if (input.getAttribute('error-mensaje-element') && input.getAttribute('error-mensaje')){
  				document.getElementById(input.getAttribute('error-mensaje-element')).innerHTML = input.getAttribute('error-mensaje');
  			}
  		}else {
  			input.setAttribute('class',input.classOrignial);
  			if (input.getAttribute('error-mensaje-element') && input.getAttribute('error-mensaje')){
  				document.getElementById(input.getAttribute('error-mensaje-element')).innerHTML = '';
  			}
  		}
    }
  }

	inputValido(input){
		let errorInput = false;
    for (let val of this.validaciones){
      if (val(input)) errorInput= true;
    }
		this.mostrarMensaje(errorInput,input);
		return !errorInput;
	}
	esValido(){
		let result = true;
		this.inputs.forEach((input)=>{ input.setAttribute('class',input.classOrignial); });
		this.inputs.forEach((input)=>{
			if(result) result = this.inputValido(input);
			else this.inputValido(input);
		});
		return result;
	}
}
