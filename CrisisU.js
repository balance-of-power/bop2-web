/*
Unit CrisisU;
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
{$SETC DebugFlg:=FALSE}
{$IFC DebugFlg}
	{$D+}
	{$R+}
	{$OV+}
{$ENDC}
FUNCTION Crisis(WhichHead: Integer): Boolean;
PROCEDURE MinorCrisis(WhichHead: Integer);
PROCEDURE CmptrCrisis(WhichHead: Integer);

IMPLEMENTATION
*/

// PROCEDURE MinorCrisis;
function MinorCrisis() {
	let CrisisLevel;
	let Base;
	let i;
	let SavHuman;
	let HLoss;
	let CGain;
	let x;
	let y;
	let z;
	let Who;
	let StrgHndl;
	let BackDown;
	let BackHndl;
	let TempStrng;
	let SaveStrng;
	let Victim;
  
	// Your Pascal code logic goes here...
  
	// For example:
	CrisisLevel = 0;
	Base = 10;
	SavHuman = 5;
  
	// Continue with the rest of your Pascal code logic...
  
	// Be sure to implement the logic inside the function properly using JavaScript syntax.
  }  

// PROCEDURE MinorTough;
 let CrisisLevel = 0; // Assuming there is a global CrisisLevel variable.
let x, y; // Declaring variables x and y.

function MinorTough() {
  CrisisLevel = CrisisLevel - 1;
  x = 0;

  switch (CrisisLevel) {
    case 2:
      x = 32;
      break;
    case 3:
      x = 16;
      break;
    case 4:
      x = 8;
      break;
    case 5:
      x = 4;
      break;
    case 6:
      x = 2;
      break;
    case 7:
      x = 1;
      break;
    case 8:
      x = 0;
      break;
    default:
      // Handle any other case as needed.
      break;
  }

  ChgDipAff(Who, Human, -x); // Assuming ChgDipAff function is available.
}

