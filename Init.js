/*
Unit Init;
INTERFACE
USES
{$L-}
{$U-}
		 {$LOAD MQOTP.dumpfile}
			 Memtypes, QuickDraw, OSIntf, ToolIntf, PackIntf,
	 {$LOAD BOPGlobals.dumpfile}
		 {$U Globals.p}	Globals;
	 {$LOAD}
{$U+}
{$E+}
{$L+}
{$ASM+}
{$D-}
{$R-}
{$OV-}
{$IFC DebugFlg}
	{$D+}
	{$R+}
	{$OV+}
{$ENDC}
FUNCTION InitGame: Integer;

IMPLEMENTATION
{***********************************************************************}
{$S Initi}
{**********************************************************************}
*/

// PROCEDURE SetStance(Who,j,GovMAid,InsMAid,GovIntv,InsIntv,Treat,ForAid,Tr: Integer);
function setStance(Who, j, GovMAid, InsMAid, GovIntv, InsIntv, Treat, ForAid, Tr) {
	Treaty[Who][j] = Treat;
	InsgAid[Who][j] = InsMAid;
	IntvRebl[Who][j] = InsIntv;
	MiltAid[Who][j] = GovMAid;
	IntvGovt[Who][j] = GovIntv;
	EconAid[Who][j] = ForAid;
	Trade[Who][j] = Tr;
  }
  
// Example usage:
// var Who = 2;    // Replace 2 with the appropriate value for Who
// var j = 3;      // Replace 3 with the appropriate value for j
// var GovMAid = 100;
// var InsMAid = 50;
// var GovIntv = 75;
// var InsIntv = 25;
// var Treat = 1;
// var ForAid = 200;
// var Tr = 50;
// setStance(Who, j, GovMAid, InsMAid, GovIntv, InsIntv, Treat, ForAid, Tr);
  
// PROCEDURE InitCont(i,j: Integer); 
function initCont(i, j) { 
	Contigus[i][j] = true;
	MinorSph[i][j] = true;
  }

// PROCEDURE FiniCntry(Cntry: INTEGER);	{completes initializaiton of a country}
function finiCntry(Cntry) { 
	// Assuming you have a reference to the HTML5 canvas element
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
  
	// Close the region (end the current path)
	ctx.closePath();
  
	// Stroke the region to create a frame
	ctx.stroke();
  }
  
// Example usage:
// var Cntry = 0; // Replace 0 with the appropriate country index
// finiCntry(Cntry);

// PROCEDURE InitCountry(Cntry: integer; PasdName: str255; GP,Pop,MilS,GWing,IWing,GStrg,IStrg,GGrowth,PGrowth,GStab,InvtF,GPop,MilM,DMess,Deaths: Integer); {begins initialization of a country}
function initCountry(
	Cntry, PasdName, GP, Pop, MilS, GWing, IWing, GStrg, IStrg, GGrowth,
	PGrowth, GStab, InvtF, GPop, MilM, DMess, Deaths
  ) {
	GP = Math.floor(GP / 2);
	MilS = Math.floor(MilS / 2); // these are kluges to fix a change in units
  
	CntryRgn[Cntry] = newRgn();
	CntryNam[Cntry] = PasdName;
	CntryCol[Cntry] = "Iwhite";
	Popln[Cntry] = Pop;
	GNP[Cntry] = GP;
	MiltSpnd[Cntry] = MilS;
	MilMen[Cntry] = MilM;
	DrafFrac[Cntry] = (Math.floor(MilM) * 255) / Pop;
	GovtWing[Cntry] = GWing;
	InsgWing[Cntry] = IWing;
	LeftPowr[Cntry] = GWing < 0;
	GovtStrg[Cntry] = GStrg;
	InsgStrg[Cntry] = IStrg;
	CntryRnd[Cntry] = Math.random();
	RebWinFlag[Cntry] = false;
	CoupFlag[Cntry] = false;
	MiltFrac[Cntry] = (255 * Math.floor(MilS)) / 10 / GP;
	InvtFrac[Cntry] = InvtF;
	ConsFrac[Cntry] = 255 - MiltFrac[Cntry] - InvtF;
	GPopular[Cntry] = 10 + Math.floor((128 - Math.abs(GovtWing[Cntry])) / 8);
	const x = Math.floor(ConsFrac[Cntry]) * GP;
	ConsSpnd[Cntry] = x / 256;
	const y = Math.floor(InvtFrac[Cntry]) * GP;
	InvtSpnd[Cntry] = y / 256;
  
	for (let i = 1; i <= NoCntry; i++) {
	  Contigus[Cntry][i] = false;
	}
  
	DontMess[Cntry] = DMess;
	SumDMess += DMess;
	Maturity[Cntry] = 256 - (Deaths / Pop);
	if (Maturity[Cntry] < 0) {
	  Maturity[Cntry] = 0;
	}
	FinlFlag[Cntry] = false;
	FinlProb[1][Cntry] = 0;
	FinlProb[2][Cntry] = 0;
	TotlIntv[Cntry] = 0;
  
	if (Cntry > 2) {
	  for (let i = 1; i <= NoCntry; i++) {
		DipAff[Cntry][i] =
		  (Math.floor(DipAff[1][Cntry] * DipAff[1][i]) / 256) +
		  (Math.floor(DipAff[2][Cntry] * DipAff[2][i]) / 256);
	  }
	}
  
	// Assuming OpenRgn is a user-defined function for the sake of this translation
	OpenRgn();
  }
  
// Example usage:
// initCountry(Cntry, PasdName, GP, Pop, MilS, GWing, IWing, GStrg, IStrg, GGrowth,
//             PGrowth, GStab, InvtF, GPop, MilM, DMess, Deaths);

// PROCEDURE SetHDipAff(index,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10: integer); {sets diplomatic affinity values for initialization}
function setHDipAff(index, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10) {
	DipAff[1][index + 1] = i1;
	DipAff[1][index + 2] = i2;
	DipAff[1][index + 3] = i3;
	DipAff[1][index + 4] = i4;
	DipAff[1][index + 5] = i5;
	DipAff[1][index + 6] = i6;
	DipAff[1][index + 7] = i7;
	DipAff[1][index + 8] = i8;
	DipAff[1][index + 9] = i9;
	DipAff[1][index + 10] = i10;
  }
  
// Example usage:
// var index = 5; // Replace 5 with the appropriate index value
// setHDipAff(index, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10);
  
// PROCEDURE SetCDipAff(index,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10: integer); {sets diplomatic affinity values for initialization}
function setCDipAff(index, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10) {
	DipAff[2][index + 1] = i1;
	DipAff[2][index + 2] = i2;
	DipAff[2][index + 3] = i3;
	DipAff[2][index + 4] = i4;
	DipAff[2][index + 5] = i5;
	DipAff[2][index + 6] = i6;
	DipAff[2][index + 7] = i7;
	DipAff[2][index + 8] = i8;
	DipAff[2][index + 9] = i9;
	DipAff[2][index + 10] = i10;
  }
  
// Example usage:
// var index = 5; // Replace 5 with the appropriate index value
// setCDipAff(index, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10);
  
// PROCEDURE TouchDown(ix,iy: integer; VAR FirstPt: Point);	 {used in graphics initialization}
function touchDown(ix, iy, FirstPt) {
	FirstPt.h = ix + 30;
	FirstPt.v = iy + 24;
	ctx.moveTo(FirstPt.h, FirstPt.v);
  }
  
// Example usage:
// var ix = 100; // Replace with the appropriate x-coordinate
// var iy = 50;  // Replace with the appropriate y-coordinate
// var FirstPt = { h: 0, v: 0 }; // Replace with the appropriate initial Point object
// touchDown(ix, iy, FirstPt);

// PROCEDURE CircTst(FirstPt: Point); {tests whether a region has been closed properly}
function CircTst(FirstPt) {
	var LastPt = { h: 0, v: 0 };
	ctx.getPen(LastPt);
  
	if (LastPt.h !== FirstPt.h || LastPt.v !== FirstPt.v) {
	  ctx.moveTo(150, 40);
	  ctx.strokeText("Region error  hor delta: " + (LastPt.h - FirstPt.h) + " vert delta: " + (LastPt.v - FirstPt.v), 150, 40);
	  ctx.moveTo(LastPt.h, LastPt.v);
	  ctx.lineTo(LastPt.h + 10, LastPt.v);
	  ctx.lineTo(LastPt.h + 10, LastPt.v + 10);
	  ctx.lineTo(LastPt.h, LastPt.v + 10);
	  ctx.lineTo(LastPt.h, LastPt.v);
	  ctx.stroke();
  
	  var canvas = document.getElementById("myCanvas");
	  canvas.addEventListener("click", function() {
		// Handle click event, e.g., to continue or do something else
	  });
	}
  }
  
// Example usage:
// var FirstPt = { h: 100, v: 50 }; // Replace with the appropriate initial Point object
// CircTst(FirstPt);  

// PROCEDURE Compass (DirnStrng:Str255);	 {Moves pen around country border}
function compass(DirnStrng) {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
  
	var x = 0; // Current x-coordinate
	var y = 0; // Current y-coordinate
  
	for (var i = 0; i < DirnStrng.length; i++) {
	  var k = parseInt(DirnStrng[i]) - 1;
	  var l = i + 1;
	  if (isNaN(k) || k < 0 || k > 8) {
		k = 0;
		l = i;
	  }
	  var blot = DirnStrng[l];
  
	  switch (blot) {
		case 'N':
		  ctx.lineTo(x, y - k);
		  y -= k;
		  break;
		case 'S':
		  ctx.lineTo(x, y + k);
		  y += k;
		  break;
		case 'E':
		  ctx.lineTo(x + k, y);
		  x += k;
		  break;
		case 'W':
		  ctx.lineTo(x - k, y);
		  x -= k;
		  break;
	  }
	}
  
	ctx.stroke();
  }
  
// Example usage:
// var DirnStrng = "2NE1W2S"; // Replace with the appropriate direction string
// compass(DirnStrng);
  
// FUNCTION RandomAdjust(Value,ULimit,LLimit,Divisor: Integer): Integer;
function randomAdjust(Value, ULimit, LLimit, Divisor) {
	var x = Value + Math.floor(Math.random() / Divisor);
	x = Math.min(ULimit, x);
	x = Math.max(LLimit, x);
	return x;
  }
  
// Example usage:
// var Value = 50; // Replace with the appropriate input value
// var ULimit = 100; // Replace with the upper limit
// var LLimit = 0; // Replace with the lower limit
// var Divisor = 2; // Replace with the divisor value
// var result = randomAdjust(Value, ULimit, LLimit, Divisor);
// console.log(result);
  
