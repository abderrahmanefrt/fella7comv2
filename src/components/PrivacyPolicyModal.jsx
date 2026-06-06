import { useState } from 'react';
import { Shield, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PrivacyPolicyModal.css';

const policySectionsTranslations = {
  fr: [
    {
      title: '1. Collecte des Données',
      content: `Nous collectons les données suivantes lors de votre inscription et utilisation de la plateforme fella7com :
      
• Informations d'identité : nom, prénom, adresse email, numéro de téléphone.
• Informations professionnelles : type d'activité agricole, wilaya, nom de l'entreprise (le cas échéant).
• Données de navigation : adresse IP, type de navigateur, pages visitées, durée des sessions.
• Données transactionnelles : annonces publiées, messages échangés, évaluations et avis.

Ces données sont collectées directement auprès de vous ou générées automatiquement lors de votre utilisation de la plateforme.`
    },
    {
      title: '2. Utilisation des Données',
      content: `Vos données personnelles sont utilisées pour :

• Gérer votre compte et authentifier votre identité.
• Permettre la publication et la consultation d'annonces agricoles.
• Faciliter la communication entre acheteurs et vendeurs via le système de messagerie interne.
• Améliorer la qualité de nos services et personnaliser votre expérience.
• Assurer la sécurité de la plateforme et prévenir les fraudes.
• Vous envoyer des notifications liées à votre activité (nouveaux messages, avis, etc.).
• Produire des statistiques anonymisées pour améliorer la plateforme.`
    },
    {
      title: '3. Partage des Données',
      content: `Nous ne vendons jamais vos données personnelles à des tiers. Vos informations peuvent être partagées dans les cas suivants :

• Avec les autres utilisateurs : votre nom, votre activité et votre wilaya sont visibles sur vos annonces.
• Avec nos prestataires techniques : hébergement, analyse de performance, dans le respect strict de la confidentialité.
• Avec les autorités compétentes : uniquement sur demande légale ou judiciaire.

Toutes les données partagées avec des tiers sont soumises à des accords de confidentialité stricts.`
    },
    {
      title: '4. Sécurité des Données',
      content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :

• Chiffrement des données en transit (HTTPS/TLS).
• Stockage sécurisé avec accès restreint aux données sensibles.
• Sauvegarde régulière des données.
• Surveillance continue des activités suspectes.
• Formation de notre équipe aux bonnes pratiques de sécurité.`
    },
    {
      title: '5. Vos Droits',
      content: `Conformément à la législation algérienne en vigueur, vous disposez des droits suivants :

• Droit d'accès : consulter l'ensemble des données que nous détenons sur vous.
• Droit de rectification : corriger vos données inexactes ou incomplètes.
• Droit de suppression : demander la suppression de votre compte et de vos données.
• Droit d'opposition : vous opposer au traitement de vos données à des fins de marketing.
• Droit de portabilité : recevoir vos données dans un format structuré et lisible.

Pour exercer ces droits, contactez-nous à : privacy@fella7com.dz`
    },
    {
      title: '6. Cookies et Technologies de Suivi',
      content: `Nous utilisons des cookies et technologies similaires pour :

• Maintenir votre session de connexion active.
• Mémoriser vos préférences de navigation.
• Analyser l'utilisation de la plateforme (cookies analytiques).
• Améliorer les performances du site.

Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités pourraient ne plus être disponibles.`
    },
    {
      title: '7. Conservation des Données',
      content: `Vos données sont conservées pendant la durée de votre inscription sur la plateforme. En cas de suppression de votre compte :

• Vos données personnelles seront supprimées dans un délai de 30 jours.
• Les annonces publiées seront anonymisées.
• Les avis et évaluations resteront visibles mais seront dissociés de votre identité.
• Les données nécessaires à des obligations légales pourront être conservées pour la durée requise par la loi.`
    },
    {
      title: '8. Modifications de la Charte',
      content: `Nous nous réservons le droit de modifier cette charte de confidentialité à tout moment. Toute modification significative vous sera notifiée par :

• Une notification sur la plateforme.
• Un email à l'adresse associée à votre compte.

La date de dernière mise à jour est indiquée en bas de cette charte. En continuant d'utiliser la plateforme après une modification, vous acceptez les nouvelles conditions.

Dernière mise à jour : 4 mai 2026`
    }
  ],
  ar: [
    {
      title: '1. جمع البيانات',
      content: `نقوم بجمع البيانات التالية عند تسجيلك واستخدامك لمنصة فلاح كوم:
      
• بيانات الهوية: الاسم، اللقب، البريد الإلكتروني، رقم الهاتف.
• البيانات المهنية: نوع النشاط الزراعي، الولاية، اسم الشركة (إن وجد).
• بيانات التصفح: عنوان IP، نوع المتصفح، الصفحات المزورة، ومدة الجلسات.
• البيانات التجارية: الإعلانات المنشورة، الرسائل المتبادلة، التقييمات والآراء.

يتم جمع هذه البيانات مباشرة منك أو يتم إنشاؤها تلقائياً أثناء استخدامك للمنصة.`
    },
    {
      title: '2. استخدام البيانات',
      content: `تُستخدم بياناتك الشخصية من أجل:

• إدارة حسابك والتحقق من هويتك.
• تمكين نشر وتصفح الإعلانات الزراعية.
• تسهيل التواصل بين المشترين والبائعين عبر نظام الرسائل الداخلي.
• تحسين جودة خدماتنا وتخصيص تجربتك.
• ضمان أمن المنصة ومنع الاحتيال.
• إرسال تنبيهات متعلقة بنشاطك (رسائل جديدة، تقييمات، إلخ).
• إنتاج إحصائيات مجهولة المصدر لتحسين المنصة.`
    },
    {
      title: '3. مشاركة البيانات',
      content: `نحن لا نبيع بياناتك الشخصية لأطراف ثالثة أبداً. قد تتم مشاركة معلوماتك في الحالات التالية:

• مع المستخدمين الآخرين: اسمك ونشاطك وولايتك تظهر في إعلاناتك.
• مع شركائنا التقنيين: الاستضافة وتحليل الأداء، مع الالتزام التام بالسرية.
• مع السلطات المختصة: فقط بناءً على طلب قانوني أو قضائي.

تخضع جميع البيانات التي تتم مشاركتها مع أطراف ثالثة لاتفاقيات سرية صارمة.`
    },
    {
      title: '4. أمن البيانات',
      content: `نحن نطبق تدابير تقنية وتنظيمية مناسبة لحماية بياناتك:

• تشفير البيانات أثناء النقل (HTTPS/TLS).
• تخزين آمن مع تقييد الوصول إلى البيانات الحساسة.
• عمل نسخ احتياطية دورية للبيانات.
• المراقبة المستمرة للأنشطة المشبوهة.
• تدريب فريقنا على أفضل ممارسات الأمن الرقمي.`
    },
    {
      title: '5. حقوقك',
      content: `وفقاً للتشريعات الجزائرية السارية، لديك الحقوق التالية:

• حق الوصول: الاطلاع على جميع البيانات التي نحتفظ بها عنك.
• حق التصحيح: تعديل بياناتك غير الدقيقة أو غير الكاملة.
• حق الحذف: طلب حذف حسابك وبياناتك.
• حق الاعتراض: الاعتراض على معالجة بياناتك لأغراض التسويق.
• حق نقل البيانات: الحصول على بياناتك بصيغة مهيكلة وقابلة للقراءة.

لممارسة هذه الحقوق، يرجى التواصل معنا عبر: privacy@fella7com.dz`
    },
    {
      title: '6. ملفات تعريف الارتباط (Cookies)',
      content: `نحن نستخدم ملفات تعريف الارتباط والتقنيات المشابهة من أجل:

• الحفاظ على نشاط جلسة تسجيل الدخول الخاصة بك.
• تذكر تفضيلات التصفح الخاصة بك.
• تحليل استخدام المنصة (ملفات تعريف الارتباط التحليلية).
• تحسين أداء الموقع.

يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط، ولكن بعض الميزات قد لا تكون متاحة.`
    },
    {
      title: '7. الاحتفاظ بالبيانات',
      content: `يتم الاحتفاظ ببياناتك طوال فترة تسجيلك في المنصة. في حال حذف حسابك:

• سيتم حذف بياناتك الشخصية خلال 30 يوماً.
• ستصبح الإعلانات المنشورة مجهولة المصدر.
• ستبقى التقييمات والآراء مرئية ولكن سيتم فصلها عن هويتك.
• قد يتم الاحتفاظ بالبيانات اللازمة للالتزامات القانونية للمدة التي يتطلبها القانون.`
    },
    {
      title: '8. تعديل الميثاق',
      content: `نحتفظ بالحق في تعديل ميثاق الخصوصية هذا في أي وقت. وسيتم إخطارك بأي تعديل هام من خلال:

• تنبيه على المنصة.
• رسالة بريد إلكتروني إلى العنوان المرتبط بحسابك.

تاريخ آخر تحديث موضح في أسفل هذا الميثاق. باستمرارك في استخدام المنصة بعد التعديل، فإنك تقبل الشروط الجديدة.

آخر تحديث: 4 ماي 2026`
    }
  ]
};

export default function PrivacyPolicyModal({ isOpen, onClose, mode = 'view' }) {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState(new Set([0]));

  if (!isOpen) return null;

  const policySections = policySectionsTranslations[language] || policySectionsTranslations['fr'];

  const toggleSection = (index) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(policySections.map((_, i) => i)));
  };

  return (
    <div className="privacy-overlay" onClick={onClose}>
      <div className="privacy-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-modal-header">
          <div className="privacy-title-group">
            <Shield size={24} className="text-primary" />
            <div>
              <h2>{language === 'ar' ? 'ميثاق السرية' : 'Charte de Confidentialité'}</h2>
              <p className="text-muted" style={{ fontSize: '0.82rem', marginTop: '2px' }}>
                {language === 'ar' ? 'فلاح كوم — السوق الزراعي' : 'fella7com — Marketplace Agricole'}
              </p>
            </div>
          </div>
          <button className="privacy-close-btn" onClick={onClose} title={language === 'ar' ? 'إغلاق' : 'Fermer'}>
            <X size={20} />
          </button>
        </div>

        <div className="privacy-intro">
          {language === 'ar' ? (
            <p>
              مرحباً بكم في <strong>فلاح كوم</strong>. حماية بياناتكم الشخصية هي أولويتنا.
              يصف هذا الميثاق كيفية جمع واستخدام وحماية معلوماتكم.
            </p>
          ) : (
            <p>
              Bienvenue sur <strong>fella7com</strong>. La protection de vos données personnelles est une priorité. 
              Cette charte décrit comment nous collectons, utilisons et protégeons vos informations.
            </p>
          )}
        </div>

        <button className="privacy-expand-all" onClick={expandAll}>
          {language === 'ar' ? 'توسيع الكل' : 'Tout développer'}
        </button>

        <div className="privacy-sections">
          {policySections.map((section, index) => (
            <div key={index} className={`privacy-section ${expandedSections.has(index) ? 'expanded' : ''}`}>
              <button className="privacy-section-header" onClick={() => toggleSection(index)}>
                <span className="privacy-section-title">{section.title}</span>
                {expandedSections.has(index) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedSections.has(index) && (
                <div className="privacy-section-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="privacy-modal-footer">
          <button className="btn-primary" onClick={onClose}>
            {mode === 'auth' 
              ? (language === 'ar' ? 'قرأت وفهمت' : "J'ai lu et compris") 
              : (language === 'ar' ? 'إغلاق' : 'Fermer')}
          </button>
        </div>
      </div>
    </div>
  );
}
