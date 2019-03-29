var jsonp =jsonpCallback;
var p = document.getElementById("dropdown");
var timeNow;

//http://s21.zieloneimperium.pl/save/wasser.php?feld[]=186&felder[]=186,187,203,204&cid=4fa7eea708ddf1f9dd0971db83a794f4&garden=1
//last field x4 water request

//2.147.483.647 max nasionek per jar
//Eghizio krasnal123 xd
class Field
{
  constructor(field = null, plantID = 0, watered = false)
  {
	this.field = field;
  this.plantID = plantID;
	this.watered = watered;
  }
	  plant(id)
	  {
		  if(this.plantID==0)
		  {
			  this.plantID = id;
			  this.field.style.backgroundColor = "pink";
		  }
	  }
	  water()
	  {
		  if(this.plantID!=0)
		  {
			  this.watered = true;
			  this.field.style.borderColor = "deepskyblue";
		  }
	  }
	  free()
	  {
		  if(this.plantID!=0)
		  {
			  this.plantID = 0;
			  this.watered = false;
			  this.field.style.backgroundColor = "springgreen";
			  this.field.style.borderColor = "red";
		  }
	  }
}

var mField = new Map();
for(let i=1;i<=204;i++)
	mField.set(i,new Field(i));

$(document).ready(function wraper()
{
	let fID = 1;
	for (let i=1; i<=12; i++)
	{
		$("#fields").append("<tr></tr>").atr;

		for (let j=1; j<=17; j++)
		{
			$("#fields").append("<td id="+fID+"></td>");
			mField.get(fID).field = document.getElementById(fID);
			fID++;
		}
	}

	jsonp.plants.forEach(function(item, i)
		{
			$("#dropdown").append("<option value="+jsonp.plants[i].id+">"+jsonp.plants[i].name+"</option>");
		}
	)

	$('select option[value="6"]').attr("selected",true);
});

$(window).on("unload", function(e)
{
	for(let i=1;i<=204;i++)
		localStorage.setItem(i, JSON.stringify(mField.get(i)));
	return null;
});





/*
setInterval(function()
{
	timeNow = Date.now();
	document.getElementById("par").innerHTML = timeNow;
},1000);
*/


//collect points
//fontanna 26p
//http://s21.zieloneimperium.pl/ajax/decogardenajax.php?do=collectItem&pos=92
//serce 25p
//http://s21.zieloneimperium.pl/ajax/decogardenajax.php?do=collectItem&pos=171



//jsonp.plants[      jsonp.plants.indexOf(p.value)         ].time
//jsonp.plants.map(function(e) { return e.name; }).indexOf(p.options[p.selectedIndex].text)
// summed grants:
//jsonp.plants[jsonp.plants.map(function(e) { return e.name; }).indexOf(p.options[p.selectedIndex].text)].time;
//git gud



function concatWater()
{
		let base = "http://s21.zieloneimperium.pl/save/wasser.php?";
		let mid="";
		let token= "cid=dd4874652cde2f4b18337fd899ad5598&garden=1";
		for(let i=1;i<=204;i++)
			mid+="feld[]="+i+"&felder[]="+i+"&";
		return base+mid+token;
}
var urlWaterAll = concatWater();

function concatHarvest()
{
		let base = "http://s21.zieloneimperium.pl/save/ernte.php?";
		let mid="";
		let token= "cid=7e8f2ce834fae949faa731a80c963a81&garden=1";
		for(let i=1;i<=204;i++)
			mid+="pflanze[]="+ p.value.toString() +"&feld[]="+i+"&felder[]="+i+"&";
		return base+mid+token;
};