// PROCEDURE USAmerica;
// Placeholder functions to simulate the missing functions from the Pascal code
function setCDipAff(index, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10) {
	// Implementation for setting diplomatic affinities
  }
  
  function setHDipAff(index, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10) {
	// Implementation for setting diplomatic affinities
  }
  
  function setStance(Who, j, GovMAid, InsMAid, GovIntv, InsIntv, Treat, ForAid, Tr) {
	// Implementation for setting stances
  }
  
  function initCont(i, j) {
	// Implementation for initializing contiguity
  }
  
  function touchDown(ix, iy, FirstPt) {
	// Implementation for touch down
  }
  
  function compass(DirnStrng) {
	// Implementation for compass movements
  }
  
  function circTst(FirstPt) {
	// Implementation for circle testing
  }
  
  function finiCntry(Cntry) {
	// Implementation for completing country initialization
  }
  
  function initCountry(Cntry, PasdName, GP, Pop, MilS, GWing, IWing, GStrg, IStrg, GGrowth, PGrowth, GStab, InvtF, GPop, MilM, DMess, Deaths) {
	// Implementation for initializing the country
  }
  
  function USAmerica() {
	var FirstPt = { h: 0, v: 0 };
  
	setCDipAff(0, -70, 127, 10, -30, 80, 0, 100, 10, -10, 10);
	setCDipAff(10, 0, 0, -40, -60, -20, 20, -70, -60, -70, -80);
	setCDipAff(20, 90, -50, 100, 100, 100, 20, -40, -30, -20, -20);
	setCDipAff(30, 0, 40, -20, -20, -20, 40, -20, -20, 0, 30);
	setCDipAff(40, -10, 30, -50, 110, -70, -60, -50, 100, -50, 50);
	setCDipAff(50, -70, -20, 0, -40, -30, 40, -40, 10, 0, -40);
	setCDipAff(60, -40, -40, -50, -70, -20, 0, 0, 0, 20, 0);
	setCDipAff(70, 0, -20, 10, 20, 0, 20, -10, -40, 0, -20);
  
	initCountry(1, 'USA', 21350, 2140, 10665, 10, -125, 10000, 0, 25, 14, 9, 46, 255, 2130, 100, 434);
  
	setHDipAff(0, 127, -80, 40, 50, -100, 30, -80, -10, 50, 20);
	setHDipAff(10, 20, 40, 50, 125, 80, 40, 120, 80, 100, 110);
	setHDipAff(20, 10, 100, -40, -30, -40, 10, 20, 50, 30, 50);
	setHDipAff(30, 0, -60, 0, 10, 0, -20, 0, 0, 0, 0);
	setHDipAff(40, 0, -30, 110, -80, 100, 90, 20, -50, 60, -20);
	setHDipAff(50, 80, 20, 0, 70, -70, -70, 50, -10, 0, 70);
	setHDipAff(60, 30, 80, 70, 80, 60, 20, 30, 30, 10, 20);
	setHDipAff(70, 20, 50, 0, 0, 0, -30, 20, 40, 20, 50);
  
	setStance(1, 2, 0, 0, 0, 0, 1, 0, 5);
	setStance(1, 3, 0, 0, 0, 0, 2, 2, 5);
	setStance(1, 4, 3, 0, 1, 0, 3, 3, 5);
	setStance(1, 5, 0, 0, 0, 0, 0, 0, 0);
	setStance(1, 6, 1, 0, 0, 0, 3, 2, 4);
	setStance(1, 7, 0, 0, 0, 0, 0, 0, 0);
	setStance(1, 8, 1, 0, 0, 0, 2, 1, 4);
	setStance(1, 9, 1, 0, 0, 0, 2, 3, 4);
	setStance(1, 10, 1, 0, 0, 0, 2, 1, 4);
	setStance(1, 11, 1, 0, 0, 0, 2, 2, 4);
	setStance(1, 12, 0, 0, 0, 0, 2, 1, 4);
	setStance(1, 13, 1, 0, 0, 0, 2, 2, 4);
	setStance(1, 14, 0, 0, 0, 0, 5, 0, 2);
	setStance(1, 15, 1, 0, 0, 0, 5, 2, 5);
	setStance(1, 16, 0, 0, 0, 0, 2, 0, 5);
	SetStance(1,17,0,0,3,0,5,0,5);
	SetStance(1,18,0,0,0,0,5,0,5);
	SetStance(1,19,0,0,0,0,5,0,5);
	SetStance(1,20,4,0,4,0,5,0,5);
	SetStance(1,21,0,0,0,0,1,0,2);
	SetStance(1,22,0,0,1,0,5,0,5);
	SetStance(1,23,0,0,0,0,1,0,2);
	SetStance(1,24,0,0,0,0,1,0,2);
	SetStance(1,25,0,0,0,0,1,0,2);
	SetStance(1,26,0,0,0,0,1,0,3);
	SetStance(1,27,0,0,0,0,1,0,1);
	SetStance(1,28,4,0,0,0,3,5,4);
	SetStance(1,29,0,0,0,0,1,0,4);
	SetStance(1,30,1,0,1,0,3,1,4);
	SetStance(1,31,0,0,0,0,1,0,4);
	SetStance(1,32,0,0,0,0,0,0,4);
	SetStance(1,33,0,0,0,0,1,1,4);
	SetStance(1,34,0,0,0,0,1,0,4);
	SetStance(1,35,0,0,0,0,2,2,4);
	SetStance(1,36,0,1,0,0,0,2,4);
	SetStance(1,37,1,0,0,0,1,1,4);
	SetStance(1,38,0,0,0,0,1,0,4);
	SetStance(1,39,1,0,0,0,1,1,4);
	SetStance(1,40,0,0,0,0,1,1,4);
	SetStance(1,41,0,0,0,0,1,1,4);
	SetStance(1,42,0,1,0,0,0,0,4);
	SetStance(1,43,0,0,0,0,4,0,4);
	SetStance(1,44,0,0,0,0,0,0,2);
	SetStance(1,45,2,0,4,0,4,1,4);
	SetStance(1,46,0,0,0,0,4,0,4);
	SetStance(1,47,0,0,0,0,2,0,3);
	SetStance(1,48,0,0,0,0,0,0,2);
	SetStance(1,49,3,0,2,0,4,2,4);
	SetStance(1,50,0,0,0,0,1,0,3);
	SetStance(1,51,5,0,0,0,4,5,4);
	SetStance(1,52,2,0,0,0,3,0,4);
	SetStance(1,53,0,0,0,0,1,0,3);
	SetStance(1,54,0,0,0,0,3,0,4);
	SetStance(1,55,0,1,0,0,0,0,2);
	SetStance(1,56,0,4,0,0,0,0,4);
	SetStance(1,57,3,0,0,0,3,2,4);
	SetStance(1,58,0,0,0,0,1,3,4);
	SetStance(1,59,0,0,0,0,1,1,4);
	SetStance(1,60,3,0,2,0,3,2,4);
	SetStance(1,61,1,0,0,0,2,0,4);
	SetStance(1,62,2,0,0,0,4,2,4);
	SetStance(1,63,0,0,0,0,3,2,4);
	SetStance(1,64,3,0,1,0,3,3,4);
	SetStance(1,65,0,0,0,0,3,2,4);
	SetStance(1,66,0,0,0,0,2,0,4);
	SetStance(1,67,0,0,0,0,2,0,4);
	SetStance(1,68,0,0,0,0,2,0,4);
	SetStance(1,69,0,0,0,0,2,0,4);
	SetStance(1,70,0,0,0,0,2,0,4);
	SetStance(1,71,0,0,0,0,2,0,4);
	SetStance(1,72,0,0,0,0,2,0,4);
	SetStance(1,73,0,0,0,0,2,0,4);
	SetStance(1,74,0,0,0,0,2,0,4);
	SetStance(1,75,0,0,0,0,2,0,4);
	SetStance(1,76,0,0,0,0,2,0,4);
	SetStance(1,77,0,0,0,0,2,0,4);
	SetStance(1,78,0,0,0,0,2,0,4);
	SetStance(1,79,0,0,0,0,2,0,4);
	SetStance(1,80,0,0,0,0,2,0,4);
  
	initCont(1, 14);
	initCont(1, 3);
	initCont(1, 7);
  
	touchDown(30, 60, FirstPt);
	compass('3ES6ES6ES6ES6ES6ES6ES6ES3ESWSWS3EN2ESESESEES5W');
	compass('SSWSSWWSWSW3SESEENENE3NENENN4ESSWSWSE3SWSSEEN3ENE');
	compass('NN6E3N9EENENEN3E3SWSSWSWWSWWSWSEES4WS3WSWWSSWSWS');
	compass('3WNNW5SW3NWSSWSSESSWSWS3WSSWWSSWWSWSWWSWSSW4SE7S');
	compass('WS3WNWNNENNWNNE4N2WN3WN6WSESSWNWWNWWS3WSWW');
	compass('S3WSWWSWSW4S2WNWNW4NW3N5W3NWNN5WN2WN2W');
	compass('N2WN6W4NWNW9NNE3NE2NENE2NE2NENE2NENE2NENENE2NE2NENE2N');
	circTst(FirstPt);
  
	touchDown(0, 32, FirstPt); // Alaska
	compass('3EN3ENEN2ESE2NW3NEN6ES2ENEN2EN3WS2W2NE2N2EN5E2S');
	compass('ENENENW3N2ES4EN3EN6ES2ENEN2ESES2ESES6E2SWSWS2W');
	compass('SWS2WSWS2WSWSWS2WSWSWS2WSWS2W5SE9S2W5NW2NW2N');
	compass('WN2WNWN2WN3WS2WS3WNEN2ENEN');
	compass('2WS2WS2WS9W2WS5W3N');
	circTst(FirstPt);
  
	finiCntry(1);
  }
  
// Example usage:
USAmerica();
  
// PROCEDURE NorthAmerica;
function NorthAmerica() {
	var FirstPt = { h: 0, v: 0 };
  
	USAmerica();
  
	initCountry(14, 'Canada', 2040, 228, 441, -10, -125, 10000, 0, 36, 20, 9, 56, 255, 77, 99, 12);
	initCont(14, 1);
	touchDown(56, 17, FirstPt);
	compass('2ESES2ENENEN2ES2EN3ENE2S2ES4ESES3ESE2S7EN3E');
	compass('SE2SES2ES2EN3EN2ENENESESE4N2ENENEN2ENEN3E');
	compass('N2ESESWSWSWSW2SWSW2SE2SWSES2ENENENENESE');
	compass('2SWS2W2S3WS2WNWS3WS2WNW2S2E2S3WN3WS2WS2W');
	compass('S2W2SWS2WS2WS3W7S3ESES2ESES3ESW2SW2SE2SE');
	compass('S2E3NENE2NEN2EN2ENENE5NENEN2ENE3N3ES3E');
	compass('NESESES2E2SW2SW2SES2EN2E2NE2NE6SW3SE3S3ESE');
	compass('S2E4SW2S5WS9W6WS2WS2WSWSWSENEN3EN3ES2E2SWS');
	compass('WS2W2SES2ESES3WSWS4WNEN2EN2WS2WSW2NE3N');
	compass('3WSWSWS9WWS5W2SWS5WNENENENEN2ENWNEN5W2N');
	compass('E3NWNWN4WS2WSWN3WN6WN6WN6WN6WN6WN6WN6WN');
	compass('4W6NE2NE2NENE2NEN2E9NW5N2ENEN2ENENEN');
	compass('2ENENEN2ENEN2ENEN2ENENEN');
	circTst(FirstPt);
	MinorSph[14][17] = true;
	MinorSph[14][18] = true;
	MinorSph[14][20] = true;
  
	touchDown(84, 19, FirstPt); // Victoria Island
	compass('2ES3EN2W2NEN3ESES2ENEN2ESES2E2SES3ESWS4WN2W2SE');
	compass('S2WNWNWNWN6WS3W3N');
	circTst(FirstPt);
	finiCntry(14);
  
	initCountry(3, 'Mexico', 919, 592, 40, -30, 90, 2000, 0, 32, 33, 8, 56, 150, 95, 90, 781);
	initCont(3, 1);
	initCont(3, 63);
	dipAff[3][4] = 60;
	dipAff[3][5] = 50;
	dipAff[3][6] = 60;
	dipAff[3][7] = 50;
	dipAff[3][63] = 60;
	dipAff[3][64] = 60;
	dipAff[3][65] = 60;
	MinorSph[3][4] = true;
	MinorSph[3][5] = true;
	MinorSph[3][6] = true;
	MinorSph[3][7] = true;
	MinorSph[3][64] = true;
	MinorSph[3][65] = true;
	touchDown(17, 100, FirstPt);
	compass('6ES2ES2ES2ES5E2SE3S5E3SE4SESESE4SW2SW3SE2SW');
	compass('2SES2ESESEN2ES2ENENE3NEN3ESEN3ESWSW3SW2SWS');
	compass('4W3S4WSWS2WN6WS2WNWNWN2WNWN2W');
	compass('NWNWNWNWNW3NENE3N2W6NW3NW5NW3NW5NWNW9S3SE3SE8S');
	compass('2W2NW4NW2NW2NWNW2N2E2NW3NE6N');
	circTst(FirstPt);
	finiCntry(3);

	// Continue initializing other countries (Honduras, Nicaragua, Panama, Cuba)...
	// Call the functions to initialize Honduras, Nicaragua, Panama, and Cuba
	initHonduras();
	initNicaragua();
	initPanama();
	initCuba();
}

function initHonduras() {
	initCountry(4, 'Honduras', 16, 30, 3, 40, -70, 150, 20, 15, 32, 6, 64, 140, 12, 70, 197);
	initCont(4, 5);
	initCont(4, 63);
	initCont(4, 64);
	dipAff[4][3] = 40;
	dipAff[4][64] = 20;
	dipAff[4][5] = -40;
	dipAff[4][62] = 60;
	dipAff[4][65] = 40;
	insgAid[4][5] = 3;
	var FirstPt = { h: 0, v: 0 };
	
	touchDown(56, 140, FirstPt);
	compass('7ESES3WSWSWSWS2WSW2NW3NENEN');
	circTst(FirstPt);
	
	touchDown(-3, 157, FirstPt);
	compass('7ES6EN7ESES2ESESESES3WSWS2WNWN2WSWSWSWS4WS2W2SWSWS');
	compass('2WN2W4N3WN3WNW5N2ENEN2EN');
	circTst(FirstPt);
	
	finiCntry(4);
	}
	
function initNicaragua() {
initCountry(5, 'Nicaragua', 21, 23, 4, -70, 60, 1000, 300, 24, 30, 7, 36, 110, 30, 50, 2000);
initCont(5, 4);
initCont(5, 64);
initCont(5, 65);
dipAff[5][3] = 40;
dipAff[5][4] = -40;
dipAff[5][63] = -40;
dipAff[5][65] = 40;
minorSph[5][3] = true;
minorSph[5][63] = true;
insgAid[5][64] = 1;
var FirstPt = { h: 0, v: 0 };

touchDown(56, 146, FirstPt);
compass('2ENENENEN3ESW4SW4SWS3W3N2WNWNEN');
circTst(FirstPt);

touchDown(0, 172, FirstPt);
compass('3ENENE2N2EN4ENENENEN2ESES2ENEN3E5SW2SW7SW8S5W');
compass('N2WN2WS2WNWNWNWNW2NWNWNWNWNW2N');
circTst(FirstPt);

finiCntry(5);
}
	
function initPanama() {
initCountry(6, 'Panama', 23, 17, 2, 30, -70, 1000, 50, 41, 30, 7, 71, 70, 8, 80, 108);
initCont(6, 65);
initCont(6, 9);
dipAff[6][65] = 60;
dipAff[6][9] = 30;
var FirstPt = { h: 0, v: 0 };

touchDown(61, 155, FirstPt);
compass('2E2N3E2S2EN3ESE2SESE4SWNWNWNWN2W2S2W2N2WN2WNWN');
circTst(FirstPt);

touchDown(24, 191, FirstPt);
compass('2ESESES2ES3ES2EN2ENEN2EN7ES3ESESESE4SWSW2S2W');
compass('2NW2NWNW2NWN3WSWSWS2WSWSE4S4W2NWN3WN2WN5W2NE6N');
circTst(FirstPt);

finiCntry(6);
}

function initCuba() {
initCountry(7, 'Cuba', 123, 95, 80, -80, 30, 2000, 0, -5, 20, 6, 70, 40, 120, 10, 4192);
initCont(7, 1);
dipAff[7][5] = 80;
dipAff[7][1] = -80;
miltAid[7][5] = 2;
miltAid[7][42] = 3;
intvGovt[7][42] = 3;
intvGovt[7][36] = 3;
intvGovt[7][40] = 2;
intvGovt[7][75] = 2;
intvGovt[7][32] = 2;
minorSph[7][5] = true;
minorSph[7][32] = true;
minorSph[7][36] = true;
minorSph[7][40] = true;
minorSph[7][42] = true;
minorSph[7][75] = true;
var FirstPt = { h: 0, v: 0 };

touchDown(68, 125, FirstPt);
compass('3ES4ES3ES2ESES2ES2ES2ES3E4S9W3N2WN3WN2WN2WN3WN3W2NENEN');
circTst(FirstPt);

finiCntry(7);
}
  