// PROCEDURE MinorCrisis(WhichHead: Integer);
BEGIN
	Who:=Subject[WhichHead];
	Victim:=Object[WhichHead];
	GetWTitle(MyWind,SaveStrng);
	SetWTitle(MyWind,'Minor Country Crisis');
	BackDown:=FALSE;
	CrisisLevel:=9;
	BackHndl:=GetNewControl(131,MyWind);
	HiliteControl(PButHandle,255); 
	HiliteControl(NButHandle,255);
	IF Human=1 THEN x:=1 ELSE x:=-1;
	ChgDMess(Victim,x);
	REPEAT
		HiliteControl(BackHndl,255);
		x:=(Abs(DontMess[Victim]-AveDMess)*Influence(Human,Who)) div 8;
		CASE CrisisLevel OF
			9: y:=1;
			8: y:=1;
			7: y:=2;
			6: y:=2;
			5: y:=4;
			4: y:=4;
			3: y:=8;
			2: y:=8;
			1: y:=16;
		END;
		IF (x*y)<4*CrisisLevel-36+Abs(Random div (y*256)) THEN
			BEGIN
				MinorTough;
				x:=976-2*CrisisLevel;
				Headline(x,0,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
				HiliteControl(BackHndl,0);
			END
		ELSE
			BEGIN
				BackDown:=TRUE;
				HeadLine(980,0,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
				CrisisVal[WhichHead]:=TRUE; 
				DoPolicy(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],TRUE);
				SetCTitle(RespHndl,'OK');
				HiliteControl(RespHndl,0);
				whichControl:=NIL;
				REPEAT
					x:=ReadMouse(FALSE);
				UNTIL whichControl=RespHndl;
			END;
		IF NOT BackDown AND (CrisisLevel>1) THEN
			BEGIN	{human consideration}
				CASE Level OF
					1: y:=2048;
					2: y:=1024;
					3: y:=512;
					4: y:=512;
				END;
				FlushEvents(everyEvent,0);
				GetIndString(TempStrng,589,CrisisLevel);
				SetCTitle(RespHndl,TempStrng);
				HiliteControl(RespHndl,0);
				REPEAT UNTIL ReadMouse(FALSE)>0;
				ClearRect(2,248,250,295);
				IF whichControl=BackHndl THEN
					BEGIN
						BackDown:=TRUE;
						CrisisVal[WhichHead]:=TRUE; 
					END;
				IF whichControl=RespHndl THEN MinorTough;
			END;
	UNTIL BackDown OR (CrisisLevel=1);
	GetIndString(TempStrng,590,10);
	SetCTitle(RespHndl,TempStrng);
	HiliteControl(RespHndl,255);
	ClearRect(2,150,250,227);
	DisposeControl(BackHndl);
	SetWTitle(MyWind,SaveStrng);
	SetPort(MainWind); 
	CalcScores; 
	WritScor; 
	SetPort(myWind);
END;
{***********************************************************************}
PROCEDURE CmptrCrisis;
VAR
	CrisisLevel:	Integer;
	Base:				Integer;
	i:					Integer;
	SavHuman:		Integer;
	x:					Integer;
	y:					Integer;
	z:					Integer;
	Who:				Integer;
	Victim:			Integer;
	StrgHndl:		StringHandle;
	BackDown:		Boolean;
	BackHndl:		ControlHandle;
	TempStrng:	Str255;
	SaveStrng:	Str255;
{-----------------------------------------------------------------------}
PROCEDURE Tough;
VAR	x,y:	Integer;
BEGIN
	CrisisLevel:=CrisisLevel-1;
	x:=0;
	CASE CrisisLevel OF
		2: x:=32;
		3: x:=16;
		4: x:=8;
		5: x:=4;
		6: x:=2;
		7: x:=1;
		8: x:=0;
	END;
	ChgDipAff(Who,Cmptr,-x);
 END;
{-----------------------------------------------------------------------}
BEGIN
	Who:=Subject[WhichHead];
	Victim:=Object[WhichHead];
	BackDown:=FALSE;
	CrisisLevel:=9;
	IF Cmptr=1 THEN x:=1 ELSE x:=-1;
	ChgDMess(Victim,x);
	REPEAT
		x:=(Abs(DontMess[Victim]-AveDMess)*Influence(Cmptr,Who)) div 8;
		CASE CrisisLevel OF
			9: y:=1;
			8: y:=1;
			7: y:=2;
			6: y:=2;
			5: y:=4;
			4: y:=4;
			3: y:=8;
			2: y:=8;
			1: y:=16;
		END;
		IF (x*y)<4*CrisisLevel-36+Abs(Random div (y*256)) THEN Tough
		ELSE
			BEGIN
				BackDown:=TRUE;
				CrisisVal[WhichHead]:=TRUE; 
				DoPolicy(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],TRUE);
			END;
		IF NOT BackDown & (CrisisLevel>1) THEN
			BEGIN	{computer consideration}
				x:=GImpt(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead],0,y,z);
				IF Cmptr=1 THEN z:=y;
				IF z>4*CrisisLevel-36+Abs(Random div 1024) THEN Tough
					ELSE
						BEGIN
							BackDown:=TRUE;
							CrisisVal[WhichHead]:=TRUE; 
						END;
			END;
	UNTIL BackDown OR (CrisisLevel=1);
	{ClearRect(20,20,200,40);
	MoveTo(20,40); MyWrite(CrisisLevel); 
	DrawString(' '); DrawString(CntryNam[Who]); 
	DrawString(' '); DrawString(CntryNam[Victim]); 
	DrawString(' '); MyWrite(Verb[WhichHead]); 
	DrawString(' '); MyWrite(z);
	REPEAT UNTIL Button;
	REPEAT UNTIL NOT Button;}
