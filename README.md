# APP PhotoNavTex
App for nautical warning messages

## NAVTEX 

NAVTEX is an international, automated system for instantly distributing maritime safety information (MSI) which includes navigational warnings, weather forecasts and weather warnings, search and rescue notices and similar information to ships.

The messages are coded with a header code identified by the using single letters of the alphabet to represent broadcasting stations, type of messages, and followed by two figures indicating the serial number of the message. 

For example: **FA56** where 
- **F** is the ID of the transmitting station, 
- **A** indicates the message category navigational warning, 
- **56** is the consecutive message number.

### NAVTEX messages 

are printed (and/or displayed) by the NAVTEX receiver in the exactly defined transmission format:

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


**A**: Navigational warnings (cannot be rejected by the receiver)
**D**: SAR (Search And Rescue) information and pirate attack warnings (cannot be rejected by the receiver)

Infos:
- https://www.egmdss.com/gmdss-courses/mod/page/view.php?id=84
- https://www.skipperguide.de/wiki/NAVTEX
- https://en.wikipedia.org/wiki/NAVTEX