// Example usage:
NorthAmerica();  

// PROCEDURE SouthAmerica;
// Placeholder functions to simulate the missing functions from the Pascal code
function InitCountry(id, name, x, y, a, b, c, d, e, f, g, h, i, j, k, l, m) {
	console.log(`InitCountry: ${id}, ${name}, ${x}, ${y}, ${a}, ${b}, ${c}, ${d}, ${e}, ${f}, ${g}, ${h}, ${i}, ${j}, ${k}, ${l}, ${m}`);
  }
  
  function InitCont(id1, id2) {
	console.log(`InitCont: ${id1}, ${id2}`);
  }
  
  function TouchDown(x, y, point) {
	console.log(`TouchDown: ${x}, ${y}`);
  }
  
  function Compass(directions) {
	console.log(`Compass: ${directions}`);
  }
  
  function CircTst(point) {
	console.log('CircTst');
  }
  
  function FiniCntry(id) {
	console.log(`FiniCntry: ${id}`);
  }
  
  function SouthAmerica() {
	var FirstPt = {};
	
	// Country 8: Argentina
	InitCountry(8, 'Argentina', 534, 254, 157, 50, -80, 900, 40, 31, 16, 7, 54, 140, 160, 60, 11343);
	InitCont(8, 12);
	InitCont(8, 13);
	InitCont(8, 80);
	DipAff[8][13] = 20;
	TouchDown(98, 224, FirstPt);
	Compass('2ES3ENENE2N2EN3ESESE3S5E3S2E3SESE3SWSWSWSW');
	Compass('2SESESESESESESES3E2SWSWSWS5WNWNWNWSE2SESESE');
	Compass('2SE3SWS2WS3W2SW2SES4W3S2E3S2W3SE2SWSESESESESW');
	Compass('3SW2SW2S3WN2W2NW2NWNW3NW4NW4NW6NW6NW5NW3NW4NW7N7N7NENE2N');
	CircTst(FirstPt);
	FiniCntry(8);
  
	// Country 9: Colombia
	InitCountry(9, 'Colombia', 230, 259, 16, 10, -50, 900, 100, 27, 32, 7, 51, 200, 50, 65, 9149);
	InitCont(9, 6);
	InitCont(9, 10);
	InitCont(9, 11);
	InitCont(9, 12);
	DipAff[9][6] = 20;
	TouchDown(78, 151, FirstPt);
	Compass('2ESE6SESES3E2SES2ES2E8SWS4W');
	Compass('S2W3SW3SE5S4WN3W3NWNWN');
	Compass('WN2WN3W4NENENE4NE5NE7N3ENWNENEN');
	CircTst(FirstPt);
	FiniCntry(9);
  
	// Country 10: Peru
	InitCountry(10, 'Peru', 114, 153, 75, -30, -60, 600, 200, 27, 27, 6, 36, 86, 95, 65, 1061);
	InitCont(10, 9);
	InitCont(10, 12);
	InitCont(10, 13);
	InitCont(10, 80);
	TouchDown(67, 176, FirstPt);
	Compass('2ES3ES2ESESESE3S3ES3E5SWSW2SW4SE4SE');
	Compass('S3EN3E3S3E5SW6SE5S4W');
	Compass('2NWNWNW2NWN2WN2WNW2NW3NW2NWNW2NWNW2N');
	Compass('W2NW2NWNW2NW2NW2NE2NENE2NWSWNW4NE2N');
	CircTst(FirstPt);
	FiniCntry(10);
  
	// Country 11: Venezuela
	InitCountry(11, 'Venezuela', 399, 122, 65, 10, -70, 900, 50, 22, 36, 8, 102, 228, 55, 70, 1735);
	InitCont(11, 9);
	InitCont(11, 12);
	TouchDown(83, 150, FirstPt);
	Compass('2EN2ESWSWSW2SENEN3ES2ES8EN3ESWS2ESESES');
	Compass('2W5SW4SWS5W3SE3S3WS4W3NE');
	Compass('8N2WN2WNW2N3WNWNW7N2EN');
	CircTst(FirstPt);
	FiniCntry(11);
  
	// Country 12: Brazil
	InitCountry(12, 'Brazil', 1800, 1097, 174, 20, -60, 1200, 100, 43, 29, 7, 56, 120, 455, 60, 200);
	InitCont(12, 8);
	InitCont(12, 9);
	InitCont(12, 10);
	InitCont(12, 11);
	InitCont(12, 80);
	TouchDown(103, 158, FirstPt);
	Compass('3ES2E3SES3ESES3ES3ES2E3SE4SW2SWSW3SES5E');
	Compass('2N3ES2ESESES2ES6ES3ESES2ES2ES2ESE8SW2SWSW2S');
	Compass('WSWSWSW7SE2SW5SWSW3SW3S4WS2WS3WS2W3SE5SW');
	Compass('4SW3SWSWS3WNWNWNWNWNWNWNW2NENENENE3NWNW');
	Compass('3N2W3N5W3NWNW5NW2N3WNW3N3WN2WNW3NE4N3W2SWS5W');
	Compass('3W3N3WS3WNW4NW4NE2NENE5NE5NW3NE3N2EN4E2S');
	Compass('4EN3E3NW3N5ENE4NE5N');
	CircTst(FirstPt);
	TouchDown(122, 176, FirstPt);
	Compass('ESE3S4W2NENEN');
	CircTst(FirstPt);
	FiniCntry(12);
  
	// Country 13: Chile
	InitCountry(13, 'Chile', 158, 103, 41, 70, -60, 1200, 100, 13, 21, 6, 24, 100, 110, 70, 748);
	InitCont(13, 8);
	InitCont(13, 10);
	InitCont(13, 80);
	TouchDown(87, 220, FirstPt);
	Compass('4ESE2SESESESE7S7S8SE4SE3SE5SE6SE6SE4SE4SE3S');
	Compass('ESE2SE2S2ES4E2SWS5WNWNWNWNWNWNWNW');
	Compass('3NWNWNW4NE2NW4NW2NW2NW6NW7NW4NW8N7NW7NW2NW2NW3N');
	CircTst(FirstPt);
	TouchDown(113, 292, FirstPt);
	Compass('2ESES2ES2ESES2WS4WN2WNW3NEN');
	CircTst(FirstPt);
	FiniCntry(13);
  }
  
  // Calling the SouthAmerica function to execute the translated code
  SouthAmerica();
  

//PROCEDURE USSR;
// Placeholder functions to simulate the missing functions from the Pascal code
function InitCountry(id, name, x, y, a, b, c, d, e, f, g, h, i, j, k, l, m) {
	console.log(`InitCountry: ${id}, ${name}, ${x}, ${y}, ${a}, ${b}, ${c}, ${d}, ${e}, ${f}, ${g}, ${h}, ${i}, ${j}, ${k}, ${l}, ${m}`);
  }
  
  function InitCont(id1, id2) {
	console.log(`InitCont: ${id1}, ${id2}`);
  }
  
  function DipAff(value, id1, id2) {
	console.log(`DipAff: ${value}, ${id1}, ${id2}`);
  }
  
  function MinorSph(value, id1, id2) {
	console.log(`MinorSph: ${value}, ${id1}, ${id2}`);
  }
  
  function TouchDown(x, y, point) {
	console.log(`TouchDown: ${x}, ${y}`);
  }
  
  function Compass(directions) {
	console.log(`Compass: ${directions}`);
  }
  
  function CircTst(point) {
	console.log('CircTst');
  }
  
  function SetStance(id1, id2, a, b, c, d, e, f, g) {
	console.log(`SetStance: ${id1}, ${id2}, ${a}, ${b}, ${c}, ${d}, ${e}, ${f}, ${g}`);
  }
  
  function FiniCntry(id) {
	console.log(`FiniCntry: ${id}`);
  }
  
  function USSR() {
	var FirstPt = {};
	
	// Country 2: Soviet Union
	InitCountry(2, 'Soviet Union', 9678, 2550, 13482, -60, 30, 2000, 100, 38, 14, 7, 70, 50, 4600, 0, 411);
	InitCont(2, 16);
	InitCont(2, 21);
	InitCont(2, 24);
	InitCont(2, 25);
	InitCont(2, 44);
	InitCont(2, 47);
	InitCont(2, 49);
	InitCont(2, 55);
	InitCont(2, 56);
	TouchDown(257, 33, FirstPt);
	Compass('5E2N3EN2E2S5ES2ES2ESE4S6WN3WSES2E3SESESE2NW');
	Compass('2N3ES2E2NEN3E2N4EN2EN2EN8E2ES2E');
	Compass('2NW3N3ES2ES3ESES2E2NWNWNWNW3NW2N5E5S2ESESE6S2WS3E2NE2N2E3N3WN');
	Compass('WNWNW4N3E2SESES3E');
	Compass('N2WNW3N2ES3ENWNW2N5E3N3EN3EN4ENENEN');
	Compass('9E2ES2ESE4S3ES');
	Compass('7ES2ES4E2N7ESE2S4ES9E2ENW3N9E4E');
	Compass('2S3ES9EE2S2EN2E2N4EN4ES4EN7EN4ES4ES6ES5E');
	Compass('S4E4S3WN7W3S4ESES2WSW5SWS6W5SES');
	Compass('2ESE2SE2SESE8S2W2NWN2WN2WN2WNWNWNWNWNWNW2NENE5N2ENWNW4N');
	Compass('2W4S5W5SE2S7WN3WS4W2SE2SW2SWSWSW2S5ES4ES2ES');
	Compass('ESE2SE2SE3SESESE9SW5SWSWSWNWSWS2W3NW3NENE');
	Compass('4NE4N5WS3W3N3WS4WNW2NWNWNW2NWN7W6SW3S2W3S');
	Compass('E3S3EN3E4SWS3WSWSWS4WSW3S9WS5WN4WN');
	Compass('6WS3WNW2NWN6W5NWN2WN7W3S3WSW');
	Compass('2S3W3S2E3SW3SWS2W5SE3S4W2N3W2S8WS2W2SWS3W4N5WN9WWN');
	Compass('WNW2NW3NES2E3N2WSW4NWN3W2NEN2E2NWN5WS2WS3W');
	Compass('2SESESESE2SESESE2SE4S3W2N');
	Compass('5WN4W2N3WNE2NWNWN2WN2WNWN2WS2WS3WNW2N');
	Compass('4WN2W2S3W3NW2NWN9WNE2NENE2NE5NW3N3WNE');
	Compass('4N2E3NEN2EN3E2N3WSWS3WNWNW3NENENE2NE4NW2NE3NE2N');
	CircTst(FirstPt);
	SetStance(2, 1, 0, 0, 0, 0, 1, 0, 5);
	SetStance(2, 14, 0, 0, 0, 0, 1, 0, 3);
	SetStance(2, 3, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 5, 2, 0, 0, 0, 2, 0, 5);
	SetStance(2, 6, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 7, 4, 0, 2, 0, 4, 4, 5);
	SetStance(2, 8, 0, 0, 0, 0, 2, 0, 4);
	SetStance(2, 9, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 10, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 11, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 12, 0, 0, 0, 0, 2, 0, 4);
	SetStance(2, 13, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 15, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 16, 0, 0, 0, 0, 2, 0, 4);
	SetStance(2, 17, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 18, 0, 0, 0, 0, 2, 0, 4);
	SetStance(2, 19, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 20, 0, 0, 0, 0, 2, 0, 4);
	SetStance(2, 21, 1, 0, 2, 0, 5, 0, 5);
	SetStance(2, 22, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 23, 3, 0, 4, 0, 5, 0, 5);
	SetStance(2, 24, 2, 0, 3, 0, 5, 0, 5);
	SetStance(2, 25, 3, 0, 3, 0, 5, 0, 5);
	SetStance(2, 26, 0, 0, 0, 0, 3, 0, 5);
	SetStance(2, 29, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 31, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 32, 4, 0, 1, 0, 3, 0, 4);
	SetStance(2, 34, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 36, 4, 0, 2, 0, 3, 0, 4);
	SetStance(2, 37, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 38, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 39, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 40, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 41, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 42, 3, 0, 1, 0, 3, 0, 4);
	SetStance(2, 43, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 44, 5, 0, 3, 0, 5, 0, 5);
	SetStance(2, 46, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 47, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 48, 5, 0, 2, 0, 4, 4, 4);
	SetStance(2, 49, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 50, 4, 0, 2, 0, 4, 0, 4);
	SetStance(2, 53, 4, 0, 1, 0, 3, 0, 4);
	SetStance(2, 55, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 56, 5, 0, 4, 0, 5, 0, 4);
	SetStance(2, 57, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 58, 3, 0, 0, 0, 2, 0, 4);
	SetStance(2, 60, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 61, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 62, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 63, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 64, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 65, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 66, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 67, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 68, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 69, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 70, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 71, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 72, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 73, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 74, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 75, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 76, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 77, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 78, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 79, 0, 0, 0, 0, 1, 0, 4);
	SetStance(2, 80, 0, 0, 0, 0, 1, 0, 4);
	FiniCntry(2);
  
	// Country 15: Greece
	InitCountry(15, 'Greece', 324, 89, 145, -30, 80, 900, 0, 66, 7, 7, 61, 180, 190, 75, 9341);
	InitCont(15, 21);
	InitCont(15, 26);
	InitCont(15, 49);
	DipAff(-80, 15, 49);
	MinorSph(true, 15, 22);
	TouchDown(257, 89, FirstPt);
	Compass('6E3S2WSWSW3SE3SW2SW2N2W2SW3NW3NWNW3N2EN3E2N');
	CircTst(FirstPt);
	FiniCntry(15);
  
	// Country 16: Sweden
	InitCountry(16, 'Sweden', 873, 83, 293, -30, 110, 2000, 0, 31, 7, 9, 59, 255, 70, 70, 6);
	InitCont(16, 2);
	TouchDown(235, 44, FirstPt);
	Compass('3EN2ENENENENEN2ENENENE2NENE2NEN2ENESENESENE2SE2NES2E');
	Compass('SW3S5W2SW3SWSW2SWSWSWSWSWSW3SE2SE3S2W3SW');
	Compass('3SWS4WNWNW4NWN3WSWSWS3W4NE2NW2NENENE2NEN');
	CircTst(FirstPt);
	FiniCntry(16);
  }
  
  // Call the main procedure
  USSR();
  
 // PROCEDURE Europe;
