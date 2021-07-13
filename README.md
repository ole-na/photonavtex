# APP PhotoNavTex

At the end of neufische intensive coding bootcamp (https://www.neuefische.de/en/weiterbildung/java/hamburg) I have implemented this app for nautical warning messages as my graduation project.

NAVTEX is  an international system for maritime safety information (MSI) which includes navigational warnings, weather forecasts and weather warnings, search and rescue notices and similar information to ships. PhotoNavTex helps to indicate two types of warnings: **A** (navigational warnings) and **D** (Search And Rescue information and pirate attack warnings). It displays the position of saved warnings on the OpenStreetMap as basis map and on OpenSeaMap as overlay.

## NAVTEX 

### NAVTEX messages 

The messages are coded with a letter representing the broadcasting station, the type of message and then followed by two signs which indicate the messages serial number.

For example: **FA56** where 
- **F** is the ID of the transmitting station, 
- **A** indicates the message category navigational warning, 
- **56** is the consecutive message number. 

The messages are printed (and/or displayed) by the NAVTEX receiver in the exactly defined transmission format:

```
ZCZC B1B2B3B4

MESSAGE TEXT

NNNN
```

#### NAVTEX message transmission format:

- **ZCZC** indicates the start of the message.
- The **B1** character is a letter (A-Z) identifying the transmitter coverage area - NAVTEX CRS identifier.
The **B2** character is a letter (A-Z) for each message type. This character is referred to as the subject indicator (explained in the following table).
- **B3** and **B4** constitute a two digit serial number for each message. Starting with 01, the sequence ends with serial number 99. This number is used by receivers to avoid printing messages previously received. The serial number 00 is reserved for messages of the highest priority, these are distress relay messages, and are always printed.
- MESSAGE TEXT begins with the NAVTEX CRS transmitter name and time of transmission.
- **NNNN** indicates the end of the message.

### Examples of NAVTEX messages:

```
ZCZC OA20 (ERROR RATE = 1 %)

WZ 1593
SCOTLAND, WEST COAST. SUMMER ISLES. The NORTH 
CARDINAL LIGHTBUOY AND THE WEST CARDINAL
LIGHT*UOY WITH RACON DELTA MARKING DANGEROUS
WRECK
58-01.2 NORTH 005-27.1 WEST HAVE BEEN
PERMANENTLY WITHDRAWN
CANCEL WZ 1562
(OA07).

NNNN
```


```
ZCZC LD00
020710 UTC JUN 07
LIMNOS RADIO SARWARN 0007/07

SEMI SUNK BOAT WITH
THREE (3) MEN OVERBOARD
IN PSN 39-07,7N 026-39,2E
SHIPS IN VICINITY ARE REQUESTED TO
PROCEED FOR SEARCH OPERATIONS
INFORMING JRCC PIRAEUS

NNNN
```

## Technologies:

Java, Spring, MongoDB, Maven, Lombock, JUnit, JavaScript, React, HTML, CSS, Material UI, Leaflet, React-Leaflet, OpenStreetMap, OpenSeaMap, Tesseract

## Plugins with MIT licence:

- Nautical mile scale for React-Leaflet (https://github.com/Marfle/react-leaflet-nmscale)
- Material AutoRotatingCarousel (https://www.npmjs.com/package/material-auto-rotating-carousel)
- Leaflet-Ruler (https://github.com/gokertanrisever/leaflet-ruler)
- Leaflet.Locate (https://github.com/domoritz/leaflet-locatecontrol)
- Responsive sidebar for Leaflet (https://github.com/noerw/leaflet-sidebar-v2)
- React Images Uploading (https://www.npmjs.com/package/react-images-uploading)
- React Spinners (https://www.npmjs.com/package/react-spinners)
- Tesseract.js (https://tesseract.projectnaptha.com/)

## Information about NAVTEX:

- https://www.egmdss.com/gmdss-courses/mod/page/view.php?id=84
- https://www.skipperguide.de/wiki/NAVTEX
- https://en.wikipedia.org/wiki/NAVTEX
