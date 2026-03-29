// ===== GOVERNMENT ACTION PLAN - 100 DAYS NEPAL =====

// ===== DATA =====
const AP_ITEMS = [
  // Anti-Corruption
  { id:1, cat:'Anti-Corruption', color:'#e05a5a', title:'Launch zero-tolerance anti-corruption drive with real-time contract disclosure', titleNe:'भ्रष्टाचार विरुद्ध शून्य-सहिष्णुता अभियान', status:'in-progress', targetDate:'2026-01-05' },
  { id:2, cat:'Anti-Corruption', color:'#e05a5a', title:'Freeze assets of corrupt politicians and liquidate for restoration', titleNe:'भ्रष्ट नेताहरूको सम्पत्ति जफत र परिचालन', status:'pending', targetDate:'2026-01-15' },
  { id:3, cat:'Anti-Corruption', color:'#e05a5a', title:'Establish independent anti-corruption watchdog', titleNe:'स्वतन्त्र भ्रष्टाचार निगरानी संस्था स्थापना', status:'completed', targetDate:'2026-01-20' },
  { id:4, cat:'Anti-Corruption', color:'#e05a5a', title:'Mandate asset declaration for all public officials', titleNe:'सार्वजनिक अधिकारीहरूको अनिवार्य सम्पत्ति विवरण', status:'completed', targetDate:'2026-01-25' },
  { id:5, cat:'Anti-Corruption', color:'#e05a5a', title:'Publish monthly government spending transparency reports', titleNe:'मासिक सरकारी खर्च पारदर्शिता प्रतिवेदन', status:'completed', targetDate:'2026-02-01' },
  { id:6, cat:'Anti-Corruption', color:'#e05a5a', title:'Fast-track corruption cases in courts within 90 days', titleNe:'अदालतमा भ्रष्टाचार मुद्दा ९० दिनमा निष्पत्ति', status:'in-progress', targetDate:'2026-02-10' },
  { id:7, cat:'Anti-Corruption', color:'#e05a5a', title:'Establish anonymous whistleblower hotline', titleNe:'गोप्य सूचक हटलाइन स्थापना', status:'completed', targetDate:'2026-02-15' },
  { id:8, cat:'Anti-Corruption', color:'#e05a5a', title:'Audit top 100 government projects publicly', titleNe:'शीर्ष १०० सरकारी आयोजनाको सार्वजनिक लेखापरीक्षण', status:'pending', targetDate:'2026-02-20' },
  { id:9, cat:'Anti-Corruption', color:'#e05a5a', title:'Publicly publish government anti-corruption roadmap', titleNe:'सरकारको भ्रष्टाचार-विरोधी रोडम्याप प्रकाशन', status:'completed', targetDate:'2026-03-01' },
  { id:10, cat:'Anti-Corruption', color:'#e05a5a', title:'Digitize all government procurement processes', titleNe:'सबै सरकारी खरिद प्रक्रिया डिजिटाइज', status:'in-progress', targetDate:'2026-03-20' },

  // Women's Safety
  { id:11, cat:"Women's Safety", color:'#e05aaa', title:"Launch National Women's Safety Program combining safer transport and legal response", titleNe:'राष्ट्रिय महिला सुरक्षा कार्यक्रम सञ्चालन', status:'in-progress', targetDate:'2026-01-07' },
  { id:12, cat:"Women's Safety", color:'#e05aaa', title:'Deploy dedicated women-friendly public transport on all major routes', titleNe:'प्रमुख मार्गमा महिला मैत्री सार्वजनिक यातायात', status:'pending', targetDate:'2026-01-18' },
  { id:13, cat:"Women's Safety", color:'#e05aaa', title:'Establish rapid legal response unit for gender violence cases', titleNe:'लैंगिक हिंसाको द्रुत कानुनी प्रतिक्रिया इकाई', status:'completed', targetDate:'2026-01-22' },
  { id:14, cat:"Women's Safety", color:'#e05aaa', title:'Set up 24/7 women helpline in all 77 districts', titleNe:'सबै ७७ जिल्लामा २४/७ महिला सहायता', status:'in-progress', targetDate:'2026-02-03' },
  { id:15, cat:"Women's Safety", color:'#e05aaa', title:'Strengthen laws against gender-based violence with mandatory sentencing', titleNe:'लैंगिक हिंसा विरुद्धको कानुन सुदृढीकरण', status:'completed', targetDate:'2026-02-08' },
  { id:16, cat:"Women's Safety", color:'#e05aaa', title:'Install CCTV surveillance in all unsafe public areas', titleNe:'असुरक्षित सार्वजनिक स्थानमा सीसीटीभी', status:'pending', targetDate:'2026-02-14' },
  { id:17, cat:"Women's Safety", color:'#e05aaa', title:'Increase women in police force to 30% by year-end', titleNe:'वर्षान्तसम्म प्रहरीमा ३०% महिला', status:'in-progress', targetDate:'2026-02-22' },
  { id:18, cat:"Women's Safety", color:'#e05aaa', title:'Free legal aid for domestic violence survivors', titleNe:'घरेलु हिंसा पीडितलाई नि:शुल्क कानुनी सहायता', status:'completed', targetDate:'2026-03-01' },
  { id:19, cat:"Women's Safety", color:'#e05aaa', title:'Build safe shelters for women in all 77 districts', titleNe:'सबै ७७ जिल्लामा महिला सुरक्षित आश्रय', status:'pending', targetDate:'2026-03-10' },
  { id:20, cat:"Women's Safety", color:'#e05aaa', title:'Mandatory gender sensitivity training for all government officials', titleNe:'अधिकारीहरूको अनिवार्य लैंगिक संवेदनशीलता तालिम', status:'in-progress', targetDate:'2026-03-20' },

  // Youth & Employment
  { id:21, cat:'Youth & Employment', color:'#5ae0a0', title:'Launch youth skill training centers in all provinces', titleNe:'सबै प्रदेशमा युवा सीप तालिम केन्द्र', status:'completed', targetDate:'2026-01-08' },
  { id:22, cat:'Youth & Employment', color:'#5ae0a0', title:'Create centralized national job portal', titleNe:'केन्द्रीकृत राष्ट्रिय रोजगार पोर्टल', status:'in-progress', targetDate:'2026-01-16' },
  { id:23, cat:'Youth & Employment', color:'#5ae0a0', title:'Establish Rs 5 billion youth entrepreneurship fund', titleNe:'५ अर्बको युवा उद्यमशीलता कोष स्थापना', status:'pending', targetDate:'2026-01-28' },
  { id:24, cat:'Youth & Employment', color:'#5ae0a0', title:'Fast-track 10,000 new government job postings', titleNe:'१०,००० नयाँ सरकारी पद विज्ञापन', status:'completed', targetDate:'2026-02-02' },
  { id:25, cat:'Youth & Employment', color:'#5ae0a0', title:'Vocational training program for 50,000 youth', titleNe:'५०,००० युवालाई व्यावसायिक तालिम', status:'in-progress', targetDate:'2026-02-12' },
  { id:26, cat:'Youth & Employment', color:'#5ae0a0', title:'Reduce youth foreign labor migration by 20%', titleNe:'युवा वैदेशिक श्रम पलायन २०% कटौती', status:'pending', targetDate:'2026-02-18' },
  { id:27, cat:'Youth & Employment', color:'#5ae0a0', title:'School-to-career pathway program in partnership with industry', titleNe:'उद्योग साझेदारीमा स्कूल-टु-क्यारियर कार्यक्रम', status:'completed', targetDate:'2026-02-25' },
  { id:28, cat:'Youth & Employment', color:'#5ae0a0', title:'IT and tech industry job creation incentive', titleNe:'सूचना प्रविधि उद्योग रोजगार सृजना प्रोत्साहन', status:'in-progress', targetDate:'2026-03-05' },
  { id:29, cat:'Youth & Employment', color:'#5ae0a0', title:'Tourism and hospitality industry employment training', titleNe:'पर्यटन उद्योग रोजगार तालिम', status:'pending', targetDate:'2026-03-12' },
  { id:30, cat:'Youth & Employment', color:'#5ae0a0', title:'Diaspora return incentive package with housing and tax benefits', titleNe:'प्रवासी फिर्ती प्रोत्साहन प्याकेज', status:'in-progress', targetDate:'2026-03-22' },

  // Education
  { id:31, cat:'Education', color:'#5a9ae0', title:'Fast-track national curriculum reform to align with 21st century skills', titleNe:'२१औँ सदीको सीप अनुरूप पाठ्यक्रम सुधार', status:'in-progress', targetDate:'2026-01-10' },
  { id:32, cat:'Education', color:'#5a9ae0', title:'Free mid-day meals in all 37,000+ public schools', titleNe:'सबै ३७,०००+ सरकारी विद्यालयमा नि:शुल्क दिवा खाजा', status:'completed', targetDate:'2026-01-19' },
  { id:33, cat:'Education', color:'#5a9ae0', title:'Digital classrooms and internet access in 5,000 schools', titleNe:'५,००० विद्यालयमा डिजिटल कक्षा र इन्टरनेट', status:'in-progress', targetDate:'2026-01-26' },
  { id:34, cat:'Education', color:'#5a9ae0', title:'Hire 10,000 qualified teachers for rural schools', titleNe:'ग्रामीण विद्यालयमा १०,००० योग्य शिक्षक भर्ना', status:'completed', targetDate:'2026-02-04' },
  { id:35, cat:'Education', color:'#5a9ae0', title:'Free university education scholarship for merit students', titleNe:'मेधावी विद्यार्थीलाई नि:शुल्क विश्वविद्यालय छात्रवृत्ति', status:'pending', targetDate:'2026-02-11' },
  { id:36, cat:'Education', color:'#5a9ae0', title:'Coding and digital literacy education in secondary schools', titleNe:'माध्यमिक विद्यालयमा कोडिङ र डिजिटल साक्षरता', status:'in-progress', targetDate:'2026-02-19' },
  { id:37, cat:'Education', color:'#5a9ae0', title:'Adult literacy program targeting 500,000 citizens', titleNe:'५,००,००० नागरिकलाई प्रौढ साक्षरता', status:'completed', targetDate:'2026-02-26' },
  { id:38, cat:'Education', color:'#5a9ae0', title:'Scholarship program for girls in STEM fields', titleNe:'STEM क्षेत्रमा छात्राहरूलाई छात्रवृत्ति', status:'in-progress', targetDate:'2026-03-06' },
  { id:39, cat:'Education', color:'#5a9ae0', title:'Upgrade all district libraries with digital resources', titleNe:'सबै जिल्ला पुस्तकालय डिजिटल स्रोतसहित स्तरोन्नति', status:'pending', targetDate:'2026-03-14' },
  { id:40, cat:'Education', color:'#5a9ae0', title:'Political literacy program for Generation Z via social media', titleNe:'सामाजिक सञ्जालमार्फत जेन-जेडको राजनीतिक साक्षरता', status:'in-progress', targetDate:'2026-03-25' },

  // Infrastructure
  { id:41, cat:'Infrastructure', color:'#e0a05a', title:'Fast-track Kathmandu ring road completion', titleNe:'काठमाडौं रिंग रोड निर्माण सम्पन्न', status:'in-progress', targetDate:'2026-01-11' },
  { id:42, cat:'Infrastructure', color:'#e0a05a', title:'Repair and upgrade 5,000 km of rural roads', titleNe:'५,००० किमी ग्रामीण सडक मर्मत तथा स्तरोन्नति', status:'pending', targetDate:'2026-01-21' },
  { id:43, cat:'Infrastructure', color:'#e0a05a', title:'National broadband internet connectivity plan', titleNe:'राष्ट्रिय ब्रोडब्यान्ड इन्टरनेट योजना', status:'completed', targetDate:'2026-01-29' },
  { id:44, cat:'Infrastructure', color:'#e0a05a', title:'Restore infrastructure damaged during protests', titleNe:'आन्दोलनले क्षतिग्रस्त पूर्वाधार पुनर्निर्माण', status:'completed', targetDate:'2026-02-06' },
  { id:45, cat:'Infrastructure', color:'#e0a05a', title:'Build 50 new bridges in hilly and remote regions', titleNe:'पहाडी र दुर्गम क्षेत्रमा ५० नयाँ पुल', status:'pending', targetDate:'2026-02-13' },
  { id:46, cat:'Infrastructure', color:'#e0a05a', title:'Enforce earthquake-resilient building standards nationwide', titleNe:'देशव्यापी भूकम्प-प्रतिरोधी भवन मापदण्ड लागू', status:'in-progress', targetDate:'2026-02-20' },
  { id:47, cat:'Infrastructure', color:'#e0a05a', title:'Complete electric railway feasibility study', titleNe:'विद्युतीय रेलमार्ग सम्भाव्यता अध्ययन सम्पन्न', status:'completed', targetDate:'2026-02-27' },
  { id:48, cat:'Infrastructure', color:'#e0a05a', title:'Solar power installation in 1,000 off-grid villages', titleNe:'१,००० अफ-ग्रिड गाउँमा सौर्य ऊर्जा', status:'in-progress', targetDate:'2026-03-07' },
  { id:49, cat:'Infrastructure', color:'#e0a05a', title:'Clean drinking water supply in 500 underserved VDCs', titleNe:'५०० वंचित गाविसमा स्वच्छ खानेपानी', status:'pending', targetDate:'2026-03-15' },
  { id:50, cat:'Infrastructure', color:'#e0a05a', title:'Smart city pilot project in Kathmandu and Pokhara', titleNe:'काठमाडौं र पोखरामा स्मार्ट सिटी पाइलट', status:'in-progress', targetDate:'2026-03-26' },

  // Governance
  { id:51, cat:'Governance', color:'#9a5ae0', title:'Create bureau of technological and operational experts to reduce bureaucracy', titleNe:'नोकरशाही घटाउन प्रविधि विशेषज्ञ ब्यूरो', status:'completed', targetDate:'2026-01-06' },
  { id:52, cat:'Governance', color:'#9a5ae0', title:'Digitize all government services end-to-end', titleNe:'सबै सरकारी सेवाको पूर्ण डिजिटाइजेसन', status:'in-progress', targetDate:'2026-01-17' },
  { id:53, cat:'Governance', color:'#9a5ae0', title:'Citizens feedback portal for all ministries', titleNe:'सबै मन्त्रालयका लागि नागरिक प्रतिक्रिया पोर्टल', status:'completed', targetDate:'2026-01-23' },
  { id:54, cat:'Governance', color:'#9a5ae0', title:'Reduce bureaucratic red tape by 50% in key services', titleNe:'प्रमुख सेवामा ५०% नोकरशाही कटौती', status:'pending', targetDate:'2026-02-07' },
  { id:55, cat:'Governance', color:'#9a5ae0', title:'E-governance portal for all citizen services', titleNe:'सबै नागरिक सेवाको ई-गभर्नेन्स पोर्टल', status:'in-progress', targetDate:'2026-02-16' },
  { id:56, cat:'Governance', color:'#9a5ae0', title:'Local government capacity building program', titleNe:'स्थानीय सरकार क्षमता अभिवृद्धि कार्यक्रम', status:'completed', targetDate:'2026-02-21' },
  { id:57, cat:'Governance', color:'#9a5ae0', title:'Establish clear government-to-citizen communication with timelines', titleNe:'समयसीमासहित स्पष्ट सरकार-नागरिक संचार', status:'in-progress', targetDate:'2026-02-28' },
  { id:58, cat:'Governance', color:'#9a5ae0', title:'Streamline passport and citizenship document services', titleNe:'राहदानी र नागरिकता सेवा सरलीकरण', status:'completed', targetDate:'2026-03-08' },
  { id:59, cat:'Governance', color:'#9a5ae0', title:'Open data policy for all government datasets', titleNe:'सरकारी डेटासेटको खुला डेटा नीति', status:'pending', targetDate:'2026-03-16' },
  { id:60, cat:'Governance', color:'#9a5ae0', title:'Meritocracy-based civil service reform and restructuring', titleNe:'योग्यताका आधारमा निजामती सेवा सुधार', status:'in-progress', targetDate:'2026-03-27' },

  // Health
  { id:61, cat:'Health', color:'#5ae0e0', title:'Universal health insurance coverage for all Nepali citizens', titleNe:'सबै नेपाली नागरिकको सर्वव्यापी स्वास्थ्य बीमा', status:'in-progress', targetDate:'2026-01-09' },
  { id:62, cat:'Health', color:'#5ae0e0', title:'Free essential medicine supply to all rural hospitals', titleNe:'ग्रामीण अस्पतालमा नि:शुल्क आवश्यक औषधि', status:'completed', targetDate:'2026-01-20' },
  { id:63, cat:'Health', color:'#5ae0e0', title:'Mental health centers in all 77 districts', titleNe:'सबै ७७ जिल्लामा मानसिक स्वास्थ्य केन्द्र', status:'pending', targetDate:'2026-01-27' },
  { id:64, cat:'Health', color:'#5ae0e0', title:'Hire and deploy 5,000 doctors to rural areas', titleNe:'ग्रामीण क्षेत्रमा ५,००० डाक्टर खटाउने', status:'in-progress', targetDate:'2026-02-09' },
  { id:65, cat:'Health', color:'#5ae0e0', title:'National vaccination campaign expansion reaching all children', titleNe:'सबै बालबालिका पुग्ने राष्ट्रिय खोप अभियान', status:'completed', targetDate:'2026-02-17' },
  { id:66, cat:'Health', color:'#5ae0e0', title:'Maternal health program in remote and hilly areas', titleNe:'दुर्गम र पहाडी क्षेत्रमा मातृ स्वास्थ्य कार्यक्रम', status:'in-progress', targetDate:'2026-02-24' },
  { id:67, cat:'Health', color:'#5ae0e0', title:'Drug abuse rehabilitation and awareness centers', titleNe:'लागुपदार्थ पुनर्स्थापना र सचेतना केन्द्र', status:'completed', targetDate:'2026-03-03' },
  { id:68, cat:'Health', color:'#5ae0e0', title:'Launch nationwide telemedicine service platform', titleNe:'देशव्यापी टेलिमेडिसिन सेवा मञ्च सञ्चालन', status:'pending', targetDate:'2026-03-11' },
  { id:69, cat:'Health', color:'#5ae0e0', title:'Enforce clean air standards for Kathmandu Valley', titleNe:'काठमाडौं उपत्यकामा स्वच्छ वायु मापदण्ड लागू', status:'in-progress', targetDate:'2026-03-19' },
  { id:70, cat:'Health', color:'#5ae0e0', title:'Nutrition intervention program for malnourished children', titleNe:'कुपोषित बालबालिकाको पोषण हस्तक्षेप', status:'completed', targetDate:'2026-03-28' },

  // Environment
  { id:71, cat:'Environment', color:'#a0e05a', title:'Plant 10 million trees across Nepal in 100 days', titleNe:'१०० दिनमा १ करोड रूख रोपाइँ', status:'in-progress', targetDate:'2026-01-12' },
  { id:72, cat:'Environment', color:'#a0e05a', title:'National ban on single-use plastics with enforcement', titleNe:'एकल-प्रयोग प्लास्टिकमा राष्ट्रिय प्रतिबन्ध', status:'completed', targetDate:'2026-01-24' },
  { id:73, cat:'Environment', color:'#a0e05a', title:'Urban waste management task force in all cities', titleNe:'सबै शहरमा फोहोर व्यवस्थापन कार्यदल', status:'in-progress', targetDate:'2026-02-01' },
  { id:74, cat:'Environment', color:'#a0e05a', title:'Bagmati river comprehensive clean-up project', titleNe:'बागमती नदी व्यापक सफाइ परियोजना', status:'pending', targetDate:'2026-02-10' },
  { id:75, cat:'Environment', color:'#a0e05a', title:'National climate action plan with youth involvement', titleNe:'युवा सहभागितामा राष्ट्रिय जलवायु कार्ययोजना', status:'completed', targetDate:'2026-02-17' },
  { id:76, cat:'Environment', color:'#a0e05a', title:'50% renewable energy target pathway by 2030', titleNe:'२०३० सम्म ५०% नवीकरणीय ऊर्जा लक्ष्य', status:'in-progress', targetDate:'2026-02-23' },
  { id:77, cat:'Environment', color:'#a0e05a', title:'Community forest conservation program in Terai region', titleNe:'तराई क्षेत्रमा सामुदायिक वन संरक्षण', status:'completed', targetDate:'2026-03-02' },
  { id:78, cat:'Environment', color:'#a0e05a', title:'Electric vehicle subsidy and charging infrastructure program', titleNe:'विद्युतीय गाडी अनुदान र चार्जिङ पूर्वाधार', status:'pending', targetDate:'2026-03-09' },
  { id:79, cat:'Environment', color:'#a0e05a', title:'Himalayan glacier monitoring and protection initiative', titleNe:'हिमालय हिमनदी अनुगमन र संरक्षण', status:'in-progress', targetDate:'2026-03-17' },
  { id:80, cat:'Environment', color:'#a0e05a', title:'Organic farming incentive and certification program for farmers', titleNe:'किसानलाई जैविक खेती प्रोत्साहन र प्रमाणन', status:'completed', targetDate:'2026-03-29' },

  // Economy
  { id:81, cat:'Economy', color:'#e0e05a', title:'Reduce income tax burden for middle-class families', titleNe:'मध्यम वर्गीय परिवारको आयकर भार कटौती', status:'in-progress', targetDate:'2026-01-13' },
  { id:82, cat:'Economy', color:'#e0e05a', title:'Redirect recovered corruption funds to development programs', titleNe:'भ्रष्टाचारबाट उद्धार रकम विकास कार्यक्रममा', status:'completed', targetDate:'2026-01-25' },
  { id:83, cat:'Economy', color:'#e0e05a', title:'Revise foreign direct investment policy to attract global capital', titleNe:'प्रत्यक्ष विदेशी लगानी नीति पुनरावलोकन', status:'in-progress', targetDate:'2026-02-03' },
  { id:84, cat:'Economy', color:'#e0e05a', title:'Export promotion fund for small and medium enterprises', titleNe:'साना-मझौला उद्यमको निर्यात प्रोत्साहन कोष', status:'pending', targetDate:'2026-02-11' },
  { id:85, cat:'Economy', color:'#e0e05a', title:'Simplified single-window tax filing for small businesses', titleNe:'साना व्यवसायको एकल-झ्याल कर दाखिला', status:'completed', targetDate:'2026-02-19' },
  { id:86, cat:'Economy', color:'#e0e05a', title:'Digital payment infrastructure expansion nationwide', titleNe:'देशव्यापी डिजिटल भुक्तानी पूर्वाधार विस्तार', status:'in-progress', targetDate:'2026-02-26' },
  { id:87, cat:'Economy', color:'#e0e05a', title:'Subsidized agricultural loans at 5% interest rate', titleNe:'५% ब्याजमा अनुदानित कृषि ऋण', status:'completed', targetDate:'2026-03-04' },
  { id:88, cat:'Economy', color:'#e0e05a', title:'Tourism revenue target of Rs 100 billion this fiscal year', titleNe:'यो आर्थिक वर्ष पर्यटन राजस्व १०० अर्बको लक्ष्य', status:'pending', targetDate:'2026-03-13' },
  { id:89, cat:'Economy', color:'#e0e05a', title:'Cryptocurrency and fintech regulatory framework', titleNe:'क्रिप्टोकरेन्सी र फिनटेकको नियामक ढाँचा', status:'in-progress', targetDate:'2026-03-21' },
  { id:90, cat:'Economy', color:'#e0e05a', title:'Review and renegotiate trade agreements with India and China', titleNe:'भारत र चीनसँग व्यापार सम्झौता पुनरावलोकन', status:'pending', targetDate:'2026-03-30' },

  // Civic & Democracy
  { id:91, cat:'Civic & Democracy', color:'#e07a5a', title:'Enable overseas voting rights for Nepali diaspora', titleNe:'प्रवासी नेपालीलाई विदेशबाट मतदान अधिकार', status:'in-progress', targetDate:'2026-01-14' },
  { id:92, cat:'Civic & Democracy', color:'#e07a5a', title:'Youth parliament program in all 7 provinces', titleNe:'सबै ७ प्रदेशमा युवा संसद कार्यक्रम', status:'completed', targetDate:'2026-01-30' },
  { id:93, cat:'Civic & Democracy', color:'#e07a5a', title:'Launch Right to Information (RTI) citizens portal', titleNe:'नागरिक सूचनाको हक पोर्टल लञ्च', status:'completed', targetDate:'2026-02-05' },
  { id:94, cat:'Civic & Democracy', color:'#e07a5a', title:'Citizens assemblies in all 753 local government units', titleNe:'सबै ७५३ स्थानीय तहमा नागरिक सभा', status:'pending', targetDate:'2026-02-13' },
  { id:95, cat:'Civic & Democracy', color:'#e07a5a', title:'Enact free press protection and journalist safety law', titleNe:'स्वतन्त्र प्रेस संरक्षण र पत्रकार सुरक्षा ऐन', status:'in-progress', targetDate:'2026-02-21' },
  { id:96, cat:'Civic & Democracy', color:'#e07a5a', title:'National social media civic education and awareness campaign', titleNe:'राष्ट्रिय सामाजिक सञ्जाल नागरिक शिक्षा अभियान', status:'completed', targetDate:'2026-02-28' },
  { id:97, cat:'Civic & Democracy', color:'#e07a5a', title:'Establish National Minority Rights Protection Commission', titleNe:'राष्ट्रिय अल्पसंख्यक अधिकार संरक्षण आयोग', status:'pending', targetDate:'2026-03-08' },
  { id:98, cat:'Civic & Democracy', color:'#e07a5a', title:'Federalism implementation review and strengthening committee', titleNe:'संघीयता कार्यान्वयन समीक्षा तथा सुदृढीकरण समिति', status:'in-progress', targetDate:'2026-03-18' },
  { id:99, cat:'Civic & Democracy', color:'#e07a5a', title:'Form electoral reform commission for democratic strengthening', titleNe:'लोकतन्त्र सुदृढीकरणका लागि निर्वाचन सुधार आयोग', status:'completed', targetDate:'2026-03-26' },
  { id:100, cat:'Civic & Democracy', color:'#e07a5a', title:'Constitution amendment public consultation process', titleNe:'संविधान संशोधन सार्वजनिक परामर्श प्रक्रिया', status:'pending', targetDate:'2026-04-01' },
];

