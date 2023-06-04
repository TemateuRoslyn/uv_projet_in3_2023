<?php 

if(!defined('CLASSE_SPECIALITY')) define('CLASSE_SPECIALITY', [
    'a' => 'A',
    'c' => 'C',
    'd' => 'D',
]);

if(!defined('CLASSE_LEVEL')) define('CLASSE_LEVEL', [
    0 => 'Terminal',
    1 => 'Prémière',
    2 => 'Seconde',
    3 => 'Troisième',
    4 => 'Quatrième',
    5 => 'Cinquième',
    6 => 'Sixième',
]);

if(!defined('ALL_SCHOOL_CLASSES')) define('ALL_SCHOOL_CLASSES', [
    // terminal A 
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['a'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'speciality' => CLASSE_SPECIALITY['a'],
        'shortName' => 'Tle',
        'no' => '2',
        'effectif' => 0
    ],
    // Terminal C 
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'speciality' => CLASSE_SPECIALITY['c'],
        'shortName' => 'Tle',
        'no' => '3',
        'effectif' => 0
    ],
    // terminal D
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Terminal',
        'shortName' => 'Tle',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '5',
        'effectif' => 0
    ],
    // Premiere A
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['a'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['a'],
        'no' => '2',
        'effectif' => 0
    ],
    // premiere C
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '3',
        'effectif' => 0
    ],
    // premiere D
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Prémière',
        'shortName' => '1ère',
        'speciality' => CLASSE_SPECIALITY['d'],
        'no' => '5',
        'effectif' => 0
    ],
    // Seconde A
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['a'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['a'],
        'no' => '2',
        'effectif' => 0
    ],
    // Seconde C
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Seconde',
        'shortName' => '2nd',
        'speciality' => CLASSE_SPECIALITY['c'],
        'no' => '5',
        'effectif' => 0
    ],
    // Troisieme
    [
        'name' => 'Troisième',
        'shortName' => '3ème',
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Troisième',
        'shortName' => '3ème',
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Troisième',
        'shortName' => '3ème',
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Troisième',
        'shortName' => '3ème',
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Troisième',
        'shortName' => '3ème',
        'no' => '5',
        'effectif' => 0
    ],
    // Quatrième
    [
        'name' => 'Quatrième',
        'shortName' => '4ème',
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Quatrième',
        'shortName' => '4ème',
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Quatrième',
        'shortName' => '4ème',
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Quatrième',
        'shortName' => '4ème',
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Quatrième',
        'shortName' => '4ème',
        'no' => '5',
        'effectif' => 0
    ],
    // Cinquième
    [
        'name' => 'Cinquième',
        'shortName' => '5ème',
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Cinquième',
        'shortName' => '5ème',
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Cinquième',
        'shortName' => '5ème',
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Cinquième',
        'shortName' => '5ème',
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Cinquième',
        'shortName' => '5ème',
        'no' => '5',
        'effectif' => 0
    ],
    // Sixième
    [
        'name' => 'Sixième',
        'shortName' => '6ème',
        'no' => '1',
        'effectif' => 0
    ],
    [
        'name' => 'Sixième',
        'shortName' => '6ème',
        'no' => '2',
        'effectif' => 0
    ],
    [
        'name' => 'Sixième',
        'shortName' => '6ème',
        'no' => '3',
        'effectif' => 0
    ],
    [
        'name' => 'Sixième',
        'shortName' => '6ème',
        'no' => '4',
        'effectif' => 0
    ],
    [
        'name' => 'Sixième',
        'shortName' => '6ème',
        'no' => '5',
        'effectif' => 0
    ],
    
]);