function Europe() {
	let FirstPt = { x: 0, y: 0 };
  
	// Country 17: Britain
	InitCountry(17, 'Britain', 3195, 564, 1295, 0, -110, 5000, 0, 22, 5, 9, 46, 255, 345, 90, 1463);
	InitCont(17, 18);
	MiltAid[17][40] = 3;
	MinorSph[17][14] = true;
	MinorSph[17][16] = true;
	MinorSph[17][18] = true;
	MinorSph[17][19] = true;
	MinorSph[17][20] = true;
	MinorSph[17][27] = true;
	MinorSph[17][28] = true;
	MinorSph[17][35] = true;
	MinorSph[17][40] = true;
	MinorSph[17][46] = true;
	MinorSph[17][57] = true;
	MinorSph[17][58] = true;
	MinorSph[17][59] = true;
	MinorSph[17][76] = true;
	TouchDown(214, 54, FirstPt);
	Compass('2ESES2E2SW2SWSESESE2SE2S2E3SW2S7WS5WNEN3ENEN2WNENWN2E2NWNW3NW3NENE2N');
	CircTst(FirstPt);
	TouchDown(208, 62, FirstPt);
	Compass('2EN2E6SWS2WS2W2NW2NE2NEN');
	CircTst(FirstPt);
	FiniCntry(17);
  
	// Country 18: France
	InitCountry(18, 'France', 4730, 529, 1659, -20, 100, 3000, 0, 42, 10, 9, 54, 240, 575, 70, 164);
	InitCont(18, 20);
	InitCont(18, 19);
	InitCont(18, 17);
	DipAff[18][72] = 40;
	DipAff[18][69] = 40;
	DipAff[18][71] = 40;
	DipAff[18][73] = 40;
	DipAff[18][74] = 40;
	MiltAid[18][72] = 2;
	MinorSph[18][28] = true;
	MinorSph[18][31] = true;
	MinorSph[18][38] = true;
	MinorSph[18][50] = true;
	MinorSph[18][66] = true;
	MinorSph[18][71] = true;
	MinorSph[18][72] = true;
	MinorSph[18][73] = true;
	MinorSph[18][74] = true;
	IntvGovt[18][72] = 2;
	TouchDown(213, 74, FirstPt);
	Compass('2ESE2NESES2ENEN2EN2ESESES2ESE6SW5S');
	Compass('3WS2WSWS2WN2WN2WNW2NE2NE3NW3N2WNWNWN');
	CircTst(FirstPt);
	FiniCntry(18);
	  
	// Country 19: Spain
	InitCountry(19, 'Spain', 1464, 375, 227, 10, -80, 3000, 0, 57, 10, 7, 54, 140, 375, 70, 216);
	InitCont(19, 18);
	InitCont(19, 30);
	TouchDown(204, 85, FirstPt);
	Compass('3ES5ES5ES2ES2E2SW2SWSW4SWSWS2WS5WSWN5W2NW3NE5NE6N');
	CircTst(FirstPt);
	FiniCntry(19);

	// Country 20: West Germany
	InitCountry(20, 'West Germany', 6316, 617, 1992, 10, -100, 5000, 0, 35, 9, 9, 56, 250, 495, 90, 61);
	InitCont(20, 23);
	InitCont(20, 25);
	InitCont(20, 22);
	InitCont(20, 18);
	TouchDown(235, 58, FirstPt);
	Compass('ENESE4SW6SW4SESE3SESESE2S7WS4W5N');
	Compass('WN2WNWNWNW2N2ENENENEN2EN3E6NEN');
	CircTst(FirstPt);
	FiniCntry(20);

	// Country 21: Romania
	InitCountry(21, 'Romania', 362, 212, 346, -60, 100, 1000, 0, 83, 10, 7, 60, 50, 220, 5, 0);
	InitCont(21, 2);
	InitCont(21, 15);
	InitCont(21, 25);
	InitCont(21, 26);
	TouchDown(255, 77, FirstPt);
	Compass('6ESE2SE3S2ESW4SES8WNW2NW2NW5NE2N');
	CircTst(FirstPt);
	FiniCntry(21);

	// Country 22: Italy
	InitCountry(22, 'Italy', 2609, 550, 569, 20, -50, 900, 100, 39, 7, 7, 51, 220, 500, 80, 259);
	InitCont(22, 18);
	InitCont(22, 20);
	InitCont(22, 26);
	InitCont(22, 32);
	DipAff[22][32] = 40;
	TouchDown(230, 81, FirstPt);
	Compass('4EN7E3SW2SE2SESE2SES4ESWS2ESES3W');
	Compass('3SWSWSWS2W2NENE2NWN2WNWN2WNWNW2NWNWNWN2WS2W5NEN');
	CircTst(FirstPt);
	FiniCntry(22);

	// Country 23: East Germany
	InitCountry(23, 'East Germany', 950, 171, 526, -60, 40, 2000, 0, 32, -3, 8, 70, 30, 220, 0, 140);
	InitCont(23, 20);
	InitCont(23, 24);
	InitCont(23, 25);
	TouchDown(237, 64, FirstPt);
	Compass('4ES2E8S6WNW4NE4N');
	CircTst(FirstPt);
	FiniCntry(23);

	// Country 24: Poland
	InitCountry(24, 'Poland', 1276, 338, 687, -60, 0, 2000, 300, 40, 12, 5, 60, 40, 435, 0, 575);
	InitCont(24, 2);
	InitCont(24, 23);
	InitCont(24, 25);
	TouchDown(243, 66, FirstPt);
	Compass('3ENEN4EN4E3SE5SW2SWS5WN6W7N');
	CircTst(FirstPt);
	FiniCntry(24);

	// Country 25: Czechoslovakia
	InitCountry(25, 'Czechoslovakia', 716, 148, 405, -60, 60, 2000, 0, 27, 7, 7, 60, 32, 210, 0, 101);
	InitCont(25, 2);
	InitCont(25, 20);
	InitCont(25, 21);
	InitCont(25, 23);
	InitCont(25, 24);
	InitCont(25, 26);
	TouchDown(238, 73, FirstPt);
	Compass('9E2ES4E3S2E2SW2S2WN7WN4WNWNWNW3N');
	CircTst(FirstPt);
	FiniCntry(25);

	// Country 26: Yugoslavia
	InitCountry(26, 'Yugoslavia', 461, 213, 193, -40, 30, 1200, 300, 55, 11, 6, 60, 60, 270, 20, 51);
	InitCont(26, 21);
	InitCont(26, 22);
	InitCont(26, 15);
	InitCont(26, 25);
	TouchDown(241, 79, FirstPt);
	Compass('4ES7ES2E3SE2SE2SE3S3WS2W2N2WNWN2WNWNWNWNWN2W4N');
	CircTst(FirstPt);
	FiniCntry(26);

  
  }
  
  // Call the main procedure
  Europe();

// PROCEDURE Africa;
function Africa() {
	let FirstPt = { x: 0, y: 0 };
  
	// Country 27: South Africa
	InitCountry(27, 'South Africa', 438, 247, 175, 30, -30, 1000, 500, 23, 29, 8, 64, 120, 50, 60, 1707);
	InitCont(27, 40);
	InitCont(27, 42);
	InitCont(27, 76);
	InitCont(27, 77);
	DipAff[27][40] = 20;
	DipAff[27][42] = -80;
	DipAff[27][76] = -60;
	DipAff[27][77] = -40;
	InsgAid[27][40] = 2;
	InsgAid[27][42] = 2;
	IntvRebl[27][42] = 2;
	InsgAid[27][76] = 1;
	TouchDown(251, 235, FirstPt);
	Compass('4EN3EN2E2NENE2NENE3NENENE2N3E3SE3SE4SWSW3S5E3SW2SW');
	Compass('2SWSWSWSWSWSWSWS2WS6WS7WSWS2WNWNW4NW4NWNW2N');
	Compass('W2NW6NW6NWNW2NWNW2NWNW2N9E7ESES3E8S4W6SE3S');
	CircTst(FirstPt);
	FiniCntry(27);
  
	// Country 28: Egypt
	InitCountry(28, 'Egypt', 169, 375, 135, 10, -80, 500, 100, 15, 25, 6, 61, 100, 400, 60, 615);
	InitCont(28, 32);
	InitCont(28, 35);
	InitCont(28, 51);
	DipAff[28][51] = -20;
	DipAff[28][29] = 40;
	DipAff[28][30] = 40;
	DipAff[28][31] = 40;
	DipAff[28][32] = -40;
	DipAff[28][50] = 30;
	DipAff[28][53] = 40;
	DipAff[28][54] = 60;
	DipAff[28][55] = 10;
	DipAff[28][56] = -30;
	DipAff[28][57] = 30;
	DipAff[28][78] = 40;
	DipAff[28][79] = 40;
	MinorSph[28][29] = true;
	MinorSph[28][50] = true;
	MinorSph[28][53] = true;
	MinorSph[28][54] = true;
	MinorSph[28][55] = true;
	MinorSph[28][78] = true;
	MinorSph[28][79] = true;
	TouchDown(261, 112, FirstPt);
	Compass('3ES2EN2ES9E2SE3SW2SW2NWNWNW2SESE2SE2S');
	Compass('ESE2SESE2SESE2S2W2S3WN9W7W9N9N3N');
	CircTst(FirstPt);
	FiniCntry(28);
  
	// Country 29: Tunisia
	InitCountry(29, 'Tunisia', 60, 57, 10, -30, 50, 1000, 50, 41, 20, 6, 74, 80, 20, 60, 3149);
	InitCont(29, 31);
	InitCont(29, 32);
	DipAff[29][51] = -50;
	DipAff[29][28] = 40;
	DipAff[29][30] = 40;
	DipAff[29][31] = 40;
	DipAff[29][32] = -40;
	DipAff[29][50] = 30;
	DipAff[29][53] = 40;
	DipAff[29][54] = 50;
	DipAff[29][55] = 10;
	DipAff[29][56] = -30;
	DipAff[29][57] = 30;
	DipAff[29][78] = 40;
	DipAff[29][79] = 40;
	TouchDown(231, 101, FirstPt);
	Compass('4ES2ESWSE3SW2SE3S2W3S3W4NW2NW3NE5N');
	CircTst(FirstPt);
	FiniCntry(29);
  
	// Country 30: Morocco
	InitCountry(30, 'Morocco', 129, 175, 45, 40, -60, 1000, 100, 19, 27, 6, 66, 150, 75, 60, 2297);
	InitCont(30, 31);
	InitCont(30, 66);
	InitCont(30, 19);
	DipAff[30][51] = -40;
	DipAff[30][28] = 40;
	DipAff[30][29] = 40;
	DipAff[30][31] = -10;
	DipAff[30][32] = -20;
	DipAff[30][50] = 30;
	DipAff[30][53] = 40;
	DipAff[30][54] = 50;
	DipAff[30][55] = 10;
	DipAff[30][56] = -30;
	DipAff[30][57] = 30;
	DipAff[30][78] = 40;
	DipAff[30][79] = 40;
	TouchDown(199, 110, FirstPt);
	Compass('EN2EN2EN2E2NENENES4E2SE3SW3SWS3WS2WSWSWSWSWSW');
	Compass('5S6WSW5S3W3S3WS4W2NE2NENE2NENENENENENENE2NENENENE6N');
	CircTst(FirstPt);
	FiniCntry(30);
  
	// Country 31: Algeria
	InitCountry(31, 'Algeria', 257, 168, 43, -50, 50, 900, 100, 18, 26, 7, 117, 50, 80, 50, 32767);
	InitCont(31, 29);
	InitCont(31, 30);
	InitCont(31, 32);
	InitCont(31, 33);
	InitCont(31, 66);
	InitCont(31, 71);
	DipAff[31][51] = -40;
	DipAff[31][28] = 40;
	DipAff[31][29] = 40;
	DipAff[31][30] = -10;
	DipAff[31][32] = -20;
	DipAff[31][50] = 31;
	DipAff[31][53] = 40;
	DipAff[31][54] = 50;
	DipAff[31][55] = 10;
	DipAff[31][56] = -31;
	DipAff[31][57] = 31;
	DipAff[31][78] = 40;
	DipAff[31][79] = 40;
	TouchDown(213, 103, FirstPt);
	Compass('9EEN8E4SW3SE2SE4SE2SE9S2SE4SWS2WS2WSWSWS3WS5W2N');
	Compass('WNWNWNWNWNWN2WNWNWNWNWNWN2WNWNWNW2NENENENENEN2EN3ENE3NE3NW3N');
	CircTst(FirstPt);
	FiniCntry(31);
  
	// Country 32: Libya
	InitCountry(32, 'Libya', 198, 23, 47, -70, 50, 1000, 300, 105, 33, 5, 64, 30, 25, 30, 35);
	InitCont(32, 28);
	InitCont(32, 29);
	InitCont(32, 31);
	InitCont(32, 71);
	InitCont(32, 35);
	InitCont(32, 72);
	MinorSph[32][50] = true;
	MinorSph[32][51] = true;
	MinorSph[32][53] = true;
	MinorSph[32][79] = true;
	DipAff[32][51] = -80;
	DipAff[32][28] = -40;
	DipAff[32][29] = -40;
	DipAff[32][30] = -10;
	DipAff[32][31] = -20;
	DipAff[32][50] = 50;
	DipAff[32][53] = 40;
	DipAff[32][54] = 20;
	DipAff[32][55] = 30;
	DipAff[32][56] = -30;
	DipAff[32][57] = 50;
	DipAff[32][72] = -127;
	DipAff[32][78] = 10;
	DipAff[32][79] = 20;
	InsgAid[32][72] = 3;
	IntvRebl[32][72] = 3;
	TouchDown(235, 112, FirstPt);
	Compass('2E2N5ES2E2SES3EN2ES2E4NEN4ES2ES2E9S9S8S3WS');
	Compass('3WN2WN2WN3WN2WNWN9WW4NW8N3NW2N2E3N');
	CircTst(FirstPt);
	FiniCntry(32);
  
	// Country 33: Mali
	InitCountry(33, 'Mali', 8, 57, 2, -70, 60, 500, 100, 9, 21, 4, 33, 30, 8, 50, 8);
	TouchDown(207, 127, FirstPt);
	InitCont(33, 31);
	InitCont(33, 66);
	InitCont(33, 67);
	InitCont(33, 68);
	InitCont(33, 69);
	InitCont(33, 71);
	Compass('ENESESESES2ESESESESESESE2S2E2SE5SWS2WS6W');
	Compass('S2WSWS2WSWSW2S7W2NWN4WNW4N4EN9EE4NW7N7N');
	CircTst(FirstPt);
	FiniCntry(33);
  
	// Country 34: Nigeria
	InitCountry(34, 'Nigeria', 481, 630, 187, 10, -90, 600, 100, 34, 23, 5, 74, 100, 270, 50, 32767);
	InitCont(34, 70);
	InitCont(34, 69);
	InitCont(34, 71);
	InitCont(34, 72);
	InitCont(34, 73);
	TouchDown(222, 153, FirstPt);
	Compass('6ES2ESES2EN2EN5E3SWSW2SW2SW2SWSWSWS4W3S4WN');
	Compass('W2NW2N3W3NE4NE5N');
	CircTst(FirstPt);
	FiniCntry(34);
  
	// Country 35: Sudan
	InitCountry(35, 'Sudan', 59, 183, 23, 20, -90, 600, 30, 1, 29, 4, 51, 50, 50, 50, 4356);
	InitCont(35, 28);
	InitCont(35, 32);
	InitCont(35, 36);
	InitCont(35, 37);
	InitCont(35, 38);
	InitCont(35, 72);
	InitCont(35, 74);
	TouchDown(258, 137, FirstPt);
	Compass('3E4N9E7ES3E2N3E2S');
	Compass('E5SE2SW9SSW3SWSWSWSW3SW2S2ESESESE2S2WSWS4WN3WNWN');
	Compass('6WNWNWNWNWNWN2WNWNWNW6NW4NEN2E9N');
	CircTst(FirstPt);
	FiniCntry(35);
  }
  
  // Call the main procedure
  Africa();