const AP_CATEGORIES = [
  { name:'All', color:'#e8c46a' },
  { name:'Anti-Corruption', color:'#e05a5a' },
  { name:"Women's Safety", color:'#e05aaa' },
  { name:'Youth & Employment', color:'#5ae0a0' },
  { name:'Education', color:'#5a9ae0' },
  { name:'Infrastructure', color:'#e0a05a' },
  { name:'Governance', color:'#9a5ae0' },
  { name:'Health', color:'#5ae0e0' },
  { name:'Environment', color:'#a0e05a' },
  { name:'Economy', color:'#e0e05a' },
  { name:'Civic & Democracy', color:'#e07a5a' },
];

const CABINET_MEMBERS = [
  { name:'बालेन्द्र शाह', nameEn:'Balendra Shah', title:'प्रधानमन्त्री', titleEn:'Prime Minister', isPM: true },
  { name:'सुथन गुरुङ', nameEn:'Suthan Gurung', title:'गृह मन्त्री', titleEn:'Home Minister' },
  { name:'स्वर्णिम वाग्ले', nameEn:'Swarnima Wagle', title:'अर्थ मन्त्री', titleEn:'Finance Minister' },
  { name:'सोविता गौतम', nameEn:'Sovita Gautam', title:'कानून मन्त्री', titleEn:'Law Minister' },
  { name:'स्वर राजान', nameEn:'Swar Rajan', title:'नवाचार मन्त्री', titleEn:'Innovation Minister' },
  { name:'विराज भक्त श्रेष्ठ', nameEn:'Biraj Bhakta Shrestha', title:'ऊर्जा मन्त्री', titleEn:'Energy Minister' },
  { name:'शिशिर खनाल', nameEn:'Shishir Khanal', title:'परराष्ट्र मन्त्री', titleEn:'Foreign Affairs Minister' },
  { name:'प्यावरन पाण्डेव', nameEn:'Pyawaran Pandew', title:'पर्यटन मन्त्री', titleEn:'Tourism Minister' },
  { name:'गनेश पोदेल', nameEn:'Ganesh Podel', title:'पर्टन मन्त्री', titleEn:'Tourism Co-Minister' },
  { name:'प्रतिमा रातल', nameEn:'Pratima Ratal', title:'सामान्य प्रशासन मन्त्री', titleEn:'General Administration Minister' },
  { name:'गीत वोहरी', nameEn:'Git Vohari', title:'कृषि मन्त्री', titleEn:'Agriculture Minister' },
];

