import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const categoryTranslations = {
  fr: {
    all: 'Toutes les catégories',
    vegetables: 'Légumes',
    fruits: 'Fruits',
    grains: 'Céréales & Légumineuses',
    livestock: 'Bétail & Volaille',
    dairy: 'Produits Laitiers',
    equipment: 'Matériel Agricole',
    fertilizers: 'Engrais & Phyto',
    olives: 'Olives & Huile',
    honey: 'Miel & Apiculture',
    nursery: 'Pépinière & Plants',
    grapes: 'Viticulture',
    citrus: 'Agrumes'
  },
  ar: {
    all: 'جميع الفئات',
    vegetables: 'خضروات',
    fruits: 'فواكه',
    grains: 'حبوب وبقوليات',
    livestock: 'مواشي ودواجن',
    dairy: 'ألبان وأجبان',
    equipment: 'معدات زراعية',
    fertilizers: 'أسمدة ومبيدات',
    olives: 'زيتون وزيت زيتون',
    honey: 'عسل ونحل',
    nursery: 'شجيرات وشتلات',
    grapes: 'كروم العنب',
    citrus: 'حمضيات'
  }
};

export const wilayaTranslations = {
  'All Wilayas': { fr: 'Toutes les wilayas', ar: 'جميع الولايات' },
  'Adrar': { fr: 'Adrar', ar: 'أدرار' },
  'Chlef': { fr: 'Chlef', ar: 'الشلف' },
  'Laghouat': { fr: 'Laghouat', ar: 'الأغواط' },
  'Oum El Bouaghi': { fr: 'Oum El Bouaghi', ar: 'أم البواقي' },
  'Batna': { fr: 'Batna', ar: 'باتنة' },
  'Béjaïa': { fr: 'Béjaïa', ar: 'بجاية' },
  'Bejaia': { fr: 'Béjaïa', ar: 'بجاية' },
  'Biskra': { fr: 'Biskra', ar: 'بسكرة' },
  'Béchar': { fr: 'Béchar', ar: 'بشار' },
  'Bechar': { fr: 'Béchar', ar: 'بشار' },
  'Blida': { fr: 'Blida', ar: 'البليدة' },
  'Bouira': { fr: 'Bouira', ar: 'البويرة' },
  'Tamanrasset': { fr: 'Tamanrasset', ar: 'تمنراست' },
  'Tébessa': { fr: 'Tébessa', ar: 'تبسة' },
  'Tebessa': { fr: 'Tébessa', ar: 'تبسة' },
  'Tlemcen': { fr: 'Tlemcen', ar: 'تلمسان' },
  'Tiaret': { fr: 'Tiaret', ar: 'تيارت' },
  'Tizi Ouzou': { fr: 'Tizi Ouzou', ar: 'تيزي وزو' },
  'Algiers': { fr: 'Alger', ar: 'الجزائر العاصمة' },
  'Djelfa': { fr: 'Djelfa', ar: 'الجلفة' },
  'Jijel': { fr: 'Jijel', ar: 'جيجل' },
  'Sétif': { fr: 'Sétif', ar: 'سطيف' },
  'Setif': { fr: 'Sétif', ar: 'سطيف' },
  'Saïda': { fr: 'Saïda', ar: 'سعيدة' },
  'Skikda': { fr: 'Skikda', ar: 'سكيكدة' },
  'Sidi Bel Abbès': { fr: 'Sidi Bel Abbès', ar: 'سيدي بلعباس' },
  'Annaba': { fr: 'Annaba', ar: 'عنابة' },
  'Guelma': { fr: 'Guelma', ar: 'قالمة' },
  'Constantine': { fr: 'Constantine', ar: 'قسنطينة' },
  'Médéa': { fr: 'Médéa', ar: 'المدية' },
  'Medea': { fr: 'Médéa', ar: 'المدية' },
  'Mostaganem': { fr: 'Mostaganem', ar: 'مستغانم' },
  "M'Sila": { fr: "M'Sila", ar: 'المسيلة' },
  'Mascara': { fr: 'Mascara', ar: 'معسكر' },
  'Ouargla': { fr: 'Ouargla', ar: 'ورقلة' },
  'Oran': { fr: 'Oran', ar: 'وهران' },
  'El Bayadh': { fr: 'El Bayadh', ar: 'البيض' },
  'Illizi': { fr: 'Illizi', ar: 'إليزي' },
  'Bordj Bou Arréridj': { fr: 'Bordj Bou Arréridj', ar: 'برج بوعريريج' },
  'Boumerdès': { fr: 'Boumerdès', ar: 'بومرداس' },
  'El Tarf': { fr: 'El Tarf', ar: 'الطارف' },
  'Tindouf': { fr: 'Tindouf', ar: 'تندوف' },
  'Tissemsilt': { fr: 'Tissemsilt', ar: 'تيسمسيلت' },
  'El Oued': { fr: 'El Oued', ar: 'الوادي' },
  'Khenchela': { fr: 'Khenchela', ar: 'خنشلة' },
  'Souk Ahras': { fr: 'Souk Ahras', ar: 'سوق أهراس' },
  'Tipaza': { fr: 'Tipaza', ar: 'تيبازة' },
  'Mila': { fr: 'Mila', ar: 'ميلة' },
  'Aïn Defla': { fr: 'Aïn Defla', ar: 'عين الدفلى' },
  'Naâma': { fr: 'Naâma', ar: 'النعامة' },
  'Aïn Témouchent': { fr: 'Aïn Témouchent', ar: 'عين تموشنت' },
  'Ghardaïa': { fr: 'Ghardaïa', ar: 'غرداية' },
  'Relizane': { fr: 'Relizane', ar: 'غليزان' },
  'Timimoun': { fr: 'Timimoun', ar: 'تيميمون' },
  'Bordj Badji Mokhtar': { fr: 'Bordj Badji Mokhtar', ar: 'برج باجي مختار' },
  'Ouled Djellal': { fr: 'Ouled Djellal', ar: 'أولاد جلال' },
  'Béni Abbès': { fr: 'Béni Abbès', ar: 'بني عباس' },
  'In Salah': { fr: 'In Salah', ar: 'عين صالح' },
  'In Guezzam': { fr: 'In Guezzam', ar: 'عين قزام' },
  'Touggourt': { fr: 'Touggourt', ar: 'تقرت' },
  'Djanet': { fr: 'Djanet', ar: 'جانت' },
  "El M'Ghair": { fr: "El M'Ghair", ar: 'المغير' },
  'El Meniaa': { fr: 'El Meniaa', ar: 'المنيعة' },
  'Aflou': { fr: 'Aflou', ar: 'أفلو' },
  'Barika': { fr: 'Barika', ar: 'بريكة' },
  'El Kantara': { fr: 'El Kantara', ar: 'القنطرة' },
  'Bir El Ater': { fr: 'Bir El Ater', ar: 'بئر العاتر' },
  'El Aricha': { fr: 'El Aricha', ar: 'العريشة' },
  'Ksar Chellala': { fr: 'Ksar Chellala', ar: 'قصر الشلالة' },
  'Aïn Oussera': { fr: 'Aïn Oussera', ar: 'عين وسارة' },
  'Messaad': { fr: 'Messaad', ar: 'مسعد' },
  'Ksar El Boukhari': { fr: 'Ksar El Boukhari', ar: 'قصر البخاري' },
  'Bou Saâda': { fr: 'Bou Saâda', ar: 'بوسعادة' },
  'El Abiodh Sidi Cheikh': { fr: 'El Abiodh Sidi Cheikh', ar: 'الابيض سيدي الشيخ' }
};