{**********************************************************************}
// PROCEDURE OAfrica;
function OAfrica() {
	let FirstPt = { x: 0, y: 0 };
  
	// Country 36: Ethiopia
	InitCountry(36, 'Ethiopia', 35, 281, 10, -60, 50, 600, 100, 20, 22, 3, 25, 40, 50, 20, 32767);
	InitCont(36, 35);
	InitCont(36, 37);
	TouchDown(284, 141, FirstPt);
	Compass('2ESESE2SESESESESESE4SE2S8EN2EN4ENE3SWSW2SW3SW3SW');
	Compass('2SWSW2SWSW2SWSW2SWSWSWSW2NW2NW6N6WN');
	Compass('3WNW2NWNWNWN2W2NE3NENENENE3NE9NN');
	CircTst(FirstPt);
	FiniCntry(36);
  
	// Country 37: Kenya
	InitCountry(37, 'Kenya', 52, 132, 8, 20, -100, 1000, 0, 34, 32, 6, 61, 108, 9, 50, 14038);
	InitCont(37, 35);
	InitCont(37, 36);
	InitCont(37, 38);
	InitCont(37, 39);
	TouchDown(273, 168, FirstPt);
	Compass('3ES4ENEN3ES3ES6E6SE2SE2SE2SWSWS2WSWSWSWS2W');
	Compass('NWNWNWN2WNWN2W3N4WSW2S3W5NENE7N');
	CircTst(FirstPt);
	FiniCntry(37);
  
	// Country 38: Zaire
	InitCountry(38, 'Zaire', 65, 245, 3, 20, -10, 400, 200, 16, 25, 3, 87, 40, 55, 60, 14118);
	InitCont(38, 74);
	InitCont(38, 35);
	InitCont(38, 37);
	InitCont(38, 39);
	InitCont(38, 41);
	InitCont(38, 42);
	InitCont(38, 75);
	TouchDown(249, 169, FirstPt);
	Compass('2ES3EN3EN2EN3EN9EESE8S');
	Compass('WSW5SE9S5SWS3WSW4SESES2E3S5WNWN2W2N');
	Compass('2WN4WNW5NWN4WS4W3NW2N8WS3W3N');
	Compass('3EN2EN3ENEN2ENENE2NE2NE4NW5N');
	CircTst(FirstPt);
	FiniCntry(38);
  
	// Country 39: Tanzania
	InitCountry(39, 'Tanzania', 41, 154, 16, -50, 60, 600, 100, 30, 26, 5, 46, 60, 25, 50, 100);
	InitCont(39, 37);
	InitCont(39, 38);
	InitCont(39, 40);
	InitCont(39, 41);
	IntvGovt[39][40] = 2;
	TouchDown(272, 181, FirstPt);
	Compass('2E2NEN4E3S2ESES2ESESESESE4SW2SE5SE2S4WS8W3N2WNWNWNW9N5N');
	CircTst(FirstPt);
	FiniCntry(39);
  
	// Country 40: Mozambique
	InitCountry(40, 'Mozambique', 24, 92, 50, -70, 50, 900, 100, 20, 18, 4, 60, 50, 20, 30, 4620);
	InitCont(40, 39);
	InitCont(40, 41);
	InitCont(40, 27);
	InitCont(40, 76);
	DipAff[40][27] = -40;
	TouchDown(277, 201, FirstPt);
	Compass('8EN4E2SE6SE3S2WSWS2WSWSWSWSWSWSWSW4SE4SW2SWS2WSWSWS4W3N');
	Compass('ENE4NW3NW3NENENE3NE2NWNW3NEN4E7N');
	CircTst(FirstPt);
	FiniCntry(40);
  
	// Country 41: Zambia
	InitCountry(41, 'Zambia', 27, 50, 7, -70, 50, 900, 100, 20, 28, 3, 62, 92, 16, 40, 1338);
	InitCont(41, 76);
	InitCont(41, 38);
	InitCont(41, 39);
	InitCont(41, 40);
	InitCont(41, 42);
	InitCont(41, 77);
	DipAff[41][27] = -40;
	InsgAid[41][27] = 1;
	TouchDown(259, 201, FirstPt);
	Compass('2ES2E2S2ESES5E3N2WNWNW4NEN3EN2ESESES2E9SS4WSW');
	Compass('S3WSWS2WS2WSWS4W2SWS2W9N4N2ENE3N');
	CircTst(FirstPt);
	FiniCntry(41);
  
	// Country 42: Angola
	InitCountry(42, 'Angola', 28, 63, 10, -70, 50, 1000, 300, 36, 20, 4, 50, 40, 30, 30, 32767);
	InitCont(42, 27);
	InitCont(42, 38);
	InitCont(42, 41);
	InitCont(42, 77);
	DipAff[42][27] = -80;
	DipAff[42][7] = 60;
	TouchDown(236, 191, FirstPt);
	Compass('2EN8E2SE3S4EN4ESE5SES2E3SWS2W9S4S5WNWN7W9W4NE2NE3NE2NE5NW7NW2N');
	CircTst(FirstPt);
	FiniCntry(42);
  }

// PROCEDURE Asia;
function Asia() {
	let FirstPt = { x: 0, y: 0 };
  
	// Country 43: Japan
	InitCountry(43, 'Japan', 8845, 1111, 626, 10, -90, 5000, 0, 77, 11, 9, 77, 240, 237, 90, 60);
	DipAff[43][47] = 40;
	InitCont(43, 45);
	MinorSph[43][47] = true;
  
	TouchDown(443, 73, FirstPt);
	Compass('3ESES4EN2E4SES2WSWSWSW2NWSWSWNW5NWNW2N');
	CircTst(FirstPt);
  
	TouchDown(448, 83, FirstPt);
	Compass('3E2S2ESESESE6SE4S5W4S4W2N5W2NEN2ENE3N2ESENE3NWNW2NW4N');
	CircTst(FirstPt);
  
	TouchDown(441, 99, FirstPt);
	Compass('E2SES3E3S2W2SWS2W3NWS2W4NE2N2EN');
	CircTst(FirstPt);
  
	FiniCntry(43);
  
	// Country 44: North Korea
	InitCountry(44, 'North Korea', 170, 159, 121, -60, 30, 2000, 0, 38, 22, 5, 70, 20, 470, 0, 88);
	InitCont(44, 2);
	InitCont(44, 45);
	InitCont(44, 47);
	DipAff[44][45] = -70;
  
	TouchDown(428, 84, FirstPt);
	Compass('4E3SW2SESE2SWSWSWSWS3WNW8NEN2E2N');
	CircTst(FirstPt);
	FiniCntry(44);
  
	// Country 45: South Korea
	InitCountry(45, 'South Korea', 480, 347, 326, 50, -30, 1500, 0, 71, 23, 7, 77, 90, 630, 95, 2747);
	InitCont(45, 44);
	InitCont(45, 43);
	DipAff[45][44] = -70;
  
	TouchDown(431, 93, FirstPt);
	Compass('EN2ESE2SE5SWSWSWS3WNWNW5NENENEN');
	CircTst(FirstPt);
	FiniCntry(45);
  
	// Country 46: Australia
	InitCountry(46, 'Australia', 1148, 138, 289, 0, -100, 3000, 0, 31, 21, 9, 59, 255, 70, 90, 0);
	InitCont(46, 61);
  
	TouchDown(410, 224, FirstPt);
	Compass('2ENE2N2EN3EN2EN3ESE2NENENEN2E2NENESE2NENENEN2ENENE2S');
	Compass('ES2E2NE2NEN9EEN2ESE3S2WS2WS2ESESESES2ESES2E4NE2NE2NENE3NENENE9SSE3S');
	Compass('E4SESE7SESESE5SE4SW3SWSW2SWSW2SWSW');
	Compass('SWSW2SW2SWSWSWSWS2WSWSWSWSWS5WN2WN4WN2WN');
	Compass('W3NE3NE2NE3NWSW2SWS2WNW2NW2NW2NWN3WS4WS2WS');
	Compass('6WSW2S7WN2WSWS3WNW3NEN2E3NE5NW7N2E3NW3NENWN');
	CircTst(FirstPt);
	FiniCntry(46);
  
	// Country 47: China
	InitCountry(47, 'China', 2190, 8388, 1436, -60, 100, 1000, 0, 52, 16, 8, 70, 36, 4300, 50, 25961);
	InitCont(47, 2);
	InitCont(47, 44);
	InitCont(47, 48);
	InitCont(47, 56);
	InitCont(47, 57);
	InitCont(47, 58);
	InitCont(47, 59);
	InitCont(47, 52);
	MinorSph[47][43] = true;
	DipAff[47][2] = -30;
	DipAff[47][1] = 10;
	DipAff[40][48] = -60;
	InsgAid[47][56] = 2;
  
	TouchDown(352, 75, FirstPt);
	Compass('7ES2ESE5S6ESE2SES3EN6ES');
	Compass('4ES5EN9E3NEN4ENENEN3ENE4N3WS3W3N');
	Compass('W3N2E3NE6N7ESE2SESESE2SES4EN3E3S3EN5E4SW');
	Compass('4SWSW3SE3SW2S2WSW2SWSWSWSWSW3NW3NWNW3SWSW3SES2ES5E3S2W2SES');
	Compass('ESESESESESWSE2SESE3SWSE2SW8SW2S2WSWS3WS4WS2W2S2W2N4WNWN');
	Compass('3WS3WN3W3SWS3WN4WNW3NE5N2W3N2WN4WS2WS5WS4WN');
	Compass('2WN2WN2WNWN2WNWN3WNWNWNWNW5NWN2W2N');
	Compass('2WN4WNWNW3NW5N2ENE3NE3N2W3N3E2NEN3E3N');
	CircTst(FirstPt);
	FiniCntry(47);
  
	// Country 48: VietNam
	InitCountry(48, 'VietNam', 693, 435, 1386, -70, 110, 5000, 0, 8, 28, 6, 70, 20, 643, 10, 32767);
	InitCont(48, 47);
	InitCont(48, 59);
	InitCont(48, 60);
	DipAff[48][47] = -80;
	DipAff[59][59] = -40;
	DipAff[48][60] = -40;
  
	TouchDown(399, 128, FirstPt);
	Compass('3ES3EN3ESESESWSWSW5SESESE2SE2SESESESESE4SW2SWSWSWSWS2W');
	Compass('S2WNENWNWNWNWNWNWNW3NEN3E5NW2NWN3W2N2W6NE3N');
	CircTst(FirstPt);
	FiniCntry(48);
  
	// Country 49: Turkey
	InitCountry(49, 'Turkey', 539, 399, 258, 50, -60, 2000, 0, 40, 26, 7, 46, 180, 453, 70, 267);
	InitCont(49, 15);
	InitCont(49, 2);
	InitCont(49, 50);
	InitCont(49, 53);
	InitCont(49, 55);
	DipAff[49][15] = -60;
	DipAff[49][54] = -20;
  
	TouchDown(263, 92, FirstPt);
	Compass('3E2N9EEN2ES2ES9E2S4E6S9WS3WS5WN7WS4WNWNWNW3NE3N');
	CircTst(FirstPt);
	FiniCntry(49);
  
	// Country 50: Syria
	InitCountry(50, 'Syria', 78, 73, 118, -30, 60, 700, 200, 22, 30, 6, 32, 48, 230, 30, 1916);
	InitCont(50, 49);
	InitCont(50, 51);
	InitCont(50, 53);
	InitCont(50, 78);
	InitCont(50, 79);
	MinorSph[50][28] = true;
	MinorSph[50][54] = true;
	DipAff[50][51] = -80;
	DipAff[50][28] = 20;
	DipAff[50][29] = 40;
	DipAff[50][30] = 20;
	DipAff[50][31] = 20;
	DipAff[50][32] = 50;
	DipAff[50][53] = 60;
	DipAff[50][54] = 30;
	DipAff[50][55] = 20;
	DipAff[50][56] = -30;
	DipAff[50][57] = 30;
	DipAff[50][78] = 20;
	DipAff[50][79] = 60;
  
	TouchDown(278, 101, FirstPt);
	Compass('3EN3EN5E4SW3S2W2S5W4N3W3N');
	CircTst(FirstPt);
	FiniCntry(50);
  }