// ===== STATE =====
let apVotes = {};     // { itemId: { up, down, voters:{email:vote}, ipVoters:{ip:vote} } }
let apComments = {};  // { itemId: [{ userEmail, userName, text, createdAt }] }
let apIpVotes = {};   // { itemId: vote } — current IP's votes fetched from server
let apFilter = 'All';
let apExpandedItems = {}; // { itemId: bool }
let calYear = 2082;
let calMonth = 12;

// ===== BS CALENDAR UTILITIES =====
const BS_MONTH_DATA = {
  2080: [31,31,32,32,31,30,30,29,30,29,30,30],
  2081: [31,31,32,31,31,31,30,29,30,29,30,30],
  2082: [30,32,31,32,31,30,30,29,30,29,30,30],
  2083: [31,31,32,31,31,30,30,29,30,29,30,30],
};
const BS_MONTH_NAMES = ['','बैशाख','जेठ','असार','श्रावण','भदौ','आश्विन','कार्तिक','मङ्सिर','पुष','माघ','फागुन','चैत्र'];
const BS_MONTH_NAMES_EN = ['','Baisakh','Jestha','Ashar','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];
const NP_DIGITS = ['०','१','२','३','४','५','६','७','८','९'];

function toNepaliDigits(n) {
  return String(n).split('').map(d => NP_DIGITS[parseInt(d)] || d).join('');
}

function getBSDaysInMonth(year, month) {
  const data = BS_MONTH_DATA[year];
  if (!data) return 30;
  return data[month - 1];
}

// Reference: BS 2082-01-01 = AD 2025-04-14
const REF_AD = new Date(2025, 3, 14); // April 14, 2025
const REF_BS = { year: 2082, month: 1, day: 1 };

function bsToAd(bsYear, bsMonth, bsDay) {
  // Count days from reference BS date
  let days = 0;
  // Count full BS years from 2082
  let y = REF_BS.year, m = REF_BS.month;
  // Go from reference to target
  if (bsYear > REF_BS.year || (bsYear === REF_BS.year && bsMonth > REF_BS.month) ||
      (bsYear === REF_BS.year && bsMonth === REF_BS.month && bsDay >= REF_BS.day)) {
    // Target is after reference
    let cy = REF_BS.year, cm = REF_BS.month, cd = REF_BS.day;
    while (cy < bsYear || cm < bsMonth || cd < bsDay) {
      if (cy === bsYear && cm === bsMonth && cd === bsDay) break;
      days++;
      cd++;
      const daysInMonth = getBSDaysInMonth(cy, cm);
      if (cd > daysInMonth) { cd = 1; cm++; }
      if (cm > 12) { cm = 1; cy++; }
    }
  } else {
    // Target is before reference - go backwards
    let cy = REF_BS.year, cm = REF_BS.month, cd = REF_BS.day;
    while (cy > bsYear || cm > bsMonth || cd > bsDay) {
      if (cy === bsYear && cm === bsMonth && cd === bsDay) break;
      days--;
      cd--;
      if (cd < 1) { cm--; if (cm < 1) { cm = 12; cy--; } cd = getBSDaysInMonth(cy, cm); }
    }
  }
  const result = new Date(REF_AD);
  result.setDate(result.getDate() + days);
  return result;
}

function adToBS(adDate) {
  const diffDays = Math.round((adDate - REF_AD) / 86400000);
  let cy = REF_BS.year, cm = REF_BS.month, cd = REF_BS.day;
  let remaining = diffDays;
  if (remaining >= 0) {
    while (remaining > 0) {
      const dim = getBSDaysInMonth(cy, cm);
      const daysLeft = dim - cd;
      if (remaining <= daysLeft) { cd += remaining; remaining = 0; }
      else { remaining -= (daysLeft + 1); cd = 1; cm++; if (cm > 12) { cm = 1; cy++; } }
    }
  } else {
    while (remaining < 0) {
      if (cd + remaining > 0) { cd += remaining; remaining = 0; }
      else { remaining += cd; cm--; if (cm < 1) { cm = 12; cy--; } cd = getBSDaysInMonth(cy, cm); }
    }
  }
  return { year: cy, month: cm, day: cd };
}

function getFirstWeekdayOfBSMonth(bsYear, bsMonth) {
  const adDate = bsToAd(bsYear, bsMonth, 1);
  // Nepal week: 0=Sun,1=Mon,...,6=Sat (same as JS)
  return adDate.getDay();
}

function getADDateForBSDay(bsYear, bsMonth, bsDay) {
  return bsToAd(bsYear, bsMonth, bsDay);
}

// ===== LOAD ACTION PLAN DATA =====
async function loadAPData() {
  try {
    const [votes, comments, ipData] = await Promise.all([
      apiGet('/action-plans/votes'),
      apiGet('/action-plans/comments'),
      apiGet('/action-plans/votes/my-ip')
    ]);
    apVotes = votes;
    apIpVotes = ipData.votes || {};
    apComments = {};
    comments.forEach(c => {
      if (!apComments[c.itemId]) apComments[c.itemId] = [];
      apComments[c.itemId].push(c);
    });
  } catch (e) {
    console.error('Failed to load action plan data:', e);
  }
}

// ===== VOTE =====
async function voteAPItem(itemId, vote) {
  if (!state.currentUser) { notify('Please login to vote', 'error'); return; }
  const userEmail = state.currentUser.email;
  const existing = apVotes[itemId]?.voters?.[userEmail];

  // Check IP block before even trying
  const ipExisting = apIpVotes[itemId];
  if (ipExisting !== undefined && !existing) {
    notify('Your network has already voted on this item', 'error');
    return;
  }

  try {
    if (existing === vote) {
      // Toggle off
      await fetch(`${API_BASE}/action-plans/vote`, {
        method:'DELETE', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ itemId, userEmail })
      });
      if (apVotes[itemId]) {
        if (vote === 1) apVotes[itemId].up = Math.max(0, (apVotes[itemId].up||0) - 1);
        else apVotes[itemId].down = Math.max(0, (apVotes[itemId].down||0) - 1);
        delete apVotes[itemId].voters[userEmail];
      }
      delete apIpVotes[itemId];
    } else {
      const res = await fetch(`${API_BASE}/action-plans/vote`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ itemId, userEmail, vote })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'ip_conflict') {
          notify('Your network has already voted on this item', 'error');
        } else {
          notify('Vote failed: ' + (data.message || data.error), 'error');
        }
        return;
      }
      if (!apVotes[itemId]) apVotes[itemId] = { up:0, down:0, voters:{}, ipVoters:{} };
      if (existing) {
        if (existing === 1) apVotes[itemId].up = Math.max(0, (apVotes[itemId].up||0) - 1);
        else apVotes[itemId].down = Math.max(0, (apVotes[itemId].down||0) - 1);
      }
      if (vote === 1) apVotes[itemId].up = (apVotes[itemId].up||0) + 1;
      else apVotes[itemId].down = (apVotes[itemId].down||0) + 1;
      apVotes[itemId].voters[userEmail] = vote;
      apIpVotes[itemId] = vote;
    }
    document.getElementById(`ap-vote-${itemId}`).innerHTML = buildAPVoteButtons(itemId);
  } catch(e) { notify('Vote failed', 'error'); }
}

