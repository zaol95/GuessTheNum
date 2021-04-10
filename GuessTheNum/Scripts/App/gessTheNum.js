$(document).ready(function(){
	localStorage.setItem("level", 20);
	generarAleatorio();
	setToastrConfig();
	LanguageControl('game');
});

$(document).on("click", "#btnTest", function(){
	$("#rangeLevel").attr({
		disabled: '',
		hidden: ''
	});
	var maxAttempts = localStorage.getItem("level");
	$("#inputNum").attr("placeholder","Siguiente intento");
	var valOriginal = localStorage.getItem("numRef");
	var newVal = $("#inputNum").val();
	var arrVal = newVal.split("");
	if (arrVal.length == 4) {
		var numPos = 0;
		var pos = 0;
		$.each(arrVal, function(key, val){
			var index = valOriginal.indexOf(val);
			if (index >= 0) {
				if (index == key) {
					numPos++;
				}
				else{
					pos++;
				}
			}
		});
		var result = newVal + " - " + numPos + "A" + "/" + pos + "B";
		var activeLi = $(".active");
		$.each(activeLi, function(key, val){
			$(this).removeClass("active");
		});
		$("#listHistorical").append($("<li>").addClass("list-group-item active").html(result));
		var listLength = $("div > ul > li").length;
		$(".active")[0].scrollIntoView();
		var restantes = maxAttempts;
		if (restantes == "null") {
			restantes = "&#8734;";
		}
		$("#numAttempts").html("Intentos: " + listLength + "/" + restantes);
		$("#actualTry").html("Actual: " + newVal);
		$("#amountA").html("A: " + numPos);
		$("#amountB").html("B: " + pos);
		$("#divHistory").removeAttr("hidden");
		$("#divStats").removeAttr("hidden");
		$("#inputNum").val("");
		if (numPos == 4) {
			$("#btnTest").attr("disabled","");
			$("#btnResolve").attr("disabled","");
			$("#btnRestart").removeAttr("hidden");
			var strIntentos = "intentos";
			if (listLength == 1) {
				strIntentos = "intento!";
			}
			$("#headerResult").html("Resuelto!<br/>Numero secreto: " + localStorage.getItem("numRef")).addClass("text-success").removeAttr("hidden");
			toastr.options["positionClass"] = "toast-top-full-width";
			toastr.options["timeOut"] = 0;
			toastr.options["extendedTimeOut"] = 0;
			toastr.options["tapToDismiss"] = false;
			toastr["success"]("Lo haz logrado despues de "+listLength+" "+strIntentos,"Resuelto!");
		}
		if (maxAttempts != "null" && listLength >= maxAttempts) {
			endGame();
		}
	}
	else{
		setToastrConfig();
		toastr["error"]("El numero debe ser de 4 digitos y no se deben repetir", "Ingresa un numero valido");
	}
});
$(document).on("click", "#btnResolve", function(){
	$(this).attr("disabled","");
	toastr.options["positionClass"] = "toast-top-full-width";
	toastr.options["timeOut"] = 0;
	toastr.options["extendedTimeOut"] = 0;
	toastr.options["tapToDismiss"] = false;
	toastr.options["closeButton"] = false;
	toastr.clear();
	setTimeout(function(){
		toastr["warning"]("Si lo sigues intentando tal vez llegues a la solucion<br/><br/><button type='button' id='toastrBtnContinue' class='btn btn-success clear'>Claro que puedo!</button><button type='button' id='toastrBtnFinish' class='btn btn-danger surrender'>No puedo mas!</button>","Estas seguro que quieres rendirte?");
	}, 500);
});
$(document).on("click", "#toastrBtnContinue", function(){
	toastr.clear();
	$("#btnResolve").removeAttr("disabled");
});
$(document).on("click","#toastrBtnFinish", function(){
	endGame();
});
$(document).on("click","#btnRestart",function(){
	$("#rangeLevel").removeAttr('disabled').removeAttr('hidden');
	$("#inputNum").removeAttr("disabled").val("");
	$("#btnTest").removeAttr("disabled");
	$("#btnResolve").removeAttr("disabled");
	$("#btnRestart").attr("hidden","");
	$("#divHistory").attr("hidden","");
	$("#divStats").attr("hidden","");
	$("#listHistorical").html("");
	$("#numAttempts").html("Intentos: 0");
	$("#actualTry").html("Actual: -");
	$("#amountA").html("A: -");
	$("#amountB").html("B: -");
	$("#headerResult").html("").attr("hidden","").removeAttr("class");
	toastr.clear();
	setToastrConfig();
	generarAleatorio();
});
$(document).on("change", "#rangeLevel", function(){
	var rangeVal = parseInt($(this).val());
	localStorage.removeItem("level", null);
	$("#headerAttempts").html("");
	$("#lblRangeLevel").removeAttr("class");
	if(rangeVal < 33){
		$("#lblRangeLevel").html("Dificultad: Facil").addClass("text-primary");
		$("#headerAttempts").html("Intentos Max.: &#8734;");
		localStorage.setItem("level", null);
		$(this).val(0);
	}
	else if(rangeVal > 66){
		$("#lblRangeLevel").html("Dificultad: Dificil").addClass("text-danger");
		$("#headerAttempts").html("Intentos Max.: 10");
		localStorage.setItem("level", 10);
		$(this).val(100);
	}
	else{
		$("#lblRangeLevel").html("Dificultad: Normal").addClass("text-success");
		$("#headerAttempts").html("Intentos Max.: 20");
		localStorage.setItem("level", 20);
		$(this).val(50);
	}
});
function generarAleatorio(){
	var numRef = "";
	var i = 0;
	while(i<4){
		//Condiciones iniciales
		var nextNum = Math.floor((Math.random() * 10) + 1);
		if (nextNum == 10) { nextNum = 0};
		if(numRef == undefined){
			numRef += nextNum;
			i++;
		}
		else{
			var index = numRef.indexOf(nextNum);
			if (index == -1) {
				numRef += nextNum;
				i++;
			}
		}
	}
	localStorage.setItem("numRef", numRef);
	//console.log(numRef);
}
function setToastrConfig(){
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "100",
		"hideDuration": "500",
		"timeOut": "2500",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
}
function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode > 31 && charCode < 48) || charCode > 57) {
		return false;
	}
	var id = evt.currentTarget.id;
	var strNumber = $("#"+id).val();
	var arrVal = strNumber.split("");
	if(arrVal.length > 0){
		var cond = arrVal.indexOf(evt.key);
		if(cond > -1){
			setToastrConfig();
			toastr["warning"]("Intenta otro numero, recuerda que no se pueden repetir","Error en captura");
			return false;
		}
		return true;
	}
	return true;
}
function endGame(){
	toastr.clear();
	$("#inputNum").attr("disabled","");
	$("#btnTest").attr("disabled","");
	$("#btnResolve").attr("disabled","");
	$("#btnRestart").removeAttr("hidden");
	$("#divHistory").removeAttr("hidden");
	$("#divStats").removeAttr("hidden");
	$("#headerResult").html("Derrota!<br/>Numero secreto: " + localStorage.getItem("numRef")).addClass("text-danger").removeAttr("hidden");
	setToastrConfig();
}