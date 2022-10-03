/***************** 
 * Ralt_Pld Test *
 *****************/


// store info about the experiment session:
let expName = 'RALT_PLD';  // from the Builder filename that created this script
let expInfo = {
    'participant': '',
    'session': '1',
};

// Start code blocks for 'Before Experiment'

function weighted_random(items, weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    var random = Math.random() * weights[weights.length - 1];

    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;   

    return items[i];
}


function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

class Cue {

    constructor(prob, path){
        this.prob = prob
        this.path = path;
        this.times = NaN;
    }

    get_response(){
            if (this.prob == "high"){
                if (weighted_random([true, false], [0.75, 0.25])) {
                    this.response = "happy";
                    this.times = [6, 0];
                } else {
                    this.response = "angry";
                    this.times = [0, 6]
                }
            } else if (this.prob == "low"){
                if (weighted_random([true, false], [0.25, 0.75])) {
                    this.response = "happy";
                    this.times = [6, 0];
                } else {
                    this.response = "angry";
                    this.times = [0, 6];
                }

            }
    return this.times;    
    }
}


function getCues(paths){
    var prob_init = ["high", "low"];
    
    shuffle(prob_init);
    shuffle(paths)

    let left = new Cue(prob_init[0], paths[0]);
    let right = new Cue(prob_init[1], paths[1]);

    return [left, right];
}


function switchSides(left, right){
    if (Math.random() > 0.75){
       var [left, right] = [right, left];
       console.log("SWITCH!");
    } else {
       console.log("NO SWITCH!")
    }
    return [left, right];
}


function get_kanjis(session){
    var path_k = "kanji/" + String(session);
    const kanjis = ["a.png", "b.png", "c.png", "d.png"]
    var paths = []
    
    kanjis.forEach((x,i) => {
        paths[i] = path_k + "/" + x 
    });
    
    shuffle(paths)
    return paths
}
var deco;
var deco_pos_left;
var deco_pos_right;
var cue_left_path;
var cue_right_path;
var CueLeft;
var CueRight;

var kanjis_t = get_kanjis("training");

var social_cues_t = kanjis_t.slice(0, 2);
var nonsocial_cues_t = kanjis_t.slice(2);
console.log("social_cues_t: ", social_cues_t)
console.log("nonsocial_cues_t: ", nonsocial_cues_t)
console.log("getCues(social_cues_t): ", getCues(social_cues_t))

var [CueLeft_s_t, CueRight_s_t] = getCues(social_cues_t);
console.log("CueLeft_s_t: ", CueLeft_s_t)
console.log("CueRight_s_t: ", CueRight_s_t)
var [CueLeft_ns_t, CueRight_ns_t] = getCues(nonsocial_cues_t);
console.log("CueLeft_ns_t: ", CueLeft_ns_t)
console.log("CueRight_ns_t: ", CueRight_ns_t)

var symb;
var train_times = [[6, 0], [6, 0], [0, 6], [0, 6]];
shuffle(train_times);
var resp = NaN;

var times;

var BlockCounter = 0;
var CycleCounter = 0;
var TrialCounter = 0;

//function randomUniqueNum(min, max, even, outputCount) {
//
//    let arr = []
//    if (even == true){
//      for (let i = min; i <= max; i+=2) {
//        arr.push(i)
//      }
//    } else {
//      for (let i = min + 1; i <= max; i+=2) {
//        arr.push(i)
//      }
//    }

//    let result = [];
//    for (let i = 1; i <= outputCount; i++) {
//      const randomIndex = Math.floor(Math.random() * arr.length);
//      result.push(arr[randomIndex]);
//      arr.splice(randomIndex, 1);
//    }
  
//    return result;
//}

//generate random numbers
//var fNeven = randomUniqueNum(10,99, true, 4)
//var fNodd = randomUniqueNum(10,99, false, 4)

//var numbarray = [fNeven, fNodd, fNeven, fNodd]

//Set up list with correct category (4 per cycle * 4 blocks, randomized)
//var CorrCat = [];

//for (let i = 1; i <= 2; i++) {
//    var ABlist = ["A", "A", "B", "B"];
//    shuffle(ABlist);
//    CorrCat.push(ABlist);
//}

//var fN = numbarray.slice(0,2).flat()

//Set up dict with correct category for lookup
//var CorrDict = {};
//fN.forEach((key, i) => CorrDict[key] = CorrCat.flat()[i]);
//console.log(CorrDict)
// Run 'Before Experiment' code from code_4
console.log("expInfo['session']: ", expInfo['session'])

var kanjis;
var social_cues;
var nonsocial_cues;
var CueLeft_s;
var CueRight_s;
var CueLeft_ns;
var CueRight_ns;
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: false,
  color: new util.Color([(- 1), (- 1), (- 1)]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(WelcomeRoutineBegin());
flowScheduler.add(WelcomeRoutineEachFrame());
flowScheduler.add(WelcomeRoutineEnd());
flowScheduler.add(instr_train_sRoutineBegin());
flowScheduler.add(instr_train_sRoutineEachFrame());
flowScheduler.add(instr_train_sRoutineEnd());
const training_socialLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(training_socialLoopBegin(training_socialLoopScheduler));
flowScheduler.add(training_socialLoopScheduler);
flowScheduler.add(training_socialLoopEnd);
flowScheduler.add(Alles_klarRoutineBegin());
flowScheduler.add(Alles_klarRoutineEachFrame());
flowScheduler.add(Alles_klarRoutineEnd());
flowScheduler.add(instr_train_nsRoutineBegin());
flowScheduler.add(instr_train_nsRoutineEachFrame());
flowScheduler.add(instr_train_nsRoutineEnd());
const training_nonsocialLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(training_nonsocialLoopBegin(training_nonsocialLoopScheduler));
flowScheduler.add(training_nonsocialLoopScheduler);
flowScheduler.add(training_nonsocialLoopEnd);
flowScheduler.add(Alles_Klar_2RoutineBegin());
flowScheduler.add(Alles_Klar_2RoutineEachFrame());
flowScheduler.add(Alles_Klar_2RoutineEnd());
const blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocksLoopBegin(blocksLoopScheduler));
flowScheduler.add(blocksLoopScheduler);
flowScheduler.add(blocksLoopEnd);
flowScheduler.add(check_instrRoutineBegin());
flowScheduler.add(check_instrRoutineEachFrame());
flowScheduler.add(check_instrRoutineEnd());
flowScheduler.add(check_socialRoutineBegin());
flowScheduler.add(check_socialRoutineEachFrame());
flowScheduler.add(check_socialRoutineEnd());
flowScheduler.add(check_nonsocialRoutineBegin());
flowScheduler.add(check_nonsocialRoutineEachFrame());
flowScheduler.add(check_nonsocialRoutineEnd());
flowScheduler.add(ThanksRoutineBegin());
flowScheduler.add(ThanksRoutineEachFrame());
flowScheduler.add(ThanksRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'kanji/training/a.png', 'path': 'kanji/training/a.png'},
    {'name': 'Mandalas_new/angry/Mandala2_angry.mp4', 'path': 'Mandalas_new/angry/Mandala2_angry.mp4'},
    {'name': 'Mandalas_new/angry/Mandala3_angry.mp4', 'path': 'Mandalas_new/angry/Mandala3_angry.mp4'},
    {'name': 'Mandalas_new/angry/Mandala4_angry.mp4', 'path': 'Mandalas_new/angry/Mandala4_angry.mp4'},
    {'name': 'kanji/4/b.png', 'path': 'kanji/4/b.png'},
    {'name': 'kanji/4/d.png', 'path': 'kanji/4/d.png'},
    {'name': 'kanji/2/d.png', 'path': 'kanji/2/d.png'},
    {'name': 'Mandalas_new/happy/Mandala2_happy.mp4', 'path': 'Mandalas_new/happy/Mandala2_happy.mp4'},
    {'name': 'kanji/training/c.png', 'path': 'kanji/training/c.png'},
    {'name': 'kanji/2/c.png', 'path': 'kanji/2/c.png'},
    {'name': 'ADFES/Freigestellt/Neutral/F04-Neutral-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Neutral/F04-Neutral-Face Forward_freigestellt.mp4'},
    {'name': 'Mandalas_new/neutral/Mandala3_neutral.mp4', 'path': 'Mandalas_new/neutral/Mandala3_neutral.mp4'},
    {'name': 'Mandalas_new/angry/Mandala1_angry.mp4', 'path': 'Mandalas_new/angry/Mandala1_angry.mp4'},
    {'name': 'kanji/training/b.png', 'path': 'kanji/training/b.png'},
    {'name': 'kanji/4/c.png', 'path': 'kanji/4/c.png'},
    {'name': 'kanji/3/b.png', 'path': 'kanji/3/b.png'},
    {'name': 'kanji/2/a.png', 'path': 'kanji/2/a.png'},
    {'name': 'Mandalas_new/happy/Mandala3_happy.mp4', 'path': 'Mandalas_new/happy/Mandala3_happy.mp4'},
    {'name': 'kanji/1/d.png', 'path': 'kanji/1/d.png'},
    {'name': 'deco/bubble.png', 'path': 'deco/bubble.png'},
    {'name': 'ADFES/Freigestellt/Joy/Used/F04-Joy-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Joy/Used/F04-Joy-Face Forward_freigestellt.mp4'},
    {'name': 'Mandalas_new/neutral/Mandala1_neutral.mp4', 'path': 'Mandalas_new/neutral/Mandala1_neutral.mp4'},
    {'name': 'Mandalas_new/neutral/Mandala2_neutral.mp4', 'path': 'Mandalas_new/neutral/Mandala2_neutral.mp4'},
    {'name': 'Mandalas_new/happy/Mandala4_happy.mp4', 'path': 'Mandalas_new/happy/Mandala4_happy.mp4'},
    {'name': 'ADFES/Freigestellt/Neutral/M06-Neutral-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Neutral/M06-Neutral-Face Forward_freigestellt.mp4'},
    {'name': 'trainingtrials_nonsocial.xlsx', 'path': 'trainingtrials_nonsocial.xlsx'},
    {'name': 'ADFES/Freigestellt/Neutral/M02-Neutral-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Neutral/M02-Neutral-Face Forward_freigestellt.mp4'},
    {'name': 'ADFES/Freigestellt/Joy/Used/F01-Joy-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Joy/Used/F01-Joy-Face Forward_freigestellt.mp4'},
    {'name': 'ADFES/Freigestellt/Anger/M06-Anger-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Anger/M06-Anger-Face Forward_freigestellt.mp4'},
    {'name': 'Mandalas_new/neutral/Mandala4_neutral.mp4', 'path': 'Mandalas_new/neutral/Mandala4_neutral.mp4'},
    {'name': 'ADFES/Freigestellt/Joy/Used/M02-Joy-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Joy/Used/M02-Joy-Face Forward_freigestellt.mp4'},
    {'name': 'kanji/3/a.png', 'path': 'kanji/3/a.png'},
    {'name': 'ADFES/Freigestellt/Neutral/F01-Neutral-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Neutral/F01-Neutral-Face Forward_freigestellt.mp4'},
    {'name': 'deco/button.png', 'path': 'deco/button.png'},
    {'name': 'kanji/1/c.png', 'path': 'kanji/1/c.png'},
    {'name': 'ADFES/Freigestellt/Anger/F04-Anger-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Anger/F04-Anger-Face Forward_freigestellt.mp4'},
    {'name': 'trainingtrials_social.xlsx', 'path': 'trainingtrials_social.xlsx'},
    {'name': 'kanji/training/d.png', 'path': 'kanji/training/d.png'},
    {'name': 'kanji/4/a.png', 'path': 'kanji/4/a.png'},
    {'name': 'ADFES/Freigestellt/Joy/Used/M06-Joy-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Joy/Used/M06-Joy-Face Forward_freigestellt.mp4'},
    {'name': 'ADFES/Freigestellt/Anger/F01-Anger-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Anger/F01-Anger-Face Forward_freigestellt.mp4'},
    {'name': 'ADFES/Freigestellt/Anger/M02-Anger-Face Forward_freigestellt.mp4', 'path': 'ADFES/Freigestellt/Anger/M02-Anger-Face Forward_freigestellt.mp4'},
    {'name': 'kanji/1/a.png', 'path': 'kanji/1/a.png'},
    {'name': 'kanji/1/b.png', 'path': 'kanji/1/b.png'},
    {'name': 'Mandalas_new/happy/Mandala1_happy.mp4', 'path': 'Mandalas_new/happy/Mandala1_happy.mp4'},
    {'name': 'kanji/2/b.png', 'path': 'kanji/2/b.png'},
    {'name': 'kanji/3/d.png', 'path': 'kanji/3/d.png'},
    {'name': 'kanji/3/c.png', 'path': 'kanji/3/c.png'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.DEBUG);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2022.2.4';
  expInfo['OS'] = window.navigator.platform;

  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var WelcomeClock;