async function submitAPComment(itemId) {
  if (!state.currentUser) { notify('Please login to comment', 'error'); return; }
  const input = document.getElementById(`ap-comment-input-${itemId}`);
  const text = input?.value?.trim();
  if (!text) return;
  try {
    const comment = await apiPost(`/action-plans/comments/${itemId}`, {
      userEmail: state.currentUser.email,
      userName: state.currentUser.name || state.currentUser.email,
      text
    });
    if (!apComments[itemId]) apComments[itemId] = [];
    apComments[itemId].push(comment);
    input.value = '';
    document.getElementById(`ap-comments-${itemId}`).innerHTML = buildAPCommentsList(itemId);
    document.getElementById(`ap-comment-count-${itemId}`).textContent = (apComments[itemId]||[]).length;
  } catch(e) { notify('Comment failed', 'error'); }
}

function toggleAPItem(itemId) {
  apExpandedItems[itemId] = !apExpandedItems[itemId];
  const el = document.getElementById(`ap-item-body-${itemId}`);
  const btn = document.getElementById(`ap-toggle-${itemId}`);
  if (el) el.style.display = apExpandedItems[itemId] ? 'block' : 'none';
  if (btn) btn.textContent = apExpandedItems[itemId] ? '▲ Collapse' : '▼ Comments & Details';
}