function currentTime()
{
	let d = new Date();
	document.getElementById("par").innerHTML = d.getHours() +":"+ d.getMinutes() +":"+ d.getSeconds();
}
//now we need to implement functions below to the Field class methods
//implement time(jsonp time is in seconds so u need to *1000 => ms) and even dates(can work while offline if date stored)
/**********************************************************************************************************/
var roslina = p.value.toString()
function req(roslina)
{
currentTime();

var i = 1;
var requestPlant = setInterval(function ()
			{
				if(!mField.get(i).plantID)
				{
					let urlHarvestAll =  concatHarvest();
					let urlPlant ="http://s21.zieloneimperium.pl/save/pflanz.php?pflanze[]="+roslina+"&feld[]="+i+"&felder[]="+i+"&cid=dd4874652cde2f4b18337fd899ad5598&garden=1";

					//new Image().src = urlPlant;
					mField.get(i).plant(roslina);
					console.log("Planting:"+i);
				}
				i++;
				if(i>204)
				{
					clearInterval(requestPlant);

					//new Image().src = urlWaterAll;
					mField.get(i).water();
					console.log("Watering!");
					setTimeout(function()
					{
						let urlHarvestAll =  concatHarvest();

						for(let i=1;i<=204;i++)
							mField.get(i).free();

						//new Image().src = urlHarvestAll;
						console.log("Harvesting!");
					},jsonp.plants[roslina].time*1000);
				}
			}, 64);

}
function reqPlantAll()
{
currentTime();
	var i = 1;
	var requestPlant = setInterval(function ()
		{
			if(!mField.get(i).plantID)
			{
				let urlPlant ="http://s21.zieloneimperium.pl/save/pflanz.php?pflanze[]="+p.value.toString()+"&feld[]="+i+"&felder[]="+i+"&cid=dd4874652cde2f4b18337fd899ad5598&garden=1";

				new Image().src = urlPlant;
				mField.get(i).plant(p.value);
				console.log("Planting:"+i);
			}

			i++;
			if(i>204)
			{
				clearInterval(requestPlant);
				reqWaterAll();
			}
		}, 64);
}
function reqWaterAll()
{
	new Image().src = urlWaterAll;
	for(let i=1;i<=204;i++)
		mField.get(i).water();
	console.log("Watering!");
}
function reqHarvestAll()
{
	let urlHarvestAll =  concatHarvest();
	for(let i=1;i<=204;i++)
		mField.get(i).free();
	new Image().src = urlHarvestAll;
	console.log("Harvesting!");
}

/**************************************
//http://s21.zieloneimperium.pl/ajax/ajax.php?do=gardenHarvestAll&token=897505cbefafa9165593417a6f313dec
//http://s21.zieloneimperium.pl/ajax/ajax.php?do=gardenHarvestAll&token=e58724f3d6f21aba16903b908bca73c1
// geting the token javascript: var token = ajax.token; window.alert(token); document.cookie = "token=" + token;
//maybe we shall try to concat 204 req into one as the waterAll req case
//http://s21.zieloneimperium.pl/save/ernte.php?pflanze[]=12&feld[]=10&felder[]=10&cid=7e8f2ce834fae949faa731a80c963a81&garden=1
		/*
		var wnd = window.open(url, "_blank", "width=500, height=500");

		wnd.onload = function(){wnd.close();};
		//setTimeout(function() {wnd.close();}, 5000);

/*function go()
{

var p = document.getElementById("iksde");
var result="";
var base = "http://s21.zieloneimperium.pl/save/ernte.php?";
var token= "&cid=7e8f2ce834fae949faa731a80c963a81&garden=1";
var middle="pflanze[]=12&feld[]=10&felder[]=10";
for(var i=1;i<=204; i++)
  {
    result+="pflanze[]=6&feld[]="+i+"&felder[]="+i+"&";
  }
p.innerHTML=base+result+token;
}
/*
var s = document.getElementById("div1");
var i = 1;
setInterval(function () {s.innerHTML = s.innerHTML + i.toString();  i++;}, 2000);

//timeout does not affect the time of execution, usualy ~4,7s onload. it triggers right away and queues up

/*
function xhr()
{
		var url = "http://s21.zieloneimperium.pl/save/pflanz.php?&pflanze[]=6&feld[]=1&felder[]=1&cid=dd4874652cde2f4b18337fd899ad5598&garden=1";
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.send(null);
		if(req.status == 200)
		console.log(req.responseText);

}
*/
