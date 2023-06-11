export const CLASSE_LEVEL = [
    {shorName: "6ème", name: "Sixième", speciality: false, allSpeciality: false},
    {shorName: "5ème", name: "Cinquième", speciality: false, allSpeciality: false},
    {shorName: "4ème", name: "Quatrième", speciality: false, allSpeciality: false},
    {shorName: "3ème", name: "Troisième", speciality: false, allSpeciality: false},
    {shorName: "2nd", name: "Seconde" , speciality: true, allSpeciality: false},   
    {shorName: "1ère", name: "Prémière", speciality: true, allSpeciality: true},
    {shorName: "Tle", name: "Terminal", speciality: true, allSpeciality: true},
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