function changeCalMonth(dir) {
  calMonth += dir;
  if (calMonth > 12) { calMonth = 1; calYear++; }
  if (calMonth < 1) { calMonth = 12; calYear--; }
  const calEl = document.getElementById('ap-calendar');
  if (calEl) calEl.innerHTML = buildAPCalendar();
}

// ===== HELPERS =====
function buildAPVoteButtons(itemId) {
  const v = apVotes[itemId] || { up:0, down:0, voters:{} };
  const userVote = state.currentUser ? (v.voters?.[state.currentUser.email] || 0) : 0;
  // IP is blocked if another user on the same IP already voted
  const ipVote = apIpVotes[itemId];
  const ipBlocked = (ipVote !== undefined) && !userVote;
  const title = ipBlocked ? 'title="Your network already voted on this item"' : '';
  return `
    <button class="ap-vote-btn ${userVote===1?'active-up':''} ${ipBlocked?'ip-blocked':''}"
      onclick="voteAPItem(${itemId},1)" ${title} ${ipBlocked?'disabled':''}>
      ▲ <span>${v.up||0}</span>
    </button>
    <button class="ap-vote-btn down ${userVote===-1?'active-down':''} ${ipBlocked?'ip-blocked':''}"
      onclick="voteAPItem(${itemId},-1)" ${title} ${ipBlocked?'disabled':''}>
      ▼ <span>${v.down||0}</span>
    </button>
    ${ipBlocked ? `<span class="ip-blocked-label">🌐 IP voted</span>` : ''}`;
}

