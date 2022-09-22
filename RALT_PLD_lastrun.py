#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2022.2.2),
    on Mon Sep 19 15:14:34 2022
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard

# Run 'Before Experiment' code from code_4
class Cue:
    low = [0.25, 0.75]
    high = [0.75, 0.25]

    def __init__(self, prob, path):
        if prob == "low":
            self.prob = self.low
        elif prob == "high":
            self.prob = self.high
        self.path = path
        # Initialize instance attributes (assigned later)
        self.times = None

    def get_response(self):
        if choice([True, False], p=self.prob):
            # happy
            self.times = [6, 0]
        else:
            # angry
            self.times = [0, 6]
        return self.times

def getCues(paths):
    prob_init = ["high", "low"]
    shuffle(prob_init)
    shuffle(paths)

    left = Cue(prob_init[0], paths[0])
    right = Cue(prob_init[1], paths[1])

    return left, right

def switchSides(left, right):
    if choice([True, False]):
        left, right = right, left
    return left, right

def get_kanjis(session):
    path = os.path.join("kanji", session)
    kanjis = [os.path.join(path, file) for file in sorted(os.listdir(path))]
    shuffle(kanjis)
    return kanjis


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2022.2.2'
expName = 'EmoSexCounterbalanced_fontfix'  # from the Builder filename that created this script
expInfo = {
    'participant': '',
    'session': '1',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' %(expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='/Users/yanicklahaye/Desktop/Clone_RALT/social_context/RALT_PLD_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1280, 800], fullscr=True, screen=0, 
    winType='pyglet', allowStencil=False,
    monitor='OfficeMonitor', color=[-1,-1,-1], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}
ioSession = ioServer = eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='event')

# --- Initialize components for Routine "Welcome" ---
# Run 'Begin Experiment' code from code_5
import openpyxl
import numpy
import random
from numpy.random import choice
import os