END;
{***********************************************************************}
FUNCTION Crisis;
{Returns a value of TRUE if the missiles fly}
VAR
	SumLoser:		LongInt;
	SumWinnr:		LongInt;
	CrisisLevel:	Integer;
	Base:				Integer;
	i:					Integer;
	SavHuman:		Integer;
	HLoss:			Integer;
	CGain:			Integer;
	x:					Integer;
	y:					Integer;
	z:					Integer;
	H:					Integer;
	DAow:				Integer;
	DAol:				Integer;
	Usex:				Integer;
	Usez:				Integer;
	Rand1:			Integer;
	Rand2:			Integer;
	Victim:			Integer;
	Who:				Integer;
	StrgHndl:		StringHandle;
	BackDown:		Boolean;
	AggrFlag:		Boolean;
	BackHndl:		ControlHandle;
	TempStrng:	Str255;
	SaveStrng:	Str255;
{-----------------------------------------------------------------------}
PROCEDURE HangLoose(Loser,Winner,CrisisLevel: Integer);
VAR j,t,x,y,z:	Integer;
BEGIN
	IF CrisisLevel<8 THEN
		BEGIN {no penalty for early withdrawal}
			Pugnacty[Winner]:=Pugnacty[Winner]+((130-Pugnacty[Winner]) div 4);
			x:=Treaty[Loser,Victim];
			t:=Impt(Loser,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead]);
			Integrty[Loser]:=Integrty[Loser]-2*((Should(x)*t) div 256);
			IF Integrty[Loser]<1 THEN Integrty[Loser]:=1;
			IF Integrty[Loser]>127 THEN Integrty[Loser]:=127;
			y:=GImpt(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead],0,t,z);
			x:=(Abs(t) div CrisisLevel)+(Abs(z) div CrisisLevel)+8-CrisisLevel;
			y:=0;
			FOR j:=3 TO NoCntry DO
				BEGIN
					z:=x div 32;
					y:=y+(x mod 32);
					IF y>32 THEN BEGIN z:=z+1; y:=y-32; END;
					ChgDipAff(j,Loser,-z); 
					ChgDipAff(j,Winner,z);
				END;
		END; {penalty section}
	IF odd(CrisisLevel) THEN
		BEGIN
			x:=NewNVal[WhichHead]; 
			NewNVal[WhichHead]:=OldNVal[WhichHead]; 
			OldNVal[WhichHead]:=x; 
			CrisisVal[WhichHead]:=TRUE;
			DoPolicy(Who,Verb[WhichHead],Victim,NewNVal[WhichHead],TRUE);
		END;
	x:=9-CrisisLevel;
	t:=Victim;
	IF x>DontMess[t] THEN x:=DontMess[t];
	IF Loser=1 THEN x:=-x;
	ChgDMess(t,x);
	SetPort(MainWind); 
	CalcScores; 
	WritScor; 
	SetPort(myWind);
