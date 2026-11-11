# Duo leveling guide data (../../duo/)

The route is hand-written in `route.js` (Horde, 40-60, WoW Forever). The rest is generated:

1. `node extract-questie.js` decodes the installed QuestieDB (Forever flavor, GPL v3) into `questie.json`.
2. `node naowh-index.js` makes `naowh-ref.json`, a local index of which quest IDs exist in each Forever zone,
   read from the installed NaowhForever_DiscoveryData addon. That addon is all rights reserved: the index is
   only used locally to find quests that QuestieDB lacks, and nothing from it is published.
3. `node fetch-tooltips.js` caches Wowhead Forever quest tooltips (objective text and counts) in `tooltips.json`.
4. `node build-candidates.js` merges these into `candidates.json` and rates each quest for a duo.
5. `node build-duo.js` reads `route.js` + `candidates.json` + `../../dungeons/data.json` and writes `../../duo/data.json`.

`node list-zone.js "Zone Name"` prints a zone's candidates when editing the route.
The JSON files here are generated and git-ignored.

## RestedXP guide addon

`node build-rxp.js "D:/World of Warcraft/_forever_/Interface/AddOns"` turns `../../duo/data.json` into the
`RXP_DuoGuide` addon (one RXP guide per chapter, chained with #next), writes it to `../../duo/rxp/` and installs a copy.
Then zip it for the site: `Compress-Archive -Path RXP_DuoGuide -DestinationPath RXP_DuoGuide.zip -Force` in `duo/rxp`.
`rxp-maps.txt` is the list of zone names RXPGuides knows on Forever (from its DB/forever/db.lua).
RXP's in-game import box only takes RestedXP's encrypted strings, so a registering addon is the way in.