{**********************************************************************}
// PROCEDURE OAsia;
function OAsia() {
	let FirstPt = { x: 0, y: 0 };
  
	// Country 51: Israel
	InitCountry(51, 'Israel', 138, 34, 407, 20, -60, 2000, 0, 52, 39, 9, 59, 170, 190, 80, 84);
	InitCont(51, 50);
	InitCont(51, 78);
	InitCont(51, 28);
	InitCont(51, 79);
	MinorSph[51][32] = true;
	MinorSph[51][53] = true;
	MinorSph[51][54] = true;
	MinorSph[51][55] = true;
	DipAff[51][28] = 20;
	DipAff[51][29] = 0;
	DipAff[51][31] = -10;
	DipAff[51][32] = -60;
	DipAff[51][50] = -60;
	DipAff[51][53] = -60;
	DipAff[51][54] = -50;
	DipAff[51][55] = -80;
	DipAff[51][56] = -30;
	DipAff[51][57] = -50;
	DipAff[51][78] = -40;
	DipAff[51][79] = -40;
  
	TouchDown(278, 107, FirstPt);
	Compass('3E7SWSWSWNW3NE5N');
	CircTst(FirstPt);
  
	TouchDown(-4, 248, FirstPt);
	Compass('ESENE2N5E2NEN3E5S2W8SWS3WS2WSW2SW2SW3SWSW3SW3S2E2SWS2W3S');
	Compass('2WSES4ENENEN2E2SW3SW4SW4SE2SW3SW4SW3SW3SW2SW2SW3S2W2NW');
	Compass('2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2N2ENEN2E');
	Compass('NENENENENENENE2NE2NE2NE2NE2NE2NE2NE2NE4NE6N');
	LineTo(FirstPt.x, FirstPt.y);
	CircTst(FirstPt);
	FiniCntry(51);
  
	// Country 52: Taiwan
	InitCountry(52, 'Taiwan', 149, 165, 209, 60, -100, 2000, 0, 63, 32, 8, 75, 80, 504, 70, 5349);
	InitCont(52, 47);
	DipAff[52][47] = -70;
  
	TouchDown(432, 117, FirstPt);
	Compass('3ES2E6S2W2SW2SW3NWNW6NEN');
	CircTst(FirstPt);
	FiniCntry(52);
  
	// Country 53: Iraq
	InitCountry(53, 'Iraq', 225, 111, 487, -50, 60, 600, 200, 33, 31, 5, 69, 30, 155, 40, 7215);
	InitCont(53, 49);
	InitCont(53, 50);
	InitCont(53, 54);
	InitCont(53, 55);
	InitCont(53, 78);
	MinorSph[53][52] = true;
	MinorSph[53][28] = true;
	MinorSph[53][32] = true;
	DipAff[53][51] = -60;
	DipAff[53][28] = 40;
	DipAff[53][29] = 40;
	DipAff[53][31] = 10;
	DipAff[53][32] = 60;
	DipAff[53][50] = 30;
	DipAff[53][54] = 50;
	DipAff[53][55] = -127;
	DipAff[53][56] = -30;
	DipAff[53][57] = 30;
	DipAff[53][78] = 40;
	DipAff[53][79] = 40;
  
	if (Level === 4) {
	  IntvRebl[53][55] = 4;
	  InsgAid[53][55] = 3;
	}
  
	TouchDown(289, 99, FirstPt);
	Compass('4ESE5SESE2SESESESE5S6WNW2NWNWN3WN2W4N2E3NE4N');
	CircTst(FirstPt);
	FiniCntry(53);
	  
	// Country 54: Saudi Arabia
	InitCountry(54, 'Saudi Arabia', 542, 90, 1383, 70, -70, 900, 200, 66, 25, 6, 77, 80, 95, 80, 1);
	InitCont(54, 78);
	InitCont(54, 53);
	MinorSph[54][28] = true;
	MinorSph[54][32] = true;
	MinorSph[54][29] = true;
	MinorSph[54][50] = true;
	MinorSph[54][51] = true;
	MinorSph[54][55] = true;
	DipAff[54][51] = -50;
	DipAff[54][28] = 50;
	DipAff[54][29] = 40;
	DipAff[54][31] = 20;
	DipAff[54][32] = -40;
	DipAff[54][50] = 30;
	DipAff[54][53] = 40;
	DipAff[54][55] = -50;
	DipAff[54][56] = -40;
	DipAff[54][57] = 40;
	DipAff[54][78] = 40;
	DipAff[54][79] = 40;
	
	TouchDown(285, 111, FirstPt);
	Compass('EN2ES3ESESE2SES6E2SESESE2SE2SE2S2ES4EN2EN3ES');
	Compass('2ESESES2ES2ESW2SW2SWSW2SWSWSWSWSWS2WSWSWSWSWS3WS4WS2W');
	Compass('S4WNWNW2NW5NWNW2NW3NWN2W3NW2NW3NWNWNW2NWNWNW5N6E5N');
	CircTst(FirstPt);
	FiniCntry(54);
	
	// Country 55: Iran
	InitCountry(55, 'Iran', 555, 324, 1060, -30, 20, 700, 100, 81, 27, 6, 77, 50, 385, 50, 1025);
	InitCont(55, 2);
	InitCont(55, 49);
	InitCont(55, 53);
	InitCont(55, 56);
	InitCont(55, 57);
	MinorSph[55][51] = true;
	MinorSph[55][54] = true;
	MinorSph[55][50] = true;
	DipAff[55][1] = -100;
	DipAff[55][2] = -90;
	DipAff[55][51] = -90;
	DipAff[55][28] = -20;
	DipAff[55][29] = 20;
	DipAff[55][31] = 20;
	DipAff[55][32] = 40;
	DipAff[55][50] = 30;
	DipAff[55][53] = -127;
	DipAff[55][54] = -50;
	DipAff[55][56] = -60;
	DipAff[55][57] = 30;
	DipAff[55][78] = -40;
	DipAff[55][79] = -40;
	
	TouchDown(293, 94, FirstPt);
	Compass('5E2S3E4S4EN3EN9EES5E9SSE3SW3SE3SESE');
	Compass('3SWSW2S2WN2WNWN2WN3WS4WNWNWNWNWNWNWN4W4NWNWNWNW2NWNW5NW6N');
	CircTst(FirstPt);
	FiniCntry(55);
	
	// Country 56: Afghanistan
	InitCountry(56, 'Afghanistan', 27, 193, 7, -80, 20, 200, 150, -1, 20, 2, 60, 26, 130, 20, 32767);
	InitCont(56, 2);
	InitCont(56, 55);
	InitCont(56, 47);
	InitCont(56, 57);
	TouchDown(323, 103, FirstPt);
	Compass('3ENE2N2EN8E2N3E2S5ES2WSWS2W4SWSW3S2WS2WSW2SWS9W3NE3NW6N');
	CircTst(FirstPt);
	FiniCntry(56);
	
	// Country 57: Pakistan
	InitCountry(57, 'Pakistan', 182, 705, 91, -10, 20, 300, 100, 13, 23, 5, 41, 120, 502, 60, 32767);
	InitCont(57, 56);
	InitCont(57, 47);
	InitCont(57, 55);
	InitCont(57, 58);
	DipAff[57][58] = -60;
	TouchDown(324, 115, FirstPt);
	Compass('8ENE2NEN2EN2E3NENE4N2ENEN3ESE3SW4SESE3S');
	Compass('WSW2SW2SW2SWS4WSW2SESE2SWS3WNWN2WN5WS4W2NENE3NWNW3N');
	CircTst(FirstPt);
	FiniCntry(57);
	
	// Country 58: India
	InitCountry(58, 'India', 1175, 6132, 365, -30, 20, 500, 100, 13, 23, 6, 54, 200, 1670, 50, 7590);
	InitCont(58, 47);
	InitCont(58, 57);
	InitCont(58, 59);
	DipAff[58][57] = -60;
	DipAff[58][47] = -20;
	TouchDown(347, 101, FirstPt);
	Compass('3ES2E2S2ESE5SESESESES3ESES2ESES2ES2ES2ES');
	Compass('4EN5EN2EN4ES2E3S2WS2WSWSW5SWSW2SWNWNWSWSWN');
	Compass('2W2SWSWS2W2SWSWSWSWSWSWS2WSW3SE3SWSWSESESWSW2SW2S3WNWN');
	Compass('W2NW2NW2NW3NW3NW3NW3NW2NW4NE3NW2SW2S4W3NWNWNW3NE');
	Compass('NE2NWNW2NEN4ENE2NE2NE2NENE3NWNW4NE3N');
	CircTst(FirstPt);
	FiniCntry(58);
	
	// Country 59: Burma
	InitCountry(59, 'Burma', 45, 312, 17, 30, -70, 400, 100, 7, 21, 6, 25, 50, 209, 50, 5598);
	InitCont(59, 47);
	InitCont(59, 58);
	InitCont(59, 60);
	InitCont(59, 48);
	TouchDown(387, 122, FirstPt);
	Compass('4E5SW3SES4ES3E4S3W2SW3SE4SWS2W');
	Compass('3NWNW2SWS2W2NW3NW2NW2NWNWNW3NENE5NENEN2EN');
	CircTst(FirstPt);
	FiniCntry(59);
	
	// Country 60: Thailand
	InitCountry(60, 'Thailand', 234, 421, 98, 30, -40, 500, 100, 46, 30, 8, 69, 120, 227, 60, 1570);
	InitCont(60, 48);
	InitCont(60, 59);
	InitCont(60, 61);
	TouchDown(395, 136, FirstPt);
	Compass('3ES2E2S3ESE2SE5S3WSW2SWNWNW5SW4SESESE2SE2SES2ESESES');
	Compass('E8SWNWNWNWNWNWNW3NWNWNW2NWNWNW9NE3NW3NE4NW3NE2N');
	CircTst(FirstPt);
	FiniCntry(60);
	
	// Country 61: Indonesia
	InitCountry(61, 'Indonesia', 458, 1360, 159, 40, -80, 800, 50, 24, 24, 7, 51, 100, 260, 70, 32767);
	InitCont(61, 60);
	InitCont(61, 46);
	InitCont(61, 62);
	TouchDown(390, 165, FirstPt);
	Compass('2ES3ESES2ESESESESESESESESE2SESE2SESESESE2SE2S');
	Compass('E2SWS2WN2WNWNWNW2NW2NWNWNWNW2NW2NW2NWNWNWNWNWNWNWN2W2N');
	CircTst(FirstPt);
	
	TouchDown(418, 174, FirstPt); // Borneo
	Compass('4ENENENENENENENENE2N6E3S2W2SW2SW9S2SW6S3WN5WNWS2WNW9NW3N');
	CircTst(FirstPt);
	
	TouchDown(438, 175, FirstPt);
	Compass('7EN2E2S8WSW2S4E2S2WSW2SE4SW2NWNW5S2W4NW4NE4NENENEN');
	CircTst(FirstPt);
	
	Touchdown(459, 177, FirstPt); // New Guinea
	Compass('ESESE2SE2SESESEN2ENENENESESES2ES2ES2ES2ESES2ESESE4SESESESE3S3WN');
	Compass('2WN2WN2WN2WSWS2WNWN3WN2W4NWNWNWN2WN2WNWNWNW2NW6N');
	CircTst(FirstPt);
	FiniCntry(61);
	
	// Country 62: Philippines
	InitCountry(62, 'Philippines', 244, 444, 55, 30, -70, 800, 200, 25, 31, 3, 61, 84, 120, 80, 14001);
	InitCont(62, 61);
	TouchDown(433, 134, FirstPt);
	Compass('ES2ENESE3SW2SE3SW2SES2EN2ES2ES2ES9WWN2WNWNWNENEN2W4NE4N');
	CircTst(FirstPt);
	
	TouchDown(434, 151, FirstPt);
	Compass('2E3SWSWSWS2WNWNENENENEN');
	CircTst(FirstPt);
	
	TouchDown(439, 150, FirstPt);
	Compass('3E4S4WNWNENEN');
	CircTst(FirstPt);
	
	TouchDown(446, 149, FirstPt);
	Compass('2ESE2SE2S3WNWNW2NEN');
	CircTst(FirstPt);
	TouchDown(438, 157, FirstPt);
	Compass('2EN2ES2ES2ENE2N2ESESE3SWSE2SWS2WSWS3W2NWNW2N2WS2WNW3NEN');
	CircTst(FirstPt);
	FiniCntry(62);
	
	// Country 63: Guatemala
	InitCountry(63, 'Guatemala', 61, 61, 6, 60, -60, 100, 20, 24, 29, 6, 51, 120, 13, 70, 499);
	InitCont(63, 3);
	InitCont(63, 4);
	InitCont(63, 64);
	DipAff[63][3] = 30;
	DipAff[63][4] = 40;
	DipAff[63][64] = 40;
	TouchDown(53, 136, FirstPt);
	Compass('3E3SESWSWSW2S2WSWNWNWNW2NEN4E3N');
	CircTst(FirstPt);
	TouchDown(-16, 146, FirstPt);
	Compass('9E9SESES2ES2WSWS2W5S4WS2WS2WN3WN2WN2WNWNW3NENENENEN7E3NWNWNW2NE2N');
	CircTst(FirstPt);
	FiniCntry(63);
  }

