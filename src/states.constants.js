// Menu page ---------------->
const BgNightStates = {
    MAIN: 'main',
    SHOOTING: 'shooting_star',
};


// Basic concepts page ---------------->
const Ball0States = {
    SQUASH: 'Squash-Stretch',
    FINAL: 'Final',
    EASEINOUT: 'Ease In Ease Out',
    LINEAR: 'Linear'
};

const Ball1States = {
    SQUASH: 'Squash - Strech',
    EASEINOUT: 'Ease in -  Ease out',
    LINEAR: 'linear '
};

const Ball2States = {
    SQUASH: 'Squash-Stretch',
};

const StarsMachine = {
    DEFAULT: 'State Machine 1'
}

const StarsStates = {
    FIVESTARS: '5_stars',
};

const NutStates = {
    HOVER: 'hover',
    IDLE: 'idle'
};


// State machines page ---------------->
const EmojiMachine = {
        BASIC: 'BasicosStateMachine'
}

const EmojiBasicosStates = {
    INDIFFERENT: 'triggerIndiferente',
    ISYELLOW: 'isAmarillo',
};

const BallMachine = {
    DEFAULT: 'StateMachine'
}

const BallButtonMachine = {
    DEFAULT: 'StateMachine'
}

const BallButtonStates = {
    NORMAL: 'Normal',
    LEVEL: 'Nivel',
    HOVER: 'Hover',
    PRESSED: 'Pulsado' 
}


// Text animated page ---------------->
const TextMachine = {
    DEFAULT: 'StateMachine1'
}

const FaceMachine = {
    DEFAULT: 'State Machine 1'
}

const SkullyMachine = {
    DEFAULT: 'State Machine [Skully]'
}


// Common animations ---------------->
const ArrowMachine = {
    MORPH: 'Morph'
}

const ArrowMorphStates = {
    TOARROW: 'ToArrow',
    TOMENU: 'ToMenu',
    ASARROW: 'AsArrow'
};


export {
    ArrowMachine,
    ArrowMorphStates,
    BgNightStates,
    Ball0States,
    Ball1States,
    Ball2States,
    StarsMachine,
    StarsStates,
    NutStates,
    EmojiMachine,
    EmojiBasicosStates,
    BallMachine,
    BallButtonMachine,
    BallButtonStates,
    TextMachine,
    FaceMachine,
    SkullyMachine
}