export const sellerTypeTranslations = {
  'Pépinièriste': { fr: 'Pépinièriste', ar: 'صاحب مشتلة' },
  'Céréaliculture': { fr: 'Céréaliculture', ar: 'مزارع حبوب' },
  'Apiculteur': { fr: 'Apiculteur', ar: 'مربي نحل' },
  'Aviculteur': { fr: 'Aviculteur', ar: 'مربي دواجن' },
  'Éleveur de bétail': { fr: 'Éleveur de bétail', ar: 'مربي مواشي' },
  'Fellah': { fr: 'Fellah', ar: 'فلاح' },
  'Oléiculteur': { fr: 'Oléiculteur', ar: 'منتج زيتون' },
  'Agriculteur': { fr: 'Agriculteur', ar: 'فلاح' },
  'Maraîcher': { fr: 'Maraîcher', ar: 'مزارع خضار' },
  'Élevage de bovins': { fr: 'Élevage de bovins', ar: 'مربي أبقار' },
  'Agrumiculteur': { fr: 'Agrumiculteur', ar: 'منتج حمضيات' },
  'Arboriculteur': { fr: 'Arboriculteur', ar: 'زراعة أشجار مثمرة' },
  'Producteur de lait': { fr: 'Producteur de lait', ar: 'منتج حليب' },
  'Viticulteur': { fr: 'Viticulteur', ar: 'منتج عنب' },
  'Élevage de volailles': { fr: 'Élevage de volailles', ar: 'مربي طيور' },
  "Éleveur d'ovins": { fr: "Éleveur d'ovins", ar: 'مربي أغنام' },
  'Engraisseur de bovins': { fr: 'Engraisseur de bovins', ar: 'تسمين عجول' }
};

export const productTitleTranslations = {
  'Plants de Tomates — Pépinière Certifiée': { fr: 'Plants de Tomates — Pépinière Certifiée', ar: 'شتلات طماطم — مشتلة معتمدة' },
  'Blé Dur Semences Sélectionnées — Variété Waha': { fr: 'Blé Dur Semences Sélectionnées — Variété Waha', ar: 'بذور قمح صلب مختارة — صنف الواحة' },
  'Miel de Thym Sauvage — Pur Kabylie': { fr: 'Miel de Thym Sauvage — Pur Kabylie', ar: 'عسل زعتر بري — خالص منطقة القبائل' },
  'Poulets de Chair Fermiers — Prêts à Vendre': { fr: 'Poulets de Chair Fermiers — Prêts à Vendre', ar: 'دجاج لحم بلدي — جاهز للبيع' },
  "Moutons Ouled Djellal — Prêts à l'Abattage": { fr: "Moutons Ouled Djellal — Prêts à l'Abattage", ar: 'أغنام أولاد جلال — جاهزة للذبح' },
  'Pommes de Terre Locales — Récolte Fraîche': { fr: 'Pommes de Terre Locales — Récolte Fraîche', ar: 'بطاطس محلية — محصول طازج' },
  "Huile d'Olive Extra Vierge — Première Pression": { fr: "Huile d'Olive Extra Vierge — Première Pression", ar: 'زيت زيتون بكر ممتاز — العصرة الأولى' },
  'Lentilles Vertes Locales — Récolte 2025': { fr: 'Lentilles Vertes Locales — Récolte 2025', ar: 'عدس أخضر محلي — محصول 2025' },
  'Olives de Table Sigoise — Conserve Maison': { fr: 'Olives de Table Sigoise — Conserve Maison', ar: 'زيتون مائدة سيق — تحضير منزلي' },
  'Œufs Biologiques Plein Air — Plateau 30': { fr: 'Œufs Biologiques Plein Air — Plateau 30', ar: 'بيض عضوي بلدي — طبق 30 بيضة' },
  'Tomates Cerises Sous Serre — Grappe': { fr: 'Tomates Cerises Sous Serre — Grappe', ar: 'طماطم كرزية تحت الدفيئة — عناقيد' },
  'Lait de Vache Frais — Livraison Quotidienne': { fr: 'Lait de Vache Frais — Livraison Quotidienne', ar: 'حليب بقر طازج — توصيل يومي' },
  'Oranges Navel — Calibre Export': { fr: 'Oranges Navel — Calibre Export', ar: 'برتقال نافيل — صنف تصدير' },
  'Pommes Golden — Verger de Montagne': { fr: 'Pommes Golden — Verger de Montagne', ar: 'تفاح غولدن — بساتين جبلية' },
  'Fromage Frais Artisanal — Recette Kabyle': { fr: 'Fromage Frais Artisanal — Recette Kabyle', ar: 'جبن طازج تقليدي — وصفة منطقة القبائل' },
  'Raisins de Table — Muscat de Hambourg': { fr: 'Raisins de Table — Muscat de Hambourg', ar: 'عنب مائدة — مسكات هامبورغ' },
  'Dindes Fermières — Poids 6 à 8 kg': { fr: 'Dindes Fermières — Poids 6 à 8 kg', ar: 'ديوك رومية بلدية — وزن 6 إلى 8 كغ' },
  'Agneaux de Race Hamra — Aurès': { fr: 'Agneaux de Race Hamra — Aurès', ar: 'خراف سلالة الحمراء — الأوراس' },
  "Taureaux Engraissés — Prêts à l'Abattage": { fr: "Taureaux Engraissés — Prêts à l'Abattage", ar: 'ثيران مسمنة — جاهزة للذبح' }
};