function buildAPCommentsList(itemId) {
  const comments = apComments[itemId] || [];
  if (!comments.length) return `<div style="color:var(--text3);font-size:12px;padding:8px 0;">No comments yet.</div>`;
  return comments.map(c => `
    <div class="ap-comment">
      <div class="ap-comment-meta">
        <span class="ap-comment-author">${c.userName || c.userEmail}</span>
        <span class="ap-comment-time">${timeAgo(new Date(c.createdAt).getTime())}</span>
      </div>
      <div class="ap-comment-text">${c.text}</div>
    </div>`).join('');
}

// ===== BUILD CALENDAR =====
function buildAPCalendar() {
  const daysInMonth = getBSDaysInMonth(calYear, calMonth);
  const firstWeekday = getFirstWeekdayOfBSMonth(calYear, calMonth);
  const today = new Date();
  const todayBS = adToBS(today);

  // Build a map: AD date string → items
  const itemsByAD = {};
  AP_ITEMS.forEach(item => {
    if (item.targetDate) itemsByAD[item.targetDate] = itemsByAD[item.targetDate] || [];
    if (item.targetDate) itemsByAD[item.targetDate].push(item);
  });

  // Build cells
  let cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const weekDaysNe = ['आइ','सोम','मङ्','बुध','बिहि','शुक्र','शनि'];

  const rows = [];
  for (let r = 0; r < cells.length / 7; r++) {
    const rowCells = cells.slice(r*7, r*7+7);
    rows.push(rowCells);
  }

  return `
  <div class="ap-cal-header">
    <button class="ap-cal-nav" onclick="changeCalMonth(-1)">‹</button>
    <div>
      <div class="ap-cal-title-ne">${BS_MONTH_NAMES[calMonth]} ${toNepaliDigits(calYear)}</div>
      <div class="ap-cal-title-en">${BS_MONTH_NAMES_EN[calMonth]} ${calYear} BS</div>
    </div>
    <button class="ap-cal-nav" onclick="changeCalMonth(1)">›</button>
  </div>
  <table class="ap-cal-table">
    <thead>
      <tr>${weekDays.map((d,i) => `<th><span class="cal-day-ne">${weekDaysNe[i]}</span><span class="cal-day-en">${d}</span></th>`).join('')}</tr>
    </thead>
    <tbody>
      ${rows.map(row => `<tr>${row.map(bsDay => {
        if (!bsDay) return '<td class="cal-empty"></td>';
        const adDate = getADDateForBSDay(calYear, calMonth, bsDay);
        const adStr = adDate.toISOString().slice(0,10);
        const items = itemsByAD[adStr] || [];
        const isToday = todayBS.year===calYear && todayBS.month===calMonth && todayBS.day===bsDay;
        const hasCompleted = items.some(i => i.status==='completed');
        const hasActive = items.some(i => i.status==='in-progress');
        const cellColors = [...new Set(items.map(i => i.color))];
        const adDay = adDate.getDate();

        let cellStyle = '';
        let overlayColor = '';
        if (cellColors.length === 1) {
          cellStyle = `background:${cellColors[0]}22;border-color:${cellColors[0]}66;`;
          overlayColor = cellColors[0];
        } else if (cellColors.length > 1) {
          const gradStops = cellColors.map((c,i) => `${c}44 ${Math.floor(i/cellColors.length*100)}%, ${c}44 ${Math.floor((i+1)/cellColors.length*100)}%`).join(', ');
          cellStyle = `background:linear-gradient(135deg,${gradStops});`;
        }

        const itemNames = items.map(i => i.title.slice(0,30)).join('\n');
        const title = items.length ? `title="${itemNames}"` : '';

        return `<td class="cal-day ${isToday?'cal-today':''} ${items.length?'cal-has-items':''}" style="${cellStyle}" ${title}>
          <div class="cal-day-nums">
            <span class="cal-bs-day">${toNepaliDigits(bsDay)}</span>
            <span class="cal-ad-day">${adDay}</span>
          </div>
          ${items.length ? `<div class="cal-item-dots">${items.slice(0,3).map(i=>`<span class="cal-dot" style="background:${i.color}"></span>`).join('')}</div>` : ''}
          ${hasCompleted ? '<div class="cal-tick">✓</div>' : ''}
          ${hasActive && !hasCompleted ? '<div class="cal-active-dot"></div>' : ''}
        </td>`;
      }).join('')}</tr>`).join('')}
    </tbody>
  </table>
  <div class="ap-cal-legend">
    ${AP_CATEGORIES.slice(1).map(c=>`<div class="cal-legend-item"><span class="cal-legend-dot" style="background:${c.color}"></span><span>${c.name}</span></div>`).join('')}
  </div>`;
}