END;
{-----------------------------------------------------------------------}
PROCEDURE HangTough(Actor: Integer; VAR CrisisLevel: Integer);
VAR	x,y:	Integer;
BEGIN
	CrisisLevel:=CrisisLevel-1;
	IF CrisisLevel=7 THEN SetWTitle(MyWind,'Diplomatic Crisis');
	IF CrisisLevel=5 THEN SetWTitle(MyWind,'Military Crisis');
	x:=Treaty[Actor,Victim];
	y:=Impt(Actor,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead]);
	Integrty[Actor]:=Integrty[Actor]+((Should(x)*y) div 256);
	IF Integrty[Actor]<1 THEN Integrty[Actor]:=1;
	IF Integrty[Actor]>127 THEN Integrty[Actor]:=127;
	ChgDipAff(Cmptr,Human,CrisisLevel-9);
	x:=0;
	CASE CrisisLevel OF
		2: x:=16;
		3: x:=8;
		4: x:=2;
	END;
	IF DipAff^^[1,2]>0 THEN x:=0 ELSE x:=(x*(-DipAff^^[1,2])) div 64;
	y:=Random div 128;
	IF x>(Abs(y)) THEN BEGIN CrisisLevel:=1; ANWFlag:=TRUE; END;
	Nastiness:=Nastiness+9-CrisisLevel; 
	IF Nastiness>127 THEN Nastiness:=127;
 END;
{-----------------------------------------------------------------------}
BEGIN
	Who:=Subject[WhichHead];
	Victim:=Object[WhichHead];
	IF Human=1 THEN Base:=700 ELSE Base:=800;
	IF TwoPFlag THEN
		BEGIN
			IF Human=2 THEN x:=790 ELSE x:=890;
			HeadLine(x,1,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
			SavHuman:=Human
		END;
	AggrFlag:=(Who=Cmptr);
	GetWTitle(MyWind,SaveStrng);
	SetWTitle(MyWind,'BackChannel');
	Crisis:=FALSE; 
	BackDown:=FALSE;
	Rand1:=Random; 
	Rand2:=Random;
	CrisisLevel:=9;
	BackHndl:=GetNewControl(131,MyWind);
	IF AggrFlag THEN
		BEGIN
			HiliteControl(PButHandle,255); 
			HiliteControl(NButHandle,255);
			IF Human=1 THEN x:=1 ELSE x:=-1;
			ChgDMess(Victim,x);
		END;
	REPEAT
		IF AggrFlag AND NOT TwoPFlag THEN
			BEGIN	{Cmptr considerations}
				HiliteControl(BackHndl,255);
				x:=GImpt(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead],0,HLoss,CGain);
				IF Who=Human THEN x:=-x;
				{MoveTo(10,225); MyWrite(HLoss); DrawString(' ');
				MyWrite(CGain); DrawString(' '); MyWrite(x);
				REPEAT UNTIL NOT Button; REPEAT UNTIL Button;}
				IF x<4*CrisisLevel-36+Abs(Random div 1024) THEN
					BEGIN
						HangTough(Cmptr,CrisisLevel);
						IF (CrisisLevel=3) AND (x<-40) THEN z:=952 ELSE z:=Base+4*CrisisLevel;
						y:=((CrisisLevel-1) div 4)-(x div 32);
						IF y>4 THEN y:=4; 
						IF y<0 THEN y:=0;
						Headline(z,y,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
						HiliteControl(BackHndl,0);
					END
				ELSE
					BEGIN
						BackDown:=TRUE;
						HeadLine(Base+50+4*CrisisLevel,0,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
						CrisisVal[WhichHead]:=TRUE; 
						HangLoose(Cmptr,Human,CrisisLevel);
						SetCTitle(RespHndl,'OK');
						HiliteControl(RespHndl,0);
						whichControl:=NIL;
						REPEAT
							x:=ReadMouse(FALSE);
						UNTIL whichControl=RespHndl;
					END;
			END;	{Cmptr half}
		IF (BackDown=FALSE) AND (CrisisLevel>1) THEN
			BEGIN	{human consideration}
				SumLoser:=0; SumWinnr:=0;
				IF CrisisLevel<8 THEN
					BEGIN
						HLoss:=GImpt(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead],0,y,z);
						x:=(Abs(y) div CrisisLevel)+(Abs(z) div CrisisLevel)+8-CrisisLevel;
						y:=0;
						FOR i:=3 TO NoCntry DO
							BEGIN
								Usez:=x div 32;
								y:=y+(x mod 32);
								IF y>32 THEN BEGIN Usez:=Usez+1; y:=y-32; END;
								Usex:=-Usez;
								DAow:=DipAff^^[i,Cmptr]; 
								DAol:=DipAff^^[i,Human];
								IF DAol+Usex>127 THEN Usex:=127-DAol;
								IF DAol+Usex<-127 THEN Usex:=-127-DAol;
								IF DAow+Usez>127 THEN Usez:=127-DAow;
								IF DAow+Usez<-127 THEN Usez:=-127-DAow;
								SumWinnr:=SumWinnr+(ord4(Usez)*PrestVal[i]);
								SumLoser:=SumLoser+(ord4(Usex)*PrestVal[i]);
							END;
						IF SumLoser>8132352 THEN SumLoser:=8132352;
						IF SumLoser<-8132352 THEN SumLoser:=-8132352;
					END; {penalty section}
				HLoss:=-(SumLoser div 1024); 
				CGain:=-(SumWinnr div 1024);
				MoveTo(20,258); 
				DrawString('Prestige at Risk:	'); 
				MyWrite(HLoss);
				CASE Level OF
					1: y:=2048;
					2: y:=1024;
					3: y:=512;
					4: y:=512;
				END;
				x:=GImpt(Who,Verb[WhichHead],Victim,OldNVal[WhichHead],NewNVal[WhichHead],0,HLoss,CGain);
				x:=(ord4(HLoss+(Rand1 div y)) div 16); 
				x:=Abs(x); 
				IF x>7 THEN x:=7;
				GetIndString(TempStrng,641,x+1);
				MoveTo(10,271); DrawString('USA Interest:');
				MoveTo(110,271); DrawString(TempStrng);
				x:=(ord4(CGain+(Rand2 div y)) div 16); 
				x:=Abs(x); 
				IF x>7 THEN x:=7;
				GetIndString(TempStrng,641,x+1);
				MoveTo(10,284); DrawString('USSR Interest:');
				MoveTo(110,284); DrawString(TempStrng);
				FlushEvents(everyEvent,0);
				GetIndString(TempStrng,590,CrisisLevel);
				SetCTitle(RespHndl,TempStrng);
				IF TwoPFlag THEN BEGIN SetPort(MainWind); ExchangP; SetPort(myWind); END;
				HiliteControl(RespHndl,0);
				REPEAT UNTIL ReadMouse(FALSE)>0;
				ClearRect(2,248,250,295);
				IF whichControl=BackHndl THEN
					BEGIN
						BackDown:=TRUE;
						CrisisVal[WhichHead]:=TRUE; 
						HangLoose(Human,Cmptr,CrisisLevel);
						IF TwoPFlag THEN
							BEGIN
								IF Human=2 THEN Base:=700 ELSE Base:=800;
								IF odd(CrisisLevel)
									THEN BEGIN SetPort(MainWind); ExchangP; SetPort(myWind); END;
								HeadLine(Base+50+4*CrisisLevel,0,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
								SetCTitle(RespHndl,'OK');
								HiliteControl(RespHndl,0); 
								HiliteControl(BackHndl,255);
								whichControl:=NIL;
								REPEAT
									x:=ReadMouse(FALSE);
								UNTIL whichControl=RespHndl;
								whichControl:=NIL;
							END;
					END;
				IF whichControl=RespHndl THEN
					BEGIN
						HangTough(Human,CrisisLevel);
						IF TwoPFlag THEN
							BEGIN
								IF Human=2 THEN Base:=700 ELSE Base:=800;
								x:=Abs(Random div 8192);
								Headline(Base+4*CrisisLevel,x,150,Who,Victim,OldNVal[WhichHead],CrisisVal[WhichHead]);
								GetIndString(TempStrng,590,CrisisLevel);
								SetCTitle(RespHndl,TempStrng);
							END;
					END;
			END;
		AggrFlag:=TRUE;
	UNTIL BackDown OR (CrisisLevel=1);
	Junk1:=MaxMem(Junk2);
	IF CrisisLevel=1 THEN
		BEGIN
			Crisis:=TRUE;
			EndGame;
		END
	ELSE
		BEGIN
			GetIndString(TempStrng,590,10);
			SetCTitle(RespHndl,TempStrng);
			HiliteControl(RespHndl,255);
			ClearRect(2,150,250,227);
			DisposeControl(BackHndl);
			SetWTitle(MyWind,SaveStrng);
		END;
END;
{***********************************************************************}
END.