win.setColor('black')
font_choice = 'Menlo'
color_choice = 'white'
Welcome_head = visual.TextStim(win=win, name='Welcome_head',
    text='Vielen Dank für die Teilnahme an diesem Experiment!',
    font=font_choice,
    pos=(0, 0.3), height=0.025, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
Welcome_text = visual.TextStim(win=win, name='Welcome_text',
    text='\n\nSie werden im Folgenden aufgefordert, zwischen \nzwei Symbolen links und rechts zu wählen.\n\nSie können dies tun, indem Sie auf den \nSchieberegler am unteren Rand klicken.\n\nOb Sie richtig gewählt haben,\nwird durch ein Bild in der Mitte\ndes Bildschirms angezeigt.\n\nWir beginnen mit einigen Probeläufen,\ndamit Sie das Experiment kennenlernen können.\n\nDrücken Sie eine beliebige Taste, um fortzufahren!',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
key_resp_2 = keyboard.Keyboard()

# --- Initialize components for Routine "instr_train_s" ---
text_3 = visual.TextStim(win=win, name='text_3',
    text='Sie werden gleich links und rechts auf dem \nBildschirm zwei Symbole sehen, die Wörter \nrepräsentieren. \n\nEines davon wird wahrscheinlich als freundliches \nLob interpretiert werden, das andere als \nBeleidigung.\n\nStellen Sie sich vor, Sie wählen das Symbol aus \nund sagen dieses Wort zu der Person in der Mitte \ndes Bildschirms. An ihrer Reaktion können Sie \nerkennen, wie das Wort interpretiert wurde.\n\nSie können das Symbol auswählen, indem Sie auf den \nSchieberegler am unteren Rand klicken. \nSie können die Stärke angeben, mit der Sie das \njeweilige Symbol wählen wollen, indem Sie weiter \nrechts oder links vom Schieberegler klicken.\n\nVersuchen wir eine erste Runde!\n\n',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
key_resp_3 = keyboard.Keyboard()

# --- Initialize components for Routine "training_trial" ---
# Run 'Begin Experiment' code from code_14
kanjis_t = get_kanjis("training")

thisExp.addData("kanjis_training", kanjis_t)

social_cues_t = kanjis_t[0:2]
nonsocial_cues_t = kanjis_t[2:]

CueLeft_s_t, CueRight_s_t = getCues(social_cues_t)
CueLeft_ns_t, CueRight_ns_t = getCues(nonsocial_cues_t)
fix_cross_3 = visual.TextStim(win=win, name='fix_cross_3',
    text='+',
    font=font_choice,
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
deco_left_2 = visual.ImageStim(
    win=win,
    name='deco_left_2', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
deco_right_2 = visual.ImageStim(
    win=win,
    name='deco_right_2', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
cue_left_2 = visual.ImageStim(
    win=win,
    name='cue_left_2', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(-0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-5.0)
cue_right_2 = visual.ImageStim(
    win=win,
    name='cue_right_2', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-6.0)
slide_response_2 = visual.Slider(win=win, name='slide_response_2',
    startValue=None, size=(0.5, 0.05), pos=(0, -0.4), units=None,
    labels=None, ticks=[1, 2, 3, 4, 5], granularity=0.0,
    style='rating', styleTweaks=(), opacity=None,
    labelColor='LightGray', markerColor=[0.0000, 0.0000, 0.0000], lineColor='White', colorSpace='rgb',
    font='Open Sans', labelHeight=0.05,
    flip=False, ori=0.0, depth=-7, readOnly=False)

# --- Initialize components for Routine "feedback_train" ---
feedback_miss = visual.TextStim(win=win, name='feedback_miss',
    text='PLEASE RESPOND FASTER!',
    font=font_choice,
    pos=(0, 0.225), height=0.05, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
# Run 'Begin Experiment' code from code_9
train_times = [[6, 0], [6, 0], [0, 6], [0, 6]]
shuffle(train_times)
resp = None

deco_left_fb = visual.ImageStim(
    win=win,
    name='deco_left_fb', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
deco_right_fb = visual.ImageStim(
    win=win,
    name='deco_right_fb', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
cue_left_fb = visual.ImageStim(
    win=win,
    name='cue_left_fb', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(-0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-6.0)
cue_right_fb = visual.ImageStim(
    win=win,
    name='cue_right_fb', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-7.0)
box_l = visual.Rect(
    win=win, name='box_l',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(-0.6, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=None,
    opacity=1.0, depth=-8.0, interpolate=True)
box_r = visual.Rect(
    win=win, name='box_r',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0.6, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=None,
    opacity=1.0, depth=-9.0, interpolate=True)

# --- Initialize components for Routine "Alles_klar" ---
text_4 = visual.TextStim(win=win, name='text_4',
    text='As you have seen, the picture in the center\nchanges according to your answer.\n\nA happy face indicates the word you chose was\ninterpreted as praise, an angry face indicates it\nwas interpreted as insulting. \n\nHowever, these words are a bit ambiguous, so\nsometimes a mostly friendly word will be\ninterpreted as insulting and vice versa.\n\nPress any key to continue!',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
key_resp_4 = keyboard.Keyboard()

# --- Initialize components for Routine "instr_train_ns" ---
text = visual.TextStim(win=win, name='text',
    text="In the next round, you will see different symbols\nand pictures in the center. \n\nThis time, imagine you’re trying to make sense of a foreign machine. \nYou can see two buttons with symbols written on them. \nYou don’t know what they mean, but the picture in the center \n(representing the screen of the machine) \nwill show you the result of the button press.\n\nYou can choose the symbol again by clicking on the slider on the bottom. \nAgain, indicate the strength with which you want\nto choose this symbol by clicking further to the\nleft or right.\n\nLet's try it out!\n\n",
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
key_resp_5 = keyboard.Keyboard()

# --- Initialize components for Routine "training_trial" ---
# Run 'Begin Experiment' code from code_14
kanjis_t = get_kanjis("training")

thisExp.addData("kanjis_training", kanjis_t)

social_cues_t = kanjis_t[0:2]
nonsocial_cues_t = kanjis_t[2:]

CueLeft_s_t, CueRight_s_t = getCues(social_cues_t)
CueLeft_ns_t, CueRight_ns_t = getCues(nonsocial_cues_t)
fix_cross_3 = visual.TextStim(win=win, name='fix_cross_3',
    text='+',
    font=font_choice,
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
deco_left_2 = visual.ImageStim(
    win=win,
    name='deco_left_2', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
deco_right_2 = visual.ImageStim(
    win=win,
    name='deco_right_2', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
cue_left_2 = visual.ImageStim(
    win=win,
    name='cue_left_2', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(-0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-5.0)
cue_right_2 = visual.ImageStim(
    win=win,
    name='cue_right_2', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-6.0)
slide_response_2 = visual.Slider(win=win, name='slide_response_2',
    startValue=None, size=(0.5, 0.05), pos=(0, -0.4), units=None,
    labels=None, ticks=[1, 2, 3, 4, 5], granularity=0.0,
    style='rating', styleTweaks=(), opacity=None,
    labelColor='LightGray', markerColor=[0.0000, 0.0000, 0.0000], lineColor='White', colorSpace='rgb',
    font='Open Sans', labelHeight=0.05,
    flip=False, ori=0.0, depth=-7, readOnly=False)

# --- Initialize components for Routine "feedback_train" ---
feedback_miss = visual.TextStim(win=win, name='feedback_miss',
    text='PLEASE RESPOND FASTER!',
    font=font_choice,
    pos=(0, 0.225), height=0.05, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
# Run 'Begin Experiment' code from code_9
train_times = [[6, 0], [6, 0], [0, 6], [0, 6]]
shuffle(train_times)
resp = None

deco_left_fb = visual.ImageStim(
    win=win,
    name='deco_left_fb', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
deco_right_fb = visual.ImageStim(
    win=win,
    name='deco_right_fb', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
cue_left_fb = visual.ImageStim(
    win=win,
    name='cue_left_fb', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(-0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-6.0)
cue_right_fb = visual.ImageStim(
    win=win,
    name='cue_right_fb', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-7.0)
box_l = visual.Rect(
    win=win, name='box_l',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(-0.6, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=None,
    opacity=1.0, depth=-8.0, interpolate=True)
box_r = visual.Rect(
    win=win, name='box_r',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0.6, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=None,
    opacity=1.0, depth=-9.0, interpolate=True)

# --- Initialize components for Routine "Alles_Klar_2" ---
Allesklartext_2 = visual.TextStim(win=win, name='Allesklartext_2',
    text='As you have seen, the picture in the center\nchanges again according to your answer.\n\nAgain, the symbols are a bit ambiguous, so\nsometimes a button press will result in a\ncolorful, moving picture in one round and in a\ngrey, blurry picture in the next one.\n\n',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
Allesklar_resp_2 = keyboard.Keyboard()

# --- Initialize components for Routine "BlockCode" ---
# Run 'Begin Experiment' code from BlockCode1
#Set up order of Blocks (beginning randomized, then alternating)
Blocklist = ["social", "nonsocial"]
random.shuffle(Blocklist)
Blocklist = Blocklist*2


# --- Initialize components for Routine "LateralizationByCycle" ---
# Run 'Begin Experiment' code from code_8
CycleText = ''
CycleText1 = visual.TextStim(win=win, name='CycleText1',
    text='We are now starting the first block.\n\nEverything will be exactly as in the training trials. Note that the symbols may switch sides!\n\nMake your response by clicking on the slider below.\n\nPress any key, to start the first block!\n\n',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
CycleText2 = visual.TextStim(win=win, name='CycleText2',
    text='PAUSE\n\nPress any key,\nto start the next block.',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);
CycleText3 = visual.TextStim(win=win, name='CycleText3',
    text='',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-3.0);
CycleText4 = visual.TextStim(win=win, name='CycleText4',
    text='You have now completed a full block.\n\nIn the next block you will see different images.\n\nAs in the training trials, you will either deal\nwith people you utter a word to or a machine to\npress buttons on.\n\nWhen you are ready press any button,\nto start the next block.',
    font=font_choice,
    pos=(0, 0), height=0.025, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-4.0);
key_resp_6 = keyboard.Keyboard()

# --- Initialize components for Routine "trial" ---
# Run 'Begin Experiment' code from code_4
kanjis = get_kanjis(expInfo['session'])

thisExp.addData("kanjis", kanjis)

social_cues = kanjis[0:2]
nonsocial_cues = kanjis[2:]

CueLeft_s, CueRight_s = getCues(social_cues)
CueLeft_ns, CueRight_ns = getCues(nonsocial_cues)
fix_cross = visual.TextStim(win=win, name='fix_cross',
    text='+',
    font=font_choice,
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-1.0);
deco_left = visual.ImageStim(
    win=win,
    name='deco_left', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
deco_right = visual.ImageStim(
    win=win,
    name='deco_right', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
cue_left = visual.ImageStim(
    win=win,
    name='cue_left', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(-0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-5.0)
cue_right = visual.ImageStim(
    win=win,
    name='cue_right', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-6.0)
slide_response = visual.Slider(win=win, name='slide_response',
    startValue=None, size=(0.5, 0.05), pos=(0, -0.4), units=None,
    labels=None, ticks=[1, 2, 3, 4, 5], granularity=0.0,
    style='rating', styleTweaks=(), opacity=None,
    labelColor='LightGray', markerColor=[0.0000, 0.0000, 0.0000], lineColor='White', colorSpace='rgb',
    font='Open Sans', labelHeight=0.05,
    flip=False, ori=0.0, depth=-7, readOnly=False)

# --- Initialize components for Routine "feedback_trials" ---
feedback_miss_2 = visual.TextStim(win=win, name='feedback_miss_2',
    text='PLEASE RESPOND FASTER!',
    font=font_choice,
    pos=(0, 0.225), height=0.05, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
deco_left_fb_2 = visual.ImageStim(
    win=win,
    name='deco_left_fb_2', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
deco_right_fb_2 = visual.ImageStim(
    win=win,
    name='deco_right_fb_2', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=[0,0], size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
cue_left_fb_2 = visual.ImageStim(
    win=win,
    name='cue_left_fb_2', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(-0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-6.0)
cue_right_fb_2 = visual.ImageStim(
    win=win,
    name='cue_right_fb_2', 
    image='sin', mask=None, anchor='center',
    ori=0, pos=(0.6, 0), size=(0.2, 0.2),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-7.0)
box_l_2 = visual.Rect(
    win=win, name='box_l_2',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(-0.6, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=None,
    opacity=1.0, depth=-8.0, interpolate=True)
box_r_2 = visual.Rect(
    win=win, name='box_r_2',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0.6, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=None,
    opacity=1.0, depth=-9.0, interpolate=True)

# --- Initialize components for Routine "Intertrial_Interval" ---
text_2 = visual.TextStim(win=win, name='text_2',
    text='+',
    font=font_choice,
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);

# --- Initialize components for Routine "LatCounter" ---

# --- Initialize components for Routine "BlockCounter" ---

# --- Initialize components for Routine "Thanks" ---
Thank = visual.TextStim(win=win, name='Thank',
    text='Thank you for your participation!',
    font=font_choice,
    pos=(0, 0), height=0.035, wrapWidth=70, ori=0, 
    color=color_choice, colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
end = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "Welcome" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
# Run 'Begin Routine' code from code_5
Welcome_head.bold = True

key_resp_2.keys = []
key_resp_2.rt = []
_key_resp_2_allKeys = []
# keep track of which components have finished
WelcomeComponents = [Welcome_head, Welcome_text, key_resp_2]
for thisComponent in WelcomeComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "Welcome" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *Welcome_head* updates
    if Welcome_head.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Welcome_head.frameNStart = frameN  # exact frame index
        Welcome_head.tStart = t  # local t and not account for scr refresh
        Welcome_head.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Welcome_head, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Welcome_head.started')
        Welcome_head.setAutoDraw(True)
    
    # *Welcome_text* updates
    if Welcome_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Welcome_text.frameNStart = frameN  # exact frame index
        Welcome_text.tStart = t  # local t and not account for scr refresh
        Welcome_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Welcome_text, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Welcome_text.started')
        Welcome_text.setAutoDraw(True)
    
    # *key_resp_2* updates
    waitOnFlip = False
    if key_resp_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp_2.frameNStart = frameN  # exact frame index
        key_resp_2.tStart = t  # local t and not account for scr refresh
        key_resp_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp_2, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_resp_2.started')
        key_resp_2.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp_2.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp_2.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp_2.status == STARTED and not waitOnFlip:
        theseKeys = key_resp_2.getKeys(keyList=None, waitRelease=False)
        _key_resp_2_allKeys.extend(theseKeys)
        if len(_key_resp_2_allKeys):
            key_resp_2.keys = _key_resp_2_allKeys[-1].name  # just the last key pressed
            key_resp_2.rt = _key_resp_2_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in WelcomeComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "Welcome" ---
for thisComponent in WelcomeComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "Welcome" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "instr_train_s" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_resp_3.keys = []
key_resp_3.rt = []
_key_resp_3_allKeys = []
# keep track of which components have finished
instr_train_sComponents = [text_3, key_resp_3]
for thisComponent in instr_train_sComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "instr_train_s" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text_3* updates
    if text_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_3.frameNStart = frameN  # exact frame index
        text_3.tStart = t  # local t and not account for scr refresh
        text_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_3, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'text_3.started')
        text_3.setAutoDraw(True)
    
    # *key_resp_3* updates
    waitOnFlip = False
    if key_resp_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp_3.frameNStart = frameN  # exact frame index
        key_resp_3.tStart = t  # local t and not account for scr refresh
        key_resp_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp_3, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_resp_3.started')
        key_resp_3.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp_3.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp_3.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp_3.status == STARTED and not waitOnFlip:
        theseKeys = key_resp_3.getKeys(keyList=None, waitRelease=False)
        _key_resp_3_allKeys.extend(theseKeys)
        if len(_key_resp_3_allKeys):
            key_resp_3.keys = _key_resp_3_allKeys[-1].name  # just the last key pressed
            key_resp_3.rt = _key_resp_3_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instr_train_sComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "instr_train_s" ---
for thisComponent in instr_train_sComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "instr_train_s" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
training_social = data.TrialHandler(nReps=1, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('trainingtrials_social.xlsx', selection='0:4'),
    seed=None, name='training_social')
thisExp.addLoop(training_social)  # add the loop to the experiment
thisTraining_social = training_social.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTraining_social.rgb)
if thisTraining_social != None:
    for paramName in thisTraining_social:
        exec('{} = thisTraining_social[paramName]'.format(paramName))

for thisTraining_social in training_social:
    currentLoop = training_social
    # abbreviate parameter names if possible (e.g. rgb = thisTraining_social.rgb)
    if thisTraining_social != None:
        for paramName in thisTraining_social:
            exec('{} = thisTraining_social[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "training_trial" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from code_14
    if (currentLoop.name == "training_social" and currentLoop.thisN == 0) or (currentLoop.name == "trials" and currentLoop.thisN == 0 and Blocklist[blocks.thisRepN] == "social"):
        CueLeft = CueLeft_s_t
        CueRight = CueRight_s_t
        deco = "deco/bubble.png"
        deco_pos_left = (-0.6, -0.04)
        deco_pos_right = (0.6, -0.04)
    elif (currentLoop.name == "training_nonsocial" and currentLoop.thisN == 0) or (currentLoop.name == "trials" and currentLoop.thisN == 0 and Blocklist[blocks.thisRepN] == "nonsocial"):
        CueLeft = CueLeft_ns_t
        CueRight = CueRight_ns_t
        deco = "deco/button.png"
        deco_pos_left = (-0.6, -0.01)
        deco_pos_right = (0.6, -0.01)
    
    cue_left_path = CueLeft.path
    cue_right_path = CueRight.path
    
    
    new_neutral_3 = visual.MovieStim3(
        win=win, name='new_neutral_3', units='height',
        noAudio = True,
        filename=filename_neutral,
        ori=0, pos=[0, 0], opacity=1,
        loop=False, anchor='center',
        size=[0.625, 0.5],
        depth=-2.0,
        )
    deco_left_2.setPos(deco_pos_left)
    deco_left_2.setImage(deco)
    deco_right_2.setPos(deco_pos_right)
    deco_right_2.setImage(deco)
    cue_left_2.setImage(cue_left_path)
    cue_right_2.setImage(cue_right_path)
    slide_response_2.reset()
    # keep track of which components have finished
    training_trialComponents = [fix_cross_3, new_neutral_3, deco_left_2, deco_right_2, cue_left_2, cue_right_2, slide_response_2]
    for thisComponent in training_trialComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "training_trial" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *fix_cross_3* updates
        if fix_cross_3.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            fix_cross_3.frameNStart = frameN  # exact frame index
            fix_cross_3.tStart = t  # local t and not account for scr refresh
            fix_cross_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(fix_cross_3, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'fix_cross_3.started')
            fix_cross_3.setAutoDraw(True)
        if fix_cross_3.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > fix_cross_3.tStartRefresh + 1-frameTolerance:
                # keep track of stop time/frame for later
                fix_cross_3.tStop = t  # not accounting for scr refresh
                fix_cross_3.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'fix_cross_3.stopped')
                fix_cross_3.setAutoDraw(False)
        
        # *new_neutral_3* updates
        if new_neutral_3.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
            # keep track of start time/frame for later
            new_neutral_3.frameNStart = frameN  # exact frame index
            new_neutral_3.tStart = t  # local t and not account for scr refresh
            new_neutral_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(new_neutral_3, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'new_neutral_3.started')
            new_neutral_3.setAutoDraw(True)
        if new_neutral_3.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > new_neutral_3.tStartRefresh + 6-frameTolerance:
                # keep track of stop time/frame for later
                new_neutral_3.tStop = t  # not accounting for scr refresh
                new_neutral_3.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'new_neutral_3.stopped')
                new_neutral_3.setAutoDraw(False)
        if new_neutral_3.status == FINISHED:  # force-end the routine
            continueRoutine = False
        
        # *deco_left_2* updates
        if deco_left_2.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
            # keep track of start time/frame for later
            deco_left_2.frameNStart = frameN  # exact frame index
            deco_left_2.tStart = t  # local t and not account for scr refresh
            deco_left_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_left_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_left_2.started')
            deco_left_2.setAutoDraw(True)
        if deco_left_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_left_2.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_left_2.tStop = t  # not accounting for scr refresh
                deco_left_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_left_2.stopped')
                deco_left_2.setAutoDraw(False)
        
        # *deco_right_2* updates
        if deco_right_2.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
            # keep track of start time/frame for later
            deco_right_2.frameNStart = frameN  # exact frame index
            deco_right_2.tStart = t  # local t and not account for scr refresh
            deco_right_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_right_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_right_2.started')
            deco_right_2.setAutoDraw(True)
        if deco_right_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_right_2.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_right_2.tStop = t  # not accounting for scr refresh
                deco_right_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_right_2.stopped')
                deco_right_2.setAutoDraw(False)
        
        # *cue_left_2* updates
        if cue_left_2.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
            # keep track of start time/frame for later
            cue_left_2.frameNStart = frameN  # exact frame index
            cue_left_2.tStart = t  # local t and not account for scr refresh
            cue_left_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_left_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_left_2.started')
            cue_left_2.setAutoDraw(True)
        
        # *cue_right_2* updates
        if cue_right_2.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
            # keep track of start time/frame for later
            cue_right_2.frameNStart = frameN  # exact frame index
            cue_right_2.tStart = t  # local t and not account for scr refresh
            cue_right_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_right_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_right_2.started')
            cue_right_2.setAutoDraw(True)
        
        # *slide_response_2* updates
        if slide_response_2.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
            # keep track of start time/frame for later
            slide_response_2.frameNStart = frameN  # exact frame index
            slide_response_2.tStart = t  # local t and not account for scr refresh
            slide_response_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(slide_response_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'slide_response_2.started')
            slide_response_2.setAutoDraw(True)
        
        # Check slide_response_2 for response to end routine
        if slide_response_2.getRating() is not None and slide_response_2.status == STARTED:
            continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in training_trialComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "training_trial" ---
    for thisComponent in training_trialComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    new_neutral_3.stop()
    training_social.addData('slide_response_2.response', slide_response_2.getRating())
    training_social.addData('slide_response_2.rt', slide_response_2.getRT())
    # the Routine "training_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "feedback_train" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from code_9
    #Feedback Training
    
    print("SLIDER RESPONSE: ", slide_response_2.getRating())
    print("number of trial: ", currentLoop.thisN)
    
    times = train_times[currentLoop.thisN]
    
    if slide_response_2.getRating() == None:
        time_miss = 6.0
        time_h = 0
        time_a = 0
        resp = None
    else:
        time_miss = 0
        time_h = times[0]
        time_a = times[1]
        if slide_response_2.getRating() > 2.5:
            resp = "right"
        else:
            resp = "left"
        
    print("resp: ", resp)
    new_angry_2 = visual.MovieStim3(
        win=win, name='new_angry_2', units='height',
        noAudio = True,
        filename=filename_feedback_angry,
        ori=0, pos=[0, 0], opacity=1,
        loop=False, anchor='center',
        size=[0.625, 0.5],
        depth=-2.0,
        )
    new_happy_2 = visual.MovieStim3(
        win=win, name='new_happy_2', units='height',
        noAudio = False,
        filename=filename_feedback_happy,
        ori=0, pos=[0, 0], opacity=1,
        loop=False, anchor='center',
        size=[0.625, 0.5],
        depth=-3.0,
        )
    deco_left_fb.setPos(deco_pos_left)
    deco_left_fb.setImage(deco)
    deco_right_fb.setPos(deco_pos_right)
    deco_right_fb.setImage(deco)
    cue_left_fb.setImage(cue_left_path)
    cue_right_fb.setImage(cue_right_path)
    box_l.setOpacity(resp == "left")
    box_r.setOpacity(resp == "right")
    # keep track of which components have finished
    feedback_trainComponents = [feedback_miss, new_angry_2, new_happy_2, deco_left_fb, deco_right_fb, cue_left_fb, cue_right_fb, box_l, box_r]
    for thisComponent in feedback_trainComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "feedback_train" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *feedback_miss* updates
        if feedback_miss.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            feedback_miss.frameNStart = frameN  # exact frame index
            feedback_miss.tStart = t  # local t and not account for scr refresh
            feedback_miss.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(feedback_miss, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'feedback_miss.started')
            feedback_miss.setAutoDraw(True)
        if feedback_miss.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > feedback_miss.tStartRefresh + time_miss-frameTolerance:
                # keep track of stop time/frame for later
                feedback_miss.tStop = t  # not accounting for scr refresh
                feedback_miss.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'feedback_miss.stopped')
                feedback_miss.setAutoDraw(False)
        
        # *new_angry_2* updates
        if new_angry_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            new_angry_2.frameNStart = frameN  # exact frame index
            new_angry_2.tStart = t  # local t and not account for scr refresh
            new_angry_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(new_angry_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'new_angry_2.started')
            new_angry_2.setAutoDraw(True)
        if new_angry_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > new_angry_2.tStartRefresh + time_a-frameTolerance:
                # keep track of stop time/frame for later
                new_angry_2.tStop = t  # not accounting for scr refresh
                new_angry_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'new_angry_2.stopped')
                new_angry_2.setAutoDraw(False)
        
        # *new_happy_2* updates
        if new_happy_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            new_happy_2.frameNStart = frameN  # exact frame index
            new_happy_2.tStart = t  # local t and not account for scr refresh
            new_happy_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(new_happy_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'new_happy_2.started')
            new_happy_2.setAutoDraw(True)
        if new_happy_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > new_happy_2.tStartRefresh + time_h-frameTolerance:
                # keep track of stop time/frame for later
                new_happy_2.tStop = t  # not accounting for scr refresh
                new_happy_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'new_happy_2.stopped')
                new_happy_2.setAutoDraw(False)
        
        # *deco_left_fb* updates
        if deco_left_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            deco_left_fb.frameNStart = frameN  # exact frame index
            deco_left_fb.tStart = t  # local t and not account for scr refresh
            deco_left_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_left_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_left_fb.started')
            deco_left_fb.setAutoDraw(True)
        if deco_left_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_left_fb.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_left_fb.tStop = t  # not accounting for scr refresh
                deco_left_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_left_fb.stopped')
                deco_left_fb.setAutoDraw(False)
        
        # *deco_right_fb* updates
        if deco_right_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            deco_right_fb.frameNStart = frameN  # exact frame index
            deco_right_fb.tStart = t  # local t and not account for scr refresh
            deco_right_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_right_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_right_fb.started')
            deco_right_fb.setAutoDraw(True)
        if deco_right_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_right_fb.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_right_fb.tStop = t  # not accounting for scr refresh
                deco_right_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_right_fb.stopped')
                deco_right_fb.setAutoDraw(False)
        
        # *cue_left_fb* updates
        if cue_left_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            cue_left_fb.frameNStart = frameN  # exact frame index
            cue_left_fb.tStart = t  # local t and not account for scr refresh
            cue_left_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_left_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_left_fb.started')
            cue_left_fb.setAutoDraw(True)
        if cue_left_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > cue_left_fb.tStartRefresh + 6-frameTolerance:
                # keep track of stop time/frame for later
                cue_left_fb.tStop = t  # not accounting for scr refresh
                cue_left_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'cue_left_fb.stopped')
                cue_left_fb.setAutoDraw(False)
        
        # *cue_right_fb* updates
        if cue_right_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            cue_right_fb.frameNStart = frameN  # exact frame index
            cue_right_fb.tStart = t  # local t and not account for scr refresh
            cue_right_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_right_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_right_fb.started')
            cue_right_fb.setAutoDraw(True)
        if cue_right_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > cue_right_fb.tStartRefresh + 6-frameTolerance:
                # keep track of stop time/frame for later
                cue_right_fb.tStop = t  # not accounting for scr refresh
                cue_right_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'cue_right_fb.stopped')
                cue_right_fb.setAutoDraw(False)
        
        # *box_l* updates
        if box_l.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            box_l.frameNStart = frameN  # exact frame index
            box_l.tStart = t  # local t and not account for scr refresh
            box_l.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(box_l, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'box_l.started')
            box_l.setAutoDraw(True)
        if box_l.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > box_l.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                box_l.tStop = t  # not accounting for scr refresh
                box_l.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'box_l.stopped')
                box_l.setAutoDraw(False)
        
        # *box_r* updates
        if box_r.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            box_r.frameNStart = frameN  # exact frame index
            box_r.tStart = t  # local t and not account for scr refresh
            box_r.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(box_r, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'box_r.started')
            box_r.setAutoDraw(True)
        if box_r.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > box_r.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                box_r.tStop = t  # not accounting for scr refresh
                box_r.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'box_r.stopped')
                box_r.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in feedback_trainComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "feedback_train" ---
    for thisComponent in feedback_trainComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    new_angry_2.stop()
    new_happy_2.stop()
    # the Routine "feedback_train" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1 repeats of 'training_social'


# --- Prepare to start Routine "Alles_klar" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_resp_4.keys = []
key_resp_4.rt = []
_key_resp_4_allKeys = []
# keep track of which components have finished
Alles_klarComponents = [text_4, key_resp_4]
for thisComponent in Alles_klarComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "Alles_klar" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text_4* updates
    if text_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_4.frameNStart = frameN  # exact frame index
        text_4.tStart = t  # local t and not account for scr refresh
        text_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_4, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'text_4.started')
        text_4.setAutoDraw(True)
    
    # *key_resp_4* updates
    waitOnFlip = False
    if key_resp_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp_4.frameNStart = frameN  # exact frame index
        key_resp_4.tStart = t  # local t and not account for scr refresh
        key_resp_4.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp_4, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_resp_4.started')
        key_resp_4.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp_4.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp_4.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp_4.status == STARTED and not waitOnFlip:
        theseKeys = key_resp_4.getKeys(keyList=None, waitRelease=False)
        _key_resp_4_allKeys.extend(theseKeys)
        if len(_key_resp_4_allKeys):
            key_resp_4.keys = _key_resp_4_allKeys[-1].name  # just the last key pressed
            key_resp_4.rt = _key_resp_4_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Alles_klarComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "Alles_klar" ---
for thisComponent in Alles_klarComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "Alles_klar" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "instr_train_ns" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_resp_5.keys = []
key_resp_5.rt = []
_key_resp_5_allKeys = []
# keep track of which components have finished
instr_train_nsComponents = [text, key_resp_5]
for thisComponent in instr_train_nsComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "instr_train_ns" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text* updates
    if text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text.frameNStart = frameN  # exact frame index
        text.tStart = t  # local t and not account for scr refresh
        text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'text.started')
        text.setAutoDraw(True)
    
    # *key_resp_5* updates
    waitOnFlip = False
    if key_resp_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp_5.frameNStart = frameN  # exact frame index
        key_resp_5.tStart = t  # local t and not account for scr refresh
        key_resp_5.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp_5, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_resp_5.started')
        key_resp_5.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp_5.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp_5.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp_5.status == STARTED and not waitOnFlip:
        theseKeys = key_resp_5.getKeys(keyList=None, waitRelease=False)
        _key_resp_5_allKeys.extend(theseKeys)
        if len(_key_resp_5_allKeys):
            key_resp_5.keys = _key_resp_5_allKeys[-1].name  # just the last key pressed
            key_resp_5.rt = _key_resp_5_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in instr_train_nsComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "instr_train_ns" ---
for thisComponent in instr_train_nsComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "instr_train_ns" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
training_nonsocial = data.TrialHandler(nReps=1, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('trainingtrials_nonsocial.xlsx', selection='0:4'),
    seed=None, name='training_nonsocial')
thisExp.addLoop(training_nonsocial)  # add the loop to the experiment
thisTraining_nonsocial = training_nonsocial.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTraining_nonsocial.rgb)
if thisTraining_nonsocial != None:
    for paramName in thisTraining_nonsocial:
        exec('{} = thisTraining_nonsocial[paramName]'.format(paramName))

for thisTraining_nonsocial in training_nonsocial:
    currentLoop = training_nonsocial
    # abbreviate parameter names if possible (e.g. rgb = thisTraining_nonsocial.rgb)
    if thisTraining_nonsocial != None:
        for paramName in thisTraining_nonsocial:
            exec('{} = thisTraining_nonsocial[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "training_trial" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from code_14
    if (currentLoop.name == "training_social" and currentLoop.thisN == 0) or (currentLoop.name == "trials" and currentLoop.thisN == 0 and Blocklist[blocks.thisRepN] == "social"):
        CueLeft = CueLeft_s_t
        CueRight = CueRight_s_t
        deco = "deco/bubble.png"
        deco_pos_left = (-0.6, -0.04)
        deco_pos_right = (0.6, -0.04)
    elif (currentLoop.name == "training_nonsocial" and currentLoop.thisN == 0) or (currentLoop.name == "trials" and currentLoop.thisN == 0 and Blocklist[blocks.thisRepN] == "nonsocial"):
        CueLeft = CueLeft_ns_t
        CueRight = CueRight_ns_t
        deco = "deco/button.png"
        deco_pos_left = (-0.6, -0.01)
        deco_pos_right = (0.6, -0.01)
    
    cue_left_path = CueLeft.path
    cue_right_path = CueRight.path
    
    
    new_neutral_3 = visual.MovieStim3(
        win=win, name='new_neutral_3', units='height',
        noAudio = True,
        filename=filename_neutral,
        ori=0, pos=[0, 0], opacity=1,
        loop=False, anchor='center',
        size=[0.625, 0.5],
        depth=-2.0,
        )
    deco_left_2.setPos(deco_pos_left)
    deco_left_2.setImage(deco)
    deco_right_2.setPos(deco_pos_right)
    deco_right_2.setImage(deco)
    cue_left_2.setImage(cue_left_path)
    cue_right_2.setImage(cue_right_path)
    slide_response_2.reset()
    # keep track of which components have finished
    training_trialComponents = [fix_cross_3, new_neutral_3, deco_left_2, deco_right_2, cue_left_2, cue_right_2, slide_response_2]
    for thisComponent in training_trialComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "training_trial" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *fix_cross_3* updates
        if fix_cross_3.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            fix_cross_3.frameNStart = frameN  # exact frame index
            fix_cross_3.tStart = t  # local t and not account for scr refresh
            fix_cross_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(fix_cross_3, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'fix_cross_3.started')
            fix_cross_3.setAutoDraw(True)
        if fix_cross_3.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > fix_cross_3.tStartRefresh + 1-frameTolerance:
                # keep track of stop time/frame for later
                fix_cross_3.tStop = t  # not accounting for scr refresh
                fix_cross_3.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'fix_cross_3.stopped')
                fix_cross_3.setAutoDraw(False)
        
        # *new_neutral_3* updates
        if new_neutral_3.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
            # keep track of start time/frame for later
            new_neutral_3.frameNStart = frameN  # exact frame index
            new_neutral_3.tStart = t  # local t and not account for scr refresh
            new_neutral_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(new_neutral_3, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'new_neutral_3.started')
            new_neutral_3.setAutoDraw(True)
        if new_neutral_3.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > new_neutral_3.tStartRefresh + 6-frameTolerance:
                # keep track of stop time/frame for later
                new_neutral_3.tStop = t  # not accounting for scr refresh
                new_neutral_3.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'new_neutral_3.stopped')
                new_neutral_3.setAutoDraw(False)
        if new_neutral_3.status == FINISHED:  # force-end the routine
            continueRoutine = False
        
        # *deco_left_2* updates
        if deco_left_2.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
            # keep track of start time/frame for later
            deco_left_2.frameNStart = frameN  # exact frame index
            deco_left_2.tStart = t  # local t and not account for scr refresh
            deco_left_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_left_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_left_2.started')
            deco_left_2.setAutoDraw(True)
        if deco_left_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_left_2.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_left_2.tStop = t  # not accounting for scr refresh
                deco_left_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_left_2.stopped')
                deco_left_2.setAutoDraw(False)
        
        # *deco_right_2* updates
        if deco_right_2.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
            # keep track of start time/frame for later
            deco_right_2.frameNStart = frameN  # exact frame index
            deco_right_2.tStart = t  # local t and not account for scr refresh
            deco_right_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_right_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_right_2.started')
            deco_right_2.setAutoDraw(True)
        if deco_right_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_right_2.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_right_2.tStop = t  # not accounting for scr refresh
                deco_right_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_right_2.stopped')
                deco_right_2.setAutoDraw(False)
        
        # *cue_left_2* updates
        if cue_left_2.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
            # keep track of start time/frame for later
            cue_left_2.frameNStart = frameN  # exact frame index
            cue_left_2.tStart = t  # local t and not account for scr refresh
            cue_left_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_left_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_left_2.started')
            cue_left_2.setAutoDraw(True)
        
        # *cue_right_2* updates
        if cue_right_2.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
            # keep track of start time/frame for later
            cue_right_2.frameNStart = frameN  # exact frame index
            cue_right_2.tStart = t  # local t and not account for scr refresh
            cue_right_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_right_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_right_2.started')
            cue_right_2.setAutoDraw(True)
        
        # *slide_response_2* updates
        if slide_response_2.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
            # keep track of start time/frame for later
            slide_response_2.frameNStart = frameN  # exact frame index
            slide_response_2.tStart = t  # local t and not account for scr refresh
            slide_response_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(slide_response_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'slide_response_2.started')
            slide_response_2.setAutoDraw(True)
        
        # Check slide_response_2 for response to end routine
        if slide_response_2.getRating() is not None and slide_response_2.status == STARTED:
            continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in training_trialComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "training_trial" ---
    for thisComponent in training_trialComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    new_neutral_3.stop()
    training_nonsocial.addData('slide_response_2.response', slide_response_2.getRating())
    training_nonsocial.addData('slide_response_2.rt', slide_response_2.getRT())
    # the Routine "training_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "feedback_train" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from code_9
    #Feedback Training
    
    print("SLIDER RESPONSE: ", slide_response_2.getRating())
    print("number of trial: ", currentLoop.thisN)
    
    times = train_times[currentLoop.thisN]
    
    if slide_response_2.getRating() == None:
        time_miss = 6.0
        time_h = 0
        time_a = 0
        resp = None
    else:
        time_miss = 0
        time_h = times[0]
        time_a = times[1]
        if slide_response_2.getRating() > 2.5:
            resp = "right"
        else:
            resp = "left"
        
    print("resp: ", resp)
    new_angry_2 = visual.MovieStim3(
        win=win, name='new_angry_2', units='height',
        noAudio = True,
        filename=filename_feedback_angry,
        ori=0, pos=[0, 0], opacity=1,
        loop=False, anchor='center',
        size=[0.625, 0.5],
        depth=-2.0,
        )
    new_happy_2 = visual.MovieStim3(
        win=win, name='new_happy_2', units='height',
        noAudio = False,
        filename=filename_feedback_happy,
        ori=0, pos=[0, 0], opacity=1,
        loop=False, anchor='center',
        size=[0.625, 0.5],
        depth=-3.0,
        )
    deco_left_fb.setPos(deco_pos_left)
    deco_left_fb.setImage(deco)
    deco_right_fb.setPos(deco_pos_right)
    deco_right_fb.setImage(deco)
    cue_left_fb.setImage(cue_left_path)
    cue_right_fb.setImage(cue_right_path)
    box_l.setOpacity(resp == "left")
    box_r.setOpacity(resp == "right")
    # keep track of which components have finished
    feedback_trainComponents = [feedback_miss, new_angry_2, new_happy_2, deco_left_fb, deco_right_fb, cue_left_fb, cue_right_fb, box_l, box_r]
    for thisComponent in feedback_trainComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "feedback_train" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *feedback_miss* updates
        if feedback_miss.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            feedback_miss.frameNStart = frameN  # exact frame index
            feedback_miss.tStart = t  # local t and not account for scr refresh
            feedback_miss.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(feedback_miss, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'feedback_miss.started')
            feedback_miss.setAutoDraw(True)
        if feedback_miss.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > feedback_miss.tStartRefresh + time_miss-frameTolerance:
                # keep track of stop time/frame for later
                feedback_miss.tStop = t  # not accounting for scr refresh
                feedback_miss.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'feedback_miss.stopped')
                feedback_miss.setAutoDraw(False)
        
        # *new_angry_2* updates
        if new_angry_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            new_angry_2.frameNStart = frameN  # exact frame index
            new_angry_2.tStart = t  # local t and not account for scr refresh
            new_angry_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(new_angry_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'new_angry_2.started')
            new_angry_2.setAutoDraw(True)
        if new_angry_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > new_angry_2.tStartRefresh + time_a-frameTolerance:
                # keep track of stop time/frame for later
                new_angry_2.tStop = t  # not accounting for scr refresh
                new_angry_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'new_angry_2.stopped')
                new_angry_2.setAutoDraw(False)
        
        # *new_happy_2* updates
        if new_happy_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            new_happy_2.frameNStart = frameN  # exact frame index
            new_happy_2.tStart = t  # local t and not account for scr refresh
            new_happy_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(new_happy_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'new_happy_2.started')
            new_happy_2.setAutoDraw(True)
        if new_happy_2.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > new_happy_2.tStartRefresh + time_h-frameTolerance:
                # keep track of stop time/frame for later
                new_happy_2.tStop = t  # not accounting for scr refresh
                new_happy_2.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'new_happy_2.stopped')
                new_happy_2.setAutoDraw(False)
        
        # *deco_left_fb* updates
        if deco_left_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            deco_left_fb.frameNStart = frameN  # exact frame index
            deco_left_fb.tStart = t  # local t and not account for scr refresh
            deco_left_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_left_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_left_fb.started')
            deco_left_fb.setAutoDraw(True)
        if deco_left_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_left_fb.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_left_fb.tStop = t  # not accounting for scr refresh
                deco_left_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_left_fb.stopped')
                deco_left_fb.setAutoDraw(False)
        
        # *deco_right_fb* updates
        if deco_right_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            deco_right_fb.frameNStart = frameN  # exact frame index
            deco_right_fb.tStart = t  # local t and not account for scr refresh
            deco_right_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(deco_right_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'deco_right_fb.started')
            deco_right_fb.setAutoDraw(True)
        if deco_right_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > deco_right_fb.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                deco_right_fb.tStop = t  # not accounting for scr refresh
                deco_right_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'deco_right_fb.stopped')
                deco_right_fb.setAutoDraw(False)
        
        # *cue_left_fb* updates
        if cue_left_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            cue_left_fb.frameNStart = frameN  # exact frame index
            cue_left_fb.tStart = t  # local t and not account for scr refresh
            cue_left_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_left_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_left_fb.started')
            cue_left_fb.setAutoDraw(True)
        if cue_left_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > cue_left_fb.tStartRefresh + 6-frameTolerance:
                # keep track of stop time/frame for later
                cue_left_fb.tStop = t  # not accounting for scr refresh
                cue_left_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'cue_left_fb.stopped')
                cue_left_fb.setAutoDraw(False)
        
        # *cue_right_fb* updates
        if cue_right_fb.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            cue_right_fb.frameNStart = frameN  # exact frame index
            cue_right_fb.tStart = t  # local t and not account for scr refresh
            cue_right_fb.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue_right_fb, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'cue_right_fb.started')
            cue_right_fb.setAutoDraw(True)
        if cue_right_fb.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > cue_right_fb.tStartRefresh + 6-frameTolerance:
                # keep track of stop time/frame for later
                cue_right_fb.tStop = t  # not accounting for scr refresh
                cue_right_fb.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'cue_right_fb.stopped')
                cue_right_fb.setAutoDraw(False)
        
        # *box_l* updates
        if box_l.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            box_l.frameNStart = frameN  # exact frame index
            box_l.tStart = t  # local t and not account for scr refresh
            box_l.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(box_l, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'box_l.started')
            box_l.setAutoDraw(True)
        if box_l.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > box_l.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                box_l.tStop = t  # not accounting for scr refresh
                box_l.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'box_l.stopped')
                box_l.setAutoDraw(False)
        
        # *box_r* updates
        if box_r.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            box_r.frameNStart = frameN  # exact frame index
            box_r.tStart = t  # local t and not account for scr refresh
            box_r.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(box_r, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'box_r.started')
            box_r.setAutoDraw(True)
        if box_r.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > box_r.tStartRefresh + 6.0-frameTolerance:
                # keep track of stop time/frame for later
                box_r.tStop = t  # not accounting for scr refresh
                box_r.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'box_r.stopped')
                box_r.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in feedback_trainComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "feedback_train" ---
    for thisComponent in feedback_trainComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    new_angry_2.stop()
    new_happy_2.stop()
    # the Routine "feedback_train" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1 repeats of 'training_nonsocial'


# --- Prepare to start Routine "Alles_Klar_2" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
Allesklar_resp_2.keys = []
Allesklar_resp_2.rt = []
_Allesklar_resp_2_allKeys = []
# keep track of which components have finished
Alles_Klar_2Components = [Allesklartext_2, Allesklar_resp_2]
for thisComponent in Alles_Klar_2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "Alles_Klar_2" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *Allesklartext_2* updates
    if Allesklartext_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Allesklartext_2.frameNStart = frameN  # exact frame index
        Allesklartext_2.tStart = t  # local t and not account for scr refresh
        Allesklartext_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Allesklartext_2, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Allesklartext_2.started')
        Allesklartext_2.setAutoDraw(True)
    
    # *Allesklar_resp_2* updates
    waitOnFlip = False
    if Allesklar_resp_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Allesklar_resp_2.frameNStart = frameN  # exact frame index
        Allesklar_resp_2.tStart = t  # local t and not account for scr refresh
        Allesklar_resp_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Allesklar_resp_2, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Allesklar_resp_2.started')
        Allesklar_resp_2.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(Allesklar_resp_2.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(Allesklar_resp_2.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if Allesklar_resp_2.status == STARTED and not waitOnFlip:
        theseKeys = Allesklar_resp_2.getKeys(keyList=None, waitRelease=False)
        _Allesklar_resp_2_allKeys.extend(theseKeys)
        if len(_Allesklar_resp_2_allKeys):
            Allesklar_resp_2.keys = _Allesklar_resp_2_allKeys[-1].name  # just the last key pressed
            Allesklar_resp_2.rt = _Allesklar_resp_2_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Alles_Klar_2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "Alles_Klar_2" ---
for thisComponent in Alles_Klar_2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "Alles_Klar_2" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
blocks = data.TrialHandler(nReps=4, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
    seed=None, name='blocks')
thisExp.addLoop(blocks)  # add the loop to the experiment
thisBlock = blocks.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
if thisBlock != None:
    for paramName in thisBlock:
        exec('{} = thisBlock[paramName]'.format(paramName))

for thisBlock in blocks:
    currentLoop = blocks
    # abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
    if thisBlock != None:
        for paramName in thisBlock:
            exec('{} = thisBlock[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "BlockCode" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from BlockCode1
    #Define filenames according to Block
    if Blocklist[blocks.thisRepN]== "social":
        trial_file = "trainingtrials_social.xlsx"
        #filenames_noxl = [
        #    ["ADFES/Freigestellt/Neutral/F01-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/F01-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/F01-Anger-Face Forward_freigestellt.mp4"],
        #   ["ADFES/Freigestellt/Neutral/F04-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/F04-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/F04-Anger-Face Forward_freigestellt.mp4"],
        #   ["ADFES/Freigestellt/Neutral/M06-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/M06-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/M06-Anger-Face Forward_freigestellt.mp4"],
        #   ["ADFES/Freigestellt/Neutral/M02-Neutral-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Joy/Used/M02-Joy-Face Forward_freigestellt.mp4", "ADFES/Freigestellt/Anger/M02-Anger-Face Forward_freigestellt.mp4"]
        #]
    elif Blocklist[blocks.thisRepN] == "nonsocial":
        trial_file = "trainingtrials_nonsocial.xlsx"
        #filenames_noxl = [
        #   ["Mandalas_new/neutral/Mandala3_neutral.mp4", "Mandalas_new/happy/Mandala3_happy.mp4", "Mandalas_new/angry/Mandala3_angry.mp4"],
        #   ["Mandalas_new/neutral/Mandala2_neutral.mp4", "Mandalas_new/happy/Mandala2_happy.mp4", "Mandalas_new/angry/Mandala2_angry.mp4"],
        #   ["Mandalas_new/neutral/Mandala4_neutral.mp4", "Mandalas_new/happy/Mandala4_happy.mp4", "Mandalas_new/angry/Mandala4_angry.mp4"],
        #   ["Mandalas_new/neutral/Mandala1_neutral.mp4", "Mandalas_new/happy/Mandala1_happy.mp4", "Mandalas_new/angry/Mandala1_angry.mp4"]
        #]
    
    # keep track of which components have finished
    BlockCodeComponents = []
    for thisComponent in BlockCodeComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "BlockCode" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in BlockCodeComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "BlockCode" ---
    for thisComponent in BlockCodeComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # the Routine "BlockCode" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    cycles = data.TrialHandler(nReps=1, method='sequential', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='cycles')
    thisExp.addLoop(cycles)  # add the loop to the experiment
    thisCycle = cycles.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisCycle.rgb)
    if thisCycle != None:
        for paramName in thisCycle:
            exec('{} = thisCycle[paramName]'.format(paramName))
    
    for thisCycle in cycles:
        currentLoop = cycles
        # abbreviate parameter names if possible (e.g. rgb = thisCycle.rgb)
        if thisCycle != None:
            for paramName in thisCycle:
                exec('{} = thisCycle[paramName]'.format(paramName))
        
        # --- Prepare to start Routine "LateralizationByCycle" ---
        continueRoutine = True
        routineForceEnded = False
        # update component parameters for each repeat
        # Run 'Begin Routine' code from code_8
        #Define Text, dependent on Block and Cycle
        if blocks.thisN == 0 and cycles.thisRepN == 0:
            CycleText1_dur = 10
            CycleText2_dur = 0
            CycleText3_dur = 0
            CycleText4_dur = 0
        elif blocks.thisN in [0, 1, 2, 3] and cycles.thisRepN == 1:
            CycleText1_dur = 0
            CycleText2_dur = 10
            CycleText3_dur = 0
            CycleText4_dur = 0
        elif blocks.thisN in [0, 1, 2, 3] and cycles.thisRepN in [2, 3, 4, 5, 6, 7, 8]:
            CycleText1_dur = 0
            CycleText2_dur = 0
            CycleText3_dur = 10
            CycleText4_dur = 0
        elif blocks.thisN in [1, 2, 3] and cycles.thisRepN == 0:
            CycleText1_dur = 0
            CycleText2_dur = 0
            CycleText3_dur = 0
            CycleText4_dur = 10
        CycleText3.setText('PAUSE\n\nPress any key, to start the next cycle.')
        key_resp_6.keys = []
        key_resp_6.rt = []
        _key_resp_6_allKeys = []
        # keep track of which components have finished
        LateralizationByCycleComponents = [CycleText1, CycleText2, CycleText3, CycleText4, key_resp_6]
        for thisComponent in LateralizationByCycleComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "LateralizationByCycle" ---
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *CycleText1* updates
            if CycleText1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                CycleText1.frameNStart = frameN  # exact frame index
                CycleText1.tStart = t  # local t and not account for scr refresh
                CycleText1.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(CycleText1, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'CycleText1.started')
                CycleText1.setAutoDraw(True)
            if CycleText1.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > CycleText1.tStartRefresh + CycleText1_dur-frameTolerance:
                    # keep track of stop time/frame for later
                    CycleText1.tStop = t  # not accounting for scr refresh
                    CycleText1.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'CycleText1.stopped')
                    CycleText1.setAutoDraw(False)
            
            # *CycleText2* updates
            if CycleText2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                CycleText2.frameNStart = frameN  # exact frame index
                CycleText2.tStart = t  # local t and not account for scr refresh
                CycleText2.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(CycleText2, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'CycleText2.started')
                CycleText2.setAutoDraw(True)
            if CycleText2.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > CycleText2.tStartRefresh + CycleText2_dur-frameTolerance:
                    # keep track of stop time/frame for later
                    CycleText2.tStop = t  # not accounting for scr refresh
                    CycleText2.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'CycleText2.stopped')
                    CycleText2.setAutoDraw(False)
            
            # *CycleText3* updates
            if CycleText3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                CycleText3.frameNStart = frameN  # exact frame index
                CycleText3.tStart = t  # local t and not account for scr refresh
                CycleText3.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(CycleText3, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'CycleText3.started')
                CycleText3.setAutoDraw(True)
            if CycleText3.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > CycleText3.tStartRefresh + CycleText3_dur-frameTolerance:
                    # keep track of stop time/frame for later
                    CycleText3.tStop = t  # not accounting for scr refresh
                    CycleText3.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'CycleText3.stopped')
                    CycleText3.setAutoDraw(False)
            
            # *CycleText4* updates
            if CycleText4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                CycleText4.frameNStart = frameN  # exact frame index
                CycleText4.tStart = t  # local t and not account for scr refresh
                CycleText4.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(CycleText4, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'CycleText4.started')
                CycleText4.setAutoDraw(True)
            if CycleText4.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > CycleText4.tStartRefresh + CycleText4_dur-frameTolerance:
                    # keep track of stop time/frame for later
                    CycleText4.tStop = t  # not accounting for scr refresh
                    CycleText4.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'CycleText4.stopped')
                    CycleText4.setAutoDraw(False)
            
            # *key_resp_6* updates
            waitOnFlip = False
            if key_resp_6.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                key_resp_6.frameNStart = frameN  # exact frame index
                key_resp_6.tStart = t  # local t and not account for scr refresh
                key_resp_6.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(key_resp_6, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'key_resp_6.started')
                key_resp_6.status = STARTED
                # keyboard checking is just starting
                waitOnFlip = True
                win.callOnFlip(key_resp_6.clock.reset)  # t=0 on next screen flip
                win.callOnFlip(key_resp_6.clearEvents, eventType='keyboard')  # clear events on next screen flip
            if key_resp_6.status == STARTED and not waitOnFlip:
                theseKeys = key_resp_6.getKeys(keyList=None, waitRelease=False)
                _key_resp_6_allKeys.extend(theseKeys)
                if len(_key_resp_6_allKeys):
                    key_resp_6.keys = _key_resp_6_allKeys[-1].name  # just the last key pressed
                    key_resp_6.rt = _key_resp_6_allKeys[-1].rt
                    # a response ends the routine
                    continueRoutine = False
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in LateralizationByCycleComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "LateralizationByCycle" ---
        for thisComponent in LateralizationByCycleComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "LateralizationByCycle" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # set up handler to look after randomisation of conditions etc
        trials = data.TrialHandler(nReps=1, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='trials')
        thisExp.addLoop(trials)  # add the loop to the experiment
        thisTrial = trials.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
        if thisTrial != None:
            for paramName in thisTrial:
                exec('{} = thisTrial[paramName]'.format(paramName))
        
        for thisTrial in trials:
            currentLoop = trials
            # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
            if thisTrial != None:
                for paramName in thisTrial:
                    exec('{} = thisTrial[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "trial" ---
            continueRoutine = True
            routineForceEnded = False
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_4
            if (currentLoop.name == "training_social" and currentLoop.thisN == 0) or (currentLoop.name == "trials" and currentLoop.thisN == 0 and Blocklist[blocks.thisRepN] == "social"):
                CueLeft = CueLeft_s
                CueRight = CueRight_s
                deco = "deco/bubble.png"
                deco_pos_left = (-0.6, -0.04)
                deco_pos_right = (0.6, -0.04)
            elif (currentLoop.name == "training_nonsocial" and currentLoop.thisN == 0) or (currentLoop.name == "trials" and currentLoop.thisN == 0 and Blocklist[blocks.thisRepN] == "nonsocial"):
                CueLeft = CueLeft_ns
                CueRight = CueRight_ns
                deco = "deco/button.png"
                deco_pos_left = (-0.6, -0.01)
                deco_pos_right = (0.6, -0.01)
            
            CueLeft, CueRight = switchSides(CueLeft, CueRight)
            
            cue_left_path = CueLeft.path
            cue_right_path = CueRight.path
            
            
            new_neutral = visual.MovieStim3(
                win=win, name='new_neutral', units='height',
                noAudio = True,
                filename=filename_neutral,
                ori=0, pos=[0, 0], opacity=1,
                loop=False, anchor='center',
                size=[0.625, 0.5],
                depth=-2.0,
                )
            deco_left.setPos(deco_pos_left)
            deco_left.setImage(deco)
            deco_right.setPos(deco_pos_right)
            deco_right.setImage(deco)
            cue_left.setImage(cue_left_path)
            cue_right.setImage(cue_right_path)
            slide_response.reset()
            # keep track of which components have finished
            trialComponents = [fix_cross, new_neutral, deco_left, deco_right, cue_left, cue_right, slide_response]
            for thisComponent in trialComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "trial" ---
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *fix_cross* updates
                if fix_cross.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    fix_cross.frameNStart = frameN  # exact frame index
                    fix_cross.tStart = t  # local t and not account for scr refresh
                    fix_cross.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(fix_cross, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'fix_cross.started')
                    fix_cross.setAutoDraw(True)
                if fix_cross.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > fix_cross.tStartRefresh + 1-frameTolerance:
                        # keep track of stop time/frame for later
                        fix_cross.tStop = t  # not accounting for scr refresh
                        fix_cross.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'fix_cross.stopped')
                        fix_cross.setAutoDraw(False)
                
                # *new_neutral* updates
                if new_neutral.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
                    # keep track of start time/frame for later
                    new_neutral.frameNStart = frameN  # exact frame index
                    new_neutral.tStart = t  # local t and not account for scr refresh
                    new_neutral.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(new_neutral, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'new_neutral.started')
                    new_neutral.setAutoDraw(True)
                if new_neutral.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > new_neutral.tStartRefresh + 6-frameTolerance:
                        # keep track of stop time/frame for later
                        new_neutral.tStop = t  # not accounting for scr refresh
                        new_neutral.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'new_neutral.stopped')
                        new_neutral.setAutoDraw(False)
                if new_neutral.status == FINISHED:  # force-end the routine
                    continueRoutine = False
                
                # *deco_left* updates
                if deco_left.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
                    # keep track of start time/frame for later
                    deco_left.frameNStart = frameN  # exact frame index
                    deco_left.tStart = t  # local t and not account for scr refresh
                    deco_left.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(deco_left, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'deco_left.started')
                    deco_left.setAutoDraw(True)
                if deco_left.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > deco_left.tStartRefresh + 6.0-frameTolerance:
                        # keep track of stop time/frame for later
                        deco_left.tStop = t  # not accounting for scr refresh
                        deco_left.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'deco_left.stopped')
                        deco_left.setAutoDraw(False)
                
                # *deco_right* updates
                if deco_right.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
                    # keep track of start time/frame for later
                    deco_right.frameNStart = frameN  # exact frame index
                    deco_right.tStart = t  # local t and not account for scr refresh
                    deco_right.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(deco_right, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'deco_right.started')
                    deco_right.setAutoDraw(True)
                if deco_right.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > deco_right.tStartRefresh + 6.0-frameTolerance:
                        # keep track of stop time/frame for later
                        deco_right.tStop = t  # not accounting for scr refresh
                        deco_right.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'deco_right.stopped')
                        deco_right.setAutoDraw(False)
                
                # *cue_left* updates
                if cue_left.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                    # keep track of start time/frame for later
                    cue_left.frameNStart = frameN  # exact frame index
                    cue_left.tStart = t  # local t and not account for scr refresh
                    cue_left.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(cue_left, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'cue_left.started')
                    cue_left.setAutoDraw(True)
                
                # *cue_right* updates
                if cue_right.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                    # keep track of start time/frame for later
                    cue_right.frameNStart = frameN  # exact frame index
                    cue_right.tStart = t  # local t and not account for scr refresh
                    cue_right.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(cue_right, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'cue_right.started')
                    cue_right.setAutoDraw(True)
                
                # *slide_response* updates
                if slide_response.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                    # keep track of start time/frame for later
                    slide_response.frameNStart = frameN  # exact frame index
                    slide_response.tStart = t  # local t and not account for scr refresh
                    slide_response.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(slide_response, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'slide_response.started')
                    slide_response.setAutoDraw(True)
                
                # Check slide_response for response to end routine
                if slide_response.getRating() is not None and slide_response.status == STARTED:
                    continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in trialComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "trial" ---
            for thisComponent in trialComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            new_neutral.stop()
            trials.addData('slide_response.response', slide_response.getRating())
            trials.addData('slide_response.rt', slide_response.getRT())
            # the Routine "trial" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # --- Prepare to start Routine "feedback_trials" ---
            continueRoutine = True
            routineForceEnded = False
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_13
            #Feedback Training
            
            print("block: ", blocks.thisN)
            print("blockType: ", Blocklist[blocks.thisRepN])
            print("trial: ", currentLoop.thisN)
            print("SLIDER RESPONSE: ", slide_response.getRating())
            
            
            if slide_response.getRating() == None:
                time_miss = 6.0
                time_h = 0
                time_a = 0
                resp = None
            else:
                if slide_response.getRating() > 2.5:
                    resp = "right"
                    times = CueRight.get_response()
                    print("resp: ", resp)
                    print("CueRight.path: ", CueRight.path)
                    print("CueRight.prob: ", CueRight.prob)
                    print("times: ", times)
                else:
                    resp = "left"
                    times = CueLeft.get_response()
                    print("resp: ", resp)
                    print("CueLeft.path: ", CueLeft.path)
                    print("CueLeft.prob: ", CueLeft.prob)
                    print("times: ", times)
                time_h = times[0]
                time_a = times[1]
                time_miss = 0
                
            
            new_angry_5 = visual.MovieStim3(
                win=win, name='new_angry_5', units='height',
                noAudio = True,
                filename=filename_feedback_angry,
                ori=0, pos=[0, 0], opacity=1,
                loop=False, anchor='center',
                size=[0.625, 0.5],
                depth=-2.0,
                )
            new_happy_5 = visual.MovieStim3(
                win=win, name='new_happy_5', units='height',
                noAudio = False,
                filename=filename_feedback_happy,
                ori=0, pos=[0, 0], opacity=1,
                loop=False, anchor='center',
                size=[0.625, 0.5],
                depth=-3.0,
                )
            deco_left_fb_2.setPos(deco_pos_left)
            deco_left_fb_2.setImage(deco)
            deco_right_fb_2.setPos(deco_pos_right)
            deco_right_fb_2.setImage(deco)
            cue_left_fb_2.setImage(cue_left_path)
            cue_right_fb_2.setImage(cue_right_path)
            box_l_2.setOpacity(resp == "left")
            box_r_2.setOpacity(resp == "right")
            # keep track of which components have finished
            feedback_trialsComponents = [feedback_miss_2, new_angry_5, new_happy_5, deco_left_fb_2, deco_right_fb_2, cue_left_fb_2, cue_right_fb_2, box_l_2, box_r_2]
            for thisComponent in feedback_trialsComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "feedback_trials" ---
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *feedback_miss_2* updates
                if feedback_miss_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    feedback_miss_2.frameNStart = frameN  # exact frame index
                    feedback_miss_2.tStart = t  # local t and not account for scr refresh
                    feedback_miss_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(feedback_miss_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'feedback_miss_2.started')
                    feedback_miss_2.setAutoDraw(True)
                if feedback_miss_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > feedback_miss_2.tStartRefresh + time_miss-frameTolerance:
                        # keep track of stop time/frame for later
                        feedback_miss_2.tStop = t  # not accounting for scr refresh
                        feedback_miss_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'feedback_miss_2.stopped')
                        feedback_miss_2.setAutoDraw(False)
                
                # *new_angry_5* updates
                if new_angry_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    new_angry_5.frameNStart = frameN  # exact frame index
                    new_angry_5.tStart = t  # local t and not account for scr refresh
                    new_angry_5.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(new_angry_5, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'new_angry_5.started')
                    new_angry_5.setAutoDraw(True)
                if new_angry_5.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > new_angry_5.tStartRefresh + time_a-frameTolerance:
                        # keep track of stop time/frame for later
                        new_angry_5.tStop = t  # not accounting for scr refresh
                        new_angry_5.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'new_angry_5.stopped')
                        new_angry_5.setAutoDraw(False)
                
                # *new_happy_5* updates
                if new_happy_5.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    new_happy_5.frameNStart = frameN  # exact frame index
                    new_happy_5.tStart = t  # local t and not account for scr refresh
                    new_happy_5.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(new_happy_5, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'new_happy_5.started')
                    new_happy_5.setAutoDraw(True)
                if new_happy_5.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > new_happy_5.tStartRefresh + time_h-frameTolerance:
                        # keep track of stop time/frame for later
                        new_happy_5.tStop = t  # not accounting for scr refresh
                        new_happy_5.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'new_happy_5.stopped')
                        new_happy_5.setAutoDraw(False)
                
                # *deco_left_fb_2* updates
                if deco_left_fb_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    deco_left_fb_2.frameNStart = frameN  # exact frame index
                    deco_left_fb_2.tStart = t  # local t and not account for scr refresh
                    deco_left_fb_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(deco_left_fb_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'deco_left_fb_2.started')
                    deco_left_fb_2.setAutoDraw(True)
                if deco_left_fb_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > deco_left_fb_2.tStartRefresh + 6.0-frameTolerance:
                        # keep track of stop time/frame for later
                        deco_left_fb_2.tStop = t  # not accounting for scr refresh
                        deco_left_fb_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'deco_left_fb_2.stopped')
                        deco_left_fb_2.setAutoDraw(False)
                
                # *deco_right_fb_2* updates
                if deco_right_fb_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    deco_right_fb_2.frameNStart = frameN  # exact frame index
                    deco_right_fb_2.tStart = t  # local t and not account for scr refresh
                    deco_right_fb_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(deco_right_fb_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'deco_right_fb_2.started')
                    deco_right_fb_2.setAutoDraw(True)
                if deco_right_fb_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > deco_right_fb_2.tStartRefresh + 6.0-frameTolerance:
                        # keep track of stop time/frame for later
                        deco_right_fb_2.tStop = t  # not accounting for scr refresh
                        deco_right_fb_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'deco_right_fb_2.stopped')
                        deco_right_fb_2.setAutoDraw(False)
                
                # *cue_left_fb_2* updates
                if cue_left_fb_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    cue_left_fb_2.frameNStart = frameN  # exact frame index
                    cue_left_fb_2.tStart = t  # local t and not account for scr refresh
                    cue_left_fb_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(cue_left_fb_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'cue_left_fb_2.started')
                    cue_left_fb_2.setAutoDraw(True)
                if cue_left_fb_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > cue_left_fb_2.tStartRefresh + 6-frameTolerance:
                        # keep track of stop time/frame for later
                        cue_left_fb_2.tStop = t  # not accounting for scr refresh
                        cue_left_fb_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'cue_left_fb_2.stopped')
                        cue_left_fb_2.setAutoDraw(False)
                
                # *cue_right_fb_2* updates
                if cue_right_fb_2.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    cue_right_fb_2.frameNStart = frameN  # exact frame index
                    cue_right_fb_2.tStart = t  # local t and not account for scr refresh
                    cue_right_fb_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(cue_right_fb_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'cue_right_fb_2.started')
                    cue_right_fb_2.setAutoDraw(True)
                if cue_right_fb_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > cue_right_fb_2.tStartRefresh + 6-frameTolerance:
                        # keep track of stop time/frame for later
                        cue_right_fb_2.tStop = t  # not accounting for scr refresh
                        cue_right_fb_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'cue_right_fb_2.stopped')
                        cue_right_fb_2.setAutoDraw(False)
                
                # *box_l_2* updates
                if box_l_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    box_l_2.frameNStart = frameN  # exact frame index
                    box_l_2.tStart = t  # local t and not account for scr refresh
                    box_l_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(box_l_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'box_l_2.started')
                    box_l_2.setAutoDraw(True)
                if box_l_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > box_l_2.tStartRefresh + 6.0-frameTolerance:
                        # keep track of stop time/frame for later
                        box_l_2.tStop = t  # not accounting for scr refresh
                        box_l_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'box_l_2.stopped')
                        box_l_2.setAutoDraw(False)
                
                # *box_r_2* updates
                if box_r_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    box_r_2.frameNStart = frameN  # exact frame index
                    box_r_2.tStart = t  # local t and not account for scr refresh
                    box_r_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(box_r_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'box_r_2.started')
                    box_r_2.setAutoDraw(True)
                if box_r_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > box_r_2.tStartRefresh + 6.0-frameTolerance:
                        # keep track of stop time/frame for later
                        box_r_2.tStop = t  # not accounting for scr refresh
                        box_r_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'box_r_2.stopped')
                        box_r_2.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in feedback_trialsComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "feedback_trials" ---
            for thisComponent in feedback_trialsComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # Run 'End Routine' code from code_13
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
            new_angry_5.stop()
            new_happy_5.stop()
            # the Routine "feedback_trials" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # --- Prepare to start Routine "Intertrial_Interval" ---
            continueRoutine = True
            routineForceEnded = False
            # update component parameters for each repeat
            # keep track of which components have finished
            Intertrial_IntervalComponents = [text_2]
            for thisComponent in Intertrial_IntervalComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "Intertrial_Interval" ---
            while continueRoutine and routineTimer.getTime() < 1.0:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *text_2* updates
                if text_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_2.frameNStart = frameN  # exact frame index
                    text_2.tStart = t  # local t and not account for scr refresh
                    text_2.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_2, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'text_2.started')
                    text_2.setAutoDraw(True)
                if text_2.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > text_2.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        text_2.tStop = t  # not accounting for scr refresh
                        text_2.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'text_2.stopped')
                        text_2.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in Intertrial_IntervalComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "Intertrial_Interval" ---
            for thisComponent in Intertrial_IntervalComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.000000)
            thisExp.nextEntry()
            
        # completed 1 repeats of 'trials'
        
        
        # --- Prepare to start Routine "LatCounter" ---
        continueRoutine = True
        routineForceEnded = False
        # update component parameters for each repeat
        # keep track of which components have finished
        LatCounterComponents = []
        for thisComponent in LatCounterComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "LatCounter" ---
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in LatCounterComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "LatCounter" ---
        for thisComponent in LatCounterComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "LatCounter" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
    # completed 1 repeats of 'cycles'
    
    
    # --- Prepare to start Routine "BlockCounter" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # keep track of which components have finished
    BlockCounterComponents = []
    for thisComponent in BlockCounterComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "BlockCounter" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in BlockCounterComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "BlockCounter" ---
    for thisComponent in BlockCounterComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # the Routine "BlockCounter" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
# completed 4 repeats of 'blocks'


# --- Prepare to start Routine "Thanks" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
end.keys = []
end.rt = []
_end_allKeys = []
# keep track of which components have finished
ThanksComponents = [Thank, end]
for thisComponent in ThanksComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "Thanks" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *Thank* updates
    if Thank.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Thank.frameNStart = frameN  # exact frame index
        Thank.tStart = t  # local t and not account for scr refresh
        Thank.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Thank, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Thank.started')
        Thank.setAutoDraw(True)
    
    # *end* updates
    waitOnFlip = False
    if end.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        end.frameNStart = frameN  # exact frame index
        end.tStart = t  # local t and not account for scr refresh
        end.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(end, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'end.started')
        end.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(end.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(end.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if end.status == STARTED and not waitOnFlip:
        theseKeys = end.getKeys(keyList=None, waitRelease=False)
        _end_allKeys.extend(theseKeys)
        if len(_end_allKeys):
            end.keys = _end_allKeys[-1].name  # just the last key pressed
            end.rt = _end_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in ThanksComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "Thanks" ---
for thisComponent in ThanksComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "Thanks" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
