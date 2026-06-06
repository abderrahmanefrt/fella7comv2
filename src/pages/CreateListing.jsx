import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { categories, wilayas } from '../data/mockData';
import './CreateListing.css';

export default function CreateListing() {
  const { user, addListing } = useAuth();
  const { t, translateCategory, translateWilaya } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: categories[1].id,
    price: '',
    unit: 'per kg',
    quantity: '',
    wilaya: wilayas[1],
    description: ''
  });

  const categoryImages = {
    vegetables: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=800',
    fruits: 'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&w=800',
    grains: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&w=800',
    livestock: 'https://images.pexels.com/photos/3540310/pexels-photo-3540310.jpeg?auto=compress&w=800',
    dairy: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&w=800',
    equipment: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=800',
    fertilizers: 'https://images.pexels.com/photos/5231135/pexels-photo-5231135.jpeg?auto=compress&w=800',
    olives: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&w=800'
  };
  
  const previewImage = categoryImages[formData.category] || 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=800';

  if (!user || user.role === 'buyer') {
    return (
      <div className="container text-center" style={{padding: '100px 0'}}>
        <h2>{t('createListing.unauthorizedTitle')}</h2>
        <p>{t('createListing.unauthorizedDesc')}</p>
        <button className="btn-primary" onClick={() => navigate('/')}>{t('createListing.btnReturnHome')}</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      sellerRole: user.role === 'business' ? 'Agri-Business' : 'Agriculteur',
      date: new Date().toISOString().split('T')[0],
      images: [previewImage]
    };
    
    const success = addListing(newProduct);
    if (!success) {
      navigate('/premium');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="create-listing-page animate-fade-in">
      <div className="container form-container glass-panel">
        <h1>{t('createListing.createTitle')}</h1>
        <p className="text-muted" style={{marginBottom: 'var(--spacing-xl)'}}>{t('createListing.createSubtitle')}</p>
        
        <form onSubmit={handleSubmit} className="listing-form">
          <div className="form-group full-width">
            <label>{t('createListing.productTitle')}</label>
            <input name="title" type="text" placeholder={t('createListing.productTitlePlaceholder')} value={formData.title} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>{t('createListing.categoryLabel')}</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.slice(1).map(c => <option key={c.id} value={c.id}>{translateCategory(c.id)}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>{t('createListing.wilayaLabel')}</label>
            <select name="wilaya" value={formData.wilaya} onChange={handleChange} required>
              {wilayas.slice(1).map(w => <option key={w} value={w}>{translateWilaya(w)}</option>)}
            </select>
          </div>
          
          <div className="form-group">
            <label>{t('createListing.priceLabel')}</label>
            <input name="price" type="number" placeholder={t('createListing.pricePlaceholder')} value={formData.price} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>{t('createListing.unitLabel')}</label>
            <select name="unit" value={formData.unit} onChange={handleChange} required>
              <option value="per kg">{t('createListing.unitKg')}</option>
              <option value="per piece">{t('createListing.unitPiece')}</option>
              <option value="per quintal">{t('createListing.unitQuintal')}</option>
              <option value="per tonne">{t('createListing.unitTonne')}</option>
              <option value="total">{t('createListing.unitTotal')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t('createListing.quantityLabel')}</label>
            <input name="quantity" type="text" placeholder={t('createListing.quantityPlaceholder')} value={formData.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label>{t('createListing.descLabel')}</label>
            <textarea name="description" rows="4" placeholder={t('createListing.descPlaceholder')} value={formData.description} onChange={handleChange} required></textarea>
          </div>
          
          {/* Dynamic Image Preview */}
          <div className="form-group full-width">
             <label>{t('createListing.photoPreviewLabel')}</label>
             <div className="image-preview" style={{backgroundImage: `url(${previewImage})`}}>
                <div className="image-overlay text-center" style={{padding: 'var(--spacing-md)'}}>
                   <span style={{color: 'white', fontWeight: 'bold'}}>{t('createListing.photoPreviewSubtitle')}</span>
                </div>
             </div>
          </div>

          <div className="form-actions full-width">
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>{t('createListing.btnCancel')}</button>
            <button type="submit" className="btn-primary">{t('createListing.btnPublish')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