export const productDescTranslations = {
  "Plants de tomates greffés prêts à la mise en place. Variétés : Zahra, Marmande et hybride F1. Élevés sous serre, racinaires robustes. Livraison possible sur toute la Mitidja.": {
    fr: "Plants de tomates greffés prêts à la mise en place. Variétés : Zahra, Marmande et hybride F1. Élevés sous serre, racinaires robustes. Livraison possible sur toute la Mitidja.",
    ar: "شتلات طماطم مطعمة جاهزة للغرس. الأصناف: زهرة، مارماند، والهجين F1. نشأت في دفيئة بلاستيكية، مجموع جذري قوي. التوصيل متوفر في جميع أنحاء المتيجة."
  },
  "Semences de blé dur variété Waha. Taux de germination supérieur à 95 %. Stockage en silo climatisé. Idéal pour les hautes plaines occidentales.": {
    fr: "Semences de blé dur variété Waha. Taux de germination supérieur à 95 %. Stockage en silo climatisé. Idéal pour les hautes plaines occidentales.",
    ar: "بذور قمح صلب صنف الواحة. نسبة إنبات تفوق 95%. تخزين في صوامع مكيفة. مثالي للهضاب العليا الغربية."
  },
  "Miel de thym 100 % naturel, récolté en altitude dans les montagnes de Kabylie. Couleur ambrée, arôme intense. Pots de 500 g et 1 kg disponibles.": {
    fr: "Miel de thym 100 % naturel, récolté en altitude dans les montagnes de Kabylie. Couleur ambrée, arôme intense. Pots de 500 g et 1 kg disponibles.",
    ar: "عسل زعتر بري طبيعي 100٪، تم جنيه على ارتفاعات عالية في جبال جرجرة بمنطقة القبائل. لون عسلي، نكهة قوية. متوفر في علب 500 غ و 1 كغ."
  },
  "Poulets de chair élevés en semi-liberté, nourris au maïs et son de blé sans antibiotiques. Poids moyen 2,3 kg. Lot minimum 50 têtes.": {
    fr: "Poulets de chair élevés en semi-liberté, nourris au maïs et son de blé sans antibiotiques. Poids moyen 2,3 kg. Lot minimum 50 têtes.",
    ar: "دجاج لحم مربى في شبه حرية، يتغذى على الذرة ونخالة القمح بدون مضادات حيوية. متوسط الوزن 2.3 كغ. الحد الأدنى للطلب 50 رأس."
  },
  "Béliers et brebis de race Ouled Djellal élevés sur parcours naturels des steppes de Djelfa. Poids entre 45 et 65 kg. Vaccinés et contrôlés vétérinairement.": {
    fr: "Béliers et brebis de race Ouled Djellal élevés sur parcours naturels des steppes de Djelfa. Poids entre 45 et 65 kg. Vaccinés et contrôlés vétérinairement.",
    ar: "كباش ونعاج من سلالة أولاد جلال، تربية طبيعية في سهوب الجلفة. الوزن بين 45 و 65 كغ. ملقحة ومراقبة بيطرياً."
  },
  "Pommes de terre variété Spunta cultivées à Médéa. Calibre moyen-grand. Conditionnement en sacs de 25 et 50 kg. Prix départ champ.": {
    fr: "Pommes de terre variété Spunta cultivées à Médéa. Calibre moyen-grand. Conditionnement en sacs de 25 et 50 kg. Prix départ champ.",
    ar: "بطاطس صنف سبونتا منتجة في المدية. حجم متوسط إلى كبير. معبأة في أكياس 25 و 50 كغ. السعر مباشرة من الحقل."
  },
  "Huile d'olive extra vierge issue d'oliviers centenaires de Grande Kabylie. Pression à froid traditionnelle. Acidité inférieure à 0,4 %. Bidons de 5 L et 10 L.": {
    fr: "Huile d'olive extra vierge issue d'oliviers centenaires de Grande Kabylie. Pression à froid traditionnelle. Acidité inférieure à 0,4 %. Bidons de 5 L et 10 L.",
    ar: "زيت زيتون بكر ممتاز مستخلص من أشجار زيتون معمرة في منطقة القبائل الكبرى. عصر بارد تقليدي. نسبة الحموضة أقل من 0.4٪. متوفر في صفائح 5 لتر و 10 لتر."
  },
  "Lentilles vertes cultivées sans intrants chimiques. Riches en protéines végétales. Cuisson rapide. Conditionnées en sacs de 5 kg.": {
    fr: "Lentilles vertes cultivées sans intrants chimiques. Riches en protéines végétales. Cuisson rapide. Conditionnées en sacs de 5 kg.",
    ar: "عدس أخضر يزرع بدون أسمدة كيميائية. غني بالبروتينات النباتية. سريع الطهي. معبأ في أكياس 5 كغ."
  },
  "Olives Sigoise préparées en saumure traditionnelle avec herbes aromatiques. Calibre XXL, charnues et savoureuses. Bocaux de 1 kg.": {
    fr: "Olives Sigoise préparées en saumure traditionnelle avec herbes aromatiques. Calibre XXL, charnues et savoureuses. Bocaux de 1 kg.",
    ar: "زيتون سيق محضر في محلول ملحي تقليدي مع الأعشاب العطرية. حجم ضخم، لحيم ولذيذ. برطمانات 1 كغ."
  },
  "Œufs de poules élevées en plein air à Bouira. Alimentation 100 % naturelle, sans OGM ni antibiotiques. Jaune orangé intense. Ramassage quotidien.": {
    fr: "Œufs de poules élevées en plein air à Bouira. Alimentation 100 % naturelle, sans OGM ni antibiotiques. Jaune orangé intense. Ramassage quotidien.",
    ar: "بيض دجاج بري تم جمعه في البويرة. تغذية طبيعية 100٪، خالية من المواد المعدلة وراثياً والمضادات الحيوية. صفار برتقالي مكثف. جمع يومي."
  },
  "Tomates cerises en grappe cultivées sous serre à Tipaza. Sucrées et juteuses, idéales pour la restauration et les marchés premium. Récolte tri-hebdomadaire.": {
    fr: "Tomates cerises en grappe cultivées sous serre à Tipaza. Sucrées et juteuses, idéales pour la restauration et les marchés premium. Récolte tri-hebdomadaire.",
    ar: "طماطم كرزية عناقيد منتجة في دفيئة بلاستيكية بتيبازة. حلوة وعصارية، مثالية للمطاعم والأسواق الراقية. الجني ثلاث مرات في الأسبوع."
  },
  "Lait entier frais de vaches Holstein et Montbéliarde de la Mitidja. Traite matin et soir. Livraison à domicile ou enlèvement à la ferme.": {
    fr: "Lait entier frais de vaches Holstein et Montbéliarde de la Mitidja. Traite matin et soir. Livraison à domicile ou enlèvement à la ferme.",
    ar: "حليب بقري كامل طازج من أبقار هولشتاين ومونبيليارد في المتيجة. حلب صباحي ومسائي. التوصيل للمنازل أو الاستلام من المزرعة."
  },
  "Oranges Navel de la vallée du Chélif. Sans pépins, sucrées et juteuses. Calibre 5-6, idéal pour l'export et la grande distribution. Caisses de 15 kg.": {
    fr: "Oranges Navel de la vallée du Chélif. Sans pépins, sucrées et juteuses. Calibre 5-6, idéal pour l'export et la grande distribution. Caisses de 15 kg.",
    ar: "برتقال نافيل من وادي الشلف. بدون بذور، حلو وعصاري. حجم 5-6، ممتاز للتصدير والمساحات الكبرى. صناديق 15 كغ."
  },
  "Pommes Golden et Starkrimson cultivées en altitude dans l'Atlas blidéen. Croquantes, sucrées et parfumées. Calibre AA. Caisses bois de 18 kg.": {
    fr: "Pommes Golden et Starkrimson cultivées en altitude dans l'Atlas blidéen. Croquantes, sucrées et parfumées. Calibre AA. Caisses bois de 18 kg.",
    ar: "تفاح غولدن وستاركريمسون منتج في مرتفعات الأطلس البليدي. مقرمش، حلو وعطر. حجم ممتاز AA. صناديق خشبية 18 كغ."
  },
  "Fromage frais fabriqué artisanalement à partir du lait entier de vaches des hauts plateaux. Texture crémeuse, légèrement salé. Production hebdomadaire limitée.": {
    fr: "Fromage frais fabriqué artisanalement à partir du lait entier de vaches des hauts plateaux. Texture crémeuse, légèrement salé. Production hebdomadaire limitée.",
    ar: "جبن طازج محضر يدوياً من حليب كامل الدسم لأبقار الهضاب العليا. قوام كريمي، مالح قليلاً. إنتاج أسبوعي محدود."
  },
  "Raisins Muscat de Hambourg. Grains noirs, charnus et sucrés avec un arôme musqué prononcé. Irrigation goutte-à-goutte. Livraison possible à Oran et Alger.": {
    fr: "Raisins Muscat de Hambourg. Grains noirs, charnus et sucrés avec un arôme musqué prononcé. Irrigation goutte-à-goutte. Livraison possible à Oran et Alger.",
    ar: "عنب مسكات هامبورغ. حبات سوداء، لحيمة وحلوة المذاق بنكهة المسك الفواحة. سقي بالتنقيط. إمكانية التوصيل لوهران والجزائر العاصمة."
  },
  "Dindes fermières élevées en semi-liberté à Annaba. Alimentation maïs et fourrage. Poids vif 6 à 8 kg. Idéales pour fêtes et restaurants.": {
    fr: "Dindes fermières élevées en semi-liberté à Annaba. Alimentation maïs et fourrage. Poids vif 6 à 8 kg. Idéales pour fêtes et restaurants.",
    ar: "ديوك رومية بلدية تربية نصف حرة في عنابة. تتغذى على الذرة والكلأ. الوزن الحي 6 إلى 8 كغ. ممتازة للمناسبات والمطاعم."
  },
  "Agneaux de race Hamra des Aurès. Élevage extensif sur parcours naturels. Poids entre 35 et 50 kg. Tous vaccinés et contrôlés. Livraison sur Batna et environs.": {
    fr: "Agneaux de race Hamra des Aurès. Élevage extensif sur parcours naturels. Poids entre 35 et 50 kg. Tous vaccinés et contrôlés. Livraison sur Batna et environs.",
    ar: "خراف سلالة الحمراء من الأوراس. تربية رعوية على مساحات طبيعية. الوزن بين 35 و 50 كغ. ملقحة ومراقبة. التوصيل في باتنة وضواحيها."
  },
  "Taureaux croisés (Charolais × local) engraissés au maïs ensilage et orge pendant 6 mois. Poids vif moyen 450–500 kg. Documents sanitaires complets.": {
    fr: "Taureaux croisés (Charolais × local) engraissés au maïs ensilage et orge pendant 6 mois. Poids vif moyen 450–500 kg. Documents sanitaires complets.",
    ar: "ثيران مهجنة (شاروليه × سلالة محلية) مسمنة بسيلاج الذرة والشعير لمدة 6 أشهر. متوسط الوزن الحي 450-500 كغ. الملف الصحي كامل."
  }
};

