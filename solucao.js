//...baixar todos os pacotes presentes no https://tiipos.github.io/2017.js.arquivos_texto.html

var arquivo = process.argv[2];
var separador = arquivo.split(".");
var extensão = separador[separador.length -1];//nome da extensão do arquivo

var txt = __dirname + "/" + arquivo;

if(txt == null){
	console.log("erro");
	process.exit(-1);
}
else{
	if(extensão.toString() == "json"){
	//abrir arquivo
	var json = lerJSONComRequire(txt);
	var txto = json;

	//Para pegar a cadeia inteira, já que se trata de um array:
	intervalo(txto.intervalos);
	}
	else if(extensão.toString() == "xml"){
		var variaveis;
		lerXMLComXml2Js(txt, function(err, result) {
			variaveis = result.intervalos.inter[0].valores[0].toString();
			//var vetor = [variaveis];//um vetor de variaveis
			//ex: alert(array[0]);

			var numerodavez1 = variaveis.split(",");
			intervalo(numerodavez1);
		});
	}

	else if(extensão.toString() == "csv"){
		//necessário para funcionamento da função, fs.readFile()...
		var fs = require('fs');
		var csv = require('csv-string');
		var resultado;

			fs.readFile(txt, 'utf8', function(err, data) {
			    resultado = csv.parse(data)[0];
			    intervalo(resultado);
			});	
	}
}
/*
	vai ficar assim
	(json, xml, csv(falta))
	100, 101, 102, 103, 104, 105, 
	------------------
	110, 111,
	------------------
	113,114, 115,
	-----------------
	150
*/

function lerJSONComRequire(txt) {
    var json = require(txt);
    // console.log(json);
    return json;
}

function lerXMLComXml2Js(arquivo, funcao) {
    var fs = require('fs');
    var xmlParser = require('xml2js').parseString;

    fs.readFile(arquivo, function(err, data) {
        xmlParser(data, funcao);
    });
}

function intervalo(intervalos){
	var inicial, finall;
	inicial= intervalos[0];
	for (var i in intervalos) {
   		if(intervalos[i-1] == intervalos[i]-1){
		console.log(intervalos[i]); //envia pro console os valores
 		}
 		else{
 			if(intervalos[i-1] != intervalos[i]-1){
 				finall=intervalos[i-1];
 				console.log("["+inicial+"-"+finall+"]");
 				inicial = intervalos[i];
 				console.log(intervalos[i]);
 			}
 			else{console.log(intervalos[i]);}
 			}
 		}
}
