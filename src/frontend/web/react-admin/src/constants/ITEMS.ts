export const CLASSE_LEVEL: 
{
    shorName: string, 
    name: string, 
    speciality: boolean, 
    allSpeciality: boolean, 
    specialities?: object}[] = [
    {shorName: "6ème", name: "Sixième", speciality: false, allSpeciality: false},
    {shorName: "5ème", name: "Cinquième", speciality: false, allSpeciality: false},
    {shorName: "4ème", name: "Quatrième", speciality: false, allSpeciality: false},
    {shorName: "3ème", name: "Troisième", speciality: false, allSpeciality: false},
    {shorName: "2nd", name: "Seconde" , speciality: true, allSpeciality: false, specialities: {a: "A", c: "C"}},   
    {shorName: "1ère", name: "Prémière", speciality: true, allSpeciality: true, specialities: {a: "A", c: "C", d: "D"}},
    {shorName: "Tle", name: "Terminal", speciality: true, allSpeciality: true,  specialities: {a: "A", c: "C", d: "D"}},
]

export const CLASSE_ALL_SPECIALITIES = [
    {name: "A"},
    {name: "C"},
    {name: "D" }
]

export const CLASSE_SPECIALITIES = [
    {name: "A"},
    {name: "C"},
]

export const getClasseByName = (name:string) => {
    return CLASSE_LEVEL.find((classe) => classe.name === name);
  }

export const SEXE: {name: string, value: string}[] = [
    {name: "Masculin", value: "Masculin"},
    {name: "Féminin", value: "Féminin"},
]

export const SOLVABLE: {name: string, value: boolean}[] = [
    {name: "Payé", value: true},
    {name: "Impeyé", value: false},
]

export const STATUS_P: {name: string}[] = [
    {name: "Proviseur"},
    {name: "Censeur"},
    {name: "SG"},
    {name: "Enseignant"},
]

export const STATUS: {name: string, value: boolean}[] = [
    {name: "Nouveau(elle)", value: true},
    {name: "Redoublant(e)", value: false},
]