// ===== BUILD CABINET BANNER =====
function buildCabinetBanner() {
  const pm = CABINET_MEMBERS.find(m => m.isPM);
  const ministers = CABINET_MEMBERS.filter(m => !m.isPM);
  return `
  <div class="cabinet-banner">
    <div class="cabinet-bg-text">नेपाल सरकार</div>

    <!-- Government photo -->
    <div class="cabinet-photo-wrap">
      <img src="images/gov.png" alt="Nepal Government Cabinet" class="cabinet-photo"
        onerror="this.style.display='none'">
    </div>

    <!-- Minister name cards row -->
    <div class="cabinet-inner">
      <div class="cabinet-flag">🇳🇵</div>
      <div class="cabinet-members-row">
        <div class="cabinet-pm">
          <div class="cabinet-pm-avatar">${pm.name.charAt(0)}</div>
          <div class="cabinet-pm-info">
            <div class="cabinet-pm-name">${pm.name}</div>
            <div class="cabinet-pm-name-en">${pm.nameEn}</div>
            <div class="cabinet-pm-title">${pm.title}</div>
          </div>
        </div>
        <div class="cabinet-divider"></div>
        <div class="cabinet-ministers">
          ${ministers.map(m => `
            <div class="cabinet-minister">
              <div class="cabinet-minister-avatar">${m.name.charAt(0)}</div>
              <div class="cabinet-minister-name">${m.name}</div>
              <div class="cabinet-minister-title">${m.title}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="cabinet-100days-badge">
      <span class="badge-num">१००</span>
      <span class="badge-text">दिने कार्ययोजना</span>
      <span class="badge-text-en">Day Action Plan</span>
    </div>
  </div>`;
}

// ===== BUILD ACTION PLANS PAGE =====
function buildActionPlansLayout() {
  const completedCount = AP_ITEMS.filter(i => i.status==='completed').length;
  const inProgressCount = AP_ITEMS.filter(i => i.status==='in-progress').length;
  const progressPct = Math.round(completedCount / AP_ITEMS.length * 100);

  const filtered = apFilter === 'All' ? AP_ITEMS : AP_ITEMS.filter(i => i.cat === apFilter);

  return `
  ${buildTopBar()}
  ${buildCabinetBanner()}
  <div class="ap-page">
    <div class="ap-page-header">
      <div class="ap-title-row">
        <div class="ap-title-block">
          <h1 class="ap-title-ne">सरकारको १०० दिने कार्ययोजना</h1>
          <h2 class="ap-title-en">Government 100-Day Action Plan</h2>
        </div>
        <button class="ap-back-btn" onclick="currentPage=state.currentOrg?'feed':'org-select';render()">
          ← ${state.currentOrg ? 'Back to Org' : 'Back'}
        </button>
      </div>
      <div class="ap-stats-row">
        <div class="ap-stat ap-stat-green"><span>${completedCount}</span><label>Completed</label></div>
        <div class="ap-stat ap-stat-blue"><span>${inProgressCount}</span><label>In Progress</label></div>
        <div class="ap-stat ap-stat-gray"><span>${AP_ITEMS.filter(i=>i.status==='pending').length}</span><label>Pending</label></div>
        <div class="ap-stat ap-stat-accent"><span>${progressPct}%</span><label>Done</label></div>
      </div>
      <div class="ap-progress-bar-wrap">
        <div class="ap-progress-bar-track">
          <div class="ap-progress-bar-fill" style="width:${progressPct}%"></div>
        </div>
        <div class="ap-progress-label">${progressPct}% of 100-day goals achieved</div>
      </div>
    </div>

    <div class="ap-body">
      <div class="ap-left">
        <div class="ap-filters">
          ${AP_CATEGORIES.map(c => `
            <button class="ap-filter-btn ${apFilter===c.name?'active':''}"
              style="${apFilter===c.name?`background:${c.color};color:#000;border-color:${c.color}`:''}"
              onclick="apFilter='${c.name}';document.getElementById('ap-items-list').innerHTML=buildAPItemsList()">
              ${c.name}
            </button>`).join('')}
        </div>
        <div id="ap-items-list">
          ${buildAPItemsList()}
        </div>
      </div>

      <div class="ap-right">
        <div class="ap-cal-widget">
          <div class="ap-cal-widget-title">📅 कार्ययोजना पात्रो | Action Calendar</div>
          <div id="ap-calendar">${buildAPCalendar()}</div>
        </div>
        <div class="ap-cal-status-legend">
          <div><span class="cal-tick inline">✓</span> Completed</div>
          <div><span class="cal-active-dot inline"></span> In Progress</div>
        </div>
      </div>
    </div>
  </div>
  ${currentModal ? buildModal() : ''}`;
}

function buildAPItemsList() {
  const filtered = apFilter === 'All' ? AP_ITEMS : AP_ITEMS.filter(i => i.cat === apFilter);
  return filtered.map(item => buildAPItem(item)).join('');
}

function buildAPItem(item) {
  const v = apVotes[item.id] || { up:0, down:0, voters:{} };
  const userVote = state.currentUser ? (v.voters?.[state.currentUser.email] || 0) : 0;
  const commentCount = (apComments[item.id] || []).length;
  const isExpanded = apExpandedItems[item.id];
  const statusIcon = item.status==='completed' ? '✅' : item.status==='in-progress' ? '🔄' : '⏳';
  const statusLabel = item.status==='completed' ? 'Completed' : item.status==='in-progress' ? 'In Progress' : 'Pending';
  const dateStr = item.targetDate ? new Date(item.targetDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '';

  return `
  <div class="ap-item ${item.status}" id="ap-item-${item.id}">
    <div class="ap-item-left">
      <div class="ap-item-num">${item.id}</div>
      <div class="ap-item-color-bar" style="background:${item.color}"></div>
    </div>
    <div class="ap-item-body">
      <div class="ap-item-header" onclick="toggleAPItem(${item.id})" style="cursor:pointer">
        <div class="ap-item-meta">
          <span class="ap-cat-badge" style="background:${item.color}22;color:${item.color};border-color:${item.color}44">${item.cat}</span>
          <span class="ap-status-badge ap-status-${item.status}">${statusIcon} ${statusLabel}</span>
          ${dateStr ? `<span class="ap-date-badge">📅 ${dateStr}</span>` : ''}
        </div>
        <h4 class="ap-item-title">${item.title}</h4>
        <div class="ap-item-title-ne">${item.titleNe}</div>
      </div>
      <div class="ap-item-actions">
        <div class="ap-vote-group" id="ap-vote-${item.id}">
          ${buildAPVoteButtons(item.id)}
        </div>
        <button class="ap-comment-toggle" id="ap-toggle-${item.id}" onclick="toggleAPItem(${item.id})">
          💬 <span id="ap-comment-count-${item.id}">${commentCount}</span> Comments ${isExpanded?'▲':'▼'}
        </button>
      </div>
      <div id="ap-item-body-${item.id}" style="display:${isExpanded?'block':'none'}">
        <div class="ap-comments-section">
          <div id="ap-comments-${item.id}">${buildAPCommentsList(item.id)}</div>
          ${state.currentUser ? `
            <div class="ap-comment-input">
              <input type="text" id="ap-comment-input-${item.id}"
                placeholder="Add a comment..."
                onkeydown="if(event.key==='Enter')submitAPComment(${item.id})">
              <button onclick="submitAPComment(${item.id})">Post</button>
            </div>` : `<div class="ap-login-prompt">Login to vote and comment</div>`}
        </div>
      </div>
    </div>
  </div>`;
}
