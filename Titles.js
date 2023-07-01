Unit Titles;INTERFACEUSES{$L-}{$U-}		{$LOAD MQOTP.dumpfile}			 Memtypes, QuickDraw, OSIntf, ToolIntf, PackIntf,	 {$LOAD BOPGlobals.dumpfile}		 {$U Globals.p}	Globals;	 {$LOAD}{$U+}{$E+}{$L+}{$ASM+}{$D-}{$R-}{$OV-}{$SETC DebugFlg:=FALSE}{$IFC DebugFlg}	{$D+}	{$R+}	{$OV+}{$ENDC}FUNCTION TitlePage: Boolean;IMPLEMENTATION{***********************************************************************}{$S TitleSeg}{***********************************************************************}PROCEDURE Dissolve(StepNum: Integer;						FromArr,ToArray,AccArr,IndexArr: PixelArr; MaskArr: DorkArr);	 external;{***********************************************************************}FUNCTION TitlePage;CONST	headerSize = 512;	BufSize = 6500;VARi,j,k,l,x,y:			Integer;PicturNum,refNum:	Integer;RightX,StepCntr:	Integer;dx,dy,Ldx,Ldy,z:	Integer;Startx,Starty:		Integer;BaseY,CharCntr:	 	Integer;Old1,Old2,Old3:		Integer;Offset:						Integer;StrtFlag:		Boolean;Rect1:			Rect;Rect3:			Rect;showRect:		Rect;lineRect:		Rect;AccBMap:		BitMap;OldBmap:		BitMap;NewBMap:		BitMap;dstBits:		BitMap;AccBits:		PixelArr;OldBits:		PixelArr;NewBits:		PixelArr;IndexArr:		PixelArr;Count:			LongInt;MaskTabl:		DorkArr;theBits:		packed array [1..72] of byte;srcPtr:			Ptr;dstPtr:			Ptr;error:			OSErr;srcBuf:			ARRAY [1..BufSize] OF Integer;MyMaskRgn:	RgnHandle;TempRgn1:		RgnHandle;ContHndl:		ControlHandle;LoadHndl:		ControlHandle;NewSX:			ARRAY[1..5] OF Integer;NewSY:			ARRAY[1..5] OF Integer;TempStrng:	Str255;blot:				char;BEGIN	PenPat(white);	PaintRect(MainWind^.portRect);	TextFont(2);		TextSize(36); 	TextFace([shadow]);	TextMode(SrcOr);	MoveTo(78,80);	DrawString('Balance of Power');	TempStrng:='The 1990 Edition';	TextSize(24); 	TextFace([bold]);	x:=256-(StringWidth(TempStrng) div 2);	MoveTo(x,120); 	DrawString(TempStrng);	TextSize(18); 	TextFace([]);	TempStrng:='by Chris Crawford';	x:=256-(StringWidth(TempStrng) div 2);	MoveTo(x,150); 	DrawString(TempStrng);	TextSize(12);	TempStrng:='Copyright (c) 1988 Chris Crawford.	All Rights Reserved.';	x:=256-(StringWidth(TempStrng) div 2);	MoveTo(x,180); 	DrawString(TempStrng);		{determine whether we started up from a SavedGame}	CountAppFiles(x,y);	IF y>0 THEN		BEGIN			TitlePage:=FALSE;			SpinWheel(60);			InitCursor;			Exit(TitlePage);		END;		AccBMap.baseAddr:=@AccBits;	AccBMap.rowbytes:=12;	SetRect(AccBMap.bounds,0,0,96,96);	OldBMap.baseAddr:=@OldBits;	OldBMap.rowbytes:=12;	SetRect(OldBMap.bounds,0,0,96,96);	NewBMap.baseAddr:=@NewBits;	NewBMap.rowbytes:=14;	SetRect(NewBMap.bounds,0,0,112,96);	dstBits.rowBytes:=72;	dstBits.baseAddr:=@theBits;	SetRect(dstBits.bounds,0,0,576,1);	dstPtr:=pointer(dstBits.baseAddr);	MyMaskRgn:=NewRgn;	TempRgn1:=NewRgn;	SetRectRgn(MyMaskRgn,0,0,512,342);	SetRectRgn(TempRgn1,400,320,510,340);		{Loadgame control}	DiffRgn(MyMaskRgn,TempRgn1,MyMaskRgn);	SetRectRgn(TempRgn1,0,320,112,340);	 {Newgame control}	DiffRgn(MyMaskRgn,TempRgn1,MyMaskRgn);	SetRectRgn(TempRgn1,200,244,312,340);		{Mindscape logo}	DiffRgn(MyMaskRgn,TempRgn1,MyMaskRgn);	RefNum:=YourOpen('Logo');	Count:=headerSize;	error:=FSRead(refNum,Count,@srcBuf);	Count:=2*BufSize;	error:=FSRead(refNum,Count,@srcBuf);	error:=FSClose(refNum);	srcPtr:=@srcBuf;	SetRect(showRect,0,0,112,1);	FOR j:=1 TO 96 DO		BEGIN			 SetRect(lineRect,0,0,112,1);			 UnpackBits(srcPtr,dstPtr,72);			 CopyBits(dstBits,NewBMap,lineRect,showRect,srcCopy,NIL);			 dstPtr:=pointer(dstBits.baseAddr);			 OffsetRect(showRect,0,1);		END;	SpinWheel(1);	SetRect(Rect3,0,0,112,96);	SetRect(Rect1,200,244,312,340);	CopyBits(NewBMap,MainWind^.portbits,Rect3,Rect1,srcCopy,NIL);	NewBMap.baseAddr:=@NewBits;	NewBMap.rowbytes:=12;	SetRect(NewBMap.bounds,0,0,96,96);	SetRect(Rect3,0,0,96,96);	FOR j:=1 TO 2 DO		BEGIN			CASE j OF				1: BEGIN RightX:=70; BaseY:=70; CharCntr:=14; END;				2: CharCntr:=5;			END;			FOR i:=1 TO CharCntr DO				BEGIN					IF j=2 THEN BEGIN RightX:=NewSX[i]; BaseY:=NewSY[i]; END;					x:=RightX; y:=BaseY;					REPEAT x:=x+1; UNTIL GetPixel(x,y);					x:=x-1;					IF j=1 THEN						CASE i OF							1:	BEGIN NewSX[4]:=x+8; NewSY[4]:=57;												NewSX[5]:=x+8; NewSY[5]:=70; END; {changed from 66}							8:	BEGIN NewSX[1]:=x+8; NewSY[1]:=66; END;							10: BEGIN NewSX[2]:=x+8; NewSY[2]:=57; END;							11: BEGIN NewSX[3]:=x+8; NewSY[3]:=66; END;						END;					Startx:=x; Starty:=y; RightX:=x;					dx:=0; dy:=1; StepCntr:=0;					OpenRgn;					MoveTo(x,y);					REPEAT						IF dx=0 THEN Ldy:=0 ELSE Ldy:=-dx;						Ldx:=dy;						IF GetPixel(x+Ldx,y+Ldy)							THEN								BEGIN									IF GetPixel(x+dx,y+dy)										THEN											BEGIN												IF dy=0 THEN z:=0 ELSE z:=-dy;												dy:=dx; dx:=z;											END										ELSE											BEGIN												x:=x+dx; y:=y+dy;												LineTo(x,y);												IF x>RightX THEN RightX:=x;												StepCntr:=StepCntr+1;											END;								END							ELSE								BEGIN									IF dx=0 THEN z:=0 ELSE z:=-dx;									dx:=dy; dy:=z;									x:=x+dx; y:=y+dy;									LineTo(x,y);									IF x>RightX THEN RightX:=x;									StepCntr:=StepCntr+1;								END;					UNTIL (x=StartX) AND (y=StartY) AND (StepCntr>10);					CloseRgn(TempRgn1);					IF j=1 THEN DiffRgn(MyMaskRgn,TempRgn1,MyMaskRgn)								 ELSE UnionRgn(MyMaskRgn,TempRgn1,MyMaskRgn);				END;	{of character count loop}			END;		{of linecounter loop}	ContHndl:=GetNewControl(310,MainWind);	LoadHndl:=GetNewControl(311,MainWind);	RefNum:=YourOpen('ArmsPic1');	Count:=headerSize;	error:=FSRead(refNum,Count,@EndDummy);	Count:=LongInt(@MidDummy)-LongInt(@EndDummy);	error:=FSRead(refNum,Count,@EndDummy);	error:=FSClose(refNum);	RefNum:=YourOpen('ArmsPic2');	Count:=headerSize;	error:=FSRead(refNum,Count,@srcBuf);	Count:=2*BufSize;	error:=FSRead(refNum,Count,@srcBuf);	error:=FSClose(refNum);	FOR i:=1 TO 576 DO IndexArr[i]:=BAND(Random,30);	FOR i:=0 TO 271 DO		BEGIN			CASE (i div 16)+1 OF			 1: MaskTabl[i]:=BitAnd(Random,BitAnd(Random,BitAnd(Random,Random)));			 2: MaskTabl[i]:=BitAnd(Random,BitAnd(Random,Random));			 3: MaskTabl[i]:=BitOr(BitAnd(Random,BitAnd(Random,BitAnd(Random,Random))),												BitAnd(Random,BitAnd(Random,Random)));			 4: MaskTabl[i]:=BitAnd(Random,Random);			 5: MaskTabl[i]:=BitOr(BitAnd(Random,Random),												BitAnd(Random,BitAnd(Random,BitAnd(Random,Random))));			 6: MaskTabl[i]:=BitAnd(Random,BitOr(Random,Random));			 7: MaskTabl[i]:=BitAnd(Random,BitOr(Random,BitOr(Random,Random)));			 8: MaskTabl[i]:=Random;			 9: MaskTabl[i]:=BitOr(Random,BitAnd(Random,BitAnd(Random,Random)));			 10: MaskTabl[i]:=BitOr(Random,BitAnd(Random,Random));			 11: MaskTabl[i]:=BitAnd(BitOr(Random,Random),BitOr(Random,BitOr(Random,Random)));			 12: MaskTabl[i]:=BitOr(Random,Random);			 13: MaskTabl[i]:=BitAnd(BitOr(Random,BitOr(Random,Random)),											BitOr(Random,BitOr(Random,BitOr(Random,Random))));			 14: MaskTabl[i]:=BitOr(Random,BitOr(Random,Random));			 15: MaskTabl[i]:=BitOr(Random,BitOr(Random,BitOr(Random,Random)));			 16: MaskTabl[i]:=-1;			 17: MaskTabl[i]:=-1;			END;		END;	FOR i:=1 TO 576 DO NewBits[i]:=0;	InitCursor;	StrtFlag:=FALSE;	Old1:=0; 	Old2:=0; 	Old3:=0; 	PicturNum:=0;	REPEAT		Old3:=Old2; 		Old2:=Old1; 		Old1:=PicturNum;		REPEAT PicturNum:=Abs(Random div 1366);		UNTIL (PicturNum<>Old1) AND (PicturNum<>Old2) AND (PicturNum<>Old3);		x:=Random div 79; 		y:=Random div 134;		x:=Abs(x); 		y:=Abs(y);		SetRect(Rect1,x,y,x+96,y+96);		RectRgn(TempRgn1,Rect1);		CopyBits(MainWind^.portbits,OldBMap,Rect1,Rect3,srcCopy,NIL);		IF PicturNum<12			 THEN BEGIN Offset:=0; srcPtr:=@EndDummy; END			 ELSE BEGIN Offset:=12; srcPtr:=@srcBuf; END;		FOR i:=0 TO ((PicturNum-Offset) div 6) DO			BEGIN				SetRect(showRect,0,0,96,1);				FOR j:=1 TO 96 DO					BEGIN						 SetRect(lineRect,0,0,96,1);						 x:=((PicturNum-Offset) mod 6)*96;						 OffsetRect(lineRect,x,0);						 UnpackBits(srcPtr,dstPtr,72);						 CopyBits(dstBits,NewBMap,lineRect,showRect,srcCopy,NIL);						 dstPtr:=pointer(dstBits.baseAddr);						 OffsetRect(showRect,0,1);					END;			END;		i:=0;		WHILE (i<15) AND (NOT StrtFlag) DO			BEGIN				Dissolve(32*i,NewBits,OldBits,AccBits,IndexArr,MaskTabl);				SpinWheel(1);				CopyBits(AccBMap,MainWind^.portbits,Rect3,Rect1,srcCopy,MyMaskRgn);				Dissolve(32*i+16,NewBits,OldBits,AccBits,IndexArr,MaskTabl);				SpinWheel(1);				CopyBits(AccBMap,MainWind^.portbits,Rect3,Rect1,srcCopy,MyMaskRgn);				IF ReadMouse(FALSE)>0 THEN					StrtFlag:=(WhichControl=ContHndl) OR (WhichControl=LoadHndl);				i:=i+1;			END;	{of i-loop}		SpinWheel(1);		CopyBits(NewBMap,MainWind^.portbits,Rect3,Rect1,srcCopy,MyMaskRgn);	UNTIL StrtFlag;	TitlePage:=(WhichControl=ContHndl);	DisposeRgn(MyMaskRgn);	DisposeRgn(TempRgn1);	KillControls(MainWind);END;{**********************************************************************}END.