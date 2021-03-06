import React from "react"; //quasi sempre necessario

const changes = [ // definizione di un array di 6 elementi dove ogni elemento è una sorta di struttura dati di 4 elementi
    {version:"0.19.55", nome: "giangi", dataPush: "19/03 16:14", info:"aggiungere le impostazioni in modo dinamico"},
    {version:"0.19.54", nome: "giangi", dataPush: "18/03 12:17", info:"tentato di aggiungere le impostazioni in modo dinamico ma fallito. per qualche motivo prende l' header ma non il resto."},
    {version:"0.19.53", nome: "giangi", dataPush: "15/03 23:33", info:"aggiunti mazzi di commenti ma ancora troppo pochi"},
    {version:"0.19.52", nome: "giangi", dataPush: "15/03 12:17", info:"aggiunto changeLog abbastanza funzionante"},
    {version:"0.19.51", nome: "giangi", dataPush: "14/03 12:17", info:"aggiunto change log anche se male"},
    {version:"miao", nome: "miao", dataPush: "miao", info:"miao"}
];

//const version = "0.19.54";  //semplice definizione di una stringa
const version = changes[0].version;  //definisco la versione prendendo il campo "version" del primo elemento dell'array

export {changes, version}; // seve per esportare i 2 oggetti e quindi renderli visibili fuori dal file
