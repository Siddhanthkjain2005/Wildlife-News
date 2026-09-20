import { useState, useMemo } from "react";
import { Scale, Search, FileText, Check, Copy, ShieldAlert, Award } from "lucide-react";
import { TRANSLATIONS } from "../lib/translation.js";

const SPECIES_DATABASE = [
  {
    name_en: "Bengal Tiger",
    name_hi: "बंगाल टाइगर (बाघ)",
    name_kn: "ಬಂಗಾಳ ಹುಲಿ",
    sci: "Panthera tigris",
    sch1972: "Schedule I (Part I)",
    sch2022: "Schedule I",
    status_en: "Highly Endangered - Highest protection. Trade completely prohibited.",
    status_hi: "अत्यधिक लुप्तप्राय - उच्चतम सुरक्षा। व्यापार पूरी तरह से प्रतिबंधित।",
    status_kn: "ಅತ್ಯಂತ ಅಳಿವಿನಂಚಿನಲ್ಲಿರುವ - ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. ಸಂಪೂರ್ಣ ನಿಷೇಧಿತ ವ್ಯಾಪಾರ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  },
  {
    name_en: "Indian Pangolin",
    name_hi: "भारतीय पैंगोलिन (सजला)",
    name_kn: "ಚಿಪ್ಪು ಹಂದಿ",
    sci: "Manis crassicaudata",
    sch1972: "Schedule I (Part I)",
    sch2022: "Schedule I",
    status_en: "Highest protection. Heavily trafficked for scales.",
    status_hi: "उच्चतम सुरक्षा। शल्कों (scales) के लिए भारी तस्करी।",
    status_kn: "ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. ಚಿಪ್ಪುಗಳಿಗಾಗಿ ವ್ಯಾಪಕವಾಗಿ ಕಳ್ಳಸಾಗಣೆಯಾಗುವ ಪ್ರಾಣಿ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  },
  {
    name_en: "Indian Elephant",
    name_hi: "भारतीय हाथी",
    name_kn: "ಭಾರತೀಯ ಆನೆ",
    sci: "Elephas maximus indicus",
    sch1972: "Schedule I (Part I)",
    sch2022: "Schedule I",
    status_en: "Highest protection. Declared National Heritage Animal.",
    status_hi: "उच्चतम सुरक्षा। राष्ट्रीय विरासत पशु घोषित।",
    status_kn: "ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. ರಾಷ್ಟ್ರೀಯ ಪರಂಪರೆ ಪ್ರಾಣಿ ಎಂದು ಘೋಷಿಸಲಾಗಿದೆ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  },
  {
    name_en: "Leopard",
    name_hi: "तेंदुआ",
    name_kn: "ಚಿರತೆ",
    sci: "Panthera pardus",
    sch1972: "Schedule I (Part I)",
    sch2022: "Schedule I",
    status_en: "Highest protection. Extreme poaching risk for skins and bones.",
    status_hi: "उच्चतम सुरक्षा। खाल और हड्डियों के लिए अत्यधिक शिकार का खतरा।",
    status_kn: "ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. ಚರ್ಮ ಮತ್ತು ಮೂಳೆಗಳಿಗಾಗಿ ಅತಿ ಹೆಚ್ಚು ಕಳ್ಳಬೇಟೆ ಅಪಾಯ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  },
  {
    name_en: "Indian Star Tortoise",
    name_hi: "तारा कछुआ",
    name_kn: "ನಕ್ಷತ್ರ ಆಮೆ",
    sci: "Geochelone elegans",
    sch1972: "Schedule IV (Low Protection)",
    sch2022: "Schedule I (Elevated)",
    status_en: "Highest protection. Protection elevated significantly in 2022.",
    status_hi: "उच्चतम सुरक्षा। 2022 में सुरक्षा में उल्लेखनीय वृद्धि की गई।",
    status_kn: "ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. 2022 ರ ಕಾಯ್ದೆಯಡಿ ಸಂರಕ್ಷಣೆ ಮಟ್ಟವನ್ನು ಗಮನಾರ್ಹವಾಗಿ ಹೆಚ್ಚಿಸಲಾಗಿದೆ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  },
  {
    name_en: "Red Sandalwood (Red Sanders)",
    name_hi: "लाल चंदन (रक्त चंदन)",
    name_kn: "ರಕ್ತ ಚಂದನ",
    sci: "Pterocarpus santalinus",
    sch1972: "Schedule VI (Flora)",
    sch2022: "Schedule IV (Regulated Plants)",
    status_en: "Regulated flora. Highly trafficked timber in South India.",
    status_hi: "विनियमित वनस्पति। दक्षिण भारत में अत्यधिक तस्करी वाली लकड़ी।",
    status_kn: "ನಿಯಂತ್ರಿತ ಸಸ್ಯವರ್ಗ. ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಕಳ್ಳಸಾಗಣೆಯಾಗುವ ಶ್ರೀಗಂಧ.",
    penalty_en: "Section 51A: Fine up to ₹25,000, seizure of cargo, timber confiscation.",
    penalty_hi: "धारा 51A: ₹25,000 तक का जुर्माना, कार्गो और लकड़ी की जब्ती।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51A: ₹25,000 ವರೆಗೆ ದಂಡ, ಸರಕು ಮತ್ತು ಶ್ರೀಗಂಧ ವಶಪಡಿಸಿಕೊಳ್ಳುವಿಕೆ."
  },
  {
    name_en: "Blackbuck",
    name_hi: "काला हिरण (कृष्णमृग)",
    name_kn: "ಕೃಷ್ಣಮೃಗ",
    sci: "Antilope cervicapra",
    sch1972: "Schedule I (Part I)",
    sch2022: "Schedule I",
    status_en: "Highest protection. Highly vulnerable to local poaching.",
    status_hi: "उच्चतम सुरक्षा। स्थानीय अवैध शिकार के प्रति अत्यधिक संवेदनशील।",
    status_kn: "ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. ಸ್ಥಳೀಯ ಕಳ್ಳಬೇಟೆಗೆ ಬಲಿಯಾಗುವ ಅಪಾಯಕಾರಿ ಪ್ರಾಣಿ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  },
  {
    name_en: "Ganges River Dolphin",
    name_hi: "गंगा नदी डॉल्फ़िन",
    name_kn: "ಗಂಗಾ ನದಿ ಡಾಲ್ಫಿನ್",
    sci: "Platanista gangetica",
    sch1972: "Schedule I (Part I)",
    sch2022: "Schedule I",
    status_en: "Highest protection. National Aquatic Animal of India.",
    status_hi: "उच्चतम सुरक्षा। भारत का राष्ट्रीय जलीय जीव।",
    status_kn: "ಗರಿಷ್ಠ ಸಂರಕ್ಷಣೆ. ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಜಲಚರ ಪ್ರಾಣಿ.",
    penalty_en: "Section 51: Imprisonment from 3 to 7 years, minimum fine of ₹25,000.",
    penalty_hi: "धारा 51: 3 से 7 साल तक का कारावास, न्यूनतम ₹25,000 का जुर्माना।",
    penalty_kn: "ಸೆಕ್ಷನ್ 51: 3 ರಿಂದ 7 ವರ್ಷಗಳ ಸೆರೆವಾಸ, ಕನಿಷ್ಠ ₹25,000 ದಂಡ."
  }
];

const SOP_DATABASE = [
  {
    id: "tiger",
    species: "Bengal Tiger",
    title_en: "Tiger Carcass & Skin Seizure Protocol",
    title_hi: "बाघ के शव और खाल जब्ती प्रोटोकॉल",
    title_kn: "ಹುಲಿ ಚರ್ಮ ಮತ್ತು ಕಳೇಬರ ವಶಪಡಿಸಿಕೊಳ್ಳುವಿಕೆ ಶಿಷ್ಟಾಚಾರ",
    steps_en: [
      "Secure Crime Scene: Instantly isolate the containment area to preserve footprints, pugmarks, and human DNA/tracks.",
      "Forensic Coordination: Request immediate dispatch of a scientist from the Wildlife Institute of India (WII) or state forensic laboratory.",
      "Camera Trap ID Matching: Take high-resolution orthogonal photos of stripe patterns to match against the national NTCA Tiger ID database.",
      "DNA/Tissue Preservation: Store 2g tissue or hair follicle samples in 70% ethanol or ice. Do not use formalin.",
      "Legal Timelines: File the primary Offence Report (FIR) under Section 50/51 of the WPA within 24 hours of seizure."
    ],
    steps_hi: [
      "अपराध स्थल सुरक्षित करें: पैरों के निशान, पग-मार्क और मानव डीएनए/पटरियों को संरक्षित करने के लिए घेराबंदी करें।",
      "फोरेंसिक समन्वय: भारतीय वन्यजीव संस्थान (WII) या राज्य फोरेंसिक प्रयोगशाला से तत्काल वैज्ञानिक टीम बुलाएं।",
      "कैमरा ट्रैप आईडी मिलान: राष्ट्रीय बाघ डेटाबेस (NTCA) के साथ धारियों के पैटर्न का मिलान करने के लिए उच्च-रिज़ॉल्यूशन तस्वीरें लें।",
      "डीएनए/ऊतक संरक्षण: 2 ग्राम ऊतक या बाल के नमूने को 70% इथेनॉल या बर्फ में सुरक्षित रखें। फॉर्मेलिन का उपयोग न करें।",
      "कानूनी समय सीमा: जब्ती के 24 घंटे के भीतर धारा 50/51 के तहत प्राथमिक अपराध रिपोर्ट (FIR) दर्ज करें।"
    ],
    steps_kn: [
      "ಅಪರಾಧ ಸ್ಥಳ ಸಂರಕ್ಷಣೆ: ಹೆಜ್ಜೆಗುರುತುಗಳು ಮತ್ತು ಡಿಎನ್‌ಎ ಪುರಾವೆಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ತಕ್ಷಣವೇ ಪ್ರದೇಶವನ್ನು ನಿಯಂತ್ರಿಸಿ.",
      "ವಿಧಿವಿಜ್ಞಾನ ಸಮನ್ವಯ: ವೈಲ್ಡ್‌ಲೈಫ್ ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಇಂಡಿಯಾ (WII) ಅಥವಾ ರಾಜ್ಯ ವಿಧಿವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯದಿಂದ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      "ಕಾಲದ ಗುರುತು: ರಾಷ್ಟ್ರೀಯ ಹುಲಿ ಗುರುತಿನ ಡೇಟಾಬೇಸ್‌ಗೆ ಹೋಲಿಸಲು ಪಟ್ಟೆಗಳ ವಿನ್ಯಾಸದ ಉತ್ತಮ ಚಿತ್ರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
      "ಡಿಎನ್‌ಎ ಸಂರಕ್ಷಣೆ: ೨ ಗ್ರಾಂ ಅಂಗಾಂಶ ಅಥವಾ ಕೂದಲಿನ ಮಾದರಿಗಳನ್ನು ೭೦% ಎಥೆನಾಲ್ ಅಥವಾ ಮಂಜುಗಡ್ಡೆಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ.",
      "ಕಾನೂನು ಕಾಲಮಿತಿ: ವಶಪಡಿಸಿಕೊಂಡ ೨೪ ಗಂಟೆಗಳ ಒಳಗೆ WPA ಸೆಕ್ಷನ್ 50/51 ರ ಅಡಿಯಲ್ಲಿ ಎಫ್‌ಐಆರ್ (FIR) ದಾಖಲಿಸಿ."
    ]
  },
  {
    id: "pangolin",
    species: "Indian Pangolin",
    title_en: "Pangolin Scales Seizure Protocol",
    title_hi: "पैंगोलिन शल्क (Scales) जब्ती प्रोटोकॉल",
    title_kn: "ಚಿಪ್ಪುಹಂದಿ ಚಿಪ್ಪುಗಳ ವಶಪಡಿಸಿಕೊಳ್ಳುವಿಕೆ ಶಿಷ್ಟಾಚಾರ",
    steps_en: [
      "Physical Audits: Count the exact number of scales and record total weight in kilograms using calibrated scales.",
      "Chemical Verification: Examine scales under UV light or inspect for artificial coloring/dying used to mask wild harvest origin.",
      "Tamper-Proof Sealing: Place scales in thick official plastic bags, sealed and signed by the seizing officer and two independent witnesses.",
      "Seizure Report: File under Section 9, 39, 44 & 49B of WPA 1972."
    ],
    steps_hi: [
      "भौतिक लेखापरीक्षा: शल्कों की सटीक संख्या गिनें और प्रमाणित तराजू का उपयोग करके कुल वजन किलोग्राम में रिकॉर्ड करें।",
      "रासायनिक सत्यापन: यूवी (UV) प्रकाश के तहत शल्कों की जांच करें या कृत्रिम रंग/रंगाई की जांच करें जो स्रोत को छिपाने के लिए की जाती है।",
      "छेड़छाड़-मुक्त सीलिंग: शल्कों को मोटे आधिकारिक प्लास्टिक बैगों में रखें, सील करें और जब्ती अधिकारी तथा दो गवाहों के हस्ताक्षर लें।",
      "कानूनी फाइलिंग: WPA 1972 की धारा 9, 39, 44 और 49B के तहत मामला दर्ज करें।"
    ],
    steps_kn: [
      "ಭೌತಿಕ ತಪಾಸಣೆ: ಚಿಪ್ಪುಗಳ ನಿಖರ ಸಂಖ್ಯೆಯನ್ನು ಎಣಿಸಿ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ತಕ್ಕಡಿಯನ್ನು ಬಳಸಿ ಒಟ್ಟು ತೂಕವನ್ನು ದಾಖಲಿಸಿ.",
      "ರಾಸಾಯನಿಕ ಪರಿಶೀಲನೆ: ಕಳ್ಳಸಾಗಣೆಯ ಮೂಲ ಮುಚ್ಚಿಡಲು ಬಳಸಲಾದ ಕೃತಕ ಬಣ್ಣ ಅಥವಾ ರಾಸಾಯನಿಕ ಲೇಪನವನ್ನು ಪರಿಶೀಲಿಸಿ.",
      "ಅಧಿಕೃತ ಮುದ್ರೆ: ಗಟ್ಟಿ ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲಗಳಲ್ಲಿ ಹಾಕಿ, ಸೀಲ್ ಮಾಡಿ ಜಪ್ತಿ ಅಧಿಕಾರಿ ಮತ್ತು ಇಬ್ಬರು ಸ್ವತಂತ್ರ ಸಾಕ್ಷಿಗಳ ಸಹಿ ಪಡೆಯಿರಿ.",
      "ಕಾನೂನು ದಾಖಲೀಕರಣ: WPA 1972 ರ ಸೆಕ್ಷನ್ 9, 39, 44 ಮತ್ತು 49B ಅಡಿಯಲ್ಲಿ ಪ್ರಕರಣ ದಾಖಲಿಸಿ."
    ]
  },
  {
    id: "elephant",
    species: "Indian Elephant",
    title_en: "Elephant Ivory (Tusk) Seizure Protocol",
    title_hi: "हाथी दांत (Ivory) जब्ती प्रोटोकॉल",
    title_kn: "ಆನೆ ದಂತ ವಶಪಡಿಸಿಕೊಳ್ಳುವಿಕೆ ಶಿಷ್ಟಾಚಾರ",
    steps_en: [
      "Structural Inspection: Document dimensions (length of outer curve, basal circumference) and check for cross-hatchings (Schreger lines).",
      "Official Weight: Record total weight in kilograms immediately. Weigh hollow pulp cavity separately if broken.",
      "Secure Vault Custody: Lock ivory items inside double-lock regional divisional vaults with registered entry logs.",
      "Notification: Inform State Chief Wildlife Warden and WCCB regional office within 12 hours."
    ],
    steps_hi: [
      "संरचनात्मक निरीक्षण: आयाम दर्ज करें (बाहरी वक्र की लंबाई, आधार की परिधि) और हाथी दांत की विशेष धारियों (Schreger lines) की जांच करें।",
      "आधिकारिक वजन: कुल वजन तुरंत किलोग्राम में रिकॉर्ड करें। यदि टूटा हुआ है, तो खोखले पल्प कैविटी का अलग से वजन करें।",
      "सुरक्षित तिजोरी कस्टडी: हाथी दांत को दोहरे लॉक वाले क्षेत्रीय वन विभाग की तिजोरी में रखें और प्रवेश लॉग दर्ज करें।",
      "सूचना: 12 घंटे के भीतर राज्य के मुख्य वन्यजीव वार्डन (CWLW) और WCCB क्षेत्रीय कार्यालय को सूचित करें।"
    ],
    steps_kn: [
      "ರಚನಾತ್ಮಕ ತಪಾಸಣೆ: ದಂತದ ಉದ್ದ, ಬುಡದ ಸುತ್ತಳತೆಯನ್ನು ಅಳತೆ ಮಾಡಿ ಮತ್ತು ದಂತದ ನೈಜ ಗೆರೆಗಳನ್ನು (Schreger lines) ಪರಿಶೀಲಿಸಿ.",
      "ಅಧಿಕೃತ ತೂಕ ದಾಖಲೆ: ಒಟ್ಟು ತೂಕವನ್ನು ತಕ್ಷಣವೇ ದಾಖಲಿಸಿ. ಮುರಿದಿದ್ದರೆ ಟೊಳ್ಳು ಭಾಗವನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ತೂಕ ಮಾಡಿ.",
      "ಸುರಕ್ಷಿತ ಕಸ್ಟಡಿ: ದ್ವಿಮುಖ ಲಾಕ್ ವ್ಯವಸ್ಥೆಯುಳ್ಳ ಪ್ರಾದೇಶಿಕ ಅರಣ್ಯ ಇಲಾಖೆಯ ಸೇಫ್ ವಾಲ್ಟ್‌ನಲ್ಲಿ ದಂತಗಳನ್ನು ಭದ್ರಪಡಿಸಿ.",
      "ವರದಿ ಸಲ್ಲಿಕೆ: ೧೨ ಗಂಟೆಯೊಳಗೆ ರಾಜ್ಯದ ಮುಖ್ಯ ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣಾಧಿಕಾರಿ (CWLW) ಮತ್ತು WCCB ಕಚೇರಿಗೆ ಮಾಹಿತಿ ನೀಡಿ."
    ]
  },
  {
    id: "redsanders",
    species: "Red Sandalwood",
    title_en: "Red Sanders Timber Seizure Protocol",
    title_hi: "लाल चंदन की लकड़ी जब्ती प्रोटोकॉल",
    title_kn: "ರಕ್ತ ಚಂದನ ಮರ ವಶಪಡಿಸಿಕೊಳ್ಳುವಿಕೆ ಶಿಷ್ಟಾಚಾರ",
    steps_en: [
      "Log Auditing: Count logs, measure individual girth/length, and register dry weight in metric tonnes.",
      "Hammer Mark Verification: Verify presence of forest department hammer marks at cut ends. Lack of marks indicates illegal reserve felling.",
      "Transit Pass Check: Check for forged Transit Permits (Form-II/Form-III). Route check against transport logs.",
      "Joint Charge: File joint offences under Indian Forest Act 1927 (Sec 52) and WPA 2022 (Schedule IV regulated plants)."
    ],
    steps_hi: [
      "लकड़ी का ऑडिट: लट्ठों की संख्या गिनें, व्यक्तिगत परिधि/लंबाई मापें और मीट्रिक टन में सूखा वजन दर्ज करें।",
      "हैमर मार्क सत्यापन: कटे हुए सिरों पर वन विभाग के हैमर (हथौड़ा) के निशान की जांच करें। निशान न होना अवैध कटाई दर्शाता है।",
      "पारगमन पास जांच: नकली पारगमन परमिट (Transit Permits) की जांच करें। परिवहन लॉग के विरुद्ध मार्ग की जांच करें।",
      "संयुक्त शिकायत: भारतीय वन अधिनियम 1927 (धारा 52) और WPA 2022 (अनुसूची IV) के तहत संयुक्त मामला दर्ज करें।"
    ],
    steps_kn: [
      "ಮರಗಳ ಲೆಕ್ಕಪತ್ರ: ಮರದ ದಿಮ್ಮಿಗಳನ್ನು ಎಣಿಸಿ, ಉದ್ದ/ಸುತ್ತಳತೆಯನ್ನು ಅಳತೆ ಮಾಡಿ ಮತ್ತು ಒಟ್ಟು ತೂಕವನ್ನು ಮೆಟ್ರಿಕ್ ಟನ್‌ಗಳಲ್ಲಿ ದಾಖಲಿಸಿ.",
      "ಹ್ಯಾಮರ್ ಗುರುತು ಪರಿಶೀಲನೆ: ಕತ್ತರಿಸಿದ ತುದಿಗಳಲ್ಲಿ ಅರಣ್ಯ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಸುತ್ತಿಗೆ ಮುದ್ರೆ ಇರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      "ಸಾಗಣೆ ಪರವಾನಗಿ ತಪಾಸಣೆ: ನಕಲಿ ಸಾಗಣೆ ಪರವಾನಗಿಗಳನ್ನು (Transit Permits) ಮತ್ತು ಸಾಗಣೆ ಮಾರ್ಗವನ್ನು ಪರಿಶೀಲಿಸಿ.",
      "ಕಾನೂನು ಕ್ರಮ: ಭಾರತೀಯ ಅರಣ್ಯ ಕಾಯ್ದೆ 1927 (ಸೆಕ್ಷನ್ 52) ಮತ್ತು WPA 2022 ರ ಅಡಿಯಲ್ಲಿ ಜಂಟಿ ಮೊಕದ್ದಮೆ ದಾಖಲಿಸಿ."
    ]
  }
];

export default function WpaReference({ language = "en", newsRows = [] }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState("lookup");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIncidentId, setSelectedIncidentId] = useState("");
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedSopId, setSelectedSopId] = useState("tiger");

  const filteredSpecies = useMemo(() => {
    return SPECIES_DATABASE.filter((s) => {
      const matchTerm = searchTerm.toLowerCase();
      return (
        s.name_en.toLowerCase().includes(matchTerm) ||
        s.name_hi.includes(matchTerm) ||
        s.name_kn.includes(matchTerm) ||
        s.sci.toLowerCase().includes(matchTerm)
      );
    });
  }, [searchTerm]);

  const sortedIncidents = useMemo(() => {
    return [...newsRows]
      .filter((row) => row.species && row.species !== "—" && row.species !== "Various")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 25);
  }, [newsRows]);

  const activeSop = useMemo(() => {
    return SOP_DATABASE.find((s) => s.id === selectedSopId) || SOP_DATABASE[0];
  }, [selectedSopId]);

  function handleSelectIncident(id) {
    setSelectedIncidentId(id);
    if (!id) {
      setGeneratedDraft("");
      return;
    }
    const incident = newsRows.find((r) => String(r.id) === String(id));
    if (!incident) return;

    const match = SPECIES_DATABASE.find(
      (s) => s.name_en.toLowerCase().includes(incident.species.toLowerCase()) || 
             incident.species.toLowerCase().includes(s.name_en.toLowerCase())
    );
    const schedule = incident.wpa_schedule || (match ? match.sch2022 : "Schedule I");
    const section = incident.wpa_section || (match ? "Section 9, 39, 44, 49B" : "Section 9");
    const penalty = match ? match.penalty_en : "Section 51: Imprisonment up to 7 years, fine up to ₹25,000.";

    const draft = `WCCB COOPERATIVE LEGAL BRIEF - WILDLIFE CRIME SEIZURE REPORT
----------------------------------------------------------------------
DOCUMENT REF: LEGAL-OFFENCE-WPA-${incident.id}
GENERATED ON: ${new Date().toLocaleDateString()}
CLASSIFICATION: CONFIDENTIAL - OFFICIAL DEPARTMENTAL USE ONLY

SUBJECT: Offence report under the Indian Wildlife (Protection) Act, 1972.

1. INCIDENT DETAILS & SUMMARY:
   - Species Involved: ${incident.species}
   - Crime Category: ${incident.crime_type || "Poaching / Illegal Trade"}
   - Date of Incident: ${new Date(incident.date).toLocaleDateString()}
   - State / District: ${incident.state || "Unknown State"} / ${incident.district || "Unknown District"}
   - Source: ${incident.source} (Threat Score: ${incident.risk_score}/100)

2. COMPLAINT FACTUAL BRIEF:
   "${incident.title}. ${incident.summary || "Poaching syndicate network operating in the area."}"

3. APPLICABLE STATUTORY LEGAL PROVISIONS:
   - Primary Act: Indian Wildlife (Protection) Act, 1972 (Amended in 2022)
   - Legal Schedule: ${schedule} (Strict protection category)
   - WPA Code Offence Sections violated: ${section} (Prohibition of hunting and unauthorized trade of scheduled wildlife)
   - Primary Enforcement Agency: ${incident.enforcement_authority || "State Forest Department & WCCB Joint Taskforce"}
   - Penalty Class: ${penalty}

4. ENFORCEMENT & INVESTIGATION GUIDELINES:
   - Route of Smuggling Detected: ${incident.likely_smuggling_route || "Interstate corridor search recommended."}
   - Recommendation: ${incident.action_recommendation || "Initiate immediate field check, secure material evidence, and track suspect networks."}

----------------------------------------------------------------------
APPROVED DRAFT COMPLAINT OUTLINE FOR WTI & STATE FOREST DEPARTMENTS
    `;
    setGeneratedDraft(draft);
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tabLabels = {
    lookup: language === "hi" ? "WPA प्रजाति निर्देशिका" : language === "kn" ? "WPA ವನ್ಯಜೀವಿ ಕೈಪಿಡಿ" : "WPA Species Directory",
    sops: language === "hi" ? "फील्ड जब्ती प्रोटोकॉल (SOP)" : language === "kn" ? "ಜಪ್ತಿ ಶಿಷ್ಟಾಚಾರ (SOP)" : "Field Seizure Protocols",
    drafter: language === "hi" ? "चार्जशीट ड्राफ्ट जनरेटर" : language === "kn" ? "ಚಾರ್ಜ್‌ಶೀಟ್ ಡ್ರಾಫ್ಟ್ ಜನರೇಟರ್" : "Complaint Drafter"
  };

  return (
    <div className="wpa-container">
      {/* Top Tab Switcher */}
      <div className="wpa-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "lookup"}
          className={`wpa-tab-btn ${activeTab === "lookup" ? "is-active" : ""}`}
          onClick={() => setActiveTab("lookup")}
        >
          <Scale size={16} />
          <span>{tabLabels.lookup}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "sops"}
          className={`wpa-tab-btn ${activeTab === "sops" ? "is-active" : ""}`}
          onClick={() => setActiveTab("sops")}
        >
          <ShieldAlert size={16} />
          <span>{tabLabels.sops}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "drafter"}
          className={`wpa-tab-btn ${activeTab === "drafter" ? "is-active" : ""}`}
          onClick={() => setActiveTab("drafter")}
        >
          <FileText size={16} />
          <span>{tabLabels.drafter}</span>
        </button>
      </div>

      {/* Tab Panel 1: WPA Species Directory */}
      {activeTab === "lookup" && (
        <article className="card">
          <div className="card-head">
            <div className="card-head-left">
              <Scale className="card-head-icon" size={16} />
              <h2>{t.wpa_legal_tool || "WPA Legal Lookup"}</h2>
            </div>
            <p className="card-subtitle">{t.wpa_legal_sub || "Indian Wildlife (Protection) Act, 1972 legal reference guide"}</p>
          </div>
          <div className="card-body">
            <div className="search-box-wpa">
              <Search className="search-icon-wpa" size={14} />
              <input
                type="text"
                placeholder={t.search_wpa_species || "Search species..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="wpa-search-input"
              />
            </div>

            <div className="wpa-list" style={{ maxHeight: "600px", gridTemplateColumns: "1fr 1fr", display: "grid", gap: "16px" }}>
              {filteredSpecies.length > 0 ? (
                filteredSpecies.map((s, idx) => (
                  <div className="wpa-species-item" key={idx}>
                    <div className="wpa-species-title">
                      <h3>
                        {language === "hi" ? s.name_hi : language === "kn" ? s.name_kn : s.name_en}
                      </h3>
                      <span className="scientific-name">({s.sci})</span>
                    </div>
                    <div className="wpa-schedules">
                      <div className="sch-pill">
                        <strong>1972 Act:</strong> {s.sch1972}
                      </div>
                      <div className="sch-pill amend">
                        <strong>2022 Amendment:</strong> {s.sch2022}
                      </div>
                    </div>
                    <div className="wpa-desc">
                      <p>
                        <strong>{t.legal_status || "Legal Status"}:</strong>{" "}
                        {language === "hi" ? s.status_hi : language === "kn" ? s.status_kn : s.status_en}
                      </p>
                      <p className="penalty-text">
                        <strong>{t.penalty_guideline || "Statutory Penalties"}:</strong>{" "}
                        {language === "hi" ? s.penalty_hi : language === "kn" ? s.penalty_kn : s.penalty_en}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="wpa-no-results" style={{ gridColumn: "span 2" }}>No protected species found matching search.</div>
              )}
            </div>
          </div>
        </article>
      )}

      {/* Tab Panel 2: Field Seizure Protocols (SOPs) */}
      {activeTab === "sops" && (
        <article className="card">
          <div className="card-head">
            <div className="card-head-left">
              <ShieldAlert className="card-head-icon" size={16} />
              <h2>{language === "hi" ? "आधिकारिक वन्यजीव जब्ती और जब्ती प्रोटोकॉल (SOPs)" : language === "kn" ? "ಅರಣ್ಯ ಇಲಾಖೆಯ ಜಪ್ತಿ ನಿಯಮಾವಳಿಗಳು (SOPs)" : "Official Field Seizure Standard Operating Procedures (SOPs)"}</h2>
            </div>
            <p className="card-subtitle">Factual field instruction manuals for rangers, custom guards, and officers during active raids</p>
          </div>
          <div className="card-body">
            <div className="sop-grid">
              {/* Left sidebar: SOP list */}
              <div className="sop-menu-list">
                {SOP_DATABASE.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`sop-menu-btn ${selectedSopId === s.id ? "is-active" : ""}`}
                    onClick={() => setSelectedSopId(s.id)}
                  >
                    {language === "hi" ? s.title_hi : language === "kn" ? s.title_kn : s.title_en}
                  </button>
                ))}
              </div>

              {/* Right panel: Active SOP steps */}
              <div className="sop-steps-panel">
                <div className="sop-steps-header">
                  <h3>{language === "hi" ? activeSop.title_hi : language === "kn" ? activeSop.title_kn : activeSop.title_en}</h3>
                  <p>Target Wildlife Group: <strong>{activeSop.species}</strong></p>
                </div>

                <div className="sop-steps-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(language === "hi" ? activeSop.steps_hi : language === "kn" ? activeSop.steps_kn : activeSop.steps_en).map((step, idx) => (
                    <div className="sop-step-item" key={idx}>
                      <span className="sop-step-number">{idx + 1}</span>
                      <span className="sop-step-text">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="status info" style={{ marginTop: "12px", border: "1px solid var(--primary-border)" }}>
                  <Award size={16} />
                  <span>Verified under Section 50 of Wildlife Protection Act, NTCA Seizure Guidelines, and Wildlife Crime Control Bureau directives.</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Tab Panel 3: Complaint Drafter */}
      {activeTab === "drafter" && (
        <article className="card">
          <div className="card-head">
            <div className="card-head-left">
              <FileText className="card-head-icon" size={16} />
              <h2>{t.draft_chargesheet || "WPA Chargesheet Outliner"}</h2>
            </div>
            <p className="card-subtitle">Generate official legal outlines for WTI and Forest Range complaints</p>
          </div>
          <div className="card-body">
            <div className="incident-selector">
              <label htmlFor="wpa-incident-select" className="wpa-select-label">
                Select Active Database Incident:
              </label>
              <select
                id="wpa-incident-select"
                className="wpa-select"
                value={selectedIncidentId}
                onChange={(e) => handleSelectIncident(e.target.value)}
              >
                <option value="">-- Choose Incident --</option>
                {sortedIncidents.map((row) => (
                  <option key={row.id} value={row.id}>
                    [{row.species}] {row.title.substring(0, 60)}...
                  </option>
                ))}
              </select>
            </div>

            {generatedDraft ? (
              <div className="draft-generator-box">
                <div className="draft-head">
                  <span>Formatted Chargesheet Outline (Ready to File)</span>
                  <button type="button" className="btn btn-sm btn-secondary copy-btn" onClick={handleCopy}>
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? t.draft_copied || "Copied!" : t.copy_draft_btn || "Copy Draft"}</span>
                  </button>
                </div>
                <textarea
                  className="draft-textarea cell-mono"
                  value={generatedDraft}
                  readOnly
                  style={{ height: "450px" }}
                />
              </div>
            ) : (
              <div className="draft-placeholder">
                <FileText size={32} className="placeholder-icon" />
                <p>{t.select_incident_draft || "Please select an incident from the dropdown menu above."}</p>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
}
