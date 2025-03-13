      terminal 1:
      cd colors_manager
      npm start

      terminal 2:
      cd colors_manager
      npm run dev

app se odaziva na portu - http://localhost:5173/

svako brisanje boje na dugme "obrisi" brisace unesece vrednosti u fajlu db.json

bilo bi dobro prilikom testiranja posmatrati fajl db.json , pa na ctrl+Z vracati sve obrisanje boje

ZA POKRETANJE PROJEKTA KORISTI SE Json server koji simulira backend
API koristeći db.json fajl kao bazu podataka.

U aplikaciji koristi se Vite za frontend,
a Vite podrzava mogucnost podesavanja proxy-ja za API pozive.

Kad frontend posalje zahtev za /colors, Vite preusmerava ovaj zahtev na http://localhost:5000/colors.
JSON Server obradi zahtev, modifikuje db.json (ako je to potrebno, npr. dodavanje, brisanje podataka) i vraca odgovor sa podacima.

Nodemon automatski pokrece restart JSON Servera, sto omogucava da se odma vide promene

DUMMY DATA za db.json ,
{
"colors": [
{ "id": 1, "name": "Red", "hex": "#FF0000" },
{ "id": 2, "name": "Light Red", "hex": "#FF6666" },
{ "id": 3, "name": "Dark Red", "hex": "#990000" },

    { "id": 4, "name": "Blue", "hex": "#0000FF" },
    { "id": 5, "name": "Light Blue", "hex": "#6699FF" },
    { "id": 6, "name": "Dark Blue", "hex": "#000099" },

    { "id": 7, "name": "Green", "hex": "#00FF00" },
    { "id": 8, "name": "Light Green", "hex": "#99FF99" },
    { "id": 9, "name": "Dark Green", "hex": "#006600" },

    { "id": 10, "name": "Yellow", "hex": "#FFFF00" },
    { "id": 11, "name": "Light Yellow", "hex": "#FFFF99" },
    { "id": 12, "name": "Dark Yellow", "hex": "#CCCC00" },

    { "id": 13, "name": "Purple", "hex": "#800080" },
    { "id": 14, "name": "Light Purple", "hex": "#D699FF" },
    { "id": 15, "name": "Dark Purple", "hex": "#4B0082" }

]
}
