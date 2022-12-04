var canvas = 
    document.getElementById("canvas"),
    anchura = canvas.width,
    altura = canvas.height,
    cd = canvas.getContext("2d"),
    x, y, radio, radiox, radioy,
    ancho, alto, cad
    unipix = 20;   


function TrazarNumeros(){
cd.beginPath();
cd.lineWidth = 1; 
cd.strokeStyle = 'Turquoise';
for(y=0; y<altura; y+=unipix){
    cd.moveTo(0, y);
    cd.lineTo(anchura, y);
}
for(x=0; x<anchura; x+=unipix){
    cd.moveTo(x, 0);
    cd.lineTo(x, altura);
}
cd.stroke();
cd.beginPath();
cd.moveTo(x, y-60);
cd.strokeStyle = 'Black';
cd.arc(x, y-60, radio+40, 2*Math.PI/12, 2*2*Math.PI/12);
cd.closePath();
cd.fill();    

cd.beginPath();
cd.moveTo(anchura/2, 0);
cd.lineTo(anchura/2, altura);
cd.moveTo(0, altura/2);
cd.lineTo(anchura, altura/2);
cd.stroke();

x = 4;
y = 3;


    for (let i=5;i<anchura; i=i+unipix){
        //x 
        cd.moveTo(i,anchura/2-5);
        cd.lineTo(i,anchura/2);
        //y
           cd.moveTo(altura/2-5,i);
           cd.lineTo(altura/2,i);
           cd.fillText(((i-5)/unipix)-10,i-5,anchura/2-5);
           cd.fillText((10-(i-5)/unipix),altura/2-unipix,i-1)/unipix;
       }
}

TrazarNumeros();
 
function Ecuacion_Lineal (){
            var ecuacion_linea = new Array(12);
            ecuacion_linea[0] = parseFloat( document.getElementById("a").value);
            ecuacion_linea[1] =  parseFloat( document.getElementById("b").value);
            ecuacion_linea[2]=   parseFloat(document.getElementById("c").value);
            ecuacion_linea[3] =  parseFloat(document.getElementById("d").value);
            ecuacion_linea[4] =  parseFloat(document.getElementById("e").value);
            ecuacion_linea[5] =  parseFloat(document.getElementById("f").value);
            ecuacion_linea[6] =  parseFloat(document.getElementById("x1").value);
            ecuacion_linea[7]=  parseFloat(document.getElementById("x2").value);
            ecuacion_linea[8] =  parseFloat(document.getElementById("x3").value);
            ecuacion_linea[9] =  parseFloat(document.getElementById("x4").value);
            ecuacion_linea[10] =  document.getElementById("demo1").innerHTML =ecuacion_linea[0] +"x" +"  + " + ecuacion_linea[1] +"y"+"=" + ecuacion_linea[2];
            ecuacion_linea[11] = document.getElementById("demo2").innerHTML =  ecuacion_linea[3] +"x" +"  + " + ecuacion_linea[4] +"y"+"=" + ecuacion_linea[5];
            return ecuacion_linea;
}
function calculary1y2 (){
    arry1y2 = new Array(2);
    var y = Ecuacion_Lineal();
    arry1y2[0] = (y[2]-y[0]*y[6])/ y[1]; 
	arry1y2[1] = (y[2]-y[0]*y[7])/ y[1]; 
    return arry1y2;    
}

function calculary3y4 (){
    arry3y4 = new Array(2);
    var y = Ecuacion_Lineal();
    arry3y4[0] = (y[5]-y[3]*y[8])/ y[4]; 
	arry3y4[1] = (y[5]-y[3]*y[9])/ y[4]; 
    return arry3y4;
}

function interseccion(arrxy,arrxy2,arrxy3){      
           cd.beginPath();
           cd.arc(arrxy*unipix+anchura/2, -arrxy2*unipix+altura/2, 3, 0, 2*Math.PI);
           cd.fill();
           cad = "(" + arrxy + "," + arrxy2 + ")";
           cd.fillText(cad, arrxy*unipix+anchura/2+3, -arrxy2*unipix+altura/2);          
}
function trazarRecta1(){

        let texto= Ecuacion_Lineal();
        let y1y2 = calculary1y2();
        y1=-(y1y2[0]*unipix-altura/2);
        y2=-(y1y2[1]*unipix-altura/2);
        var x1x2 = Ecuacion_Lineal();
        x1=(x1x2[6]*unipix+anchura/2);
        x2=(x1x2[7]*unipix+anchura/2);        
        cd.beginPath();
        cd.moveTo(x1,y1);
        cd.lineTo(x2,y2);
        cad = texto[10];
        cd.fillText(cad, x2,y2);      
        cd.stroke();
        console.log(y1 + " ," + y2);
} 

function trazarRecta2(){

    let texto= Ecuacion_Lineal();
    
    let y3y4 = calculary3y4();
    y3=-(y3y4[0]*unipix-altura/2);
    y4=-(y3y4[1]*unipix-altura/2);
    var x3x4 = Ecuacion_Lineal();
    x3=(x3x4[8]*unipix+anchura/2);
    x4=(x3x4[9]*unipix+anchura/2);
    cd.beginPath();
    cd.moveTo(x3,y3);
    cd.lineTo(x4,y4);
    cad = texto[11];
    cd.fillText(cad, x4,y4);      
    cd.stroke();
    console.log(y3 + " ," + y4);
} 
function limpiar(){
    cd.clearRect(0,0,altura, anchura);
    TrazarNumeros();
} 

function s2el(tamaño){
    calculary3y4();
    calculary1y2();


    
    var arrxy = new Array(tamaño);
     var x= Ecuacion_Lineal();
	if((x[0]*x[4]-x[3]*x[1])!=0 && x[0]!=0){
		arrxy[1] = (x[0]*x[5]-x[3]*x[2]) / (x[0]*x[4]-x[3]*x[1]);  // valor de y
		arrxy[0] = (x[2] - x[1]*arrxy[1]) / x[0]; // valor de x
		arrxy[2] = 1;	// ok                
	}
	else{
		arrxy[2] = 0;	// error
	}
    if(arrxy[2]==1){
        document.getElementById("demo3").innerHTML =  " x : "  + arrxy[0];
        document.getElementById("demo4").innerHTML =  " y : " +  arrxy[1];
        interseccion(arrxy[0],arrxy[1],arrxy[2]);
        trazarRecta1();
        trazarRecta2();
        
    }
    else{
        document.getElementById("demo4").innerHTML = "No hay soluci&oacute;n";
        interseccion(arrxy[0],arrxy[1],arrxy[2]);
        trazarRecta1();  
        trazarRecta2();
  
    }
    return arrxy;
}
function ecEquivalentes(a,b,c,d,e,f){
	return true; 
}




 