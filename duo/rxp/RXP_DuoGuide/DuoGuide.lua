-- Duo leveling route, Horde 40-60, WoW Forever. Generated from classiccraft.app/duo/ by tools/duo/build-rxp.js.
local faction = UnitFactionGroup("player")
if faction == "Alliance" then return end
if not RXPGuides or not RXPGuides.RegisterGuide then return end

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-43 Tanaris
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 40-42 Dungeon: Scarlet Monastery: Cathedral

step
    >>|cRXP_WARN_Tanaris|r (40-43). Two big shared-kill quests right outside Gadgetzan, and a pirate cove that clears in one sweep. Duo tip: Set your hearthstone in Gadgetzan; you come back here twice (Zul'Farrak and the 44-45 quests). Skip: WANTED: Andre Firebeard (head drop); Pirate Hats Ahoy! (20 hats, slow drop); Gahz'ridian (30 ground pickups); The Thirsty Goblin (30 glands); Water Pouch Bounty (drop). (Tick this step to start.)
step
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
step
    .goto Tanaris,51.4,26.8
    >>Talk to |cRXP_FRIENDLY_Tran'rek|r
    .accept 2865 >>Accept Scarab Shells
step
    .goto Tanaris,51.4,28.6
    >>Talk to |cRXP_FRIENDLY_Trenton Lighthammer|r
    .accept 3042 >>Accept Troll Temper
step
    .goto Tanaris,62.7,29.3
    >>Kill Wastewander Bandits and Thieves in the camps east of Gadgetzan
    .complete 1690,1 --Wastewander Bandit (10)
    .complete 1690,2 --Wastewander Thief (10)
    .mob Wastewander Bandit
    .mob Wastewander Thief
step
    .goto Tanaris,39,29
    >>Use the Dowsing Widget at the water west of Gadgetzan
    .complete 992,1 --Tapped Dowsing Widget (1)
step
    .goto Tanaris,52.5,28.5
    >>Back in Gadgetzan turn in and pick up the follow-up
    .turnin 1690 >>Turn in Wastewander Justice
    .turnin 992 >>Turn in Gadgetzan Water Survey
step
    .goto Tanaris,52.5,28.5
    >>Talk to |cRXP_FRIENDLY_Chief Engineer Bilgewhizzle|r
    .accept 1691 >>Accept More Wastewander Justice
    .target Chief Engineer Bilgewhizzle
step
    .goto Tanaris,62,37.4
    >>Kill Wastewander Rogues, Assassins and Shadow Mages further south-east
    .complete 1691,1 --Wastewander Rogue (8)
    .complete 1691,2 --Wastewander Assassin (6)
    .complete 1691,3 --Wastewander Shadow Mage (10)
    .mob Wastewander Rogue
    .mob Wastewander Assassin
    .mob Wastewander Shadow Mage
step
    >>Turn in at Gadgetzan
    .turnin 1691 >>Turn in More Wastewander Justice
step
    .goto Tanaris,67,23 >>Ride to Steamwheedle Port
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
    .complete 8366,1 --Southsea Pirate (10)
    .complete 8366,2 --Southsea Freebooter (10)
    .complete 8366,3 --Southsea Dock Worker (10)
    .complete 8366,4 --Southsea Swashbuckler (10)
    .mob Southsea Pirate
    .mob Southsea Freebooter
    .mob Southsea Dock Worker
    .mob Southsea Swashbuckler
    .complete 2873,1 --Stoley's Shipment (1)
step
    .goto Tanaris,67,23
    >>Turn in at Steamwheedle Port
    .turnin 8366 >>Turn in Southsea Shakedown
    .turnin 2873 >>Turn in Stoley's Shipment
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-42 Dungeon: Scarlet Monastery: Cathedral
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 40-42 Dungeon: Razorfen Downs

step
    >>|cRXP_WARN_Scarlet Monastery: Cathedral|r (40-42). The heart of the Scarlet Monastery: the Chapel Gardens and the Crusader's Chapel, held by Scarlet Commander Mograine and High Inquisitor Whitemane. The door is locked: you need The Scarlet Key from the Library. (Tick this step to start.)
step
    .goto Undercity,56.2,92.6
    >>Pick up from Varimathras, Undercity
    .accept 1048 >>Accept Into The Scarlet Monastery
step
    .goto Undercity,48,69
    >>Pick up from Master Apothecary Faranell, Undercity. Chain: Going, Going, Guano!
    .accept 1113 >>Accept Hearts of Zeal
step
    .goto Tirisfal Glades,82.6,33.8
    >>Run Scarlet Monastery: Cathedral and do its quests
step
    >>Turn in your Scarlet Monastery: Cathedral quests
    .turnin 1048 >>Turn in Into The Scarlet Monastery
    .turnin 1113 >>Turn in Hearts of Zeal
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-42 Dungeon: Razorfen Downs
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 41-45 Dungeon: Uldaman

step
    >>|cRXP_WARN_Razorfen Downs|r (40-42). The ancient burial grounds of the quilboar, now held by the Scourge. Amnennar the Coldbringer leads the undead from the top of the Downs. (Tick this step to start.)
step
    .goto The Barrens,49,94.8
    >>Pick up from Myriam Moonsinger, Razorfen Downs thorn maze, The Barrens
    .accept 6626 >>Accept A Host of Evil
step
    >>Pick up from Belnistrasz, Razorfen Downs. Chain: Scourge of the Downs
    .accept 3525 >>Accept Extinguishing the Idol
step
    .goto Undercity,74,32.4
    >>Pick up from Andrew Brownell, Undercity
    .accept 3341 >>Accept Bring the End
step
    .goto Undercity,56.2,92.6
    >>Pick up from Varimathras, Royal Quarter, Undercity. Chain: An Unholy Alliance
    .accept 6521 >>Accept An Unholy Alliance
step
    >>Pick up from Not known yet
    .accept 97196 >>Accept The Coldbringer's Eye
step
    .goto The Barrens,50,92
    >>Run Razorfen Downs and do its quests
step
    >>Turn in your Razorfen Downs quests
    .turnin 6626 >>Turn in A Host of Evil
    .turnin 3525 >>Turn in Extinguishing the Idol
    .turnin 3341 >>Turn in Bring the End
    .turnin 6521 >>Turn in An Unholy Alliance
    .turnin 97196 >>Turn in The Coldbringer's Eye
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 41-45 Dungeon: Uldaman
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 40-44 Riverglades

step
    >>|cRXP_WARN_Uldaman|r (41-45). An ancient titan vault buried beneath the Badlands, overrun by troggs and Shadowforge dwarves. Archaedas guards the Discs of Norgannon in its deepest chamber. (Tick this step to start.)
step
    .goto Badlands,2.4,46
    >>Pick up from Jarkal Mossmeld, Kargath, Badlands. Chain: Badlands Reagent Run
    .accept 2202 >>Accept Uldaman Reagent Run
step
    .goto Badlands,51.4,76.4
    >>Pick up from Theldurin the Lost, Badlands
    .accept 709 >>Accept Solution to Doom
step
    .goto Badlands,42.4,52.4
    >>Pick up from Rigglefuzz, Badlands
    .accept 2418 >>Accept Power Stones
step
    .goto Badlands,2.4,46
    >>Pick up from Jarkal Mossmeld, Kargath, Badlands. Chain: Necklace Recovery > Necklace Recovery, Take 2 > Translating the Journal > Translating the Journal
    .accept 2339 >>Accept Find the Gems and Power Source
step << Mage
    .goto Dustwallow Marsh,46,57
    >>Pick up from Tabetha, Dustwallow Marsh. Chain: The Infernal Orb > The Exorcism
    .accept 1956 >>Accept Power in Uldaman
step
    .goto Undercity,62.4,48.4
    >>Pick up from Patrick Garrett, Undercity
    .accept 2342 >>Accept Reclaimed Treasures
step
    >>Pick up from The Discs of Norgannon, Uldaman. Chain: The Platinum Discs
    .accept 2280 >>Accept The Platinum Discs
step
    .goto Badlands,44.3,12
    >>Run Uldaman and do its quests
step
    >>Turn in your Uldaman quests
    .turnin 2202 >>Turn in Uldaman Reagent Run
    .turnin 709 >>Turn in Solution to Doom
    .turnin 2418 >>Turn in Power Stones
    .turnin 2339 >>Turn in Find the Gems and Power Source
    .turnin 1956 >>Turn in Power in Uldaman
    .turnin 2342 >>Turn in Reclaimed Treasures
    .turnin 2280 >>Turn in The Platinum Discs
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 40-44 Riverglades
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 42-45 Dungeon: Krol'dok Stronghold

step
    >>|cRXP_WARN_Riverglades|r (40-44). Forever's new zone: a pirate shore with several straight kill quests, and the Krol'dok Stronghold dungeon next door. Duo tip: Questie doesn't know these quests yet, so the giver spots come from NPC positions. Check Wowhead (the quest name links there) if one isn't where it says. Skip: The WANTED posters and Bring Me His Head (single named drops); Break Their Chains (keys drop); It Takes Guts (23 drops); Paletusk Harvesting (boar meat drops); Step One: Rock (10 rocks). (Tick this step to start.)
step
    .goto 2548,59.4,45.7
    >>Talk to |cRXP_FRIENDLY_Krom'rosh|r
    .accept 94744 >>Accept The Wayward Warrior
    .target Krom'rosh
step
    .goto 2548,59.4,45.7
    >>Talk to |cRXP_FRIENDLY_Krom'rosh|r
    .accept 94968 >>Accept Eye of Mugg
step
    .goto 2548,59.9,46
    >>Talk to |cRXP_FRIENDLY_Kreza Darkthorn|r
    .accept 94974 >>Accept Key Ingredients
step
    >>Find Da'grosh in the hills west of Rog'mar and take his quests
step
    >>Talk to |cRXP_FRIENDLY_Da'grosh|r
    .accept 94745 >>Accept Carving a Path
    .target Da'grosh
step
    >>Twilight's Shroud: Twilight Fanatics, Corrupters and Champions
    .complete 94745,1 --Twilight Fanatic (8)
    .complete 94745,2 --Twilight Corrupter (8)
    .complete 94745,3 --Twilight Champion (8)
    .mob Twilight Fanatic
    .mob Twilight Corrupter
    .mob Twilight Champion
step
    >>Turn in to Da'grosh
    .turnin 94745 >>Turn in Carving a Path
step
    .goto 2548,79.3,52.8 >>Ride east to Powderfuse Port
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
    .complete 95119,1 --Eastsea Buccaneer (10)
    .complete 95119,2 --Eastsea Musketeer (10)
    .mob Eastsea Buccaneer
    .mob Eastsea Musketeer
    .complete 95122,1 --Eastsea Raider (8)
    .complete 95122,2 --Eastsea Bombardier (8)
    .mob Eastsea Raider
    .mob Eastsea Bombardier
    .complete 95123,1 --Eastsea Powder Keg (5)
    .complete 95165,1 --First Ship Charge planted (1)
    .complete 95165,2 --Second Ship Charge planted (1)
    .complete 95165,3 --Third Ship Charge planted (1)
    .complete 95288,1 --Smuggled Goods (8)
step
    >>Turn in at Powderfuse Port, then pick up and kill Admiral Lamora
    .turnin 95119 >>Turn in Unfriendly Competition
    .turnin 95122 >>Turn in Unchecked Expansion
    .turnin 95123 >>Turn in A Blast Ye Scurvy Dogs!
    .turnin 95165 >>Turn in See Ya, Scallywags!
    .turnin 95288 >>Turn in Smuggler's Paradise
step
    >>Kill Admiral Lamora and loot his stash
    .complete 95124,1 --Admiral Lamora (1)
    .complete 95124,2 --Lamora's Loot (1)
    .mob Admiral Lamora
    .mob Lamora's Loot
step
    >>Turn in at Powderfuse Port
    .turnin 95124 >>Turn in Admiral Lamora
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
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 42-46 Feralas

step
    >>|cRXP_WARN_Krol'dok Stronghold|r (42-45). Ogre outrunners have been kidnapping travelers and raiding settlements across the Riverglades. Their trail leads to a fortress of workshops, encampments and guarded inner passages, where strange chanting is heard after nightfall. (Tick this step to start.)
step
    .goto 2548,59.4,45.7
    >>Pick up from Krom'rosh, Riverglades (exact spot not known yet)
    .accept 94968 >>Accept Eye of Mugg
step
    .goto 2548,59.9,46
    >>Pick up from Kreza Darkthorn, Rog'mar, Riverglades. Chain: Krol'dok Moulding
    .accept 94974 >>Accept Key Ingredients
step
    >>Pick up from Riverglades (giver not known yet)
    .accept 94972 >>Accept Tome of Twilight
step
    >>Pick up from Riverglades (giver not known yet)
    .accept 94975 >>Accept A Token of Vengeance
step
    >>Run Krol'dok Stronghold and do its quests
step
    >>Turn in your Krol'dok Stronghold quests
    .turnin 94968 >>Turn in Eye of Mugg
    .turnin 94974 >>Turn in Key Ingredients
    .turnin 94972 >>Turn in Tome of Twilight
    .turnin 94975 >>Turn in A Token of Vengeance
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 42-46 Feralas
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 44-46 Tanaris, part 2

step
    >>|cRXP_WARN_Feralas|r (42-46). Two Gordunni ogre kill quests and the Northspring harpies, all from Camp Mojache. Duo tip: Talo Thornhoof also hands out "The Strength of Corruption" (Felwood bears and wolves). Take it at 47 and carry it. Skip: War on the Woodpaw and Alpha Strike (manes drop); A New Cloak's Sheen / A Grim Discovery (wings and horns); The Mark of Quality (yeti hides); Muisek chain (long, each needs own captures). (Tick this step to start.)
step
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
    .complete 2975,1 --Gordunni Ogre (10)
    .complete 2975,2 --Gordunni Ogre Mage (10)
    .complete 2975,3 --Gordunni Brute (5)
    .mob Gordunni Ogre
    .mob Gordunni Ogre Mage
    .mob Gordunni Brute
    .complete 2987,1 --Gordunni Cobalt (12)
step
    >>Turn in at Camp Mojache
    .turnin 2975 >>Turn in The Ogres of Feralas
    .turnin 2987 >>Turn in Gordunni Cobalt
step
    .goto Feralas,75.8,43.6
    >>Talk to |cRXP_FRIENDLY_Rok Orhan|r
    .accept 2980 >>Accept The Ogres of Feralas
    .target Rok Orhan
step
    .goto Feralas,60,64
    >>Ruins of Isildien (south): Gordunni Shaman, Warlocks and Maulers
    .complete 2980,1 --Gordunni Shaman (10)
    .complete 2980,2 --Gordunni Warlock (10)
    .complete 2980,3 --Gordunni Mauler (5)
    .mob Gordunni Shaman
    .mob Gordunni Warlock
    .mob Gordunni Mauler
step
    >>Screechers anywhere in the hills: bramble 3 spirits each
    .complete 3520,1 --Screecher Spirits collected (3)
step
    >>Turn in at Camp Mojache
    .turnin 2980 >>Turn in The Ogres of Feralas
step
    .goto Feralas,76.2,43.8
    >>Talk to |cRXP_FRIENDLY_Talo Thornhoof|r
    .accept 3063 >>Accept Vengeance on the Northspring
    .target Talo Thornhoof
step
    .goto Feralas,39,14
    >>Northspring harpies in the far north-west
    .complete 3063,1 --Northspring Harpy (4)
    .complete 3063,2 --Northspring Roguefeather (4)
    .complete 3063,3 --Northspring Slayer (4)
    .complete 3063,4 --Northspring Windcaller (4)
    .mob Northspring Harpy
    .mob Northspring Roguefeather
    .mob Northspring Slayer
    .mob Northspring Windcaller
step
    >>Turn in at Camp Mojache; pick up The Strength of Corruption at 47
    .turnin 3063 >>Turn in Vengeance on the Northspring
    .accept 4120 >>Accept The Strength of Corruption
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 44-46 Tanaris, part 2
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 44-48 Dungeon: Zul'Farrak

step
    >>|cRXP_WARN_Tanaris, part 2|r (44-46). Two more shared kill quests open at 44 and 45. Do them on the way to Zul'Farrak. Duo tip: Turn in Screecher Spirits at Steamwheedle Port while you are here. (Tick this step to start.)
step
    .goto Tanaris,67,22.4
    >>Steamwheedle Port: turn in
    .accept 3520 >>Accept Screecher Spirits
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
    .complete 5863,1 --Dunemaul Brute (10)
    .complete 5863,2 --Dunemaul Enforcer (10)
    .complete 5863,3 --Gor'marok the Ravager (1)
    .mob Dunemaul Brute
    .mob Dunemaul Enforcer
    .mob Gor'marok the Ravager
    .complete 97530,1 --Brilliantly Polished Bangle (1)
step
    .goto Tanaris,29.3,65.5
    >>Thistleshrub Valley (south-west): Gnarled Thistleshrubs and Rootshapers
    .complete 3362,1 --Gnarled Thistleshrub (8)
    .complete 3362,2 --Thistleshrub Rootshaper (8)
    .mob Gnarled Thistleshrub
    .mob Thistleshrub Rootshaper
step
    >>Turn in at Gadgetzan
    .turnin 5863 >>Turn in The Dunemaul Compound
    .turnin 3362 >>Turn in Thistleshrub Valley
    .turnin 97530 >>Turn in Dunemaul Dues
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 44-48 Dungeon: Zul'Farrak
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 45-48 The Hinterlands

step
    >>|cRXP_WARN_Zul'Farrak|r (44-48). The sun-baked troll city in the deserts of Tanaris, home of the Sandfury tribe and their chief, Ukorz Sandscalp. (Tick this step to start.)
step
    .goto Tanaris,52.4,28.4
    >>Pick up from Chief Engineer Bilgewhizzle, Gadgetzan, Tanaris
    .accept 2768 >>Accept Divino-matic Rod
step
    .goto Tanaris,51.4,26.8
    >>Pick up from Tran'rek, Gadgetzan, Tanaris
    .accept 2865 >>Accept Scarab Shells
step
    .goto Tanaris,51.4,28.6
    >>Pick up from Trenton Lighthammer, Gadgetzan, Tanaris
    .accept 3042 >>Accept Troll Temper
step
    .goto Tanaris,67,22.4
    >>Pick up from Yeh'kinya, Steamwheedle Port, Tanaris. Chain: Screecher Spirits
    .accept 3527 >>Accept The Prophecy of Mosh'aru
step
    .goto Durotar,55.8,74.4
    >>Pick up from Master Gadrin, Sen'jin Village, Durotar. Chain: Venom Bottles > Undamaged Venom Sac > Consult Master Gadrin
    .accept 2936 >>Accept The Spider God
step
    .goto Dustwallow Marsh,46,57
    >>Pick up from Tabetha, Dustwallow Marsh
    .accept 2846 >>Accept Tiara of the Deep
step
    .goto Mulgore,32.5,20.6
    >>Pick up from Mazu'kon, Skywatcher Plateau, Mulgore
    .accept 96775 >>Accept Zum'rah's Head
step
    .goto Thousand Needles,78,77
    >>Pick up from Wizzle Brassbolts, Shimmering Flats, Thousand Needles
    .accept 2770 >>Accept Gahz'rilla
step
    .goto Tanaris,38.7,20
    >>Run Zul'Farrak and do its quests
step
    >>Turn in your Zul'Farrak quests
    .turnin 2768 >>Turn in Divino-matic Rod
    .turnin 2865 >>Turn in Scarab Shells
    .turnin 3042 >>Turn in Troll Temper
    .turnin 3527 >>Turn in The Prophecy of Mosh'aru
    .turnin 2936 >>Turn in The Spider God
    .turnin 2846 >>Turn in Tiara of the Deep
    .turnin 96775 >>Turn in Zum'rah's Head
    .turnin 2770 >>Turn in Gahz'rilla
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 45-48 The Hinterlands
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 46-49 Searing Gorge

step
    >>|cRXP_WARN_The Hinterlands|r (45-48). Revantusk Village is the best Horde duo hub in the 40s: four short kill quests and more around Jintha'Alor. Duo tip: Take the two long ones too: Message to the Wildhammer and the Guard Captain job are slow, but the mobs are where you are going anyway. Skip: Witch Doctor Ti'ik (head drop); Gammerita, Mon! (loot a lure from one turtle); Another Message to the Wildhammer (10 feathers); Fledgling Rescue (Alliance gryphon master). (Tick this step to start.)
step
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
    .complete 7815,1 --Saltwater Snapjaw (15)
    .mob Saltwater Snapjaw
step
    .goto The Hinterlands,62,52
    >>Central Hinterlands: Silvermane Stalkers and Howlers, Savage Owlbeasts
    .complete 7828,1 --Silvermane Stalker (15)
    .complete 7828,2 --Silvermane Howler (15)
    .mob Silvermane Stalker
    .mob Silvermane Howler
    .complete 7829,1 --Savage Owlbeast (20)
    .mob Savage Owlbeast
step
    .goto The Hinterlands,48,66
    >>Vilebranch camp (Skulk Rock side): Scalpers and Soothsayers; grab Slagtree's tools
    .complete 7844,1 --Vilebranch Scalper (30)
    .complete 7844,2 --Vilebranch Soothsayer (15)
    .mob Vilebranch Scalper
    .mob Vilebranch Soothsayer
    .complete 7839,1 --Slagtree's Lost Tools (1)
step
    .goto The Hinterlands,31,48
    >>Quel'Danil Lodge (west): the four Highvale elf types
    .complete 7841,1 --Highvale Scout (15)
    .complete 7841,2 --Highvale Outrunner (15)
    .complete 7841,3 --Highvale Ranger (15)
    .complete 7841,4 --Highvale Marksman (15)
    .mob Highvale Scout
    .mob Highvale Outrunner
    .mob Highvale Ranger
    .mob Highvale Marksman
step
    >>Turn in everything at Revantusk
    .turnin 7828 >>Turn in Stalking the Stalkers
    .turnin 7829 >>Turn in Hunt the Savages
    .turnin 7815 >>Turn in Snapjaws, Mon!
    .turnin 7844 >>Turn in Cannibalistic Cousins
    .turnin 7839 >>Turn in Vilebranch Hooligans
    .turnin 7841 >>Turn in Message to the Wildhammer
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
    .complete 7849,1 --Huntsman Malkhor's Skull (1)
    .complete 7849,2 --Huntsman Malkhor's Bones (1)
    .complete 7850,1 --Vessel of Tainted Blood (10)
    .complete 7862,1 --Vilebranch Berserker (20)
    .complete 7862,2 --Vilebranch Shadow Hunter (20)
    .complete 7862,3 --Vilebranch Blood Drinker (20)
    .complete 7862,4 --Vilebranch Soul Eater (20)
    .mob Vilebranch Berserker
    .mob Vilebranch Shadow Hunter
    .mob Vilebranch Blood Drinker
    .mob Vilebranch Soul Eater
step
    .goto The Hinterlands,58,82
    >>Top of Jintha'Alor: Vile Priestess Hexx and her guards
    .complete 7861,1 --Vile Priestess Hexx (1)
    .complete 7861,2 --Vilebranch Aman'zasi Guard (20)
    .mob Vile Priestess Hexx
    .mob Vilebranch Aman'zasi Guard
step
    >>Turn in at Revantusk
    .turnin 7849 >>Turn in Separation Anxiety
    .turnin 7850 >>Turn in Dark Vessels
    .turnin 7861 >>Turn in Wanted: Vile Priestess Hexx and Her Minions
    .turnin 7862 >>Turn in Job Opening: Guard Captain of Revantusk Village
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 46-49 Searing Gorge
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 46-50 Azshara

step
    >>|cRXP_WARN_Searing Gorge|r (46-49). Four 20-kill quests from one camp, all open at 45. Duo tip: The Slag Pit (Incendosaurs and the Flux plans) is crowded with Dark Irons; clear your way in rather than running. Skip: Divine Retribution chain (long, many drops); Ledger from Tanaris (drops and a turn-in in Tanaris). (Tick this step to start.)
step
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
    .complete 7729,1 --Dark Iron Taskmaster (15)
    .complete 7729,2 --Dark Iron Slaver (15)
    .mob Dark Iron Taskmaster
    .mob Dark Iron Slaver
step
    .goto Searing Gorge,40,45
    >>Heavy War Golems
    .complete 7723,1 --Heavy War Golem (20)
    .mob Heavy War Golem
step
    .goto Searing Gorge,29,62
    >>Searing Lava Spiders in the south-west
    .complete 7724,1 --Searing Lava Spider (20)
    .mob Searing Lava Spider
step
    .goto Searing Gorge,48,27
    >>Slag Pit: Incendosaurs, and click the Fiery Flux plans
    .complete 7727,1 --Incendosaur (20)
    .mob Incendosaur
    .complete 7722,1 --Secret Plans: Fiery Flux (1)
step
    >>Turn in at Thorium Point
    .turnin 7729 >>Turn in JOB OPPORTUNITY: Culling the Competition
    .turnin 7723 >>Turn in Curse These Fat Fingers
    .turnin 7724 >>Turn in Fiery Menace!
    .turnin 7727 >>Turn in Incendosaurs? Whateverosaur is More Like It
    .turnin 7722 >>Turn in What the Flux?
step
    .goto Searing Gorge,65.6,62.2
    >>Talk to |cRXP_FRIENDLY_Wooden Outhouse|r
    .accept 4449 >>Accept Caught!
step
    >>Kill 8 Dark Iron Geologists and bring 15 pieces of Silk Cloth to the person locked in the outhouse in Searing Gorge.
    .complete 4449,1 --Dark Iron Geologist (8)
    .complete 4449,2 --Silk Cloth (15)
    .mob Dark Iron Geologist
    .mob Silk Cloth
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 46-50 Azshara
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 46-50 Dungeon: Maraudon

step
    >>|cRXP_WARN_Azshara|r (46-50). Forever reworked Azshara: Valormok has new quests, and Loh'atu has two quick kill quests at the Ashenvale border. Duo tip: Fly to Valormok. Kurll and Izvi's new quests give you items to use; each of you needs your own count. Skip: Blue Gold and Ley of the Land (wand drop); Winter Frontier Fishery (fishing); Home on the Range (hide drops); The four delivery quests after Stealing Knowledge (capital cities). (Tick this step to start.)
step
    .goto Azshara,11.4,78.2
    >>Talk to |cRXP_FRIENDLY_Loh'atu|r
    .accept 5535 >>Accept Spiritual Unrest
    .accept 5536 >>Accept A Land Filled with Hatred
    .target Loh'atu
step
    .goto Azshara,18,66
    >>Highborne ghosts and Haldarr satyrs just east of Loh'atu
    .complete 5535,1 --Highborne Apparition (6)
    .complete 5535,2 --Highborne Lichling (6)
    .mob Highborne Apparition
    .mob Highborne Lichling
    .complete 5536,1 --Haldarr Satyr (6)
    .complete 5536,2 --Haldarr Trickster (2)
    .complete 5536,3 --Haldarr Felsworn (2)
    .mob Haldarr Satyr
    .mob Haldarr Trickster
    .mob Haldarr Felsworn
step
    >>Turn in to Loh'atu
    .turnin 5535 >>Turn in Spiritual Unrest
    .turnin 5536 >>Turn in A Land Filled with Hatred
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
    .complete 3517,1 --Tablet of Beth'Amara (1)
    .complete 3517,2 --Tablet of Jin'yael (1)
    .complete 3517,3 --Tablet of Markri (1)
    .complete 3517,4 --Tablet of Sael'hai (1)
step
    >>Shoot wasp nests and dig treasure on the beach
    .complete 91608,1 --Wild Honey (5)
    .complete 91568,1 --Highborne Treasure Fragment (10)
step
    >>Turn in at Valormok
    .turnin 3517 >>Turn in Stealing Knowledge
    .turnin 91608 >>Turn in Gettin' Buzzed
    .turnin 91568 >>Turn in Long Walks on the Beach
step
    .goto Azshara,41.8,38.8
    >>Talk to |cRXP_FRIENDLY_Ekkal|r
    .accept 86746 >>Accept The Legashi Threat
    .target Ekkal
step
    >>Legashi Satyrs, Rogues and Hellcallers
    .complete 86746,1 --Legashi Satyr (5)
    .complete 86746,2 --Legashi Rogue (5)
    .complete 86746,3 --Legashi Hellcaller (5)
    .mob Legashi Satyr
    .mob Legashi Rogue
    .mob Legashi Hellcaller
step
    .goto Azshara,53.5,21.8
    >>Talk to |cRXP_FRIENDLY_Kim'jael|r
    .accept 3601 >>Accept Kim'jael Indeed!
    .target Kim'jael
step
    .goto Azshara,58,28
    >>Kim'jael's four items in the naga camp
    .complete 3601,1 --Kim'Jael's Compass (1)
    .complete 3601,2 --Kim'Jael's Scope (1)
    .complete 3601,3 --Kim'Jael's Stuffed Chicken (1)
    .complete 3601,4 --Kim'Jael's Wizzlegoober (1)
step
    >>Turn in
    .turnin 86746 >>Turn in The Legashi Threat
    .turnin 3601 >>Turn in Kim'jael Indeed!
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 46-50 Dungeon: Maraudon
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 48-52 Felwood

step
    >>|cRXP_WARN_Maraudon|r (46-50). The sacred caverns of the centaur in Desolace, where Princess Theradras and her corrupted earth elementals rule beneath Zaetar's grave. The orange and purple wings lead to the inner caves; the Scepter of Celebras opens the shortcut to the waterfall. (Tick this step to start.)
step
    .goto Desolace,43.4,84.8
    >>Pick up from Centaur Pariah, southern Desolace
    .accept 7067 >>Accept The Pariah's Instructions
step
    .goto Desolace,23.2,70.2
    >>Pick up from Vark Battlescar, Shadowprey Village, Desolace
    .accept 7029 >>Accept Vyletongue Corruption
step
    .goto Desolace,62,39.4
    >>Pick up from Willow, Desolace
    .accept 7028 >>Accept Twisted Evils
step
    .goto Desolace,32.1,64
    >>Pick up from Cavindra, Maraudon Orange Entrance, Desolace
    .accept 7044 >>Accept Legends of Maraudon
step
    >>Pick up from Celebras the Redeemed, Maraudon
    .accept 7046 >>Accept The Scepter of Celebras
step
    .goto Desolace,26.8,77.6
    >>Pick up from Selendra, Shadowprey Village, Desolace
    .accept 7064 >>Accept Corruption of Earth and Seed
step
    >>Pick up from Zaetar's Spirit, Maraudon
    .accept 7066 >>Accept Seed of Life
step
    .goto Orgrimmar,38.8,85.4
    >>Pick up from Uthel'nay, Orgrimmar
    .accept 7068 >>Accept Shadowshard Fragments
step
    .goto Desolace,29.1,62.5
    >>Run Maraudon and do its quests
step
    >>Turn in your Maraudon quests
    .turnin 7067 >>Turn in The Pariah's Instructions
    .turnin 7029 >>Turn in Vyletongue Corruption
    .turnin 7028 >>Turn in Twisted Evils
    .turnin 7044 >>Turn in Legends of Maraudon
    .turnin 7046 >>Turn in The Scepter of Celebras
    .turnin 7064 >>Turn in Corruption of Earth and Seed
    .turnin 7066 >>Turn in Seed of Life
    .turnin 7068 >>Turn in Shadowshard Fragments
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 48-52 Felwood
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 48-52 Dungeon: Alcaz Prison

step
    >>|cRXP_WARN_Felwood|r (48-52). Deadwood furbolgs, the Jaedenar cult and the owlbeast chain are all straight kills. Duo tip: Timbermaw Ally starts the Timbermaw reputation chain that carries you into Winterspring. Skip: Cleansing Felwood (15 Blood Amber); A Sampling of Putrescence (organ drops); Salve via Hunting (soul shards). (Tick this step to start.)
step
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
    .complete 8460,1 --Deadwood Warrior (6)
    .complete 8460,2 --Deadwood Pathfinder (6)
    .complete 8460,3 --Deadwood Gardener (6)
    .mob Deadwood Warrior
    .mob Deadwood Pathfinder
    .mob Deadwood Gardener
step
    >>Turn in to Grazle; take Speak to Nafien
    .turnin 8460 >>Turn in Timbermaw Ally
    .accept 8462 >>Accept Speak to Nafien
step
    .goto Felwood,34.5,52.5 >>Ride north to Bloodvenom Post
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
    .complete 5155,1 --Jaedenar Hound (4)
    .complete 5155,2 --Jaedenar Guardian (4)
    .complete 5155,3 --Jaedenar Adept (6)
    .complete 5155,4 --Jaedenar Cultist (6)
    .mob Jaedenar Hound
    .mob Jaedenar Guardian
    .mob Jaedenar Adept
    .mob Jaedenar Cultist
step
    .goto Felwood,32,67
    >>Fill the flasket at the Well of Corruption, then lead a saber home
    .complete 4505,1 --Filled Flasket (1)
    .complete 4506,1 --Return the corrupted cat to Winna Hazzard (1)
step
    .goto Felwood,43,40
    >>Shatter Scar Vale: Entropic Beasts and Horrors, and explore the craters
    .complete 5156,1 --Entropic Beast (2)
    .complete 5156,2 --Entropic Horror (2)
    .complete 5156,3 -- (1)
    .complete 5156,4 --Explore the craters in Shatter Scar Vale (1)
    .mob Entropic Beast
    .mob Entropic Horror
    .mob Explore the craters in Shatter Scar Vale
step
    >>Raging and Ragged Owlbeasts
    .complete 4521,1 --Raging Owlbeast (15)
    .complete 4521,2 --Ragged Owlbeast (15)
    .mob Raging Owlbeast
    .mob Ragged Owlbeast
step
    >>Angerclaw Grizzlies and Felpaw Ravagers (quest from Feralas)
    .complete 4120,1 --Angerclaw Grizzly (12)
    .complete 4120,2 --Felpaw Ravager (12)
    .mob Angerclaw Grizzly
    .mob Felpaw Ravager
step
    >>Turn in at Bloodvenom Post and pick up the owlbeast follow-up
    .turnin 4505 >>Turn in Well of Corruption
    .turnin 4506 >>Turn in Corrupted Sabers
    .turnin 4521 >>Turn in Wild Guardians
    .accept 4741 >>Accept Wild Guardians
step
    >>Moontouched Owlbeasts
    .complete 4741,1 --Moontouched Owlbeast (13)
    .mob Moontouched Owlbeast
step
    >>Turn in; pick up the last Wild Guardians
    .turnin 4741 >>Turn in Wild Guardians
    .accept 4721 >>Accept Wild Guardians
step
    .goto Felwood,64.8,8.1 >>North Felwood: Nafien at the Timbermaw tunnel
step
    .goto Felwood,62,9
    >>Deadwood Den Watchers, Avengers and Shaman near the tunnel
    .complete 8461,1 --Deadwood Den Watcher (6)
    .complete 8461,2 --Deadwood Avenger (6)
    .complete 8461,3 --Deadwood Shaman (6)
    .mob Deadwood Den Watcher
    .mob Deadwood Avenger
    .mob Deadwood Shaman
step
    >>Turn in to Nafien; take Speak to Salfa for Winterspring
    .turnin 8461 >>Turn in Deadwood of the North
    .accept 8465 >>Accept Speak to Salfa
step
    >>Emerald Sanctuary: turn in and continue the Jaedenar chain if you like
    .turnin 5155 >>Turn in Forces of Jaedenar
    .turnin 5156 >>Turn in Verifying the Corruption
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 48-52 Dungeon: Alcaz Prison
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 50-53 Un'Goro Crater

step
    >>|cRXP_WARN_Alcaz Prison|r (48-52). Long rumored to hold high-ranking prisoners, including King Varian Wrynn, the prison on Alcaz Island has been out of reach until now. Inside, the Defias Brotherhood and the naga are at war. (Tick this step to start.)
step
    >>Unlock: Speak with Nazeer Bloodspike in Brackenwall Village.
    .accept 95283 >>Accept The Missing Kor'kron
    .turnin 95283 >>Turn in The Missing Kor'kron
step
    >>Unlock: Find the missing Kor'kron Elites.
    .accept 95284 >>Accept The Elite of the Elite
    .turnin 95284 >>Turn in The Elite of the Elite
step
    >>Unlock: Speak with Sergeant Ulka to learn more about the situation on Alcaz Isle.
    .accept 95285 >>Accept Right Place, Wrong Time
    .turnin 95285 >>Turn in Right Place, Wrong Time
step
    >>Run Alcaz Prison and do its quests. Also: Thrall Needs to Know, Blood Red Bandanas, A Little Payback (pick up in game)
step
    >>Turn in your Alcaz Prison quests
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 50-53 Un'Goro Crater
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 50-54 Dungeon: Sunken Temple

step
    >>|cRXP_WARN_Un'Goro Crater|r (50-53). A pterrordax kill quest, the Horde-only plant kill quest, and a handful of one-click jobs. Duo tip: Skip the crystal collecting; four colors of 7 each is slow for two people. Skip: Crystals of Power and the pylons (28 crystals); Muigin and Larion (Alliance; drops); The Scent of Lar'korwi (pheromone drops). (Tick this step to start.)
step
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
    .complete 4501,1 --Pterrordax (10)
    .complete 4501,2 --Frenzied Pterrordax (15)
    .mob Pterrordax
    .mob Frenzied Pterrordax
step
    .goto Un'Goro Crater,60,39
    >>Bloodpetal plants around the north-east
    .complete 4145,1 --Bloodpetal Lasher (5)
    .complete 4145,2 --Bloodpetal Trapper (5)
    .complete 4145,3 --Bloodpetal Flayer (5)
    .complete 4145,4 --Bloodpetal Thresher (5)
    .mob Bloodpetal Lasher
    .mob Bloodpetal Trapper
    .mob Bloodpetal Flayer
    .mob Bloodpetal Thresher
step
    .goto Un'Goro Crater,54,51
    >>Crashed expedition: crate and research equipment
    .complete 3881,1 --Crate of Foodstuffs (1)
    .complete 3881,2 --Research Equipment (1)
step
    .goto Un'Goro Crater,52,50
    >>Find Ringo near the springs and walk him back
    .complete 4491,1 --Escort Ringo to Spraggle Frock at Marshal's Refuge (1)
step
    .goto Un'Goro Crater,49,85
    >>Gorishi hive: sample the hive wall
    .complete 3883,1 --Hive Wall Sample (1)
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
    .complete 974,1 --Find the hottest area of Fire Plume Ridge (1)
    .complete 4290,1 --Piece of Threshadon Carcass (1)
step
    >>Turn in at Marshal's Refuge and to Krakle/Torwa
    .turnin 4501 >>Turn in Beware of Pterrordax
    .turnin 4145 >>Turn in Larion and Muigin
    .turnin 3881 >>Turn in Expedition Salvation
    .turnin 3883 >>Turn in Alien Ecology
    .turnin 4491 >>Turn in A Little Help From My Friends
    .turnin 974 >>Turn in Finding the Source
    .turnin 4290 >>Turn in The Fare of Lar'korwi
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 50-54 Dungeon: Sunken Temple
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 52-54 Burning Steppes

step
    >>|cRXP_WARN_Sunken Temple|r (50-54). The Temple of Atal'Hakkar, sunk beneath the Pool of Tears in the Swamp of Sorrows. The Atal'ai trolls try to summon their blood god Hakkar here, while the green dragons of Eranikus guard the lower halls. (Tick this step to start.)
step
    .goto Swamp of Sorrows,48,55
    >>Pick up from Fel'Zerul, Stonard, Swamp of Sorrows. Chain: Pool of Tears > The Atal'ai Exile > Return to Fel'Zerul
    .accept 1445 >>Accept The Temple of Atal'Hakkar
step << Warrior
    .goto Swamp of Sorrows,34.2,66
    >>Pick up from Fallen Hero of the Horde, Swamp of Sorrows. Chain: Warrior Kinship > War on the Shadowsworn
    .accept 8425 >>Accept Voodoo Feathers
step << Shaman
    .goto Alterac Mountains,80.4,66.8
    >>Pick up from Bath'rah the Windwatcher, Alterac Mountains. Chain: Elemental Mastery > Spirit Totem
    .accept 8413 >>Accept Da Voodoo
step << Hunter
    .goto Azshara,42.4,42.6
    >>Pick up from Ogtinc, Azshara. Chain: Courser Antlers > Wavethrashing
    .accept 8232 >>Accept The Green Drake
step << Mage
    .goto Azshara,29.2,40.2
    >>Pick up from Archmage Xylem, Azshara. Chain: Magic Dust > The Siren's Coral
    .accept 8253 >>Accept Destroy Morphaz
step << Priest
    .goto Azshara,42.4,42.6
    >>Pick up from Ogtinc, Azshara. Chain: Of Coursers We Know > The Ichor of Undeath
    .accept 8257 >>Accept Blood of Morphaz
step << Rogue
    .goto Azshara,29.2,40.2
    >>Pick up from Archmage Xylem, Azshara. Chain: Sealed Azure Bag > Encoded Fragments
    .accept 8236 >>Accept The Azure Key
step << Warlock
    .goto Felwood,41.4,44.8
    >>Pick up from Impsy, Bloodvenom Falls, Felwood. Chain: An Imp's Request > Hot and Itchy > The Wrong Stuff
    .accept 8422 >>Accept Trolls of a Feather
step
    .goto Tanaris,52.6,45.8
    >>Pick up from Marvon Rivetseeker, Tanaris. Chain: The Stone Circle
    .accept 3446 >>Accept Into the Depths
step
    .goto Tanaris,52.6,45.8
    >>Pick up from Marvon Rivetseeker, Tanaris. Chain: The Stone Circle
    .accept 3447 >>Accept Secret of the Circle
step
    .goto Tanaris,67,22.4
    >>Pick up from Yeh'kinya, Steamwheedle Port, Tanaris. Chain: Screecher Spirits > The Prophecy of Mosh'aru > The Ancient Egg
    .accept 3528 >>Accept The God Hakkar
step
    .goto The Barrens,62.4,38.6
    >>Pick up from Liv Rizzlefix, Ratchet, The Barrens. Chain: Larion and Muigin > Marvon's Workshop
    .accept 4146 >>Accept Zapper Fuel
step
    .goto The Hinterlands,33.6,75.2
    >>Pick up from Atal'ai Exile, The Hinterlands
    .accept 1446 >>Accept Jammal'an the Prophet
step << Druid
    .goto Un'Goro Crater,71.6,76
    >>Pick up from Torwa Pathfinder, Un'Goro Crater. Chain: Bloodpetal Poison > Toxic Test
    .accept 9053 >>Accept A Better Ingredient
step
    >>Pick up from Essence of Eranikus (drops from the Shade of Eranikus)
    .accept 3373 >>Accept The Essence of Eranikus
step
    .goto Swamp of Sorrows,69.5,53.5
    >>Run Sunken Temple and do its quests
step
    >>Turn in your Sunken Temple quests
    .turnin 1445 >>Turn in The Temple of Atal'Hakkar
    .turnin 8425 >>Turn in Voodoo Feathers
    .turnin 8413 >>Turn in Da Voodoo
    .turnin 8232 >>Turn in The Green Drake
    .turnin 8253 >>Turn in Destroy Morphaz
    .turnin 8257 >>Turn in Blood of Morphaz
    .turnin 8236 >>Turn in The Azure Key
    .turnin 8422 >>Turn in Trolls of a Feather
    .turnin 3446 >>Turn in Into the Depths
    .turnin 3447 >>Turn in Secret of the Circle
    .turnin 3528 >>Turn in The God Hakkar
    .turnin 4146 >>Turn in Zapper Fuel
    .turnin 1446 >>Turn in Jammal'an the Prophet
    .turnin 9053 >>Turn in A Better Ingredient
    .turnin 3373 >>Turn in The Essence of Eranikus
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 52-54 Burning Steppes
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 52-58 Dungeon: Blackrock Depths

step
    >>|cRXP_WARN_Burning Steppes|r (52-54). Not many Horde kill quests, but Flame Crest is where you pick up the Blackrock dungeon quests. Duo tip: Do this right before Blackrock Depths and Lower Blackrock Spire. (Tick this step to start.)
step
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
    .complete 4296,1 --Tablet Transcript (1)
step
    .goto Burning Steppes,64,57
    >>Broodlings near Blackrock Stronghold: capture essence before each kill
    .complete 4726,1 --Broodling Essence (8)
step
    >>Turn in at Flame Crest
    .turnin 4296 >>Turn in Tablet of the Seven
    .turnin 4726 >>Turn in Broodling Essence
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 52-58 Dungeon: Blackrock Depths
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 52-55 Western Plaguelands

step
    >>|cRXP_WARN_Blackrock Depths|r (52-58). The capital of the Dark Iron dwarves beneath Blackrock Mountain: the Detention Block, the Ring of Law, the Grim Guzzler and Shadowforge City, ruled by Emperor Dagran Thaurissan. (Tick this step to start.)
step
    .goto Badlands,3,47.6
    >>Pick up from Shadowmage Vivian Lagrave, Kargath, Badlands
    .accept 4134 >>Accept Lost Thunderbrew Recipe
step
    .goto Badlands,3.4,48.2
    >>Pick up from Thunderheart, Kargath, Badlands. Chain: Disharmony of Flame
    .accept 3907 >>Accept Disharmony of Fire
step
    .goto Badlands,3,47.6
    >>Pick up from Shadowmage Vivian Lagrave, Kargath, Badlands. Chain: Disharmony of Flame
    .accept 7201 >>Accept The Last Element
step
    .goto Badlands,25.8,45
    >>Pick up from Lotwil Veriatus, Badlands. Chain: The Rise of the Machines > The Rise of the Machines
    .accept 4063 >>Accept The Rise of the Machines
step
    .goto Badlands,3,47.6
    >>Pick up from Warlord Goretooth, Kargath, Badlands. Chain: KILL ON SIGHT: Dark Iron Dwarves > KILL ON SIGHT: High Ranking Dark Iron Officials > Grark Lorkrub > Precarious Predicament
    .accept 4132 >>Accept Operation: Death to Angerforge
step
    .goto Burning Steppes,29,28.9
    >>Pick up from Franclorn Forgewright, Blackrock Mountain. Chain: Dark Iron Legacy
    .accept 3802 >>Accept Dark Iron Legacy
step
    .goto Burning Steppes,65.2,23.8
    >>Pick up from Maxwort Uberglint, Burning Steppes
    .accept 4123 >>Accept The Heart of the Mountain
step
    .goto Burning Steppes,66,22
    >>Pick up from Yuka Screwspigot, Flame Crest, Burning Steppes
    .accept 4136 >>Accept Ribbly Screwspigot
step
    .goto Burning Steppes,94.8,31.6
    >>Pick up from Cyrus Therepentous, Burning Steppes
    .accept 4024 >>Accept A Taste of Flame
step
    .goto Orgrimmar,32,37.8
    >>Pick up from Thrall, Grommash Hold, Orgrimmar. Chain: Disharmony of Flame > Commander Gor'shak > What Is Going On? > What Is Going On? > The Eastern Kingdom
    .accept 4003 >>Accept The Royal Rescue
step
    .goto Searing Gorge,32.1,94.7
    >>Pick up from Lothos Riftwaker, Blackrock Mountain
    .accept 7848 >>Accept Attunement to the Core
step
    >>Pick up from Gloom'rel, Blackrock Depths
    .accept 4083 >>Accept The Spectral Chalice
step
    >>Pick up from Mistress Nagmara, Blackrock Depths
    .accept 4201 >>Accept The Love Potion
step
    >>Pick up from Thorium Brotherhood Contract (from Lokhtos Darkbargainer with a Sulfuron Ingot)
    .accept 7604 >>Accept A Binding Contract
step
    >>Pick up from Private Rocknot, Grim Guzzler, Blackrock Depths
    .accept 4295 >>Accept Rocknot's Ale
step
    .goto Searing Gorge,34.8,84
    >>Run Blackrock Depths and do its quests
step
    >>Turn in your Blackrock Depths quests
    .turnin 4134 >>Turn in Lost Thunderbrew Recipe
    .turnin 3907 >>Turn in Disharmony of Fire
    .turnin 7201 >>Turn in The Last Element
    .turnin 4063 >>Turn in The Rise of the Machines
    .turnin 4132 >>Turn in Operation: Death to Angerforge
    .turnin 3802 >>Turn in Dark Iron Legacy
    .turnin 4123 >>Turn in The Heart of the Mountain
    .turnin 4136 >>Turn in Ribbly Screwspigot
    .turnin 4024 >>Turn in A Taste of Flame
    .turnin 4003 >>Turn in The Royal Rescue
    .turnin 7848 >>Turn in Attunement to the Core
    .turnin 4083 >>Turn in The Spectral Chalice
    .turnin 4201 >>Turn in The Love Potion
    .turnin 7604 >>Turn in A Binding Contract
    .turnin 4295 >>Turn in Rocknot's Ale
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 52-55 Western Plaguelands
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 53-57 Eastern Plaguelands

step
    >>|cRXP_WARN_Western Plaguelands|r (52-55). Andorhal and the Scarlet camps give a tidy loop of kill and one-click quests. Duo tip: Chromie's chain in Andorhal later leads into Eastern Plaguelands' Darrowshire story. Skip: Most Caer Darrow quests (they lead into Scholomance; see that chapter). (Tick this step to start.)
step
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
    .complete 5096,1 --Flame in a Bottle (1)
    .complete 5096,2 --Destroy the command tent and plant the Scourge banner in the camp (1)
step
    .goto Western Plaguelands,47,44
    >>Diseased Wolves
    .complete 4984,1 --Diseased Wolf (8)
    .mob Diseased Wolf
step
    >>Turn in at The Bulwark and pick up the follow-ups
    .turnin 5096 >>Turn in Scarlet Diversions
    .turnin 4984 >>Turn in The Wildlife Suffers Too
    .accept 5098 >>Accept All Along the Watchtowers
    .accept 4985 >>Accept The Wildlife Suffers Too
step
    .goto Western Plaguelands,39.5,66.8
    >>Talk to |cRXP_FRIENDLY_Chromie|r
    .accept 4971 >>Accept A Matter of Time
    .target Chromie
step
    .goto Western Plaguelands,44,68
    >>Andorhal: mark the four towers, kill Temporal Parasites
    .complete 5098,1 --Tower One marked (1)
    .complete 5098,2 --Tower Two marked (1)
    .complete 5098,3 --Tower Three marked (1)
    .complete 5098,4 --Tower Four marked (1)
    .complete 4971,1 --Temporal Parasite (15)
    .mob Temporal Parasite
step
    >>Turn in to Chromie; pick up Counting Out Time
    .turnin 4971 >>Turn in A Matter of Time
    .accept 4972 >>Accept Counting Out Time
step
    .goto Western Plaguelands,43,70
    >>Andorhal watches
    .complete 4972,1 --Andorhal Watch (5)
step
    .goto Western Plaguelands,60,53
    >>Diseased Grizzlies
    .complete 4985,1 --Diseased Grizzly (8)
    .mob Diseased Grizzly
step
    >>Turn in: Chromie and The Bulwark; take Alas, Andorhal
    .turnin 4972 >>Turn in Counting Out Time
    .turnin 4985 >>Turn in The Wildlife Suffers Too
    .turnin 5098 >>Turn in All Along the Watchtowers
    .accept 105 >>Accept Alas, Andorhal
step
    .goto Western Plaguelands,45,69
    >>Kill Araj the Summoner in Andorhal and click his phylactery
    .complete 105,1 --Araj's Phylactery Shard (1)
    .mob Araj's Phylactery Shard
step
    >>Turn in at The Bulwark
    .turnin 105 >>Turn in Alas, Andorhal
step
    .goto Western Plaguelands,51.9,28.1
    >>Talk to |cRXP_FRIENDLY_Kirsta Deepshadow|r
    .accept 6004 >>Accept Unfinished Business
    .target Kirsta Deepshadow
step
    >>Northridge Lumber Camp Scarlets, then the two named Scarlets, then look over Hearthglen
    .complete 6004,1 --Scarlet Medic (2)
    .complete 6004,2 --Scarlet Hunter (2)
    .complete 6004,3 --Scarlet Mage (2)
    .complete 6004,4 --Scarlet Knight (2)
    .mob Scarlet Medic
    .mob Scarlet Hunter
    .mob Scarlet Mage
    .mob Scarlet Knight
    .complete 6023,1 --Huntsman Radley (1)
    .complete 6023,2 --Cavalier Durgen (1)
    .mob Huntsman Radley
    .mob Cavalier Durgen
    .complete 6025,1 -- (1)
    .complete 6025,2 --Overlook Hearthglen from a high vantage point (1)
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 53-57 Eastern Plaguelands
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 54-57 Winterspring

step
    >>|cRXP_WARN_Eastern Plaguelands|r (53-57). Two big shared kill quests from Tirion, two more from Nathanos, and the Darrowshire story. Duo tip: Light's Hope Chapel is the flight point and where the Stratholme and Scholomance quests start. Skip: Carrion Grubbage (worm meat drops); To Kill With Purpose (rot drops); Bolstering Our Defenses (world PvP towers). (Tick this step to start.)
step
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
    .complete 6164,1 --Augustus' Receipt Book (1)
step
    .goto Eastern Plaguelands,31,64
    >>Plaguebats and Plaguehounds across the west and middle
    .complete 5543,1 --Plaguebat (30)
    .mob Plaguebat
    .complete 5542,1 --Plaguehound Runt (20)
    .complete 5542,2 --Plaguehound (5)
    .complete 5542,3 --Frenzied Plaguehound (5)
    .mob Plaguehound Runt
    .mob Plaguehound
    .mob Frenzied Plaguehound
step
    .goto Eastern Plaguelands,48,45
    >>Noxious and Monstrous Plaguebats
    .complete 6042,1 --Noxious Plaguebat (20)
    .complete 6042,2 --Monstrous Plaguebat (10)
    .mob Noxious Plaguebat
    .mob Monstrous Plaguebat
step
    .goto Eastern Plaguelands,46,13
    >>North-west Quel'Thalas camp: Pathstriders, Rangers, Woodsmen and the Registry
    .complete 6133,1 --Pathstrider (8)
    .complete 6133,2 --Ranger (8)
    .complete 6133,3 --Woodsman (8)
    .complete 6133,4 --Quel'Thalas Registry (1)
    .mob Pathstrider
    .mob Ranger
    .mob Woodsman
    .mob Quel'Thalas Registry
step
    >>Turn in to Tirion, Nathanos and Augustus
    .turnin 5542 >>Turn in Demon Dogs
    .turnin 5543 >>Turn in Blood Tinged Skies
    .turnin 6042 >>Turn in Un-Life's Little Annoyances
    .turnin 6133 >>Turn in The Ranger Lord's Behest
    .turnin 6164 >>Turn in Augustus' Receipt Book
step
    .goto Eastern Plaguelands,71.7,50
    >>Talk to |cRXP_FRIENDLY_Carlin Redpath|r
    .accept 5211 >>Accept Defenders of Darrowshire
    .target Carlin Redpath
step
    .goto Eastern Plaguelands,30,25
    >>Free 15 Darrowshire spirits in the north-west
    .complete 5211,1 --Darrowshire Spirits Freed (15)
step
    >>Turn in at Light's Hope
    .turnin 5211 >>Turn in Defenders of Darrowshire
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 54-57 Winterspring
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 55-60 Mount Hyjal

step
    >>|cRXP_WARN_Winterspring|r (54-57). The Winterfall furbolg kill quests carry on the Timbermaw story from Felwood. Duo tip: Storm Shadowhoof's first two hunts are single named beasts and the kill counts for both of you. The third (Shy-Rotam) needs dropped meat, so it is left out. Skip: Are We There, Yeti? (horn drops); Chillwind Horns (drops). (Tick this step to start.)
step
    .goto Winterspring,28,35
    >>Timbermaw Hold exit: Salfa
    .accept 8465 >>Accept Speak to Salfa
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
    .complete 8464,1 --Winterfall Shaman (8)
    .complete 8464,2 --Winterfall Den Watcher (8)
    .complete 8464,3 --Winterfall Ursa (8)
    .mob Winterfall Shaman
    .mob Winterfall Den Watcher
    .mob Winterfall Ursa
    .complete 5082,1 --Winterfall Pathfinder (8)
    .complete 5082,2 --Winterfall Den Watcher (8)
    .complete 5082,3 --Winterfall Totemic (8)
    .mob Winterfall Pathfinder
    .mob Winterfall Den Watcher
    .mob Winterfall Totemic
step
    >>Turn in to Salfa and Donova
    .turnin 8464 >>Turn in Winterfall Activity
    .turnin 5082 >>Turn in Threat of the Winterfall
step
    .goto Winterspring,61.9,38.4
    >>Talk to |cRXP_FRIENDLY_Storm Shadowhoof|r
    .accept 5054 >>Accept Ursius of the Shardtooth
    .target Storm Shadowhoof
step
    .goto Winterspring,60.9,32.9
    >>Hunt Ursius
    .complete 5054,1 --Ursius (1)
    .mob Ursius
step
    >>Turn in at Everlook; pick up the next hunt
    .turnin 5054 >>Turn in Ursius of the Shardtooth
    .accept 5055 >>Accept Brumeran of the Chillwind
step
    .goto Winterspring,62.5,57.9
    >>Hunt Brumeran
    .complete 5055,1 --Brumeran (1)
    .mob Brumeran
step
    >>Turn in at Everlook
    .turnin 5055 >>Turn in Brumeran of the Chillwind
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Mount Hyjal
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 56-60 Silithus

step
    >>|cRXP_WARN_Mount Hyjal|r (55-60). Forever's new zone has a lot of kill and quick quests. The quest databases don't have its quest givers or chain order yet, so this chapter is a checklist, not a route. Duo tip: Several other zones send you here with breadcrumbs (A Cousin Abroad, The Grand Alliance, The Source of the Corruption). Take them on the way. (Tick this step to start.)
step
    >>Kill quests: |cRXP_WARN_Deal Dread to Deadwood|r. Defeat 8 Deadwood Totemics and 8 Deadwood Fel-Tenders and return to Elder Pinespeaker.
    .accept 93826 >>Accept Deal Dread to Deadwood
    .complete 93826,1 --Deadwood Totemic (8)
    .complete 93826,2 --Deadwood Fel-Tender (8)
    .mob Deadwood Totemic
    .mob Deadwood Fel-Tender
    .turnin 93826 >>Turn in Deal Dread to Deadwood
step
    >>Kill quests: |cRXP_WARN_Balance Through Strength|r. Defeat 9 Deadwood Den Guardians and return to Brerufa.
    .accept 93952 >>Accept Balance Through Strength
    .complete 93952,1 --Deadwood Den Guardian (9)
    .mob Deadwood Den Guardian
    .turnin 93952 >>Turn in Balance Through Strength
step
    >>Kill quests: |cRXP_WARN_Taste of Ash|r. Slay 12 Ashen Acolytes.
    .accept 95318 >>Accept Taste of Ash
    .complete 95318,1 --Ashen Acolyte (12)
    .mob Ashen Acolyte
    .turnin 95318 >>Turn in Taste of Ash
step
    >>Kill quests: |cRXP_WARN_Cult Closure|r. Kill 10 Blackthorne Adepts and 10 Wild-branded Cultists.
    .accept 93584 >>Accept Cult Closure
    .complete 93584,1 --Blackthorne Cultist (10)
    .complete 93584,2 --Blackthorne Adept (10)
    .mob Blackthorne Cultist
    .mob Blackthorne Adept
    .turnin 93584 >>Turn in Cult Closure
step
    >>Kill quests: |cRXP_WARN_Stemming the Demon Tide|r. Slay 12 Felguard Sentinels in Dae'gun.
    .accept 95793 >>Accept Stemming the Demon Tide
    .complete 95793,1 --Felguard Sentinel (12)
    .mob Felguard Sentinel
    .turnin 95793 >>Turn in Stemming the Demon Tide
step
    >>Kill quests: |cRXP_WARN_Kindling, Kinda|r. Destroy 15 Tainted Shrubbery for Kaylaena Springwhisper at the workshop in the Tainted Foothills.
    .accept 92594 >>Accept Kindling, Kinda
    .complete 92594,1 --Tainted Shrubbery (15)
    .mob Tainted Shrubbery
    .turnin 92594 >>Turn in Kindling, Kinda
step
    >>Kill quests: |cRXP_WARN_Blight No More|r. Eliminate 3 Forgotten Soldiers and 12 Fleshflay Raveners.
    .accept 95026 >>Accept Blight No More
    .complete 95026,1 --Forgotten Soldier (3)
    .complete 95026,2 --Fleshflay Ravener (12)
    .mob Forgotten Soldier
    .mob Fleshflay Ravener
    .turnin 95026 >>Turn in Blight No More
step
    >>Kill quests: |cRXP_WARN_The Experimental Method|r. Use the pinecones to destroy the Ashen Reign workstations.
    .accept 95316 >>Accept The Experimental Method
    .complete 95316,1 --Vessel Workstation disrupted (1)
    .complete 95316,2 --Disease Workstation disrupted (1)
    .complete 95316,3 --Alchemy Workstation disrupted (1)
    .complete 95316,4 --Slime Workstation disrupted (1)
    .mob Vessel Workstation disrupted
    .mob Disease Workstation disrupted
    .mob Alchemy Workstation disrupted
    .mob Slime Workstation disrupted
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
    .mob Broken Frond of Celastrus
    .turnin 91923 >>Turn in Celastrus the Bitter
step
    >>Named targets: |cRXP_WARN_Ve'han's Fall|r. Use the Staff of the Mountain to strip Ve'han Talongrasp of his stolen power, then destroy him.
    .accept 92833 >>Accept Ve'han's Fall
    .complete 92833,1 --Ve'han Talongrasp (1)
    .mob Ve'han Talongrasp
    .turnin 92833 >>Turn in Ve'han's Fall
step
    >>Named targets: |cRXP_WARN_Blackthorne Blackout|r. Kill the Blackthorne Courier and confiscate her message.
    .accept 93422 >>Accept Blackthorne Blackout
    .complete 93422,1 --Blackthorne Courier (1)
    .complete 93422,2 --Blackthorne Intelligence (1)
    .mob Blackthorne Courier
    .mob Blackthorne Intelligence
    .turnin 93422 >>Turn in Blackthorne Blackout
step
    >>Named targets: |cRXP_WARN_A Revenge So Sweet|r. Slay Brashann Grimdark and search his body for his soulstone.
    .accept 95379 >>Accept A Revenge So Sweet
    .complete 95379,1 --Brashann Grimdark (1)
    .mob Brashann Grimdark
    .turnin 95379 >>Turn in A Revenge So Sweet
step
    >>Named targets: |cRXP_WARN_Amalgamated Marrow|r. Slay the Awakened Fel Ash Slime.
    .accept 96255 >>Accept Amalgamated Marrow
    .complete 96255,1 --Awakened Fel Ash Slime (1)
    .mob Awakened Fel Ash Slime
    .turnin 96255 >>Turn in Amalgamated Marrow
step
    >>Named targets: |cRXP_WARN_Spear of the Skylord|r. Slay Zarrat Wormwing and return Omnuron's Spear.
    .accept 91883 >>Accept Spear of the Skylord
    .complete 91883,1 --Omnuron's Spear (1)
    .mob Omnuron's Spear
    .turnin 91883 >>Turn in Spear of the Skylord
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Ancient Allies|r. Travel west from the hermit's cave to find an outpost of ancients and dryads on the lower slopes of Mount Hyjal.
    .accept 90487 >>Accept Ancient Allies
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
    .turnin 92111 >>Turn in Of Friend and Fur
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Anywhere But Here|r. Find the Veteran of the Third War's scabbard near Elderwild.
    .accept 92100 >>Accept Anywhere But Here
    .turnin 92100 >>Turn in Anywhere But Here
step
    >>Quick jobs (talk, explore, use an item): |cRXP_WARN_Lifted by Legacy|r. Find the Veteran of the Third War's markings of significance on the Great Lift.
    .accept 92101 >>Accept Lifted by Legacy
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
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Zones
#next 55-60 Dungeon: Lower Blackrock Spire

step
    >>|cRXP_WARN_Silithus|r (56-60). A short two-step dredge kill chain and the Twilight Geolords at 60. Duo tip: Most Silithus quests are drop-heavy or feed the Ahn'Qiraj war effort; only the kill quests are listed. Skip: The Twilight Mystery (8 fragments); Noggle's quests (stinger drops). (Tick this step to start.)
step
    .goto Silithus,51.2,38.3
    >>Talk to |cRXP_FRIENDLY_Windcaller Proudhorn|r
    .accept 8280 >>Accept Securing the Supply Lines
    .target Windcaller Proudhorn
step
    .goto Silithus,58,27
    >>Dredge Strikers
    .complete 8280,1 --Dredge Striker (15)
    .mob Dredge Striker
step
    >>Turn in; pick up the follow-up
    .turnin 8280 >>Turn in Securing the Supply Lines
    .accept 8281 >>Accept Stepping Up Security
step
    .goto Silithus,39,54
    >>Dredge Crushers
    .complete 8281,1 --Dredge Crusher (20)
    .mob Dredge Crusher
step
    >>Turn in at Cenarion Hold
    .turnin 8281 >>Turn in Stepping Up Security
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
    .complete 8304,1 --Frankal Questioned (1)
    .complete 8304,2 --Rutgar Questioned (1)
step
    .goto Silithus,29,37
    >>Twilight Geolords
    .complete 8320,1 --Twilight Geolord (10)
    .mob Twilight Geolord
step
    >>Turn in at Cenarion Hold
    .turnin 8304 >>Turn in Dearest Natalia
    .turnin 8320 >>Turn in Twilight Geolords
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Dungeon: Lower Blackrock Spire
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 55-60 Dungeon: Dire Maul: East

step
    >>|cRXP_WARN_Lower Blackrock Spire|r (55-60). The lower halls of Blackrock Spire, held by the Spirestone, Smolderthorn and Bloodaxe clans of the Dark Horde under Overlord Wyrmthalak. (Tick this step to start.)
step
    .goto Badlands,5.8,47.4
    >>Pick up from Lexlort, Kargath, Badlands
    .accept 4981 >>Accept Operative Bijou
step
    .goto Badlands,3,47.6
    >>Pick up from Warlord Goretooth, Kargath, Badlands
    .accept 4903 >>Accept Warlord's Command
step
    .goto Badlands,5.8,47.4
    >>Pick up from Galamav the Marksman, Kargath, Badlands
    .accept 4724 >>Accept The Pack Mistress
step
    >>Pick up from Bijou, Lower Blackrock Spire
    .accept 4982 >>Accept Bijou's Belongings
step
    .goto Burning Steppes,65.8,22
    >>Pick up from Kibler, Flame Crest, Burning Steppes
    .accept 4729 >>Accept Kibler's Exotic Pets
step
    .goto Burning Steppes,65.8,22
    >>Pick up from Kibler, Flame Crest, Burning Steppes
    .accept 4862 >>Accept En-Ay-Es-Tee-Why
step
    .goto Burning Steppes,65,23.6
    >>Pick up from Ragged John, Flame Crest, Burning Steppes
    .accept 4866 >>Accept Mother's Milk
step
    >>Pick up from Warosh, Lower Blackrock Spire
    .accept 4867 >>Accept Urok Doomhowl
step
    .goto Tanaris,66.8,24
    >>Pick up from Prospector Ironboot, Steamwheedle Port, Tanaris. Chain: Screecher Spirits > The Prophecy of Mosh'aru > The Ancient Egg > The God Hakkar > The Lost Tablets of Mosh'aru
    .accept 4788 >>Accept The Final Tablets
step
    >>Pick up from Vaelan (Scarshield Infiltrator), Lower Blackrock Spire
    .accept 4742 >>Accept Seal of Ascension
step
    .goto Searing Gorge,34.8,84
    >>Run Lower Blackrock Spire and do its quests
step
    >>Turn in your Lower Blackrock Spire quests
    .turnin 4981 >>Turn in Operative Bijou
    .turnin 4903 >>Turn in Warlord's Command
    .turnin 4724 >>Turn in The Pack Mistress
    .turnin 4982 >>Turn in Bijou's Belongings
    .turnin 4729 >>Turn in Kibler's Exotic Pets
    .turnin 4862 >>Turn in En-Ay-Es-Tee-Why
    .turnin 4866 >>Turn in Mother's Milk
    .turnin 4867 >>Turn in Urok Doomhowl
    .turnin 4788 >>Turn in The Final Tablets
    .turnin 4742 >>Turn in Seal of Ascension
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Dungeon: Dire Maul: East
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 55-60 Dungeon: Blackmaw Hold

step
    >>|cRXP_WARN_Dire Maul: East|r (55-60). The eastern quarter of the ruined Highborne city of Eldre'Thalas, overgrown by the Warpwood and ruled by the satyr Alzzin the Wildshaper. Pusillin carries the Crescent Key that opens the other wings. (Tick this step to start.)
step
    .goto Feralas,76.8,37.4
    >>Pick up from Azj'Tordin, Lariss Pavilion, Feralas
    .accept 7441 >>Accept Pusillin and the Elder Azj'Tordin
step
    .goto Feralas,76,43.8
    >>Pick up from Talo Thornhoof, Camp Mojache, Feralas
    .accept 7489 >>Accept Lethtendris's Web
step
    .goto Moonglade,51.6,44.4
    >>Pick up from Rabine Saturna, Nighthaven, Moonglade. Chain: A Reliquary of Purity
    .accept 5526 >>Accept Shards of the Felvine
step << Mage
    >>Pick up from Lorekeeper Lydros, Dire Maul
    .accept 7463 >>Accept Arcane Refreshment
step
    .goto Feralas,59,45
    >>Run Dire Maul: East and do its quests
step
    >>Turn in your Dire Maul: East quests
    .turnin 7441 >>Turn in Pusillin and the Elder Azj'Tordin
    .turnin 7489 >>Turn in Lethtendris's Web
    .turnin 5526 >>Turn in Shards of the Felvine
    .turnin 7463 >>Turn in Arcane Refreshment
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 55-60 Dungeon: Blackmaw Hold
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 57-60 Dungeon: Dire Maul: West

step
    >>|cRXP_WARN_Blackmaw Hold|r (55-60). Beyond a long-sealed gate in Azshara lies the furbolg city of the Blackmaw clan, fighting a corruption that spreads through its groves and mountain tunnels. A large max-level dungeon with several routes and bosses; its depths may lead even farther below Azeroth. (Tick this step to start.)
step
    .goto Azshara,42.4,42.6
    >>Pick up from Ogtinc, Azshara (42.4, 42.6) (probably)
    .accept 92069 >>Accept Claws That Rend, Tusks that Gore
step
    .goto Thunder Bluff,75.6,31
    >>Pick up from Nara Wildmane, Elder Rise, Thunder Bluff (75.6, 31.0). Chain: Beneath Nordrassil
    .accept 92343 >>Accept Get to the Roots of It
step
    >>Pick up from Not known yet (perhaps Alaana Stormwalker, Mulgore)
    .accept 97198 >>Accept Blackmaw Magic
step
    >>Run Blackmaw Hold and do its quests. Also: Blackmaw Pouches (pick up in game)
step
    >>Turn in your Blackmaw Hold quests
    .turnin 92069 >>Turn in Claws That Rend, Tusks that Gore
    .turnin 92343 >>Turn in Get to the Roots of It
    .turnin 97198 >>Turn in Blackmaw Magic
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 57-60 Dungeon: Dire Maul: West
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 57-60 Dungeon: Dire Maul: North

step
    >>|cRXP_WARN_Dire Maul: West|r (57-60). The Capital Gardens and the Court of the Highborne, where the last Shen'dralar keep the demon Immol'thar imprisoned behind five pylons. Needs the Crescent Key from Pusillin. (Tick this step to start.)
step
    .goto Feralas,74.4,44
    >>Pick up from Sage Korolusk, Camp Mojache, Feralas
    .accept 7481 >>Accept Elven Legends
step << Warlock
    .goto Burning Steppes,12.6,31.4
    >>Pick up from Mor'zul Bloodbringer, Altar of Storms, Burning Steppes. Chain: Rage of Blood > Wildeyes > Lord Banehollow > Ulathek the Traitor > Xorothian Stardust > Bell of Dethmoora > Wheel of the Black March > Doomsday Candle > Imp Delivery > Arcanite
    .accept 7631 >>Accept Dreadsteed of Xoroth
step
    >>Pick up from Shen'dralar Ancient, Dire Maul
    .accept 7461 >>Accept The Madness Within
step
    >>Pick up from Captain Kromcrush, Dire Maul
    .accept 7703 >>Accept Unfinished Gordok Business
step
    .goto Feralas,59,45
    >>Run Dire Maul: West and do its quests
step
    >>Turn in your Dire Maul: West quests
    .turnin 7481 >>Turn in Elven Legends
    .turnin 7631 >>Turn in Dreadsteed of Xoroth
    .turnin 7461 >>Turn in The Madness Within
    .turnin 7703 >>Turn in Unfinished Gordok Business
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 57-60 Dungeon: Dire Maul: North
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 57-60 Dungeon: Upper Blackrock Spire

step
    >>|cRXP_WARN_Dire Maul: North|r (57-60). Gordok Commons, the ogre-held northern wing. Kill King Gordok to become the new king; leave the guards alive (the Tribute Run) for a bigger tribute chest. (Tick this step to start.)
step
    .goto Feralas,74.4,44
    >>Pick up from Sage Korolusk, Camp Mojache, Feralas
    .accept 7481 >>Accept Elven Legends
step
    >>Pick up from Captain Kromcrush, Dire Maul
    .accept 7703 >>Accept Unfinished Gordok Business
step
    >>Pick up from Knot Thimblejack, Dire Maul
    .accept 5525 >>Accept Free Knot!
step
    >>Pick up from Knot Thimblejack, Dire Maul
    .accept 5518 >>Accept The Gordok Ogre Suit
step << Druid
    >>Pick up from The Emerald Dream (book, Dire Maul drop)
    .accept 7506 >>Accept The Emerald Dream...
step << Hunter
    >>Pick up from The Greatest Race of Hunters (book, Dire Maul drop)
    .accept 7503 >>Accept The Greatest Race of Hunters
step << Mage
    >>Pick up from The Arcanist's Cookbook (book, Dire Maul drop)
    .accept 7500 >>Accept The Arcanist's Cookbook
step << Priest
    >>Pick up from Holy Bologna: What the Light Won't Tell You (book, Dire Maul drop)
    .accept 7504 >>Accept Holy Bologna: What the Light Won't Tell You
step << Rogue
    >>Pick up from Garona: A Study on Stealth and Treachery (book, Dire Maul drop)
    .accept 7498 >>Accept Garona: A Study on Stealth and Treachery
step << Shaman
    >>Pick up from Frost Shock and You (book, Dire Maul drop)
    .accept 7505 >>Accept Frost Shock and You
step << Warlock
    >>Pick up from Harnessing Shadows (book, Dire Maul drop)
    .accept 7502 >>Accept Harnessing Shadows
step << Warrior
    >>Pick up from Codex of Defense (book, Dire Maul drop)
    .accept 7499 >>Accept Codex of Defense
step
    >>Pick up from Nostro's Compendium of Dragon Slaying (rare Dire Maul drop)
    .accept 7507 >>Accept Nostro's Compendium
step
    >>Pick up from Lorekeeper Lydros, Athenaeum, Dire Maul
    .accept 7483 >>Accept Libram of Rapidity
step
    >>Pick up from Lorekeeper Lydros, Athenaeum, Dire Maul
    .accept 7484 >>Accept Libram of Focus
step
    >>Pick up from Lorekeeper Lydros, Athenaeum, Dire Maul
    .accept 7485 >>Accept Libram of Protection
step
    .goto Feralas,59,45
    >>Run Dire Maul: North and do its quests
step
    >>Turn in your Dire Maul: North quests
    .turnin 7481 >>Turn in Elven Legends
    .turnin 7703 >>Turn in Unfinished Gordok Business
    .turnin 5525 >>Turn in Free Knot!
    .turnin 5518 >>Turn in The Gordok Ogre Suit
    .turnin 7506 >>Turn in The Emerald Dream...
    .turnin 7503 >>Turn in The Greatest Race of Hunters
    .turnin 7500 >>Turn in The Arcanist's Cookbook
    .turnin 7504 >>Turn in Holy Bologna: What the Light Won't Tell You
    .turnin 7498 >>Turn in Garona: A Study on Stealth and Treachery
    .turnin 7505 >>Turn in Frost Shock and You
    .turnin 7502 >>Turn in Harnessing Shadows
    .turnin 7499 >>Turn in Codex of Defense
    .turnin 7507 >>Turn in Nostro's Compendium
    .turnin 7483 >>Turn in Libram of Rapidity
    .turnin 7484 >>Turn in Libram of Focus
    .turnin 7485 >>Turn in Libram of Protection
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 57-60 Dungeon: Upper Blackrock Spire
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Stratholme: Living

step
    >>|cRXP_WARN_Upper Blackrock Spire|r (57-60). The top of Blackrock Spire, held by Rend Blackhand's Dark Horde and General Drakkisath's black dragonflight. The door needs the Seal of Ascension. (Tick this step to start.)
step
    .goto Badlands,3,47.6
    >>Pick up from Shadowmage Vivian Lagrave, Kargath, Badlands
    .accept 4768 >>Accept The Darkstone Tablet
step
    >>Pick up from Vaelan, Lower Blackrock Spire. Chain: Seal of Ascension
    .accept 4743 >>Accept Seal of Ascension
step
    .goto Burning Steppes,65.2,23.8
    >>Pick up from Tinkee Steamboil, Flame Crest, Burning Steppes. Chain: Broodling Essence > Felnok Steelspring > Chillwind Horns > Return to Tinkee > Tinkee Steamboil > Egg Freezing
    .accept 4735 >>Accept Egg Collection
step
    >>Pick up from Awbee, Upper Blackrock Spire
    .accept 5160 >>Accept The Matron Protectorate
step
    .goto Feralas,44.8,7.4
    >>Pick up from Rexxar, Desolace. Chain: Warlord's Command > Eitrigg's Wisdom > For The Horde! > What the Wind Carries > The Champion of the Horde > The Testament of Rexxar > Oculus Illusions > Emberstrife > The Test of Skulls, Scryer > The Test of Skulls, Somnus > The Test of Skulls, Chronalis > The Test of Skulls, Axtroz > Ascension...
    .accept 6602 >>Accept Blood of the Black Dragon Champion
step
    .goto Winterspring,63.8,73.8
    >>Pick up from Lorax, Winterspring
    .accept 5127 >>Accept The Demon Forge
step
    >>Pick up from Blackhand's Command (letter from the Scarshield Quartermaster, Blackrock Mountain)
    .accept 7761 >>Accept Blackhand's Command
step
    >>Pick up from From The Beast's corpse, Upper Blackrock Spire
    .accept 5047 >>Accept Finkle Einhorn, At Your Service!
step
    .goto Searing Gorge,34.8,84
    >>Run Upper Blackrock Spire and do its quests
step
    >>Turn in your Upper Blackrock Spire quests
    .turnin 4768 >>Turn in The Darkstone Tablet
    .turnin 4743 >>Turn in Seal of Ascension
    .turnin 4735 >>Turn in Egg Collection
    .turnin 5160 >>Turn in The Matron Protectorate
    .turnin 6602 >>Turn in Blood of the Black Dragon Champion
    .turnin 5127 >>Turn in The Demon Forge
    .turnin 7761 >>Turn in Blackhand's Command
    .turnin 5047 >>Turn in Finkle Einhorn, At Your Service!
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Stratholme: Living
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Stratholme: Undead

step
    >>|cRXP_WARN_Stratholme: Living|r (58-60). The main gate of Stratholme: the burning streets, the Scarlet Bastion and the Hall of Lights, where Grand Crusader Dathrohan reveals himself as the dreadlord Balnazzar. (Tick this step to start.)
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Pick up from Betina Bigglezink, Light's Hope Chapel, Eastern Plaguelands
    .accept 5212 >>Accept The Flesh Does Not Lie
step
    .goto Eastern Plaguelands,73.9,49
    >>Pick up from Leonid Barthalomew the Revered, Light's Hope Chapel, Eastern Plaguelands
    .accept 5243 >>Accept Houses of the Holy
step
    .goto Eastern Plaguelands,72.8,49.2
    >>Pick up from Smokey LaRue, Light's Hope Chapel, Eastern Plaguelands
    .accept 5214 >>Accept The Great Fras Siabi
step
    >>Pick up from Aurius, Stratholme
    .accept 5122 >>Accept The Medallion of Faith
step
    .goto Eastern Plaguelands,10.9,27.2
    >>Pick up from Egan, Terrordale, Eastern Plaguelands
    .accept 5282 >>Accept The Restless Souls
step
    .goto Western Plaguelands,65.6,75.4
    >>Pick up from Artist Renfray, Caer Darrow, Western Plaguelands. Chain: Demon Dogs > Blood Tinged Skies > Carrion Grubbage > Redemption > Of Forgotten Memories > Of Lost Honor > Of Love and Family
    .accept 5848 >>Accept Of Love and Family
step
    >>Pick up from Head of Balnazzar (drops from Balnazzar). Chain: The Archivist
    .accept 5262 >>Accept The Truth Comes Crashing Down
step
    .goto Eastern Plaguelands,30,15
    >>Run Stratholme: Living and do its quests
step
    >>Turn in your Stratholme: Living quests
    .turnin 5212 >>Turn in The Flesh Does Not Lie
    .turnin 5243 >>Turn in Houses of the Holy
    .turnin 5214 >>Turn in The Great Fras Siabi
    .turnin 5122 >>Turn in The Medallion of Faith
    .turnin 5282 >>Turn in The Restless Souls
    .turnin 5848 >>Turn in Of Love and Family
    .turnin 5262 >>Turn in The Truth Comes Crashing Down
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Stratholme: Undead
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Scholomance

step
    >>|cRXP_WARN_Stratholme: Undead|r (58-60). The service entrance side of Stratholme, held by the Scourge: the three ziggurats, the Slaughter House and Baron Rivendare's stronghold. Kill the Baron within 45 minutes to save Ysida Harmon. (Tick this step to start.)
step
    .goto Eastern Plaguelands,73.7,50.8
    >>Pick up from Duke Nicholas Zverenhoff, Light's Hope Chapel, Eastern Plaguelands. Chain: The Archivist > The Truth Comes Crashing Down
    .accept 5263 >>Accept Above and Beyond
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Pick up from Betina Bigglezink, Light's Hope Chapel, Eastern Plaguelands. Chain: The Flesh Does Not Lie
    .accept 5213 >>Accept The Active Agent
step
    .goto Eastern Plaguelands,10.9,27.2
    >>Pick up from Egan, Terrordale, Eastern Plaguelands
    .accept 5282 >>Accept The Restless Souls
step
    .goto Eastern Plaguelands,22.2,64.3
    >>Pick up from Nathanos Blightcaller, Marris Stead, Eastern Plaguelands. Chain: The Ranger Lord's Behest > Un-Life's Little Annoyances > To Kill With Purpose > Duskwing, Oh How I Hate Thee... > The Corpulent One
    .accept 6163 >>Accept Ramstein
step
    >>Pick up from Aurius, Stratholme. Chain: The Medallion of Faith
    .accept 5125 >>Accept Aurius' Reckoning
step
    .goto Eastern Plaguelands,26.1,11.3
    >>Pick up from Anthion Harmon, Eastern Plaguelands
    .accept 8945 >>Accept Dead Man's Plea
step
    .goto Eastern Plaguelands,73.9,49
    >>Pick up from Leonid Barthalomew the Revered, Light's Hope Chapel, Eastern Plaguelands. Chain: Doctor Theolen Krastinov, the Butcher > Krastinov's Bag of Horrors > Kirtonos the Herald > The Human, Ras Frostwhisper > The Dying, Ras Frostwhisper
    .accept 5463 >>Accept Menethil's Gift
step
    .goto Eastern Plaguelands,44,19
    >>Run Stratholme: Undead and do its quests
step
    >>Turn in your Stratholme: Undead quests
    .turnin 5263 >>Turn in Above and Beyond
    .turnin 5213 >>Turn in The Active Agent
    .turnin 5282 >>Turn in The Restless Souls
    .turnin 6163 >>Turn in Ramstein
    .turnin 5125 >>Turn in Aurius' Reckoning
    .turnin 8945 >>Turn in Dead Man's Plea
    .turnin 5463 >>Turn in Menethil's Gift
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Scholomance
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops
#next 58-60 Dungeon: Shaper's Terrace

step
    >>|cRXP_WARN_Scholomance|r (58-60). The Barov family crypt on Caer Darrow, turned into the Cult of the Damned's school of necromancy. Darkmaster Gandling rules the halls; the Skeleton Key from the Barov quests opens the doors. (Tick this step to start.)
step
    .goto Western Plaguelands,70.4,74
    >>Pick up from Magistrate Marduke, Caer Darrow, Western Plaguelands. Chain: Doctor Theolen Krastinov, the Butcher > Krastinov's Bag of Horrors > Kirtonos the Herald > The Human, Ras Frostwhisper > The Dying, Ras Frostwhisper > Menethil's Gift > Menethil's Gift > Soulbound Keepsake
    .accept 5466 >>Accept The Lich, Ras Frostwhisper
step << Warlock
    .goto Burning Steppes,12.4,31.4
    >>Pick up from Gorzeeki Wildeyes, Altar of Storms, Burning Steppes. Chain: Rage of Blood > Wildeyes > Lord Banehollow > Ulathek the Traitor > Xorothian Stardust
    .accept 7629 >>Accept Imp Delivery
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Pick up from Betina Bigglezink, Light's Hope Chapel, Eastern Plaguelands. Chain: Broodling Essence > Felnok Steelspring > Chillwind Horns > Return to Tinkee > Tinkee Steamboil > Egg Freezing > Egg Collection > Leonid Barthalomew > Betina Bigglezink
    .accept 4771 >>Accept Dawn's Gambit
step
    .goto Eastern Plaguelands,73.7,50.5
    >>Pick up from Betina Bigglezink, Light's Hope Chapel, Eastern Plaguelands
    .accept 5529 >>Accept Plagued Hatchlings
step << Shaman
    .goto Orgrimmar,38.4,36
    >>Pick up from Sagorne Creststrider, Valley of Wisdom, Orgrimmar. Chain: Material Assistance
    .accept 7668 >>Accept The Darkreaver Menace
step
    .goto Tirisfal Glades,83,71.4
    >>Pick up from Alexi Barov, The Bulwark, Tirisfal Glades
    .accept 5341 >>Accept Barov Family Fortune
step
    .goto Western Plaguelands,69.7,73.2
    >>Run Scholomance and do its quests
step
    >>Turn in your Scholomance quests
    .turnin 5466 >>Turn in The Lich, Ras Frostwhisper
    .turnin 7629 >>Turn in Imp Delivery
    .turnin 4771 >>Turn in Dawn's Gambit
    .turnin 5529 >>Turn in Plagued Hatchlings
    .turnin 7668 >>Turn in The Darkreaver Menace
    .turnin 5341 >>Turn in Barov Family Fortune
]==])

RXPGuides.RegisterGuide([==[
#forever
<< Horde
#name 58-60 Dungeon: Shaper's Terrace
#version 1
#group Duo Leveling 40-60 (H)
#subgroup Dungeon stops

step
    >>|cRXP_WARN_Shaper's Terrace|r (58-60). An ancient titan facility in the northern hills of Un'Goro Crater, overlooking dinosaurs, tar pits and powerful crystals. Collect power crystals across Un'Goro and use them at the consoles inside the terrace. (Tick this step to start.)
step
    .goto Mulgore,34.8,22.2
    >>Pick up from Mayena Earthseeker, Mulgore (34.8, 22.2)
    .accept 95928 >>Accept Crystalline Elements
step
    >>Run Shaper's Terrace and do its quests. Also: Essence of Seeping Slimes, The Dark Crystal (pick up in game)
step
    >>Turn in your Shaper's Terrace quests
    .turnin 95928 >>Turn in Crystalline Elements
]==])
