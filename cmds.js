

const {log, biglog, errorlog, colorize} = require("./out");
const model = require('./model');


exports.helpCmd=rl=>{

    log('Comandos!','red');
      log('h/help - muestra ayuda','red');
     log('list - listar los quizzes existentes','red');
     log('show <id> - muestra la pregunta y la respuesta el quiz indicado por el id','red');
      log('add - añadir un nuevo quiz interactivamente','red');
      log('delete <id> - borra el quiz indicado','red');
      log('edir <id> - editar el quiz indicado','red');
      log('test <id> - probar el quiz indicado','red');
      log('p/play - jugar con preguntasaleatorias de todos los quizes','red');
      log('credits - creditos','red');
      log('q/quit - salir del programa','red');
      rl.prompt();
     };

  exports.quitCmd=rl=>{
    rl.close();
    rl.prompt();
   };

  exports.addCmd=rl=>{
   rl.question(colorize('introduzca una pregunta:','red'), question =>{
     rl.question(colorize('introduzca la respuesta','red'), answer => {
       model.add(question,answer);
       log(`${colorize('se ha añadido','magenta')}: ${question} ${colorize('=>','magenta')} ${answer}`);
        
     });
    
   });
   
    };
exports.listCmd=rl=>{
   model.getAll().forEach((quiz,id) => {
     log(`[${colorize(id,'magenta')}]: ${quiz.question}` ) ;
     
   });
   
   
   
    rl.prompt();
   };

   exports.showCmd=(rl,id)=>{
     if(typeof id === "undefined"){
       errorlog(`falta el parametro id`);
     } else {
       try{
         const quiz = model.getByIndex(id);
         log(`[${colorize(id,'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
       }catch(error){
       errorlog(error.message)
     }
     }
    rl.prompt();
    };

exports.testCmd=(rl,id)=>{
    if(typeof id === "undefined"){
       errorlog(`falta el parametro id`);
       rl.prompt();
     } else {
       try{
         const quiz = model.getByIndex(id);
             
        
         rl.question(`${colorize(quiz.question,'red')} ${colorize("?",'red')} `,hola=>{
       const hola1 =  hola.trim();
         
            if(hola1===quiz.answer){
              log("Su respuesta es correcta.");
             biglog('CORRECTO :D','green');
             rl.prompt();
            }
            else{
              log("Su respuesta es incorrecta.");
              biglog("INCORRECTO :( ",'red');  
              rl.prompt();}
         
           
         });   
          }catch(error){
       errorlog(error.message)
       rl.prompt();
     }}
         };
exports.playCmd=rl=>{
  let score =0;
  let array=[];
  const tamano = model.count();
  var i;
  let a =0;
  let z = model.count();
 for(i=0;i<model.count();i++){
    array[i]=i;
  
}
  let b=model.count(); 
  const jugar = () => {
    var p;
    if(b===0){
      log(score);
      log("se termino el juego");
       salir();
    }
   
      const a =0;
   b-- ;
    const numero =  Math.round(Math.random()*(b-a)+parseInt(a));
    
    const pregunta =(array[numero]);
    array.splice(numero, 1);
   if(pregunta>-1){
         const quiz = model.getByIndex(pregunta);
             
        
         rl.question(`${colorize(quiz.question,'red')} ${colorize("?",'red')} `,hola=>{
       
          const hola1 =  hola.trim();
            if(hola1===quiz.answer){
            
              score++;
             log("CORRECTO - Lleva"+score+" acuertos");
             jugar();
             z--;
             
            
            }
            else{
             log("Su respuesta es incorrecta.");
             
              salir();
              }
         
           
         });
    }else{
    
      salir();
    }}
       jugar();
    
   const salir = () => {
     log("Fin del juego. Aciertos "+score);
     biglog(score,'magenta')  ;    rl.prompt();
   }
  };
   
  /*
  let score = 0;
  
  let toBeResolved =[];
  const tamano =5;
  var i;
  for (i = 0; i<tamano;i++){
    toBeResolved[i]=i;
  
    
  }const loadplay= () => {
  if(toBeResolved===null){
    log("no hay preguntas") ;
    biglog(score);}
    else{
      
  for (i = 0; i<tamano;i++){
   
    const a =0;
   const b = toBeResolved.length ;
    const numero =  Math.round(Math.random()*(b-a)+parseInt(a));
   
    const pregunta = parseInt(toBeResolved[numero]);
    toBeResolved.splice(numero, 1);
   
         const quiz = model.getByIndex(pregunta);
             
        
         rl.question(`${colorize(quiz.question,'red')} ${colorize("?",'red')} `,hola=>{
       
          
            if(hola===quiz.answer){
              score++;
             biglog(score,'green');
             loadplay();
             
            
            }
            else{
              biglog(score,'red');   
              rl.prompt();}
         
           
         }); 
    
    
 
  
  
  } }       }
*/

  

exports.deleteCmd=(rl,id)=>{
  if(typeof id === "undefined"){
       errorlog(`falta el parametro id`);
     } else {
       try{
        model.deleteByIndex(id);
       }catch(error){
       errorlog(error.message)
     }
     }
    rl.prompt();
    };
exports.editCmd=(rl,id)=>{
  ////////////////////// no me detecta si escribo un numero muy grande
   if(typeof id === "undefined"){
       errorlog(`falta el parametro id`);
       rl.prompt();
     } else {
       try{
         const quiz = model.getByIndex(id);
         
         process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)}, 0);
         
         rl.question(colorize('Introduzca una pregunta: ', 'red'), question=>{
           
            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)}, 0);
           rl.question(colorize('Introduzca una respuesta: ', 'red'),answer=>{
             model.update(id,question,answer);
             log(`se ha cambiado el quiz ${colorize(id,'magenta')}por: ${question} `)
             rl.prompt();
           });
         });   
          }catch(error){
       errorlog(error.message)
       rl.prompt();
     }}
         };
exports.creditsCmd=rl=>{
    log(`Autor de la practica: '${colorize("Jose Tome Mayo",'green')}'.`);
  
   
    rl.prompt();
    };
