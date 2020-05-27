/*                                                







                                                      READ ME 
                                      IL CODICE È IMPOSTATO PER INSERIRE A MANO 
                                        IL MASSIMO VALORE PRESENTE NEL DATASET
                                        NELL' APPOSITA VARIABILE DATO_MASSIMO
                           (poichè ho impostato mi serva  questo dato per far girare gli assi)
                                        



 */
// set the dimensions and margins of the graph
var margin = {top: 30, right: 10, bottom: 10, left: 0},
  width = 800 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

  var j=0;
  var corrisp ={};
  var letter_posizione ={ "A":0,"B" :1,"C":2,"D":3   };
  var appoggio3 ={0:true,1: true,2: true,3: true};
  var space =[ "bianco1","bianco2","bianco3"];
  var appoggio ={0:"A",1:"B",2:"C",3:"D"};
  var appoggio4={"A":true,"B": true,"C": true,"D": true};
  var appoggio2 ={0:"A",1:"B",2:"C",3:"D"};
  var line = d3.line();
  var click ={};
  var selected = true;
  var u=[];
  var r =0;


var DATO_MASSIMO = 180;


// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("id","riquadro")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json("./progetto.json", function(data) {
 

    // Extract the list of dimensions we want to keep in the plot. 
    sup = data[0].valori.map(function(d){return (d3.keys(d))})
    dimensions = (d3.merge(sup));
 

//creo oggetto insieme di oggetti
var azz =[];
for(i in data){
  var o ={}
        for(j in data[i].valori){
          o = { ...o,...data[i].valori[j]}
        }
  azz.push(o)
}


// For each dimension, I build a linear scale. I store all in a y object(azz,function(d) { return +d[name]; }))
var y = {}
for (i in dimensions) {
  name = dimensions[i]
  y[name] = d3.scaleLinear()
    .domain( d3.extent([0,DATO_MASSIMO]))
    .range([height, 0])
   
}

//creo una scala per i rettangoli trasparenti
z = d3.scalePoint().rangeRound([0,(width-130)]).padding(10).domain(space);


x = d3.scalePoint()
 .range([0, width])
 .padding(1)
.domain(dimensions);


 // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
 
function path(d) {
  
  return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
  
}

function changepathn1n2(n1,n2){

  for(i in azz){
    var sup = azz[i][Object.keys(azz[i])[n1]];
    azz[i][Object.keys(azz[i])[n1]]= azz[i][Object.keys(azz[i])[n2]];
    azz[i][Object.keys(azz[i])[n2]]= sup;
  }

  //inserisco i cammini nuovi
    
   
  var bars = svg.selectAll("myPath").data(azz).enter().append("path")
  .attr("d",  path)
  .attr("id","mauro")
  .style("fill", "none")
  .style("stroke", "#69b3a2")
  .style("opacity", 1);
 

  bar1.remove();
}


function mantieniaggiornato3app24(appoggio2,appoggio4){
var lettera;
var valore;
for (i in appoggio2){

  lettera = appoggio2[i];
 
 valore = appoggio4[lettera];

 appoggio3[i]= valore;
 
}

}
function truefalse(i,j){
  var supp= appoggio3[i];
  appoggio3[i]=appoggio3[j];
  appoggio3[j]= appoggio3[i];

}


function changepath(n){
  
 // console.log(azz)
  for(i in azz){
    azz[i][Object.keys(azz[i])[n]]= DATO_MASSIMO-azz[i][Object.keys(azz[i])[n]]
  }

  //inserisco i cammini nuovi
   
  var bars = svg.selectAll("myPath").data(azz).enter().append("path")
  .attr("d",  path)
  .attr("id","mauro")
  .style("fill", "none")
  .style("stroke", "#69b3a2")
  .style("opacity", 1);
  //console.log(bars)

  bar1.remove();
}
function indexByvalue(oggetto, value){

 var array=  d3.values(oggetto);
 for(i in array){
 
  if(array[i]== value)
  return i;
 }


}

 // Draw the lines
   var bar1= svg.selectAll("myPath")
    .data(azz)
    .enter().append("path")
    .attr("d",  path)
    .style("fill", "none")
    .style("stroke", "#69b3a2")
    .style("opacity", 0.5)


   
  
// Draw the axis:

svg.selectAll("myAxis")
  // For each dimension of the dataset I add a 'g' element:
  .data(dimensions).enter()
  .append("g")
  //i store an id to recognize element
  .attr("id",function(d){return "asse"+appoggio[r++] })
   
  // I translate this element to its right position on the x axis
  .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
  // And I build the axis with the call function
  .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })

  .on("click", function(d,i) {
    
    console.log(d);
    console.log(i);
   
   d3.selectAll(" #mauro").remove();
      if(appoggio4[d]== true){

  
    d3.select("#asse"+d).transition()
     .attrTween("transform",  function(d){
       

     return d3.interpolateString('translate('+x(appoggio[indexByvalue(appoggio2,d)])+',0) rotate(0)',
                             'translate('+x(appoggio[indexByvalue(appoggio2,d)])+','+height+' )' +
                            'rotate( -180 )');                          
                                             
     })
     
    .duration(1000);
   
    changepath(indexByvalue(appoggio2,d));
    
    

    appoggio4[d]=false;
    mantieniaggiornato3app24(appoggio2,appoggio4);
    console.log(appoggio2)
    
    console.log(appoggio3);
    console.log(appoggio4
      )
      }
      else {


       d3.select("#asse"+d).transition()
     .attrTween("transform",  function(d,i,a){
    
      
       return d3.interpolateString('  translate('+x(appoggio[indexByvalue(appoggio2,d)])+','+height+') rotate(90) ',
                            'translate('+x(appoggio[indexByvalue(appoggio2,d)])+',0 )' +
                            'rotate( 360 )');                          
                                             
     })
  .duration(1000)
  changepath(indexByvalue(appoggio2,d));
  
   
   appoggio4[d] = true;
   mantieniaggiornato3app24(appoggio2,appoggio4);
   console.log(appoggio2);
   
   console.log(appoggio3);
   console.log(appoggio4);
  
      }


     
})

  // Add axis title
  
  .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) { return d; })
    .style("fill", "black")


    svg.selectAll("riquadro").data(space).enter().append("g").append("rect").attr("width",126.92).attr("height",683.7)
.attr("id",function(d){return ""+j++}).style("opacity",0.02).attr("transform",function(d) { return "translate(" + (z(d)) + ")"; })
   .on("click",function(d,i){
var miserve;
var miserve2;



if(appoggio3[i]== true && appoggio3[i+1]==true){
//se clicco x sposto 1 a 0
d3.selectAll( "#asse"+appoggio2[i+1]).transition().attr("transform",function(d) { return "translate(" + (x(appoggio[i])) + ")"; }).duration(1000)

//se clicco x sposto asse 0 a 1 
d3.select( "#asse"+appoggio2[i]).transition().attr("transform",function(d) {  return "translate(" + (x(appoggio[i+1])) + ")" ; }).duration(1000)

letter_posizione =[];

d3.selectAll(" #mauro").remove();
changepathn1n2(i,i+1);
truefalse(i,i+1);

miserve = appoggio2[i+1];
appoggio2[i+1]=appoggio2[i];
appoggio2[i]=miserve;


mantieniaggiornato3app24(appoggio2,appoggio4);

console.log(appoggio2);
console.log(appoggio3);
console.log(appoggio4)


}else if(appoggio3[i]== false && appoggio3[i+1]==false){
//se clicco x sposto 1 a 0

d3.selectAll( "#asse"+appoggio2[i+1]).transition().attr("transform",function(d) { return " translate(" + (x(appoggio[i])) +  ","+ height+") rotate(180) "; }).duration(1000)

//se clicco x sposto asse 0 a 1 
d3.selectAll( "#asse"+appoggio2[i]).transition().attr("transform",function(d) {  return " translate(" + (x(appoggio[i+1])) + ","+height+") rotate(180)" ; }).duration(1000)

d3.selectAll(" #mauro").remove();
changepathn1n2(i,i+1);
truefalse(i,i+1);

miserve = appoggio2[i+1];
appoggio2[i+1]=appoggio2[i];
appoggio2[i]=miserve;

mantieniaggiornato3app24(appoggio2,appoggio4);


console.log(appoggio2);
console.log(appoggio3);
console.log(appoggio4);
}else{
  console.log("errore");
}



   })
})





