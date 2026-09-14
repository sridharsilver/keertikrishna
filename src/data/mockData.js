/**
 * Authentic Telugu Literary Mock Dataset
 * Contains rich stories, poems, essays, reflections, authors, categories, and tags.
 * Designed to mirror WordPress REST API data structures.
 */

export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "కథలు",
    slug: "stories",
    description: "జీవన భావోద్వేగాలు, మానవ సంబంధాలు మరియు గ్రామీణ-పట్టణ జీవన చిత్రణలతో కూడిన తెలుగు కథలు.",
    count: 14,
    color: "#A44A3F"
  },
  {
    id: 2,
    name: "కవితలు",
    slug: "poems",
    description: "అంతరంగ మధనం, ప్రకృతి రమణీయత, ప్రేమ మరియు తాత్విక భావాలతో నిండిన కవితా సంకలనం.",
    count: 18,
    color: "#C07D3E"
  },
  {
    id: 3,
    name: "వ్యాసాలు",
    slug: "essays",
    description: "సమకాలీన సాహిత్యం, సంస్కృతి మరియు కళలపై లోతైన విశ్లేషణాత్మక వ్యాసాలు.",
    count: 6,
    color: "#2C423B"
  },
  {
    id: 4,
    name: "ఆలోచనలు",
    slug: "reflections",
    description: "అనుభవాల సారాంశం, చిన్న చిన్న జ్ఞాపకాలు మరియు అంతర్ముఖ ఆలోచనల ఆవిష్కరణ.",
    count: 8,
    color: "#1B2A38"
  }
];

export const MOCK_TAGS = [
  { id: 101, name: "ప్రేమ", slug: "love" },
  { id: 102, name: "జ్ఞాపకాలు", slug: "memories" },
  { id: 103, name: "జీవితం", slug: "life" },
  { id: 104, name: "తత్వశాస్త్రం", slug: "philosophy" },
  { id: 105, name: "సంబంధాలు", slug: "relationships" },
  { id: 106, name: "ప్రకృతి", slug: "nature" },
  { id: 107, name: "ఏకాంతం", slug: "loneliness" },
  { id: 108, name: "ఆశ", slug: "hope" },
  { id: 109, name: "పల్లెటూరు", slug: "village" },
  { id: 110, name: "కాలం", slug: "time" }
];

export const MOCK_AUTHORS = [
  {
    id: 1,
    name: "కీర్తి కృష్ణ",
    slug: "keerti-krishna",
    role: "ప్రధాన సంపాదకులు & రచయిత",
    bio: "తెలుగు సాహిత్యంలో మానవ సంబంధాల సున్నితత్వాలను, అంతరంగ భావోద్వేగాలను అక్షరబద్ధం చేయడంలో ప్రసిద్ధి చెందిన రచయిత్రి. మూడు కథా సంపుటాలు, రెండు కవితా సంకలనాలు వెలువరించారు.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    location: "హైదరాబాద్ / రాజమండ్రి",
    social: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      email: "keerti.krishna@teluguliterature.org"
    },
    stats: {
      storiesCount: 6,
      poemsCount: 8,
      essaysCount: 3
    }
  },
  {
    id: 2,
    name: "శ్రీధర్ శర్మ",
    slug: "sridhar-sharma",
    role: "కవి & విమర్శకుడు",
    bio: "ఆధునిక తెలుగు వచన కవిత్వంలో ప్రత్యేక ముద్ర వేసిన కవి. తాత్వికత, గ్రామీణ నేపథ్యం మరియు ప్రకృతి సౌందర్యాన్ని ప్రతిబింబించే కవితలను రచిస్తారు.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    location: "విశాఖపట్నం",
    social: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      email: "sridhar.sharma@teluguliterature.org"
    },
    stats: {
      storiesCount: 3,
      poemsCount: 9,
      essaysCount: 2
    }
  },
  {
    id: 3,
    name: "వాసవి దేవి",
    slug: "vasavi-devi",
    role: "కథా రచయిత్రి",
    bio: "మహిళా దృక్కోణం నుండి సమాజంలోని విభిన్న కోణాలను స్పృశించే కథలు రాసే రచయిత్రి. జాతీయ మరియు రాష్ట్ర స్థాయి సాహిత్య పురస్కార గ్రహీత.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=1200&q=80",
    location: "విజయవాడ",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      email: "vasavi.devi@teluguliterature.org"
    },
    stats: {
      storiesCount: 5,
      poemsCount: 2,
      essaysCount: 1
    }
  },
  {
    id: 4,
    name: "మాధవ వర్మ",
    slug: "madhava-varma",
    role: "సాహిత్య విమర్శకుడు & కాలమిస్ట్",
    bio: "ప్రాచీన ప్రబంధాల నుండి ఆధునిక కవితా రూపాల వరకు తెలుగు సాహిత్య ప్రస్థానాన్ని పరిశోధించిన ఆచార్యులు. సాహిత్య మాసపత్రికలలో కాలమ్స్ రాస్తుంటారు.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    location: "తిరుపతి",
    social: {
      twitter: "https://twitter.com",
      email: "madhava.varma@teluguliterature.org"
    },
    stats: {
      storiesCount: 2,
      poemsCount: 4,
      essaysCount: 5
    }
  }
];