const translations = {
  fr: {
    common: {
      wilaya: "Wilaya",
      category: "Catégorie",
      searchPlaceholder: "Rechercher un produit...",
      results: "résultats",
      result: "résultat",
      cancel: "Annuler",
      close: "Fermer",
      save: "Enregistrer",
      retry: "Réessayer",
      back: "Retour",
      loading: "Chargement...",
      unauthorized: "Non autorisé",
      allWilayas: "Toutes les wilayas",
      allCategories: "Toutes les catégories",
      verifiedSeller: "Vendeur vérifié",
      viewDetails: "Voir les détails",
      home: "Accueil",
      products: "Produits",
      connectionLost: "Connexion perdue",
      offlineMode: "Mode hors ligne",
      offlineDesc: "Vérifiez votre connexion internet. fella7com se rechargera automatiquement quand vous serez de nouveau en ligne.",
      sponsored: "Annonce sponsorisée"
    },
    navbar: {
      deals: "Offres",
      newArrivals: "Nouveautés",
      logIn: "Se connecter",
      signUp: "S'inscrire",
      postItem: "Publier",
      logout: "Déconnexion",
      limits: "limites",
      limitAlert: "Action réussie ! Compteur : "
    },
    home: {
      heroTitle: "Le marché agricole <span class=\"text-primary\">algérien</span>",
      heroSubtitle: "Achetez et vendez fruits, légumes, céréales et matériel agricole directement entre producteurs et acheteurs à travers les 58 wilayas.",
      latestListings: "Dernières annonces",
      listingsSubtitle: "Produits frais du champ à votre table.",
      noProductsFound: "Aucun produit trouvé",
      emptyFiltersDesc: "Essayez de modifier vos filtres de wilaya ou catégorie.",
      seeAllProducts: "Voir tous les produits →"
    },
    products: {
      allProducts: "Tous les produits",
      availableListings: "annonces disponibles",
      availableListing: "annonce disponible",
      searchPlaceholder: "Rechercher...",
      sortNewest: "Plus récents",
      sortOldest: "Plus anciens"
    },
    newArrivals: {
      title: "Nouveautés",
      subtitle: "Les derniers produits ajoutés sur la plateforme."
    },
    listingDetail: {
      postedOn: "Publié le",
      quantityAvailable: "Disponible",
      price: "Prix",
      location: "Localisation",
      sellerInfo: "Informations du vendeur",
      experience: "expérience",
      years: "ans exp.",
      landSize: "Superficie",
      hectares: "ha",
      contactSeller: "Contacter le vendeur",
      call: "Appeler",
      sendMessage: "Envoyer un message",
      mapTitle: "Carte",
      mapComingSoon: "Carte bientôt disponible",
      verifiedProfile: "Profil vérifié",
      unresolvedProduct: "Produit introuvable",
      unresolvedDesc: "Ce produit n'existe plus ou l'URL est incorrecte.",
      returnHome: "Retour à l'accueil",
      callActionAlert: "Contact du vendeur en cours... Action enregistrée ! (Actions utilisées: ",
      description: "Description",
      noDescription: "Aucune description fournie.",
      breadcrumbHome: "Accueil",
      breadcrumbProducts: "Produits"
    },
    createListing: {
      createTitle: "Créer une nouvelle annonce",
      createSubtitle: "Remplissez les détails de votre produit agricole.",
      productTitle: "Titre du produit",
      productTitlePlaceholder: "ex. Tomates rouges biologiques",
      categoryLabel: "Catégorie",
      wilayaLabel: "Wilaya",
      priceLabel: "Prix (DZD)",
      pricePlaceholder: "Prix",
      unitLabel: "Unité de vente",
      unitKg: "Par kg",
      unitPiece: "Par pièce",
      unitQuintal: "Par quintal",
      unitTonne: "Par tonne",
      unitTotal: "Total",
      quantityLabel: "Quantité disponible",
      quantityPlaceholder: "ex. 500 kg",
      descLabel: "Description détaillée",
      descPlaceholder: "Décrivez la qualité de votre produit, la date de récolte, les options de livraison...",
      photoPreviewLabel: "Aperçu photo (sélectionnée automatiquement selon la catégorie)",
      photoPreviewSubtitle: "Photo de catalogue haute qualité associée automatiquement !",
      btnCancel: "Annuler",
      btnPublish: "Publier l'annonce (Action: 1)",
      unauthorizedTitle: "Non autorisé",
      unauthorizedDesc: "Vous devez être vendeur ou agri-business pour publier des annonces.",
      btnReturnHome: "Retour à l'accueil"
    },
    login: {
      welcomeBack: "Bon retour !",
      signInSubtitle: "Connectez-vous à votre compte fella7com",
      emailLabel: "Adresse email",
      emailPlaceholder: "ex. buyer@gmail.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      rememberMe: "Se souvenir de moi",
      forgotPassword: "Mot de passe oublié ?",
      btnLogIn: "Se connecter",
      demoAccountsTitle: "Comptes de test :",
      cancelReturn: "Annuler et retourner à l'accueil",
      errorInvalid: "Email ou mot de passe invalide. Veuillez réessayer."
    },
    register: {
      joinTitle: "Rejoignez fella7com",
      joinSubtitle: "Créez votre compte pour commencer à vendre ou acheter",
      roleFarmer: "Agriculteur / Producteur",
      roleBuyer: "Acheteur",
      roleBusiness: "Agri-Business",
      fullNameLabel: "Nom complet",
      fullNamePlaceholder: "ex. Ahmed Yassine",
      emailLabel: "Adresse email",
      emailPlaceholder: "ex. ahmed@example.com",
      avatarLabel: "Photo de profil (URL)",
      avatarPlaceholder: "https://...",
      avatarHelp: "Collez un lien image. Un avatar par défaut est pré-rempli.",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Créer un mot de passe",
      companyLabel: "Nom de l'entreprise",
      companyPlaceholder: "ex. Sarl Agro Équipement",
      wilayaLabel: "Wilaya",
      selectWilaya: "Sélectionner la wilaya",
      privacyCheckbox: "J'accepte la ",
      privacyLinkText: "charte de confidentialité",
      privacyError: "Vous devez accepter la charte de confidentialité pour continuer.",
      btnCreateAccount: "Créer un compte",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      btnLogIn: "Se connecter"
    },
    profile: {
      title: "Paramètres du profil",
      subtitle: "Gérez votre identité et vos annonces.",
      picLabel: "URL de la photo de profil",
      picHelp: "Étant donné que ceci est un prototype, veuillez coller un lien image valide.",
      btnUpdate: "Mettre à jour la photo",
      myListings: "Vos annonces publiées",
      noListings: "Vous n'avez publié aucun produit.",
      btnPostFirst: "Publiez votre premier produit",
      alertSuccess: "Photo de profil mise à jour avec succès !"
    },
    premium: {
      title: "Limite atteinte",
      subtitle: "Vous avez utilisé vos 3 actions gratuites. Passez à Premium pour un accès illimité !",
      freeTitle: "Gratuit",
      freePrice: "0 DZD",
      freeUnit: "/ mois",
      freeF1: "Voir tous les produits",
      freeF2: "Publier/Acheter jusqu'à 3 articles",
      freeF3: "Support basique",
      freeBtn: "Plan actuel",
      ribbon: "LE PLUS POPULAIRE",
      premTitle: "Premium",
      premPrice: "1 500 DZD",
      premUnit: "/ mois",
      premF1: "Publications et achats illimités",
      premF2: "Placement prioritaire dans la recherche",
      premF3: "Analyses avancées",
      premF4: "Support Premium 24/7",
      premBtn: "Passer à Premium (Démo)",
      alertSuccess: "Paiement réussi ! Vous êtes maintenant membre Premium avec un accès illimité."
    },
    pwa: {
      offlineAlert: "Vous naviguez actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.",
      onlineToastTitle: "Connexion rétablie",
      onlineToastDesc: "Vous êtes de nouveau en ligne. Les pages se mettront à jour automatiquement.",
      readyToastTitle: "Prêt pour une utilisation hors ligne",
      readyToastDesc: "fella7com est en cache et prêt à fonctionner hors ligne.",
      updateToastTitle: "Mise à jour disponible",
      updateToastDesc: "Une nouvelle version de l'application est prête. Rechargez pour mettre à jour.",
      updateBtn: "Recharger",
      installTitle: "Installer fella7com",
      installDesc: "Ajoutez à votre écran d'accueil pour un accès plein écran hors ligne et de meilleures performances.",
      installBtn: "Installer",
      dismissBtn: "Ignorer"
    },
    chat: {
      panelTitle: "Messages",
      noConversations: "Aucune conversation",
      noConversationsDesc: "Contactez un vendeur depuis une annonce pour démarrer une conversation.",
      online: "En ligne",
      inputPlaceholder: "Écrire un message...",
      securePayment: "Paiement sécurisé",
      totalToPay: "Total à payer",
      cardNumber: "Numéro de carte",
      cardName: "Nom sur la carte",
      expiration: "Expiration",
      btnPay: "Payer",
      secureDisclaimer: "🔒 Vos informations sont protégées par un cryptage de niveau bancaire.",
      processing: "Traitement en cours...",
      processingDesc: "Veuillez patienter, nous vérifions votre paiement.",
      paymentSuccess: "Paiement réussi ! 🎉",
      paymentSuccessDesc: "Votre commande a été confirmée.",
      orderSummary: "Récapitulatif de commande",
      awaitingPayment: "💳 En attente de paiement",
      paid: "Payé",
      payNow: "💳 Payer maintenant",
      awaitingPaymentDots: "En attente du paiement...",
      paymentConfirmed: "Paiement confirmé",
      unitPrice: "Prix unitaire",
      subtotal: "Sous-total",
      delivery: "🚚 Livraison",
      total: "Total",
      product: "Produit",
      quantity: "Quantité"
    },
    review: {
      header: "Avis & Évaluations",
      reviewCount: "avis",
      noReviews: "Aucun avis pour le moment.",
      firstReviewPrompt: "Soyez le premier à laisser un avis !",
      tabReviews: "Avis",
      tabWrite: "Écrire un avis",
      tabComplaint: "Réclamation",
      loginPrompt: "Connectez-vous pour laisser un avis.",
      alreadyReviewed: "Vous avez déjà laissé un avis sur ce produit.",
      successReview: "Merci pour votre avis !",
      writeReviewHeader: "Laisser un avis",
      yourRatingLabel: "Votre note :",
      reviewPlaceholder: "Partagez votre expérience avec ce produit...",
      submitReviewBtn: "Publier l'avis",
      selectRatingError: "Veuillez sélectionner une note.",
      commentLengthError: "Veuillez écrire un commentaire (au moins 5 caractères).",
      successComplaint: "Votre réclamation a été soumise avec succès. Nous la traiterons dans les plus brefs délais.",
      reportTitle: "Signaler un problème",
      subjectLabel: "Sujet",
      selectSubjectPlaceholder: "Choisir le type de réclamation",
      sub1: "Qualité non conforme",
      sub2: "Quantité incorrecte",
      sub3: "Produit endommagé",
      sub4: "Vendeur non joignable",
      sub5: "Description trompeuse",
      sub6: "Autre",
      detailLabel: "Description détaillée",
      detailPlaceholder: "Décrivez le problème rencontré en détail...",
      subjectError: "Veuillez indiquer le sujet de la réclamation.",
      descError: "Veuillez décrire le problème en détail (au moins 10 caractères).",
      btnSubmitComplaint: "Envoyer la réclamation"
    },
    footer: {
      desc: "La première marketplace agricole d'Algérie. Connectez producteurs, acheteurs et entreprises agricoles à travers les 58 wilayas.",
      colMarketplace: "Marketplace",
      allProducts: "Tous les produits",
      newArrivals: "Nouveautés",
      sellProduct: "Vendre un produit",
      colAccount: "Compte",
      login: "Se connecter",
      signUp: "Créer un compte",
      profile: "Mon profil",
      premium: "Premium",
      colContact: "Contact",
      rights: "© 2026 fella7com. Tous droits réservés."
    }
  },
  ar: {
    common: {
      wilaya: "الولاية",
      category: "الفئة",
      searchPlaceholder: "البحث عن منتجات...",
      results: "نتائج",
      result: "نتيجة",
      cancel: "إلغاء",
      close: "إغلاق",
      save: "حفظ",
      retry: "إعادة الاتصال",
      back: "رجوع",
      loading: "جاري التحميل...",
      unauthorized: "غير مصرح لك بالدخول",
      allWilayas: "كل الولايات",
      allCategories: "كل الفئات",
      verifiedSeller: "بائع موثّق",
      viewDetails: "عرض التفاصيل",
      home: "الرئيسية",
      products: "المنتجات",
      connectionLost: "تم قطع الاتصال",
      offlineMode: "وضع غير متصل بالشبكة",
      offlineDesc: "يرجى التحقق من اتصالك بالإنترنت. سيعاد تحميل فلاح كوم تلقائياً بمجرد عودتك متصلاً.",
      sponsored: "إعلان مموّل"
    },
    navbar: {
      deals: "العروض",
      newArrivals: "جديد",
      logIn: "دخول",
      signUp: "حساب جديد",
      postItem: "أضف إعلاناً",
      logout: "خروج",
      limits: "حدود",
      limitAlert: "تم الإجراء بنجاح! عدد المنتجات: "
    },
    home: {
      heroTitle: "سوق الجزائر <span class=\"text-primary\">الزراعي</span> الرقمي",
      heroSubtitle: "بيع وشراء الخضار والفواكه والحبوب والمعدات الزراعية مباشرة بين الفلاحين والمشترين عبر 58 ولاية.",
      latestListings: "أحدث الإعلانات",
      listingsSubtitle: "منتجات طازجة من الحقل مباشرة إلى مائدتك.",
      noProductsFound: "لم يتم العثور على أي منتج",
      emptyFiltersDesc: "حاول تعديل فلاتر البحث.",
      seeAllProducts: "عرض كل المنتجات ←"
    },
    products: {
      allProducts: "كل المنتجات",
      availableListings: "إعلانات متوفرة",
      availableListing: "إعلان متوفر",
      searchPlaceholder: "بحث...",
      sortNewest: "الأحدث أولاً",
      sortOldest: "الأقدم أولاً"
    },
    newArrivals: {
      title: "أحدث المنتجات",
      subtitle: "آخر المنتجات الزراعية المضافة على المنصة."
    },
    listingDetail: {
      postedOn: "تاريخ النشر",
      quantityAvailable: "الكمية المتوفرة",
      price: "السعر",
      location: "الموقع",
      sellerInfo: "معلومات البائع",
      experience: "الخبرة",
      years: "سنوات خبرة",
      landSize: "مساحة الأرض",
      hectares: "هكتار",
      contactSeller: "الاتصال بالبائع",
      call: "اتصال",
      sendMessage: "إرسال رسالة",
      mapTitle: "الخريطة",
      mapComingSoon: "الخريطة ستتوفر قريباً",
      verifiedProfile: "ملف شخصي موثق",
      unresolvedProduct: "المنتج غير موجود",
      unresolvedDesc: "هذا المنتج لم يعد متوفراً أو رابط الصفحة غير صحيح.",
      returnHome: "العودة للرئيسية",
      callActionAlert: "جاري الاتصال بالبائع... تم تسجيل الإجراء! (الإجراءات المستخدمة: ",
      description: "الوصف",
      noDescription: "لا يوجد وصف.",
      breadcrumbHome: "الرئيسية",
      breadcrumbProducts: "المنتجات"
    },
    createListing: {
      createTitle: "إنشاء إعلان جديد",
      createSubtitle: "يرجى ملء تفاصيل منتجك الزراعي.",
      productTitle: "عنوان المنتج",
      productTitlePlaceholder: "مثال: طماطم حمراء عضوية",
      categoryLabel: "الفئة",
      wilayaLabel: "الولاية",
      priceLabel: "السعر (د.ج)",
      pricePlaceholder: "السعر",
      unitLabel: "وحدة البيع",
      unitKg: "للكيلوغرام",
      unitPiece: "للقطعة",
      unitQuintal: "للقنطار",
      unitTonne: "للطن",
      unitTotal: "الإجمالي",
      quantityLabel: "الكمية المتوفرة",
      quantityPlaceholder: "مثال: 500 كغ",
      descLabel: "الوصف التفصيلي",
      descPlaceholder: "صف جودة منتجك وتاريخ الحصاد وخيارات التوصيل...",
      photoPreviewLabel: "معاينة صورة الإعلان (تلقائية حسب الفئة)",
      photoPreviewSubtitle: "تم مطابقة صورة عالية الجودة تلقائياً!",
      btnCancel: "إلغاء",
      btnPublish: "نشر الإعلان (الإجراء: 1)",
      unauthorizedTitle: "غير مصرح",
      unauthorizedDesc: "يجب أن تكون مسجلاً كفلاح أو شركة زراعية لإضافة إعلانات.",
      btnReturnHome: "العودة للرئيسية"
    },
    login: {
      welcomeBack: "مرحباً بعودتك",
      signInSubtitle: "سجل دخولك إلى حسابك في فلاح كوم",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "مثال: buyer@gmail.com",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "••••••••",
      rememberMe: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      btnLogIn: "تسجيل الدخول",
      demoAccountsTitle: "حسابات تجريبية:",
      cancelReturn: "إلغاء والعودة للرئيسية",
      errorInvalid: "البريد الإلكتروني أو كلمة المرور غير صالحة."
    },
    register: {
      joinTitle: "انضم إلى فلاح كوم",
      joinSubtitle: "أنشئ حسابك للبدء في البيع أو الشراء",
      roleFarmer: "فلاح / منتج",
      roleBuyer: "مشتري",
      roleBusiness: "شركة زراعية",
      fullNameLabel: "الاسم الكامل",
      fullNamePlaceholder: "مثال: أحمد ياسين",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "مثال: ahmed@example.com",
      avatarLabel: "صورة الملف الشخصي (رابط)",
      avatarPlaceholder: "https://...",
      avatarHelp: "الصق رابط صورة. وضعنا لك صورة افتراضية.",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أنشئ كلمة مرور",
      companyLabel: "اسم المؤسسة",
      companyPlaceholder: "مثال: شركة سارل للآلات الفلاحية",
      wilayaLabel: "الولاية",
      selectWilaya: "اختر الولاية",
      privacyCheckbox: "أوافق على ",
      privacyLinkText: "ميثاق السرية",
      privacyError: "يجب قبول ميثاق السرية للمتابعة.",
      btnCreateAccount: "إنشاء حساب",
      alreadyHaveAccount: "لديك حساب؟",
      btnLogIn: "تسجيل الدخول"
    },
    profile: {
      title: "إعدادات الملف الشخصي",
      subtitle: "إدارة هويتك وإعلاناتك.",
      picLabel: "رابط صورتك الشخصية",
      picHelp: "هذا نموذج تجريبي، يرجى إدراج رابط صورة صالح.",
      btnUpdate: "تحديث الصورة",
      myListings: "إعلاناتك المنشورة",
      noListings: "لم تنشر أي إعلان بعد.",
      btnPostFirst: "أضف إعلانك الأول",
      alertSuccess: "تم تحديث الصورة بنجاح!"
    },
    premium: {
      title: "تم الوصول للحد المسموح",
      subtitle: "استهلكت الإجراءات الثلاثة المجانية. ترقّ لبريميوم للوصول غير المحدود!",
      freeTitle: "مجاني",
      freePrice: "0 د.ج",
      freeUnit: "/ شهرياً",
      freeF1: "تصفح كل المنتجات",
      freeF2: "إضافة/شراء حتى 3 منتجات",
      freeF3: "دعم أساسي",
      freeBtn: "الخطة الحالية",
      ribbon: "الأكثر شعبية",
      premTitle: "بريميوم",
      premPrice: "1,500 د.ج",
      premUnit: "/ شهرياً",
      premF1: "إعلانات وشراء بلا حدود",
      premF2: "أولوية في نتائج البحث",
      premF3: "إحصائيات متقدمة",
      premF4: "دعم مخصص 24/7",
      premBtn: "ترقية الآن (تجريبي)",
      alertSuccess: "نجح الدفع! أنت الآن عضو بريميوم."
    },
    pwa: {
      offlineAlert: "أنت تتصفح بدون اتصال. بعض الميزات قد تكون محدودة.",
      onlineToastTitle: "تم استعادة الاتصال",
      onlineToastDesc: "أنت متصل مجدداً. سيتم تحديث الصفحات تلقائياً.",
      readyToastTitle: "جاهز للعمل أوفلاين",
      readyToastDesc: "فلاح كوم جاهز للعمل بدون إنترنت.",
      updateToastTitle: "تحديث جديد متوفر",
      updateToastDesc: "نسخة جديدة جاهزة. حدّث لتطبيق التغييرات.",
      updateBtn: "تحديث",
      installTitle: "تثبيت فلاح كوم",
      installDesc: "أضف التطبيق لشاشتك الرئيسية.",
      installBtn: "تثبيت",
      dismissBtn: "تجاهل"
    },
    chat: {
      panelTitle: "المحادثات",
      noConversations: "لا توجد محادثات",
      noConversationsDesc: "تواصل مع بائع من صفحة إعلانه لبدء المحادثة.",
      online: "متصل",
      inputPlaceholder: "اكتب رسالة...",
      securePayment: "دفع آمن",
      totalToPay: "المبلغ الإجمالي",
      cardNumber: "رقم البطاقة",
      cardName: "الاسم على البطاقة",
      expiration: "تاريخ الانتهاء",
      btnPay: "دفع",
      secureDisclaimer: "🔒 معلوماتك محمية بتشفير مصرفي.",
      processing: "جاري المعالجة...",
      processingDesc: "يرجى الانتظار.",
      paymentSuccess: "نجح الدفع! 🎉",
      paymentSuccessDesc: "تم تأكيد طلبك.",
      orderSummary: "ملخص الطلب",
      awaitingPayment: "💳 بانتظار الدفع",
      paid: "تم الدفع",
      payNow: "💳 ادفع الآن",
      awaitingPaymentDots: "بانتظار الدفع...",
      paymentConfirmed: "تم تأكيد الدفع",
      unitPrice: "سعر الوحدة",
      subtotal: "المجموع الفرعي",
      delivery: "🚚 التوصيل",
      total: "الإجمالي",
      product: "المنتج",
      quantity: "الكمية"
    },
    review: {
      header: "الآراء والتقييمات",
      reviewCount: "تقييمات",
      noReviews: "لا توجد تقييمات بعد.",
      firstReviewPrompt: "كن أول من يكتب تقييماً!",
      tabReviews: "التقييمات",
      tabWrite: "اكتب تقييماً",
      tabComplaint: "شكوى",
      loginPrompt: "سجل دخولك لكتابة تقييم.",
      alreadyReviewed: "قمت بكتابة تقييم لهذا المنتج.",
      successReview: "شكراً لتقييمك!",
      writeReviewHeader: "ترك تقييم",
      yourRatingLabel: "تقييمك:",
      reviewPlaceholder: "شارك تجربتك مع هذا المنتج...",
      submitReviewBtn: "نشر التقييم",
      selectRatingError: "يرجى تحديد التقييم.",
      commentLengthError: "يرجى كتابة تعليق (5 أحرف على الأقل).",
      successComplaint: "تم إرسال شكواك بنجاح.",
      reportTitle: "الإبلاغ عن مشكلة",
      subjectLabel: "الموضوع",
      selectSubjectPlaceholder: "اختر نوع المشكلة",
      sub1: "جودة غير مطابقة",
      sub2: "كمية غير صحيحة",
      sub3: "منتج تالف",
      sub4: "بائع لا يجيب",
      sub5: "وصف مضلل",
      sub6: "أخرى",
      detailLabel: "الوصف التفصيلي",
      detailPlaceholder: "اكتب تفاصيل المشكلة...",
      subjectError: "يرجى تحديد الموضوع.",
      descError: "يرجى التفصيل (10 أحرف على الأقل).",
      btnSubmitComplaint: "إرسال الشكوى"
    },
    footer: {
      desc: "أول سوق زراعي رقمي في الجزائر. يربط المنتجين والمشترين والشركات الزراعية عبر 58 ولاية.",
      colMarketplace: "السوق",
      allProducts: "كل المنتجات",
      newArrivals: "أحدث المنتجات",
      sellProduct: "بيع منتج",
      colAccount: "الحساب",
      login: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      profile: "ملفي الشخصي",
      premium: "بريميوم",
      colContact: "اتصل بنا",
      rights: "© 2026 فلاح كوم. جميع الحقوق محفوظة."
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('fella7_lang') || 'fr';
  });

  const setLanguage = (lang) => {
    localStorage.setItem('fella7_lang', lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    if (language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let obj = translations[language];
    for (const k of keys) {
      if (obj && obj[k] !== undefined) {
        obj = obj[k];
      } else {
        let fallback = translations['fr'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) fallback = fallback[fk];
          else return key;
        }
        return fallback;
      }
    }
    return obj;
  };

  const translateCategory = (catId) => categoryTranslations[language]?.[catId] || catId;
  const translateWilaya = (name) => wilayaTranslations[name]?.[language] || name;
  const translateSellerType = (type) => sellerTypeTranslations[type]?.[language] || type;
  const translateProductTitle = (title) => productTitleTranslations[title]?.[language] || title;
  const translateProductDesc = (desc) => productDescTranslations[desc]?.[language] || desc;
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, translateCategory, translateWilaya, translateSellerType, translateProductTitle, translateProductDesc }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
