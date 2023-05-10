class Utilities{
    static autoResize(element){
            element.style.height = (element.scrollHeight)+"px";
    }

    static copyClipboard(element){

        navigator.clipboard.writeText(element.innerText)
        .then(() => {
            alert("Se ha copiado el texto seleccionado");
        })
        .catch((err) => {
            console.log(err.message);
        })

    }
}





class Challenge{
    constructor(selector){
        this.textBox          = document.querySelector(selector);
        this.encryptButton    = document.querySelector("#encrypt");
        this.decryptButtton   = document.querySelector("#decrypt");
        this.boxError         = document.querySelector(".area__footer");
        this.textError        = document.querySelector(".text_error");
        this.boxDecrypter     = document.querySelector(".decrypter");
        this.areaTextP        = document.querySelector(".area__text p");
        this.copyButton       = document.querySelector(".area__button--decrypt");
        this.areaImage        = document.querySelector(".area__image");
        this.textDecripter    = document.querySelector(".decrypter__text");
        this.banderaValidate  = false;  
        this.bindEvents();
    }

    bindEvents(){
        
        this.encryptButton.addEventListener("click",()=>this.encryptText())
        this.decryptButtton.addEventListener("click",()=>this.decryptText())
        this.copyButton.addEventListener("click",()=>{

            if(this.validate() && this.bandera) {
                Utilities.copyClipboard(this.boxDecrypter)
            }    
        });
        

        
    }

    validate(){
        let text                 =  this.textBox.value;
        const regexEmpty         =  /^\s*$/;
        const invalidCharacters  =  /([`@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~áéíóú])/g;


        if(regexEmpty.test(text)){
            this.boxError.classList.add("active");
            this.textError.innerHTML = "Introduce un texto";
            return false;
        }else
        if(invalidCharacters.test(text)){
            this.boxError.classList.add("active");
            this.textError.innerHTML = "Introduce solo letras minúsculas,sin caracteres especiales y sin acentos";
            return false;
        } 
    
        
        this.boxError.classList.remove("active");
        return true;
        
    }

    encryptText(){

        if(this.validate()){
            this.bandera             = true;
            this.areaTextP.innerHTML = "";
            let objReplace           =  { 'a': 'ai', 'e': 'enter','i' :'imes','o':'ober','u':'ufat' } 
            let encryptText          = this.textBox.value;
                encryptText          = encryptText.replace(/[aeiou]/g,letter => objReplace[letter] );

            this.boxDecrypter.innerHTML = encryptText
            this.fixBox(); 

        }
        
    }

    decryptText(){

        if(this.validate()){
            this.areaTextP.innerHTML = "";
            let objReplace           =  { 'ai': 'a', 'enter': 'e','imes' :'i','ober':'o','ufat':'u' } 
            let decryptText          = this.textBox.value;
            /** Utilizamos el metodo replace ygeneramos un bucle que recorre el objecto replace y asigna el valor de la llave */
                decryptText          = decryptText.replace(/(ai|enter|imes|ober|ufat)/g,letter => objReplace[letter] );

            this.boxDecrypter.innerHTML = decryptText;  
            this.fixBox();
            

        }
    }

    fixBox() {
        /* Ocultamos la seccion de la imagen  y el texto*/
        this.areaImage.classList.add("inactive");
        this.textDecripter.classList.add("inactive");
        this.boxDecrypter.classList.add("active");

    }
}



(function(){

    new Challenge("#encrypter");


})();