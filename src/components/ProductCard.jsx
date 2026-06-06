import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { t, translateProductTitle, translateWilaya } = useLanguage();

  return (
    <article className="product-card glass-panel hover-lift">
      <Link to={`/listing/${product.id}`} className="card-link-wrap">
        <div 
          className="product-image" 
          style={{ backgroundImage: `url(${product.images[0]})` }}
          aria-label={translateProductTitle(product.title)}
        >
          <div className="product-price-badge animate-slide-up">
            {product.price} <span className="unit">{product.unit}</span>
          </div>
        </div>
        
        <div className="product-content">
          <div className="product-category-tag">{product.category.toUpperCase()}</div>
          <h3 className="product-title">{translateProductTitle(product.title)}</h3>
          
          <div className="product-meta">
            <span className="meta-item"><MapPin size={16} /> {translateWilaya(product.wilaya)}</span>
            <span className="meta-item"><Calendar size={16} /> {product.date}</span>
          </div>
          
          <div className="product-seller">
            <CheckCircle size={16} className="verified-icon" />
            <span className="seller-name">{t('common.verifiedSeller')}</span>
          </div>
          
          <div className="card-action">
            <span className="btn-secondary full-width text-center">{t('common.viewDetails')}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
