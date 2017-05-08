
var arquivo = process.argv[2];
var ext = arquivo.split(".")[arquivo.split(".").length-1];
var numeros;
var fs = require('fs');
function lerJSON(){
	fs.readFile(arquivo, function(err, json) {
		json = JSON.parse(json);
        numeros = json.numeros;
		numeros = numeros.split(",");
		processarIntervalos();
    });
	
}

function lerXML(){
    var xmlParser = require('xml2js').parseString;

    fs.readFile(arquivo, function(err, data) {
        xmlParser(data, function(err, result) {
			numeros = result.numeros.split(",");
			processarIntervalos();
		});
    });
}

function lerCSV(){
	var csv = require('csv-string');

	var resultado;

	fs.readFile(arquivo, 'utf8', function(err, data) {
		resultado = csv.parse(data);
		numeros = resultado[0];
		processarIntervalos();
	});
}
function interval(init, end){
	if(init!=end){
		return "["+init+"-"+end+"]";
	}else{
		return "["+end+"]";
	}
}
function processarIntervalos(){
	var intervalo = 0;
	var resultado = [];
	var numInicial = numeros[0];
	var numFinal;
	for(var i=0; i<numeros.length; i++){
		if(i==numeros.length-1){
			numFinal=numeros[i];
			resultado[intervalo]= interval(numInicial,numFinal);
			break;
		}
		if((parseInt(numeros[i])+1) != parseInt(numeros[i+1])){
			 numFinal=numeros[i];
			 resultado[intervalo]= interval(numInicial,numFinal);
			 numInicial = numeros[i+1];
			 intervalo++;
		}
	}
	fs.writeFile('resultado.json', JSON.stringify(resultado), function (err) {
		if (err) return console.log(err);
		console.log('Arquivo gravado com sucesso!');
	});
}

if(ext=="json"){
	lerJSON();
}
else if(ext=="xml"){
	lerXML();	
}
else if(ext=="csv"){
	lerCSV();
}
else{
	console.log("Extensão Inválida");
}