export const MOCK_POSTS = [
  // --- STORIES ---
  {
    id: 1,
    slug: "godavari-theerana-sayamthram",
    type: "story",
    category: "stories",
    categoryName: "కథలు",
    categoryColor: "#A44A3F",
    title: "గోదావరి తీరాన సాయంత్రం",
    excerpt: "అలల సవ్వడిలో కరిగిపోతున్న జ్ఞాపకాలు, సంధ్యా కాంతిలో విడిపోతున్న రెండు హృదయాల మూగ వేదన. రేవు దగ్గర ఆగిన పడవలా నిలిచిపోయిన ఒక తీపి కథనం.",
    featuredImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
    authorId: 1,
    authorName: "కీర్తి కృష్ణ",
    authorSlug: "keerti-krishna",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    date: "2026-03-08",
    readTime: "7 నిమిషాలు",
    wordCount: 1450,
    tags: ["జ్ఞాపకాలు", "ప్రేమ", "సంబంధాలు", "ప్రకృతి"],
    isFeatured: true,
    isEditorPick: true,
    content: `గోదావరి రేవు వద్ద గాలి చల్లగా వీస్తోంది. ఆకాశం కాషాయ రంగు నుండి నిదానంగా గాఢమైన ఊదా రంగులోకి మారుతోంది. అలల లయబద్ధమైన శబ్దం తప్ప అక్కడ మరే సవ్వడీ లేదు. రామయ్య తాత పడవను కట్టేసి, ఒడ్డున కూర్చుని బీడీ వెలిగించాడు.

అక్కడ కూర్చున్న అరుణకు మనసంతా ఎందుకో అల్లకల్లోలంగా ఉంది. పదేళ్ల తర్వాత మళ్లీ అదే రేవు, అదే గోదావరి, కానీ తన పక్కన ఉండాల్సిన మనుషులు మాత్రం లేరు. జీవితం ఎంత వేగంగా ప్రవహించిపోతుందో ఈ నదిని చూస్తేనే అర్థమవుతుంది. 

"కాలం ఎవరి కోసమూ ఆగదు కదా తల్లీ..." అన్న రామయ్య తాత మాటలు అరుణను ఆలోచనల నుండి బయటకు తెచ్చాయి.

"అవును తాతా, కానీ కొన్ని జ్ఞాపకాలు మాత్రం ఇలా ఈ తీరంలోనే శాశ్వతంగా ఉండిపోతాయి," అంది అరుణ చిరునవ్వుతో, కళ్లలోని చెమ్మను దాచుకుంటూ.

పడవలు ఒక్కొక్కటిగా ఒడ్డుకు చేరుతున్నాయి. దీపాల కాంతులు నీటిపై తేలుతూ కలల ప్రతిబింబాల్లా కదులుతున్నాయి. దూరంగా వినిపించే గంటల నాదం సంధ్యా హారతికి సూచనగా నిలిచింది. మనసులోని భారాన్ని ఆ గోదావరి అలలకే అప్పగించి, నిశ్శబ్దంగా ఇంటి ముఖం పట్టింది అరుణ. నిన్నటి గాయాలు రేపటి ప్రయాణాన్ని ఆపలేవని ఆమెకు తెలుసు.`
  },
  {
    id: 2,
    slug: "matti-vasana-chinukula-raagam",
    type: "story",
    category: "stories",
    categoryName: "కథలు",
    categoryColor: "#A44A3F",
    title: "మట్టి వాసన - చినుకుల రాగం",
    excerpt: "తొలకరి వాన కురిసిన వేళ పల్లెటూరి మట్టి నుంచి లేచే పరిమళం, బాల్యపు అమాయకత్వపు అడుగుజాడలను మళ్లీ కళ్ళముందుకు తెచ్చిన వైనం.",
    featuredImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1400&q=85",
    authorId: 3,
    authorName: "వాసవి దేవి",
    authorSlug: "vasavi-devi",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    date: "2026-03-02",
    readTime: "9 నిమిషాలు",
    wordCount: 1820,
    tags: ["పల్లెటూరు", "జ్ఞాపకాలు", "ప్రకృతి", "ఆశ"],
    isFeatured: false,
    isEditorPick: false,
    content: `నగరపు కాంక్రీట్ అడవుల్లో ఎన్నో ఏళ్లుగా నలిగిపోయిన రాఘవకు, స్వగ్రామం వైపు వేసిన ప్రతి అడుగూ ఒక కొత్త పునర్జన్మలా అనిపించింది. బస్సు దిగగానే పచ్చటి పైరుల నుండి వీచిన చల్లని గాలి అతన్ని ఆత్మీయంగా ఆహ్వానించింది.

ఆకాశం మబ్బులు పట్టి ఉంది. ఎప్పుడెప్పుడా అని ఎదురుచూస్తున్న తొలకరి చినుకులు ఒక్కసారిగా నేలను ముద్దాడాయి. ఆ క్షణంలో వెలువడిన మట్టి వాసన... దాన్ని ఏ కృత్రిమ సెంటుతోనూ పోల్చలేము. అది కేవలం ఒక వాసన మాత్రమే కాదు, అమ్మ చేతి గోరుముద్ద, నాన్న భుజాలపై ఊరేగిన జ్ఞాపకం, చెరువు గట్టున వేసిన పరుగుల తాలూకు స్పర్శ.

పాత పెంకుటింటి పంచెలో కూర్చుని వేడి వేడి టీ తాగుతుంటే, వీధి చివర నుండి కాగితపు పడవలు వేస్తూ కేరింతలు కొడుతున్న పిల్లలు కనిపించారు. నిన్నటి దాకా లాప్‌టాప్ స్క్రీన్ల ముందు ఉక్కిరిబిక్కిరైన అతని మనసు, ఈ చినుకుల రాగంలో ప్రశాంతతను వెతుక్కుంది.`
  },
  {
    id: 3,
    slug: "rakaasi-nidra-lechina-velalo",
    type: "story",
    category: "stories",
    categoryName: "కథలు",
    categoryColor: "#A44A3F",
    title: "వెలుగుల నీడల్లో నగరపు రాత్రి",
    excerpt: "కోట్ల మంది కలలను మోస్తూ నిద్రపోని మహానగరంలో, ఒక సాధారణ వీధి దీపం కింద సాగిన అజ్ఞాత కళాకారుడి జీవిత చిత్రణ.",
    featuredImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85",
    authorId: 1,
    authorName: "కీర్తి కృష్ణ",
    authorSlug: "keerti-krishna",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    date: "2026-02-24",
    readTime: "6 నిమిషాలు",
    wordCount: 1300,
    tags: ["జీవితం", "ఏకాంతం", "ఆశ"],
    isFeatured: false,
    isEditorPick: false,
    content: `రాత్రి ఒంటిగంట దాటింది. నగరపు రద్దీ నెమ్మదించింది కానీ నిశ్శబ్దం మాత్రం రాలేదు. ఫ్లైఓవర్ కింద చిన్న టీ కొట్టు పక్కన కూర్చుని స్కెచ్ బుక్‌లో బొమ్మలు గీస్తున్నాడు శంకర్.

అతని బొమ్మల్లో అందమైన రంగుల మేడలు ఉండవు. రాత్రిపూట ఆటో తోలే డ్రైవర్ ముఖంలోని అలసట, ప్లాట్‌ఫారమ్‌పై దుప్పటి సర్దుకుంటున్న ముసలమ్మ చేతుల వణుకు, పరుగులెత్తే అంబులెన్స్ వెనుక ఆందోళన... ఇవే అతని కాన్వాస్.

"బాబూ, ఈ బొమ్మలు ఎవరు కొంటారు నీ దగ్గర?" అని అడిగాడు టీ మాస్టర్.

"ఎవరూ కొనక్కర్లేదు అన్నా. నగరంలో ప్రతి ఒక్కరూ పరుగులోనే ఉన్నారు. కనీసం ఈ బొమ్మలైనా వాళ్ళ అసలైన జీవితాన్ని భద్రపరుస్తాయి కదా," అన్నాడు శంకర్ పెన్సిల్ షార్ప్ చేస్తూ.`
  },
  {
    id: 4,
    slug: "thathayya-chettu",
    type: "story",
    category: "stories",
    categoryName: "కథలు",
    categoryColor: "#A44A3F",
    title: "తాతయ్య నాటిన వేపచెట్టు",
    excerpt: "తరాల బంధానికి ప్రతీకగా నిలిచిన పెరట్లోని పెద్ద వేపచెట్టు, దాని చుట్టూ అల్లుకున్న కుటుంబ అనుబంధాలు, జ్ఞాపకాల పందిరి.",
    featuredImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
    authorId: 2,
    authorName: "శ్రీధర్ శర్మ",
    authorSlug: "sridhar-sharma",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    date: "2026-02-15",
    readTime: "8 నిమిషాలు",
    wordCount: 1600,
    tags: ["సంబంధాలు", "పల్లెటూరు", "జ్ఞాపకాలు"],
    isFeatured: false,
    isEditorPick: true,
    content: `ఇంటి వెనుక ఉన్న వేపచెట్టు కేవలం ఒక వృక్షం కాదు; అది మా కుటుంబపు పెద్ద దిక్కులాంటిది. మా తాతయ్య తన చిన్నతనంలో నాటిన ఆ మొక్క, నేడు ఆకాశమంత ఎత్తుకు ఎదిగి, తన విశాలమైన కొమ్మలతో మూడు తరాల జ్ఞాపకాలను కప్పుకుంది.

ఎండ తీవ్రంగా ఉన్న మధ్యాహ్నాలు ఆ చెట్టు కింద మంచం వేసుకుని పడుకుంటే వచ్చే నిద్ర ఏ ఏసీ గదిలోనూ రాదు. ఆకులు చేసే గుసగుసల్లో పాతకాలపు కబుర్లు వినిపిస్తాయి. 

చెట్టును నరికేసి అపార్ట్మెంట్ కడదామన్న ప్రపోజల్ వచ్చినప్పుడు, నాన్న ఒక్క మాటే అన్నారు: "చెట్టును నరకడం అంటే తాతయ్య జ్ఞాపకాన్ని నరకడమే." ఆ ఒక్క మాటతో ఆ వేపచెట్టు నేటికీ మా ఇంటికి గొడుగు పడుతూనే ఉంది.`
  },

  // --- POEMS ---
  {
    id: 5,
    slug: "nishabdha-tarangaalu",
    type: "poem",
    category: "poems",
    categoryName: "కవితలు",
    categoryColor: "#C07D3E",
    title: "నిశ్శబ్ద తరంగాలు",
    excerpt: "మాటలకందని భావాల సముద్రంలో, మౌనమే గానమై ప్రతిధ్వనించే అద్భుత కవితా ప్రయాణం.",
    featuredImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1400&q=85",
    authorId: 2,
    authorName: "శ్రీధర్ శర్మ",
    authorSlug: "sridhar-sharma",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    date: "2026-03-09",
    readTime: "3 నిమిషాలు",
    wordCount: 320,
    tags: ["ఏకాంతం", "తత్వశాస్త్రం", "ప్రేమ"],
    isFeatured: true,
    isEditorPick: false,
    content: `మాటలు అలసిపోయిన చోట
మౌనం తన కావ్యగానం ప్రారంభిస్తుంది.

అంతరంగపు లోతుల్లో
ఎవరికీ కనబడని
ఒక నిశ్శబ్ద సముద్రం...
అందులో రేగే అలలన్నీ
చెప్పలేని వేదనల ప్రతిధ్వనులు.

రేపటి తీరం ఎక్కడుందో తెలియదు,
నేటి ప్రవాహం ఆగనంటుంది.
నీ కనురెప్పల చాటున
దాగిన ఒకే ఒక్క కన్నీటి చుక్కలో
ఈ అనంత విశ్వం కరిగిపోతోంది.

మౌనమే నా భాష,
నిశ్శబ్దమే నా గీతం!`
  },
  {
    id: 6,
    slug: "aakurase-kaalam",
    type: "poem",
    category: "poems",
    categoryName: "కవితలు",
    categoryColor: "#C07D3E",
    title: "ఆకురాలే కాలం",
    excerpt: "రాలిపడే ప్రతి పసుపు ఆకు వెనుక ఒక జీవిత చక్రం, వసంతం కోసం ఎదురుచూసే ఆశాభావం.",
    featuredImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
    authorId: 1,
    authorName: "కీర్తి కృష్ణ",
    authorSlug: "keerti-krishna",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    date: "2026-03-05",
    readTime: "2 నిమిషాలు",
    wordCount: 240,
    tags: ["ప్రకృతి", "కాలం", "ఆశ"],
    isFeatured: false,
    isEditorPick: true,
    content: `కొమ్మను వీడి నేలకు జారిన ఆకు
ఏడ్వలేదు...
ఎందుకంటే దానికి తెలుసు,
తాను రాలితేనే
కొత్త చిగురుకు స్థానమని.

జీవితమూ అంతే కదా!
పాత జ్ఞాపకాలు రాలితేనే
కొత్త ఆశల వసంతం వికసించేది.

ఎండిపోయిన ప్రతి ఆకుపైనా
ఒక ఋతువు సంతకం ఉంటుంది,
రాలిపడిన ప్రతి క్షణంలోనూ
ఒక అనుభవపు సారం దాగి ఉంటుంది.`
  },
  {
    id: 7,
    slug: "chiru-chinuku-chitram",
    type: "poem",
    category: "poems",
    categoryName: "కవితలు",
    categoryColor: "#C07D3E",
    title: "చిరు చినుకు చిత్రం",
    excerpt: "మేఘాల కౌగిలి వీడి నేల ఒడికి చేరే వాన చినుకు రాసే ప్రేమలేఖ.",
    featuredImage: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1400&q=85",
    authorId: 3,
    authorName: "వాసవి దేవి",
    authorSlug: "vasavi-devi",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    date: "2026-02-28",
    readTime: "2 నిమిషాలు",
    wordCount: 210,
    tags: ["ప్రేమ", "ప్రకృతి"],
    isFeatured: false,
    isEditorPick: false,
    content: `ఆకాశపు నీలి తెరపై
మేఘం రాసిన మృదువైన కవిత
ఈ తొలకరి చినుకు!

నేల తాకిన క్షణాన
పరిమళించే మట్టి వాసన
ధరణి తెలిపే హృదయపూర్వక కృతజ్ఞత.

చినుకూ చినుకూ కలిసి
ఒక నదిగా మారినట్లు,
చిన్న చిన్న ఆలోచనలే
నా కవిత్వపు జీవనది!`
  },
  {
    id: 8,
    slug: "kaalam-ane-nadhi",
    type: "poem",
    category: "poems",
    categoryName: "కవితలు",
    categoryColor: "#C07D3E",
    title: "కాలం అనే నది",
    excerpt: "ఎవరి ఆజ్ఞలకూ తలవంచక సాగిపోయే కాల ప్రవాహం, అందులో మన ఉనికి ఒక చిన్న బుడగ మాత్రమే.",
    featuredImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85",
    authorId: 4,
    authorName: "మాధవ వర్మ",
    authorSlug: "madhava-varma",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    date: "2026-02-18",
    readTime: "3 నిమిషాలు",
    wordCount: 280,
    tags: ["తత్వశాస్త్రం", "కాలం", "జీవితం"],
    isFeatured: false,
    isEditorPick: false,
    content: `కాలం ఆగని ప్రవాహం...
తీరాలన్నీ తాత్కాలిక విడిదిలే.

నిన్నటి రాజులు నేడు శిలాశాసనాలు,
నేటి సంపద రేపటి గాలిధూళి.
మిగిలేది ఒక్కటే —
నీవు పంచిన ప్రేమ,
నీవు చూపిన కరుణ!

ఈ ప్రవాహంలో
ఈదుతున్నావా, కొట్టుకుపోతున్నావా?
నిన్ను నీవు ప్రశ్నించుకో!`
  },

  // --- ESSAYS & REFLECTIONS ---
  {
    id: 9,
    slug: "telugu-sahityam-aadhunika-dhoranulu",
    type: "essay",
    category: "essays",
    categoryName: "వ్యాసాలు",
    categoryColor: "#2C423B",
    title: "డిజిటల్ యుగంలో తెలుగు సాహిత్యం - నూతన దిశానిర్దేశం",
    excerpt: "సాంకేతిక పరిజ్ఞానం విస్తరిస్తున్న తరుణంలో తెలుగు కథ మరియు కవిత్వం ఎదుర్కొంటున్న సవాళ్లు, సరికొత్త అవకాశాల సమగ్ర విశ్లేషణ.",
    featuredImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=85",
    authorId: 4,
    authorName: "మాధవ వర్మ",
    authorSlug: "madhava-varma",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    date: "2026-03-01",
    readTime: "10 నిమిషాలు",
    wordCount: 2100,
    tags: ["తత్వశాస్త్రం", "జీవితం"],
    isFeatured: false,
    isEditorPick: true,
    content: `ముద్రణాలయం నుండి మొబైల్ స్క్రీన్ దాకా తెలుగు సాహిత్య ప్రయాణం అద్భుతమైన మార్పులను సంతరించుకుంది. తాళపత్ర గ్రంథాల నుండి ప్రారంభమైన ఈ వైభవ సంప్రదాయం నేడు అంతర్జాలంలో ప్రపంచవ్యాప్త పాఠకులకు చేరువవుతోంది.

డిజిటల్ మాధ్యమం ద్వారా కథన శైలిలో సంక్షిప్తత పెరిగింది. దృశ్య మాధ్యమాల పోటీని తట్టుకుని పాఠకుడిని నిలిపి ఉంచే రచనలు రావాల్సిన ఆవశ్యకత ఎంతైనా ఉంది. తెలుగు భాషలోని మాధుర్యాన్ని, పలుకుబడులను కాపాడుకుంటూనే సమకాలీన ప్రపంచ భావాలను స్వీకరించే సమన్వయమే నేటి రచయితల కర్తవ్యం.`
  },
  {
    id: 10,
    slug: "ekantham-lo-srusthi",
    type: "reflections",
    category: "reflections",
    categoryName: "ఆలోచనలు",
    categoryColor: "#1B2A38",
    title: "ఏకాంతంలో వికసించే సృజనాత్మకత",
    excerpt: "రద్దీగా ఉండే ప్రపంచంలో ఏకాంతం ఒక శాపం కాదు, అది సృష్టికర్తలకు లభించే గొప్ప వరం అన్న ఆలోచనాత్మక వ్యాసం.",
    featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=85",
    authorId: 1,
    authorName: "కీర్తి కృష్ణ",
    authorSlug: "keerti-krishna",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    date: "2026-02-20",
    readTime: "5 నిమిషాలు",
    wordCount: 1100,
    tags: ["ఏకాంతం", "తత్వశాస్త్రం"],
    isFeatured: false,
    isEditorPick: false,
    content: `ఏకాంతం అంటే ఒంటరితనం కాదు. ఒంటరితనం శూన్యాన్ని నింపుతుంది, ఏకాంతం మనల్ని మనతో నింపుతుంది. 

రచయితకు, కవికి ఏకాంతం అత్యంత అవసరమైన నేస్తం. చుట్టూ ఉన్న శబ్దాలు ఆగిపోయినప్పుడే లోపల నిద్రాణంగా ఉన్న ఆలోచనల గానం స్పష్టంగా వినబడుతుంది. ప్రతి గొప్ప కథ, ప్రతి అద్భుత కవిత ఒక నిశ్శబ్ద ఏకాంత క్షణంలోనే ప్రాణం పోసుకున్నాయి.`
  }
];

