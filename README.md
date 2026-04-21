---


# Bokningssystem – Prestandajämförelse mellan MySQL och MongoDB

Detta projekt utvecklades som en del av ett **examensarbete inom Webbutveckling och programmering**  
(Informationsteknologi med inriktning mot webbprogrammering).

Syftet med projektet är att jämföra prestanda mellan två databashanterare:  
**MySQL (relationsdatabas)** och **MongoDB (dokumentbaserad databas)**, med fokus på responstid för vanliga operationer i en webbapplikation.

---

## Funktioner

- Skapa bokningar
- Söka bokningar
- Hämta bokningshistorik
- Separata paneler för MySQL och MongoDB
- Automatiserad prestandatestning (API + webbläsare)

---

## Teknik

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript
- **Databaser:** MySQL, MongoDB
- **Verktyg:** MySQL Workbench, MongoDB Compass
- **Testning:** Automatiserade tester och webbläsarbaserad testning

---

## Prestandatestning

Systemet mäter responstid för tre centrala operationer:

- **Bokning** (INSERT / insertOne)
- **Sökning** (LIKE / regex)
- **Historik** (SELECT / find + sortering)

Tester genomfördes med:

- 100 iterationer  
- 500 iterationer  
- 1000 iterationer  

Resultaten exporterades till CSV och visualiserades med externa verktyg.

---

## Resultat

- **MongoDB** presterade bättre vid skrivoperationer (bokning)
- **MySQL** presterade bättre vid strukturerade frågor (sökning och historik)
- Prestanda beror på typen av operation, inte enbart databashanteraren

---

## Metod

- Kontrollerad lokal testmiljö
- Identisk frontend och API-struktur för båda databaser
- Automatiserade tester för konsekventa resultat
- Responstid mättes med `performance.now()`

---

## 📂 Projektstruktur



# Booking System Performance Study (MySQL vs MongoDB)

This project was developed as part of a **Bachelor’s Thesis in Web Development and Programming**  
(Information Technology with a specialization in Web Programming).

The purpose of the project is to compare the performance of two database management systems:  
**MySQL (relational database)** and **MongoDB (document-based database)**, focusing on response time for common operations in a web application.

---

## Features

- Create bookings
- Search bookings
- View booking history
- Separate panels for MySQL and MongoDB
- Automated performance testing (API + browser-based)

---

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript
- **Databases:** MySQL, MongoDB
- **Tools:** MySQL Workbench, MongoDB Compass
- **Testing:** Automated scripts and browser-based testing

---

## Performance Testing

The system measures response time for three key operations:

- **Booking** (INSERT / insertOne)
- **Search** (LIKE / regex)
- **History** (SELECT / find + sorting)

Tests were conducted using:

- 100 iterations  
- 500 iterations  
- 1000 iterations  

Results were exported to CSV and visualized using external tools.

---

## Key Findings

- **MongoDB** performed better for write operations (booking)
- **MySQL** performed better for structured queries (search and history)
- Performance depends on the type of operation rather than the database alone

---

## Methodology

- Controlled local test environment
- Identical frontend and API structure for both databases
- Automated testing for consistency and reproducibility
- Response time measured using `performance.now()`

---

## 📂 Project Structure