var thisExp;
var win;
var event;
var Welcome_head;
var Welcome_text;
var key_resp_2;
var instr_train_sClock;
var text_3;
var key_resp_3;
var training_trialClock;
var text_2;
var fix_cross_3;
var cue_left_2;
var cue_right_2;
var slide_response_2;
var feedback_trainClock;
var feedback_miss;
var box_l;
var box_r;
var cue_left_fb;
var cue_right_fb;
var Alles_klarClock;
var text_4;
var key_resp_4;
var instr_train_nsClock;
var text;
var key_resp_5;
var Alles_Klar_2Clock;
var Allesklartext_2;
var Allesklar_resp_2;
var BlockCodeClock;
var Blocklist;
var LateralizationByCycleClock;
var CycleText;
var CycleText1;
var CycleText2;
var CycleText3;
var CycleText4;
var key_resp_6;
var trialClock;
var kanjis;
var social_cues;
var nonsocial_cues;
var trial_header;
var fix_cross;
var cue_left;
var cue_right;
var slide_response;
var feedback_trialsClock;
var feedback_miss_2;
var box_l_2;
var box_r_2;
var cue_left_fb_2;
var cue_right_fb_2;
var Intertrial_IntervalClock;
var LatCounterClock;
var BlockCounterClock;
var check_instrClock;
var check_instr_text;
var check_instr_resp;
var check_socialClock;
var text_check_s;
var cue_left_s;
var cue_right_s;
var slider_check_s;
var check_nonsocialClock;
var text_check_ns;
var cue_left_ns;
var cue_right_ns;
var slider_check_ns;
var ThanksClock;
var Thank;
var end;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Welcome"
  WelcomeClock = new util.Clock();
  thisExp=psychoJS.experiment;
  win=psychoJS.window;
  event=psychoJS.eventManager;
  win.color = "black"
  // Run 'Begin Experiment' code from code_5
  var font_choice = 'Helvetica';
  var color_choice = 'white';
  
  window.Welcome_head = Welcome_head
  window.Welcome_text = Welcome_text
  Welcome_head = new visual.TextStim({
    win: psychoJS.window,
    name: 'Welcome_head',
    text: 'Vielen Dank für die Teilnahme an diesem Experiment!',
    font: font_choice,
    units: undefined, 
    pos: [0, 0.3], height: 0.025,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -2.0 
  });
  
  Welcome_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'Welcome_text',
    text: '\nSie werden im Folgenden aufgefordert, zwischen zwei\nSymbolen, die Sie auf der linken und rechten Seite des\nBildschirms sehen werden, zu wählen.\n\nSie können dies tun, indem Sie den Schieberegler am\nunteren Rand mit der Maus nach links oder rechts\nverschieben.\n\nOb Sie richtig gewählt haben, wird durch ein Bild in der\nMitte des Bildschirms angezeigt.\n\nWir beginnen mit einigen Probeläufen, damit Sie den\nAblauf des Experiments kennenlernen können.\n\nDrücken Sie eine beliebige Taste, um fortzufahren!\n\n',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -3.0 
  });
  
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "instr_train_s"
  instr_train_sClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: 'Sie werden gleich links und rechts auf dem \nBildschirm zwei Symbole sehen, die Wörter \ndarstellen. \n\nEines davon wird wahrscheinlich als \nLob interpretiert werden, das andere als \nBeleidigung.\n\nStellen Sie sich vor, Sie wählen das Symbol aus \nund sagen dieses Wort zu der Person in der Mitte \ndes Bildschirms. Anhand der Reaktion der Person können Sie \nerkennen, wie das Wort von dieser interpretiert wurde.\n\nSie können das Symbol auswählen, indem Sie den\nSchieberegler am unteren Rand mit der Maus nach links oder\nrechts verschieben. Sie können angeben, wie sicher Sie\nsich sind, indem Sie den Schieberegler weiter nach links\noder rechts verschieben.\n\nVersuchen wir eine erste Runde!\n\n',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: 40, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "training_trial"
  training_trialClock = new util.Clock();
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: '',
    font: font_choice,
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  fix_cross_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'fix_cross_3',
    text: '+',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -2.0 
  });
  
  cue_left_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_left_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [(- 0.6), 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -4.0 
  });
  cue_right_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_right_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0.6, 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -5.0 
  });
  slide_response_2 = new visual.Slider({
    win: psychoJS.window, name: 'slide_response_2',
    startValue: undefined,
    size: [1.25, 0.05], pos: [0, (- 0.35)], ori: 0.0, units: 'height',
    labels: ["Sicher links", "Vielleicht links", "Wei\u00df nicht", "Vielleicht rechts", "Sicher rechts"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('White'), markerColor: new util.Color('White'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: font_choice, bold: true, italic: false, depth: -6, 
    flip: false,
  });
  
  // Initialize components for Routine "feedback_train"
  feedback_trainClock = new util.Clock();
  feedback_miss = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_miss',
    text: 'BITTE RECHTZEITIG ANTWORTEN!',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -1.0 
  });
  
  box_l = new visual.Rect ({
    win: psychoJS.window, name: 'box_l', 
    width: [0.35, 0.35][0], height: [0.35, 0.35][1],
    ori: 0.0, pos: [(- 0.6), 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color(undefined),
    opacity: 1.0, depth: -4, interpolate: true,
  });
  
  box_r = new visual.Rect ({
    win: psychoJS.window, name: 'box_r', 
    width: [0.35, 0.35][0], height: [0.35, 0.35][1],
    ori: 0.0, pos: [0.6, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color(undefined),
    opacity: 1.0, depth: -5, interpolate: true,
  });
  
  cue_left_fb = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_left_fb', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [(- 0.6), 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -6.0 
  });
  cue_right_fb = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_right_fb', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0.6, 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -7.0 
  });
  // Initialize components for Routine "Alles_klar"
  Alles_klarClock = new util.Clock();
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: 'Wie Sie gesehen haben, verändert sich das Bild in\nder Mitte in Abhängigkeit von Ihrer Antwort.\n\nEin fröhliches Gesicht bedeutet, dass das von \nIhnen gewählte Wort als Lob interpretiert wurde. \nEin wütendes Gesicht bedeutet, dass das Wort als \nBeleidigung interpretiert wurde. \n\nAllerdings sind diese Wörter etwas zweideutig, so \ndass manchmal ein eher freundliches Wort als \nBeleidigung interpretiert wird und umgekehrt.\n\nDie verschiedenen Personen reagieren aber alle ähnlich.\nEs gibt also keine Unterschiede in der Wahrscheinlichkeit,\nwie die Wörter interpretiert werden.\n\nDrücken Sie eine beliebige Taste, um fortzufahren!\n\n',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "instr_train_ns"
  instr_train_nsClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'In der nächsten Runde sehen Sie links und rechts andere\nSymbole und andere Bilder in der Mitte. \n\nStellen Sie sich diesmal vor, dass Sie eine Art\nKaleidoskop vor sich haben.\n\nDurch Auswählen der Symbole wird das Bild in der Mitte\nentweder bunt und bewegt (= das Kaleidoskop wird\ngestartet) oder grau.\n\nSie können das Symbol wieder auswählen, indem Sie \nden Schieberegler am unteren Rand mit der Maus\nverschieben. Auch hier können Sie auswählen, wie sicher\nSie sich sind, indem Sie den Schieberegler weiter nach\nlinks oder rechts verschieben.\n\nProbieren wir es aus!\n\n',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp_5 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Alles_Klar_2"
  Alles_Klar_2Clock = new util.Clock();
  Allesklartext_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Allesklartext_2',
    text: 'Wie Sie gesehen haben, ändert sich das Bild in der \nMitte wieder in Abhängigkeit von Ihrer Antwort.\n\nAuch hier sind die Symbole etwas zweideutig, so \ndass ein Symbol in einer Runde zu einem Start\n(ein buntes, bewegtes Bild) und in der nächsten \nRunde zu einem grauen, verschwommenen Bild führen \nkann.\n\nDie verschiedenen Bilder sagen aber nichts über die\nWahrscheinlichkeit aus, mit der ein Symbol zu einem Start\nführt.\n\nDrücken Sie eine beliebige Taste, um fortzufahren!',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: 0.0 
  });
  
  Allesklar_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "BlockCode"
  BlockCodeClock = new util.Clock();
  // Run 'Begin Experiment' code from BlockCode1
  //Set up order of Blocks (beginning randomized, then alternating)
  console.log("Blocklist: ", Blocklist)
  Blocklist = ["social", "nonsocial"];
  console.log("Blocklist: ", Blocklist)
  Blocklist = shuffle(Blocklist)
  console.log("Blocklist: ", Blocklist)
  Blocklist = Blocklist.concat(Blocklist)
  console.log("Blocklist:", Blocklist)
  console.log("BlockCounter: ", BlockCounter)
  console.log("Blocklist[BlockCounter]:", Blocklist[BlockCounter])
  console.log("Blocklist[BlockCounter] == 'social':", Blocklist[BlockCounter] == "social")
  //Set up 16 2-digit stimuli, no replacement
  //Define function unique random numbers
  
  // Initialize components for Routine "LateralizationByCycle"
  LateralizationByCycleClock = new util.Clock();
  // Run 'Begin Experiment' code from code_8
  CycleText = "";
  
  CycleText1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'CycleText1',
    text: 'Wir beginnen jetzt mit dem ersten Block.\n\nAlles wird genauso ablaufen wie bei den \nTrainingsversuchen. Beachten Sie, dass die \nSymbole die Seiten wechseln können!\n\nGeben Sie Ihre Antwort, indem Sie auf den \nSchieberegler unten klicken.\n\nDrücken Sie eine beliebige Taste, um den ersten \nBlock zu starten!\n\n',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -1.0 
  });
  
  CycleText2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'CycleText2',
    text: 'PAUSE\n\nSie haben einen weiteren Block abgeschlossen! Im nächsten Block werden sich die Symbole und Bilder wieder ändern!\n\nDrücken Sie eine beliebige Taste,\num den nächsten Block zu starten.',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -2.0 
  });
  
  CycleText3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'CycleText3',
    text: '',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -3.0 
  });
  
  CycleText4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'CycleText4',
    text: 'Sie haben nun einen Block abgeschlossen.\n\nIm nächsten Block werden Sie andere \nBilder sehen.\n\nWie bei den Trainingsversuchen haben Sie es \nentweder mit Menschen oder einem Kaleidoskop zu tun.\n\nWenn Sie bereit sind, drücken Sie eine \nbeliebige Taste, um den nächsten Block zu \nstarten.\n\n',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -4.0 
  });
  
  key_resp_6 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  // Run 'Begin Experiment' code from code_4
  console.log("expInfo['session']: ", expInfo['session'])
  
  kanjis = get_kanjis(expInfo['session']);
  
  social_cues = kanjis.slice(0, 2);
  nonsocial_cues = kanjis.slice(2);
  
  [CueLeft_s, CueRight_s] = getCues(social_cues);
  [CueLeft_ns, CueRight_ns] = getCues(nonsocial_cues);
  
  console.log("CueLeft_s: ", CueLeft_s);
  console.log("CueRight_s: ", CueRight_s);
  trial_header = new visual.TextStim({
    win: psychoJS.window,
    name: 'trial_header',
    text: '',
    font: font_choice,
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  fix_cross = new visual.TextStim({
    win: psychoJS.window,
    name: 'fix_cross',
    text: '+',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -2.0 
  });
  
  cue_left = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_left', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [(- 0.6), 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -4.0 
  });
  cue_right = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_right', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0.6, 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -5.0 
  });
  slide_response = new visual.Slider({
    win: psychoJS.window, name: 'slide_response',
    startValue: undefined,
    size: [1.25, 0.05], pos: [0, (- 0.35)], ori: 0.0, units: 'height',
    labels: ["Sicher links", "Vielleicht links", "Wei\u00df nicht", "Vielleicht rechts", "Sicher rechts"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('White'), markerColor: new util.Color('White'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: font_choice, bold: true, italic: false, depth: -8, 
    flip: false,
  });
  
  // Initialize components for Routine "feedback_trials"
  feedback_trialsClock = new util.Clock();
  feedback_miss_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_miss_2',
    text: 'BITTE RECHTZEITIG ANTWORTEN!',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: -1.0 
  });
  
  box_l_2 = new visual.Rect ({
    win: psychoJS.window, name: 'box_l_2', 
    width: [0.35, 0.35][0], height: [0.35, 0.35][1],
    ori: 0.0, pos: [(- 0.6), 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color(undefined),
    opacity: 1.0, depth: -4, interpolate: true,
  });
  
  box_r_2 = new visual.Rect ({
    win: psychoJS.window, name: 'box_r_2', 
    width: [0.35, 0.35][0], height: [0.35, 0.35][1],
    ori: 0.0, pos: [0.6, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color(undefined),
    opacity: 1.0, depth: -5, interpolate: true,
  });
  
  cue_left_fb_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_left_fb_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [(- 0.6), 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -6.0 
  });
  cue_right_fb_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_right_fb_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0.6, 0], size : [0.2, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -7.0 
  });
  // Initialize components for Routine "Intertrial_Interval"
  Intertrial_IntervalClock = new util.Clock();
  // Initialize components for Routine "LatCounter"
  LatCounterClock = new util.Clock();
  // Initialize components for Routine "BlockCounter"
  BlockCounterClock = new util.Clock();
  // Initialize components for Routine "check_instr"
  check_instrClock = new util.Clock();
  check_instr_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'check_instr_text',
    text: 'Sie haben nun den Lernteil des Experiments abgeschlossen. \nBitte beantworten Sie jetzt auch die folgenden kurzen Fragen!\n\nDrücken Sie eine beliebige Taste, um fortzufahren!',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: 0.0 
  });
  
  check_instr_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "check_social"
  check_socialClock = new util.Clock();
  text_check_s = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_check_s',
    text: 'Welches dieser Symbole ist eher ein Lob?',
    font: font_choice,
    units: undefined, 
    pos: [0, 0.2], height: 0.025,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  cue_left_s = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_left_s', units : undefined, 
    image : CueLeft_s.path, mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0], size : [0.2, 0.2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  cue_right_s = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_right_s', units : undefined, 
    image : CueRight_s.path, mask : undefined,
    ori : 0.0, pos : [0.3, 0], size : [0.2, 0.2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  slider_check_s = new visual.Slider({
    win: psychoJS.window, name: 'slider_check_s',
    startValue: undefined,
    size: [0.5, 0.05], pos: [0, (- 0.4)], ori: 0.0, units: 'height',
    labels: undefined, fontSize: 0.05, ticks: [1, 2, 3, 4, 5],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('LightGray'), markerColor: new util.Color('White'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: -4, 
    flip: false,
  });
  
  // Initialize components for Routine "check_nonsocial"
  check_nonsocialClock = new util.Clock();
  text_check_ns = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_check_ns',
    text: 'Welches dieser Symbole startet eher das Kaleidoskop?',
    font: font_choice,
    units: undefined, 
    pos: [0, 0.2], height: 0.025,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  cue_left_ns = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_left_ns', units : undefined, 
    image : CueLeft_ns.path, mask : undefined,
    ori : 0.0, pos : [(- 0.3), 0], size : [0.2, 0.2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  cue_right_ns = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_right_ns', units : undefined, 
    image : CueRight_ns.path, mask : undefined,
    ori : 0.0, pos : [0.3, 0], size : [0.2, 0.2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  slider_check_ns = new visual.Slider({
    win: psychoJS.window, name: 'slider_check_ns',
    startValue: undefined,
    size: [0.5, 0.05], pos: [0, (- 0.4)], ori: 0.0, units: 'height',
    labels: undefined, fontSize: 0.05, ticks: [1, 2, 3, 4, 5],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('LightGray'), markerColor: new util.Color('White'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: -4, 
    flip: false,
  });
  
  // Initialize components for Routine "Thanks"
  ThanksClock = new util.Clock();
  Thank = new visual.TextStim({
    win: psychoJS.window,
    name: 'Thank',
    text: 'Vielen Dank für Ihre Teilnahme!\n\nDrücken Sie eine beliebige Taste, um das Experiment zu beenden!',
    font: font_choice,
    units: undefined, 
    pos: [0, 0], height: 0.035,  wrapWidth: 70, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color(color_choice),  opacity: 1,
    depth: 0.0 
  });
  
  end = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _key_resp_2_allKeys;
var WelcomeComponents;
function WelcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Welcome' ---
    t = 0;
    WelcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_5
    Welcome_head.bold = true;
    Welcome_head.setAlignHoriz('center')
    Welcome_text.setAlignHoriz('center')
    text_3.setAlignHoriz('center')
    text_4.setAlignHoriz('center')
    text.setAlignHoriz('center')
    
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    // keep track of which components have finished
    WelcomeComponents = [];
    WelcomeComponents.push(Welcome_head);
    WelcomeComponents.push(Welcome_text);
    WelcomeComponents.push(key_resp_2);
    
    WelcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function WelcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Welcome' ---
    // get current time
    t = WelcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Welcome_head* updates
    if (t >= 0.0 && Welcome_head.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Welcome_head.tStart = t;  // (not accounting for frame time here)
      Welcome_head.frameNStart = frameN;  // exact frame index
      
      Welcome_head.setAutoDraw(true);
    }

    
    // *Welcome_text* updates
    if (t >= 0.0 && Welcome_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Welcome_text.tStart = t;  // (not accounting for frame time here)
      Welcome_text.frameNStart = frameN;  // exact frame index
      
      Welcome_text.setAutoDraw(true);
    }

    
    // *key_resp_2* updates
    if (t >= 0.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
    }

    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: [], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    WelcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function WelcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Welcome' ---
    WelcomeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_2.stop();
    // the Routine "Welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_3_allKeys;
var instr_train_sComponents;
function instr_train_sRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instr_train_s' ---
    t = 0;
    instr_train_sClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp_3.keys = undefined;
    key_resp_3.rt = undefined;
    _key_resp_3_allKeys = [];
    // keep track of which components have finished
    instr_train_sComponents = [];
    instr_train_sComponents.push(text_3);
    instr_train_sComponents.push(key_resp_3);
    
    instr_train_sComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function instr_train_sRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instr_train_s' ---
    // get current time
    t = instr_train_sClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }

    
    // *key_resp_3* updates
    if (t >= 0.0 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_3.tStart = t;  // (not accounting for frame time here)
      key_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.clearEvents(); });
    }

    if (key_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_3.getKeys({keyList: [], waitRelease: false});
      _key_resp_3_allKeys = _key_resp_3_allKeys.concat(theseKeys);
      if (_key_resp_3_allKeys.length > 0) {
        key_resp_3.keys = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_3.rt = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instr_train_sComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instr_train_sRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instr_train_s' ---
    instr_train_sComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_3.stop();
    // the Routine "instr_train_s" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var training_social;
function training_socialLoopBegin(training_socialLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    training_social = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'trainingtrials_social.xlsx', '0:4'),
      seed: undefined, name: 'training_social'
    });
    psychoJS.experiment.addLoop(training_social); // add the loop to the experiment
    currentLoop = training_social;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    training_social.forEach(function() {
      snapshot = training_social.getSnapshot();
    
      training_socialLoopScheduler.add(importConditions(snapshot));
      training_socialLoopScheduler.add(training_trialRoutineBegin(snapshot));
      training_socialLoopScheduler.add(training_trialRoutineEachFrame());
      training_socialLoopScheduler.add(training_trialRoutineEnd(snapshot));
      training_socialLoopScheduler.add(feedback_trainRoutineBegin(snapshot));
      training_socialLoopScheduler.add(feedback_trainRoutineEachFrame());
      training_socialLoopScheduler.add(feedback_trainRoutineEnd(snapshot));
      training_socialLoopScheduler.add(training_socialLoopEndIteration(training_socialLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function training_socialLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(training_social);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function training_socialLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var training_nonsocial;
function training_nonsocialLoopBegin(training_nonsocialLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    training_nonsocial = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'trainingtrials_nonsocial.xlsx', '0:4'),
      seed: undefined, name: 'training_nonsocial'
    });
    psychoJS.experiment.addLoop(training_nonsocial); // add the loop to the experiment
    currentLoop = training_nonsocial;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    training_nonsocial.forEach(function() {
      snapshot = training_nonsocial.getSnapshot();
    
      training_nonsocialLoopScheduler.add(importConditions(snapshot));
      training_nonsocialLoopScheduler.add(training_trialRoutineBegin(snapshot));
      training_nonsocialLoopScheduler.add(training_trialRoutineEachFrame());
      training_nonsocialLoopScheduler.add(training_trialRoutineEnd(snapshot));
      training_nonsocialLoopScheduler.add(feedback_trainRoutineBegin(snapshot));
      training_nonsocialLoopScheduler.add(feedback_trainRoutineEachFrame());
      training_nonsocialLoopScheduler.add(feedback_trainRoutineEnd(snapshot));
      training_nonsocialLoopScheduler.add(training_nonsocialLoopEndIteration(training_nonsocialLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function training_nonsocialLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(training_nonsocial);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function training_nonsocialLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    blocks.forEach(function() {
      snapshot = blocks.getSnapshot();
    
      blocksLoopScheduler.add(importConditions(snapshot));
      blocksLoopScheduler.add(BlockCodeRoutineBegin(snapshot));
      blocksLoopScheduler.add(BlockCodeRoutineEachFrame());
      blocksLoopScheduler.add(BlockCodeRoutineEnd(snapshot));
      const cyclesLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(cyclesLoopBegin(cyclesLoopScheduler, snapshot));
      blocksLoopScheduler.add(cyclesLoopScheduler);
      blocksLoopScheduler.add(cyclesLoopEnd);
      blocksLoopScheduler.add(BlockCounterRoutineBegin(snapshot));
      blocksLoopScheduler.add(BlockCounterRoutineEachFrame());
      blocksLoopScheduler.add(BlockCounterRoutineEnd(snapshot));
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var cycles;
function cyclesLoopBegin(cyclesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    cycles = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 6, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'cycles'
    });
    psychoJS.experiment.addLoop(cycles); // add the loop to the experiment
    currentLoop = cycles;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    cycles.forEach(function() {
      snapshot = cycles.getSnapshot();
    
      cyclesLoopScheduler.add(importConditions(snapshot));
      cyclesLoopScheduler.add(LateralizationByCycleRoutineBegin(snapshot));
      cyclesLoopScheduler.add(LateralizationByCycleRoutineEachFrame());
      cyclesLoopScheduler.add(LateralizationByCycleRoutineEnd(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      cyclesLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      cyclesLoopScheduler.add(trialsLoopScheduler);
      cyclesLoopScheduler.add(trialsLoopEnd);
      cyclesLoopScheduler.add(LatCounterRoutineBegin(snapshot));
      cyclesLoopScheduler.add(LatCounterRoutineEachFrame());
      cyclesLoopScheduler.add(LatCounterRoutineEnd(snapshot));
      cyclesLoopScheduler.add(cyclesLoopEndIteration(cyclesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials.forEach(function() {
      snapshot = trials.getSnapshot();
    
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(feedback_trialsRoutineBegin(snapshot));
      trialsLoopScheduler.add(feedback_trialsRoutineEachFrame());
      trialsLoopScheduler.add(feedback_trialsRoutineEnd(snapshot));
      trialsLoopScheduler.add(Intertrial_IntervalRoutineBegin(snapshot));
      trialsLoopScheduler.add(Intertrial_IntervalRoutineEachFrame());
      trialsLoopScheduler.add(Intertrial_IntervalRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function cyclesLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(cycles);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function cyclesLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocksLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var CueLeft;
var CueRight;
var deco;
var deco_pos_left;
var deco_pos_right;
var symb;
var cue_left_path;
var cue_right_path;
var new_neutral_3Clock;
var new_neutral_3;
var training_trialComponents;
function training_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'training_trial' ---
    t = 0;
    training_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_14
    if ((currentLoop.name == "training_social" && currentLoop.thisN == 0) || (currentLoop.name == "trials" && currentLoop.thisN == 0 && Blocklist[blocks.thisRepN] == "social")){
        console.log("currentLoop.name: ", currentLoop.name)
        console.log("currentLoop.thisN: ", currentLoop.thisN)
        CueLeft = CueLeft_s_t;
        console.log("CueLeft: ", CueLeft);
        CueRight = CueRight_s_t;
        console.log("CueRight: ", CueRight);
        deco = "deco/bubble.png";
        console.log("deco", deco);
        deco_pos_left = [-0.6, -0.04];
        console.log("deco_pos_left", deco_pos_left);
        deco_pos_right = [0.6, -0.04];
        console.log("deco_pos_right", deco_pos_right);
        symb = "ist eher ein Lob";
        } else if ((currentLoop.name == "training_nonsocial" && currentLoop.thisN == 0) || (currentLoop.name == "trials" && currentLoop.thisN == 0 && Blocklist[blocks.thisRepN] == "nonsocial")){
        CueLeft = CueLeft_ns_t;
        CueRight = CueRight_ns_t;
        deco = "deco/button.png";
        deco_pos_left = [-0.6, -0.01];
        deco_pos_right = [0.6, -0.01];
        symb = "steht eher für Start";
        }
    
    cue_left_path = CueLeft.path;
    cue_right_path = CueRight.path;
    text_2.setText((("Welches Symbol " + symb) + " ?"));
    new_neutral_3Clock = new util.Clock();
    new_neutral_3 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'new_neutral_3',
      units: 'height',
      movie: filename_neutral,
      pos: [0, 0],
      size: [0.625, 0.5],
      ori: 0,
      opacity: 1,
      loop: false,
      noAudio: true,
      });
    cue_left_2.setImage(cue_left_path);
    cue_right_2.setImage(cue_right_path);
    slide_response_2.reset()
    // keep track of which components have finished
    training_trialComponents = [];
    training_trialComponents.push(text_2);
    training_trialComponents.push(fix_cross_3);
    training_trialComponents.push(new_neutral_3);
    training_trialComponents.push(cue_left_2);
    training_trialComponents.push(cue_right_2);
    training_trialComponents.push(slide_response_2);
    
    training_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function training_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'training_trial' ---
    // get current time
    t = training_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_2* updates
    if (t >= 1 && text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_2.tStart = t;  // (not accounting for frame time here)
      text_2.frameNStart = frameN;  // exact frame index
      
      text_2.setAutoDraw(true);
    }

    frameRemains = 1 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_2.setAutoDraw(false);
    }
    
    // *fix_cross_3* updates
    if (t >= 0 && fix_cross_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fix_cross_3.tStart = t;  // (not accounting for frame time here)
      fix_cross_3.frameNStart = frameN;  // exact frame index
      
      fix_cross_3.setAutoDraw(true);
    }

    frameRemains = 0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fix_cross_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fix_cross_3.setAutoDraw(false);
    }
    
    // *new_neutral_3* updates
    if (t >= 1.0 && new_neutral_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_neutral_3.tStart = t;  // (not accounting for frame time here)
      new_neutral_3.frameNStart = frameN;  // exact frame index
      
      new_neutral_3.setAutoDraw(true);
      new_neutral_3.play();
    }

    frameRemains = 1.0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_neutral_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_neutral_3.setAutoDraw(false);
    }

    if (new_neutral_3.status === PsychoJS.Status.FINISHED) {  // force-end the routine
        continueRoutine = false;
    }
    
    // *cue_left_2* updates
    if (t >= 1 && cue_left_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_left_2.tStart = t;  // (not accounting for frame time here)
      cue_left_2.frameNStart = frameN;  // exact frame index
      
      cue_left_2.setAutoDraw(true);
    }

    
    // *cue_right_2* updates
    if (t >= 1 && cue_right_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_right_2.tStart = t;  // (not accounting for frame time here)
      cue_right_2.frameNStart = frameN;  // exact frame index
      
      cue_right_2.setAutoDraw(true);
    }

    
    // *slide_response_2* updates
    if (t >= 1 && slide_response_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slide_response_2.tStart = t;  // (not accounting for frame time here)
      slide_response_2.frameNStart = frameN;  // exact frame index
      
      slide_response_2.setAutoDraw(true);
    }

    
    // Check slide_response_2 for response to end routine
    if (slide_response_2.getRating() !== undefined && slide_response_2.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    training_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function training_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'training_trial' ---
    training_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    new_neutral_3.stop();
    psychoJS.experiment.addData('slide_response_2.response', slide_response_2.getRating());
    psychoJS.experiment.addData('slide_response_2.rt', slide_response_2.getRT());
    // the Routine "training_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var times;
var time_miss;
var time_h;
var time_a;
var resp;
var new_angry_2Clock;
var new_angry_2;
var new_happy_2Clock;
var new_happy_2;
var feedback_trainComponents;
function feedback_trainRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback_train' ---
    t = 0;
    feedback_trainClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_9
    console.log("SLIDER RESPONSE: ", slide_response_2.getRating());
    console.log("slide_response_2.getRating() == undefined", slide_response_2.getRating() == undefined)
    console.log("number of trial: ", currentLoop.thisN);
    console.log("deco", deco);
    
    times = train_times[currentLoop.thisN];
    console.log("times", times);
    
    if (slide_response_2.getRating() == undefined){
        time_miss = 6.0;
        time_h = 0;
        time_a = 0;
        resp = undefined;
    } else {
        time_miss = 0;
        time_h = times[0];
        time_a = times[1];
        if (slide_response_2.getRating() > 3){
            resp = "right";
        } else {
            resp = "left";
        }
    }
    
    console.log("time_miss: ", time_miss);
    console.log("time_h: ", time_h);
    console.log("time_a: ", time_a);
    console.log("resp: ", resp);
    console.log("resp == 'right': ", resp == "right")
    new_angry_2Clock = new util.Clock();
    new_angry_2 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'new_angry_2',
      units: 'height',
      movie: filename_feedback_angry,
      pos: [0, 0],
      size: [0.625, 0.5],
      ori: 0,
      opacity: 1,
      loop: false,
      noAudio: true,
      });
    new_happy_2Clock = new util.Clock();
    new_happy_2 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'new_happy_2',
      units: 'height',
      movie: filename_feedback_happy,
      pos: [0, 0],
      size: [0.625, 0.5],
      ori: 0,
      opacity: 1,
      loop: false,
      noAudio: false,
      });
    box_l.setOpacity(resp == "left");
    box_r.setOpacity(resp == "right");
    cue_left_fb.setImage(cue_left_path);
    cue_right_fb.setImage(cue_right_path);
    // keep track of which components have finished
    feedback_trainComponents = [];
    feedback_trainComponents.push(feedback_miss);
    feedback_trainComponents.push(new_angry_2);
    feedback_trainComponents.push(new_happy_2);
    feedback_trainComponents.push(box_l);
    feedback_trainComponents.push(box_r);
    feedback_trainComponents.push(cue_left_fb);
    feedback_trainComponents.push(cue_right_fb);
    
    feedback_trainComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feedback_trainRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback_train' ---
    // get current time
    t = feedback_trainClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_miss* updates
    if (t >= 0.0 && feedback_miss.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_miss.tStart = t;  // (not accounting for frame time here)
      feedback_miss.frameNStart = frameN;  // exact frame index
      
      feedback_miss.setAutoDraw(true);
    }

    frameRemains = 0.0 + time_miss - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_miss.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_miss.setAutoDraw(false);
    }
    
    // *new_angry_2* updates
    if (t >= 0.0 && new_angry_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_angry_2.tStart = t;  // (not accounting for frame time here)
      new_angry_2.frameNStart = frameN;  // exact frame index
      
      new_angry_2.setAutoDraw(true);
      new_angry_2.play();
    }

    frameRemains = 0.0 + time_a - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_angry_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_angry_2.setAutoDraw(false);
    }

    
    // *new_happy_2* updates
    if (t >= 0.0 && new_happy_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_happy_2.tStart = t;  // (not accounting for frame time here)
      new_happy_2.frameNStart = frameN;  // exact frame index
      
      new_happy_2.setAutoDraw(true);
      new_happy_2.play();
    }

    frameRemains = 0.0 + time_h - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_happy_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_happy_2.setAutoDraw(false);
    }

    
    // *box_l* updates
    if (t >= 0.0 && box_l.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      box_l.tStart = t;  // (not accounting for frame time here)
      box_l.frameNStart = frameN;  // exact frame index
      
      box_l.setAutoDraw(true);
    }

    frameRemains = 0.0 + 6.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (box_l.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      box_l.setAutoDraw(false);
    }
    
    // *box_r* updates
    if (t >= 0.0 && box_r.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      box_r.tStart = t;  // (not accounting for frame time here)
      box_r.frameNStart = frameN;  // exact frame index
      
      box_r.setAutoDraw(true);
    }

    frameRemains = 0.0 + 6.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (box_r.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      box_r.setAutoDraw(false);
    }
    
    // *cue_left_fb* updates
    if (t >= 0 && cue_left_fb.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_left_fb.tStart = t;  // (not accounting for frame time here)
      cue_left_fb.frameNStart = frameN;  // exact frame index
      
      cue_left_fb.setAutoDraw(true);
    }

    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_left_fb.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_left_fb.setAutoDraw(false);
    }
    
    // *cue_right_fb* updates
    if (t >= 0 && cue_right_fb.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_right_fb.tStart = t;  // (not accounting for frame time here)
      cue_right_fb.frameNStart = frameN;  // exact frame index
      
      cue_right_fb.setAutoDraw(true);
    }

    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_right_fb.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_right_fb.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feedback_trainComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedback_trainRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback_train' ---
    feedback_trainComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    new_angry_2.stop();
    new_happy_2.stop();
    // the Routine "feedback_train" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_4_allKeys;
var Alles_klarComponents;
function Alles_klarRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Alles_klar' ---
    t = 0;
    Alles_klarClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp_4.keys = undefined;
    key_resp_4.rt = undefined;
    _key_resp_4_allKeys = [];
    // keep track of which components have finished
    Alles_klarComponents = [];
    Alles_klarComponents.push(text_4);
    Alles_klarComponents.push(key_resp_4);
    
    Alles_klarComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Alles_klarRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Alles_klar' ---
    // get current time
    t = Alles_klarClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_4* updates
    if (t >= 0.0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index
      
      text_4.setAutoDraw(true);
    }

    
    // *key_resp_4* updates
    if (t >= 0.0 && key_resp_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_4.tStart = t;  // (not accounting for frame time here)
      key_resp_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_4.clearEvents(); });
    }

    if (key_resp_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_4.getKeys({keyList: [], waitRelease: false});
      _key_resp_4_allKeys = _key_resp_4_allKeys.concat(theseKeys);
      if (_key_resp_4_allKeys.length > 0) {
        key_resp_4.keys = _key_resp_4_allKeys[_key_resp_4_allKeys.length - 1].name;  // just the last key pressed
        key_resp_4.rt = _key_resp_4_allKeys[_key_resp_4_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Alles_klarComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Alles_klarRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Alles_klar' ---
    Alles_klarComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_4.stop();
    // the Routine "Alles_klar" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_5_allKeys;
var instr_train_nsComponents;
function instr_train_nsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instr_train_ns' ---
    t = 0;
    instr_train_nsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp_5.keys = undefined;
    key_resp_5.rt = undefined;
    _key_resp_5_allKeys = [];
    // keep track of which components have finished
    instr_train_nsComponents = [];
    instr_train_nsComponents.push(text);
    instr_train_nsComponents.push(key_resp_5);
    
    instr_train_nsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function instr_train_nsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instr_train_ns' ---
    // get current time
    t = instr_train_nsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    
    // *key_resp_5* updates
    if (t >= 0.0 && key_resp_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_5.tStart = t;  // (not accounting for frame time here)
      key_resp_5.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_5.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_5.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_5.clearEvents(); });
    }

    if (key_resp_5.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_5.getKeys({keyList: [], waitRelease: false});
      _key_resp_5_allKeys = _key_resp_5_allKeys.concat(theseKeys);
      if (_key_resp_5_allKeys.length > 0) {
        key_resp_5.keys = _key_resp_5_allKeys[_key_resp_5_allKeys.length - 1].name;  // just the last key pressed
        key_resp_5.rt = _key_resp_5_allKeys[_key_resp_5_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instr_train_nsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instr_train_nsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instr_train_ns' ---
    instr_train_nsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_5.stop();
    // the Routine "instr_train_ns" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _Allesklar_resp_2_allKeys;
var Alles_Klar_2Components;
function Alles_Klar_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Alles_Klar_2' ---
    t = 0;
    Alles_Klar_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    Allesklar_resp_2.keys = undefined;
    Allesklar_resp_2.rt = undefined;
    _Allesklar_resp_2_allKeys = [];
    // keep track of which components have finished
    Alles_Klar_2Components = [];
    Alles_Klar_2Components.push(Allesklartext_2);
    Alles_Klar_2Components.push(Allesklar_resp_2);
    
    Alles_Klar_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Alles_Klar_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Alles_Klar_2' ---
    // get current time
    t = Alles_Klar_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Allesklartext_2* updates
    if (t >= 0.0 && Allesklartext_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Allesklartext_2.tStart = t;  // (not accounting for frame time here)
      Allesklartext_2.frameNStart = frameN;  // exact frame index
      
      Allesklartext_2.setAutoDraw(true);
    }

    
    // *Allesklar_resp_2* updates
    if (t >= 0.0 && Allesklar_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Allesklar_resp_2.tStart = t;  // (not accounting for frame time here)
      Allesklar_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { Allesklar_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { Allesklar_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { Allesklar_resp_2.clearEvents(); });
    }

    if (Allesklar_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = Allesklar_resp_2.getKeys({keyList: [], waitRelease: false});
      _Allesklar_resp_2_allKeys = _Allesklar_resp_2_allKeys.concat(theseKeys);
      if (_Allesklar_resp_2_allKeys.length > 0) {
        Allesklar_resp_2.keys = _Allesklar_resp_2_allKeys[_Allesklar_resp_2_allKeys.length - 1].name;  // just the last key pressed
        Allesklar_resp_2.rt = _Allesklar_resp_2_allKeys[_Allesklar_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Alles_Klar_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Alles_Klar_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Alles_Klar_2' ---
    Alles_Klar_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    Allesklar_resp_2.stop();
    // the Routine "Alles_Klar_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var filenames_noxl;
var BlockCodeComponents;
function BlockCodeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'BlockCode' ---
    t = 0;
    BlockCodeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from BlockCode1
    if (Blocklist[BlockCounter] == "social") {
        //trial_file = "trainingtrials_social.xlsx";
        filenames_noxl = [  ["ADFES/Freigestellt/Neutral/F01-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/F01-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/F01-Anger-Face Forward_freigestellt.mp4"], 
                            ["ADFES/Freigestellt/Neutral/F04-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/F04-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/F04-Anger-Face Forward_freigestellt.mp4"], 
                            ["ADFES/Freigestellt/Neutral/M02-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/M02-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/M02-Anger-Face Forward_freigestellt.mp4"], 
                            ["ADFES/Freigestellt/Neutral/M06-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/M06-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/M06-Anger-Face Forward_freigestellt.mp4"]];
    } else {
        if (Blocklist[BlockCounter] == "nonsocial") {
            //trial_file = "trainingtrials_nonsocial.xlsx";
            filenames_noxl = [  ["Mandalas_new/neutral/Mandala1_neutral.mp4", "Mandalas_new/happy/Mandala1_happy.mp4", "Mandalas_new/angry/Mandala1_angry.mp4"], 
                                ["Mandalas_new/neutral/Mandala2_neutral.mp4", "Mandalas_new/happy/Mandala2_happy.mp4", "Mandalas_new/angry/Mandala2_angry.mp4"], 
                                ["Mandalas_new/neutral/Mandala3_neutral.mp4", "Mandalas_new/happy/Mandala3_happy.mp4", "Mandalas_new/angry/Mandala3_angry.mp4"], 
                                ["Mandalas_new/neutral/Mandala4_neutral.mp4", "Mandalas_new/happy/Mandala4_happy.mp4", "Mandalas_new/angry/Mandala4_angry.mp4"]];
        }
    }
    
    console.log("filenames_noxl:" + filenames_noxl)
    /*path = os.path.join(cwd, trial_file)
    book = openpyxl.load_workbook(filename = path)
    sheet = book.active
    
    listAB = ['A', 'B']*2
    random.shuffle(listAB)
    
    for index, element in enumerate(listAB, start=1):
    sheet.cell(row = index + 1, column = 5).value = element
    
    filenames = []
    for x in range(4):
    filenames.append([])
    
    #here you iterate over the rows in the specific column
    for row in range(2,6):
    for column in "BCD":  #Here you can add or reduce the columns
    cell_name = "{}{}".format(column, row)
    filenames[row-2].append(sheet[cell_name].value) # the value of the specific cell
    
    randnumbers = []
    for x in range(1, 5):
    randnumbers.append(random.randint(9, 99))
    
    for row in range(2,6):
    for column in "A":  #Here you can add or reduce the columns
    cell_name = "{}{}".format(column, row)
    sheet[cell_name].value = randnumbers[row-2]# the value of the specific cell
    
    book.save(filename = trial_file)*/
    
    // keep track of which components have finished
    BlockCodeComponents = [];
    
    BlockCodeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function BlockCodeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'BlockCode' ---
    // get current time
    t = BlockCodeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    BlockCodeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function BlockCodeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'BlockCode' ---
    BlockCodeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "BlockCode" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var CycleText1_dur;
var CycleText2_dur;
var CycleText3_dur;
var CycleText4_dur;
var _key_resp_6_allKeys;
var LateralizationByCycleComponents;
function LateralizationByCycleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'LateralizationByCycle' ---
    t = 0;
    LateralizationByCycleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_8
    /*function randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }*/
    
    //if (randomChoice([true, false])) {
    //    right_cat = "A";
    //    left_cat = "B";
    //} else {
    //    left_cat = "A";
    //    right_cat = "B";
    //}
    
    
    console.log("BlockCounter: ", BlockCounter)
    //shuffle(numbarray[BlockCounter]);
    //console.log("numbarray[BlockCounter]:", numbarray[BlockCounter]);
    shuffle(filenames_noxl);
    console.log("Cycletext for next block cond: ", ((BlockCounter in [1, 2, 3]) && (CycleCounter == 0)))
    
    //"blocks:" + BlockCounter.toString()) + 
        //", cycles:") + CycleCounter.toString()) + "\nright_cat: ") + 
        //right_cat.toString()) + " left_cat: ") + 
        //left_cat.toString()) + 
    if (((BlockCounter == 0) && (CycleCounter == 0))) {
      CycleText1_dur = undefined;
      CycleText2_dur = 0;
      CycleText3_dur = 0;
      CycleText4_dur = 0;
    } else if (([0, 1, 2, 3].includes(BlockCounter)) && ([1,2, 3, 4, 5].includes(CycleCounter))) {
      continueRoutine = false;
    } else if ([2, 3].includes(BlockCounter) && (CycleCounter == 0)) {
      CycleText1_dur = 0;
      CycleText2_dur = undefined;
      CycleText3_dur = 0;
      CycleText4_dur = 0;
    } else if((BlockCounter == 1) && (CycleCounter == 0)) {
      CycleText1_dur = 0;
      CycleText2_dur = 0;
      CycleText3_dur = 0;
      CycleText4_dur = undefined;
    }
    
    CycleText3.setText('PAUSE\n\nPress any key, to start the next cycle.');
    key_resp_6.keys = undefined;
    key_resp_6.rt = undefined;
    _key_resp_6_allKeys = [];
    // keep track of which components have finished
    LateralizationByCycleComponents = [];
    LateralizationByCycleComponents.push(CycleText1);
    LateralizationByCycleComponents.push(CycleText2);
    LateralizationByCycleComponents.push(CycleText3);
    LateralizationByCycleComponents.push(CycleText4);
    LateralizationByCycleComponents.push(key_resp_6);
    
    LateralizationByCycleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function LateralizationByCycleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'LateralizationByCycle' ---
    // get current time
    t = LateralizationByCycleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *CycleText1* updates
    if (t >= 0.0 && CycleText1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CycleText1.tStart = t;  // (not accounting for frame time here)
      CycleText1.frameNStart = frameN;  // exact frame index
      
      CycleText1.setAutoDraw(true);
    }

    frameRemains = 0.0 + CycleText1_dur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (CycleText1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      CycleText1.setAutoDraw(false);
    }
    
    // *CycleText2* updates
    if (t >= 0.0 && CycleText2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CycleText2.tStart = t;  // (not accounting for frame time here)
      CycleText2.frameNStart = frameN;  // exact frame index
      
      CycleText2.setAutoDraw(true);
    }

    frameRemains = 0.0 + CycleText2_dur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (CycleText2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      CycleText2.setAutoDraw(false);
    }
    
    // *CycleText3* updates
    if (t >= 0.0 && CycleText3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CycleText3.tStart = t;  // (not accounting for frame time here)
      CycleText3.frameNStart = frameN;  // exact frame index
      
      CycleText3.setAutoDraw(true);
    }

    frameRemains = 0.0 + CycleText3_dur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (CycleText3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      CycleText3.setAutoDraw(false);
    }
    
    // *CycleText4* updates
    if (t >= 0.0 && CycleText4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CycleText4.tStart = t;  // (not accounting for frame time here)
      CycleText4.frameNStart = frameN;  // exact frame index
      
      CycleText4.setAutoDraw(true);
    }

    frameRemains = 0.0 + CycleText4_dur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (CycleText4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      CycleText4.setAutoDraw(false);
    }
    
    // *key_resp_6* updates
    if (t >= 0.0 && key_resp_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_6.tStart = t;  // (not accounting for frame time here)
      key_resp_6.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_6.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_6.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_6.clearEvents(); });
    }

    if (key_resp_6.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_6.getKeys({keyList: [], waitRelease: false});
      _key_resp_6_allKeys = _key_resp_6_allKeys.concat(theseKeys);
      if (_key_resp_6_allKeys.length > 0) {
        key_resp_6.keys = _key_resp_6_allKeys[_key_resp_6_allKeys.length - 1].name;  // just the last key pressed
        key_resp_6.rt = _key_resp_6_allKeys[_key_resp_6_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    LateralizationByCycleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function LateralizationByCycleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'LateralizationByCycle' ---
    LateralizationByCycleComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_6.stop();
    // the Routine "LateralizationByCycle" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var filename_thisN_neutral;
var filename_thisN_happy;
var filename_thisN_angry;
var new_neutralClock;
var new_neutral;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_4
    console.log("filenames_noxl[currentLoop.thisN]: ", filenames_noxl[currentLoop.thisN])
    filename_thisN_neutral = filenames_noxl[currentLoop.thisN][0]; 
    filename_thisN_happy = filenames_noxl[currentLoop.thisN][1];
    filename_thisN_angry = filenames_noxl[currentLoop.thisN][2];
    console.log("filename_thisN_neutral: ", filename_thisN_neutral);
    
    
    if ((currentLoop.name == "training_social" && currentLoop.thisN == 0) || (currentLoop.name == "trials" && currentLoop.thisN == 0 && Blocklist[blocks.thisRepN] == "social")){
        CueLeft = CueLeft_s;
        CueRight = CueRight_s;
        deco = "deco/bubble.png";
        deco_pos_left = [-0.6, -0.04];
        deco_pos_right = [0.6, -0.04];
        symb = "ist eher ein Lob";
        } else if ((currentLoop.name == "training_nonsocial" && currentLoop.thisN == 0) || (currentLoop.name == "trials" && currentLoop.thisN == 0 && Blocklist[blocks.thisRepN] == "nonsocial")){
        CueLeft = CueLeft_ns;
        CueRight = CueRight_ns;
        deco = "deco/button.png";
        deco_pos_left = [-0.6, -0.01];
        deco_pos_right = [0.6, -0.01];
        symb = "steht eher für Start";
        }
    
    [CueLeft, CueRight] = switchSides(CueLeft, CueRight)
    
    cue_left_path = CueLeft.path;
    cue_right_path = CueRight.path;
    
    console.log("CueLeft: ", CueLeft);
    console.log("CueRight: ", CueRight);
    console.log("deco", deco);
    console.log("deco_pos_left", deco_pos_left);
        console.log("deco_pos_right", deco_pos_right);
    trial_header.setText((("Welches Symbol " + symb) + " ?"));
    new_neutralClock = new util.Clock();
    new_neutral = new visual.MovieStim({
      win: psychoJS.window,
      name: 'new_neutral',
      units: 'height',
      movie: filename_thisN_neutral,
      pos: [0, 0],
      size: [0.625, 0.5],
      ori: 0,
      opacity: 1,
      loop: false,
      noAudio: true,
      });
    cue_left.setImage(cue_left_path);
    cue_right.setImage(cue_right_path);
    slide_response.reset()
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(trial_header);
    trialComponents.push(fix_cross);
    trialComponents.push(new_neutral);
    trialComponents.push(cue_left);
    trialComponents.push(cue_right);
    trialComponents.push(slide_response);
    
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *trial_header* updates
    if (t >= 1 && trial_header.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      trial_header.tStart = t;  // (not accounting for frame time here)
      trial_header.frameNStart = frameN;  // exact frame index
      
      trial_header.setAutoDraw(true);
    }

    frameRemains = 1 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (trial_header.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      trial_header.setAutoDraw(false);
    }
    
    // *fix_cross* updates
    if (t >= 0 && fix_cross.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fix_cross.tStart = t;  // (not accounting for frame time here)
      fix_cross.frameNStart = frameN;  // exact frame index
      
      fix_cross.setAutoDraw(true);
    }

    frameRemains = 0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fix_cross.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fix_cross.setAutoDraw(false);
    }
    
    // *new_neutral* updates
    if (t >= 1.0 && new_neutral.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_neutral.tStart = t;  // (not accounting for frame time here)
      new_neutral.frameNStart = frameN;  // exact frame index
      
      new_neutral.setAutoDraw(true);
      new_neutral.play();
    }

    frameRemains = 1.0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_neutral.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_neutral.setAutoDraw(false);
    }

    if (new_neutral.status === PsychoJS.Status.FINISHED) {  // force-end the routine
        continueRoutine = false;
    }
    
    // *cue_left* updates
    if (t >= 1 && cue_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_left.tStart = t;  // (not accounting for frame time here)
      cue_left.frameNStart = frameN;  // exact frame index
      
      cue_left.setAutoDraw(true);
    }

    
    // *cue_right* updates
    if (t >= 1 && cue_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_right.tStart = t;  // (not accounting for frame time here)
      cue_right.frameNStart = frameN;  // exact frame index
      
      cue_right.setAutoDraw(true);
    }

    
    // *slide_response* updates
    if (t >= 1 && slide_response.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slide_response.tStart = t;  // (not accounting for frame time here)
      slide_response.frameNStart = frameN;  // exact frame index
      
      slide_response.setAutoDraw(true);
    }

    
    // Check slide_response for response to end routine
    if (slide_response.getRating() !== undefined && slide_response.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    
    
    //thisExp.addData("left", left_cat);
    //thisExp.addData("right", right_cat);
    //thisExp.addData("stim", Stim);
    //if ((response_training.keys === "left")) {
    //    thisExp.addData("ParticipantAnswer", left_cat);
    //} else {
    //    if ((response_training.keys === "right")) {
    //        thisExp.addData("ParticipantAnswer", right_cat);
    //    } else {
    //        if ((response_training.keys === null)) {
    //            thisExp.addData("ParticipantAnswer", null);
    //        }
    //    }
    //}
    new_neutral.stop();
    psychoJS.experiment.addData('slide_response.response', slide_response.getRating());
    psychoJS.experiment.addData('slide_response.rt', slide_response.getRT());
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var new_angry_5Clock;
var new_angry_5;
var new_happy_5Clock;
var new_happy_5;
var feedback_trialsComponents;
function feedback_trialsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback_trials' ---
    t = 0;
    feedback_trialsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_13
    if (slide_response.getRating() == undefined){
        time_miss = 6.0;
        time_h = 0;
        time_a = 0;
        resp = undefined;
    } else {
        if (slide_response.getRating() > 3){
            resp = "right";
            times = CueRight.get_response()
        } else {
            resp = "left";
            times = CueLeft.get_response()
        }
        time_h = times[0]
        time_a = times[1]
        time_miss = 0
    }
    new_angry_5Clock = new util.Clock();
    new_angry_5 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'new_angry_5',
      units: 'height',
      movie: filename_thisN_angry,
      pos: [0, 0],
      size: [0.625, 0.5],
      ori: 0,
      opacity: 1,
      loop: false,
      noAudio: true,
      });
    new_happy_5Clock = new util.Clock();
    new_happy_5 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'new_happy_5',
      units: 'height',
      movie: filename_thisN_happy,
      pos: [0, 0],
      size: [0.625, 0.5],
      ori: 0,
      opacity: 1,
      loop: false,
      noAudio: false,
      });
    box_l_2.setOpacity(resp == "left");
    box_r_2.setOpacity(resp == "right");
    cue_left_fb_2.setImage(cue_left_path);
    cue_right_fb_2.setImage(cue_right_path);
    // keep track of which components have finished
    feedback_trialsComponents = [];
    feedback_trialsComponents.push(feedback_miss_2);
    feedback_trialsComponents.push(new_angry_5);
    feedback_trialsComponents.push(new_happy_5);
    feedback_trialsComponents.push(box_l_2);
    feedback_trialsComponents.push(box_r_2);
    feedback_trialsComponents.push(cue_left_fb_2);
    feedback_trialsComponents.push(cue_right_fb_2);
    
    feedback_trialsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feedback_trialsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback_trials' ---
    // get current time
    t = feedback_trialsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_miss_2* updates
    if (t >= 0.0 && feedback_miss_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_miss_2.tStart = t;  // (not accounting for frame time here)
      feedback_miss_2.frameNStart = frameN;  // exact frame index
      
      feedback_miss_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + time_miss - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_miss_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_miss_2.setAutoDraw(false);
    }
    
    // *new_angry_5* updates
    if (t >= 0.0 && new_angry_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_angry_5.tStart = t;  // (not accounting for frame time here)
      new_angry_5.frameNStart = frameN;  // exact frame index
      
      new_angry_5.setAutoDraw(true);
      new_angry_5.play();
    }

    frameRemains = 0.0 + time_a - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_angry_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_angry_5.setAutoDraw(false);
    }

    
    // *new_happy_5* updates
    if (t >= 0.0 && new_happy_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_happy_5.tStart = t;  // (not accounting for frame time here)
      new_happy_5.frameNStart = frameN;  // exact frame index
      
      new_happy_5.setAutoDraw(true);
      new_happy_5.play();
    }

    frameRemains = 0.0 + time_h - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_happy_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_happy_5.setAutoDraw(false);
    }

    
    // *box_l_2* updates
    if (t >= 0.0 && box_l_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      box_l_2.tStart = t;  // (not accounting for frame time here)
      box_l_2.frameNStart = frameN;  // exact frame index
      
      box_l_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 6.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (box_l_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      box_l_2.setAutoDraw(false);
    }
    
    // *box_r_2* updates
    if (t >= 0.0 && box_r_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      box_r_2.tStart = t;  // (not accounting for frame time here)
      box_r_2.frameNStart = frameN;  // exact frame index
      
      box_r_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 6.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (box_r_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      box_r_2.setAutoDraw(false);
    }
    
    // *cue_left_fb_2* updates
    if (t >= 0 && cue_left_fb_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_left_fb_2.tStart = t;  // (not accounting for frame time here)
      cue_left_fb_2.frameNStart = frameN;  // exact frame index
      
      cue_left_fb_2.setAutoDraw(true);
    }

    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_left_fb_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_left_fb_2.setAutoDraw(false);
    }
    
    // *cue_right_fb_2* updates
    if (t >= 0 && cue_right_fb_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_right_fb_2.tStart = t;  // (not accounting for frame time here)
      cue_right_fb_2.frameNStart = frameN;  // exact frame index
      
      cue_right_fb_2.setAutoDraw(true);
    }

    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_right_fb_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_right_fb_2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feedback_trialsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedback_trialsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback_trials' ---
    feedback_trialsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from code_13
    thisExp.addData("block", blocks.thisN)
    thisExp.addData("blockType", Blocklist[blocks.thisRepN])
    thisExp.addData("SLIDER RESPONSE", slide_response.getRating())
    thisExp.addData("resp", resp)
    thisExp.addData("CueRight.path", CueRight.path)
    thisExp.addData("CueRight.prob", CueRight.prob)
    thisExp.addData("CueLeft.path", CueLeft.path)
    thisExp.addData("CueLeft.prob", CueLeft.prob)
    thisExp.addData("times", times)
    thisExp.addData("time_h", time_h)
    thisExp.addData("time_a", time_a)
    new_angry_5.stop();
    new_happy_5.stop();
    // the Routine "feedback_trials" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Intertrial_IntervalComponents;
function Intertrial_IntervalRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Intertrial_Interval' ---
    t = 0;
    Intertrial_IntervalClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    console.log(TrialCounter);
    console.log(CycleCounter);
    console.log(BlockCounter)
    
    // keep track of which components have finished
    Intertrial_IntervalComponents = [];
    
    Intertrial_IntervalComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Intertrial_IntervalRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Intertrial_Interval' ---
    // get current time
    t = Intertrial_IntervalClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Intertrial_IntervalComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var TrialCounter;
function Intertrial_IntervalRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Intertrial_Interval' ---
    Intertrial_IntervalComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if(TrialCounter < 3){
    TrialCounter = TrialCounter + 1;
    } else {
        if(TrialCounter == 3) {
            TrialCounter = 0;
            console.log("TrialCounter reset to: " + TrialCounter)
        }
    }
    // the Routine "Intertrial_Interval" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var LatCounterComponents;
function LatCounterRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'LatCounter' ---
    t = 0;
    LatCounterClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    LatCounterComponents = [];
    
    LatCounterComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function LatCounterRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'LatCounter' ---
    // get current time
    t = LatCounterClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    LatCounterComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var CycleCounter;
function LatCounterRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'LatCounter' ---
    LatCounterComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if(CycleCounter < 5){
    CycleCounter = CycleCounter + 1;
    } else {
        if(CycleCounter == 1) {
            CycleCounter = 0;
            console.log("CycleCounter reset to:" + CycleCounter)
        }
    }
    // the Routine "LatCounter" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var BlockCounterComponents;
function BlockCounterRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'BlockCounter' ---
    t = 0;
    BlockCounterClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    BlockCounterComponents = [];
    
    BlockCounterComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function BlockCounterRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'BlockCounter' ---
    // get current time
    t = BlockCounterClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    BlockCounterComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var BlockCounter;
function BlockCounterRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'BlockCounter' ---
    BlockCounterComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if(BlockCounter < 3){
    BlockCounter = BlockCounter + 1;
    } else {
        if(BlockCounter == 3) {
            BlockCounter = 0;
            console.log("BlockCounter reset to: " + BlockCounter)
        }
    }
    // the Routine "BlockCounter" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _check_instr_resp_allKeys;
var check_instrComponents;
function check_instrRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'check_instr' ---
    t = 0;
    check_instrClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    check_instr_resp.keys = undefined;
    check_instr_resp.rt = undefined;
    _check_instr_resp_allKeys = [];
    // keep track of which components have finished
    check_instrComponents = [];
    check_instrComponents.push(check_instr_text);
    check_instrComponents.push(check_instr_resp);
    
    check_instrComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function check_instrRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'check_instr' ---
    // get current time
    t = check_instrClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *check_instr_text* updates
    if (t >= 0.0 && check_instr_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      check_instr_text.tStart = t;  // (not accounting for frame time here)
      check_instr_text.frameNStart = frameN;  // exact frame index
      
      check_instr_text.setAutoDraw(true);
    }

    
    // *check_instr_resp* updates
    if (t >= 0.0 && check_instr_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      check_instr_resp.tStart = t;  // (not accounting for frame time here)
      check_instr_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { check_instr_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { check_instr_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { check_instr_resp.clearEvents(); });
    }

    if (check_instr_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = check_instr_resp.getKeys({keyList: [], waitRelease: false});
      _check_instr_resp_allKeys = _check_instr_resp_allKeys.concat(theseKeys);
      if (_check_instr_resp_allKeys.length > 0) {
        check_instr_resp.keys = _check_instr_resp_allKeys[_check_instr_resp_allKeys.length - 1].name;  // just the last key pressed
        check_instr_resp.rt = _check_instr_resp_allKeys[_check_instr_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    check_instrComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_instrRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'check_instr' ---
    check_instrComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    check_instr_resp.stop();
    // the Routine "check_instr" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var check_socialComponents;
function check_socialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'check_social' ---
    t = 0;
    check_socialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    slider_check_s.reset()
    // keep track of which components have finished
    check_socialComponents = [];
    check_socialComponents.push(text_check_s);
    check_socialComponents.push(cue_left_s);
    check_socialComponents.push(cue_right_s);
    check_socialComponents.push(slider_check_s);
    
    check_socialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function check_socialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'check_social' ---
    // get current time
    t = check_socialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_check_s* updates
    if (t >= 0.0 && text_check_s.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_check_s.tStart = t;  // (not accounting for frame time here)
      text_check_s.frameNStart = frameN;  // exact frame index
      
      text_check_s.setAutoDraw(true);
    }

    
    // *cue_left_s* updates
    if (t >= 0.0 && cue_left_s.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_left_s.tStart = t;  // (not accounting for frame time here)
      cue_left_s.frameNStart = frameN;  // exact frame index
      
      cue_left_s.setAutoDraw(true);
    }

    
    // *cue_right_s* updates
    if (t >= 0.0 && cue_right_s.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_right_s.tStart = t;  // (not accounting for frame time here)
      cue_right_s.frameNStart = frameN;  // exact frame index
      
      cue_right_s.setAutoDraw(true);
    }

    
    // *slider_check_s* updates
    if (t >= 0.0 && slider_check_s.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_check_s.tStart = t;  // (not accounting for frame time here)
      slider_check_s.frameNStart = frameN;  // exact frame index
      
      slider_check_s.setAutoDraw(true);
    }

    
    // Check slider_check_s for response to end routine
    if (slider_check_s.getRating() !== undefined && slider_check_s.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    check_socialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_socialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'check_social' ---
    check_socialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if (slider_check_s.getRating() > 3){
            resp = "right";
    } else {
            resp = "left";
    }
    
    console.log("resp_s: ", resp)
    
    thisExp.addData("slider_check_s: ", slider_check_s.getRating())
    thisExp.addData("resp_check_s", resp)
    thisExp.addData("CueRight_s.path", CueRight_s.path)
    thisExp.addData("CueRight_s.prob", CueRight_s.prob)
    thisExp.addData("CueLeft_s.path", CueLeft_s.path)
    thisExp.addData("CueLeft_s.prob", CueLeft_s.prob)
    psychoJS.experiment.addData('slider_check_s.response', slider_check_s.getRating());
    psychoJS.experiment.addData('slider_check_s.rt', slider_check_s.getRT());
    // the Routine "check_social" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var check_nonsocialComponents;
function check_nonsocialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'check_nonsocial' ---
    t = 0;
    check_nonsocialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    slider_check_ns.reset()
    // keep track of which components have finished
    check_nonsocialComponents = [];
    check_nonsocialComponents.push(text_check_ns);
    check_nonsocialComponents.push(cue_left_ns);
    check_nonsocialComponents.push(cue_right_ns);
    check_nonsocialComponents.push(slider_check_ns);
    
    check_nonsocialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function check_nonsocialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'check_nonsocial' ---
    // get current time
    t = check_nonsocialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_check_ns* updates
    if (t >= 0.0 && text_check_ns.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_check_ns.tStart = t;  // (not accounting for frame time here)
      text_check_ns.frameNStart = frameN;  // exact frame index
      
      text_check_ns.setAutoDraw(true);
    }

    
    // *cue_left_ns* updates
    if (t >= 0.0 && cue_left_ns.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_left_ns.tStart = t;  // (not accounting for frame time here)
      cue_left_ns.frameNStart = frameN;  // exact frame index
      
      cue_left_ns.setAutoDraw(true);
    }

    
    // *cue_right_ns* updates
    if (t >= 0.0 && cue_right_ns.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_right_ns.tStart = t;  // (not accounting for frame time here)
      cue_right_ns.frameNStart = frameN;  // exact frame index
      
      cue_right_ns.setAutoDraw(true);
    }

    
    // *slider_check_ns* updates
    if (t >= 0.0 && slider_check_ns.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_check_ns.tStart = t;  // (not accounting for frame time here)
      slider_check_ns.frameNStart = frameN;  // exact frame index
      
      slider_check_ns.setAutoDraw(true);
    }

    
    // Check slider_check_ns for response to end routine
    if (slider_check_ns.getRating() !== undefined && slider_check_ns.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    check_nonsocialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_nonsocialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'check_nonsocial' ---
    check_nonsocialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if (slider_check_ns.getRating() > 3){
            resp = "right";
    } else {
            resp = "left";
    }
    
    console.log("resp_ns: ", resp)
    
    thisExp.addData("slider_check_ns: ", slider_check_ns.getRating())
    thisExp.addData("resp_check_ns", resp)
    thisExp.addData("CueRight_ns.path", CueRight_ns.path)
    thisExp.addData("CueRight_ns.prob", CueRight_ns.prob)
    thisExp.addData("CueLeft_ns.path", CueLeft_ns.path)
    thisExp.addData("CueLeft_ns.prob", CueLeft_ns.prob)
    psychoJS.experiment.addData('slider_check_ns.response', slider_check_ns.getRating());
    psychoJS.experiment.addData('slider_check_ns.rt', slider_check_ns.getRT());
    // the Routine "check_nonsocial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _end_allKeys;
var ThanksComponents;
function ThanksRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Thanks' ---
    t = 0;
    ThanksClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    end.keys = undefined;
    end.rt = undefined;
    _end_allKeys = [];
    // keep track of which components have finished
    ThanksComponents = [];
    ThanksComponents.push(Thank);
    ThanksComponents.push(end);
    
    ThanksComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function ThanksRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Thanks' ---
    // get current time
    t = ThanksClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Thank* updates
    if (t >= 0.0 && Thank.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Thank.tStart = t;  // (not accounting for frame time here)
      Thank.frameNStart = frameN;  // exact frame index
      
      Thank.setAutoDraw(true);
    }

    
    // *end* updates
    if (t >= 0.0 && end.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      end.tStart = t;  // (not accounting for frame time here)
      end.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { end.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { end.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { end.clearEvents(); });
    }

    if (end.status === PsychoJS.Status.STARTED) {
      let theseKeys = end.getKeys({keyList: [], waitRelease: false});
      _end_allKeys = _end_allKeys.concat(theseKeys);
      if (_end_allKeys.length > 0) {
        end.keys = _end_allKeys[_end_allKeys.length - 1].name;  // just the last key pressed
        end.rt = _end_allKeys[_end_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    ThanksComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ThanksRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Thanks' ---
    ThanksComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    end.stop();
    // the Routine "Thanks" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
