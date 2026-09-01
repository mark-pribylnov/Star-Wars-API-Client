export type ItemDescription = {
  name: string;
  description: string;
};

export const itemDescriptions: ItemDescription[] = [
  // people
  {
    name: 'Luke Skywalker',
    description:
      'A legendary Jedi Knight and hero of the Rebel Alliance who plays a crucial role in the fight against the Galactic Empire.',
  },
  {
    name: 'C-3PO',
    description:
      'A protocol droid fluent in millions of forms of communication, often paired with R2-D2 on missions across the galaxy.',
  },
  {
    name: 'R2-D2',
    description:
      'A resourceful astromech droid known for courage, clever repairs, and carrying vital secrets for the Rebellion.',
  },
  {
    name: 'Darth Vader',
    description:
      'A Dark Lord of the Sith, once Anakin Skywalker, who serves the Galactic Empire and is the enforcer of Emperor Palpatine.',
  },
  {
    name: 'Leia Organa',
    description:
      'A princess of Alderaan and leader of the Rebel Alliance, renowned for her courage and political skill.',
  },
  {
    name: 'Owen Lars',
    description:
      'A moisture farmer on Tatooine who raises Luke Skywalker and tries to keep him away from galactic conflict.',
  },
  {
    name: 'Beru Whitesun lars',
    description:
      "Owen Lars's wife and Luke's aunt, a kind Tatooine settler who helps raise the young Skywalker.",
  },
  {
    name: 'R5-D4',
    description:
      'A red-and-white astromech droid briefly offered for sale on Tatooine before a convenient malfunction.',
  },
  {
    name: 'Biggs Darklighter',
    description:
      'A Rebel pilot from Tatooine and childhood friend of Luke Skywalker who flies with Red Squadron.',
  },
  {
    name: 'Obi-Wan Kenobi',
    description:
      'A wise Jedi Master who trains Anakin and later guides Luke, shaping the fate of the galaxy.',
  },
  {
    name: 'Anakin Skywalker',
    description:
      'A gifted Jedi and Chosen One whose fall to the dark side remakes him as Darth Vader.',
  },
  {
    name: 'Wilhuff Tarkin',
    description:
      "A cold Imperial Grand Moff who commands the Death Star and embodies the Empire's ruthless authority.",
  },
  {
    name: 'Chewbacca',
    description:
      'A loyal Wookiee warrior and co-pilot of the Millennium Falcon, lifelong friend of Han Solo.',
  },
  {
    name: 'Han Solo',
    description:
      'A smuggler-turned-hero who captains the Millennium Falcon and fights beside the Rebel Alliance.',
  },
  {
    name: 'Greedo',
    description:
      'A Rodian bounty hunter who confronts Han Solo in a Mos Eisley cantina.',
  },
  {
    name: 'Jabba Desilijic Tiure',
    description:
      'A powerful Hutt crime lord who rules a desert underworld from his palace on Tatooine.',
  },
  {
    name: 'Wedge Antilles',
    description:
      'An elite Rebel pilot and founding member of Rogue Squadron, famous for surviving the Death Star assaults.',
  },
  {
    name: 'Jek Tono Porkins',
    description:
      'A Rebel X-wing pilot known as Porkins who flies with Red Squadron at Yavin.',
  },
  {
    name: 'Yoda',
    description:
      'A legendary Jedi Master and one of the most powerful Jedi in the galaxy.',
  },
  {
    name: 'Palpatine',
    description:
      'A cunning Sith Lord who rises as Emperor, manipulating the Republic into the Empire.',
  },
  {
    name: 'Boba Fett',
    description:
      'A feared bounty hunter in Mandalorian armor, relentless in pursuit of high-value targets.',
  },
  {
    name: 'IG-88',
    description:
      'A lethal assassin droid bounty hunter with a cold, mechanical efficiency.',
  },
  {
    name: 'Bossk',
    description:
      'A Trandoshan bounty hunter who tracks prey with ruthless reptilian focus.',
  },
  {
    name: 'Lando Calrissian',
    description:
      'A charismatic gambler and administrator of Cloud City who becomes a key Rebel ally.',
  },
  {
    name: 'Lobot',
    description:
      "Lando Calrissian's cybernetically enhanced aide who helps manage Cloud City.",
  },
  {
    name: 'Ackbar',
    description:
      'A Mon Calamari admiral of the Rebel Alliance, famous for spotting Imperial traps.',
  },
  {
    name: 'Mon Mothma',
    description:
      'A principled senator and founding political leader of the Rebel Alliance.',
  },
  {
    name: 'Arvel Crynyd',
    description:
      'A Rebel A-wing pilot who makes a sacrificial strike against the Super Star Destroyer Executor.',
  },
  {
    name: 'Wicket Systri Warrick',
    description:
      'A brave Ewok scout on Endor who befriends the Rebels and aids their fight.',
  },
  {
    name: 'Nien Nunb',
    description:
      'A Sullustan Rebel co-pilot who flies with Lando during the Battle of Endor.',
  },
  {
    name: 'Qui-Gon Jinn',
    description:
      'A maverick Jedi Master who discovers Anakin Skywalker and follows the living Force.',
  },
  {
    name: 'Nute Gunray',
    description:
      'A Neimoidian Viceroy of the Trade Federation who schemes under Sith influence.',
  },
  {
    name: 'Finis Valorum',
    description:
      "The Supreme Chancellor of the Republic before Palpatine's rise, weakened by political crisis.",
  },
  {
    name: 'Padmé Amidala',
    description:
      'The courageous queen-turned-senator of Naboo and secret wife of Anakin Skywalker.',
  },
  {
    name: 'Jar Jar Binks',
    description:
      'A clumsy yet well-meaning Gungan whose path intersects with the fall of the Republic.',
  },
  {
    name: 'Roos Tarpals',
    description:
      'A Gungan captain who helps defend Naboo against the Trade Federation.',
  },
  {
    name: 'Rugor Nass',
    description:
      'The Boss of the Gungan people who allies with Naboo against invasion.',
  },
  {
    name: 'Ric Olié',
    description:
      'A Naboo pilot who flies the royal starship and trains young Anakin in spaceflight.',
  },
  {
    name: 'Watto',
    description:
      'A Toydarian junk dealer on Tatooine who owns Anakin and Shmi Skywalker as slaves.',
  },
  {
    name: 'Sebulba',
    description:
      'A ruthless Dug podracer and rival to Anakin in the Boonta Eve Classic.',
  },
  {
    name: 'Quarsh Panaka',
    description:
      'Captain of the Naboo Royal Security Forces and loyal protector of Queen Amidala.',
  },
  {
    name: 'Shmi Skywalker',
    description:
      "Anakin's devoted mother, whose life on Tatooine shapes his destiny.",
  },
  {
    name: 'Darth Maul',
    description:
      'A fearsome Sith apprentice marked with tattoos, wielding a double-bladed lightsaber.',
  },
  {
    name: 'Bib Fortuna',
    description:
      "A Twi'lek majordomo who serves Jabba the Hutt in his desert palace.",
  },
  {
    name: 'Ayla Secura',
    description:
      "A Twi'lek Jedi Master who fights in the Clone Wars for the Republic.",
  },
  {
    name: 'Ratts Tyerel',
    description:
      'An Aleena podracer pilot who competes in the Boonta Eve Classic.',
  },
  {
    name: 'Dud Bolt',
    description:
      'A Vulptereen podracer known for aggressive tactics on the Tatooine circuit.',
  },
  {
    name: 'Gasgano',
    description:
      'A multi-armed Xexto podracer who races in the Boonta Eve Classic.',
  },
  {
    name: 'Ben Quadinaros',
    description:
      'A Toong podracer whose ill-fated run ends almost as soon as it begins.',
  },
  {
    name: 'Mace Windu',
    description:
      'A formidable Jedi Master and Council member, famed for his purple lightsaber and Vaapad mastery.',
  },
  {
    name: 'Ki-Adi-Mundi',
    description:
      'A Cerean Jedi Master on the High Council with a distinctive expanded cranium.',
  },
  {
    name: 'Kit Fisto',
    description:
      'A Nautolan Jedi Master with a luminous smile and skill in aquatic combat.',
  },
  {
    name: 'Eeth Koth',
    description:
      "A Zabrak Jedi Master who serves on the High Council during the Republic's final years.",
  },
  {
    name: 'Adi Gallia',
    description:
      'A Tholothian Jedi Master and skilled diplomat of the High Council.',
  },
  {
    name: 'Saesee Tiin',
    description:
      'An Iktotchi Jedi Master and exceptional starfighter pilot on the High Council.',
  },
  {
    name: 'Yarael Poof',
    description:
      'A tall Quermian Jedi Master who serves on the High Council in the Republic era.',
  },
  {
    name: 'Plo Koon',
    description:
      'A Kel Dor Jedi Master known for wisdom, compassion, and a distinctive antiox mask.',
  },
  {
    name: 'Mas Amedda',
    description:
      'A Chagrian politician who serves as Vice Chair and later aide to Emperor Palpatine.',
  },
  {
    name: 'Gregar Typho',
    description:
      "Captain of Padmé Amidala's security detail, loyal through the Clone Wars.",
  },
  {
    name: 'Cordé',
    description: "One of Padmé Amidala's loyal handmaidens and decoys.",
  },
  {
    name: 'Cliegg Lars',
    description:
      'A Tatooine moisture farmer who frees and marries Shmi Skywalker.',
  },
  {
    name: 'Poggle the Lesser',
    description:
      'Archduke of Geonosis who allies with the Separatists and oversees droid foundries.',
  },
  {
    name: 'Luminara Unduli',
    description:
      'A Mirialan Jedi Master known for calm discipline and service in the Clone Wars.',
  },
  {
    name: 'Barriss Offee',
    description:
      'A Mirialan Jedi Padawan trained by Luminara Unduli during the Clone Wars.',
  },
  {
    name: 'Dormé',
    description: 'A trusted handmaiden of Senator Padmé Amidala.',
  },
  {
    name: 'Dooku',
    description:
      'A former Jedi who becomes Count of Serenno and Sith Lord leading the Separatists.',
  },
  {
    name: 'Bail Prestor Organa',
    description:
      'Viceroy of Alderaan and secret Rebel founder who adopts Leia Organa.',
  },
  {
    name: 'Jango Fett',
    description:
      'A legendary Mandalorian bounty hunter and genetic template for the clone army.',
  },
  {
    name: 'Zam Wesell',
    description:
      'A Clawdite shape-shifting assassin hired to target Padmé Amidala.',
  },
  {
    name: 'Dexter Jettster',
    description:
      "A Besalisk cook and informant in Coruscant's underlevels, friend to Obi-Wan.",
  },
  {
    name: 'Lama Su',
    description:
      'Prime Minister of Kamino who oversees production of the Republic clone army.',
  },
  {
    name: 'Taun We',
    description:
      "A Kaminoan administrator who guides visitors through Tipoca City's cloning facilities.",
  },
  {
    name: 'Jocasta Nu',
    description:
      'Chief Librarian of the Jedi Archives, guardian of Republic-era knowledge.',
  },
  {
    name: 'R4-P17',
    description:
      'An astromech droid that serves Obi-Wan Kenobi during the Clone Wars.',
  },
  {
    name: 'Wat Tambor',
    description:
      'Skakoan Foreman of the Techno Union and Separatist Council member.',
  },
  {
    name: 'San Hill',
    description:
      'A Muun chairman of the InterGalactic Banking Clan aligned with the Separatists.',
  },
  {
    name: 'Shaak Ti',
    description: 'A Togruta Jedi Master who oversees clone training on Kamino.',
  },
  {
    name: 'Grievous',
    description:
      'A cybernetic Kaleesh general who commands Separatist droid armies and collects lightsabers.',
  },
  {
    name: 'Tarfful',
    description:
      'A Wookiee chieftain of Kashyyyk who fights beside the Republic in the Clone Wars.',
  },
  {
    name: 'Raymus Antilles',
    description:
      'Captain of the Tantive IV who serves the Organa family and the Rebel cause.',
  },
  {
    name: 'Sly Moore',
    description:
      'An Umbaran advisor who stands close to Palpatine through the rise of the Empire.',
  },
  {
    name: 'Tion Medon',
    description:
      "A Pau'an port administrator of Utapau who aids Obi-Wan against General Grievous.",
  },

  // species
  {
    name: 'Human',
    description:
      'The most widespread sentient species in the galaxy, adaptable across countless worlds and cultures.',
  },
  {
    name: 'Droid',
    description:
      'Artificial beings built for labor, combat, or protocol, ranging from simple units to nearly sentient minds.',
  },
  {
    name: 'Wookie',
    description:
      'Tall, powerful arboreal mammals from Kashyyyk, famed for loyalty, strength, and the language Shyriiwook.',
  },
  {
    name: 'Rodian',
    description:
      'Green-skinned hunters from Rodia, often encountered as bounty hunters and traders.',
  },
  {
    name: 'Hutt',
    description:
      'Huge gastropod crime lords who can live for centuries and dominate underworld empires.',
  },
  {
    name: "Yoda's species",
    description:
      'A rare, long-lived people of small stature and immense Force potential, exemplified by Master Yoda.',
  },
  {
    name: 'Trandoshan',
    description:
      'Reptilian hunters who prize trophies and often work as mercenaries or bounty hunters.',
  },
  {
    name: 'Mon Calamari',
    description:
      'Amphibious shipbuilders from Mon Cala whose cruisers become backbone vessels of the Rebellion.',
  },
  {
    name: 'Ewok',
    description:
      'Small forest dwellers of Endor whose courage and traps help topple an Empire.',
  },
  {
    name: 'Sullustan',
    description:
      'Pale-skinned pilots and engineers from Sullust, known for sharp navigational skill.',
  },
  {
    name: 'Neimodian',
    description:
      'Trade Federation leaders with mottled skin, often cast as greedy corporate schemers.',
  },
  {
    name: 'Gungan',
    description:
      'Amphibious natives of Naboo who dwell in underwater cities and wield unique energy shields.',
  },
  {
    name: 'Toydarian',
    description:
      'Winged bargainers resistant to Jedi mind tricks, common in Outer Rim markets.',
  },
  {
    name: 'Dug',
    description:
      'Podracing competitors with limbs for both speed and spite, native to Malastare.',
  },
  {
    name: "Twi'lek",
    description:
      'Graceful humanoids with head-tails, found across the galaxy as diplomats, dancers, and Jedi.',
  },
  {
    name: 'Aleena',
    description:
      'Small, quick reptilian beings known for agility—sometimes seen in high-speed racing.',
  },
  {
    name: 'Vulptereen',
    description:
      'Stocky racers and laborers with distinctive facial tusks and tough dispositions.',
  },
  {
    name: 'Xexto',
    description:
      'Multi-armed sentients prized for dexterity in racing and fine mechanical work.',
  },
  {
    name: 'Toong',
    description:
      'Yellow-green humanoids whose nervous energy is infamous on the podracer circuit.',
  },
  {
    name: 'Cerean',
    description:
      'Cone-crowned thinkers with binary brains, producing calm Jedi such as Ki-Adi-Mundi.',
  },
  {
    name: 'Nautolan',
    description:
      'Aquatic humanoids with head tendrils, adept in water and represented by Kit Fisto.',
  },
  {
    name: 'Zabrak',
    description:
      'Horned near-humans of Iridonia and Dathomir, resilient in both body and will.',
  },
  {
    name: 'Tholothian',
    description:
      'Dark-skinned humanoids with scaled head tendrils, including Jedi Master Adi Gallia.',
  },
  {
    name: 'Iktotchi',
    description:
      'Horned telepaths from Iktotch, natural pilots often drawn to Jedi service.',
  },
  {
    name: 'Quermian',
    description:
      'Extremely tall, long-necked beings with dual brains, rare among Jedi ranks.',
  },
  {
    name: 'Kel Dor',
    description:
      'Oxygen-intolerant Force sensitives who wear antiox masks away from Dorin.',
  },
  {
    name: 'Chagrian',
    description:
      'Blue-skinned amphibians with horns, frequent in Republic politics.',
  },
  {
    name: 'Geonosian',
    description:
      'Insectoid builders of foundries and arenas, central to Separatist droid production.',
  },
  {
    name: 'Mirialan',
    description:
      'Olive- and yellow-skinned near-humans who mark achievements with geometric tattoos.',
  },
  {
    name: 'Clawdite',
    description:
      'Shape-shifters able to alter appearance—useful and dangerous as spies or assassins.',
  },
  {
    name: 'Besalisk',
    description:
      'Four-armed amphibious cooks and laborers, hearty and talkative.',
  },
  {
    name: 'Kaminoan',
    description:
      'Elegant cloners of Tipoca City who engineer the Republic army to order.',
  },
  {
    name: 'Skakoan',
    description:
      'Pressure-suited industrialists of the Techno Union, rarely seen without life-support gear.',
  },
  {
    name: 'Muun',
    description: 'Tall financiers who dominate galactic banking and credit.',
  },
  {
    name: 'Togruta',
    description:
      'Striking humanoids with montrals and lekku, including Jedi like Shaak Ti.',
  },
  {
    name: 'Kaleesh',
    description:
      'Masked reptilian warriors whose honor culture produced General Grievous.',
  },
  {
    name: "Pau'an",
    description:
      'Long-lived gray-skinned people of Utapau, often serving as civic leaders.',
  },

  // vehicles
  {
    name: 'Sand Crawler',
    description:
      'A massive wheeled fortress used by Jawas to roam Tatooine and trade scavenged droids.',
  },
  {
    name: 'T-16 skyhopper',
    description:
      'A nimble Incom airspeeder popular on Tatooine for racing through Beggar’s Canyon.',
  },
  {
    name: 'X-34 landspeeder',
    description:
      'A civilian repulsorcraft—Luke Skywalker’s familiar ride across the desert flats.',
  },
  {
    name: 'TIE/LN starfighter',
    description:
      'The Empire’s ubiquitous short-range fighter: fast, fragile, and flown in deadly swarms.',
  },
  {
    name: 'Snowspeeder',
    description:
      'A twin-seat airspeeder adapted for Hoth, armed with harpoons against Imperial walkers.',
  },
  {
    name: 'TIE bomber',
    description:
      'A heavy Imperial craft built to deliver ordnance against fortifications and capital ships.',
  },
  {
    name: 'AT-AT',
    description:
      'A towering Imperial assault walker that terrifies battlefields with armor and firepower.',
  },
  {
    name: 'AT-ST',
    description:
      'A bipedal scout walker used for patrols and support where AT-ATs cannot easily go.',
  },
  {
    name: 'Storm IV Twin-Pod cloud car',
    description:
      'A sleek Bespin patrol craft that escorts traffic among the clouds of Cloud City.',
  },
  {
    name: 'Sail barge',
    description:
      'Jabba’s lavish desert barge, part yacht and part fortress on Tatooine’s dunes.',
  },
  {
    name: 'Bantha-II cargo skiff',
    description:
      'A Ubrikkian skiff used for cargo—and for Jabba’s grim desert executions.',
  },
  {
    name: 'TIE/IN interceptor',
    description:
      'A razor-winged Imperial fighter faster and deadlier than the standard TIE/LN.',
  },
  {
    name: 'Imperial Speeder Bike',
    description:
      'A high-speed Aratech bike used by scout troopers in forest and open terrain.',
  },
  {
    name: 'Vulture Droid',
    description:
      'A variable-geometry Separatist starfighter that transforms between flight and walk modes.',
  },
  {
    name: 'Multi-Troop Transport',
    description:
      'A lumbering Trade Federation MTT that deploys battalions of battle droids.',
  },
  {
    name: 'Armored Assault Tank',
    description:
      'A Baktoid AAT hover tank that spearheads Separatist ground assaults.',
  },
  {
    name: 'Single Trooper Aerial Platform',
    description:
      'A one-trooper STAP speeder used by battle droids for rapid strikes.',
  },
  {
    name: 'C-9979 landing craft',
    description:
      'A Trade Federation lander that delivers tanks and troops from orbit to surface.',
  },
  {
    name: 'Tribubble bongo',
    description:
      'A Gungan submarine used to traverse Naboo’s dangerous planetary core routes.',
  },
  {
    name: 'Sith speeder',
    description:
      'Darth Maul’s compact FC-20 bike, built for swift pursuit and silent approach.',
  },
  {
    name: 'Zephyr-G swoop bike',
    description:
      'A roaring swoop favored by thrill-seekers and young Anakin on Tatooine.',
  },
  {
    name: 'Koro-2 Exodrive airspeeder',
    description:
      'A Coruscant airspeeder used in high-speed chases through the cityscape.',
  },
  {
    name: 'XJ-6 airspeeder',
    description:
      'A customized Narglatch kit speeder raced through Coruscant’s sky traffic.',
  },
  {
    name: 'LAAT/i',
    description:
      'The Republic’s iconic gunship, ferrying clone troopers into hot landing zones.',
  },
  {
    name: 'LAAT/c',
    description:
      'A carrier variant of the LAAT built to airlift AT-TE walkers into battle.',
  },
  {
    name: 'AT-TE',
    description:
      'A six-legged Republic walker mounting a heavy mass-driver cannon.',
  },
  {
    name: 'SPHA',
    description:
      'A lumbering self-propelled artillery piece for long-range Republic bombardments.',
  },
  {
    name: 'Flitknot speeder',
    description:
      'A Geonosian speeder bike used by Separatist leaders such as Count Dooku.',
  },
  {
    name: 'Neimoidian shuttle',
    description:
      'A Sheathipede-class shuttle favored by Trade Federation officials.',
  },
  {
    name: 'Geonosian starfighter',
    description:
      'A needle-nosed Nantex fighter flown by Geonosian pilots in defense of their hives.',
  },
  {
    name: 'Tsmeu-6 personal wheel bike',
    description:
      'General Grievous’s wheeled war machine, as terrifying as its rider.',
  },
  {
    name: 'Emergency Firespeeder',
    description:
      'A firefighting speeder deployed during crises aboard Republic vessels and cities.',
  },
  {
    name: 'Droid tri-fighter',
    description:
      'A compact Separatist interceptor with heavy firepower for its size.',
  },
  {
    name: 'Oevvaor jet catamaran',
    description:
      'A Wookiee airboat craft adapted for Kashyyyk’s waters and canopy warfare.',
  },
  {
    name: 'Raddaugh Gnasp fluttercraft',
    description: 'A light Appazanna airspeeder used in Kashyyyk’s defense.',
  },
  {
    name: 'Clone turbo tank',
    description:
      'The HAVw A6 Juggernaut—a rolling fortress for clone infantry.',
  },
  {
    name: 'Corporate Alliance tank droid',
    description:
      'A Persuader-class enforcer tank fielded by the Corporate Alliance.',
  },
  {
    name: 'Droid gunship',
    description:
      'An HMP gunship that rains fire on Republic positions from above.',
  },
  {
    name: 'AT-RT',
    description:
      'A light recon walker ridden by clone troopers through forests and ruins.',
  },

  // starships
  {
    name: 'CR90 corvette',
    description:
      'A versatile Corellian blockade runner, typified by the rebel ship Tantive IV.',
  },
  {
    name: 'Star Destroyer',
    description:
      'An Imperial I-class wedge of terror that projects fleet power across systems.',
  },
  {
    name: 'Sentinel-class landing craft',
    description:
      'An Imperial shuttle variant for deploying troops and cargo to a surface.',
  },
  {
    name: 'Death Star',
    description:
      'A moon-sized battle station armed with a planet-killing superlaser.',
  },
  {
    name: 'Millennium Falcon',
    description:
      'A YT-1300 light freighter owned by Han Solo and Chewbacca. It is known for making the Kessel Run in less than 12 parsecs.',
  },
  {
    name: 'Y-wing',
    description:
      'A sturdy Rebel assault starfighter built for bombing runs and heavy strikes.',
  },
  {
    name: 'X-wing',
    description:
      'The Rebellion’s signature T-65 fighter, balanced for dogfights and trench runs.',
  },
  {
    name: 'TIE Advanced x1',
    description:
      'Darth Vader’s prototype TIE with shields and a hyperdrive—rare among Imperial craft.',
  },
  {
    name: 'Executor',
    description:
      'Darth Vader’s Executor-class Super Star Destroyer, flagship of Death Squadron.',
  },
  {
    name: 'Rebel transport',
    description:
      'A Gallofree medium transport used to evacuate bases and haul Alliance materiel.',
  },
  {
    name: 'Slave 1',
    description:
      'Boba Fett’s Firespray patrol craft, heavily modified for hunting and capture.',
  },
  {
    name: 'Imperial shuttle',
    description:
      'A Lambda-class T-4a shuttle used for VIP transport and covert insertions.',
  },
  {
    name: 'EF76 Nebulon-B escort frigate',
    description:
      'A Kuat escort frigate that serves both Imperial and Rebel fleets.',
  },
  {
    name: 'Calamari Cruiser',
    description:
      'A Mon Calamari Star Cruiser that forms the backbone of Alliance capital forces.',
  },
  {
    name: 'A-wing',
    description:
      'A lightning-fast Rebel interceptor built to outrun almost anything in a dogfight.',
  },
  {
    name: 'B-wing',
    description:
      'A heavy Rebel assault fighter packing torpedoes and punishing gun batteries.',
  },
  {
    name: 'Republic Cruiser',
    description:
      'A Consular-class cruiser used for diplomacy—and sometimes for Jedi missions.',
  },
  {
    name: 'Droid control ship',
    description:
      'A Lucrehulk core ship that coordinates Trade Federation droid armies.',
  },
  {
    name: 'Naboo fighter',
    description:
      'The elegant N-1 starfighter of Naboo’s Royal forces, yellow and chrome.',
  },
  {
    name: 'Naboo Royal Starship',
    description:
      'A gleaming J-type royal yacht that carries Naboo’s monarchs through crisis.',
  },
  {
    name: 'Scimitar',
    description:
      'Darth Maul’s stealthy Sith Infiltrator, packed with hidden weaponry.',
  },
  {
    name: 'J-type diplomatic barge',
    description:
      'A Naboo diplomatic vessel used for senatorial travel in the Clone Wars era.',
  },
  {
    name: 'AA-9 Coruscant freighter',
    description:
      'A massive freighter-liner that ferries refugees and cargo through the Core.',
  },
  {
    name: 'Jedi starfighter',
    description:
      'The Delta-7 Aethersprite, a sleek interceptor flown by Jedi into battle.',
  },
  {
    name: 'H-type Nubian yacht',
    description: 'A sleek Naboo yacht associated with Padmé Amidala’s travels.',
  },
  {
    name: 'Republic Assault ship',
    description:
      'An Acclamator-class troop transport that delivers clone armies to war zones.',
  },
  {
    name: 'Solar Sailer',
    description:
      'Count Dooku’s distinctive Punworcca sloop driven by a glowing solar sail.',
  },
  {
    name: 'Trade Federation cruiser',
    description:
      'A Providence-class warship used as a Separatist command carrier.',
  },
  {
    name: 'Theta-class T-2c shuttle',
    description:
      'A diplomatic transport employed in the final days of the Republic.',
  },
  {
    name: 'Republic attack cruiser',
    description:
      'A Venator-class Star Destroyer serving as a Jedi cruisers’ wartime home.',
  },
  {
    name: 'Naboo star skiff',
    description:
      'A slim J-type skiff used by Padmé and her allies late in the Clone Wars.',
  },
  {
    name: 'Jedi Interceptor',
    description:
      'The Eta-2 Actis, a compact Jedi fighter flown by Anakin and Obi-Wan.',
  },
  {
    name: 'arc-170',
    description:
      'A heavy Republic recon fighter crewed by clones for long-range strikes.',
  },
  {
    name: 'Banking clan frigte',
    description:
      'A Munificent-class Separatist frigate bristling with turbolasers.',
  },
  {
    name: 'Belbullab-22 starfighter',
    description:
      'General Grievous’s personal fighter, later flown by Obi-Wan Kenobi.',
  },
  {
    name: 'V-wing',
    description:
      'A clone-era interceptor that fills Republic squadrons late in the war.',
  },

  // planets
  {
    name: 'Tatooine',
    description:
      'A desert planet and the home of Anakin Skywalker. It is known for its harsh environment and twin suns.',
  },
  {
    name: 'Alderaan',
    description:
      'A peaceful Core World of culture and diplomacy—and Leia Organa’s doomed homeworld.',
  },
  {
    name: 'Yavin IV',
    description:
      'A jungle moon hosting the Rebel base that launches the attack on the first Death Star.',
  },
  {
    name: 'Hoth',
    description:
      'A frozen wasteland where the Rebellion hides Echo Base until the Empire arrives.',
  },
  {
    name: 'Dagobah',
    description:
      'A swampy, Force-rich world where Yoda lives in exile and trains Luke Skywalker.',
  },
  {
    name: 'Bespin',
    description:
      'A gas giant famed for Cloud City’s tibanna mining and uneasy Imperial dealings.',
  },
  {
    name: 'Endor',
    description:
      'A forest moon of Ewoks and the stage for the battle against the second Death Star.',
  },
  {
    name: 'Naboo',
    description:
      'A lush world of plains and seas, home to humans and Gungans alike.',
  },
  {
    name: 'Coruscant',
    description:
      'An ecumenopolis and galactic capital layered with politics, Jedi, and underworld depths.',
  },
  {
    name: 'Kamino',
    description:
      'A stormy ocean world of cloners who forge the Republic’s Grand Army.',
  },
  {
    name: 'Geonosis',
    description:
      'A harsh desert hive-world of foundries, arenas, and the Clone Wars’ first great battle.',
  },
  {
    name: 'Utapau',
    description:
      'A sinkhole planet of Pau’ans where Obi-Wan confronts General Grievous.',
  },
  {
    name: 'Mustafar',
    description:
      'A volcanic hellscape of lava rivers where Anakin and Obi-Wan duel to ruin.',
  },
  {
    name: 'Kashyyyk',
    description: 'A towering wroshyr-tree world and home of the Wookiees.',
  },
  {
    name: 'Polis Massa',
    description:
      'A remote asteroid colony that shelters Padmé in her final hours.',
  },
  {
    name: 'Mygeeto',
    description:
      'An icy crystal world contested in the Outer Rim sieges of the Clone Wars.',
  },
  {
    name: 'Felucia',
    description:
      'A humid fungus jungle blazing with color and Separatist conflict.',
  },
  {
    name: 'Cato Neimoidia',
    description:
      'A wealthy Neimoidian purse-world of bridges, vaults, and intrigue.',
  },
  {
    name: 'Saleucami',
    description:
      'A hot Outer Rim world scarred by war and refuge for those fleeing battle.',
  },
  {
    name: 'Stewjon',
    description:
      'An obscure temperate world listed as Obi-Wan Kenobi’s homeworld.',
  },
  {
    name: 'Eriadu',
    description:
      'A polluted industrial planet and power base of the Tarkin family.',
  },
  {
    name: 'Corellia',
    description:
      'A storied shipbuilding world that produces pilots, freighters, and scoundrels.',
  },
  { name: 'Rodia', description: 'A humid jungle homeworld of the Rodians.' },
  {
    name: 'Nal Hutta',
    description:
      'The Hutt homeworld—swamps, bargains, and crime in equal measure.',
  },
  {
    name: 'Dantooine',
    description: 'A quiet grassland planet once used as an early Rebel base.',
  },
  {
    name: 'Bestine IV',
    description:
      'An oceanic world with rocky islands and modest Outer Rim traffic.',
  },
  {
    name: 'Ord Mantell',
    description:
      'A gritty scrap-and-smuggler haven on the bright fringe of the Mid Rim.',
  },
  {
    name: 'unknown',
    description:
      'A placeholder for origins lost to records—or never meant to be found.',
  },
  {
    name: 'Trandosha',
    description:
      'Homeworld of the Trandoshans, rival hunters to the Wookiees of nearby Kashyyyk.',
  },
  {
    name: 'Socorro',
    description:
      'An arid world associated with freighter crews and frontier pilots.',
  },
  {
    name: 'Mon Cala',
    description: 'An oceanic homeworld of the Mon Calamari and Quarren.',
  },
  {
    name: 'Chandrila',
    description: 'A serene agrarian world and birthplace of Mon Mothma.',
  },
  {
    name: 'Sullust',
    description:
      'A volcanic industrial planet that produces skilled Sullustan navigators.',
  },
  {
    name: 'Toydaria',
    description: 'A swampy Mid Rim world ruled by Toydarian kings.',
  },
  {
    name: 'Malastare',
    description: 'A fuel-rich world of Dug podracing and political bargaining.',
  },
  {
    name: 'Dathomir',
    description:
      'A haunted world of cliffs and witches, tied to the Nightbrothers and Nightsisters.',
  },
  {
    name: 'Ryloth',
    description:
      'A tidally locked Twi’lek homeworld of heat, cold, and endurance.',
  },
  {
    name: 'Aleen Minor',
    description: 'A little-documented world connected to the Aleena people.',
  },
  {
    name: 'Vulpter',
    description: 'An industrial Mid Rim planet and home of the Vulptereen.',
  },
  {
    name: 'Troiken',
    description: 'A rugged world linked to the Xexto and Outer Rim contests.',
  },
  {
    name: 'Tund',
    description:
      'A ruined Force-scarred world left barren by ancient catastrophe.',
  },
  {
    name: 'Haruun Kal',
    description: 'A toxic highland world and birthplace of Mace Windu.',
  },
  {
    name: 'Cerea',
    description: 'A verdant isolationist world that is home to the Cereans.',
  },
  {
    name: 'Glee Anselm',
    description:
      'A water-rich world of islands and seas, home to the Nautolans.',
  },
  {
    name: 'Iridonia',
    description:
      'A harsh Zabrak homeworld of rocky canyons and fierce independence.',
  },
  {
    name: 'Tholoth',
    description: 'An obscure world associated with the Tholothian people.',
  },
  { name: 'Iktotch', description: 'A wind-scoured moon home to the Iktotchi.' },
  { name: 'Quermia', description: 'Homeworld of the long-necked Quermians.' },
  {
    name: 'Dorin',
    description:
      'A helium-rich world requiring antiox masks for Kel Dor offworld.',
  },
  {
    name: 'Champala',
    description: 'An oceanic Chagrian homeworld of reefs and politics.',
  },
  {
    name: 'Mirial',
    description:
      'A desert world whose Mirialan people value discipline and fate.',
  },
  {
    name: 'Serenno',
    description:
      'An elegant Outer Rim world and ancestral seat of Count Dooku.',
  },
  {
    name: 'Concord Dawn',
    description: 'A Mandalorian farming world tied to the Fett legacy.',
  },
  { name: 'Zolan', description: 'Homeworld of the Clawdite shape-shifters.' },
  {
    name: 'Ojom',
    description: 'A frigid oceanic world visited by Besalisk travelers.',
  },
  {
    name: 'Skako',
    description:
      'A high-pressure homeworld of the Skakoans and Techno Union industry.',
  },
  {
    name: 'Muunilinst',
    description: 'A wealthy Muun banking world of plazas and ledgers.',
  },
  { name: 'Shili', description: 'Grassland homeworld of the Togruta.' },
  {
    name: 'Kalee',
    description:
      'A war-torn world that forged the Kaleesh warrior General Grievous.',
  },
  {
    name: 'Umbara',
    description:
      'A shadowed world of mist and intrigue, home to advisors like Sly Moore.',
  },

  // films
  {
    name: 'A New Hope',
    description:
      'Rebels steal Death Star plans as Luke Skywalker begins his path as a Jedi and joins the fight against the Empire.',
  },
  {
    name: 'The Empire Strikes Back',
    description:
      'The Empire hunts the Rebellion to Hoth while Luke trains with Yoda and faces a devastating truth.',
  },
  {
    name: 'Return of the Jedi',
    description:
      'The Alliance strikes the second Death Star as Luke confronts Vader and the Emperor on Endor’s doorstep.',
  },
  {
    name: 'The Phantom Menace',
    description:
      'Jedi uncover a Sith return amid a Trade Federation invasion of Naboo and the discovery of young Anakin.',
  },
  {
    name: 'Attack of the Clones',
    description:
      'A growing Separatist crisis births the clone army as Anakin and Padmé’s secret love takes root.',
  },
  {
    name: 'Revenge of the Sith',
    description:
      'The Clone Wars end in betrayal as Anakin falls, the Jedi are purged, and the Empire rises.',
  },
];