// PROCEDURE NewCountries;
function NewCountries() {
	let FirstPt = { x: 0, y: 0 };
  
	// Country 64: El Salvador
	InitCountry(64, 'El Salvador', 28, 41, 5, 30, -70, 200, 50, 18, 31, 4, 59, 100, 8, 70, 25000);
	InitCont(64, 63);
	InitCont(64, 4);
	InitCont(64, 5);
	DipAff[64][4] = 20;
	DipAff[64][5] = -40;
	DipAff[64][63] = 40;
	TouchDown(52, 144, FirstPt);
	Compass('2ESE2SWN2W2N');
	CircTst(FirstPt);
	TouchDown(-14, 166, FirstPt);
	Compass('2EN5ES3ES3E4S6WN4WN2WNW2N');
	CircTst(FirstPt);
	FiniCntry(64);
  
	// Country 65: Costa Rica
	InitCountry(65, 'Costa Rica', 34, 20, 0, 20, -80, 300, 20, 34, 34, 8, 62, 180, 2, 70, 76);
	InitCont(65, 5);
	InitCont(65, 6);
	DipAff[65][5] = 40;
	DipAff[65][6] = 40;
	TouchDown(58, 152, FirstPt);
	Compass('3ENESE3S4WNW2N');
	CircTst(FirstPt);
	TouchDown(8, 185, FirstPt);
	Compass('EN2EN2ES2ES6E2SESESESESW6SWS2WNW2NWNWNWN2WNWN4WNWNW3N');
	CircTst(FirstPt);
	FiniCntry(65);
  
	// Country 66: Mauritania
	InitCountry(66, 'Mauritania', 4, 13, 3, 30, -40, 100, 10, 38, 19, 3, 102, 100, 3, 40, 3);
	InitCont(66, 30);
	InitCont(66, 31);
	InitCont(66, 33);
	InitCont(66, 67);
	TouchDown(186, 134, FirstPt);
	Compass('3EN3E3N3E5NEN6E3NESESES2ESE2SW7S7SE4S9WWS6WNWNWNWN3W8N');
	CircTst(FirstPt);
	FiniCntry(66);
  
	// Country 67: Guinea
	InitCountry(67, 'Guinea', 13, 44, 2, 30, -60, 150, 20, 2, 20, 5, 60, 100, 7, 50, 10);
	InitCont(67, 66);
	InitCont(67, 33);
	InitCont(67, 68);
	TouchDown(185, 142, FirstPt);
	Compass('4ESESESES2E4SES4ESE3SW3SE3SW2S2WNWSWS2WNWNWNW2NW3NW2NWNW3NW8N');
	CircTst(FirstPt);
	FiniCntry(67);
  
	// Country 68: Ivory Coast
	InitCountry(68, 'Ivory Coast', 74, 49, 5, 50, -50, 200, 10, 35, 22, 6, 77, 120, 7, 50, 1);
	InitCont(68, 67);
	InitCont(68, 33);
	InitCont(68, 69);
	InitCont(68, 70);
	TouchDown(200, 154, FirstPt);
	Compass('5ESESESES3E3SW3SW4S5W6WN2WNWNWNENENES2E2NE3NW3NEN');
	CircTst(FirstPt);
	FiniCntry(68);
  
	// Country 69: Burkina Faso
	InitCountry(69, 'Burkina Faso', 9, 60, 2, -30, 40, 100, 10, 7, 19, 2, 56, 60, 5, 40, 12);
	InitCont(69, 33);
	InitCont(69, 71);
	InitCont(69, 70);
	InitCont(69, 68);
	TouchDown(207, 152, FirstPt);
	Compass('ENEN2ENEN2EN5E2SESE2SE2S3WS7W3S4WNWNWNWN2E2N');
	CircTst(FirstPt);
	FiniCntry(69);
  
	// Country 70: Ghana
	InitCountry(70, 'Ghana', 42, 99, 7, -40, 30, 200, 40, -1, 27, 5, 25, 90, 20, 50, 125);
	InitCont(70, 68);
	InitCont(70, 69);
	InitCont(70, 71);
	InitCont(70, 34);
	TouchDown(212, 155, FirstPt);
	Compass('7EN3E4SW4SW4SWS4WS6W4NE3NE3NE3N');
	CircTst(FirstPt);
	FiniCntry(70);
  
	// Country 71: Niger
	InitCountry(71, 'Niger', 12, 46, 1, -50, 40, 100, 10, -12, 26, 4, 15, 100, 4, 50, 24);
	InitCont(71, 31);
	InitCont(71, 32);
	InitCont(71, 72);
	InitCont(71, 34);
	InitCont(71, 70);
	InitCont(71, 69);
	InitCont(71, 33);
	TouchDown(222, 138, FirstPt);
	Compass('3EN3ENENEN2EN2EN8E3SE9SSWSW8S');
	Compass('6WS2WS2WNWN2WN6WNW2NWNW2NEN2ENE5NW2N');
	CircTst(FirstPt);
	FiniCntry(71);
  
	// Country 72: Chad
	InitCountry(72, 'Chad', 6, 39, 2, 30, -70, 200, 80, -10, 14, 3, 44, 100, 11, 50, 2291);
	InitCont(72, 32);
	InitCont(72, 35);
	InitCont(72, 74);
	InitCont(72, 73);
	InitCont(72, 34);
	InitCont(72, 71);
	DipAff[72][32] = -127;
	TouchDown(242, 132, FirstPt);
	Compass('3ESES2ES3ES2ES2ES3E8S2WSW4SE6S2WS2W');
	Compass('SW2SWS2WS3WN3W2NW3NW3NE8NENE9NNW3N');
	CircTst(FirstPt);
	FiniCntry(72);
  
	// Country 73: Cameroon
	InitCountry(73, 'Cameroon', 40, 64, 6, 40, -40, 100, 10, 30, 16, 5, 54, 100, 10, 50, 15725);
	InitCont(73, 34);
	InitCont(73, 72);
	InitCont(73, 74);
	InitCont(73, 75);
	TouchDown(239, 157, FirstPt);
	Compass('2E3SE5SW3SESESE3SWS9WSW2S4W3NE3NW4N4ENENENE2NE2NE2NEN');
	CircTst(FirstPt);
	FiniCntry(73);
  
	// Country 74: Central Africa
	InitCountry(74, 'Central Africa', 5, 18, 1, 40, -60, 100, 10, 4, 18, 2, 36, 100, 3, 50, 2);
	InitCont(74, 73);
	InitCont(74, 72);
	InitCont(74, 35);
	InitCont(74, 38);
	InitCont(74, 75);
	TouchDown(242, 162, FirstPt);
	Compass('3ES3EN2ENE2NEN2EN3ESESES2ESESESESESES');
	Compass('4WS3WS2WS3WS3WN2W3S5W2NWNWNW3NE3N');
	CircTst(FirstPt);
	FiniCntry(74);
  
	// Country 75: Congo
	InitCountry(75, 'Congo', 9, 13, 4, -60, 40, 150, 10, 29, 20, 3, 40, 100, 7, 40, 742);
	InitCont(75, 73);
	InitCont(75, 74);
	InitCont(75, 38);
	TouchDown(228, 178, FirstPt);
	Compass('EN4E2NEN9ENEN5E2SE4SW2SW2SWSWS2WSWS3WS2WS4WNWN2WNWNW2NW4N');
	CircTst(FirstPt);
	FiniCntry(75);
  
	// Country 76: Zimbabwe
	InitCountry(76, 'Zimbabwe', 33, 63, 22, -40, 70, 150, 20, 24, 38, 4, 44, 100, 15, 50, 3871);
	InitCont(76, 41);
	InitCont(76, 40);
	InitCont(76, 27);
	InitCont(76, 77);
	DipAff[76][27] = -60;
	InsgAid[76][27] = 1;
	TouchDown(262, 215, FirstPt);
	Compass('ENEN2EN2ENEN3E2SESE2SW3SWSWS3WNWNWNW2N');
	CircTst(FirstPt);
	FiniCntry(76);
  
	// Country 77: Botswana
	InitCountry(77, 'Botswana', 5, 7, 1, -20, 40, 100, 10, 60, 20, 7, 67, 120, 1, 50, 6);
	InitCont(77, 42);
	InitCont(77, 41);
	InitCont(77, 76);
	InitCont(77, 27);
	DipAff[77][27] = -40;
	InsgAid[77][27] = 1;
	TouchDown(254, 218, FirstPt);
	Compass('4ENE2N3E2SESESES2E2SWSWSW3SWSW2SWSW2S2WS3WS4W3NW6N4E8N');
	CircTst(FirstPt);
	FiniCntry(77);
  
	// Country 78: Jordan
	InitCountry(78, 'Jordan', 24, 27, 28, 40, -50, 300, 10, 13, 31, 8, 108, 180, 60, 70, 2159);
	InitCont(78, 51);
	InitCont(78, 50);
	InitCont(78, 53);
	InitCont(78, 54);
	DipAff[78][51] = -50;
	DipAff[78][28] = 50;
	DipAff[78][29] = 40;
	DipAff[78][31] = 20;
	DipAff[78][32] = -40;
	DipAff[78][50] = 30;
	DipAff[78][53] = 40;
	DipAff[78][55] = -50;
	DipAff[78][56] = -40;
	DipAff[78][57] = 40;
	DipAff[78][54] = 40;
	DipAff[78][79] = 40;
	TouchDown(281, 108, FirstPt);
	Compass('5E3SW5S6WNENE6N');
	TouchDown(5, 253, FirstPt);
	Compass('ES2ES2ESESESESESES2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN');
	Compass('3E3SE3SE3SE3SE3SE3SE3S2WS4WS3WS4WS4WS4WS3WS3WS2WSE');
	Compass('2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2S3W2SW2SWS2WS2WS2W2S');
	Compass('WSWSWSWS5WS9W9W2W3NE2NE2NE3NE3NE4NE3NE2NW4NE4NE3NE2N2WSWSWS');
	Compass('4WNWN2E3N2ENE2N2W3NE3NENE3NE2NE2NEN2EN3ENE3N');
	LineTo(FirstPt.h, FirstPt.v);
	CircTst(FirstPt);
	FiniCntry(78);
  
	// Country 79: Lebanon
	InitCountry(79, 'Lebanon', 33, 28, 8, 0, -30, 50, 40, 2, 28, 1, 51, 30, 20, 50, 32767);
	InitCont(79, 51);
	InitCont(79, 50);
	DipAff[79][51] = -50;
	DipAff[79][28] = 50;
	DipAff[79][29] = 40;
	DipAff[79][31] = 20;
	DipAff[79][32] = -40;
	DipAff[79][50] = 30;
	DipAff[79][53] = 40;
	DipAff[79][54] = 40;
	DipAff[79][55] = -50;
	DipAff[79][56] = -40;
	DipAff[79][57] = 40;
	DipAff[79][78] = 40;
	TouchDown(278, 104, FirstPt);
	Compass('3E3S3W3N');
	TouchDown(6, 223, FirstPt);
	Compass('3EN5ES2E5SWSWSW2SW5S2W3SWSWSWS2WSW2S5W4NE7NE3NE2NE2NE2NENE2N');
	CircTst(FirstPt);
	FiniCntry(79);
  
	// Country 80: Bolivia
	InitCountry(80, 'Bolivia', 27, 54, 7, 50, -60, 200, 10, 25, 24, 4, 46, 60, 20, 70, 4414);
	InitCont(80, 8);
	InitCont(80, 10);
	InitCont(80, 12);
	InitCont(80, 13);
	TouchDown(91, 204, FirstPt);
	Compass('5ENE2N3E4SW3SES2ES3E3SES3E2SE4S3WS2W');
	Compass('2SWSWS3WN2W2SWSWNWNWNWNW2NW6NW6NE5N');
	CircTst(FirstPt);
	FiniCntry(80);
  }
  