export const LITERARY_QUOTES = [
  {
    quote: "సాహిత్యం అంటే సమాజానికి అద్దం మాత్రమే కాదు, చీకటిలో వెలిగే చిన్న దీపం కూడా.",
    author: "కీర్తి కృష్ణ",
    source: "సంపాదకీయం - సంచిక 1"
  },
  {
    quote: "కవిత్వం అనేది పదాల కూర్పు కాదు; అది అనుభవించిన వేదనకు లభించిన అమృత రూపం.",
    author: "శ్రీధర్ శర్మ",
    source: "కవితా సంభాషణలు"
  },
  {
    quote: "కథ ముగిసిన తర్వాత కూడా పాఠకుడి మనసులో నిరంతరం కొనసాగే ఆలోచనే అసలైన సాహిత్యం.",
    author: "వాసవి దేవి",
    source: "సాహితీ సదస్సు"
  }
];

export const SITE_METADATA = {
  name: "కీర్తి కృష్ణ",
  subname: "Keerti Krishna",
  tagline: "తెలుగు సాహితీ మంజూష • డిజిటల్ సాహిత్య పత్రిక",
  description: "తెలుగు కథలు, కవితలు, వ్యాసాలు మరియు ఆలోచనలతో కూడిన ఆధునిక సాహిత్య వేదిక.",
  editorInChief: "కీర్తి కృష్ణ",
  established: "2026",
  email: "contact@keertikrishna.org",
  siteUrl: "https://keertikrishna.org"
};
