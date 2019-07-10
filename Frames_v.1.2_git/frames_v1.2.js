inlets =1;

autowatch=1;

// global variables
var p;
var myPfftFill;
var myPfftPlay;
var myRec;
var myInput;
var myNumberFrames;
var myMult;
var myGain;

function delPfft(){
	if(myPfftFill&&myPfftPlay){
		p.remove(myPfftFill);
		p.remove(myPfftPlay);
	}
}

// initialization
function setup(){
	p = this.patcher;
	myRec = p.getnamed("Rec");
	myInput = p.getnamed("Input");
	myNumberFrames = p.getnamed("FramesNumber");
	myMult = p.getnamed("Play");
	myGain = p.getnamed("Gain");
}

// create two pfft~ oblect, based on the FFT size parameter
function build(fftSize){
	delPfft();
	myPfftFill = p.newdefault(198,577,"pfft~", "fillMatrix_v1.2", fftSize, 4);
	myPfftPlay = p.newdefault(1359,750,"pfft~", "playMatrix_v1.2", fftSize, 4);
	link();			
}

// connect the objects
function link(){
	p.connect(myRec, 0, myPfftFill, 0);
	p.connect(myInput, 0, myPfftFill, 0);
	p.connect(myNumberFrames, 0, myPfftFill, 1);
	p.connect(myMult, 0, myPfftPlay, 0);
	p.connect(myPfftPlay, 0, myGain, 0);
}
