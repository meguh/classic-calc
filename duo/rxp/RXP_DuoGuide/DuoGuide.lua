-- Duo leveling route, Horde 40-60, WoW Forever. Generated from classiccraft.app/duo/ by tools/duo/build-rxp.js.
local faction = UnitFactionGroup("player")
if faction == "Alliance" then return end
if not RXPGuides or not RXPGuides.RegisterGuide then return end

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-43 Tanaris
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 40-42 Dungeon: Scarlet Monastery: Cathedral

step
    #completewith start
    +|cRXP_WARN_Tanaris|r (40-43). Two big shared-kill quests right outside Gadgetzan, and a pirate cove that clears in one sweep. Duo tip: Set your hearthstone in Gadgetzan; you come back here twice (Zul'Farrak and the 44-45 quests). Skip: WANTED: Andre Firebeard (head drop); Pirate Hats Ahoy! (20 hats, slow drop); Gahz'ridian (30 ground pickups); The Thirsty Goblin (30 glands); Water Pouch Bounty (drop).
step
    #label start
    .goto Tanaris,52.5,28.5
    >>Talk to |cRXP_FRIENDLY_Chief Engineer Bilgewhizzle|r
    .accept 1690 >>Accept Wastewander Justice
    .target Chief Engineer Bilgewhizzle
step
    .goto Tanaris,50.2,27.5
    >>Talk to |cRXP_FRIENDLY_Senior Surveyor Fizzledowser|r
    .accept 992 >>Accept Gadgetzan Water Survey
    .target Senior Surveyor Fizzledowser
step
    .goto Tanaris,51.1,27.9
    >>Talk to |cRXP_FRIENDLY_Quinn|r
    .accept 97534 >>Accept Gritty Business
    .target Quinn
step
    .goto Tanaris,52.4,28.4
    >>Talk to |cRXP_FRIENDLY_Chief Engineer Bilgewhizzle|r
    .accept 2768 >>Accept Divino-matic Rod
    .target Chief Engineer Bilgewhizzle
step
    .goto Tanaris,51.4,26.8
    >>Talk to |cRXP_FRIENDLY_Tran'rek|r
    .accept 2865 >>Accept Scarab Shells
    .target Tran'rek
step
    .goto Tanaris,51.4,28.6
    >>Talk to |cRXP_FRIENDLY_Trenton Lighthammer|r
    .accept 3042 >>Accept Troll Temper
    .target Trenton Lighthammer
step
    .goto Tanaris,62.7,29.3
    >>Kill Wastewander Bandits and Thieves in the camps east of Gadgetzan
    .complete -1690,1 --Wastewander Bandit (10)
    .mob +Wastewander Bandit
    .complete -1690,2 --Wastewander Thief (10)
    .mob +Wastewander Thief
step
    .goto Tanaris,39,29
    >>Use the Dowsing Widget at the water west of Gadgetzan
    .complete -992,1 --Tapped Dowsing Widget (1)
    .use 8584
step
    .goto Tanaris,52.5,28.5
    >>Back in Gadgetzan turn in and pick up the follow-up
    .turnin -1690 >>Turn in Wastewander Justice
    .target +Chief Engineer Bilgewhizzle
    .turnin -992 >>Turn in Gadgetzan Water Survey
    .target +Senior Surveyor Fizzledowser
step
    .goto Tanaris,52.5,28.5
    >>Talk to |cRXP_FRIENDLY_Chief Engineer Bilgewhizzle|r
    .accept 1691,2,1690 >>Accept More Wastewander Justice
    .target Chief Engineer Bilgewhizzle
step
    .goto Tanaris,62,37.4
    >>Kill Wastewander Rogues, Assassins and Shadow Mages further south-east
    .complete -1691,1 --Wastewander Rogue (8)
    .mob +Wastewander Rogue
    .complete -1691,2 --Wastewander Assassin (6)
    .mob +Wastewander Assassin
    .complete -1691,3 --Wastewander Shadow Mage (10)
    .mob +Wastewander Shadow Mage
step
    .goto Tanaris,52.5,28.5
    >>Turn in at Gadgetzan
    .turnin -1691 >>Turn in More Wastewander Justice
    .target Chief Engineer Bilgewhizzle
step
    #completewith next
    .goto Tanaris,67,23,40 >>Ride to Steamwheedle Port
step
    .goto Tanaris,67.1,23.9
    >>Talk to |cRXP_FRIENDLY_Security Chief Bilgewhizzle|r
    .accept 8366 >>Accept Southsea Shakedown
    .target Security Chief Bilgewhizzle
step
    .goto Tanaris,67.1,24
    >>Talk to |cRXP_FRIENDLY_Stoley|r
    .accept 2873 >>Accept Stoley's Shipment
    .target Stoley
step
    .goto Tanaris,67,22.4
    >>Talk to |cRXP_FRIENDLY_Yeh'kinya|r
    .accept 3520 >>Accept Screecher Spirits
    .target Yeh'kinya
step
    .goto Tanaris,73.7,46.4
    >>Lost Rigger Cove: kill every Southsea type and grab Stoley's crate
    .complete -8366,1 --Southsea Pirate (10)
    .mob +Southsea Pirate
    .complete -8366,2 --Southsea Freebooter (10)
    .mob +Southsea Freebooter
    .complete -8366,3 --Southsea Dock Worker (10)
    .mob +Southsea Dock Worker
    .complete -8366,4 --Southsea Swashbuckler (10)
    .mob +Southsea Swashbuckler
    .complete -2873,1 --Stoley's Shipment (1)
step
    .goto Tanaris,67,23
    >>Turn in at Steamwheedle Port
    .turnin -8366 >>Turn in Southsea Shakedown
    .target +Security Chief Bilgewhizzle
    .turnin -2873 >>Turn in Stoley's Shipment
    .target +Stoley
    >>Keep Screecher Spirits for Feralas. Stoley's Shipment leads to a delivery in Booty Bay; take it only if you are heading there.
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-42 Dungeon: Scarlet Monastery: Cathedral
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 40-42 Dungeon: Razorfen Downs

step
    #completewith start
    +|cRXP_WARN_Scarlet Monastery: Cathedral|r (40-42). The heart of the Scarlet Monastery: the Chapel Gardens and the Crusader's Chapel, held by Scarlet Commander Mograine and High Inquisitor Whitemane. The door is locked: you need The Scarlet Key from the Library.
step
    #label start
    .goto Undercity,56.2,92.6
    >>Talk to |cRXP_FRIENDLY_Varimathras|r
    .accept 1048 >>Accept Into The Scarlet Monastery
    .target Varimathras
step
    .goto Undercity,48,69
    >>Talk to |cRXP_FRIENDLY_Master Apothecary Faranell|r. Chain: Going, Going, Guano!
    .accept 1113 >>Accept Hearts of Zeal
    .target Master Apothecary Faranell
    .isQuestTurnedIn 1109
step
    #completewith next
    .goto Tirisfal Glades,82.6,33.8,40 >>Travel to the Scarlet Monastery: Cathedral entrance
step
    #label run
    >>Run Scarlet Monastery: Cathedral and do its quests
    .complete -1048,1 --High Inquisitor Whitemane
    .mob +High Inquisitor Whitemane
    .complete -1048,2 --Scarlet Commander Mograine
    .mob +Scarlet Commander Mograine
    .complete -1048,3 --Herod
    .mob +Herod
    .complete -1048,4 --Houndmaster Loksey
    .mob +Houndmaster Loksey
    .complete -1113,1 --Heart of Zeal
step
    .goto Undercity,56.2,92.6
    >>Talk to |cRXP_FRIENDLY_Varimathras|r
    .turnin -1048,1 >>Turn in Into The Scarlet Monastery
    .target Varimathras
step
    .goto Undercity,48,69
    >>Talk to |cRXP_FRIENDLY_Master Apothecary Faranell|r
    .turnin -1113,1 >>Turn in Hearts of Zeal
    .target Master Apothecary Faranell
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-42 Dungeon: Razorfen Downs
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 41-45 Dungeon: Uldaman

step
    #completewith start
    +|cRXP_WARN_Razorfen Downs|r (40-42). The ancient burial grounds of the quilboar, now held by the Scourge. Amnennar the Coldbringer leads the undead from the top of the Downs.
step
    #label start
    .goto The Barrens,49,94.8
    >>Talk to |cRXP_FRIENDLY_Myriam Moonsinger|r
    .accept 6626 >>Accept A Host of Evil
    .target Myriam Moonsinger
step
    .goto Mulgore,34.4,22.8
    >>Talk to |cRXP_FRIENDLY_Sutara Plainstalker|r
    .accept 97196 >>Accept The Coldbringer's Eye
    .target Sutara Plainstalker
step
    .goto Undercity,74,32.4
    >>Talk to |cRXP_FRIENDLY_Andrew Brownell|r
    .accept 3341 >>Accept Bring the End
    .target Andrew Brownell
step
    .goto Undercity,56.2,92.6
    >>Talk to |cRXP_FRIENDLY_Varimathras|r. Chain: An Unholy Alliance
    .accept 6521 >>Accept An Unholy Alliance
    .target Varimathras
    .isQuestTurnedIn 6522
step
    #completewith run
    >>Inside: Belnistrasz, Razorfen Downs
    .accept 3525 >>Accept Extinguishing the Idol
step
    #completewith run
    >>Inside: Kog'thug the Brave, Bristleback Retreat, Shen'dralas (72.6, 31.4)
    .accept 93604 >>Accept Agamaggan's Blood
step
    #completewith next
    .goto The Barrens,50,92,40 >>Travel to the Razorfen Downs entrance
step
    #label run
    >>Run Razorfen Downs and do its quests
    .complete -3525,1 --Protect Belnistrasz while he performs the ritual to shut down the idol
    .complete -6626,1 --Razorfen Battleguard
    .mob +Razorfen Battleguard
    .complete -6626,2 --Razorfen Thornweaver
    .mob +Razorfen Thornweaver
    .complete -6626,3 --Death's Head Cultist
    .mob +Death's Head Cultist
    .complete -3341,1 --Skull of the Coldbringer
    .mob +Amnennar the Coldbringer
    .complete -6521,1 --Ambassador Malcin's Head
    .mob +Ambassador Malcin
    .complete -97196,1 --The Coldbringer's Eye
    .complete -93604,1 --Agamaggan's Blood
step
    >>Turn in
    .turnin -3525,1 >>Turn in Extinguishing the Idol
step
    .goto The Barrens,49,94.8
    >>Talk to |cRXP_FRIENDLY_Myriam Moonsinger|r
    .turnin -6626,1 >>Turn in A Host of Evil
    .target Myriam Moonsinger
step
    >>Talk to |cRXP_FRIENDLY_Kog'thug the Brave|r
    .turnin -93604,1 >>Turn in Agamaggan's Blood
    .target Kog'thug the Brave
step
    .goto Mulgore,34.4,22.8
    >>Talk to |cRXP_FRIENDLY_Sutara Plainstalker|r
    .turnin -97196,1 >>Turn in The Coldbringer's Eye
    .target Sutara Plainstalker
step
    .goto Undercity,74,32.4
    >>Talk to |cRXP_FRIENDLY_Andrew Brownell|r
    .turnin -3341,1 >>Turn in Bring the End
    .target Andrew Brownell
step
    .goto Undercity,56.2,92.6
    >>Talk to |cRXP_FRIENDLY_Varimathras|r
    .turnin -6521,1 >>Turn in An Unholy Alliance
    .target Varimathras
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 41-45 Dungeon: Uldaman
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 40-44 Riverglades

step
    #completewith start
    +|cRXP_WARN_Uldaman|r (41-45). An ancient titan vault buried beneath the Badlands, overrun by troggs and Shadowforge dwarves. Archaedas guards the Discs of Norgannon in its deepest chamber.
step
    #label start
    .goto Badlands,2.4,46
    >>Talk to |cRXP_FRIENDLY_Jarkal Mossmeld|r. Chain: Badlands Reagent Run
    .accept 2202 >>Accept Uldaman Reagent Run
    .target Jarkal Mossmeld
    .isQuestTurnedIn 2258
step
    .goto Badlands,51.4,76.4
    >>Talk to |cRXP_FRIENDLY_Theldurin the Lost|r
    .accept 709 >>Accept Solution to Doom
    .target Theldurin the Lost
step
    .goto Badlands,42.4,52.4
    >>Talk to |cRXP_FRIENDLY_Rigglefuzz|r
    .accept 2418 >>Accept Power Stones
    .target Rigglefuzz
step
    .goto Orgrimmar,59.4,36.8
    >>Talk to |cRXP_FRIENDLY_Dran Droffers|r. Chain: Necklace Recovery > Necklace Recovery, Take 2 > Translating the Journal > Translating the Journal > Find the Gems and Power Source > Deliver the Gems
    .accept 2341 >>Accept Necklace Recovery, Take 3
    .target Dran Droffers
    .isQuestTurnedIn 2340
step
    .goto Undercity,62.4,48.4
    >>Talk to |cRXP_FRIENDLY_Patrick Garrett|r
    .accept 2342 >>Accept Reclaimed Treasures
    .target Patrick Garrett
step
    #completewith run
    >>Inside: The Discs of Norgannon, Uldaman
    .accept 2280 >>Accept The Platinum Discs
step
    #completewith next
    .goto Badlands,44.3,12,40 >>Travel to the Uldaman entrance
step
    #label run
    >>Run Uldaman and do its quests
    .complete -2202,1 --Magenta Fungus Cap
    .complete -709,1 --Tablet of Ryun'eh
    .complete -2418,1 --Dentrium Power Stone
    .mob +Shadowforge Surveyor
    .mob +Shadowforge Ruffian
    .mob +Shadowforge Digger
    .complete -2418,2 --An'Alleum Power Stone
    .mob +Shadowforge Surveyor
    .mob +Shadowforge Ruffian
    .mob +Shadowforge Digger
    .complete -2342,1 --Garrett Family Treasure
    .complete -2341,1 --Necklace Recovery, Take 3
    .complete -2280,1 --The Platinum Discs
    .use 6064
step
    .goto Badlands,2.4,46
    >>Talk to |cRXP_FRIENDLY_Jarkal Mossmeld|r
    .turnin -2202,1 >>Turn in Uldaman Reagent Run
    .target Jarkal Mossmeld
step
    .goto Badlands,51.4,76.4
    >>Talk to |cRXP_FRIENDLY_Theldurin the Lost|r
    .turnin -709,1 >>Turn in Solution to Doom
    .target Theldurin the Lost
step
    .goto Badlands,42.4,52.4
    >>Talk to |cRXP_FRIENDLY_Rigglefuzz|r
    .turnin -2418,1 >>Turn in Power Stones
    .target Rigglefuzz
step
    .goto Badlands,2.42,46.06
    >>Talk to |cRXP_FRIENDLY_Jarkal Mossmeld|r
    .turnin -2341,1 >>Turn in Necklace Recovery, Take 3
    .target Jarkal Mossmeld
step
    .goto Thunder Bluff,34.4,46.87
    >>Talk to |cRXP_FRIENDLY_Sage Truthseeker|r
    .turnin -2280,1 >>Turn in The Platinum Discs
    .target Sage Truthseeker
step
    .goto Undercity,62.4,48.4
    >>Talk to |cRXP_FRIENDLY_Patrick Garrett|r
    .turnin -2342,1 >>Turn in Reclaimed Treasures
    .target Patrick Garrett
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-44 Riverglades
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 42-45 Dungeon: Krol'dok Stronghold

step
    #completewith start
    +|cRXP_WARN_Riverglades|r (40-44). Forever's new zone: a pirate shore with several straight kill quests, and the Krol'dok Stronghold dungeon next door. Duo tip: Questie doesn't know these quests yet, so the giver spots come from NPC positions. Check Wowhead (the quest name links there) if one isn't where it says. Skip: The WANTED posters and Bring Me His Head (single named drops); Break Their Chains (keys drop); It Takes Guts (23 drops); Paletusk Harvesting (boar meat drops); Step One: Rock (10 rocks).
step
    #label start
    .goto 2548,59.4,45.7
    >>Talk to |cRXP_FRIENDLY_Krom'rosh|r
    .accept 94744 >>Accept The Wayward Warrior
    .target Krom'rosh
step
    .goto 2548,59.4,45.5
    >>Talk to |cRXP_FRIENDLY_Krom'rosh|r
    .accept 94968 >>Accept Eye of Mugg
    .target Krom'rosh
    .isQuestTurnedIn 94483,94672,95428,94744,94748,94745,95432,94768,95278
step
    .goto 2548,59.8,46
    >>Talk to |cRXP_FRIENDLY_Kreza Darkthorn|r
    .accept 94974,2,94973 >>Accept Key Ingredients
    .target Kreza Darkthorn
step
    #completewith next
    +Find Da'grosh in the hills west of Rog'mar and take his quests
step
    >>Talk to |cRXP_FRIENDLY_Da'grosh|r
    .accept 94745 >>Accept Carving a Path
    .target Da'grosh
step
    >>Twilight's Shroud: Twilight Fanatics, Corrupters and Champions
    .complete -94745,1 --Twilight Fanatic (8)
    .mob +Twilight Fanatic
    .complete -94745,2 --Twilight Corrupter (8)
    .mob +Twilight Corrupter
    .complete -94745,3 --Twilight Champion (8)
    .mob +Twilight Champion
step
    >>Turn in to Da'grosh
    .turnin -94745 >>Turn in Carving a Path
step
    #completewith next
    .goto 2548,79.3,52.8,40 >>Ride east to Powderfuse Port
step
    .goto 2548,79.3,52.8
    >>Talk to |cRXP_FRIENDLY_Wharfmaster Whizzbuzz|r
    .accept 95119 >>Accept Unfriendly Competition
    .accept 95122 >>Accept Unchecked Expansion
    .accept 95123 >>Accept A Blast Ye Scurvy Dogs!
    .accept 95165 >>Accept See Ya, Scallywags!
    .target Wharfmaster Whizzbuzz
step
    .goto 2548,77.2,52.9
    >>Talk to |cRXP_FRIENDLY_Friz Frazzlespark|r
    .accept 95288 >>Accept Smuggler's Paradise
    .target Friz Frazzlespark
step
    >>Eastwind Shore, north of the port: kill Buccaneers, Musketeers, Raiders and Bombardiers; take powder kegs and plant the three ship charges
    .complete -95119,1 --Eastsea Buccaneer (10)
    .mob +Eastsea Buccaneer
    .complete -95119,2 --Eastsea Musketeer (10)
    .mob +Eastsea Musketeer
    .complete -95122,1 --Eastsea Raider (8)
    .mob +Eastsea Raider
    .complete -95122,2 --Eastsea Bombardier (8)
    .mob +Eastsea Bombardier
    .complete -95123,1 --Eastsea Powder Keg (5)
    .complete -95165,1 --First Ship Charge planted (1)
    .complete -95165,2 --Second Ship Charge planted (1)
    .complete -95165,3 --Third Ship Charge planted (1)
    .complete -95288,1 --Smuggled Goods (8)
step
    .goto 2548,79.3,52.8
    >>Turn in at Powderfuse Port, then pick up and kill Admiral Lamora
    .turnin -95119 >>Turn in Unfriendly Competition
    .turnin -95122 >>Turn in Unchecked Expansion
    .turnin -95123 >>Turn in A Blast Ye Scurvy Dogs!
    .turnin -95165 >>Turn in See Ya, Scallywags!
    .target Wharfmaster Whizzbuzz
step
    .goto 2548,77.2,52.9
    >>Turn in at Powderfuse Port, then pick up and kill Admiral Lamora
    .turnin -95288 >>Turn in Smuggler's Paradise
    .target Friz Frazzlespark
step
    >>Kill Admiral Lamora and loot his stash
    .complete -95124,1 --Admiral Lamora (1)
    .mob +Admiral Lamora
    .complete -95124,2 --Lamora's Loot (1)
step
    .goto 2548,79.3,52.8
    >>Turn in at Powderfuse Port
    .turnin -95124 >>Turn in Admiral Lamora
    .target Wharfmaster Whizzbuzz
step
    .goto 2548,58.1,45.2
    >>Talk to |cRXP_FRIENDLY_Tan'jani|r
    .accept 95033 >>Accept On the Other Side
    .target Tan'jani
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 42-45 Dungeon: Krol'dok Stronghold
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 42-46 Feralas

step
    #completewith start
    +|cRXP_WARN_Krol'dok Stronghold|r (42-45). Ogre outrunners have been kidnapping travelers and raiding settlements across the Riverglades. Their trail leads to a fortress of workshops, encampments and guarded inner passages, where strange chanting is heard after nightfall.
step
    #label start
    .goto 2548,59.4,45.5
    >>Talk to |cRXP_FRIENDLY_Krom'rosh|r. Chain: Show Them How It's Done > Encroaching Twilight > Clugfist's Decree > The Wayward Warrior > Break Their Chains > Carving a Path > Rise Up! > Bring Me His Head > It Is Time, Brother...
    .accept 94968 >>Accept Eye of Mugg
    .target Krom'rosh
    .isQuestTurnedIn 94483,94672,95428,94744,94748,94745,95432,94768,95278
step
    .goto 2548,59.4,44
    >>Talk to |cRXP_FRIENDLY_Tran'gul|r. Chain: Show Them How It's Done > Encroaching Twilight > Clugfist's Decree > The Wayward Warrior > Break Their Chains > Carving a Path > Rise Up! > Bring Me His Head > It Is Time, Brother...
    .accept 94972 >>Accept Tome of Twilight
    .target Tran'gul
    .isQuestTurnedIn 94483,94672,95428,94744,94748,94745,95432,94768,95278
step
    .goto 2548,33.4,38
    >>Talk to |cRXP_FRIENDLY_Da'grosh|r. Chain: Show Them How It's Done > Encroaching Twilight > Clugfist's Decree > The Wayward Warrior > Break Their Chains > Carving a Path > Rise Up! > Bring Me His Head
    .accept 94975 >>Accept A Token of Vengeance
    .target Da'grosh
    .isQuestTurnedIn 94483,94672,95428,94744,94748,94745,95432,94768
step
    .goto 2548,59.8,46
    >>Talk to |cRXP_FRIENDLY_Kreza Darkthorn|r. Chain: Krol'dok Moulding
    .accept 94974 >>Accept Key Ingredients
    .target Kreza Darkthorn
    .isQuestTurnedIn 94973
step
    #completewith next
    .goto 2548,37.5,37.3,40 >>Travel to the Krol'dok Stronghold entrance
step
    #label run
    >>Run Krol'dok Stronghold and do its quests
    .complete -94968,1 --Eye of Mugg
    .complete -94972,1 --Tome of Twilight
    .complete -94975,1 --A Token of Vengeance
    .complete -94974,1 --Key Ingredients
step
    .goto 2548,59.4,45.5
    >>Talk to |cRXP_FRIENDLY_Krom'rosh|r
    .turnin -94968,1 >>Turn in Eye of Mugg
    .target Krom'rosh
step
    .goto 2548,59.4,44
    >>Talk to |cRXP_FRIENDLY_Tran'gul|r
    .turnin -94972,1 >>Turn in Tome of Twilight
    .target Tran'gul
step
    .goto 2548,33.4,38
    >>Talk to |cRXP_FRIENDLY_Da'grosh|r
    .turnin -94975,1 >>Turn in A Token of Vengeance
    .target Da'grosh
step
    .goto 2548,59.8,46
    >>Talk to |cRXP_FRIENDLY_Kreza Darkthorn|r
    .turnin -94974,1 >>Turn in Key Ingredients
    .target Kreza Darkthorn
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 42-46 Feralas
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 44-46 Tanaris, part 2

step
    #completewith start
    +|cRXP_WARN_Feralas|r (42-46). Two Gordunni ogre kill quests and the Northspring harpies, all from Camp Mojache. Duo tip: Talo Thornhoof also hands out "The Strength of Corruption" (Felwood bears and wolves). Take it at 47 and carry it. Skip: War on the Woodpaw and Alpha Strike (manes drop); A New Cloak's Sheen / A Grim Discovery (wings and horns); The Mark of Quality (yeti hides); Muisek chain (long, each needs own captures).
step
    #label start
    .goto Feralas,75.8,43.6
    >>Talk to |cRXP_FRIENDLY_Rok Orhan|r
    .accept 2975 >>Accept The Ogres of Feralas
    .target Rok Orhan
step
    .goto Feralas,75.7,44.3
    >>Talk to |cRXP_FRIENDLY_Orwin Gizzmick|r
    .accept 2987 >>Accept Gordunni Cobalt
    .target Orwin Gizzmick
step
    .goto Feralas,76,31
    >>Gordunni camp north of Camp Mojache: kill ogres, ogre mages and brutes; loot cobalt chunks
    .complete -2975,1 --Gordunni Ogre (10)
    .mob +Gordunni Ogre
    .complete -2975,2 --Gordunni Ogre Mage (10)
    .mob +Gordunni Ogre Mage
    .complete -2975,3 --Gordunni Brute (5)
    .mob +Gordunni Brute
    .complete -2987,1 --Gordunni Cobalt (12)
    .use 9466
step
    .goto Feralas,75.8,43.6
    >>Turn in at Camp Mojache
    .turnin -2975 >>Turn in The Ogres of Feralas
    .target Rok Orhan
step
    .goto Feralas,75.7,44.3
    >>Turn in at Camp Mojache
    .turnin -2987 >>Turn in Gordunni Cobalt
    .target Orwin Gizzmick
step
    .goto Feralas,75.8,43.6
    >>Talk to |cRXP_FRIENDLY_Rok Orhan|r
    .accept 2980,2,2975 >>Accept The Ogres of Feralas
    .target Rok Orhan
step
    .goto Feralas,60,64
    >>Ruins of Isildien (south): Gordunni Shaman, Warlocks and Maulers
    .complete -2980,1 --Gordunni Shaman (10)
    .mob +Gordunni Shaman
    .complete -2980,2 --Gordunni Warlock (10)
    .mob +Gordunni Warlock
    .complete -2980,3 --Gordunni Mauler (5)
    .mob +Gordunni Mauler
step
    >>Screechers anywhere in the hills: bramble 3 spirits each
    .complete -3520,1 --Screecher Spirits collected (3)
    .mob +Screecher Spirit
    .use 10699
step
    .goto Feralas,75.8,43.6
    >>Turn in at Camp Mojache
    .turnin -2980 >>Turn in The Ogres of Feralas
    .target Rok Orhan
step
    .goto Feralas,76.2,43.8
    >>Talk to |cRXP_FRIENDLY_Talo Thornhoof|r
    .accept 3063 >>Accept Vengeance on the Northspring
    .target Talo Thornhoof
step
    .goto Feralas,39,14
    >>Northspring harpies in the far north-west
    .complete -3063,1 --Northspring Harpy (4)
    .mob +Northspring Harpy
    .complete -3063,2 --Northspring Roguefeather (4)
    .mob +Northspring Roguefeather
    .complete -3063,3 --Northspring Slayer (4)
    .mob +Northspring Slayer
    .complete -3063,4 --Northspring Windcaller (4)
    .mob +Northspring Windcaller
step
    .goto Feralas,76.2,43.8
    >>Turn in at Camp Mojache; pick up The Strength of Corruption at 47
    .turnin -3063 >>Turn in Vengeance on the Northspring
    .target Talo Thornhoof
step
    .goto Feralas,76.2,43.8
    >>Talk to |cRXP_FRIENDLY_Talo Thornhoof|r
    .accept 4120 >>Accept The Strength of Corruption
    .target Talo Thornhoof
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 44-46 Tanaris, part 2
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 44-48 Dungeon: Zul'Farrak

step
    #completewith start
    +|cRXP_WARN_Tanaris, part 2|r (44-46). Two more shared kill quests open at 44 and 45. Do them on the way to Zul'Farrak. Duo tip: Turn in Screecher Spirits at Steamwheedle Port while you are here.
step
    #label start
    .goto Tanaris,67,22.4
    >>Talk to |cRXP_FRIENDLY_Yeh'kinya|r
    .accept 3520 >>Accept Screecher Spirits
    .target Yeh'kinya
step
    .goto Tanaris,52.8,27.4
    >>Talk to |cRXP_FRIENDLY_Andi Lynn|r
    .accept 5863 >>Accept The Dunemaul Compound
    .target Andi Lynn
step
    .goto Tanaris,51.6,26.8
    >>Talk to |cRXP_FRIENDLY_Tran'rek|r
    .accept 3362 >>Accept Thistleshrub Valley
    .target Tran'rek
step
    .goto Tanaris,67.1,23.9
    >>Talk to |cRXP_FRIENDLY_Security Chief Bilgewhizzle|r
    .accept 97530 >>Accept Dunemaul Dues
    .target Security Chief Bilgewhizzle
step
    .goto Tanaris,40.5,55.3
    >>Dunemaul Compound: brutes, enforcers and Gor'marok; look for the bangle on the ground there
    .complete -5863,1 --Dunemaul Brute (10)
    .mob +Dunemaul Brute
    .complete -5863,2 --Dunemaul Enforcer (10)
    .mob +Dunemaul Enforcer
    .complete -5863,3 --Gor'marok the Ravager (1)
    .mob +Gor'marok the Ravager
    .complete -97530,1 --Brilliantly Polished Bangle (1)
step
    .goto Tanaris,29.3,65.5
    >>Thistleshrub Valley (south-west): Gnarled Thistleshrubs and Rootshapers
    .complete -3362,1 --Gnarled Thistleshrub (8)
    .mob +Gnarled Thistleshrub
    .complete -3362,2 --Thistleshrub Rootshaper (8)
    .mob +Thistleshrub Rootshaper
step
    .goto Tanaris,52.8,27.4
    >>Turn in at Gadgetzan
    .turnin -5863 >>Turn in The Dunemaul Compound
    .target Andi Lynn
step
    .goto Tanaris,51.6,26.8
    >>Turn in at Gadgetzan
    .turnin -3362 >>Turn in Thistleshrub Valley
    .target Tran'rek
step
    .goto Tanaris,67.1,23.9
    >>Turn in at Gadgetzan
    .turnin -97530 >>Turn in Dunemaul Dues
    .target Security Chief Bilgewhizzle
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 44-48 Dungeon: Zul'Farrak
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 45-48 The Hinterlands

step
    #completewith start
    +|cRXP_WARN_Zul'Farrak|r (44-48). The sun-baked troll city in the deserts of Tanaris, home of the Sandfury tribe and their chief, Ukorz Sandscalp.
step
    #label start
    .goto Tanaris,52.4,28.4
    >>Talk to |cRXP_FRIENDLY_Chief Engineer Bilgewhizzle|r
    .accept 2768 >>Accept Divino-matic Rod
    .target Chief Engineer Bilgewhizzle
step
    .goto Tanaris,51.4,26.8
    >>Talk to |cRXP_FRIENDLY_Tran'rek|r
    .accept 2865 >>Accept Scarab Shells
    .target Tran'rek
step
    .goto Tanaris,51.4,28.6
    >>Talk to |cRXP_FRIENDLY_Trenton Lighthammer|r
    .accept 3042 >>Accept Troll Temper
    .target Trenton Lighthammer
step
    .goto Tanaris,67,22.4
    >>Talk to |cRXP_FRIENDLY_Yeh'kinya|r. Chain: Screecher Spirits
    .accept 3527 >>Accept The Prophecy of Mosh'aru
    .target Yeh'kinya
    .isQuestTurnedIn 3520
step
    .goto Durotar,55.8,74.4
    >>Talk to |cRXP_FRIENDLY_Master Gadrin|r. Chain: Venom Bottles > Undamaged Venom Sac > Consult Master Gadrin
    .accept 2936 >>Accept The Spider God
    .target Master Gadrin
    .isQuestTurnedIn 2935
step
    .goto Dustwallow Marsh,46,57
    >>Talk to |cRXP_FRIENDLY_Tabetha|r
    .accept 2846 >>Accept Tiara of the Deep
    .target Tabetha
step
    .goto Mulgore,32.5,20.6
    >>Talk to |cRXP_FRIENDLY_Mazu'kon|r
    .accept 96775 >>Accept Zum'rah's Head
    .target Mazu'kon
step
    .goto Thousand Needles,78,77
    >>Talk to |cRXP_FRIENDLY_Wizzle Brassbolts|r
    .accept 2770 >>Accept Gahz'rilla
    .target Wizzle Brassbolts
step
    #completewith next
    .goto Tanaris,38.7,20,40 >>Travel to the Zul'Farrak entrance
step
    #label run
    >>Run Zul'Farrak and do its quests
    .complete -2770,1 --Gahz'rilla's Electrified Scale
    .mob +Gahz'rilla
    .complete -2846,1 --Tiara of the Deep
    .mob +Hydromancer Velratha
    .complete -2768,1 --Divino-matic Rod
    .mob +Sergeant Bly
    .complete -2865,1 --Uncracked Scarab Shell
    .mob +Scarab
    .complete -3042,1 --Troll Temper
    .complete -3527,1 --First Mosh'aru Tablet
    .mob +Theka the Martyr
    .complete -3527,2 --Second Mosh'aru Tablet
    .mob +Hydromancer Velratha
    .complete -2936,1 --Find the Spider God's Name
    .complete -96775,1 --Zum'rah's Head
step
    .goto Tanaris,52.4,28.4
    >>Talk to |cRXP_FRIENDLY_Chief Engineer Bilgewhizzle|r
    .turnin -2768,1 >>Turn in Divino-matic Rod
    .target Chief Engineer Bilgewhizzle
step
    .goto Tanaris,51.4,26.8
    >>Talk to |cRXP_FRIENDLY_Tran'rek|r
    .turnin -2865,1 >>Turn in Scarab Shells
    .target Tran'rek
step
    .goto Tanaris,51.4,28.6
    >>Talk to |cRXP_FRIENDLY_Trenton Lighthammer|r
    .turnin -3042,1 >>Turn in Troll Temper
    .target Trenton Lighthammer
step
    .goto Tanaris,67,22.4
    >>Talk to |cRXP_FRIENDLY_Yeh'kinya|r
    .turnin -3527,1 >>Turn in The Prophecy of Mosh'aru
    .target Yeh'kinya
step
    .goto Durotar,55.8,74.4
    >>Talk to |cRXP_FRIENDLY_Master Gadrin|r
    .turnin -2936,1 >>Turn in The Spider God
    .target Master Gadrin
step
    .goto Dustwallow Marsh,46,57
    >>Talk to |cRXP_FRIENDLY_Tabetha|r
    .turnin -2846,1 >>Turn in Tiara of the Deep
    .target Tabetha
step
    .goto Mulgore,32.5,20.6
    >>Talk to |cRXP_FRIENDLY_Mazu'kon|r
    .turnin -96775,1 >>Turn in Zum'rah's Head
    .target Mazu'kon
step
    .goto Thousand Needles,78,77
    >>Talk to |cRXP_FRIENDLY_Wizzle Brassbolts|r
    .turnin -2770,1 >>Turn in Gahz'rilla
    .target Wizzle Brassbolts
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 45-48 The Hinterlands
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 46-49 Searing Gorge

step
    #completewith start
    +|cRXP_WARN_The Hinterlands|r (45-48). Revantusk Village is the best Horde duo hub in the 40s: four short kill quests and more around Jintha'Alor. Duo tip: Take the two long ones too: Message to the Wildhammer and the Guard Captain job are slow, but the mobs are where you are going anyway. Skip: Witch Doctor Ti'ik (head drop); Gammerita, Mon! (loot a lure from one turtle); Another Message to the Wildhammer (10 feathers); Fledgling Rescue (Alliance gryphon master).
step
    #label start
    .goto The Hinterlands,79.2,79.5
    >>Talk to |cRXP_FRIENDLY_Huntsman Markhor|r
    .accept 7828 >>Accept Stalking the Stalkers
    .accept 7829 >>Accept Hunt the Savages
    .target Huntsman Markhor
step
    .goto The Hinterlands,80.3,81.5
    >>Talk to |cRXP_FRIENDLY_Katoom the Angler|r
    .accept 7815 >>Accept Snapjaws, Mon!
    .target Katoom the Angler
step
    .goto The Hinterlands,78.8,78.3
    >>Talk to |cRXP_FRIENDLY_Mystic Yayo'jin|r
    .accept 7844 >>Accept Cannibalistic Cousins
    .target Mystic Yayo'jin
step
    .goto The Hinterlands,77.2,80.1
    >>Talk to |cRXP_FRIENDLY_Smith Slagtree|r
    .accept 7839 >>Accept Vilebranch Hooligans
    .target Smith Slagtree
step
    .goto The Hinterlands,79.4,79.1
    >>Talk to |cRXP_FRIENDLY_Otho Moji'ko|r
    .accept 7841 >>Accept Message to the Wildhammer
    .target Otho Moji'ko
step
    .goto The Hinterlands,81,61
    >>Shoreline south of Revantusk: Saltwater Snapjaws
    .complete -7815,1 --Saltwater Snapjaw (15)
    .mob +Saltwater Snapjaw
step
    .goto The Hinterlands,62,52
    >>Central Hinterlands: Silvermane Stalkers and Howlers, Savage Owlbeasts
    .complete -7828,1 --Silvermane Stalker (15)
    .mob +Silvermane Stalker
    .complete -7828,2 --Silvermane Howler (15)
    .mob +Silvermane Howler
    .complete -7829,1 --Savage Owlbeast (20)
    .mob +Savage Owlbeast
step
    .goto The Hinterlands,48,66
    >>Vilebranch camp (Skulk Rock side): Scalpers and Soothsayers; grab Slagtree's tools
    .complete -7844,1 --Vilebranch Scalper (30)
    .mob +Vilebranch Scalper
    .complete -7844,2 --Vilebranch Soothsayer (15)
    .mob +Vilebranch Soothsayer
    .complete -7839,1 --Slagtree's Lost Tools (1)
step
    .goto The Hinterlands,31,48
    >>Quel'Danil Lodge (west): the four Highvale elf types
    .complete -7841,1 --Highvale Scout (15)
    .mob +Highvale Scout
    .complete -7841,2 --Highvale Outrunner (15)
    .mob +Highvale Outrunner
    .complete -7841,3 --Highvale Ranger (15)
    .mob +Highvale Ranger
    .complete -7841,4 --Highvale Marksman (15)
    .mob +Highvale Marksman
step
    .goto The Hinterlands,79.2,79.5
    >>Turn in everything at Revantusk
    .turnin -7828 >>Turn in Stalking the Stalkers
    .turnin -7829 >>Turn in Hunt the Savages
    .target Huntsman Markhor
step
    .goto The Hinterlands,80.3,81.5
    >>Turn in everything at Revantusk
    .turnin -7815 >>Turn in Snapjaws, Mon!
    .target Katoom the Angler
step
    .goto The Hinterlands,78.8,78.3
    >>Turn in everything at Revantusk
    .turnin -7844 >>Turn in Cannibalistic Cousins
    .target Mystic Yayo'jin
step
    .goto The Hinterlands,77.2,80.1
    >>Turn in everything at Revantusk
    .turnin -7839 >>Turn in Vilebranch Hooligans
    .target Smith Slagtree
step
    .goto The Hinterlands,79.4,79.1
    >>Turn in everything at Revantusk
    .turnin -7841 >>Turn in Message to the Wildhammer
    .target Otho Moji'ko
step
    .goto The Hinterlands,79.2,79.5
    >>Talk to |cRXP_FRIENDLY_Huntsman Markhor|r
    .accept 7849 >>Accept Separation Anxiety
    .target Huntsman Markhor
step
    .goto The Hinterlands,78.2,81.2
    >>Talk to |cRXP_FRIENDLY_Primal Torntusk|r
    .accept 7850 >>Accept Dark Vessels
    .accept 7845 >>Accept Kidnapped Elder Torntusk!
    .target Primal Torntusk
step
    .goto The Hinterlands,79.1,79
    >>Talk to |cRXP_FRIENDLY_Call to Arms!|r
    .accept 7861 >>Accept Wanted: Vile Priestess Hexx and Her Minions
    .accept 7862 >>Accept Job Opening: Guard Captain of Revantusk Village
step
    .goto The Hinterlands,62,74
    >>Jintha'Alor: Huntsman Malkhor's remains, the 10 tainted vessels, the four Vilebranch types; free Elder Torntusk
    .complete -7849,1 --Huntsman Malkhor's Skull (1)
    .complete -7849,2 --Huntsman Malkhor's Bones (1)
    .complete -7850,1 --Vessel of Tainted Blood (10)
    .complete -7845,1 --Kidnapped Elder Torntusk!
    .complete -7862,1 --Vilebranch Berserker (20)
    .mob +Vilebranch Berserker
    .complete -7862,2 --Vilebranch Shadow Hunter (20)
    .mob +Vilebranch Shadow Hunter
    .complete -7862,3 --Vilebranch Blood Drinker (20)
    .mob +Vilebranch Blood Drinker
    .complete -7862,4 --Vilebranch Soul Eater (20)
    .mob +Vilebranch Soul Eater
step
    .goto The Hinterlands,58,82
    >>Top of Jintha'Alor: Vile Priestess Hexx and her guards
    .complete -7861,1 --Vile Priestess Hexx (1)
    .mob +Vile Priestess Hexx
    .complete -7861,2 --Vilebranch Aman'zasi Guard (20)
    .mob +Vilebranch Aman'zasi Guard
step
    .goto The Hinterlands,79.2,79.5
    >>Turn in at Revantusk
    .turnin -7849 >>Turn in Separation Anxiety
    .target Huntsman Markhor
step
    .goto The Hinterlands,78.2,81.2
    >>Turn in at Revantusk
    .turnin -7850 >>Turn in Dark Vessels
    .target Primal Torntusk
step
    .goto The Hinterlands,78.2,81.18
    >>Turn in at Revantusk
    .turnin -7861 >>Turn in Wanted: Vile Priestess Hexx and Her Minions
    .turnin -7862 >>Turn in Job Opening: Guard Captain of Revantusk Village
    .target Primal Torntusk
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 46-49 Searing Gorge
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 46-50 Azshara

step
    #completewith start
    +|cRXP_WARN_Searing Gorge|r (46-49). Four 20-kill quests from one camp, all open at 45. Duo tip: The Slag Pit (Incendosaurs and the Flux plans) is crowded with Dark Irons; clear your way in rather than running. Skip: Divine Retribution chain (long, many drops); Ledger from Tanaris (drops and a turn-in in Tanaris).
step
    #label start
    .goto Searing Gorge,37.7,26.5
    >>Talk to |cRXP_FRIENDLY_Wanted/Missing/Lost & Found|r
    .accept 7729 >>Accept JOB OPPORTUNITY: Culling the Competition
step
    .goto Searing Gorge,38.6,27.8
    >>Talk to |cRXP_FRIENDLY_Hansel Heavyhands|r
    .accept 7723 >>Accept Curse These Fat Fingers
    .accept 7724 >>Accept Fiery Menace!
    .accept 7727 >>Accept Incendosaurs? Whateverosaur is More Like It
    .target Hansel Heavyhands
step
    .goto Searing Gorge,38.8,28.5
    >>Talk to |cRXP_FRIENDLY_Master Smith Burninate|r
    .accept 7722 >>Accept What the Flux?
    .target Master Smith Burninate
step
    .goto Searing Gorge,42,40
    >>Dark Iron Taskmasters and Slavers on the slopes around the Cauldron
    .complete -7729,1 --Dark Iron Taskmaster (15)
    .mob +Dark Iron Taskmaster
    .complete -7729,2 --Dark Iron Slaver (15)
    .mob +Dark Iron Slaver
step
    .goto Searing Gorge,40,45
    >>Heavy War Golems
    .complete -7723,1 --Heavy War Golem (20)
    .mob +Heavy War Golem
step
    .goto Searing Gorge,29,62
    >>Searing Lava Spiders in the south-west
    .complete -7724,1 --Searing Lava Spider (20)
    .mob +Searing Lava Spider
step
    .goto Searing Gorge,48,27
    >>Slag Pit: Incendosaurs, and click the Fiery Flux plans
    .complete -7727,1 --Incendosaur (20)
    .mob +Incendosaur
    .complete -7722,1 --Secret Plans: Fiery Flux (1)
step
    .goto Searing Gorge,38.97,27.51
    >>Turn in at Thorium Point
    .turnin -7729 >>Turn in JOB OPPORTUNITY: Culling the Competition
    .target Taskmaster Scrange
step
    .goto Searing Gorge,38.6,27.8
    >>Turn in at Thorium Point
    .turnin -7723 >>Turn in Curse These Fat Fingers
    .turnin -7724 >>Turn in Fiery Menace!
    .turnin -7727 >>Turn in Incendosaurs? Whateverosaur is More Like It
    .target Hansel Heavyhands
step
    .goto Searing Gorge,38.8,28.5
    >>Turn in at Thorium Point
    .turnin -7722 >>Turn in What the Flux?
    .target Master Smith Burninate
step
    .goto Searing Gorge,65.6,62.2
    >>Talk to |cRXP_FRIENDLY_Wooden Outhouse|r
    .accept 4449 >>Accept Caught!
step
    >>Kill 8 Dark Iron Geologists and bring 15 pieces of Silk Cloth to the person locked in the outhouse in Searing Gorge.
    .complete -4449,1 --Dark Iron Geologist (8)
    .mob +Dark Iron Geologist
    .complete -4449,2 --Silk Cloth (15)
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 46-50 Azshara
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 46-50 Dungeon: Maraudon

step
    #completewith start
    +|cRXP_WARN_Azshara|r (46-50). Forever reworked Azshara: Valormok has new quests, and Loh'atu has two quick kill quests at the Ashenvale border. Duo tip: Fly to Valormok. Kurll and Izvi's new quests give you items to use; each of you needs your own count. Skip: Blue Gold and Ley of the Land (wand drop); Winter Frontier Fishery (fishing); Home on the Range (hide drops); The four delivery quests after Stealing Knowledge (capital cities).
step
    #label start
    .goto Azshara,11.4,78.2
    >>Talk to |cRXP_FRIENDLY_Loh'atu|r
    .accept 5535 >>Accept Spiritual Unrest
    .accept 5536 >>Accept A Land Filled with Hatred
    .target Loh'atu
step
    .goto Azshara,18,66
    >>Highborne ghosts and Haldarr satyrs just east of Loh'atu
    .complete -5535,1 --Highborne Apparition (6)
    .mob +Highborne Apparition
    .complete -5535,2 --Highborne Lichling (6)
    .mob +Highborne Lichling
    .complete -5536,1 --Haldarr Satyr (6)
    .mob +Haldarr Satyr
    .complete -5536,2 --Haldarr Trickster (2)
    .mob +Haldarr Trickster
    .complete -5536,3 --Haldarr Felsworn (2)
    .mob +Haldarr Felsworn
step
    .goto Azshara,11.4,78.2
    >>Turn in to Loh'atu
    .turnin -5535 >>Turn in Spiritual Unrest
    .turnin -5536 >>Turn in A Land Filled with Hatred
    .target Loh'atu
step
    .goto Azshara,22.6,51.4
    >>Talk to |cRXP_FRIENDLY_Jediga|r
    .accept 3517 >>Accept Stealing Knowledge
    .target Jediga
step
    .goto Azshara,21.8,52.1
    >>Talk to |cRXP_FRIENDLY_Kurll|r
    .accept 91608 >>Accept Gettin' Buzzed
    .target Kurll
step
    .goto Azshara,22.4,51.8
    >>Talk to |cRXP_FRIENDLY_Izvi Gildfizz|r
    .accept 91568 >>Accept Long Walks on the Beach
    .target Izvi Gildfizz
step
    .goto Azshara,38,57
    >>Ruins of Eldarath: the four tablets
    .complete -3517,1 --Tablet of Beth'Amara (1)
    .complete -3517,2 --Tablet of Jin'yael (1)
    .complete -3517,3 --Tablet of Markri (1)
    .complete -3517,4 --Tablet of Sael'hai (1)
step
    >>Shoot wasp nests and dig treasure on the beach
    .complete -91608,1 --Wild Honey (5)
    .complete -91568,1 --Highborne Treasure Fragment (10)
step
    .goto Azshara,22.6,51.4
    >>Turn in at Valormok
    .turnin -3517 >>Turn in Stealing Knowledge
    .target Jediga
step
    .goto Azshara,21.8,52.1
    >>Turn in at Valormok
    .turnin -91608 >>Turn in Gettin' Buzzed
    .target Kurll
step
    .goto Azshara,22.4,51.8
    >>Turn in at Valormok
    .turnin -91568 >>Turn in Long Walks on the Beach
    .target Izvi Gildfizz
step
    .goto Azshara,41.8,38.8
    >>Talk to |cRXP_FRIENDLY_Ekkal|r
    .accept 86746 >>Accept The Legashi Threat
    .target Ekkal
step
    >>Legashi Satyrs, Rogues and Hellcallers
    .complete -86746,1 --Legashi Satyr (5)
    .mob +Legashi Satyr
    .complete -86746,2 --Legashi Rogue (5)
    .mob +Legashi Rogue
    .complete -86746,3 --Legashi Hellcaller (5)
    .mob +Legashi Hellcaller
step
    .goto Azshara,53.5,21.8
    >>Talk to |cRXP_FRIENDLY_Kim'jael|r
    .accept 3601 >>Accept Kim'jael Indeed!
    .target Kim'jael
step
    .goto Azshara,58,28
    >>Kim'jael's four items in the naga camp
    .complete -3601,1 --Kim'Jael's Compass (1)
    .complete -3601,2 --Kim'Jael's Scope (1)
    .complete -3601,3 --Kim'Jael's Stuffed Chicken (1)
    .complete -3601,4 --Kim'Jael's Wizzlegoober (1)
step
    >>Turn in
    .turnin -86746 >>Turn in The Legashi Threat
    .target Ekkal
step
    .goto Azshara,53.5,21.8
    >>Turn in
    .turnin -3601 >>Turn in Kim'jael Indeed!
    .target Kim'jael
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 46-50 Dungeon: Maraudon
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 48-52 Felwood

step
    #completewith start
    +|cRXP_WARN_Maraudon|r (46-50). The sacred caverns of the centaur in Desolace, where Princess Theradras and her corrupted earth elementals rule beneath Zaetar's grave. The orange and purple wings lead to the inner caves; the Scepter of Celebras opens the shortcut to the waterfall.
step
    #label start
    .goto Desolace,43.4,84.8
    >>Talk to |cRXP_FRIENDLY_Centaur Pariah|r
    .accept 7067 >>Accept The Pariah's Instructions
    .target Centaur Pariah
step
    .goto Desolace,23.2,70.2
    >>Talk to |cRXP_FRIENDLY_Vark Battlescar|r
    .accept 7029 >>Accept Vyletongue Corruption
    .target Vark Battlescar
step
    .goto Desolace,62,39.4
    >>Talk to |cRXP_FRIENDLY_Willow|r
    .accept 7028 >>Accept Twisted Evils
    .target Willow
step
    .goto Desolace,32.1,64
    >>Talk to |cRXP_FRIENDLY_Cavindra|r
    .accept 7044 >>Accept Legends of Maraudon
    .target Cavindra
step
    .goto Desolace,26.8,77.6
    >>Talk to |cRXP_FRIENDLY_Selendra|r
    .accept 7064 >>Accept Corruption of Earth and Seed
    .target Selendra
step
    .goto Mulgore,33.8,23.7
    >>Talk to |cRXP_FRIENDLY_Olana Brighthoof - Skywatcher Plateau, Mulgore|r
    .accept 96776 >>Accept An'she's Radiance
step
    .goto Orgrimmar,38.8,85.4
    >>Talk to |cRXP_FRIENDLY_Uthel'nay|r
    .accept 7068 >>Accept Shadowshard Fragments
    .target Uthel'nay
step
    #completewith run
    >>Inside: Celebras the Redeemed, Maraudon
    .accept 7046 >>Accept The Scepter of Celebras
step
    #completewith run
    >>Inside: Woodwyrd, Forlorn Gardens, Shen'dralas (just east of Mithera, about 53, 76)
    .accept 93404 >>Accept Rot and Regret
step
    #completewith run
    >>Inside: Zaetar's Spirit, Maraudon
    .accept 7066 >>Accept Seed of Life
step
    #completewith next
    .goto Desolace,29.1,62.5,40 >>Travel to the Maraudon entrance
step
    #label run
    >>Run Maraudon and do its quests
    .complete -7067,1 --Amulet of Union
    .use 17781
    .complete -7068,1 --Shadowshard Fragment
    .mob +Shadowshard Rumbler
    .mob +Shadowshard Smasher
    .complete -7029,1 --Vylestem Vines healed
    .mob +Noxxious Scion
    .complete -7029,2 --Filled Cerulean Vial
    .use 17693
    .complete -7028,1 --Theradric Crystal Carving
    .complete -7044,1 --Celebrian Diamond
    .mob +Lord Vyletongue
    .complete -7044,2 --Celebrian Rod
    .mob +Noxxion
    .mob +Noxxion's Spawn
    .complete -7046,1 --Incantation of Celebras
    .complete -7064,1 --Princess Theradras
    .mob +Princess Theradras
    .complete -93404,1 --Rot and Regret
    .complete -96776,1 --An'she's Radiance
    .complete -7066,1 --Seed of Life
    .use 17760
step
    >>Talk to |cRXP_FRIENDLY_Celebras the Redeemed|r
    .turnin -7044,1 >>Turn in Legends of Maraudon
    .turnin -7046,1 >>Turn in The Scepter of Celebras
    .target Celebras the Redeemed
step
    .goto Desolace,43.4,84.8
    >>Talk to |cRXP_FRIENDLY_Centaur Pariah|r
    .turnin -7067,1 >>Turn in The Pariah's Instructions
    .target Centaur Pariah
step
    .goto Desolace,23.2,70.2
    >>Talk to |cRXP_FRIENDLY_Vark Battlescar|r
    .turnin -7029,1 >>Turn in Vyletongue Corruption
    .target Vark Battlescar
step
    .goto Desolace,62,39.4
    >>Talk to |cRXP_FRIENDLY_Willow|r
    .turnin -7028,1 >>Turn in Twisted Evils
    .target Willow
step
    .goto Desolace,26.8,77.6
    >>Talk to |cRXP_FRIENDLY_Selendra|r
    .turnin -7064,1 >>Turn in Corruption of Earth and Seed
    .target Selendra
step
    >>Talk to |cRXP_FRIENDLY_Woodwyrd|r
    .turnin -93404,1 >>Turn in Rot and Regret
    .target Woodwyrd
step
    .goto Moonglade,36.18,41.79
    >>Talk to |cRXP_FRIENDLY_Keeper Remulos|r
    .turnin -7066,1 >>Turn in Seed of Life
    .target Keeper Remulos
step
    .goto Mulgore,33.8,23.7
    >>Talk to |cRXP_FRIENDLY_Olana Brighthoof - Skywatcher Plateau, Mulgore|r
    .turnin -96776,1 >>Turn in An'she's Radiance
step
    .goto Orgrimmar,38.8,85.4
    >>Talk to |cRXP_FRIENDLY_Uthel'nay|r
    .turnin -7068,1 >>Turn in Shadowshard Fragments
    .target Uthel'nay
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 48-52 Felwood
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 48-52 Dungeon: Alcaz Prison

step
    #completewith start
    +|cRXP_WARN_Felwood|r (48-52). Deadwood furbolgs, the Jaedenar cult and the owlbeast chain are all straight kills. Duo tip: Timbermaw Ally starts the Timbermaw reputation chain that carries you into Winterspring. Skip: Cleansing Felwood (15 Blood Amber); A Sampling of Putrescence (organ drops); Salve via Hunting (soul shards).
step
    #label start
    .goto Felwood,50.9,85
    >>Talk to |cRXP_FRIENDLY_Grazle|r
    .accept 8460 >>Accept Timbermaw Ally
    .target Grazle
step
    .goto Felwood,51.2,82.1
    >>Talk to |cRXP_FRIENDLY_Greta Mosshoof|r
    .accept 5155 >>Accept Forces of Jaedenar
    .target Greta Mosshoof
step
    .goto Felwood,50.9,81.6
    >>Talk to |cRXP_FRIENDLY_Taronn Redfeather|r
    .accept 5156 >>Accept Verifying the Corruption
    .target Taronn Redfeather
step
    .goto Felwood,48,91
    >>Deadwood furbolgs right by Grazle
    .complete -8460,1 --Deadwood Warrior (6)
    .mob +Deadwood Warrior
    .complete -8460,2 --Deadwood Pathfinder (6)
    .mob +Deadwood Pathfinder
    .complete -8460,3 --Deadwood Gardener (6)
    .mob +Deadwood Gardener
step
    .goto Felwood,50.9,85
    >>Turn in to Grazle; take Speak to Nafien
    .turnin -8460 >>Turn in Timbermaw Ally
    .target Grazle
step
    .goto Felwood,50.9,85
    >>Talk to |cRXP_FRIENDLY_Grazle|r
    .accept 8462,2,8460 >>Accept Speak to Nafien
    .target Grazle
step
    #completewith next
    .goto Felwood,34.5,52.5,40 >>Ride north to Bloodvenom Post
step
    .goto Felwood,34.2,52.3
    >>Talk to |cRXP_FRIENDLY_Winna Hazzard|r
    .accept 4505 >>Accept Well of Corruption
    .target Winna Hazzard
step
    .goto Felwood,34.7,52.8
    >>Talk to |cRXP_FRIENDLY_Trull Failbane|r
    .accept 4521 >>Accept Wild Guardians
    .target Trull Failbane
step
    .goto Felwood,37,61
    >>Jaedenar: hounds, guardians, adepts and cultists
    .complete -5155,1 --Jaedenar Hound (4)
    .mob +Jaedenar Hound
    .complete -5155,2 --Jaedenar Guardian (4)
    .mob +Jaedenar Guardian
    .complete -5155,3 --Jaedenar Adept (6)
    .mob +Jaedenar Adept
    .complete -5155,4 --Jaedenar Cultist (6)
    .mob +Jaedenar Cultist
step
    .goto Felwood,32,67
    >>Fill the flasket at the Well of Corruption, then lead a saber home
    .complete -4505,1 --Filled Flasket (1)
    .use 12566
    .complete -4506,1 --Return the corrupted cat to Winna Hazzard (1)
    .use 12565
step
    .goto Felwood,43,40
    >>Shatter Scar Vale: Entropic Beasts and Horrors, and explore the craters
    .complete -5156,1 --Entropic Beast (2)
    .mob +Entropic Beast
    .complete -5156,2 --Entropic Horror (2)
    .mob +Entropic Horror
    .complete -5156,3 --Explore the craters in Shatter Scar Vale (1)
step
    >>Raging and Ragged Owlbeasts
    .complete -4521,1 --Raging Owlbeast (15)
    .mob +Raging Owlbeast
    .complete -4521,2 --Ragged Owlbeast (15)
    .mob +Ragged Owlbeast
step
    >>Angerclaw Grizzlies and Felpaw Ravagers (quest from Feralas)
    .complete -4120,1 --Angerclaw Grizzly (12)
    .mob +Angerclaw Grizzly
    .complete -4120,2 --Felpaw Ravager (12)
    .mob +Felpaw Ravager
step
    .goto Felwood,34.2,52.3
    >>Turn in at Bloodvenom Post and pick up the owlbeast follow-up
    .turnin -4505 >>Turn in Well of Corruption
    .turnin -4506 >>Turn in Corrupted Sabers
    .target Winna Hazzard
step
    .goto Felwood,34.7,52.8
    >>Turn in at Bloodvenom Post and pick up the owlbeast follow-up
    .turnin -4521 >>Turn in Wild Guardians
    .target Trull Failbane
step
    .goto Felwood,34.7,52.8
    >>Talk to |cRXP_FRIENDLY_Trull Failbane|r
    .accept 4741,2,4521 >>Accept Wild Guardians
    .target Trull Failbane
step
    >>Moontouched Owlbeasts
    .complete -4741,1 --Moontouched Owlbeast (13)
    .mob +Moontouched Owlbeast
step
    .goto Felwood,34.7,52.8
    >>Turn in; pick up the last Wild Guardians
    .turnin -4741 >>Turn in Wild Guardians
    .target Trull Failbane
step
    .goto Felwood,34.7,52.8
    >>Talk to |cRXP_FRIENDLY_Trull Failbane|r
    .accept 4721,2,4741 >>Accept Wild Guardians
    .target Trull Failbane
step
    #completewith next
    .goto Felwood,64.8,8.1,40 >>North Felwood: Nafien at the Timbermaw tunnel
step
    .goto Felwood,62,9
    >>Deadwood Den Watchers, Avengers and Shaman near the tunnel
    .complete -8461,1 --Deadwood Den Watcher (6)
    .mob +Deadwood Den Watcher
    .complete -8461,2 --Deadwood Avenger (6)
    .mob +Deadwood Avenger
    .complete -8461,3 --Deadwood Shaman (6)
    .mob +Deadwood Shaman
step
    .goto Felwood,64.8,8.1
    >>Turn in to Nafien; take Speak to Salfa for Winterspring
    .turnin -8461 >>Turn in Deadwood of the North
    .target Nafien
step
    .goto Felwood,64.8,8.1
    >>Talk to |cRXP_FRIENDLY_Nafien|r
    .accept 8465,2,8461 >>Accept Speak to Salfa
    .target Nafien
step
    .goto Felwood,51.2,82.1
    >>Emerald Sanctuary: turn in and continue the Jaedenar chain if you like
    .turnin -5155 >>Turn in Forces of Jaedenar
    .target Greta Mosshoof
step
    .goto Felwood,50.9,81.6
    >>Emerald Sanctuary: turn in and continue the Jaedenar chain if you like
    .turnin -5156 >>Turn in Verifying the Corruption
    .target Taronn Redfeather
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 48-52 Dungeon: Alcaz Prison
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 50-53 Un'Goro Crater

step
    #completewith start
    +|cRXP_WARN_Alcaz Prison|r (48-52). Long rumored to hold high-ranking prisoners, including King Varian Wrynn, the prison on Alcaz Island has been out of reach until now. Inside, the Defias Brotherhood and the naga are at war.
step
    #label start
    >>Unlock: Speak with Nazeer Bloodspike in Brackenwall Village.
    .accept 95283 >>Accept The Missing Kor'kron
    .complete 95283,1 --The Missing Kor'kron
    .turnin 95283 >>Turn in The Missing Kor'kron
step
    >>Unlock: Find the missing Kor'kron Elites.
    .accept 95284 >>Accept The Elite of the Elite
    .complete 95284,1 --The Elite of the Elite
    .turnin 95284 >>Turn in The Elite of the Elite
step
    >>Unlock: Speak with Sergeant Ulka to learn more about the situation on Alcaz Isle.
    .accept 95285 >>Accept Right Place, Wrong Time
    .complete 95285,1 --Speak with Sergeant Ulka (1)
    .turnin 95285 >>Turn in Right Place, Wrong Time
step
    .goto Dustwallow Marsh,70.2,18.8
    >>Talk to |cRXP_FRIENDLY_Sergeant Ulka|r. Chain: The Missing Kor'kron > The Elite of the Elite > Right Place, Wrong Time
    .accept 96334 >>Accept Blood Red Bandanas
    .target Sergeant Ulka
    .isQuestTurnedIn 95283,95284,95285
step
    .goto Dustwallow Marsh,70.2,18.8
    >>Talk to |cRXP_FRIENDLY_Sergeant Ulka|r. Chain: The Missing Kor'kron > The Elite of the Elite > Right Place, Wrong Time
    .accept 96332 >>Accept A Little Payback
    .target Sergeant Ulka
    .isQuestTurnedIn 95283,95284,95285
step
    #completewith run
    >>Inside: Commander Folkar, inside Alcaz Prison
    .accept 95483 >>Accept Thrall Needs to Know
step
    #completewith run
    >>Inside: Mason Connery, inside Alcaz Prison, once you free him
    .accept 96337 >>Accept More Valuable Than Gold
step
    #completewith next
    .goto Dustwallow Marsh,75.3,14.1,40 >>Travel to the Alcaz Prison entrance
step
    #label run
    >>Run Alcaz Prison and do its quests
    .complete -95483,1 --Thrall Needs to Know
    .complete -96334,1 --Blood Red Bandanas
    .complete -96332,1 --A Little Payback
    .complete -96337,1 --More Valuable Than Gold
step
    >>Turn in
    .turnin -95483,1 >>Turn in Thrall Needs to Know
    .turnin -96337,1 >>Turn in More Valuable Than Gold
step
    .goto Dustwallow Marsh,70.2,18.8
    >>Talk to |cRXP_FRIENDLY_Sergeant Ulka|r
    .turnin -96334,1 >>Turn in Blood Red Bandanas
    .turnin -96332,1 >>Turn in A Little Payback
    .target Sergeant Ulka
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 50-53 Un'Goro Crater
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 50-54 Dungeon: Sunken Temple

step
    #completewith start
    +|cRXP_WARN_Un'Goro Crater|r (50-53). A pterrordax kill quest, the Horde-only plant kill quest, and a handful of one-click jobs. Duo tip: Skip the crystal collecting; four colors of 7 each is slow for two people. Skip: Crystals of Power and the pylons (28 crystals); Muigin and Larion (Alliance; drops); The Scent of Lar'korwi (pheromone drops).
step
    #label start
    .goto Un'Goro Crater,43.5,8.4
    >>Talk to |cRXP_FRIENDLY_Beware of Pterrordax|r
    .accept 4501 >>Accept Beware of Pterrordax
step
    .goto Un'Goro Crater,45.5,8.7
    >>Talk to |cRXP_FRIENDLY_Larion|r
    .accept 4145 >>Accept Larion and Muigin
    .target Larion
step
    .goto Un'Goro Crater,44,7.1
    >>Talk to |cRXP_FRIENDLY_Williden Marshal|r
    .accept 3881 >>Accept Expedition Salvation
    .target Williden Marshal
step
    .goto Un'Goro Crater,43.9,7.2
    >>Talk to |cRXP_FRIENDLY_Hol'anyee Marshal|r
    .accept 3883 >>Accept Alien Ecology
    .target Hol'anyee Marshal
step
    .goto Un'Goro Crater,43.6,8.5
    >>Talk to |cRXP_FRIENDLY_Spraggle Frock|r
    .accept 4492 >>Accept Lost!
    .target Spraggle Frock
step
    .goto Un'Goro Crater,34,42
    >>Pterrordax in the west and north
    .complete -4501,1 --Pterrordax (10)
    .mob +Pterrordax
    .complete -4501,2 --Frenzied Pterrordax (15)
    .mob +Frenzied Pterrordax
step
    .goto Un'Goro Crater,60,39
    >>Bloodpetal plants around the north-east
    .complete -4145,1 --Bloodpetal Lasher (5)
    .mob +Bloodpetal Lasher
    .complete -4145,2 --Bloodpetal Trapper (5)
    .mob +Bloodpetal Trapper
    .complete -4145,3 --Bloodpetal Flayer (5)
    .mob +Bloodpetal Flayer
    .complete -4145,4 --Bloodpetal Thresher (5)
    .mob +Bloodpetal Thresher
step
    .goto Un'Goro Crater,54,51
    >>Crashed expedition: crate and research equipment
    .complete -3881,1 --Crate of Foodstuffs (1)
    .complete -3881,2 --Research Equipment (1)
step
    .goto Un'Goro Crater,52,50
    >>Find Ringo near the springs and walk him back
    .complete -4492,1 --Escort Ringo to Spraggle Frock at Marshal's Refuge
    .use 15722
    .complete -4491,1 --Escort Ringo to Spraggle Frock at Marshal's Refuge (1)
    .use 11804
step
    .goto Un'Goro Crater,49,85
    >>Gorishi hive: sample the hive wall
    .complete -3883,1 --Hive Wall Sample (1)
    .use 11132
step
    .goto Un'Goro Crater,30.9,50.4
    >>Talk to |cRXP_FRIENDLY_Krakle|r
    .accept 974 >>Accept Finding the Source
    .target Krakle
step
    .goto Un'Goro Crater,71.6,76
    >>Talk to |cRXP_FRIENDLY_Torwa Pathfinder|r
    .accept 4290 >>Accept The Fare of Lar'korwi
    .target Torwa Pathfinder
step
    >>Fire Plume Ridge thermometer; Threshadon carcass
    .complete -974,1 --Find the hottest area of Fire Plume Ridge (1)
    .use 12472
    .complete -4290,1 --Piece of Threshadon Carcass (1)
step
    .goto Un'Goro Crater,43.62,8.5
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin -4501 >>Turn in Beware of Pterrordax
    .turnin -4491 >>Turn in A Little Help From My Friends
    .target Spraggle Frock
step
    .goto Un'Goro Crater,45.5,8.7
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin -4145 >>Turn in Larion and Muigin
    .target Larion
step
    .goto Un'Goro Crater,44,7.1
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin -3881 >>Turn in Expedition Salvation
    .target Williden Marshal
step
    .goto Un'Goro Crater,43.9,7.2
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin -3883 >>Turn in Alien Ecology
    .target Hol'anyee Marshal
step
    .goto Un'Goro Crater,30.9,50.4
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin -974 >>Turn in Finding the Source
    .target Krakle
step
    .goto Un'Goro Crater,71.6,76
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin -4290 >>Turn in The Fare of Lar'korwi
    .target Torwa Pathfinder
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 50-54 Dungeon: Sunken Temple
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 52-54 Burning Steppes

step
    #completewith start
    +|cRXP_WARN_Sunken Temple|r (50-54). The Temple of Atal'Hakkar, sunk beneath the Pool of Tears in the Swamp of Sorrows. The Atal'ai trolls try to summon their blood god Hakkar here, while the green dragons of Eranikus guard the lower halls. Warrior: do the warrior chain before you go. Any Horde warrior trainer gives A Troubled Spirit, which sends you to the Fallen Hero of the Horde at the Blasted Lands entrance. His two kill quests (Helboar, then Shadowsworn) count the paladin's kills too, so do them together. Voodoo Feathers is then done inside: the six troll guardians on the balconies drop the feathers. Paladin: Forever has no Horde paladin quest here. The paladin's Sunken Temple quest, Forging the Mightstone, is Alliance only. Both of you: Jammal'an the Prophet and The God Hakkar are the big ones. The troll guardians you kill for Jammal'an are the same ones that drop the warrior's feathers. Sunken Temple is a five-player dungeon. A warrior tank and a paladin healer make a good core; fill three damage dealers.
step << Warrior
    >>Unlock: Speak with the Fallen Hero of the Horde at the entrance to the Blasted Lands. (from: Any Horde warrior trainer)
    .accept 8417 >>Accept A Troubled Spirit
    .complete 8417,1 << Warrior --A Troubled Spirit
    .turnin 8417 >>Turn in A Troubled Spirit
step << Warrior
    .goto Swamp of Sorrows,34.3,66.1
    >>Unlock: Kill 7 Helboar in the Blasted Lands and return to the Fallen Hero of the Horde.
    .accept 8423 >>Accept Warrior Kinship
    .complete 8423,1 << Warrior --Helboar (7)
    .mob +Helboar << Warrior
    .turnin 8423 >>Turn in Warrior Kinship
    .target Fallen Hero of the Horde
step << Warrior
    .goto Swamp of Sorrows,34.3,66.1
    >>Unlock: Slaughter the Shadowsworn in the Blasted Lands and return to the Fallen Hero of the Horde.
    .accept 8424 >>Accept War on the Shadowsworn
    .complete 8424,1 << Warrior --Shadowsworn Adept (20)
    .mob +Shadowsworn Adept << Warrior
    .complete 8424,2 << Warrior --Shadowsworn Cultist (10)
    .mob +Shadowsworn Cultist << Warrior
    .complete 8424,3 << Warrior --Shadowsworn Thug (20)
    .mob +Shadowsworn Thug << Warrior
    .turnin 8424 >>Turn in War on the Shadowsworn
    .target Fallen Hero of the Horde
    .isQuestTurnedIn 8423
step
    #label start
    .goto Swamp of Sorrows,48,55
    >>Talk to |cRXP_FRIENDLY_Fel'zerul|r. Chain: Pool of Tears > The Atal'ai Exile > Return to Fel'Zerul
    .accept 1445 >>Accept The Temple of Atal'Hakkar
    .target Fel'zerul
    .isQuestTurnedIn 1444
step << Warrior
    .goto Swamp of Sorrows,34.2,66
    >>Talk to |cRXP_FRIENDLY_Fallen Hero of the Horde|r. Chain: Warrior Kinship > War on the Shadowsworn
    .accept 8425 >>Accept Voodoo Feathers
    .target Fallen Hero of the Horde
    .isQuestTurnedIn 8424
step
    .goto Tanaris,52.6,45.8
    >>Talk to |cRXP_FRIENDLY_Marvon Rivetseeker|r. Chain: The Sunken Temple > The Stone Circle
    .accept 3446 >>Accept Into the Depths
    .target Marvon Rivetseeker
    .isQuestTurnedIn 3444
step
    .goto Tanaris,52.6,45.8
    >>Talk to |cRXP_FRIENDLY_Marvon Rivetseeker|r. Chain: The Sunken Temple > The Stone Circle
    .accept 3447 >>Accept Secret of the Circle
    .target Marvon Rivetseeker
    .isQuestTurnedIn 3444
step
    .goto Tanaris,67,22.4
    >>Talk to |cRXP_FRIENDLY_Yeh'kinya|r. Chain: Screecher Spirits > The Prophecy of Mosh'aru > The Ancient Egg
    .accept 3528 >>Accept The God Hakkar
    .target Yeh'kinya
    .isQuestTurnedIn 4787
step
    .goto The Barrens,62.4,38.6
    >>Talk to |cRXP_FRIENDLY_Liv Rizzlefix|r. Chain: Larion and Muigin > Marvon's Workshop
    .accept 4146 >>Accept Zapper Fuel
    .target Liv Rizzlefix
    .isQuestTurnedIn 4147
step
    .goto The Hinterlands,33.6,75.2
    >>Talk to |cRXP_FRIENDLY_Atal'ai Exile|r
    .accept 1446 >>Accept Jammal'an the Prophet
    .target Atal'ai Exile
step
    #completewith run
    >>Inside: Essence of Eranikus (drops from the Shade of Eranikus)
    .collect 10454,1,3373 --Essence of Eranikus
    .accept 3373 >>Accept The Essence of Eranikus
step
    #completewith next
    .goto Swamp of Sorrows,69.5,53.5,40 >>Travel to the Sunken Temple entrance
step
    #label run
    >>Run Sunken Temple and do its quests
    .complete -1445,1 --Fetish of Hakkar
    .mob +Enthralled Atal'ai
    .complete -3446,1 --Into the Depths
    .use 10466
    .complete -3447,1 --Secret of the Circle
    .complete -1446,1 --Head of Jammal'an
    .mob +Jammal'an the Prophet
    .complete -3528,1 --Filled Egg of Hakkar
    .use 10465
    .complete -3373,1 --The Essence of Eranikus
    .use 10454
    .complete -4146,1 --Atal'ai Haze
    .mob +Murk Worm
    .mob +Saturated Ooze
    .mob +Deep Lurker
    .use 11319
    .complete -8425,1 << Warrior --Amber Voodoo Feather
    .mob +Gasher << Warrior
    .mob +Zul'Lor << Warrior
    .complete -8425,2 << Warrior --Blue Voodoo Feather
    .mob +Hukku << Warrior
    .mob +Mijan << Warrior
    .complete -8425,3 << Warrior --Green Voodoo Feather
    .mob +Zolo << Warrior
    .mob +Loro << Warrior
step
    >>Turn in
    .turnin -3446,1 >>Turn in Into the Depths
    .turnin -3447,1 >>Turn in Secret of the Circle
    .turnin -3373,1 >>Turn in The Essence of Eranikus
step
    .goto Swamp of Sorrows,48,55
    >>Talk to |cRXP_FRIENDLY_Fel'zerul|r
    .turnin -1445,1 >>Turn in The Temple of Atal'Hakkar
    .target Fel'zerul
step
    .goto Swamp of Sorrows,34.2,66
    >>Talk to |cRXP_FRIENDLY_Fallen Hero of the Horde|r
    .turnin -8425,1 >>Turn in Voodoo Feathers << Warrior
    .target Fallen Hero of the Horde
step
    .goto Tanaris,67,22.4
    >>Talk to |cRXP_FRIENDLY_Yeh'kinya|r
    .turnin -3528,1 >>Turn in The God Hakkar
    .target Yeh'kinya
step
    .goto The Hinterlands,33.6,75.2
    >>Talk to |cRXP_FRIENDLY_Atal'ai Exile|r
    .turnin -1446,1 >>Turn in Jammal'an the Prophet
    .target Atal'ai Exile
step
    .goto Un'Goro Crater,45.54,8.72
    >>Talk to |cRXP_FRIENDLY_Larion|r
    .turnin -4146,1 >>Turn in Zapper Fuel
    .target Larion
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 52-54 Burning Steppes
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 52-58 Dungeon: Blackrock Depths

step
    #completewith start
    +|cRXP_WARN_Burning Steppes|r (52-54). Not many Horde kill quests, but Flame Crest is where you pick up the Blackrock dungeon quests. Duo tip: Do this right before Blackrock Depths and Lower Blackrock Spire.
step
    #label start
    .goto Burning Steppes,65.2,23.9
    >>Talk to |cRXP_FRIENDLY_Maxwort Uberglint|r
    .accept 4296 >>Accept Tablet of the Seven
    .target Maxwort Uberglint
step
    .goto Burning Steppes,65.2,24
    >>Talk to |cRXP_FRIENDLY_Tinkee Steamboil|r
    .accept 4726 >>Accept Broodling Essence
    .target Tinkee Steamboil
step
    .goto Burning Steppes,54,41
    >>Read the Tablet of the Seven at the Ruins of Thaurissan
    .complete -4296,1 --Tablet Transcript (1)
step
    .goto Burning Steppes,64,57
    >>Broodlings near Blackrock Stronghold: capture essence before each kill
    .complete -4726,1 --Broodling Essence (8)
    .use 12284
step
    .goto Burning Steppes,65.2,23.9
    >>Turn in at Flame Crest
    .turnin -4296 >>Turn in Tablet of the Seven
    .target Maxwort Uberglint
step
    .goto Burning Steppes,65.2,24
    >>Turn in at Flame Crest
    .turnin -4726 >>Turn in Broodling Essence
    .target Tinkee Steamboil
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 52-58 Dungeon: Blackrock Depths
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 52-55 Western Plaguelands

step
    #completewith start
    +|cRXP_WARN_Blackrock Depths|r (52-58). The capital of the Dark Iron dwarves beneath Blackrock Mountain: the Detention Block, the Ring of Law, the Grim Guzzler and Shadowforge City, ruled by Emperor Dagran Thaurissan.
step
    #label start
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Shadowmage Vivian Lagrave|r
    .accept 4134 >>Accept Lost Thunderbrew Recipe
    .target Shadowmage Vivian Lagrave
step
    .goto Badlands,3.4,48.2
    >>Talk to |cRXP_FRIENDLY_Thunderheart|r. Chain: Disharmony of Flame
    .accept 3907 >>Accept Disharmony of Fire
    .target Thunderheart
    .isQuestTurnedIn 3906
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Shadowmage Vivian Lagrave|r. Chain: Disharmony of Flame
    .accept 7201 >>Accept The Last Element
    .target Shadowmage Vivian Lagrave
    .isQuestTurnedIn 3906
step
    .goto Badlands,25.8,45
    >>Talk to |cRXP_FRIENDLY_Lotwil Veriatus|r. Chain: The Rise of the Machines > The Rise of the Machines
    .accept 4063 >>Accept The Rise of the Machines
    .target Lotwil Veriatus
    .isQuestTurnedIn 4062
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Warlord Goretooth|r. Chain: KILL ON SIGHT: Dark Iron Dwarves > KILL ON SIGHT: High Ranking Dark Iron Officials > Grark Lorkrub > Precarious Predicament
    .accept 4132 >>Accept Operation: Death to Angerforge
    .target Warlord Goretooth
    .isQuestTurnedIn 4121
step
    .goto Burning Steppes,29,28.9
    >>Talk to |cRXP_FRIENDLY_Franclorn Forgewright|r. Chain: Dark Iron Legacy
    .accept 3802 >>Accept Dark Iron Legacy
    .target Franclorn Forgewright
    .isQuestTurnedIn 3801
step
    .goto Burning Steppes,65.2,23.8
    >>Talk to |cRXP_FRIENDLY_Maxwort Uberglint|r
    .accept 4123 >>Accept The Heart of the Mountain
    .target Maxwort Uberglint
step
    .goto Burning Steppes,66,22
    >>Talk to |cRXP_FRIENDLY_Yuka Screwspigot|r
    .accept 4136 >>Accept Ribbly Screwspigot
    .target Yuka Screwspigot
step
    .goto Burning Steppes,94.8,31.6
    >>Talk to |cRXP_FRIENDLY_Cyrus Therepentous|r
    .accept 4024 >>Accept A Taste of Flame
    .target Cyrus Therepentous
    .isQuestTurnedIn 4022,4023
step
    .goto Mulgore,33.4,22.5
    >>Talk to |cRXP_FRIENDLY_Alaana Stormwalker|r
    .accept 97197 >>Accept Fragment of the Firelands
    .target Alaana Stormwalker
step
    .goto Orgrimmar,32,37.8
    >>Talk to |cRXP_FRIENDLY_Thrall|r. Chain: Disharmony of Flame > Commander Gor'shak > What Is Going On? > What Is Going On? > The Eastern Kingdom
    .accept 4003 >>Accept The Royal Rescue
    .target Thrall
    .isQuestTurnedIn 4002
step
    .goto Searing Gorge,32.1,94.7
    >>Talk to |cRXP_FRIENDLY_Lothos Riftwaker|r
    .accept 7848 >>Accept Attunement to the Core
    .target Lothos Riftwaker
step
    #completewith run
    >>Inside: Gloom'rel, Blackrock Depths
    .accept 4083 >>Accept The Spectral Chalice
step
    #completewith run
    >>Inside: Mistress Nagmara, Blackrock Depths
    .accept 4201 >>Accept The Love Potion
step
    #completewith run
    >>Inside: Thorium Brotherhood Contract (from Lokhtos Darkbargainer with a Sulfuron Ingot)
    .collect 18628,1,7604 --Thorium Brotherhood Contract
    .accept 7604 >>Accept A Binding Contract
step
    #completewith run
    >>Inside: Private Rocknot, Grim Guzzler, Blackrock Depths
    .accept 4295 >>Accept Rocknot's Ale
step
    #completewith run
    >>Inside: Falrin Treeshaper, the Athenaeum, Dire Maul (West)
    .accept 9015 >>Accept The Challenge
step
    #completewith run
    >>The Love Potion also needs items from outside the dungeon
    .complete -4201,1 --Gromsblood
    .mob +Razorlash
    .complete -4201,2 --Giant Silver Vein
    .mob +Cliff Breaker
    .mob +Cliff Thunderer
    .mob +Cliff Walker
    .complete -4201,3 --Nagmara's Filled Vial
    .use 11412
step
    #completewith run
    >>Rocknot's Ale also needs items from outside the dungeon
    .complete -4295,1 --Dark Iron Ale Mug
step
    #completewith next
    .goto Searing Gorge,34.8,84,40 >>Travel to the Blackrock Depths entrance
step
    #label run
    >>Run Blackrock Depths and do its quests
    .complete -3802,1 --Ironfel
    .mob +Fineous Darkvire
    .complete -4123,1 --The Heart of the Mountain
    .complete -4083,1 --Star Ruby
    .complete -4083,2 --Gold Bar
    .complete -4083,3 --Truesilver Bar
    .complete -4136,1 --Ribbly's Head
    .mob +Ribbly Screwspigot
    .complete -4134,1 --Lost Thunderbrew Recipe
    .mob +Hurley Blackbreath
    .mob +Blackbreath Crony
    .complete -3907,1 --Lord Incendius
    .mob +Lord Incendius
    .complete -3907,2 --Tablet of Kurniya
    .mob +Lord Incendius
    .complete -7201,1 --Essence of the Elements
    .complete -4063,1 --Head of Argelmach
    .mob +Golem Lord Argelmach
    .complete -4063,2 --Intact Elemental Core
    .mob +Warbringer Construct
    .mob +Ragereaver Golem
    .mob +Wrath Hammer Construct
    .mob +Molten War Golem
    .complete -4132,1 --General Angerforge
    .mob +General Angerforge
    .complete -4024,1 --Encased Fiery Essence
    .mob +Bael'Gar
    .use 11231
    .complete -4003,1 --Emperor Dagran Thaurissan
    .mob +Emperor Dagran Thaurissan
    .complete -7848,1 --Core Fragment
    .complete -7604,1 --Sulfuron Ingot
    .mob +Golemagg the Incinerator
    .use 18628
    .complete -97197,1 --Fragment of the Firelands
    .complete -9015,1 --Theldren
    .mob +Theldren
    .complete -9015,2 --Top Piece of Lord Valthalak's Amulet
    .mob +Theldren
    .use 21986
step
    >>Turn in
    .turnin -3802,1 >>Turn in Dark Iron Legacy
    .turnin -4083,1 >>Turn in The Spectral Chalice
step
    >>Talk to |cRXP_FRIENDLY_Mistress Nagmara|r
    .turnin -4201,1 >>Turn in The Love Potion
    .target Mistress Nagmara
step
    >>Talk to |cRXP_FRIENDLY_Princess Moira Bronzebeard|r
    .turnin -4003,1 >>Turn in The Royal Rescue
    .target Princess Moira Bronzebeard
step
    >>Talk to |cRXP_FRIENDLY_Lokhtos Darkbargainer|r
    .turnin -7604,1 >>Turn in A Binding Contract
    .target Lokhtos Darkbargainer
step
    >>Talk to |cRXP_FRIENDLY_Private Rocknot|r
    .turnin -4295,1 >>Turn in Rocknot's Ale
    .target Private Rocknot
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Shadowmage Vivian Lagrave|r
    .turnin -4134,1 >>Turn in Lost Thunderbrew Recipe
    .turnin -7201,1 >>Turn in The Last Element
    .target Shadowmage Vivian Lagrave
step
    .goto Badlands,3.4,48.2
    >>Talk to |cRXP_FRIENDLY_Thunderheart|r
    .turnin -3907,1 >>Turn in Disharmony of Fire
    .target Thunderheart
step
    .goto Badlands,25.8,45
    >>Talk to |cRXP_FRIENDLY_Lotwil Veriatus|r
    .turnin -4063,1 >>Turn in The Rise of the Machines
    .target Lotwil Veriatus
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Warlord Goretooth|r
    .turnin -4132,1 >>Turn in Operation: Death to Angerforge
    .target Warlord Goretooth
step
    .goto Burning Steppes,65.2,23.8
    >>Talk to |cRXP_FRIENDLY_Maxwort Uberglint|r
    .turnin -4123,1 >>Turn in The Heart of the Mountain
    .target Maxwort Uberglint
step
    .goto Burning Steppes,66,22
    >>Talk to |cRXP_FRIENDLY_Yuka Screwspigot|r
    .turnin -4136,1 >>Turn in Ribbly Screwspigot
    .target Yuka Screwspigot
step
    .goto Burning Steppes,94.8,31.6
    >>Talk to |cRXP_FRIENDLY_Cyrus Therepentous|r
    .turnin -4024,1 >>Turn in A Taste of Flame
    .target Cyrus Therepentous
step
    .goto Eastern Plaguelands,26.11,11.3
    >>Talk to |cRXP_FRIENDLY_Anthion Harmon|r
    .turnin -9015,1 >>Turn in The Challenge
    .target Anthion Harmon
step
    .goto Mulgore,33.4,22.5
    >>Talk to |cRXP_FRIENDLY_Alaana Stormwalker|r
    .turnin -97197,1 >>Turn in Fragment of the Firelands
    .target Alaana Stormwalker
step
    .goto Searing Gorge,32.1,94.7
    >>Talk to |cRXP_FRIENDLY_Lothos Riftwaker|r
    .turnin -7848,1 >>Turn in Attunement to the Core
    .target Lothos Riftwaker
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 52-55 Western Plaguelands
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 53-57 Eastern Plaguelands

step
    #completewith start
    +|cRXP_WARN_Western Plaguelands|r (52-55). Andorhal and the Scarlet camps give a tidy loop of kill and one-click quests. Duo tip: Chromie's chain in Andorhal later leads into Eastern Plaguelands' Darrowshire story. Skip: Most Caer Darrow quests (they lead into Scholomance; see that chapter).
step
    #label start
    .goto Tirisfal Glades,83.1,68.9
    >>Talk to |cRXP_FRIENDLY_High Executor Derrington|r
    .accept 5096 >>Accept Scarlet Diversions
    .target High Executor Derrington
step
    .goto Western Plaguelands,53.7,64.7
    >>Talk to |cRXP_FRIENDLY_Mulgris Deepriver|r
    .accept 4984 >>Accept The Wildlife Suffers Too
    .target Mulgris Deepriver
step
    .goto Western Plaguelands,41,52
    >>Scarlet camp: burn the tent and plant the banner
    .complete -5096,1 --Flame in a Bottle (1)
    .complete -5096,2 --Destroy the command tent and plant the Scourge banner in the camp (1)
    .use 12807
step
    .goto Western Plaguelands,47,44
    >>Diseased Wolves
    .complete -4984,1 --Diseased Wolf (8)
    .mob +Diseased Wolf
step
    .goto Tirisfal Glades,83.1,68.9
    >>Turn in at The Bulwark and pick up the follow-ups
    .turnin -5096 >>Turn in Scarlet Diversions
    .target High Executor Derrington
step
    .goto Western Plaguelands,53.7,64.7
    >>Turn in at The Bulwark and pick up the follow-ups
    .turnin -4984 >>Turn in The Wildlife Suffers Too
    .target Mulgris Deepriver
step
    .goto Tirisfal Glades,83.1,68.9
    >>Talk to |cRXP_FRIENDLY_High Executor Derrington|r
    .accept 5098,2,5096 >>Accept All Along the Watchtowers
    .target High Executor Derrington
step
    .goto Western Plaguelands,53.7,64.7
    >>Talk to |cRXP_FRIENDLY_Mulgris Deepriver|r
    .accept 4985,2,4984 >>Accept The Wildlife Suffers Too
    .target Mulgris Deepriver
step
    .goto Western Plaguelands,39.5,66.8
    >>Talk to |cRXP_FRIENDLY_Chromie|r
    .accept 4971 >>Accept A Matter of Time
    .target Chromie
step
    .goto Western Plaguelands,44,68
    >>Andorhal: mark the four towers, kill Temporal Parasites
    .complete -5098,1 --Tower One marked (1)
    .complete -5098,2 --Tower Two marked (1)
    .complete -5098,3 --Tower Three marked (1)
    .complete -5098,4 --Tower Four marked (1)
    .use 12815
    .complete -4971,1 --Temporal Parasite (15)
    .mob +Temporal Parasite
    .use 12627
step
    .goto Western Plaguelands,39.5,66.8
    >>Turn in to Chromie; pick up Counting Out Time
    .turnin -4971 >>Turn in A Matter of Time
    .target Chromie
step
    .goto Western Plaguelands,39.5,66.8
    >>Talk to |cRXP_FRIENDLY_Chromie|r
    .accept 4972,2,4971 >>Accept Counting Out Time
    .target Chromie
step
    .goto Western Plaguelands,43,70
    >>Andorhal watches
    .complete -4972,1 --Andorhal Watch (5)
step
    .goto Western Plaguelands,60,53
    >>Diseased Grizzlies
    .complete -4985,1 --Diseased Grizzly (8)
    .mob +Diseased Grizzly
step
    .goto Western Plaguelands,39.5,66.8
    >>Turn in: Chromie and The Bulwark; take Alas, Andorhal
    .turnin -4972 >>Turn in Counting Out Time
    .target Chromie
step
    .goto Western Plaguelands,53.7,64.7
    >>Turn in: Chromie and The Bulwark; take Alas, Andorhal
    .turnin -4985 >>Turn in The Wildlife Suffers Too
    .target Mulgris Deepriver
step
    .goto Tirisfal Glades,83.1,68.9
    >>Turn in: Chromie and The Bulwark; take Alas, Andorhal
    .turnin -5098 >>Turn in All Along the Watchtowers
    .target High Executor Derrington
step
    .goto Tirisfal Glades,83.1,68.9
    >>Talk to |cRXP_FRIENDLY_High Executor Derrington|r
    .accept 105,2,5098 >>Accept Alas, Andorhal
    .target High Executor Derrington
step
    .goto Western Plaguelands,45,69
    >>Kill Araj the Summoner in Andorhal and click his phylactery
    .complete -105,1 --Araj's Phylactery Shard (1)
step
    .goto Tirisfal Glades,83.1,68.9
    >>Turn in at The Bulwark
    .turnin -105 >>Turn in Alas, Andorhal
    .target High Executor Derrington
step
    .goto Western Plaguelands,51.9,28.1
    >>Talk to |cRXP_FRIENDLY_Kirsta Deepshadow|r
    .accept 6004 >>Accept Unfinished Business
    .target Kirsta Deepshadow
step
    >>Northridge Lumber Camp Scarlets, then the two named Scarlets, then look over Hearthglen
    .complete -6004,1 --Scarlet Medic (2)
    .mob +Scarlet Medic
    .complete -6004,2 --Scarlet Hunter (2)
    .mob +Scarlet Hunter
    .complete -6004,3 --Scarlet Mage (2)
    .mob +Scarlet Mage
    .complete -6004,4 --Scarlet Knight (2)
    .mob +Scarlet Knight
    .complete -6023,1 --Huntsman Radley (1)
    .mob +Huntsman Radley
    .complete -6023,2 --Cavalier Durgen (1)
    .mob +Cavalier Durgen
    .complete -6025,1 --Overlook Hearthglen from a high vantage point (1)
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 53-57 Eastern Plaguelands
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 54-57 Winterspring

step
    #completewith start
    +|cRXP_WARN_Eastern Plaguelands|r (53-57). Two big shared kill quests from Tirion, two more from Nathanos, and the Darrowshire story. Duo tip: Light's Hope Chapel is the flight point and where the Stratholme and Scholomance quests start. Skip: Carrion Grubbage (worm meat drops); To Kill With Purpose (rot drops); Bolstering Our Defenses (world PvP towers).
step
    #label start
    .goto Eastern Plaguelands,5.2,35.6
    >>Talk to |cRXP_FRIENDLY_Tirion Fordring|r
    .accept 5542 >>Accept Demon Dogs
    .accept 5543 >>Accept Blood Tinged Skies
    .target Tirion Fordring
step
    .goto Eastern Plaguelands,22.2,63.5
    >>Talk to |cRXP_FRIENDLY_Nathanos Blightcaller|r
    .accept 6042 >>Accept Un-Life's Little Annoyances
    .accept 6133 >>Accept The Ranger Lord's Behest
    .target Nathanos Blightcaller
step
    .goto Eastern Plaguelands,11.4,26.4
    >>Talk to |cRXP_FRIENDLY_Augustus the Touched|r
    .accept 6164 >>Accept Augustus' Receipt Book
    .target Augustus the Touched
step
    .goto Eastern Plaguelands,14,24
    >>Augustus' Receipt Book in the Terrordale inn
    .complete -6164,1 --Augustus' Receipt Book (1)
step
    .goto Eastern Plaguelands,31,64
    >>Plaguebats and Plaguehounds across the west and middle
    .complete -5543,1 --Plaguebat (30)
    .mob +Plaguebat
    .complete -5542,1 --Plaguehound Runt (20)
    .mob +Plaguehound Runt
    .complete -5542,2 --Plaguehound (5)
    .mob +Plaguehound
    .complete -5542,3 --Frenzied Plaguehound (5)
    .mob +Frenzied Plaguehound
step
    .goto Eastern Plaguelands,48,45
    >>Noxious and Monstrous Plaguebats
    .complete -6042,1 --Noxious Plaguebat (20)
    .mob +Noxious Plaguebat
    .complete -6042,2 --Monstrous Plaguebat (10)
    .mob +Monstrous Plaguebat
step
    .goto Eastern Plaguelands,46,13
    >>North-west Quel'Thalas camp: Pathstriders, Rangers, Woodsmen and the Registry
    .complete -6133,1 --Pathstrider (8)
    .mob +Pathstrider
    .complete -6133,2 --Ranger (8)
    .mob +Ranger
    .complete -6133,3 --Woodsman (8)
    .mob +Woodsman
    .complete -6133,4 --Quel'Thalas Registry (1)
step
    .goto Eastern Plaguelands,5.2,35.6
    >>Turn in to Tirion, Nathanos and Augustus
    .turnin -5542 >>Turn in Demon Dogs
    .turnin -5543 >>Turn in Blood Tinged Skies
    .target Tirion Fordring
step
    .goto Eastern Plaguelands,22.2,63.5
    >>Turn in to Tirion, Nathanos and Augustus
    .turnin -6042 >>Turn in Un-Life's Little Annoyances
    .turnin -6133 >>Turn in The Ranger Lord's Behest
    .target Nathanos Blightcaller
step
    .goto Eastern Plaguelands,11.4,26.4
    >>Turn in to Tirion, Nathanos and Augustus
    .turnin -6164 >>Turn in Augustus' Receipt Book
    .target Augustus the Touched
step
    .goto Eastern Plaguelands,71.7,50
    >>Talk to |cRXP_FRIENDLY_Carlin Redpath|r
    .accept 5211 >>Accept Defenders of Darrowshire
    .target Carlin Redpath
step
    .goto Eastern Plaguelands,30,25
    >>Free 15 Darrowshire spirits in the north-west
    .complete -5211,1 --Darrowshire Spirits Freed (15)
    .mob +Darrowshire Spirit
step
    .goto Eastern Plaguelands,71.7,50
    >>Turn in at Light's Hope
    .turnin -5211 >>Turn in Defenders of Darrowshire
    .target Carlin Redpath
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 54-57 Winterspring
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 55-60 Mount Hyjal

step
    #completewith start
    +|cRXP_WARN_Winterspring|r (54-57). The Winterfall furbolg kill quests carry on the Timbermaw story from Felwood. Duo tip: Storm Shadowhoof's first two hunts are single named beasts and the kill counts for both of you. The third (Shy-Rotam) needs dropped meat, so it is left out. Skip: Are We There, Yeti? (horn drops); Chillwind Horns (drops).
step
    #label start
    .goto Felwood,64.8,8.1
    >>Talk to |cRXP_FRIENDLY_Nafien|r
    .accept 8465,2,8461 >>Accept Speak to Salfa
    .target Nafien
step
    .goto Winterspring,27.7,34.5
    >>Talk to |cRXP_FRIENDLY_Salfa|r
    .accept 8464 >>Accept Winterfall Activity
    .target Salfa
step
    .goto Winterspring,31.3,45.2
    >>Talk to |cRXP_FRIENDLY_Donova Snowden|r
    .accept 5082 >>Accept Threat of the Winterfall
    .target Donova Snowden
step
    .goto Winterspring,36,40
    >>Winterfall furbolgs west and north of Donova
    .complete -8464,1 --Winterfall Shaman (8)
    .mob +Winterfall Shaman
    .complete -8464,2 --Winterfall Den Watcher (8)
    .mob +Winterfall Den Watcher
    .complete -8464,3 --Winterfall Ursa (8)
    .mob +Winterfall Ursa
    .complete -5082,1 --Winterfall Pathfinder (8)
    .mob +Winterfall Pathfinder
    .complete -5082,2 --Winterfall Den Watcher (8)
    .mob +Winterfall Den Watcher
    .complete -5082,3 --Winterfall Totemic (8)
    .mob +Winterfall Totemic
step
    .goto Winterspring,27.7,34.5
    >>Turn in to Salfa and Donova
    .turnin -8464 >>Turn in Winterfall Activity
    .target Salfa
step
    .goto Winterspring,31.3,45.2
    >>Turn in to Salfa and Donova
    .turnin -5082 >>Turn in Threat of the Winterfall
    .target Donova Snowden
step
    .goto Winterspring,61.9,38.4
    >>Talk to |cRXP_FRIENDLY_Storm Shadowhoof|r
    .accept 5054 >>Accept Ursius of the Shardtooth
    .target Storm Shadowhoof
step
    .goto Winterspring,60.9,32.9
    >>Hunt Ursius
    .complete -5054,1 --Ursius (1)
    .mob +Ursius
step
    .goto Winterspring,61.9,38.4
    >>Turn in at Everlook; pick up the next hunt
    .turnin -5054 >>Turn in Ursius of the Shardtooth
    .target Storm Shadowhoof
step
    .goto Winterspring,61.9,38.4
    >>Talk to |cRXP_FRIENDLY_Storm Shadowhoof|r
    .accept 5055,2,5054 >>Accept Brumeran of the Chillwind
    .target Storm Shadowhoof
step
    .goto Winterspring,62.5,57.9
    >>Hunt Brumeran
    .complete -5055,1 --Brumeran (1)
    .mob +Brumeran
step
    .goto Winterspring,61.9,38.4
    >>Turn in at Everlook
    .turnin -5055 >>Turn in Brumeran of the Chillwind
    .target Storm Shadowhoof
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Mount Hyjal
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 56-60 Silithus

step
    #completewith start
    +|cRXP_WARN_Mount Hyjal|r (55-60). Forever's new zone has a lot of kill and quick quests. The quest databases don't have its quest givers or chain order yet, so this chapter is a checklist, not a route. Duo tip: Several other zones send you here with breadcrumbs (A Cousin Abroad, The Grand Alliance, The Source of the Corruption). Take them on the way.
step
    #label start
    >>Kill quests: |cRXP_WARN_Deal Dread to Deadwood|r. Defeat 8 Deadwood Totemics and 8 Deadwood Fel-Tenders and return to Elder Pinespeaker.
    .accept 93826 >>Accept Deal Dread to Deadwood
    .complete 93826,1 --Deadwood Totemic (8)
    .mob +Deadwood Totemic
    .complete 93826,2 --Deadwood Fel-Tender (8)
    .mob +Deadwood Fel-Tender
    .turnin 93826 >>Turn in Deal Dread to Deadwood
step
    >>Kill quests: |cRXP_WARN_Balance Through Strength|r. Defeat 9 Deadwood Den Guardians and return to Brerufa.
    .accept 93952 >>Accept Balance Through Strength
    .complete 93952,1 --Deadwood Den Guardian (9)
    .mob +Deadwood Den Guardian
    .turnin 93952 >>Turn in Balance Through Strength
step
    >>Kill quests: |cRXP_WARN_Taste of Ash|r. Slay 12 Ashen Acolytes.
    .accept 95318 >>Accept Taste of Ash
    .complete 95318,1 --Ashen Acolyte (12)
    .mob +Ashen Acolyte
    .turnin 95318 >>Turn in Taste of Ash
step
    >>Kill quests: |cRXP_WARN_Cult Closure|r. Kill 10 Blackthorne Adepts and 10 Wild-branded Cultists.
    .accept 93584 >>Accept Cult Closure
    .complete 93584,1 --Blackthorne Cultist (10)
    .mob +Blackthorne Cultist
    .complete 93584,2 --Blackthorne Adept (10)
    .mob +Blackthorne Adept
    .turnin 93584 >>Turn in Cult Closure
step
    >>Kill quests: |cRXP_WARN_Stemming the Demon Tide|r. Slay 12 Felguard Sentinels in Dae'gun.
    .accept 95793 >>Accept Stemming the Demon Tide
    .complete 95793,1 --Felguard Sentinel (12)
    .mob +Felguard Sentinel
    .turnin 95793 >>Turn in Stemming the Demon Tide
step
    >>Kill quests: |cRXP_WARN_Kindling, Kinda|r. Destroy 15 Tainted Shrubbery for Kaylaena Springwhisper at the workshop in the Tainted Foothills.
    .accept 92594 >>Accept Kindling, Kinda
    .complete 92594,1 --Tainted Shrubbery (15)
    .mob +Tainted Shrubbery
    .turnin 92594 >>Turn in Kindling, Kinda
step
    >>Kill quests: |cRXP_WARN_Blight No More|r. Eliminate 3 Forgotten Soldiers and 12 Fleshflay Raveners.
    .accept 95026 >>Accept Blight No More
    .complete 95026,1 --Forgotten Soldier (3)
    .mob +Forgotten Soldier
    .complete 95026,2 --Fleshflay Ravener (12)
    .mob +Fleshflay Ravener
    .turnin 95026 >>Turn in Blight No More
step
    >>Kill quests: |cRXP_WARN_The Experimental Method|r. Use the pinecones to destroy the Ashen Reign workstations.
    .accept 95316 >>Accept The Experimental Method
    .complete 95316,1 --Vessel Workstation disrupted (1)
    .complete 95316,2 --Disease Workstation disrupted (1)
    .complete 95316,3 --Alchemy Workstation disrupted (1)
    .complete 95316,4 --Slime Workstation disrupted (1)
    .turnin 95316 >>Turn in The Experimental Method
step
    >>Kill quests: |cRXP_WARN_Drawing Down the Malevolent|r. Use the Eye of Endless Influence on Bethra'zel and Mazzogore to siphon their power, then deliver the killing blow.
    .accept 96003 >>Accept Drawing Down the Malevolent
    .complete 96003,1 --Bethra'zel slain (1)
    .complete 96003,2 --Mazzogore slain (1)
    .turnin 96003 >>Turn in Drawing Down the Malevolent
step
    >>Named targets: |cRXP_WARN_Celastrus the Bitter|r. Find and destroy Celastrus the Bitter, and return to Thylaen with its broken frond.
    .accept 91923 >>Accept Celastrus the Bitter
    .complete 91923,1 --Broken Frond of Celastrus (1)
    .turnin 91923 >>Turn in Celastrus the Bitter
step
    >>Named targets: |cRXP_WARN_Ve'han's Fall|r. Use the Staff of the Mountain to strip Ve'han Talongrasp of his stolen power, then destroy him.
    .accept 92833 >>Accept Ve'han's Fall
    .complete 92833,1 --Ve'han Talongrasp (1)
    .mob +Ve'han Talongrasp
    .turnin 92833 >>Turn in Ve'han's Fall
step
    >>Named targets: |cRXP_WARN_Blackthorne Blackout|r. Kill the Blackthorne Courier and confiscate her message.
    .accept 93422 >>Accept Blackthorne Blackout
    .complete 93422,1 --Blackthorne Courier (1)
    .mob +Blackthorne Courier
    .complete 93422,2 --Blackthorne Intelligence (1)
    .turnin 93422 >>Turn in Blackthorne Blackout
step
    >>Named targets: |cRXP_WARN_A Revenge So Sweet|r. Slay Brashann Grimdark and search his body for his soulstone.
    .accept 95379 >>Accept A Revenge So Sweet
    .complete 95379,1 --Brashann Grimdark (1)
    .mob +Brashann Grimdark
    .turnin 95379 >>Turn in A Revenge So Sweet
step
    >>Named targets: |cRXP_WARN_Amalgamated Marrow|r. Slay the Awakened Fel Ash Slime.
    .accept 96255 >>Accept Amalgamated Marrow
    .complete 96255,1 --Awakened Fel Ash Slime (1)
    .mob +Awakened Fel Ash Slime
    .turnin 96255 >>Turn in Amalgamated Marrow
step
    >>Named targets: |cRXP_WARN_Spear of the Skylord|r. Slay Zarrat Wormwing and return Omnuron's Spear.
    .accept 91883 >>Accept Spear of the Skylord
    .complete 91883,1 --Omnuron's Spear (1)
    .turnin 91883 >>Turn in Spear of the Skylord
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Ancient Allies|r. Travel west from the hermit's cave to find an outpost of ancients and dryads on the lower slopes of Mount Hyjal.
    .accept 90487 >>Accept Ancient Allies
    .complete 90487,1 --Ancient Allies
    .turnin 90487 >>Turn in Ancient Allies
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Meet the Elders|r. Find and speak with Elder Mistpaw and Elder Pinespeaker within Barkskin Burrow.
    .accept 91697 >>Accept Meet the Elders
    .complete 91697,1 --Elder Pinespeaker met (1)
    .complete 91697,2 --Elder Mistpaw met (1)
    .turnin 91697 >>Turn in Meet the Elders
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Bark Bite|r. Apply the poultice to Fraxinus.
    .accept 91770 >>Accept Bark Bite
    .complete 91770,1 --Fraxinus soothed (1)
    .turnin 91770 >>Turn in Bark Bite
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Of Friend and Fur|r. Enter Barkskin Burrow and find the furbolg they call Osi.
    .accept 92111 >>Accept Of Friend and Fur
    .complete 92111,1 --Of Friend and Fur
    .turnin 92111 >>Turn in Of Friend and Fur
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Anywhere But Here|r. Find the Veteran of the Third War's scabbard near Elderwild.
    .accept 92100 >>Accept Anywhere But Here
    .complete 92100,1 --Anywhere But Here
    .turnin 92100 >>Turn in Anywhere But Here
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Lifted by Legacy|r. Find the Veteran of the Third War's markings of significance on the Great Lift.
    .accept 92101 >>Accept Lifted by Legacy
    .complete 92101,1 --Lifted by Legacy
    .turnin 92101 >>Turn in Lifted by Legacy
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Summit Sentries|r. Reactivate the sentinel stones north, west, and south around the Blackthorne cultists.
    .accept 93127 >>Accept Summit Sentries
    .complete 93127,1 --Northern Sentinel Stone empowered (1)
    .complete 93127,2 --Western Sentinel Stone empowered (1)
    .complete 93127,3 --Southern Sentinel Stone empowered (1)
    .turnin 93127 >>Turn in Summit Sentries
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Wake Memories|r. Find the anchor on Lake Everstill the War Veteran remembers from childhood.
    .accept 93510 >>Accept Wake Memories
    .complete 93510,1 --Wake Memories
    .turnin 93510 >>Turn in Wake Memories
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Kits and Cats|r. Find Shalla'kal's kittens in the wilds of Mount Hyjal.
    .accept 93615 >>Accept Kits and Cats
    .complete 93615,1 --Solstice found (1)
    .complete 93615,2 --Whisperfur found (1)
    .complete 93615,3 --Brie found (1)
    .turnin 93615 >>Turn in Kits and Cats
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Violence Into Verdure|r. Plant the Enchanted Seeds near the Ruined Ballista, the Ruined Catapult, and the Ruined Flying Machine.
    .accept 93747 >>Accept Violence Into Verdure
    .complete 93747,1 --Ruined Ballista reclaimed (1)
    .complete 93747,2 --Ruined Catapult reclaimed (1)
    .complete 93747,3 --Ruined Flying Machine reclaimed (1)
    .turnin 93747 >>Turn in Violence Into Verdure
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_A Curious Question|r. Find the imprisoned demon.
    .accept 95320 >>Accept A Curious Question
    .complete 95320,1 --A Curious Question
    .turnin 95320 >>Turn in A Curious Question
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Memory Mist|r. Use the Enchanted Branch to release 5 wisps around Nordrassil.
    .accept 96303 >>Accept Memory Mist
    .complete 96303,1 --Wisp released (5)
    .turnin 96303 >>Turn in Memory Mist
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 56-60 Silithus
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 55-60 Dungeon: Lower Blackrock Spire

step
    #completewith start
    +|cRXP_WARN_Silithus|r (56-60). A short two-step dredge kill chain and the Twilight Geolords at 60. Duo tip: Most Silithus quests are drop-heavy or feed the Ahn'Qiraj war effort; only the kill quests are listed. Skip: The Twilight Mystery (8 fragments); Noggle's quests (stinger drops).
step
    #label start
    .goto Silithus,51.2,38.3
    >>Talk to |cRXP_FRIENDLY_Windcaller Proudhorn|r
    .accept 8280 >>Accept Securing the Supply Lines
    .target Windcaller Proudhorn
step
    .goto Silithus,58,27
    >>Dredge Strikers
    .complete -8280,1 --Dredge Striker (15)
    .mob +Dredge Striker
step
    .goto Silithus,51.2,38.3
    >>Turn in; pick up the follow-up
    .turnin -8280 >>Turn in Securing the Supply Lines
    .target Windcaller Proudhorn
step
    .goto Silithus,51.2,38.3
    >>Talk to |cRXP_FRIENDLY_Windcaller Proudhorn|r
    .accept 8281,2,8280 >>Accept Stepping Up Security
    .target Windcaller Proudhorn
step
    .goto Silithus,39,54
    >>Dredge Crushers
    .complete -8281,1 --Dredge Crusher (20)
    .mob +Dredge Crusher
step
    .goto Silithus,51.2,38.3
    >>Turn in at Cenarion Hold
    .turnin -8281 >>Turn in Stepping Up Security
    .target Windcaller Proudhorn
step
    .goto Silithus,49.2,34.2
    >>Talk to |cRXP_FRIENDLY_Commander Mar'alith|r
    .accept 8304 >>Accept Dearest Natalia
    .target Commander Mar'alith
step
    .goto Silithus,48.6,37.9
    >>Talk to |cRXP_FRIENDLY_Huum Wildmane|r
    .accept 8320 >>Accept Twilight Geolords
    .target Huum Wildmane
step
    .goto Silithus,41,89
    >>Question Frankal and Rutgar at the south-west hive
    .complete -8304,1 --Frankal Questioned (1)
    .complete -8304,2 --Rutgar Questioned (1)
step
    .goto Silithus,29,37
    >>Twilight Geolords
    .complete -8320,1 --Twilight Geolord (10)
    .mob +Twilight Geolord
step
    .goto Silithus,49.2,34.2
    >>Turn in at Cenarion Hold
    .turnin -8304 >>Turn in Dearest Natalia
    .target Commander Mar'alith
step
    .goto Silithus,48.6,37.9
    >>Turn in at Cenarion Hold
    .turnin -8320 >>Turn in Twilight Geolords
    .target Huum Wildmane
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Dungeon: Lower Blackrock Spire
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 55-60 Dungeon: Dire Maul: East

step
    #completewith start
    +|cRXP_WARN_Lower Blackrock Spire|r (55-60). The lower halls of Blackrock Spire, held by the Spirestone, Smolderthorn and Bloodaxe clans of the Dark Horde under Overlord Wyrmthalak.
step
    #label start
    .goto Badlands,5.8,47.4
    >>Talk to |cRXP_FRIENDLY_Lexlort|r
    .accept 4981 >>Accept Operative Bijou
    .target Lexlort
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Warlord Goretooth|r
    .accept 4903 >>Accept Warlord's Command
    .target Warlord Goretooth
step
    .goto Badlands,5.8,47.4
    >>Talk to |cRXP_FRIENDLY_Galamav the Marksman|r
    .accept 4724 >>Accept The Pack Mistress
    .target Galamav the Marksman
step
    .goto Burning Steppes,65.8,22
    >>Talk to |cRXP_FRIENDLY_Kibler|r
    .accept 4729 >>Accept Kibler's Exotic Pets
    .target Kibler
step
    .goto Burning Steppes,65.8,22
    >>Talk to |cRXP_FRIENDLY_Kibler|r
    .accept 4862 >>Accept En-Ay-Es-Tee-Why
    .target Kibler
step
    .goto Burning Steppes,65,23.6
    >>Talk to |cRXP_FRIENDLY_Ragged John|r
    .accept 4866 >>Accept Mother's Milk
    .target Ragged John
step
    .goto Tanaris,66.8,24
    >>Talk to |cRXP_FRIENDLY_Prospector Ironboot|r. Chain: Screecher Spirits > The Prophecy of Mosh'aru > The Ancient Egg > The God Hakkar > The Lost Tablets of Mosh'aru
    .accept 4788 >>Accept The Final Tablets
    .target Prospector Ironboot
    .isQuestTurnedIn 5065
step
    #completewith run
    >>Inside: Vaelan (Scarshield Infiltrator), Lower Blackrock Spire
    .accept 4742 >>Accept Seal of Ascension
step
    #completewith run
    >>Inside: Bijou, Lower Blackrock Spire
    .accept 4982 >>Accept Bijou's Belongings
step
    #completewith run
    >>Inside: Warosh, Lower Blackrock Spire
    .accept 4867 >>Accept Urok Doomhowl
step
    #completewith next
    .goto Searing Gorge,34.8,84,40 >>Travel to the Lower Blackrock Spire entrance
step
    #label run
    >>Run Lower Blackrock Spire and do its quests
    .complete -4742,1 --Gemstone of Spirestone
    .mob +Highlord Omokk
    .complete -4742,2 --Gemstone of Smolderthorn
    .mob +War Master Voone
    .complete -4742,3 --Gemstone of Bloodaxe
    .mob +Overlord Wyrmthalak
    .complete -4742,4 --Unadorned Seal of Ascension
    .complete -4981,1 --Operative Bijou
    .complete -4982,1 --Bijou's Belongings
    .complete -4903,1 --Overlord Wyrmthalak
    .mob +Overlord Wyrmthalak
    .complete -4903,2 --Highlord Omokk
    .mob +Highlord Omokk
    .complete -4903,3 --War Master Voone
    .mob +War Master Voone
    .complete -4903,4 --Important Blackrock Documents
    .complete -4724,1 --Halycon
    .mob +Halycon
    .complete -4729,1 --Caged Worg Pup
    .use 12262
    .complete -4862,1 --Spire Spider Egg
    .complete -4866,1 --Ragged John
    .mob +Ragged John
    .complete -4867,1 --Warosh's Mojo
    .mob +Urok Doomhowl
    .use 12730
    .complete -4788,1 --Fifth Mosh'aru Tablet
    .complete -4788,2 --Sixth Mosh'aru Tablet
step
    >>Talk to |cRXP_FRIENDLY_Scarshield Infiltrator|r
    .turnin -4742,1 >>Turn in Seal of Ascension
    .target Scarshield Infiltrator
step
    >>Talk to |cRXP_FRIENDLY_Bijou|r
    .turnin -4981,1 >>Turn in Operative Bijou
    .turnin -4982,1 >>Turn in Bijou's Belongings
    .target Bijou
step
    >>Talk to |cRXP_FRIENDLY_Warosh|r
    .turnin -4867,1 >>Turn in Urok Doomhowl
    .target Warosh
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Warlord Goretooth|r
    .turnin -4903,1 >>Turn in Warlord's Command
    .target Warlord Goretooth
step
    .goto Badlands,5.8,47.4
    >>Talk to |cRXP_FRIENDLY_Galamav the Marksman|r
    .turnin -4724,1 >>Turn in The Pack Mistress
    .target Galamav the Marksman
step
    .goto Burning Steppes,65.8,22
    >>Talk to |cRXP_FRIENDLY_Kibler|r
    .turnin -4729,1 >>Turn in Kibler's Exotic Pets
    .turnin -4862,1 >>Turn in En-Ay-Es-Tee-Why
    .target Kibler
step
    .goto Burning Steppes,65,23.6
    >>Talk to |cRXP_FRIENDLY_Ragged John|r
    .turnin -4866,1 >>Turn in Mother's Milk
    .target Ragged John
step
    .goto Tanaris,66.8,24
    >>Talk to |cRXP_FRIENDLY_Prospector Ironboot|r
    .turnin -4788,1 >>Turn in The Final Tablets
    .target Prospector Ironboot
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Dungeon: Dire Maul: East
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 55-60 Dungeon: Blackmaw Hold

step
    #completewith start
    +|cRXP_WARN_Dire Maul: East|r (55-60). The eastern quarter of the ruined Highborne city of Eldre'Thalas, overgrown by the Warpwood and ruled by the satyr Alzzin the Wildshaper. Pusillin carries the Crescent Key that opens the other wings.
step
    #label start
    .goto Feralas,76.8,37.4
    >>Talk to |cRXP_FRIENDLY_Azj'Tordin|r
    .accept 7441 >>Accept Pusillin and the Elder Azj'Tordin
    .target Azj'Tordin
step
    .goto Feralas,76,43.8
    >>Talk to |cRXP_FRIENDLY_Talo Thornhoof|r
    .accept 7489 >>Accept Lethtendris's Web
    .target Talo Thornhoof
step
    .goto Moonglade,51.6,44.4
    >>Talk to |cRXP_FRIENDLY_Rabine Saturna|r. Chain: A Reliquary of Purity
    .accept 5526 >>Accept Shards of the Felvine
    .target Rabine Saturna
    .isQuestTurnedIn 5527
step
    #completewith next
    .goto Feralas,59,45,40 >>Travel to the Dire Maul: East entrance
step
    #label run
    >>Run Dire Maul: East and do its quests
    .complete -7441,1 --Book of Incantations
    .mob +Pusillin
    .complete -7489,1 --Lethtendris's Web
    .mob +Lethtendris
    .complete -5526,1 --Sealed Reliquary of Purity
    .use 18539
step
    .goto Feralas,76.8,37.4
    >>Talk to |cRXP_FRIENDLY_Azj'Tordin|r
    .turnin -7441,1 >>Turn in Pusillin and the Elder Azj'Tordin
    .target Azj'Tordin
step
    .goto Feralas,76,43.8
    >>Talk to |cRXP_FRIENDLY_Talo Thornhoof|r
    .turnin -7489,1 >>Turn in Lethtendris's Web
    .target Talo Thornhoof
step
    .goto Moonglade,51.6,44.4
    >>Talk to |cRXP_FRIENDLY_Rabine Saturna|r
    .turnin -5526,1 >>Turn in Shards of the Felvine
    .target Rabine Saturna
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Dungeon: Blackmaw Hold
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 57-60 Dungeon: Dire Maul: West

step
    #completewith start
    +|cRXP_WARN_Blackmaw Hold|r (55-60). Beyond a long-sealed gate in Azshara lies the furbolg city of the Blackmaw clan, fighting a corruption that spreads through its groves and mountain tunnels. A large max-level dungeon with several routes and bosses; its depths may lead even farther below Azeroth.
step
    #label start
    .goto Azshara,42.4,42.6
    >>Talk to |cRXP_FRIENDLY_Ogtinc|r
    .accept 92069 >>Accept Claws That Rend, Tusks that Gore
    .target Ogtinc
step
    .goto Azshara,41.8,38.8
    >>Talk to |cRXP_FRIENDLY_Ekkal|r
    .accept 97327 >>Accept Blackmaw Pouches
    .target Ekkal
step
    .goto Azshara,38.3,32.1
    >>Talk to |cRXP_FRIENDLY_Gatekeeper Rageroar|r
    .accept 92065 >>Accept Blackmaw Reclamation
    .target Gatekeeper Rageroar
step
    .goto Azshara,41.8,38.8
    >>Talk to |cRXP_FRIENDLY_Ekkal|r
    .accept 96246 >>Accept Blackmaw Pouches
    .target Ekkal
step
    .goto Thunder Bluff,75.6,31
    >>Talk to |cRXP_FRIENDLY_Nara Wildmane|r. Chain: Beneath Nordrassil
    .accept 92343 >>Accept Get to the Roots of It
    .target Nara Wildmane
    .isQuestTurnedIn 92346
step
    #completewith run
    >>Inside: Not known yet (perhaps Alaana Stormwalker, Mulgore)
    .accept 97198 >>Accept Blackmaw Magic
step
    #completewith run
    >>Inside: Item start: Feathered Charm Necklace, looted in Blackmaw Hold
    .accept 92070 >>Accept A Lost Memento
step
    #completewith run
    >>Inside: Lorekeeper Nok, Ursolan (probably; he takes the totems)
    .accept 92066 >>Accept The Twin Bears
step
    #completewith run
    >>Inside: Not known yet
    .accept 92067 >>Accept Feeding Time!
step
    #completewith next
    .goto Azshara,38.6,33.2,40 >>Travel to the Blackmaw Hold entrance
step
    #label run
    >>Run Blackmaw Hold and do its quests
    .complete -92343,1 --Get to the Roots of It
    .complete -97198,1 --Blackmaw Magic
    .complete -92069,1 --Claws That Rend, Tusks that Gore
    .complete -92070,1 --A Lost Memento
    .complete -97327,1 --Blackmaw Pouches
    .complete -92066,1 --The Twin Bears
    .complete -92065,1 --Blackmaw Reclamation
    .complete -96246,1 --Blackmaw Pouches
    .complete -92067,1 --Feeding Time!
step
    >>Turn in
    .turnin -97198,1 >>Turn in Blackmaw Magic
    .turnin -92070,1 >>Turn in A Lost Memento
    .turnin -92066,1 >>Turn in The Twin Bears
    .turnin -92067,1 >>Turn in Feeding Time!
step
    .goto Azshara,42.4,42.6
    >>Talk to |cRXP_FRIENDLY_Ogtinc|r
    .turnin -92069,1 >>Turn in Claws That Rend, Tusks that Gore
    .target Ogtinc
step
    .goto Azshara,41.8,38.8
    >>Talk to |cRXP_FRIENDLY_Ekkal|r
    .turnin -97327,1 >>Turn in Blackmaw Pouches
    .turnin -96246,1 >>Turn in Blackmaw Pouches
    .target Ekkal
step
    .goto Azshara,38.3,32.1
    >>Talk to |cRXP_FRIENDLY_Gatekeeper Rageroar|r
    .turnin -92065,1 >>Turn in Blackmaw Reclamation
    .target Gatekeeper Rageroar
step
    .goto Thunder Bluff,75.6,31
    >>Talk to |cRXP_FRIENDLY_Nara Wildmane|r
    .turnin -92343,1 >>Turn in Get to the Roots of It
    .target Nara Wildmane
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 57-60 Dungeon: Dire Maul: West
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 57-60 Dungeon: Dire Maul: North

step
    #completewith start
    +|cRXP_WARN_Dire Maul: West|r (57-60). The Capital Gardens and the Court of the Highborne, where the last Shen'dralar keep the demon Immol'thar imprisoned behind five pylons. Needs the Crescent Key from Pusillin.
step
    #label start
    .goto Feralas,74.4,44
    >>Talk to |cRXP_FRIENDLY_Sage Korolusk|r
    .accept 7481 >>Accept Elven Legends
    .target Sage Korolusk
step
    #completewith run
    >>Inside: Shen'dralar Ancient, Dire Maul
    .accept 7461 >>Accept The Madness Within
step
    #completewith run
    >>Inside: Captain Kromcrush, Dire Maul
    .accept 7703 >>Accept Unfinished Gordok Business
step
    #completewith next
    .goto Feralas,59,45,40 >>Travel to the Dire Maul: West entrance
step
    #label run
    >>Run Dire Maul: West and do its quests
    .complete -7461,1 --Immol'thar
    .mob +Immol'thar
    .complete -7461,2 --Prince Tortheldrin
    .mob +Prince Tortheldrin
    .complete -7481,1 --Skeletal Remains of Telmius Dreamseeker
    .complete -7703,1 --Gauntlet of Gordok Might
step
    >>Talk to |cRXP_FRIENDLY_Shen'dralar Ancient|r
    .turnin -7461,1 >>Turn in The Madness Within
    .target Shen'dralar Ancient
step
    >>Talk to |cRXP_FRIENDLY_Captain Kromcrush|r
    .turnin -7703,1 >>Turn in Unfinished Gordok Business
    .target Captain Kromcrush
step
    .goto Feralas,74.4,44
    >>Talk to |cRXP_FRIENDLY_Sage Korolusk|r
    .turnin -7481,1 >>Turn in Elven Legends
    .target Sage Korolusk
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 57-60 Dungeon: Dire Maul: North
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 57-60 Dungeon: Upper Blackrock Spire

step
    #completewith start
    +|cRXP_WARN_Dire Maul: North|r (57-60). Gordok Commons, the ogre-held northern wing. Kill King Gordok to become the new king; leave the guards alive (the Tribute Run) for a bigger tribute chest.
step
    #label start
    .goto Feralas,74.4,44
    >>Talk to |cRXP_FRIENDLY_Sage Korolusk|r
    .accept 7481 >>Accept Elven Legends
    .target Sage Korolusk
step
    #completewith run
    >>Inside: Captain Kromcrush, Dire Maul
    .accept 7703 >>Accept Unfinished Gordok Business
step
    #completewith run
    >>Inside: Knot Thimblejack, Dire Maul
    .accept 5525 >>Accept Free Knot!
step
    #completewith run
    >>Inside: Knot Thimblejack, Dire Maul
    .accept 5518 >>Accept The Gordok Ogre Suit
step << Paladin
    #completewith run
    >>Inside: The Light and How To Swing It (book, Dire Maul drop)
    .collect 18359,1,7501 --The Light and How to Swing It
    .accept 7501 >>Accept The Light and How To Swing It
step << Warrior
    #completewith run
    >>Inside: Codex of Defense (book, Dire Maul drop)
    .collect 18357,1,7499 --Codex of Defense
    .accept 7499 >>Accept Codex of Defense
step << Warrior/Paladin
    #completewith run
    >>Inside: Nostro's Compendium of Dragon Slaying (rare Dire Maul drop)
    .collect 18401,1,7507 --Nostro's Compendium of Dragon Slaying
    .accept 7507 >>Accept Nostro's Compendium
step
    #completewith run
    >>Inside: Lorekeeper Lydros, Athenaeum, Dire Maul
    .accept 7483 >>Accept Libram of Rapidity
step
    #completewith run
    >>Inside: Lorekeeper Lydros, Athenaeum, Dire Maul
    .accept 7484 >>Accept Libram of Focus
step
    #completewith run
    >>Inside: Lorekeeper Lydros, Athenaeum, Dire Maul
    .accept 7485 >>Accept Libram of Protection
step
    #completewith run
    >>The Gordok Ogre Suit also needs items from outside the dungeon
    .complete -5518,1 --Bolt of Runecloth
    .complete -5518,2 --Rugged Leather
    .complete -5518,3 --Rune Thread
    .complete -5518,4 --Ogre Tannin
step
    #completewith run
    >>Libram of Rapidity also needs items from outside the dungeon
    .complete -7483,1 --Libram of Rapidity
    .complete -7483,2 --Pristine Black Diamond
    .complete -7483,3 --Large Brilliant Shard
    .complete -7483,4 --Blood of Heroes
step
    #completewith run
    >>Libram of Focus also needs items from outside the dungeon
    .complete -7484,1 --Libram of Focus
    .complete -7484,2 --Pristine Black Diamond
    .complete -7484,3 --Large Brilliant Shard
    .complete -7484,4 --Skin of Shadow
step
    #completewith run
    >>Libram of Protection also needs items from outside the dungeon
    .complete -7485,1 --Libram of Protection
    .complete -7485,2 --Pristine Black Diamond
    .complete -7485,3 --Large Brilliant Shard
    .complete -7485,4 --Frayed Abomination Stitching
step
    #completewith next
    .goto Feralas,59,45,40 >>Travel to the Dire Maul: North entrance
step
    #label run
    >>Run Dire Maul: North and do its quests
    .complete -7703,1 --Gauntlet of Gordok Might
    .complete -5525,1 --Gordok Shackle Key
    .complete -7481,1 --Skeletal Remains of Telmius Dreamseeker
    .complete -7501,1 << Paladin --The Light and How To Swing It
    .use 18359 << Paladin
    .complete -7499,1 << Warrior --Codex of Defense
    .use 18357 << Warrior
    .complete -7507,1 << Warrior/Paladin --Nostro's Compendium
    .use 18401 << Warrior/Paladin
step
    >>Talk to |cRXP_FRIENDLY_Captain Kromcrush|r
    .turnin -7703,1 >>Turn in Unfinished Gordok Business
    .target Captain Kromcrush
step
    >>Talk to |cRXP_FRIENDLY_Knot Thimblejack|r
    .turnin -5525,1 >>Turn in Free Knot!
    .turnin -5518,1 >>Turn in The Gordok Ogre Suit
    .target Knot Thimblejack
step
    >>Talk to |cRXP_FRIENDLY_Lorekeeper Mykos|r
    .turnin -7501,1 >>Turn in The Light and How To Swing It << Paladin
    .target Lorekeeper Mykos
step
    >>Talk to |cRXP_FRIENDLY_Lorekeeper Kildrath|r
    .turnin -7499,1 >>Turn in Codex of Defense << Warrior
    .target Lorekeeper Kildrath
step
    >>Talk to |cRXP_FRIENDLY_Lorekeeper Lydros|r
    .turnin -7507,1 >>Turn in Nostro's Compendium << Warrior/Paladin
    .turnin -7483,1 >>Turn in Libram of Rapidity
    .turnin -7484,1 >>Turn in Libram of Focus
    .turnin -7485,1 >>Turn in Libram of Protection
    .target Lorekeeper Lydros
step
    .goto Feralas,74.4,44
    >>Talk to |cRXP_FRIENDLY_Sage Korolusk|r
    .turnin -7481,1 >>Turn in Elven Legends
    .target Sage Korolusk
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 57-60 Dungeon: Upper Blackrock Spire
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Stratholme: Living

step
    #completewith start
    +|cRXP_WARN_Upper Blackrock Spire|r (57-60). The top of Blackrock Spire, held by Rend Blackhand's Dark Horde and General Drakkisath's black dragonflight. The door needs the Seal of Ascension.
step
    #label start
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Shadowmage Vivian Lagrave|r
    .accept 4768 >>Accept The Darkstone Tablet
    .target Shadowmage Vivian Lagrave
step
    .goto Burning Steppes,65.2,23.8
    >>Talk to |cRXP_FRIENDLY_Tinkee Steamboil|r. Chain: Broodling Essence > Felnok Steelspring > Chillwind Horns > Return to Tinkee > Tinkee Steamboil > Egg Freezing
    .accept 4735 >>Accept Egg Collection
    .target Tinkee Steamboil
    .isQuestTurnedIn 4734
step
    .goto Feralas,44.8,7.4
    >>Talk to |cRXP_FRIENDLY_Rexxar|r. Chain: Warlord's Command > Eitrigg's Wisdom > For The Horde! > What the Wind Carries > The Champion of the Horde > The Testament of Rexxar > Oculus Illusions > Emberstrife > The Test of Skulls, Scryer > The Test of Skulls, Somnus > The Test of Skulls, Chronalis > The Test of Skulls, Axtroz > Ascension...
    .accept 6602 >>Accept Blood of the Black Dragon Champion
    .target Rexxar
    .isQuestTurnedIn 6601
step
    .goto Winterspring,63.8,73.8
    >>Talk to |cRXP_FRIENDLY_Lorax|r
    .accept 5127 >>Accept The Demon Forge
    .target Lorax
    .isQuestTurnedIn 5126
step
    #completewith run
    >>Inside: Vaelan, Lower Blackrock Spire
    .accept 4743 >>Accept Seal of Ascension
step
    #completewith run
    >>Inside: Blackhand's Command (letter from the Scarshield Quartermaster, Blackrock Mountain)
    .collect 18987,1,7761 --Blackhand's Command
    .accept 7761 >>Accept Blackhand's Command
step
    #completewith run
    >>Inside: From The Beast's corpse, Upper Blackrock Spire
    .accept 5047 >>Accept Finkle Einhorn, At Your Service!
step
    #completewith run
    >>Inside: Awbee, Upper Blackrock Spire
    .accept 5160 >>Accept The Matron Protectorate
step
    #completewith next
    .goto Searing Gorge,34.8,84,40 >>Travel to the Upper Blackrock Spire entrance
step
    #label run
    >>Run Upper Blackrock Spire and do its quests
    .complete -4743,1 --Forged Seal of Ascension
    .use 12339
    .complete -7761,1 --Blackhand's Command
    .complete -4735,1 --Rookery Egg
    .use 12287
    .complete -6602,1 --Blood of the Black Dragon Champion
    .mob +General Drakkisath
    .complete -5127,1 --Soul Stained Pike
    .mob +Goraluk Anvilcrack
    .complete -5127,2 --Unforged Rune Covered Breastplate
    .use 12848
    .complete -4768,1 --Darkstone Tablet
    .complete -5047,1 --Finkle Einhorn, At Your Service!
    .use 12710
    .complete -5160,1 --The Matron Protectorate
    .use 12923
step
    >>Talk to |cRXP_FRIENDLY_Scarshield Infiltrator|r
    .turnin -4743,1 >>Turn in Seal of Ascension
    .target Scarshield Infiltrator
step
    >>Turn in
    .turnin -7761,1 >>Turn in Blackhand's Command
step
    .goto Badlands,3,47.6
    >>Talk to |cRXP_FRIENDLY_Shadowmage Vivian Lagrave|r
    .turnin -4768,1 >>Turn in The Darkstone Tablet
    .target Shadowmage Vivian Lagrave
step
    .goto Burning Steppes,65.2,23.8
    >>Talk to |cRXP_FRIENDLY_Tinkee Steamboil|r
    .turnin -4735,1 >>Turn in Egg Collection
    .target Tinkee Steamboil
step
    .goto Feralas,44.8,7.4
    >>Talk to |cRXP_FRIENDLY_Rexxar|r
    .turnin -6602,1 >>Turn in Blood of the Black Dragon Champion
    .target Rexxar
step
    .goto Winterspring,63.8,73.8
    >>Talk to |cRXP_FRIENDLY_Lorax|r
    .turnin -5127,1 >>Turn in The Demon Forge
    .target Lorax
step
    .goto Winterspring,60.99,38.78
    >>Talk to |cRXP_FRIENDLY_Malyfous Darkhammer|r
    .turnin -5047,1 >>Turn in Finkle Einhorn, At Your Service!
    .target Malyfous Darkhammer
step
    .goto Winterspring,54.55,51.2
    >>Talk to |cRXP_FRIENDLY_Haleh|r
    .turnin -5160,1 >>Turn in The Matron Protectorate
    .target Haleh
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Stratholme: Living
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Stratholme: Undead

step
    #completewith start
    +|cRXP_WARN_Stratholme: Living|r (58-60). The main gate of Stratholme: the burning streets, the Scarlet Bastion and the Hall of Lights, where Grand Crusader Dathrohan reveals himself as the dreadlord Balnazzar.
step
    #label start
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r
    .accept 5212 >>Accept The Flesh Does Not Lie
    .target Betina Bigglezink
step
    .goto Eastern Plaguelands,73.9,49
    >>Talk to |cRXP_FRIENDLY_Leonid Barthalomew the Revered|r
    .accept 5243 >>Accept Houses of the Holy
    .target Leonid Barthalomew the Revered
step
    .goto Eastern Plaguelands,72.8,49.2
    >>Talk to |cRXP_FRIENDLY_Smokey LaRue|r
    .accept 5214 >>Accept The Great Fras Siabi
    .target Smokey LaRue
step
    .goto Eastern Plaguelands,10.9,27.2
    >>Talk to |cRXP_FRIENDLY_Egan|r
    .accept 5282 >>Accept The Restless Souls
    .target Egan
    .isQuestTurnedIn 5281
step
    .goto Western Plaguelands,65.6,75.4
    >>Talk to |cRXP_FRIENDLY_Artist Renfray|r. Chain: Demon Dogs > Blood Tinged Skies > Carrion Grubbage > Redemption > Of Forgotten Memories > Of Lost Honor > Of Love and Family
    .accept 5848 >>Accept Of Love and Family
    .target Artist Renfray
    .isQuestTurnedIn 5846
step
    #completewith run
    >>Inside: Head of Balnazzar (drops from Balnazzar)
    .collect 13250,1,5262 --Head of Balnazzar
    .accept 5262 >>Accept The Truth Comes Crashing Down
step
    #completewith run
    >>Inside: Aurius, Stratholme
    .accept 5122 >>Accept The Medallion of Faith
step
    #completewith next
    .goto Eastern Plaguelands,30,15,40 >>Travel to the Stratholme: Living entrance
step
    #label run
    >>Run Stratholme: Living and do its quests
    .complete -5262,1 --The Truth Comes Crashing Down
    .use 13250
    .complete -5212,1 --Plagued Flesh Sample
    .complete -5243,1 --Stratholme Holy Water
    .complete -5214,1 --Grimm's Premium Tobacco
    .mob +Ezra Grimm
    .complete -5848,1 --Of Love and Family
    .complete -5122,1 --Medallion of Faith
    .complete -5282,1 --Souls Freed
    .mob +Restless Soul
    .use 13289
step
    >>Talk to |cRXP_FRIENDLY_Aurius|r
    .turnin -5122,1 >>Turn in The Medallion of Faith
    .target Aurius
step
    .goto Eastern Plaguelands,71.63,50.09
    >>Talk to |cRXP_FRIENDLY_Duke Nicholas Zverenhoff|r
    .turnin -5262,1 >>Turn in The Truth Comes Crashing Down
    .target Duke Nicholas Zverenhoff
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r
    .turnin -5212,1 >>Turn in The Flesh Does Not Lie
    .target Betina Bigglezink
step
    .goto Eastern Plaguelands,73.9,49
    >>Talk to |cRXP_FRIENDLY_Leonid Barthalomew the Revered|r
    .turnin -5243,1 >>Turn in Houses of the Holy
    .target Leonid Barthalomew the Revered
step
    .goto Eastern Plaguelands,72.8,49.2
    >>Talk to |cRXP_FRIENDLY_Smokey LaRue|r
    .turnin -5214,1 >>Turn in The Great Fras Siabi
    .target Smokey LaRue
step
    .goto Eastern Plaguelands,5.16,35.57
    >>Talk to |cRXP_FRIENDLY_Tirion Fordring|r
    .turnin -5848,1 >>Turn in Of Love and Family
    .target Tirion Fordring
step
    .goto Eastern Plaguelands,10.9,27.2
    >>Talk to |cRXP_FRIENDLY_Egan|r
    .turnin -5282,1 >>Turn in The Restless Souls
    .target Egan
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Stratholme: Undead
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Scholomance

step
    #completewith start
    +|cRXP_WARN_Stratholme: Undead|r (58-60). The service entrance side of Stratholme, held by the Scourge: the three ziggurats, the Slaughter House and Baron Rivendare's stronghold. Kill the Baron within 45 minutes to save Ysida Harmon.
step
    #label start
    .goto Eastern Plaguelands,73.7,50.8
    >>Talk to |cRXP_FRIENDLY_Duke Nicholas Zverenhoff|r. Chain: The Archivist > The Truth Comes Crashing Down
    .accept 5263 >>Accept Above and Beyond
    .target Duke Nicholas Zverenhoff
    .isQuestTurnedIn 5262
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r. Chain: The Flesh Does Not Lie
    .accept 5213 >>Accept The Active Agent
    .target Betina Bigglezink
    .isQuestTurnedIn 5212
step
    .goto Eastern Plaguelands,10.9,27.2
    >>Talk to |cRXP_FRIENDLY_Egan|r
    .accept 5282 >>Accept The Restless Souls
    .target Egan
    .isQuestTurnedIn 5281
step
    .goto Eastern Plaguelands,22.2,64.3
    >>Talk to |cRXP_FRIENDLY_Nathanos Blightcaller|r. Chain: The Ranger Lord's Behest > Un-Life's Little Annoyances > To Kill With Purpose > Duskwing, Oh How I Hate Thee... > The Corpulent One
    .accept 6163 >>Accept Ramstein
    .target Nathanos Blightcaller
    .isQuestTurnedIn 6135
    .isQuestTurnedIn 6136
step
    .goto Eastern Plaguelands,26.1,11.3
    >>Talk to |cRXP_FRIENDLY_Anthion Harmon|r
    .accept 8945 >>Accept Dead Man's Plea
    .target Anthion Harmon
    .isQuestTurnedIn 8929,8930
step
    .goto Eastern Plaguelands,73.9,49
    >>Talk to |cRXP_FRIENDLY_Leonid Barthalomew the Revered|r. Chain: Doctor Theolen Krastinov, the Butcher > Krastinov's Bag of Horrors > Kirtonos the Herald > The Human, Ras Frostwhisper > The Dying, Ras Frostwhisper
    .accept 5463 >>Accept Menethil's Gift
    .target Leonid Barthalomew the Revered
    .isQuestTurnedIn 5462
step
    #completewith run
    >>Inside: Aurius, Stratholme
    .accept 5125 >>Accept Aurius' Reckoning
step
    #completewith next
    .goto Eastern Plaguelands,44,19,40 >>Travel to the Stratholme: Undead entrance
step
    #label run
    >>Run Stratholme: Undead and do its quests
    .complete -5263,1 --Head of Baron Rivendare
    .mob +Baron Rivendare
    .complete -5213,1 --Scourge Data
    .complete -5282,1 --Souls Freed
    .mob +Restless Soul
    .use 13289
    .complete -6163,1 --Head of Ramstein the Gorger
    .mob +Ramstein the Gorger
    .complete -5125,1 --Aurius' Reckoning
    .complete -8945,1 --Ysida Freed
    .mob +Ysida Harmon
    .complete -5463,1 --Menethil's Gift
    .use 13585
step
    >>Talk to |cRXP_FRIENDLY_Aurius|r
    .turnin -5125,1 >>Turn in Aurius' Reckoning
    .target Aurius
step
    >>Talk to |cRXP_FRIENDLY_Ysida Harmon|r
    .turnin -8945,1 >>Turn in Dead Man's Plea
    .target Ysida Harmon
step
    >>Turn in
    .turnin -5463,1 >>Turn in Menethil's Gift
step
    .goto Eastern Plaguelands,73.7,50.8
    >>Talk to |cRXP_FRIENDLY_Duke Nicholas Zverenhoff|r
    .turnin -5263,1 >>Turn in Above and Beyond
    .target Duke Nicholas Zverenhoff
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r
    .turnin -5213,1 >>Turn in The Active Agent
    .target Betina Bigglezink
step
    .goto Eastern Plaguelands,10.9,27.2
    >>Talk to |cRXP_FRIENDLY_Egan|r
    .turnin -5282,1 >>Turn in The Restless Souls
    .target Egan
step
    .goto Eastern Plaguelands,22.2,64.3
    >>Talk to |cRXP_FRIENDLY_Nathanos Blightcaller|r
    .turnin -6163,1 >>Turn in Ramstein
    .target Nathanos Blightcaller
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Scholomance
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Shaper's Terrace

step
    #completewith start
    +|cRXP_WARN_Scholomance|r (58-60). The Barov family crypt on Caer Darrow, turned into the Cult of the Damned's school of necromancy. Darkmaster Gandling rules the halls; the Skeleton Key from the Barov quests opens the doors.
step
    #label start
    .goto Western Plaguelands,70.4,74
    >>Talk to |cRXP_FRIENDLY_Magistrate Marduke|r. Chain: Doctor Theolen Krastinov, the Butcher > Krastinov's Bag of Horrors > Kirtonos the Herald > The Human, Ras Frostwhisper > The Dying, Ras Frostwhisper > Menethil's Gift > Menethil's Gift > Soulbound Keepsake
    .accept 5466 >>Accept The Lich, Ras Frostwhisper
    .target Magistrate Marduke
    .isQuestTurnedIn 5465
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r. Chain: Broodling Essence > Felnok Steelspring > Chillwind Horns > Return to Tinkee > Tinkee Steamboil > Egg Freezing > Egg Collection > Leonid Barthalomew > Betina Bigglezink
    .accept 4771 >>Accept Dawn's Gambit
    .target Betina Bigglezink
    .isQuestTurnedIn 5531
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r
    .accept 5529 >>Accept Plagued Hatchlings
    .target Betina Bigglezink
step
    .goto Tirisfal Glades,83,71.4
    >>Talk to |cRXP_FRIENDLY_Alexi Barov|r
    .accept 5341 >>Accept Barov Family Fortune
    .target Alexi Barov
step
    #completewith next
    .goto Western Plaguelands,69.7,73.2,40 >>Travel to the Scholomance entrance
step
    #label run
    >>Run Scholomance and do its quests
    .complete -5466,1 --Human Head of Ras Frostwhisper
    .mob +Ras Frostwhisper
    .use 13752
    .complete -5341,1 --The Deed to Brill
    .complete -5341,2 --The Deed to Caer Darrow
    .complete -5341,3 --The Deed to Southshore
    .complete -5341,4 --The Deed to Tarren Mill
    .complete -4771,1 --Vectus
    .mob +Vectus
    .complete -4771,2 --Place Dawn's Gambit
    .use 12368
    .complete -5529,1 --Plagued Hatchling
    .mob +Plagued Hatchling
step
    .goto Western Plaguelands,70.4,74
    >>Talk to |cRXP_FRIENDLY_Magistrate Marduke|r
    .turnin -5466,1 >>Turn in The Lich, Ras Frostwhisper
    .target Magistrate Marduke
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Talk to |cRXP_FRIENDLY_Betina Bigglezink|r
    .turnin -4771,1 >>Turn in Dawn's Gambit
    .turnin -5529,1 >>Turn in Plagued Hatchlings
    .target Betina Bigglezink
step
    .goto Tirisfal Glades,83,71.4
    >>Talk to |cRXP_FRIENDLY_Alexi Barov|r
    .turnin -5341,1 >>Turn in Barov Family Fortune
    .target Alexi Barov
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Shaper's Terrace
#version 2
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops

step
    #completewith start
    +|cRXP_WARN_Shaper's Terrace|r (58-60). An ancient titan facility in the northern hills of Un'Goro Crater, overlooking dinosaurs, tar pits and powerful crystals. Collect power crystals across Un'Goro and use them at the consoles inside the terrace.
step
    #label start
    .goto Mulgore,34.8,22.2
    >>Talk to |cRXP_FRIENDLY_Mayena Earthseeker|r
    .accept 95928 >>Accept Crystalline Elements
    .target Mayena Earthseeker
step
    #completewith run
    >>Inside: Not known yet
    .accept 97049 >>Accept Essence of Seeping Slimes
step
    #completewith run
    >>Inside: Not known yet
    .accept 95926 >>Accept The Dark Crystal
step
    #completewith next
    .goto Un'Goro Crater,48.1,6.1,40 >>Travel to the Shaper's Terrace entrance
step
    #label run
    >>Run Shaper's Terrace and do its quests
    .complete -95928,1 --Crystalline Elements
    .complete -97049,1 --Essence of Seeping Slimes
    .complete -95926,1 --The Dark Crystal
step
    >>Turn in
    .turnin -97049,1 >>Turn in Essence of Seeping Slimes
    .turnin -95926,1 >>Turn in The Dark Crystal
step
    .goto Mulgore,34.8,22.2
    >>Talk to |cRXP_FRIENDLY_Mayena Earthseeker|r
    .turnin -95928,1 >>Turn in Crystalline Elements
    .target Mayena Earthseeker
]==])