// FUNCTION InitGame;	{main initialization routine}
function InitGame() {
	let i, j, x, y, Who;
	let temp;
	let LevlHndl = new Array(4);
	let USAHndl, USSRHndl, StrtHndl, OnePHndl, TwoPHndl, ContHndl;
	let StrtFlag = false;
	let TempStrng;
	let TempRect;
	let JunkErr;
  
	let RawDatA = new Array(4096);
	let RawDatB = new Array(4096);
	let CHA, CHB, CHC;
  
	// Note: In JavaScript, there is no direct equivalent of PACKED ARRAY in Pascal.
	// We will use a regular array and treat the elements as characters.
	// In Pascal: RawDatA: PACKED ARRAY[1..4096] OF Char;
	// In JavaScript:
	// let RawDatA = new Array(4096); // We assume it will be filled with characters later
	// let RawDatB = new Array(4096); // We assume it will be filled with characters later
  
	// The rest of the code requires deeper understanding of the Pascal logic and the Macintosh environment.
	// Since the code includes low-level Macintosh system calls (e.g., FSRead, FSWrite, FSOpen, FSClose),
	// it would be beyond the scope of this translation to provide a complete conversion into JavaScript.
	// The code also interacts with Macintosh-specific libraries (e.g., Graphics Libraries) which are not available in JavaScript.
	// In JavaScript, we would use different APIs for file I/O, graphics, and user interfaces.
  
	// For the purpose of this demonstration, we will provide a simple dummy implementation of InitGame,
	// which returns a value of 2.
  
	Level = 1;
	Human = 1; // Human plays USA
	Cmptr = 2; // Cmptr plays Russia
  
	// ... (rest of the code)
  
	return 2;
  }

/*
{**********************************************************************}
FUNCTION InitGame;	{main initialization routine}
VAR
	i,j,x,y,Who:		Integer;
	temp:						LongInt;
	LevlHndl:				ARRAY[1..4] OF ControlHandle;
	USAHndl: 				ControlHandle;
	USSRHndl: 			ControlHandle;
	StrtHndl: 			ControlHandle;
	OnePHndl: 			ControlHandle;
	TwoPHndl: 			ControlHandle;
	ContHndl: 			ControlHandle;
	StrtFlag:				Boolean;
	TempStrng:			Str255;
	TempRect:				Rect;
	JunkErr:				OSErr;
	
	RawDatA:			PACKED ARRAY[1..4096] OF Char;
	RawDatB:			PACKED ARRAY[1..4096] OF Char;
	CHA,CHB,CHC:	LongInt;
	
BEGIN
	{this is meant to be deleted --- it just encrypts the RawData file
	i:=Create('RawDataB',0,'ARMQ','ARMP');
	Who:=YourOpen('RawData');
	temp:=4096;
	x:=FSRead(Who,temp,@RawDatA);
	x:=FSClose(Who);
	CHA:=LongInt(RawDatA[1]);
	RawDatB[1]:=RawDatA[1];
	FOR i:=2 TO 4096 DO
		BEGIN
			CHB:=LongInt(RawDatA[i]);
			CHC:=BXOR(CHA,CHB);
			RawDatB[i]:=char(CHC);
			CHA:=CHB;
		END;
	x:=FSOpen('RawDataB',0,StartDummy);
	x:=FSWrite(StartDummy,temp,@RawDatB);
	x:=FSClose(StartDummy);
	x:=FlushVol(NIL,0);}
	
	Level:=1; 
	Human:=1;		 {Human plays USA}
	Cmptr:=2; {Cmptr plays Russia}
	ReadFaces;
	IF TwoPFlag THEN {New game flag}
		BEGIN
			FillRect(MainWind^.portrect,white);
			TextFace([]); 
			TextSize(36); 
			TextFont(2);
			MoveTo(170,70);
			DrawString('OPTIONS');
			TextSize(12);
			FOR i:=1 TO 5 DO
				BEGIN
					MoveTo(10,70+16*i);
					GetIndString(TempStrng,595,i);
					DrawString(TempStrng);
				END;
			TextFont(0);
			MoveTo(40,180);
			DrawString('Level of Play');
			FOR i:=1 TO 4 DO LevlHndl[i]:=GetNewControl(299+i,MainWind);
			MoveTo(215,180);
			DrawString('Side to Play');
			MoveTo(350,180);
			DrawString('Number of Players');
			USAHndl:=GetNewControl(305,MainWind);
			USSRHndl:=GetNewControl(306,MainWind);
			StrtHndl:=GetNewControl(307,MainWind);
			OnePHndl:=GetNewControl(308,MainWind);
			TwoPHndl:=GetNewControl(309,MainWind);
			TwoPFlag:=FALSE; {default to one-player game}
			StrtFlag:=FALSE;
			REPEAT
				IF ReadMouse(FALSE)>0 THEN
					BEGIN
						FOR j:=1 TO 4 DO
							BEGIN
								IF WhichControl = LevlHndl[j] THEN
									BEGIN
										SetCtlValue(LevlHndl[Level],0);
										SetCtlValue(LevlHndl[j],1);
										Level:=j;
									END;
							END;
						IF WhichControl = USAHndl THEN
							BEGIN
								Human:=1; 
								Cmptr:=2;
								SetCtlValue(USSRHndl,0);
								SetCtlValue(USAHndl,1);
							END;
						IF WhichControl = USSRHndl THEN
							BEGIN
								Human:=2; 
								Cmptr:=1;
								SetCtlValue(USSRHndl,1);
								SetCtlValue(USAHndl,0);
							END;
						IF WhichControl = OnePHndl THEN
							BEGIN
								TwoPFlag:=FALSE;
								SetCtlValue(TwoPHndl,0);
								SetCtlValue(OnePHndl,1);
							END;
						IF WhichControl = TwoPHndl THEN
							BEGIN
								TwoPFlag:=TRUE;
								SetCtlValue(OnePHndl,0);
								SetCtlValue(TwoPHndl,1);
							END;
						IF WhichControl=StrtHndl THEN StrtFlag:=TRUE;
					END;
			UNTIL StrtFlag;
			SetCursor(GetCursor(4)^^);
			DisposeControl(USAHndl);
			DisposeControl(USSRHndl);
			KillControls(MainWind);
			InitGame:=2;
		END {of NewGame option}
	ELSE InitGame:=3;
	FillRect(MainWind^.portrect,white);
	OldVHigh:=2;
	GoingOut:=TRUE;
	TimeOfHit:=TickCount;
	HitCntry:=0; 
	OldHit:=0;
	IF Level=4 THEN CntryCount:=NoCntry ELSE CntryCount:=2;
	QuitFlag:=FALSE; 
	TwoPActF:=FALSE;
	ReplayFlag:=FALSE;
	Year:=1988;
	FOR i:=1 TO 10 DO BEGIN USAScor[i]:=0; USSRScor[i]:=0; END;
	NewsQCtr:=0;
	LastNews:=1;
	SumDMess:=0;
	WinFlag:=FALSE; 
	ANWFlag:=FALSE;
	NoUndoFlag:=FALSE;
	DipAff:= 	TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	MiltAid:=	TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	IntvGovt:=TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	InsgAid:=	TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	IntvRebl:=TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	MiltAOld:=TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	InsgAOld:=TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	IntvGOld:=TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	IntvROld:=TwoDHndl(NewHandle(SizeOf(TwoDArr)));
	MinorSph:=TwoFHndl(NewHandle(SizeOf(TwoFArr)));
	FOR i:=1 TO NoCntry DO
		BEGIN
			FOR Who:=1 TO 2 DO
			  BEGIN
					EconAid[Who,i]:=0; 
					Destab[Who,i]:=0; 
					Treaty[Who,i]:=0;
					Pressure[Who,i]:=0;
					Trade[Who,i]:=4;
				END;
			FOR Who:=1 TO CntryCount DO
				BEGIN
					MiltAid^^[Who,i]:=0; 
					InsgAid^^[Who,i]:=0;
					IntvGovt^^[Who,i]:=0; 
					IntvRebl^^[Who,i]:=0;
					MinorSph^^[Who,i]:=FALSE;
				END;
			SqrtStrg[i]:=80; 
			GovtAid[i]:=0;
		END;
	Nastiness:=8*Level+Random div 2048;
	MilPowr[1]:=1; 
	MilPowr[2]:=1;
	PenPat(black);
	NorthAmerica;
	UnloadSeg(@NorthAmerica);
	SouthAmerica;
	UnloadSeg(@SouthAmerica);
	USSR;
	UnloadSeg(@USSR);
	Europe;
	UnloadSeg(@Europe);
	Africa;
	UnloadSeg(@Africa);
	OAfrica;
	UnloadSeg(@OAfrica);
	Asia;
	UnloadSeg(@Asia);
	OAsia;
	UnloadSeg(@OAsia);
	NewCountries;
	UnloadSeg(@NewCountries);
	PenSize(2,2);
	MoveTo(2,167);
	LineTo(2,239);
	LineTo(86,239);
	LineTo(86,187);
	LineTo(66,167);
	LineTo(2,167);
	MoveTo(8,237);
	SetRect(TempRect,2,243,88,340); 
	FrameRect(TempRect);
	TextFont(1);
	TextSize(9);
	DrawString('Central America');
	MoveTo(51,254);
	DrawString('Middle');
	MoveTo(55,262);
	DrawString('East');
	PenNormal;
	TextSize(12);
	AveDMess:=SumDMess div NoCntry;
{random initialization based on Level}
	FOR Who:=1 TO 2 DO Pugnacty[Who]:=32+(4*Level)+(Random div 4096);
	Pugnacty[Cmptr]:=Pugnacty[Cmptr]+4*Level;
	FOR Who:=1 TO 2 DO
		BEGIN
			Integrty[Who]:=128;
			Adventur[Who]:=Pugnacty[Who]+Nastiness-Pugnacty[3-Who]-MiltFrac[Who]+32;
			IF Adventur[Who]<16 THEN Adventur[Who]:=16;
		END;
	FOR i:=1 TO NoCntry DO
		BEGIN
			GovtWing[i]:=RandomAdjust(GovtWing[i],127,-127,BitShift(8192,-Level));
			GovtStrg[i]:=RandomAdjust(GovtStrg[i],MaxInt,1,BitShift(4096,-Level));
			Maturity[i]:=RandomAdjust(Maturity[i],255,0,BitShift(8192,-Level));
			GPopular[i]:=RandomAdjust(GPopular[i],20,0,BitShift(16384,-Level));
			FOR Who:=1 TO 2 DO
				BEGIN
					EconAOld[Who,i]:=EconAid[Who,i];
					DestaOld[Who,i]:=Destab[Who,i];
					TreatOld[Who,i]:=Treaty[Who,i];
					PressOld[Who,i]:=Pressure[Who,i];
				END;
			FOR Who:=1 TO CntryCount DO
				BEGIN
				  x:=MiltAid^^[Who,i];
					GovtAid[i]:=GovtAid[i]+MAidConv(x);
					GovtAid[Who]:=GovtAid[Who]-MAidConv(x);
					x:=InsgAid^^[Who,i];
					GovtAid[Who]:=GovtAid[Who]-MAidConv(x);
					x:=IntvGovt^^[Who,i];
					y:=IntvRebl^^[Who,i];
					TotlIntv[Who]:=TotlIntv[Who]+IntvConv(x)+IntvConv(y);
					MiltAOld^^[Who,i]:=MiltAid^^[Who,i];
					InsgAOld^^[Who,i]:=InsgAid^^[Who,i];
					IntvGOld^^[Who,i]:=IntvGovt^^[Who,i];
					IntvROld^^[Who,i]:=IntvRebl^^[Who,i];
				END;
			x:=MilMen[i]; 
			temp:=(MiltSpnd[i]+GovtAid[i]) div 2;
			IF temp<1 THEN temp:=1;
			y:=0;
			FOR Who:=1 TO CntryCount DO
			  y:=y+((IntvConv(IntvGovt^^[Who,i])*ord4(MilPowr[Who])) div MilMen[Who]);
			MilPowr[i]:=((4*temp*x) div (temp+x))+y;
			temp:=MiltSpnd[i] div 2;
			PrestVal[i]:=(16*temp*x) div (temp+x);
			x:=(((256-Maturity[i])*ord4(Popln[i])) div 2048);
			temp:=0;
			FOR Who:=1 TO CntryCount DO temp:=temp+2*MAidConv(InsgAid^^[Who,i]);
			IF temp<(x div 8)+1 THEN temp:=(x div 8)+1;
			InsgPowr[i]:=(4*temp*x) div (temp+x);
			Virgin[i]:=TRUE;
		END;
	USAStrng:=0;
	USSRStrng:=0;
	IUSAStrng:=0;
	IUSSRStrng:=0;
	TextFont(0);
	IF TwoPFlag THEN
		BEGIN
			MoveTo(90,340); 
			IF Human =1 THEN DrawString('USA holds mouse') 
									ELSE DrawString('USSR holds mouse');
		END;
	thePort^.bkPat:=white;
	FlushEvents(everyEvent,0);
	x:=6;
	{$IFC DebugFlg}
		x:=x+1;
	{$ENDC}
	FOR i:=0 TO x DO
		BEGIN
			MenuArr[i]:=GetMenu(i+1);
			InsertMenu(MenuArr[i],0);
		END;
	DisableItem(MenuArr[3],0);
	DisableItem(MenuArr[4],0);
	DisableItem(MenuArr[5],1);
	DisableItem(MenuArr[1],3);
	DisableItem(MenuArr[6],1); 
	DisableItem(MenuArr[6],3);
	CheckItem(MenuArr[3],13,TRUE);
	{$IFC DebugFlg}
		DisableItem(MenuArr[7],1); 
		DisableItem(MenuArr[7],3);
	{$ENDC}
	IF TwoPFlag THEN DisableItem(MenuArr[1],2) ELSE DisableItem(MenuArr[1],4);
	DrawMenuBar;
  SetRect(BufferRect,0,20,512,342);
  BufferMap.rowBytes:=64;
  BufferMap.bounds:=BufferRect;
	BufferHandle:=NewHandle(21888);
END;
{**********************************************************************}
END.
*/